var db = require("../models");
// function
let catNames;
var get8 = function(userid, callback) {
  // // we find the user's row and return the relevant array of columns

  db.User.findOne({
    where: { id: userid }
  }).then(x => {
    // console.log("returned user object", x.dataValues);
    catNames = [
      x.dataValues.cat0name,
      x.dataValues.cat1name,
      x.dataValues.cat2name,
      x.dataValues.cat3name,
      x.dataValues.cat4name,
      x.dataValues.cat5name,
      x.dataValues.cat6name,
      x.dataValues.cat7name,
      x.dataValues.cat8name,
      x.dataValues.cat9name
    ];
  });
  // // find all active bill spending events of user

  db.Event.findAll({
    where: {
      userId: userid,
      billFlag: true,
      activeFlag: true
    }
  }).then(y => {
    // // initialize an empty array to push to
    let eventsArr = [];
    // // create a relevantly keyed object out of each row, then push it
    y.forEach(v => {
      let eventOb = {
        description: v.dataValues.description,
        date: v.dataValues.date,
        category: v.dataValues.category,
        catName: catNames[v.dataValues.category],
        amount: v.dataValues.amount,
        eventId: v.dataValues.id
      };
      eventsArr.push(eventOb);
    });
    //  // we return the front end what it needs, as a callback for async issues
    let returnOb = {
      catNames,
      events: eventsArr
    };
    // console.log(returnOb);
    callback(returnOb);
  });
};
module.exports = get8;

// // //HOW I CALLED IN SERVER
// // dev environment-----THIS IS WHERE WE WORK
// var get10 = require("./utils/get10.js");
// get10(2, function(res) {
//   console.log("server", res);
// });
