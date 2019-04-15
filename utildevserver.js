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
// require("./controllers/Controller.js")(app);

// //dev environment-----THIS IS WHERE WE WORK
// //KEEP COMMENTS FOR TESTING CASES

// // ROUTE 9
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

// // Route 3
// var queryObject = {
//   email: "star@star.com",
//   password: "sugarrush"
// };

// // Route 7
// var queryObject = {
//   uid: 3,
//   preferredName: "jimmyjohn",
//   password: "freakyFAST",
//   monthlyIncome: 10000000,
//   email: "req@body.email",
//   emailFlag: false,
//   phone: 0987654321,
//   phoneFlag: true,
//   catNames: ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"]
// };

// // Route 11
// // var req = req.body
// var queryObject = {
//   uid: 1,
//   description: "Party like Prince",
//   category: 4,
//   amount: 1999.99,
//   date: "1999-12-31",
//   eid: 1
// };

// // Route 12
// // var uid = req.params.id
// // var req = req.body;
// var queryObject = {
//   //   uid:uid,
//   eid: 8
// };

// // Route 14
// //   var uid = req.params.id;
// //   req = req.body;
// var queryObject = {
//   // date:req.dueDate,
//   uid: 5,
//   //   description: req.description,
//   category: 9,
//   capAmount: 1000,
//   warnAmount: 1000
// };

// Route 13
//  var uid = req.params.id;
var queryObject = {
  uid: 1
};

// // Route 8
// var uid = 1;
// //  var req = req.body;
// //  var queryObject = {
// //    uid: uid,
// //    description: req.description,
// //    category: req.category,
// //    amount: req.amount,
// //    billFlag: req.isBill,
// //    date: req.date,
// //    recurringFlag: req.isRecurring,
// //    activeFlag: true
// //  };

// // // Route 10
// var id = 4;
// queryObject = {
//   uid: id
// };

// // Route 15
// var id = 1;
// // We will need the main dashboard page to send across the id. This will likely be in local storage.
// var queryObject = {
//   uid: id
// };

var get10 = require("./utils/get10.js");
get10(queryObject, function(res) {
  console.log("server", res);
});

// Don't run app unless we have db sync
db.sequelize.sync().then(function() {
  app.listen(PORT, function() {
    // console.log("App listening on PORT " + PORT);
  });
});
