var db = require("../models");
// function

var put14 = function(entryObject, callback) {
  let uid = entryObject.uid;
  // // here the wonderous sorcery of computing properties makes assigning budget caps and warning levels not a total nightmare :)
  let insertOb = {
    [`cat${entryObject.category}cap`]: entryObject.capAmount,
    [`cat${entryObject.category}warn`]: entryObject.warnAmount
  };
  // console.log("put14 inOb", insertOb);

  db.User.update(insertOb, {
    where: {
      id: uid
    }
  }).then(function(data) {
    callback(data);
  });
};
module.exports = put14;
// // N.B.: dynamic property computation examples from stack overflow comment by – Bergi May 31 '16 at 14:14
// // (https://stackoverflow.com/questions/33194138/template-string-as-object-property-name)
// // "Either var obj = {[`${dyanmicKey}`]: val} or just var obj = {[dyanmicKey]: val}"
