var db = require("../models");
var thismonth = require("./date");
let catNames;
let catCaps;
let catWarns;
var get13 = function(userid, callback) {
  // // get the data from user table
  db.User.findOne({
    where: {
      id: userid.uid
    }
  }).then(x => {
    //// we could change these initializations to loops based on number of categories if they were dynamic
    //// but since I had typed it out once it seemed faster to copy an paste
    catNames = [
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
    catCaps = [
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
    catWarns = [
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
    // get all active spending events of user
    db.Event.findAll({
      where: {
        userId: userid.uid,
        activeFlag: true,
        date: thismonth
      }
    }).then(y => {
      // initialize some arrays
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
      // loop through all events, and add each event amount to the appropriate total array
      // position using category id as index
      y.forEach(v => {
        let w = v.dataValues;
        catTotalFloats[w.category].catTotalF += parseFloat(w.amount);
      });
      // now that all events or sorted, do the math on the categories
      catTotalFloats.forEach((v, i) => {
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
      // returning identically indexed arrays of category names, budget caps, warning levels,
      // totals, and totals' percentage of budget caps and warning levels
      let returnOb = {
        catNames,
        catCaps,
        catWarns,
        catTotalFloats,
        catCapFloats,
        catWarnFloats
      };
      callback(returnOb);
    });
  });
};
module.exports = get13;
