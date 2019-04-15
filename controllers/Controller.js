// Routes
// =============================================================
module.exports = function (app) {
  // Require get helping functions
  var get6 = require("./../utils/get6.js");
  var get8 = require("./../utils/get8.js");
  var get10 = require("./../utils/get10.js");
  var get13 = require("./../utils/get13.js");

  // Require post helping functions
  var post3 = require("./../utils/post3.js");
  var post5 = require("./../utils/post5.js");
  var post9 = require("./../utils/post9.js");

  // Require put helping functions
  var put7 = require("./../utils/put7.js");
  var put12 = require("./../utils/put12.js");
  var put14 = require("./../utils/put14.js");
  var put16 = require("./../utils/put16.js");

  // Each of the below routes just handles the handlebars page that the user gets sent to.

  app.get("/login", function (req, res) {
    // Route 2
    res.render("login");
  });

  app.post("/login", function (req, res) {
    // Route 3
    var queryObject = {
      email: req.body.email,
      password: req.body.password
    };
    post3(queryObject, function (response) {
      console.log(response);
      //var id = response.uid;
      res.json(response);
    });
  });

  app.get("/signup", function (req, res) {
    // Route 4
    res.render("signup");
  });

  app.post("/signup", function (req, res) {
    // Route 5
    console.log("In route 5");
    var queryObject = {
      preferredName: req.body.preferredName,
      email: req.body.email,
      phone: req.body.phoneNumber,
      password: req.body.password
    };
    post5(queryObject, function (response) {
      res.send({ id: response });
    });
  });

  app.get("/profile/:id", function (req, res) {
    // Route 6
    var queryObject = {
      uid: req.params.id
    };
    get6(queryObject, function (data) {
      res.render("profile", data);
    });
  });

  app.put("/profile/:id", function (req, res) {
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
      catNames: req.body.catNames
    };
    // console.log(queryObject)
    put7(queryObject, function (response) {
      // console.log(response)
      res.send(response);
    });
  });

  app.get("/entry/:id", function (req, res) {
    // Route 8
    var uid = req.params.id;
    var req = req.body;
    var queryObject = {
      uid: uid,
      description: req.description,
      category: req.category,
      amount: req.amount,
      billFlag: req.isBill,
      date: req.date,
      recurringFlag: req.isRecurring,
      activeFlag: true
    };
    get8(queryObject, function (response) {
      res.render("entries", response);
    });
  });

  app.post("/entry", function (req, res) {
    // Route 9
    uid = req.params.userid;

    var req = req.body;
    var queryObject = {
      UserId: uid,
      description: req.description,
      category: req.categoryid,
      amount: req.amount,
      date: req.date,
      recurringFlag: req.isRecurring

      // Bill flag only means that it hasn't happened yet, perhaps we need to generate this from the date
      // billFlag: REVISIT
    };
    post9(queryObject, function (response) {
      res.send(response);
    });
  });

  app.get("/bills/:id", function (req, res) {
    // Route 10
    var uid = req.params.id;
    queryObject = {
      uid: uid
    };
    get10(queryObject, function (response) {
      res.render("bills", response);
    });
  });

  app.put("/bills", function (req, res) {
    // Route 11
    var req = req.body;
    var queryObject = {
      uid: req.userid,
      description: req.description,
      category: req.category,
      amount: req.amount,
      date: req.date,
      eid: req.eventId
    };
  });

  app.put("/bills/delete/:id", function (req, res) {
    // Route 12

    //NG thinks userId not required, eventId is sufficient bc indexed to user
    // var uid = req.params.id
    var req = req.body;
    var queryObject = {
      // uid:uid,
      eid: req.eventid
    };

    put12(queryObject, function (response) {
      res.send(response);
    });
  });

  app.get("/caps/:id", function (req, res) {
    // Route 13
    var uid = req.params.id;
    var queryObject = {
      uid: uid
    };
    get13(queryObject, function (response) {
      res.render("caps", response);
    });
  });

  app.put("/caps/:id", function (req, res) {
    // Route 14
    var uid = req.params.id;
    req = req.body;
    var queryObject = {
      // date:req.dueDate,
      uid: uid,
      // description: req.description,
      category: req.categoryid,
      capAmount: req.amount
    };
    put14(queryObject, function (response) {
      res.send(response);
    });
  });

  app.get("/:id", function (req, res) {
    // Route 15
    var uid = req.params.id;
    var queryObject = {
      uid: uid
    };

    // temporarily commented to allow server to load dashboard page

    get15(queryObject, function (response) {
      res.render("dashboard", { response: true });
    });
  });

  app.get("/", function (req, res) {
    res.render("dashboard");
  });

  app.get("/caps", function (req, res) {
    // query users database for all categories and their associated caps
    // Proto-data:
    // var data = {catNames = [], catTotals = []}
    //
    // }
    res.render("/caps", data);
  });

  app.put("/profile/delete/:id", function (req, res) {
    //Route 16
    var queryObject = {
      uid: req.params.id
    };

    put16(queryObject, function (response) {
      // returns [1] if successful edit
      res.send(response);
    });
  })
};
