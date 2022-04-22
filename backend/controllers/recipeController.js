const fs = require("fs");

const filePath = "./backend/data.json";

// @desc    Get recipes
// @route   GET /recipes
// @access  Private
const getRecipes = (req, res, next) => {
  let recipe;
  let recipeNames = [];

  try {
    const jsonString = fs.readFileSync(filePath);
    recipe = JSON.parse(jsonString);
  } catch (err) {
    console.log(err);
    return;
  }

  for(let i=0; i<recipe.recipes.length; i++){
    recipeNames.push(recipe.recipes[i].name)
  }
  
  const names = { "recipeNames": recipeNames };

  res.json(names);
};

module.exports = {
  getRecipes,
};
