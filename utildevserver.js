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
var get8 = require("./utils/get8.js");
get8(2, function(res) {
  console.log("server", res);
});

// Don't run app unless we have db sync
db.sequelize.sync().then(function() {
  app.listen(PORT, function() {
    // console.log("App listening on PORT " + PORT);
  });
});
