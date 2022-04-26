const fs = require("fs");
const filePath = "./backend/data.json";

const readFile = () => {
  try {
    const jsonString = fs.readFileSync(filePath);
    return JSON.parse(jsonString);
  } catch (err) {
    console.log(err);
    return;
  }
};

const writeFile = (jsonData) => {
    const updatedJsonString = JSON.stringify(jsonData, null, 2);
    fs.writeFile(filePath, updatedJsonString, (err) => {
      if (err) {
        console.log("Error writing file", err);
      } else {
        console.log("Successfully wrote file");
      }
    });
  }

module.exports = {
  readFile,
  writeFile,
};
