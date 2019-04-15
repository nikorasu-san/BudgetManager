var moment = require("moment");
var db = require("../models");

// const Op = Sequelize.Op;
// console.log(db.Op);

let now = moment().format("YYYY-MM-DD hh:mm:ss");
const startOfMonth = moment()
  .startOf("month")
  //   .format("YYYY-MM-DD hh:mm:ss");
  .format("YYYY-MM-DD");
const endOfMonth = moment()
  .endOf("month")
  //   .format("YYYY-MM-DD hh:mm:ss");
  .format("YYYY-MM-DD");
// console.log(now);
// console.log(startOfMonth);
// console.log(endOfMonth);
const thismonth = {
  [db.Op.between]: [startOfMonth, endOfMonth]
};
// console.log(thismonth);

module.exports = thismonth;
