var db = require("../models");
// function

var post5 = function(entryObject, callback) {
  db.User.create(entryObject).then(response => {
    console.log("post5", response.dataValues.id);
    callback(response.dataValues.id);
  });
};
module.exports = post5;
