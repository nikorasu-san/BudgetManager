var db = require("../models");
var thismonth = require("./date");

// function
let catNames;
let catCaps;
let catWarns;

var get15 = function(userid, callback) {
  db.User.findOne({
    where: { id: userid.uid }
  }).then(x => {
    (catNames = [
      { cat: x.dataValues.cat0name },
      { cat: x.dataValues.cat1name },
      { cat: x.dataValues.cat2name },
      { cat: x.dataValues.cat3name },
      { cat: x.dataValues.cat4name },
      { cat: x.dataValues.cat5name },
      { cat: x.dataValues.cat6name },
      { cat: x.dataValues.cat7name },
      { cat: x.dataValues.cat8name },
      { cat: x.dataValues.cat9name }
    ]),
      console.log(x.datavalues.monthlyIncome);
  });
};
module.exports = get15;
