// // dev environment
var db = require("../models");

// // function
var get6 = function(userid, callback) {
  // // we find the user's row and return the relevant columns or arrays of columns
  db.User.findOne({
    where: { id: userid.uid }
  }).then(x => {
    let newOb = {
      preferredName: x.dataValues.preferredName,
      email: x.dataValues.email,
      phone: x.dataValues.phone,
      password: x.dataValues.password,
      monthlyIncome: x.dataValues.monthlyIncome,
      catNames: [
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
      ],
      catCaps: [
        { catCap: x.dataValues.cat0cap },
        { catCap: x.dataValues.cat1cap },
        { catCap: x.dataValues.cat2cap },
        { catCap: x.dataValues.cat3cap },
        { catCap: x.dataValues.cat4cap },
        { catCap: x.dataValues.cat5cap },
        { catCap: x.dataValues.cat6cap },
        { catCap: x.dataValues.cat7cap },
        { catCap: x.dataValues.cat8cap },
        { catCap: x.dataValues.cat9cap }
      ]
    };
    callback(newOb);
  });
};
module.exports = get6;
