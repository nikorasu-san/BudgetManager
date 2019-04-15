var db = require("../models");
// function

var put11 = function(entryObject, callback) {
  // //here we update a row by the event's unique id
  let eid = entryObject.eid;
  let insertOb = {
    UserId: entryObject.uid,
    description: entryObject.description,
    category: entryObject.category,
    amount: entryObject.amount,
    date: entryObject.date
    // eventId: entryObject.eventId
  };

  db.Event.update(insertOb, {
    where: {
      id: eid
    }
  }).then(function(data) {
    // // "success is the number of rows changed (hopefully 1)"
    callback(data);
  });
};
module.exports = put11;
