var db = require("../models");
// function

var put17 = function(entryObject, callback) {
  let eid = entryObject.eid;
  // // rather than delete an entry, we deactivate it
  let insertObject = {
    activeFlag: false
  };
  db.Event.update(insertObject, { where: { id: eid } }).then(response => {
    // console.log("put17", response);
    callback(response);
  });
};
module.exports = put17;
