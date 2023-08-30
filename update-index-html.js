// Import the "fs" (file system) module from Node.js
import fs from "fs";

// Define the path of the HTML file to be processed
const builtFilePath = './dist/index.html';

// Read the content of the HTML file synchronously and store it in the variable "htmlData"
const htmlData = fs.readFileSync(builtFilePath, 'utf8').toString();

// Replace all occurrences of "/assets" with "./assets" in the HTML content and store the result in "processedScript"
const processedScript = htmlData.replace(/\/assets/g, './assets');

// Write the modified content back to the same HTML file, effectively updating it with the new paths
fs.writeFileSync(builtFilePath, processedScript);
