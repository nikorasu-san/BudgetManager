// dependencies
var express = require("express");
var exphbs = require("express-handlebars");
var app = express();
var PORT = process.env.PORT || 8080;
// database requires all models in folder
var db = require("./models");

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Static Serve
app.use(express.static("public"));

// Set Handlebars as the default templating engine.
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Routes
// e.g. require("./routes/html-routes.js")(app);
require("./controllers/Controller.js")(app);

// dev environment-----THIS IS WHERE WE WORK
// var queryObject = {
//   UserId: 1,
//   description: "zoomba",
//   category: 9,
//   amount: 45.4,
//   date: "2019-4-13",
//   billFlag: true,
//   recurringFlag: true
// };
// var queryObject = {
//   preferredName: "rocky2",
//   email: "rockstar@grammy.com",
//   phone: 4212322321,
//   password: "musicm5~"
// };
// app.post("/login", function(req, res) {
// Route 3
var queryObject = {
  email: "star@star.com",
  password: "sugarrush"
};

var post3 = require("./utils/post3.js");
post3(queryObject, function(res) {
  console.log("server", res);
});

// Don't run app unless we have db sync
db.sequelize.sync().then(function() {
  app.listen(PORT, function() {
    // console.log("App listening on PORT " + PORT);
  });
});
