$(document).ready(function() {
  var uid;
  checkCookie(function(data) {
    uid = data;
  });
  if (!uid) {
    document.location.href = "/login";
  }
  // if cookies or local storage isn't figured out
  //   console.log(window.location.href);
  //   console.log(window.location.href.split("/"));
  //   let windowArray = window.location.href.split("/");
  //   let uid = windowArray[windowArray.length - 1];
  //   console.log(uid);

  // define function for validating blank updates
  function nullChecker(field, tag) {
    if (!field) {
      field = $(tag).attr("placeholder");
    }
    console.log("field: ", field);
  }

  $(document).on("click", "#profileEdit", function() {
    // define field answers as new answer || placeholder from database
    let preferredName = $("#preferredName").val();
    if (!preferredName) {
      preferredName = $("#preferredName").attr("placeholder");
    }
    let email = $("#email").val();
    if (!email) {
      email = $("#email").attr("placeholder");
    }
    let phone = $("#phone").val();
    if (!phone) {
      phone = $("#phone").attr("placeholder");
    }
    let password = $("#password").val();
    if (!password) {
      password = $("#password").attr("placeholder");
    }
    let income = $("#income").val();
    if (!income) {
      income = $("#income").attr("placeholder");
    }
    let cat0name = $("#cat0name").val();
    if (!cat0name) {
      cat0name = $("#cat0name").attr("placeholder");
    }
    let cat1name = $("#cat1name").val();
    if (!cat1name) {
      cat1name = $("#cat1name").attr("placeholder");
    }
    let cat2name = $("#cat2name").val();
    if (!cat2name) {
      cat2name = $("#cat2name").attr("placeholder");
    }
    let cat3name = $("#cat3name").val();
    if (!cat3name) {
      cat3name = $("#cat3name").attr("placeholder");
    }
    let cat4name = $("#cat4name").val();
    if (!cat4name) {
      cat4name = $("#cat4name").attr("placeholder");
    }
    let cat5name = $("#cat5name").val();
    if (!cat5name) {
      cat5name = $("#cat5name").attr("placeholder");
    }
    let cat6name = $("#cat6name").val();
    if (!cat6name) {
      cat6name = $("#cat6name").attr("placeholder");
    }
    let cat7name = $("#cat7name").val();
    if (!cat7name) {
      cat7name = $("#cat7name").attr("placeholder");
    }
    let cat8name = $("#cat8name").val();
    if (!cat8name) {
      cat8name = $("#cat8name").attr("placeholder");
    }
    let cat9name = $("#cat9name").val();
    if (!cat9name) {
      cat9name = $("#cat9name").attr("placeholder");
    }

    let updateDetails = {
      preferredName: preferredName,
      email: email,
      phone: phone,
      password: password,
      monthlyIncome: income,
      cat0name: cat0name,
      cat1name: cat1name,
      cat2name: cat2name,
      cat3name: cat3name,
      cat4name: cat4name,
      cat5name: cat5name,
      cat6name: cat6name,
      cat7name: cat7name,
      cat8name: cat8name,
      cat9name: cat9name
    };
    console.log(updateDetails);
    // console.log("email: ", email)
    //$.put("/profile/1", updateDetails)
    $.ajax({
      url: "/profile/" + uid,
      method: "PUT",
      data: updateDetails
    }).then(function(response) {
      if (response.data) {
        alert("Updates saved.");
        location.replace("/" + uid);
      } else {
        alert("Data not saved.");
      }
    });
  });

  $(document).on("click", "#profileDelete", function() {
    // sent a put request with id.
    let doubleConfirm = confirm(
      "Are you sure that you want to delete this profile?"
    );
    if (doubleConfirm) {
      $.ajax({
        url: "/profile/delete/" + uid,
        method: "PUT"
        // data: 1
      }).then(function(response) {
        if (response.data) {
          alert("Profile deleted.");
          location.replace("/login");
        } else {
          alert("Data not saved.");
        }
      });
    }
  });
});
