// // dev environment
var db = require("../models");

// // function
var get6 = function (userid, callback) {
  // // we find the user's row and return the relevant columns or arrays of columns
  db.User.findOne({
    where: { id: userid.uid }
  }).then(x => {
    // console.log(x.dataValues);
    let newOb = {
      preferredName: x.dataValues.preferredName,
      email: x.dataValues.email,
      phone: x.dataValues.phone,
      password: x.dataValues.password,
      monthlyIncome: x.dataValues.monthlyIncome,
      // catNames: [
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
      // ],
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
      // catCaps: [
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
      // ]
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
    // console.log(newOb);
    callback(newOb);
  });
};
module.exports = get6;
//   // here is how you call it in router
// var get6 = require("./utils/get6");
// get6(2, function(res) {
//   console.log("server", res);
// });
