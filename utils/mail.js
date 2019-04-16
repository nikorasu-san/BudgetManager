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
      //   console.log(x.dataValues.preferredName);

      let name = x.dataValues.preferredName;
      let email = x.dataValues.email;
      let uid = x.dataValues.id;
      let flags = {
        // catCapFloats: null,
        // catWarnFloats: null
      };
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
        let returnOb = {
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
        // console.log(returnOb);
        let a = returnOb;
        // console.log(a.flags, a.name, a.email, a.catNames);
        let flagArr = Object.keys(a.flags);
        let message = `Hi ${a.name}! \n\n The bad news is: \n\n`;
        flagArr.forEach((v, i) => {
          let b = v.split("");
          //   console.log("$", a.flags[flagArr[i]]);
          //   console.log("$$", catNames[b[1]].cat);
          //   console.log(b);

          if (b[0] == "C") {
            let messagePlus = `   You are ${
              a.flags[flagArr[i]]
            }% overbudget in ${catNames[b[1]].cat}.\n\n`;
            // console.log(messagePlus);
            message = message.concat(messagePlus);
            // console.log("BANG");
          } else if (b[0] == "W") {
            // console.log("Look out below");
          }
        });
        message = message.concat(
          " But the good news is you have CHECK YOURSELF!\n\nSincerely,\n\n  The CONN Artist: Budget Manager Team\n\n\n"
        );
        if (flagArr.length > 0) {
          console.log(message);

          async function sendThatMail() {
            let transporter = nodemailer.createTransport({
              service: "gmail",
              //   host: "smtp.gmail.email",
              //   port: 587,
              //   secure: true,
              auth: {
                user: "spatifyTest123@gmail.com",
                pass: "Root123!"
                // web: {
                //   client_id:
                //     "917800584321-9sbvkj4edk0o1mrfd1lnftfgvcc4fgte.apps.googleusercontent.com",
                //   project_id: "modified-tine-237818",
                //   auth_uri: "https://accounts.google.com/o/oauth2/auth",
                //   token_uri: "https://oauth2.googleapis.com/token",
                //   auth_provider_x509_cert_url:
                //     "https://www.googleapis.com/oauth2/v1/certs",
                //   client_secret: "bJz2ImaOJHUA0jBszUKcUnOE"
                // }
              }
            });

            var mailOptions = {
              from: "budgetmangerteam@gmail.com",
              to: `nhgroesch@gmx.com`,
              subject: "Test",
              text: "hey hey email is here!",
              html: `<h6>${message}</h6>`
            };

            //let info = await
            transporter.sendMail(mailOptions, (err, info) => {
              if (err) {
                throw new Error("Error: Something Bad Happened :(");
              } else {
                console.log(info);
              }
            });
            //console.log("Preview URL: " + nodemailer.getTestMessageUrl(info));
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
