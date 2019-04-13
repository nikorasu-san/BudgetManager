var moment = require("moment");
let now = moment().format("YYYY-MM-DD hh:mm:ss");
const startOfMonth = moment()
  .startOf("month")
  .format("YYYY-MM-DD hh:mm:ss");
const endOfMonth = moment()
  .endOf("month")
  .format("YYYY-MM-DD hh:mm:ss");
console.log(now);
console.log(startOfMonth);
console.log(endOfMonth);
