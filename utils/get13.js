var db = require("../models");
// function
let catNames;
let catCaps;
let catWarns;
var get13 = function(userid, callback) {
  console.log(userid);

  db.User.findOne({
    where: { id: userid.uid }
  }).then(x => {
    // console.log("returned user object", x.dataValues);
    catNames = [
      x.dataValues.cat0name,
      x.dataValues.cat1name,
      x.dataValues.cat2name,
      x.dataValues.cat3name,
      x.dataValues.cat4name,
      x.dataValues.cat5name,
      x.dataValues.cat6name,
      x.dataValues.cat7name,
      x.dataValues.cat8name,
      x.dataValues.cat9name
    ];
    catCaps = [
      x.dataValues.cat0cap,
      x.dataValues.cat1cap,
      x.dataValues.cat2cap,
      x.dataValues.cat3cap,
      x.dataValues.cat4cap,
      x.dataValues.cat5cap,
      x.dataValues.cat6cap,
      x.dataValues.cat7cap,
      x.dataValues.cat8cap,
      x.dataValues.cat9cap
    ];
    catWarns = [
      x.dataValues.cat0warn,
      x.dataValues.cat1warn,
      x.dataValues.cat2warn,
      x.dataValues.cat3warn,
      x.dataValues.cat4warn,
      x.dataValues.cat5warn,
      x.dataValues.cat6warn,
      x.dataValues.cat7warn,
      x.dataValues.cat8warn,
      x.dataValues.cat9warn
    ];
    // console.log("arr of names", catNames);
    // console.log("arr of caps", catCaps);
    // console.log("arr of warns", catWarns);
    db.Event.findAll({
      where: { userId: userid.uid, activeFlag: true }
    }).then(y => {
      let catTotalFloats = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      let catCapFloats = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      let catWarnFloats = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      y.forEach(v => {
        let w = v.dataValues;
        catTotalFloats[w.category] += parseFloat(w.amount);
      });
      catTotalFloats.forEach((v, i) => {
        // console.log("i", i, catCaps[i]);
        // console.log("float", i, parseFloat(catCaps[i]));
        // console.log(v);

        catCapFloats[i] = (v / parseFloat(catCaps[i])).toFixed(3);

        catWarnFloats[i] = (v / parseFloat(catWarns[i])).toFixed(3);
      });
      let returnOb = {
        catNames,
        catCaps,
        catWarns,
        catTotalFloats,
        catCapFloats,
        catWarnFloats
      };
      // console.log(catTotalFloats);
      callback(returnOb);
    });
  });
};
module.exports = get13;
