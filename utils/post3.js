var db = require("../models");
// function

var post3 = function(entryObject, callback) {
  db.User.findOne({
    where: {
      email: entryObject.email
    }
  }).then(response => {
    var returnInfo = {};
    if (response != null) {
      returnInfo.id = response.dataValues.id;
    }
    if (response == null) {
      returnInfo.error = "email not recognized";
    } else if (entryObject.password == response.dataValues.password) {
      returnInfo.success = "success";
    } else {
      returnInfo.error = "wrong password";
    }
    callback(returnInfo);
  });
};
module.exports = post3;
