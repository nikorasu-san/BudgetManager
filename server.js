var express = require("express");
var app = express();
var PORT = process.env.PORT || 8080;
// database requires all models in folder
var db = require("./models");

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Static Serve
app.use(express.static("public"));

// Routes
// e.g. require("./routes/html-routes.js")(app);

// Don't run app unless we have db sync
db.sequelize.sync({ force: true }).then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
});
