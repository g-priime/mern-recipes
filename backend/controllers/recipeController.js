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

  for (let i = 0; i < jsonData.recipes.length; i++) {
    recipeNames.push(jsonData.recipes[i].name);
  }

  const names = { recipeNames: recipeNames };

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

  for (let i = 0; i < jsonData.recipes.length; i++) {
    if (jsonData.recipes[i].name === req.params.name) {
      ingredients = jsonData.recipes[i].ingredients;
      numSteps = jsonData.recipes[i].instructions.length;
      details = { details: { ingredients: ingredients, numSteps: numSteps } };
    }
  }

  res.json(details);
};

// @desc    Post recipes
// @route   POST /recipes
// @access  Private
const postRecipes = (req, res, next) => {
  const recipe = {
    name: "butteredBagel",
    ingredients: ["1 bagel", "butter"],
    instructions: ["cut the bagel", "spread butter on bagel"],
  };

  let jsonData;

  try {
    const jsonString = fs.readFileSync(filePath);
    jsonData = JSON.parse(jsonString);
  } catch (err) {
    console.log(err);
    return;
  }

  for (let i = 0; i < jsonData.recipes.length; i++) {
    if (jsonData.recipes[i].name === recipe.name) {
      res.status(400).json({
        error: "Recipe already exists",
      });
      return;
    }
  }

  jsonData.recipes.push(recipe);

  const jsonString = JSON.stringify(jsonData);
  fs.writeFile(filePath, jsonString, (err) => {
    if (err) {
      console.log("Error writing file", err);
    } else {
      console.log("Successfully wrote file");
    }
  });

  res.status(201).json();
};

module.exports = {
  getRecipes,
  getDetails,
  postRecipes,
};
