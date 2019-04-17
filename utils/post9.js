var db = require("../models");

var post9 = function(entryObject, callback) {
  // WE NEED LOGIC TO DETERMINE billFlag STATUS
  // here we create a spending event, already appropriately formatted in the controller
  db.Event.create(entryObject).then(response => {
    callback(response);
  });
};
module.exports = post9;
