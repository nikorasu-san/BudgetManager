var moment = require("moment");
var db = require("../models");

let now = moment().format("YYYY-MM-DD hh:mm:ss");
const startOfMonth = moment()
  .startOf("month")
  .format("YYYY-MM-DD");
const endOfMonth = moment()
  .endOf("month")
  .format("YYYY-MM-DD");
const thismonth = {
  [db.Op.between]: [startOfMonth, endOfMonth]
};
module.exports = thismonth;
