// dependencies
var express = require("express");
var exphbs = require("express-handlebars");
var app = express();
var PORT = process.env.PORT || 8080;
var chronJobScheduler = require("./utils/chron");
require("dotenv").config();

var chronJobs = require("./utils/chronJobs");
var dateBills = require("./utils/dateBills");
// console.log(chronJobScheduler(chronJobs));

// console.log(chronJobs);
// database requires all models in folder
var db = require("./models");

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Static Serve
app.use(express.static("./public"));

// Set Handlebars as the default templating engine.
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Routes
// e.g. require("./routes/html-routes.js")(app);
require("./controllers/Controller.js")(app);
// Don't run app unless we have db sync
db.sequelize.sync().then(function() {
  // console.log("hello", chronJobs);

  chronJobScheduler(chronJobs);
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
});
