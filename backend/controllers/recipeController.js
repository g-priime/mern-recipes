const { readFile, writeFile } = require("../DAL/recipeAccess");

// @desc    Get recipes
// @route   GET /recipes
// @access  Private
const getRecipes = (req, res) => {
  let jsonData = readFile();
  let recipeNames = [];

  for (let i = 0; i < jsonData.recipes.length; i++) {
    recipeNames.push(jsonData.recipes[i].name);
  }

  const names = { recipeNames };

  res.json(names);
};

// @desc    Get recipe details
// @route   GET /recipes/details/:name
// @access  Private
const getDetails = (req, res) => {
  let jsonData = readFile();
  let ingredients;
  let numSteps;
  let details = {};

  for (let i = 0; i < jsonData.recipes.length; i++) {
    if (jsonData.recipes[i].name === req.params.name) {
      ingredients = jsonData.recipes[i].ingredients;
      numSteps = jsonData.recipes[i].instructions.length;
      details = { details: { ingredients, numSteps } };
    }
  }

  res.json(details);
};

// @desc    Post recipes
// @route   POST /recipes
// @access  Private
const postRecipes = (req, res) => {
  const recipe = req.body;
  let jsonData = readFile();

  for (let i = 0; i < jsonData.recipes.length; i++) {
    if (jsonData.recipes[i].name === recipe.name) {
      res.status(400).json({
        error: "Recipe already exists",
      });
      return;
    }
  }

  jsonData.recipes.push(recipe);

  writeFile(jsonData);

  res.status(201).json();
};

// @desc    Update recipes
// @route   PUT /recipes
// @access  Private
const updateRecipes = (req, res) => {
  const recipe = req.body;
  let jsonData = readFile();

  let recipeFound = false;
  for (let i = 0; i < jsonData.recipes.length; i++) {
    if (jsonData.recipes[i].name === recipe.name) {
      jsonData.recipes[i] = recipe;
      recipeFound = true;
    }
  }

  if(!recipeFound) {
    res.status(404).json({
      error: "Recipe does not exist",
    });
    return;
  }

  writeFile(jsonData);

  res.status(204).json();
};

module.exports = {
  getRecipes,
  getDetails,
  postRecipes,
  updateRecipes,
};
