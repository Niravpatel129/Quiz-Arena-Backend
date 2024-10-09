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

module.exports = optimizeAndUploadImage;
