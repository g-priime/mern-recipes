const express = require("express");
const router = express.Router();
const {
  getRecipes,
  getDetails,
  postRecipes,
  loginUser,
} = require("../controllers/recipeController");

router.get("/recipes", getRecipes);
router.get("/recipes/details/:name", getDetails);
router.post("/recipes", postRecipes);
router.post("/login", loginUser);

module.exports = router;