// this file examines all the billFlagged events and unflags them whenever their date arrives
var db = require("../models");
var moment = require("moment");

let today = moment().format("YYYY-MM-DD");
console.log("dateBills today", today);

function dateBills(callback) {
  db.Event.findAll({
    where: {
      billFlag: true,
      // billFlag: false,
      date: {
        [db.Op.lte]: today
      }
    }
  }).then(x => {
    updateObject = {
      billFlag: false
      // billFlag: true
    };
    x.forEach(v => {
      db.Event.update(updateObject, {
        where: {
          id: v.dataValues.id
        }
      }).then(y => {
        console.log("bill flag updated", y);
        callback();
      });
    });
  });
}
// dateBills();

module.exports = dateBills;
