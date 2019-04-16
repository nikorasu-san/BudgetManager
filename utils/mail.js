// // this file is for automatic email updates via nodemailer
var db = require("../models");
var thismonth = require("./date");
const nodemailer = require("nodemailer");
// let transporter = nodemailer.createTransport(options[ defaults])
findRecipients();
function findRecipients() {
  db.User.findAll({
    where: {
      emailFlag: 0
      // obviously, it will need to be below
      // emailFlag:1
    }
  }).then(x => {
    // console.log(x);

    x.forEach((x, i) => {
      console.log(x.dataValues.preferredName);

      let name = x.dataValues.preferredName;
      let email = x.dataValues.email;
      let uid = x.dataValues.id;

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
        //     // let catTotalFloats = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        //     // let catCapFloats = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        //     // let catWarnFloats = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        //     // // loop through all events, and add each event amount to the appropriate total array
        //     // // position using category id as index
        y.forEach(v => {
          let w = v.dataValues;
          catTotalFloats[w.category].catTotalF += parseFloat(w.amount);
        });
        // // now that all events or sorted, do the math on the categories
        catTotalFloats.forEach((v, i) => {
          // console.log("i", i, catCaps[i]);
          // console.log("float", i, parseFloat(catCaps[i]));
          // console.log(v);

          catCapFloats[i].catCapF = parseInt(
            (v.catTotalF * 100) / parseFloat(catCaps[i].catCap)
          );

          catWarnFloats[i].catWarnF = parseInt(
            (v.catTotalF * 100) / parseFloat(catWarns[i].catWarn)
          );

          if (isNaN(catCapFloats[i].catCapF)) {
            catCapFloats[i].catCapF = 0;
          }
          if (isNaN(catWarnFloats[i].catWarnF)) {
            catWarnFloats[i].catWarnF = 0;
          }
        });
        // // returning identically indexed arrays of category names, budget caps, warning levels,
        // // totals, and totals' percentage of budget caps and warning levels
        let returnOb = {
          name,
          email,
          catNames,
          catCaps,
          catWarns,
          catTotalFloats,
          catCapFloats,
          catWarnFloats
        };
        console.log(returnOb);
        //   (returnOb);
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
