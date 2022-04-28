const fs = require("fs");
const filePath = "./backend/data.json";

const readFile = () => {
  try {
    const jsonString = fs.readFileSync(filePath);
    return JSON.parse(jsonString);
  } catch (err) {
    console.log(err);
  }
};

const writeFile = (jsonData) => {
  const updatedJsonString = JSON.stringify(jsonData, null, 2);
  fs.writeFile(filePath, updatedJsonString, (err) => {
    if (err) {
      console.log(err);
    }
  });
};

const checkForRecipe = (name, jsonData) => {
  for (let i = 0; i < jsonData.recipes.length; i++) {
    if (jsonData.recipes[i].name === name) {
      return i;
    }
  }
  return -1;
};

module.exports = {
  readFile,
  writeFile,
  checkForRecipe,
};
