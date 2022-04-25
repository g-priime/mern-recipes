const fs = require("fs");
const filePath = "./backend/data.json";

const asyncHandler = require("express-async-handler");

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
const postRecipes = asyncHandler(async (req, res) => {
  //const recipeString = JSON.stringify(req.body);
  const { name } = req.body;
  console.log(name);
  res.json(req.params.name);

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
      /*res.status(400).json({
        error: "Recipe already exists",
      });*/
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
});

// @desc    Authenticate a user
// @route   POST /login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
  const { name } = req.body;

  if (true) {
    res.json({
      name: name
    });
  } else {
    res.status(400);
    throw new Error("Invalid credentials");
  }
});

module.exports = {
  getRecipes,
  getDetails,
  postRecipes,
  loginUser,
};
