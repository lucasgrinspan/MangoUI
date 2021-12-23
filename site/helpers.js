const fs = require("fs/promises");
const inputDir = "site/";
const outputDir = "docs/";

const getFileText = async (filePath) => {
  try {
    return await fs.readFile(`${inputDir}${filePath}`, "utf8");
  } catch (e) {
    console.error(`Error reading ${filePath}`);
    throw e;
  }
};

const getFiles = async (folderPath) => {
  try {
    return await fs.readdir(`${inputDir}${folderPath}`);
  } catch (e) {
    console.error(`Error accessing files in ${folderPath}`);
    throw e;
  }
};

const createFolder = async (folderPath, recursive = true) => {
  try {
    await fs.mkdir(`${outputDir}${folderPath}`, { recursive });
  } catch (e) {
    console.error(`Error creating folder ${folderPath}`);
    throw e;
  }
};

const writeFile = async (filePath, content) => {
  try {
    await fs.writeFile(`${outputDir}${filePath}`, content);
  } catch (e) {
    console.error(`Error creating file ${filePath}`);
    throw e;
  }
};

// copies folder/file from inputDir to outputDir
const transfer = async (path) => {
  try {
    await fs.cp(`${inputDir}${path}`, `${outputDir}${path}`, { recursive: true });
  } catch (e) {
    console.error(`Error copying ${path}`);
    throw e;
  }
};

module.exports = {
  getFileText,
  getFiles,
  createFolder,
  writeFile,
  transfer,
};
