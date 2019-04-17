var db = require("../models");

var put7 = function(entryObject, callback) {
  // for the profile page update we will first send the current information, then even if nothing is changed we will rewrite most of the row,
  // because at our scale, dev time is worth more than computational efficiency
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
    // "success is the number of rows changed (1)"
    callback(dbPost);
  });
};
module.exports = put7;
