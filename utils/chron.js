// create a logfile to update when regular jobs were last ran,
// every time server engages we check to see if the interval has been too long
// use that to run appropriate files as needed
let fs = require("fs");
let moment = require("moment");

function checkLog(callback) {
  fs.readFile("./chronLog.txt", "utf8", (err, data) => {
    if (err) throw err;
    // console.log(data);
    data = data.split("\n");
    // console.log("here", data.length);
    // console.log("data", data[data.length - 2]);
    callback(data[data.length - 2]);
  });
}
let logDate = moment().format("YYYY-MM-DD hh:mm:ss");

function execute(callback) {
  checkLog(x => {
    console.log(typeof x);
    let lastLog = x.substr(0, 10);
    let now = logDate.substr(0, 10);
    if (now != lastLog) {
      writeLog(logDate);
      callback();
    }
  });
}

function writeLog(logDate) {
  fs.appendFile("./chronLog.txt", `${logDate} \n`, err => {
    if (err) throw err;
    console.log('The "data to append" was appended to file!');
  });
}

// writeLog(logDate);

module.exports = execute;
