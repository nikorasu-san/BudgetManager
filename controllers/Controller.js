// Routes
// =============================================================
module.exports = function (app) {
  // Require get helping functions
  var get6 = require("./../utils/get6.js");
  var get8 = require("./../utils/get8.js");
  var get10 = require("./../utils/get10.js");
  var get13 = require("./../utils/get13.js");
  var get15 = require("./../utils/get15.js");

  // Require post helping functions
  var post3 = require("./../utils/post3.js");
  var post5 = require("./../utils/post5.js");
  var post9 = require("./../utils/post9.js");

  // Require put helping functions
  var put7 = require("./../utils/put7.js");
  var put12 = require("./../utils/put12.js");
  var put14 = require("./../utils/put14.js");
  var put16 = require("./../utils/put16.js");
  var put17 = require("./../utils/put17.js");

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
      res.json({
        id: response
      });
    });
  });

  app.get("/profile/:id", function (req, res) {
    // Route 6
    var queryObject = {
      uid: parseInt(req.params.id)
    };
    get6(queryObject, function (data) {
      res.render("profile", data);
    });
  });

  app.put("/profile/:id", function (req, res) {
    // Route 7
    var queryObject = {
      uid: parseInt(req.params.id),
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
      uid: parseInt(uid),
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
    //uid = req.body.uid;

    var req = req.body;
    var queryObject = {
      UserId: req.uid,
      description: req.description,
      category: req.categoryId,
      amount: req.amount,
      date: req.date,
      recurringFlag: req.isRecurring,
      billFlag: req.billFlag

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
      uid: parseInt(uid)
    };
    get10(queryObject, function (response) {
      console.log("get10:", response);
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
    var eid = req.params.id;
    // var req = req.body;
    var queryObject = {
      // uid:uid,
      eid: parseInt(eid)
    };

    put12(queryObject, function (response) {
      res.send(response);
    });
  });

  app.get("/caps/:id", function (req, res) {
    // Route 13
    var uid = req.params.id;
    var queryObject = {
      uid: parseInt(uid)
    };
    get13(queryObject, function (response) {
      console.log("get13", response);
      let combinedData = [];

      function Caps(cat, catCap, catWarn, catTotalF, catCapF, catWarnF) {
        (this.cat = cat),
          (this.catCap = catCap),
          (this.catWarn = catWarn),
          (this.catTotalF = catTotalF),
          (this.catCapF = catCapF),
          (this.catWarnF = catWarnF);
      }
      // loop to run constructor function & push to array
      for (let i = 0; i < response.catNames.length; i++) {
        var cap = new Caps(
          response.catNames[i].cat,
          response.catCaps[i].catCap,
          response.catWarns[i].catWarn,
          response.catTotalFloats[i].catTotalF.toFixed(2),
          response.catCapFloats[i].catCapF,
          response.catWarnFloats[i].catWarnF
        );
        combinedData.push(cap);
      }
      // add combinedData array to front end response
      response.combinedData = combinedData;
      res.render("caps", response);
    });
  });

  app.put("/caps/:id", function (req, res) {
    // Route 14
    var uid = req.params.id;
    req = req.body;
    var queryObject = {
      // date:req.dueDate,
      uid: parseInt(uid),
      // description: req.description,
      category: req.categoryId,
      capAmount: req.capAmount,
      warnAmount: req.warnAmount
    };
    put14(queryObject, function (response) {
      res.send(response);
    });
  });

  app.get("/api/:id", function (req, res) {
    // Route 15
    // making the UID a number seemed to resolve query issues
    var uid = parseInt(req.params.id);
    var queryObject = {
      uid: uid
    };

    // temporarily commented to allow server to load dashboard page

    get15(queryObject, function (response) {
      //console.log("This is the response: " + JSON.stringify(response));
      res.json(response);
    });
  });

  app.get("/:id", function (req, res) {
    // Route 15
    // making the UID a number seemed to resolve query issues
    var uid = parseInt(req.params.id);
    var queryObject = {
      uid: uid
    };

    // temporarily commented to allow server to load dashboard page

    // add combinedData array to front end response

    get15(queryObject, function (response) {
      let combinedData = [];

      function Caps(cat, catCap, catTotalF, catCapF) {
        (this.cat = cat),
          (this.catCap = catCap),
          (this.catTotalF = catTotalF),
          (this.catCapF = catCapF);
      }
      // loop to run constructor function & push to array
      console.log(response.catNames);
      for (let i = 0; i < response.catNames.length; i++) {
        var cap = new Caps(
          response.catNames[i].cat,
          response.catCaps[i].catCap,
          response.catTotalFloats[i].catTotalF.toFixed(2),
          response.catCapFloats[i].catCapF
        );
        console.log(cap);
        if (combinedData.length < 2) {
          combinedData.push(cap);
        }
      }
      response.combinedData = combinedData;
      console.log(response.combinedData);
      res.render("dashboard", response);
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
    res.render("/caps");
  });

  app.put("/profile/delete/:id", function (req, res) {
    //Route 16
    var queryObject = {
      uid: parseInt(req.params.id)
    };

    put16(queryObject, function (response) {
      // returns [1] if successful edit
      res.send(response);
    });
  });

  app.put("/entry/delete/:eid", function (req, res) {
    // Route 17
    let eid = req.params.eid;
    var queryObject = {
      eid: parseInt(eid)
    };
    put17(queryObject, function (response) {
      // returns [1] if successful edit
      res.send(response);
    });
  });

  app.get("/profile", function (req, res) {
    res.render("profile");
  });

  app.get("/entry", function (req, res) {
    res.render("entry");
  });

  app.get("/budget", function (req, res) {
    res.render("budget");
  });
};
