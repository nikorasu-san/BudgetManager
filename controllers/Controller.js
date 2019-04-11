// Routes
// =============================================================
module.exports = function(app) {
  // Each of the below routes just handles the handlebars page that the user gets sent to.

  app.get("/login", function(req, res) {
    // Route 2
    res.render("index", true);
  });

  app.post("/login", function(req, res) {
    // Route 3
    var queryObject = {
      email: req.email,
      password: req.password
    };
    //  post3(queryObject,function(response){
    // var id = response.uid
    // if (id){
    // res.send(id)
    // }
    // else{
    // res.send(false)
    // }
    // })
  });

  app.get("/signup", function(req, res) {
    // Route 4
    res.render("signup", true);
  });

  app.post("/signup", function(req, res) {
    // Route 5
    var queryObject = {
      preferredName: req.body.preferredName,
      email: req.body.email,
      phone: req.body.phoneNumber,
      password: req.body.password
    };
    // post5(queryObject,function(response){
    // res.send(response)
    // })
  });

  app.get("/profile/:id", function(req, res) {
    // Route 6
    var queryObject = {
    uid: req.params.userid}
    // var data = PlaceholderNickFunction(id)
    res.render("profile", data);
  });

  app.put("/profile/:id", function(req, res) {
    // Route 7
    var queryObject = {
      uid: req.params.id,
      preferredName: req.body.preferredName,
      password: req.body.password,
      monthlyIncome: req.body.monthlyIncome,
      email: req.body.email,
      emailFlag: req.body.emailFlag,
      phone: req.body.phoneNumber,
      phoneFlag: req.body.phoneFlag,
      catNames: req.body.catName
    };
    // var data = put7(queryObject,function(response){
    //   res.send(response)
    // })
  });

  app.get("/entry/:id", function(req, res) {
    // Route 8
    var uid = req.params.id
    var req = req.body;
    var queryObject = {
      uid: uid,
      description: req.description,
      category: req.category,
      amount: req.amount,
      billFlag: req.isBill,
      date: req.date,
      recurringFlag: releaseEvents.isRecurring,
      activeFlag: true
    };
    get8(queryObject, function(response) {
      res.render("entries", data);
    });
  });

  app.post("/entry", function(req, res) {
    // Route 9
    uid = req.params.userid
    var req = req.body;
    var queryObject = {
      uid: uid,
      description: req.description,
      category: req.categoryid,
      amount: req.amount,
      date: req.date,
      recurringFlag: req.isRecurring
    };
    post9(querObject, function(response) {
      res.send(response);
    });
  });

  app.get("/bills/:id", function(req, res) {
    // Route 10
    var id = req.params.id;
    queryObject = {
      id: id
    };
    get10(queryObject, function(response) {
      res.render("bills", response);
    });
  });

  app.put("/bills", function(req, res) {
    // Route 11
    var req = req.body
    var queryObject = {
      uid: req.userid,
      description = req.description,
      category = req.category,
      amount: req.amount,
      date: req.date,
      eid: req.eventId
    }
  });
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

  app.get("/caps", function(req, res) {
    // query users database for all categories and their associated caps
    // Proto-data:
    // var data = {catNames = [], catTotals = []}
    //
    // }
    res.render("/caps", data);
  });
};
