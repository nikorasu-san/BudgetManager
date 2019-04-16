var db = require("../models");
// function

var emailValidation = function(entryObject, callback) {
  // // we identify the user attempting to login by the entered email
  db.User.findOne({
    where: {
      email: entryObject.email
    }
  }).then(response => {
    // console.log(response);
    if (response) {
      console.log("Throw the error");
      replyobj = { error: "That e-mail address is already in use." };
    } else {
      console.log("No error");
      replyobj = { error: false };
    }
    callback(replyobj);
  });
};
module.exports = emailValidation;
