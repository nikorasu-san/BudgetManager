var db = require("../models");
var thismonth = require("./date");

// function
let catNames;
let catCaps;
let catWarns;
var get13 = function (userid, callback) {
  // // get the data from user table
  db.User.findOne({
    where: {
      id: userid.uid
    }
  }).then(x => {
    //// we could change these initializations to loops based on number of categories if they were dynamic
    //// but since I had typed it out once it seemed faster to copy an paste
    catNames = [{
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
    // catNames = [
    //   x.dataValues.cat0name,
    //   x.dataValues.cat1name,
    //   x.dataValues.cat2name,
    //   x.dataValues.cat3name,
    //   x.dataValues.cat4name,
    //   x.dataValues.cat5name,
    //   x.dataValues.cat6name,
    //   x.dataValues.cat7name,
    //   x.dataValues.cat8name,
    //   x.dataValues.cat9name
    // ];
    catCaps = [{
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
    // catCaps = [
    //   x.dataValues.cat0cap,
    //   x.dataValues.cat1cap,
    //   x.dataValues.cat2cap,
    //   x.dataValues.cat3cap,
    //   x.dataValues.cat4cap,
    //   x.dataValues.cat5cap,
    //   x.dataValues.cat6cap,
    //   x.dataValues.cat7cap,
    //   x.dataValues.cat8cap,
    //   x.dataValues.cat9cap
    // ];
    catWarns = [{
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
    // catWarns = [
    //   x.dataValues.cat0warn,
    //   x.dataValues.cat1warn,
    //   x.dataValues.cat2warn,
    //   x.dataValues.cat3warn,
    //   x.dataValues.cat4warn,
    //   x.dataValues.cat5warn,
    //   x.dataValues.cat6warn,
    //   x.dataValues.cat7warn,
    //   x.dataValues.cat8warn,
    //   x.dataValues.cat9warn
    // ];
    // console.log("arr of names", catNames);
    // console.log("arr of caps", catCaps);
    // console.log("arr of warns", catWarns);
    // // get all active spending events of user
    db.Event.findAll({
      where: {
        userId: userid.uid,
        activeFlag: true,
        date: thismonth
      }
    }).then(y => {
      // // initialize some arrays
      let catTotalFloats = [{
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
      let catCapFloats = [{
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
      let catWarnFloats = [{
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
      // let catTotalFloats = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      // let catCapFloats = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      // let catWarnFloats = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      // // loop through all events, and add each event amount to the appropriate total array
      // // position using category id as index
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
      });
      // // returning identically indexed arrays of category names, budget caps, warning levels,
      // // totals, and totals' percentage of budget caps and warning levels
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