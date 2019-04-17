// create a logfile to update when regular jobs were last ran,
// every time server engages we check to see if the interval has been too long
// use that to run appropriate files as needed
let fs = require("fs");
let moment = require("moment");
var path = require("path");
var logPath = path.join(__dirname, "./chronLog.txt");

function checkLog(callback) {
  fs.readFile(`${logPath}`, "utf8", (err, data) => {
    if (err) throw err;
    data = data.split("\n");
    callback(data[data.length - 2]);
  });
}
let logDate = moment().format("YYYY-MM-DD hh:mm:ss");
function execute(callback) {
  checkLog(x => {
    let lastLog = x.substr(0, 10);
    let now = logDate.substr(0, 10);
    if (now != lastLog) {
      console.log("running chron jobs");
      writeLog(logDate);
      callback();
    }
  });
}

function writeLog(logDate) {
  fs.appendFile(`${logPath}`, `${logDate} \n`, err => {
    if (err) throw err;
    console.log('The "data to append" was appended to file!');
  });
}

module.exports = execute;
