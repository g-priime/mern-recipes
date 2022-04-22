const express = require("express");
const router = express.Router();
const {
  getRecipes,
} = require("../controllers/recipeController");

router.get("/recipes", getRecipes);

module.exports = router;