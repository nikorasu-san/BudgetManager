// // This is the JS to create global functions for defining a new cookie on login,
// // or retrieving a cookie if the user is still logged in.

function checkCookie() {
  if (Cookies.get("id")) {
    return parseInt(Cookies.get("id"));
  } else {
    return false;
  }
}

function setCookie(id) {
  Cookies.set("id", id, { expires: 2 });
}

function deleteCookie() {
  Cookies.remove("id");
}
