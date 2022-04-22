const asyncHandler = require("express-async-handler");
const fs = require("fs");

// @desc    Get recipes
// @route   GET /
// @access  Private
const getRecipes = asyncHandler(async (req, res, next) => {
    let recipe;

    try {
        const jsonString = fs.readFileSync('./data.json')
        recipe = JSON.parse(jsonString)
      } catch(err) {
        console.log(err)
        return
      }
      console.log(recipe)

  res.json(recipe);
});

module.exports = {
  getRecipes,
};
