// This is the JS to create global functions for defining a new cookie on login,
// or retrieving a cookie if the user is still logged in.
// Code is lovingly stolen from w3 schools.

// Check if our cookie exists. If it does, we return the user id. If it does not, we return false.
function checkCookie() {
  var id = getCookie("budgetAppID");
  if (id != "") {
    var uid = getCookie("userid");
    return uid;
  } else {
    return false;
  }
}

// Looks up the user id of the user on the cookie.
function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(";");
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

// Create a new cookie named budgetAppID. Include the path that it should be associated with, the user id, and the date that it should expire.
// Not certain if the browser handles expiration for us or not.
function setCookie(path, userid) {
  var d = new Date();
  //   Set expiration time for the cookie to 2 days. Can mess with it as we see fit.
  d.setTime(d.getTime() + 2 * 24 * 60 * 60 * 1000);
  var expires = "expires=" + d.toUTCString();
  document.cookie =
    "cname=budgetAppID;path=" + path + ";userid=" + userid + expires;
}
