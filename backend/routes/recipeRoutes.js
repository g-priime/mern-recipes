const express = require("express");
const router = express.Router();
const {
  getRecipes,
  getDetails,
  postRecipes,
} = require("../controllers/recipeController");

router.get("/recipes", getRecipes);
router.get("/recipes/details/:name", getDetails);
router.post("/recipes", postRecipes);

module.exports = router;