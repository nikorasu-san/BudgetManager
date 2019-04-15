var db = require("../models");
var thismonth = require("./date");

// function
let catNames;
let catCaps;
let catWarns;

var get15 = function(userid, callback) {
  db.User.findOne({
    where: { id: userid.uid }
  }).then(x => {});
};
module.exports = get15;
