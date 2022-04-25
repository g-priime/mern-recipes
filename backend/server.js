var express = require("express");
var app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", require("./routes/recipeRoutes"));

app.listen(3000, () => {
 console.log("Server running on port 3000");
});