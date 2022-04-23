const express = require("express");
const router = express.Router();
const {
  getRecipes,
  getDetails,
} = require("../controllers/recipeController");

router.get("/recipes", getRecipes);
router.get("/recipes/details/:name", getDetails);

module.exports = router;