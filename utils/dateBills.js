// this file examines all the billFlagged events and unflags them whenever their date arrives
var db = require("../models");
var moment = require("moment");
let today = moment().format("YYYY-MM-DD");

function dateBills(callback) {
  db.Event.findAll({
    where: {
      billFlag: true,
      // line 11 for testing
      // billFlag: false,
      date: {
        [db.Op.lte]: today
      }
    }
  }).then(x => {
    updateObject = {
      billFlag: false
      // for testing
      // billFlag: true
    };

    // forTesting
    // reupdateObject = {
    //   // recurringFlag: true,
    //   billFlag: true
    // };

    x.forEach(v => {
      // if the bill is recurring we will first create next months version
      if (v.dataValues.recurringFlag) {
        // date logic inspired (and reworked to give end of next month rather than push, e.g. one month after 1/31 to 3/1)
        // by silentw from stack overflow: https://stackoverflow.com/questions/33440646/how-to-properly-add-1-month-from-now-to-current-date-in-moment-js
        moment.addRealMonth = function addRealMonth(d) {
          var fm = moment(d).add(1, "M");
          var fmEnd = moment(fm).endOf("month");
          return d.date() != fm.date() && fm.isSame(fmEnd.format("YYYY-MM-DD"))
            ? fm.endOf("month")
            : fm;
        };
        var nextMonth = moment.addRealMonth(moment()).format("YYYY-MM-DD");
        // end of inspired code

        newBillObject = {
          description: v.dataValues.description,
          category: v.dataValues.category,
          amount: v.dataValues.amount,
          billFlag: v.dataValues.billFlag,
          recurringFlag: v.dataValues.recurringFlag,
          periodicity: v.dataValues.periodicity,
          activeFlag: v.dataValues.activeFlag,
          UserId: v.dataValues.UserId,
          date: nextMonth
        };
        db.Event.create(newBillObject).then(response => {
          console.log("recurring bill added");
        });
      }
      // then we will update the bill flag to false to indicate that today it was paid
      db.Event.update(updateObject, {
        where: {
          id: v.dataValues.id
        }
      }).then(y => {
        console.log("bill flag updated", y);
        // callback off for testing
        callback();
      });

      // for testing
      // db.Event.update(reupdateObject, {
      //   where: {
      //     id: v.dataValues.id
      //   }
      // }).then(y => {
      //   // console.log("recurring flag updated", y);
      //   // callback off for testing
      //   // callback();
      // });
    });
  });
}

// for testing
// dateBills();

module.exports = dateBills;
