var db = require("../models");
// function

var put11 = function(entryObject, callback) {
  let eid = entryObject.eid;
  let insertOb = {
    UserId: entryObject.uid,
    description: entryObject.description,
    category: entryObject.category,
    amount: entryObject.amount,
    date: entryObject.date,
    eid: entryObject.eventId
  };

  db.Event.update(insertOb, {
    where: {
      id: eid
    }
  }).then(function(data) {
    callback(data);
  });
};
module.exports = put11;
