var db = require("../models");

var post5 = function(entryObject, callback) {
  // this util creates an entry in the users table after a successful sign-up.
  // the formatting is all done in the controller, and we return the users freshly generated id
  db.User.create(entryObject).then(response => {
    callback(response.dataValues.id);
  });
};
module.exports = post5;
