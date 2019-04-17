var db = require("../models");

var post3 = function(entryObject, callback) {
  // we identify the user attempting to login by the entered email
  db.User.findOne({
    where: {
      email: entryObject.email
    }
  }).then(response => {
    var returnInfo = {};
    // we need to give back the primary key (id) for client-side storage via local storage or cookies
    if (response != null) {
      returnInfo.id = response.dataValues.id;
    }
    // if the email is not recognized we return an error message (not throw an error, because it is client mistake, not a program issue)
    if (response == null) {
      returnInfo.error = "email not recognized";
      // sometimes we give back celebrations of sweet success, with the reward of a cookie! (or the lesser reward of a local storage)
    } else if (entryObject.password == response.dataValues.password) {
      returnInfo.success = "success";
      // other times we let the user know that we need to authenticate them
    } else {
      returnInfo.error = "wrong password";
    }
    callback(returnInfo);
  });
};
module.exports = post3;
