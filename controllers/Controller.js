// Routes
// =============================================================
module.exports = function(app) {
  // Each of the below routes just handles the handlebars page that the user gets sent to.

  // index route loads view.html
  app.get("/", function(req, res) {
    var id = req.body.id;
    // We will need the main dashboard page to send across the id. This will likely be in local storage.
    var data;
    // This is where we will query the events database to return all bills and events for the current year.
    // The back end will then construct an object, data, and attach the sums of each category to it.
    // I think we'd be best suited to put that in an array. We also need to query to users database so we can construct an array of the user's
    // category names. The two arrays will index identically. Psudocode for the final "data" object below:
    //  var data= {
    // categoryTotals: [eventTotal1, eventTotal2, eventTotal3, eventTotal4...],
    // categoryNames: [categoryName1, categoryName2, categoryName3, categoryName4...]
    // }
    // I think it's doable, I just want Nick's database model before I start hacking away at this.

    res.render("dashboard", data);
  });

  app.get("/bills", function(req, res) {
    var id = req.body.id;
    // Hit up the DB and fetch our bills history.
    // Bills will then be saved to data.
    // Psudocoded data:
    // var data = {
    // bills: [bill1,bill2,bill3....]
    // Bill object: description, category, amount, dueDate
    // Maybe put a limit on bills, and add a "next" button that should be used to find the next however many bills?
    // }
    var data;

    res.render("bills", data);
  });

  app.get("/caps", function(req, res) {
    // query users database for all categories and their associated caps
    // Proto-data:
    // var data = {catNames = [], catTotals = []}
    //
    // }
    res.render("/caps", data);
  });

  app.get("/event", function(req, res) {
    res.render("event", data);
  });

  app.get("/login", function(req, res) {
    res.render("login", data);
  });

  app.get("/profile", function(req, res) {
    res.render("profile", data);
  });

  app.get("/signup", function(req, res) {
    res.render("signup", data);
  });

  app.post("/login", function(req, res) {
    var username = req.body.username;
    var password = req.body.password;
  });
};
