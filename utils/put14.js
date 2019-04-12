var db = require("../models");
// function

var put14 = function(entryObject, callback) {
  let uid = entryObject.uid;
  let insertOb = {
    [`cat${entryObject.category}cap`]: entryObject.capAmount,
    [`cat${entryObject.category}warn`]: entryObject.warnAmount
  };
  console.log(insertOb);

  db.User.update(insertOb, {
    where: {
      id: uid
    }
  }).then(function(data) {
    callback(data);
  });
};
module.exports = put14;

// Either var obj = {[`${dyanmicKey}`]: val} or just var obj = {[dyanmicKey]: val}
