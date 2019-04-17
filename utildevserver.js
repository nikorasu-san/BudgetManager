// dependencies
var express = require("express");
var exphbs = require("express-handlebars");
var app = express();
var PORT = process.env.PORT || 8080;
// database requires all models in folder
var db = require("./models");
require("dotenv").config();

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

// // Route 13/16
// //  var uid = req.params.id;
// var queryObject = {
//   uid: 5
// };

// // Route 17
// //  var eid = req.params.id;
// var queryObject = {
//   eid: 1
// };

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
// // this file is for automatic email updates via nodemailer
var db = require("./models");
var thismonth = require("./utils/date");
const nodemailer = require("nodemailer");
// let transporter = nodemailer.createTransport(options[ defaults])
// findRecipients();
function findRecipients() {
  db.User.findAll({
    where: {
      emailFlag: 0
      // if we had expected to get this far past MVP into our nice to haves
      // we would want to be able to give users the option to disable this functionality,
      // in which case, obviously, the emailFlag as above will need to be as below
      // emailFlag:1
    }
  }).then(x => {
    // console.log(x);
    // we need to got through each user and check if their spending is exceeding their expectations
    x.forEach((x, i) => {
      let name = x.dataValues.preferredName;
      let email = x.dataValues.email;
      let uid = x.dataValues.id;
      let flags = {};
      let catNames = [
        {
          cat: x.dataValues.cat0name
        },
        {
          cat: x.dataValues.cat1name
        },
        {
          cat: x.dataValues.cat2name
        },
        {
          cat: x.dataValues.cat3name
        },
        {
          cat: x.dataValues.cat4name
        },
        {
          cat: x.dataValues.cat5name
        },
        {
          cat: x.dataValues.cat6name
        },
        {
          cat: x.dataValues.cat7name
        },
        {
          cat: x.dataValues.cat8name
        },
        {
          cat: x.dataValues.cat9name
        }
      ];
      let catCaps = [
        {
          catCap: x.dataValues.cat0cap
        },
        {
          catCap: x.dataValues.cat1cap
        },
        {
          catCap: x.dataValues.cat2cap
        },
        {
          catCap: x.dataValues.cat3cap
        },
        {
          catCap: x.dataValues.cat4cap
        },
        {
          catCap: x.dataValues.cat5cap
        },
        {
          catCap: x.dataValues.cat6cap
        },
        {
          catCap: x.dataValues.cat7cap
        },
        {
          catCap: x.dataValues.cat8cap
        },
        {
          catCap: x.dataValues.cat9cap
        }
      ];
      let catWarns = [
        {
          catWarn: x.dataValues.cat0warn
        },
        {
          catWarn: x.dataValues.cat1warn
        },
        {
          catWarn: x.dataValues.cat2warn
        },
        {
          catWarn: x.dataValues.cat3warn
        },
        {
          catWarn: x.dataValues.cat4warn
        },
        {
          catWarn: x.dataValues.cat5warn
        },
        {
          catWarn: x.dataValues.cat6warn
        },
        {
          catWarn: x.dataValues.cat7warn
        },
        {
          catWarn: x.dataValues.cat8warn
        },
        {
          catWarn: x.dataValues.cat9warn
        }
      ];
      // now that we have the necessaries from the user table, we need this user's events!
      db.Event.findAll({
        where: {
          userId: uid,
          activeFlag: true,
          date: thismonth
        }
      }).then(y => {
        // // initialize some arrays
        let catTotalFloats = [
          {
            catTotalF: 0
          },
          {
            catTotalF: 0
          },
          {
            catTotalF: 0
          },
          {
            catTotalF: 0
          },
          {
            catTotalF: 0
          },
          {
            catTotalF: 0
          },
          {
            catTotalF: 0
          },
          {
            catTotalF: 0
          },
          {
            catTotalF: 0
          },
          {
            catTotalF: 0
          }
        ];
        let catCapFloats = [
          {
            catCapF: 0
          },
          {
            catCapF: 0
          },
          {
            catCapF: 0
          },
          {
            catCapF: 0
          },
          {
            catCapF: 0
          },
          {
            catCapF: 0
          },
          {
            catCapF: 0
          },
          {
            catCapF: 0
          },
          {
            catCapF: 0
          },
          {
            catCapF: 0
          }
        ];
        let catWarnFloats = [
          {
            catWarnF: 0
          },
          {
            catWarnF: 0
          },
          {
            catWarnF: 0
          },
          {
            catWarnF: 0
          },
          {
            catWarnF: 0
          },
          {
            catWarnF: 0
          },
          {
            catWarnF: 0
          },
          {
            catWarnF: 0
          },
          {
            catWarnF: 0
          },
          {
            catWarnF: 0
          }
        ];

        // now loop through all events, and add each event amount to the appropriate total array
        // position using category id as index
        y.forEach(v => {
          let w = v.dataValues;
          catTotalFloats[w.category].catTotalF += parseFloat(w.amount);
        });
        // now that all events are sorted, do the math on the categories to find the percents
        catTotalFloats.forEach((v, i) => {
          catCapFloats[i].catCapF = parseInt(
            (v.catTotalF * 100) / parseFloat(catCaps[i].catCap)
          );
          catWarnFloats[i].catWarnF = parseInt(
            (v.catTotalF * 100) / parseFloat(catWarns[i].catWarn)
          );
          // I can't count to NaN, and it looks ugly up front
          if (isNaN(catCapFloats[i].catCapF)) {
            catCapFloats[i].catCapF = 0;
          }
          if (isNaN(catWarnFloats[i].catWarnF)) {
            catWarnFloats[i].catWarnF = 0;
          }
        });
        // now that we've done our math we use computed properties to flag the categories that have exceeded 100%
        catCapFloats.forEach((v, i) => {
          if (v.catCapF > 100) {
            flags[`C${i}`] = v.catCapF;
          }
        });
        catWarnFloats.forEach((v, i) => {
          if (v.catWarnF > 100) {
            flags[`W${i}`] = v.catWarnF;
          }
        });
        // a is perhaps the fastest name to write for our useful object, and dev time is scarce
        let a = {
          flags,
          name,
          email,
          catNames,
          catCaps,
          catWarns,
          catTotalFloats,
          catCapFloats,
          catWarnFloats
        };
        // console.log(a.flags, a.name, a.email, a.catNames);
        let flagArr = Object.keys(a.flags);
        let messageStart = `<h4>Hi ${a.name}!</h4>`;
        let message = `<p> The bad news is: </p>`;
        // we need to generate an informative message based on our array of flags
        flagArr.forEach((v, i) => {
          let b = v.split("");
          // if the flag is a cap flag, then user will have also exceeded the warning, we don't want rub their nose in it, so we start with the less inclusive situation
          if (b[0] == "C") {
            let messagePlus = `<p>You are ${
              a.flags[flagArr[i]]
            }% over budget for ${catNames[b[1]].cat}.</p>`;
            message = message.concat(messagePlus);
          } else if (b[0] == "W") {
            let messagePlus = `<p>You are ${
              a.flags[flagArr[i]]
            }% over your warning level for ${catNames[b[1]].cat}.</p>`;
            message = message.concat(messagePlus);
          }
        });
        let messageEnd =
          " <p> But the good news is you have CHECK YOURSELF!</p><p>Sincerely,</p> <p><i>The CONN Artist: Budget Manager Team</i></p>";
        // if there were no flags for the user, we won't bother them with an email, they're on track
        if (flagArr.length > 0) {
          // Michael Campbell of team SPATIFY was most helpful with issues we had implementing nodemailer
          // (which ended up being more on the google side than the javascript side)
          async function sendThatMail() {
            let transporter = nodemailer.createTransport({
              service: "gmail",
              auth: {
                user: process.env.GMAILUSER,
                pass: process.env.GMAILPASS
              }
            });
            var mailOptions = {
              from: "budgetmanagerteam@gmail.com",
              to: `nhgroesch@gmx.com`,
              // lets insert the real email when we're done testing- hopefully on heroku/jaws they're not all fake and crash it
              // to: `${a.email}`,
              subject: "CHECK YOURSELF",
              text: `Look alive ${a.name}`,
              html: `${messageStart}${message}${messageEnd}`
            };
            transporter.sendMail(mailOptions, (err, info) => {
              if (err) {
                throw new Error("Uh-oh: Something Bad Happened");
              } else {
                console.log(info);
              }
            });
          }
          sendThatMail().catch(console.error);
        }
      });
    });
  });
}

// // we need to get the info from the database and create the actual mail content here
// var name;
// var email;
// var message;

// // this part will post from our send route
// sendEmail (name, email, message) {
//     fetch('/send', {
//       method: 'POST',
//       headers: {
//         'Accept': 'application/json',
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify({
//         name: name,
//         email: email,
//         message: message
//       })
//     })
//     .then((res) => res.json())
//     .then((res) => {
//       console.log('here is the response: ', res);
//     })
//     .catch((err) => {
//       console.error('here is the error: ', err);
//     })
//    }

// //    i think we need to require this in the app on server

// //   the transporter will actually send the emails from the service we set up
// app.post('/send', function(req, res, next) {
//     const transporter = nodemailer.createTransport({
//       service: 'gmail',
//       auth: {
//         user: 'test-email@gmail.com',
//         pass: 'test123'
//       }
//     })
//   }
//     const mailOptions = {
//       from: `${req.body.email}`,
//       to: 'test-email@gmail.com',
//       subject: `${req.body.name}`,
//       text: `${req.body.message}`,
//       replyTo: `${req.body.email}`
//     }
//     transporter.sendMail(mailOptions, function(err, res) {
//         if (err) {
//           console.error('there was an error: ', err);
//         } else {
//           console.log('here is the res: ', res)
//         }
//       })

// Route 15
// var id = 1;
// // We will need the main dashboard page to send across the id. This will likely be in local storage.
// var queryObject = {
//   uid: id
// };

// var get15 = require("./utils/get15.js");
// get15(queryObject, function(res) {
//   console.log("server", res);
// });

// Don't run app unless we have db sync
db.sequelize.sync().then(function() {
  app.listen(PORT, function() {
    // console.log("App listening on PORT " + PORT);
  });
});
