var db = require("../models");
var thismonth = require("./date");
const nodemailer = require("nodemailer");
// require("dotenv").config();

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
            console.log("user", process.env.GMAILUSER);
            let transporter = nodemailer.createTransport({
              service: "gmail",
              auth: {
                user: process.env.GMAILUSER,
                pass: process.env.GMAILPASS
              }
            });
            var mailOptions = {
              from: "budgetmanagerteam@gmail.com",
              // to: `nhgroesch@gmx.com`,
              // lets insert the real email when we're done testing- hopefully on heroku/jaws they're not all fake and crash it
              to: `${a.email}`,
              subject: "CHECK YOURSELF",
              text: `Look alive ${a.name}`,
              html: `${messageStart}${message}${messageEnd}`
            };
            transporter.sendMail(mailOptions, (err, info) => {
              // if (err) {
              //   throw new Error("Uh-oh: Something Bad Happened");
              // } else {
              console.log(info);
              // }
            });
          }
          sendThatMail().catch(console.error);
        }
      });
    });
  });
}

module.exports = findRecipients;
