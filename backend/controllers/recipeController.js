const fs = require("fs");

const filePath = "./backend/data.json";

// @desc    Get recipes
// @route   GET /recipes
// @access  Private
const getRecipes = (req, res, next) => {
  let jsonData;
  let recipeNames = [];

  try {
    const jsonString = fs.readFileSync(filePath);
    jsonData = JSON.parse(jsonString);
  } catch (err) {
    console.log(err);
    return;
  }

  for(let i=0; i<jsonData.recipes.length; i++){
    recipeNames.push(jsonData.recipes[i].name)
  }
  
  const names = { "recipeNames": recipeNames };

  res.json(names);
};

// @desc    Get recipe details
// @route   GET /recipes/details/:name
// @access  Private
const getDetails = (req, res, next) => {
    let jsonData;
    let ingredients;
    let numSteps;
    let details = {};
  
    try {
      const jsonString = fs.readFileSync(filePath);
      jsonData = JSON.parse(jsonString);
    } catch (err) {
      console.log(err);
      return;
    }
  
    for(let i=0; i<jsonData.recipes.length; i++){
      if(jsonData.recipes[i].name === req.params.name){
        ingredients = jsonData.recipes[i].ingredients;
        numSteps = jsonData.recipes[i].instructions.length;
        details = { "details": { "ingredients": ingredients, "numSteps": numSteps } };
      }
    } 
  
    res.json(details);
  };

module.exports = {
  getRecipes,
  getDetails,
};
