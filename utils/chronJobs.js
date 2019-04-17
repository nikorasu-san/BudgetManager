// here we execute all the files required whenever the chronJobScheduler runs (whenever the server is waking up for the first time that day)

var dateBills = require("./dateBills");

var mail = require("./mail");
console.log(mail);
function chronJobs() {
  dateBills(otherfunction);
  mail();
  console.log("success dateBills updated");
}
function otherfunction() {
  console.log("success");
}

module.exports = chronJobs;
