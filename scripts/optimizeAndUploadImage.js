const fs = require('fs').promises;
const path = require('path');
const sharp = require('sharp');
const fetch = require('node-fetch');
const { Storage } = require('@google-cloud/storage');

// Initialize Google Cloud Storage client
const storage = new Storage({
  projectId: 'quiz-arena-e2415',
  keyFilename: 'quiz-arena-e2415-firebase-adminsdk-c1083-9b227fe460.json',
});

const bucket = storage.bucket('quiz-arena-e2415.appspot.com');

async function optimizeAndUploadImage(url) {
  try {
    const response = await fetch(url);
    const buffer = await response.buffer();

    const optimizedBuffer = await sharp(buffer)
      .resize(400, 400, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 0 } })
      .webp({ quality: 80 })
      .toBuffer();

    const filename = `optimized-avatars/${Date.now()}-${Math.random()
      .toString(36)
      .substring(7)}.webp`;
    const file = bucket.file(filename);

    await file.save(optimizedBuffer, {
      metadata: { contentType: 'image/webp' },
    });

    await file.makePublic();

    return `https://storage.googleapis.com/${bucket.name}/${filename}`;
  } catch (error) {
    console.error('Error optimizing and uploading image:', error);
    return url; // Return original URL if optimization fails
  }
}

async function optimizeAvatarImages(avatars) {
  const optimizedAvatars = {
    freeAvatars: [],
    lockedAvatars: [],
  };

  console.log('Optimizing free avatars...');
  for (const url of avatars.freeAvatars) {
    const optimizedUrl = await optimizeAndUploadImage(url);
    optimizedAvatars.freeAvatars.push(optimizedUrl);
    console.log(`Optimized: ${url} -> ${optimizedUrl}`);
  }

  console.log('Optimizing locked avatars...');
  for (const url of avatars.lockedAvatars) {
    const optimizedUrl = await optimizeAndUploadImage(url);
    optimizedAvatars.lockedAvatars.push(optimizedUrl);
    console.log(`Optimized: ${url} -> ${optimizedUrl}`);
  }

  return optimizedAvatars;
}

async function processAndCreateNewFile() {
  try {
    const originalFilePath = './avatars.js';
    const newFilePath = './optimizedAvatars.js';
    const fileContent = await fs.readFile(originalFilePath, 'utf8');

    // Extract the avatar arrays
    const freeAvatarsMatch = fileContent.match(/const freeAvatars = (\[[\s\S]*?\]);/);
    const lockedAvatarsMatch = fileContent.match(/const lockedAvatars = (\[[\s\S]*?\]);/);

    if (!freeAvatarsMatch || !lockedAvatarsMatch) {
      throw new Error('Could not find avatar arrays in the file');
    }

    const freeAvatars = eval(freeAvatarsMatch[1]);
    const lockedAvatars = eval(lockedAvatarsMatch[1]);

    const avatars = { freeAvatars, lockedAvatars };

    // Optimize the avatars
    const optimizedAvatars = await optimizeAvatarImages(avatars);

    // Create the new file content
    const newFileContent = `const freeAvatars = ${JSON.stringify(
      optimizedAvatars.freeAvatars,
      null,
      2,
    )};

const lockedAvatars = ${JSON.stringify(optimizedAvatars.lockedAvatars, null, 2)};

module.exports = { freeAvatars, lockedAvatars };`;

    // Write the new file
    await fs.writeFile(newFilePath, newFileContent);

    console.log(`Optimized avatars have been written to ${newFilePath}`);
  } catch (error) {
    console.error('Error processing file:', error);
  }
}

processAndCreateNewFile();
