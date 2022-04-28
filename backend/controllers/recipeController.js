const { readFile, writeFile, checkForRecipe } = require("../DAL/recipeAccess");

// @desc    Get recipes
// @route   GET /recipes
// @access  Private
const getRecipes = (req, res) => {
  let jsonData = readFile(req, res);
  let recipeNames = [];

  for (let i = 0; i < jsonData.recipes.length; i++) {
    recipeNames.push(jsonData.recipes[i].name);
  }

  res.json({ recipeNames });
};

// @desc    Get recipe details
// @route   GET /recipes/details/:name
// @access  Private
const getDetails = (req, res) => {
  let jsonData = readFile();
  let ingredients;
  let numSteps;
  let details = {};
  const i = checkForRecipe(req.params.name, jsonData);

  if (i >= 0) {
    ingredients = jsonData.recipes[i].ingredients;
    numSteps = jsonData.recipes[i].instructions.length;
    details = { details: { ingredients, numSteps } };
  }

  res.json(details);
};

// @desc    Post recipes
// @route   POST /recipes
// @access  Private
const postRecipes = (req, res) => {
  const recipe = req.body;
  let jsonData = readFile();
  const i = checkForRecipe(recipe.name, jsonData);

  if (i >= 0) {
    res.status(400).json({
      error: "Recipe already exists",
    });
    return;
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
  const i = checkForRecipe(recipe.name, jsonData);

  if (i >= 0) {
    jsonData.recipes[i] = recipe;
  } else {
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
