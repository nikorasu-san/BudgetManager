// Routes
// =============================================================
module.exports = function(app) {
  router = app.Router();

  // Each of the below routes just handles the handlebars page that the user gets sent to.

  // index route loads view.html
  router.get("/", function(req, res) {
    res.render("dashboard", hbsObject);
  });

  // add route loads the add.html page,
  // where users can enter new characters to the db
  router.get("/bills", function(req, res) {
    res.render("bills", hbsObject);
  });

  // all route loads the all.html page,
  // where all characters in the db are displayed
  router.get("/caps", function(req, res) {
    res.render("/caps", hbsObject);
  });

  router.get("/event", function(req, res) {
    res.render("event", hbsObject);
  });

  router.get("/login", function(req, res) {
    res.render("login", hbsObject);
  });

  router.get("/profile", function(req, res) {
    res.render("profile", hbsObject);
  });

  router.get("/signup", function(req, res) {
    res.render("signup", hbsObject);
  });
};
