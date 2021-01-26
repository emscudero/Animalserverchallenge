var express = require("express");
var app = express();
var sequelize = require("./db");
var user = require("./controllers/usercontroller");
var animal = require("./controllers/animalcontroller");

app.use(express.json());

sequelize.sync();

app.use(require("./middleware/headers"));
//app.use(require('./middleware/validate-session'));

app.use("/user", user);
app.use("/animal", animal);

app.listen(3000, function () {
  console.log("App is listening on port 3000");
});
