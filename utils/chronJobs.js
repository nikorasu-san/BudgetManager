// here we execute all the files required whenever the chronJobScheduler runs (whenever the server is waking up for the first time that day)

var dateBills = require("./dateBills");
var mail = require("./mail");
dateBills(console.log("dateBills updated"));
// mail()
