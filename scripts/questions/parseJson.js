const fs = require('fs');
const path = require('path');

// Function to split array into chunks
function splitArrayIntoChunks(array, chunkSize) {
  const chunks = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    chunks.push(array.slice(i, i + chunkSize));
  }
  return chunks;
}

// Function to process the JSON file
function processJsonFile(filePath) {
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading the file:', err);
      return;
    }

    try {
      const array = JSON.parse(data);
      const chunks = splitArrayIntoChunks(array, 100);

      chunks.forEach((chunk, index) => {
        const newFilePath = `output_${index + 1}.json`;
        fs.writeFile(newFilePath, JSON.stringify(chunk, null, 2), (err) => {
          if (err) {
            console.error('Error writing the file:', err);
          } else {
            console.log(`File saved: ${newFilePath}`);
          }
        });
      });
    } catch (err) {
      console.error('Error parsing JSON:', err);
    }
  });
}

// Replace 'yourfile.json' with the path to your JSON file
const filePath = path.join(__dirname, 'myJson.json');
processJsonFile(filePath);
