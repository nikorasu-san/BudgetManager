var db = require("../models");
// function

var post9 = function(entryObject, callback) {
  db.Event.create(entryObject).then(response => {
    console.log("post9", response);
    callback(response);
  });
};
module.exports = post9;
