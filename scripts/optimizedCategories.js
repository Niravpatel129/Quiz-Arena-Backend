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
      .resize(400, 400, { fit: 'cover', withoutEnlargement: true })
      .sharpen({ sigma: 0.5, flat: 1, jagged: 1 })
      .webp({ quality: 80 })
      .toBuffer();

    const filename = `optimized-logos/${Date.now()}-${Math.random()
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

async function optimizeCategoryImages(categories) {
  const optimizedCategories = [];

  for (const category of categories) {
    const optimizedSubCategories = [];

    for (const subCategory of category.subCategories) {
      // Skip commented-out entries
      if (subCategory.name.startsWith('//')) {
        optimizedSubCategories.push(subCategory);
        continue;
      }

      const optimizedLogo = await optimizeAndUploadImage(subCategory.logo);
      optimizedSubCategories.push({
        ...subCategory,
        logo: optimizedLogo,
      });
    }

    optimizedCategories.push({
      ...category,
      subCategories: optimizedSubCategories,
    });
  }

  return optimizedCategories;
}

async function processAndCreateNewFile() {
  try {
    // Read the original file
    const originalFilePath = './helpers/categoriesList.js';
    const newFilePath = './newList.js';
    const fileContent = await fs.readFile(originalFilePath, 'utf8');

    // Extract the categories array
    const categoriesMatch = fileContent.match(/const categories = (\[[\s\S]*?\]);/);
    if (!categoriesMatch) {
      throw new Error('Could not find categories array in the file');
    }

    const categoriesString = categoriesMatch[1];
    const categories = eval(categoriesString); // Be cautious with eval, use only with trusted input

    // Optimize the categories
    const optimizedCategories = await optimizeCategoryImages(categories);

    // Create the new file content
    const newFileContent = fileContent.replace(
      categoriesString,
      JSON.stringify(optimizedCategories, null, 2),
    );

    // Write the new file
    await fs.writeFile(newFilePath, newFileContent);

    console.log(`Optimized categories have been written to ${newFilePath}`);
  } catch (error) {
    console.error('Error processing file:', error);
  }
}

processAndCreateNewFile();
