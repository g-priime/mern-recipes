var express = require("express");
var app = express();

app.use("/url", require("./routes/recipeRoutes"));

app.listen(3000, () => {
 console.log("Server running on port 3000");
});