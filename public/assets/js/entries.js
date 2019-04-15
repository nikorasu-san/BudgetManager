$(document).ready(function() {
  var uid;
  checkCookie(function(data) {
    uid = data;
  });
  if (!uid) {
    document.location.href = "/login";
  }
  //get the information
});
//grab the entry info on submit
//define the object
//put info in an ajax post
