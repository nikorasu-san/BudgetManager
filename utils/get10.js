var db = require("../models");
var thismonth = require("./date");
let catNames;
var get8 = function(userid, callback) {
  // // we find the user's row and return the relevant array of columns

  db.User.findOne({
    where: { id: userid.uid }
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
  // find all active bill spending events of user
  db.Event.findAll({
    where: {
      UserId: userid.uid,
      billFlag: true,
      activeFlag: true,
      date: thismonth
    }
  }).then(y => {
    // initialize an empty array to push to
    let eventsArr = [];
    // create a relevantly keyed object out of each row, then push it
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
    // we return the front end what it needs, as a callback for async issues
    let returnOb = {
      catNames,
      events: eventsArr
    };
    callback(returnOb);
  });
};
module.exports = get8;
