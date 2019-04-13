var db = require("../models");
// function

var put7 = function(entryObject, callback) {
  let uid = entryObject.uid;
  let insertOb = {
    preferredName: entryObject.preferredName,
    password: entryObject.password,
    monthlyIncome: entryObject.monthlyIncome,
    email: entryObject.email,
    emailFlag: entryObject.emailFlag,
    phone: entryObject.phoneNumber,
    phoneFlag: entryObject.phoneFlag,
    cat0name: entryObject.catNames[0],
    cat1name: entryObject.catNames[1],
    cat2name: entryObject.catNames[2],
    cat3name: entryObject.catNames[3],
    cat4name: entryObject.catNames[4],
    cat5name: entryObject.catNames[5],
    cat6name: entryObject.catNames[6],
    cat7name: entryObject.catNames[7],
    cat8name: entryObject.catNames[8],
    cat9name: entryObject.catNames[9]
  };

  db.User.update(insertOb, {
    where: {
      id: uid
    }
  }).then(function(dbPost) {
    callback(dbPost);
  });
};
module.exports = put7;
