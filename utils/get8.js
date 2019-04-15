var db = require("../models");
var thismonth = require("./date");

// console.log("get8month", thismonth);

// function
let catNames;
var get8 = function(userid, callback) {
  // // we find the user's row and return the relevant columns or arrays of columns

  db.User.findOne({
    where: {
      id: userid.uid
    }
  }).then(x => {
    // console.log("returned user object", x.dataValues);
    // catNames = [
    //   x.dataValues.cat0name,
    //   x.dataValues.cat1name,
    //   x.dataValues.cat2name,
    //   x.dataValues.cat3name,
    //   x.dataValues.cat4name,
    //   x.dataValues.cat5name,
    //   x.dataValues.cat6name,
    //   x.dataValues.cat7name,
    //   x.dataValues.cat8name,
    //   x.dataValues.cat9name
    // ];
    catNames = [
      { cat: x.dataValues.cat0name },
      { cat: x.dataValues.cat1name },
      { cat: x.dataValues.cat2name },
      { cat: x.dataValues.cat3name },
      { cat: x.dataValues.cat4name },
      { cat: x.dataValues.cat5name },
      { cat: x.dataValues.cat6name },
      { cat: x.dataValues.cat7name },
      { cat: x.dataValues.cat8name },
      { cat: x.dataValues.cat9name }
    ];
  });
  db.Event.findAll({
    where: {
      UserId: userid.uid,
      date: thismonth
    }
  }).then(y => {
    let eventsArr = [];
    y.forEach(v => {
      //   console.log(v.dataValues);
      let eventOb = {
        description: v.dataValues.description,
        date: v.dataValues.date,
        category: v.dataValues.category,
        catName: catNames[v.dataValues.category].cat,
        amount: v.dataValues.amount,
        eventId: v.dataValues.id
      };
      eventsArr.push(eventOb);
    });
    let returnOb = { catNames: catNames, events: eventsArr };
    console.log(returnOb);
    callback(returnOb);
  });
};
module.exports = get8;

// // //HOW I CALLED IN SERVER
// // dev environment-----THIS IS WHERE WE WORK
// var get8 = require("./utils/get8.js");
// get8(2, function(res) {
//   console.log("server", res);
// });
