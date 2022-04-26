const express = require("express");
const router = express.Router();
const {
  getRecipes,
  getDetails,
  postRecipes,
  updateRecipes,
} = require("../controllers/recipeController");

router.get("/recipes", getRecipes);
router.get("/recipes/details/:name", getDetails);
router.post("/recipes", postRecipes);
router.put("/recipes", updateRecipes);

module.exports = router;