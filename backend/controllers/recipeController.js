const fs = require("fs");

const filePath = "./backend/data.json";

// @desc    Get recipes
// @route   GET /
// @access  Private
const getRecipes = (req, res, next) => {
  let recipe;

  try {
    const jsonString = fs.readFileSync(filePath);
    recipe = JSON.parse(jsonString);
  } catch (err) {
    console.log(err);
    return;
  }
  console.log(recipe);

  res.json(recipe);
};

module.exports = {
  getRecipes,
};
