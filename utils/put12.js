var db = require("../models");
// function

var put12 = function(entryObject, callback) {
  let eid = entryObject.eid;
  // // rather than delete a bill, we deactivate it
  let insertObject = {
    activeFlag: false
  };
  db.Event.update(insertObject, { where: { id: eid } }).then(response => {
    // console.log("put12", response);
    callback(response);
  });
};
module.exports = put12;
