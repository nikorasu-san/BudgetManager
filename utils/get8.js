var db = require("../models");
var thismonth = require("./date");

let catNames;
var get8 = function(userid, callback) {
  // // we find the user's row and return the relevant columns or arrays of columns

  db.User.findOne({
    where: {
      id: userid.uid
    }
  }).then(x => {
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
      date: thismonth,
      activeFlag: true
    }
  }).then(y => {
    let eventsArr = [];
    y.forEach(v => {
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
    callback(returnOb);
  });
};
module.exports = get8;
