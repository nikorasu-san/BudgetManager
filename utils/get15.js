var db = require("../models");
var thismonth = require("./date");
let catNames;
let catCaps;
let catWarns;

var get15 = function(userid, callback) {
  db.User.findOne({
    where: {
      id: userid.uid,
      activeFlag: true
    }
  }).then(x => {
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
    let monthlyIncome = x.dataValues.monthlyIncome;
    let preferredName = x.dataValues.preferredName;
    db.Event.findAll({
      where: {
        userId: userid.uid,
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
      // loop through all events, and add each event amount to the appropriate total array
      // position using category id as index
      y.forEach(v => {
        let w = v.dataValues;
        catTotalFloats[w.category].catTotalF += parseFloat(w.amount);
      });

      let moneySpent = 0;
      for (i = 0; i < 10; i++) {
        moneySpent += catTotalFloats[i].catTotalF;
      }
      let moneyLeft = monthlyIncome - moneySpent;

      catTotalFloats.forEach((v, i) => {
        catCapFloats[i].catCapF = parseInt(
          (v.catTotalF * 100) / parseFloat(catCaps[i].catCap)
        );
        if (isNaN(catCapFloats[i].catCapF)) {
          catCapFloats[i].catCapF = 0;
        }
      });
      db.Event.findAll({
        where: {
          userId: userid.uid,
          activeFlag: true,
          billFlag: false,
          date: thismonth
        },
        order: [["date", "DESC"]],
        limit: 3
      }).then(z => {
        let entryArr = [];
        z.forEach(x => {
          let entryObject = {};
          entryObject.date = x.dataValues.date;
          entryObject.amount = x.dataValues.amount;
          entryObject.description = x.dataValues.description;
          entryArr.push(entryObject);
        });
        db.Event.findAll({
          where: {
            userId: userid.uid,
            activeFlag: true,
            billFlag: true,
            date: thismonth
          },
          order: [["date", "DESC"]],
          limit: 3
        }).then(z => {
          let billsArr = [];
          z.forEach(x => {
            let billsObject = {};
            billsObject.date = x.dataValues.date;
            billsObject.amount = x.dataValues.amount;
            billsObject.description = x.dataValues.description;
            billsArr.push(billsObject);
          });
          let returnOb = {
            preferredName,
            catNames,
            catCaps,
            catTotalFloats,
            catCapFloats,
            monthlyIncome,
            moneySpent,
            moneyLeft,
            entryArr,
            billsArr
          };
          callback(returnOb);
        });
      });
    });
  });
};
module.exports = get15;
