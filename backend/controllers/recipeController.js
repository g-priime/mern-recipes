const asyncHandler = require("express-async-handler");
const fs = require("fs");

// @desc    Get recipes
// @route   GET /
// @access  Private
const getRecipes = (req, res, next) => {
    let recipe;

    try {
        const jsonString = fs.readFileSync('./data.json')
        recipe = JSON.parse(jsonString)
      } catch(err) {
        console.log(err)
        return
      }

  res.json(recipe);
};

module.exports = {
  getRecipes,
};
