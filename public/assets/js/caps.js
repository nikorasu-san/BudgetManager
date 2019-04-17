$(document).ready(function () {
  var uid = checkCookie();
  if (!uid) {
    document.location.href = "/login";
  }

  $(".dashboardLink").attr("href", `/${uid}`);
  $(".profileLink").attr("href", `/profile/${uid}`);

  // skill bar animation
  $(".skillbar").each(function () {
    var dataSplit = $(this)
      .attr("data-percent")
      .split("%");
    var number = parseInt(dataSplit[0]);
    //console.log(number);
    if (number >= 100) {
      $(this).css({
        background: "#B40404"
      });
    }

    if (number < 100) {
      $(this)
        .find(".skillbar-bar")
        .animate(
          {
            width: $(this).attr("data-percent")
          },
          2000
        );

      // Second bar for warning level if desired

      $(this)
        .find(".skillbar-bar2")
        .animate(
          {
            width: $(this).attr("data-warn-percent")
          },
          2000
        );
    }

    //if the width of the
  });

  // Add category data to budget form
  $(document).on("click", "#toBudgetForm", function () {
    // console.log(
    //   $(this)
    //     .parent()
    //     .siblings(".sel-budget")
    //     .find("input")
    //     .val()
    // );
    // console.log(
    //   $(this)
    //     .parent()
    //     .siblings(".sel-warning")
    //     .find("input")
    //     .val()
    // );
    // console.log(
    //   $(this)
    //     .parent()
    //     .siblings(".sel-catName")
    //     .find("h5")
    //     .html()
    // );

    let selectedCatName = $(this)
      .parent()
      .siblings(".sel-catName")
      .find("h5")
      .html();
    let selectedWarning = $(this)
      .parent()
      .siblings(".sel-warning")
      .find("input")
      .val();
    let selectedTarget = $(this)
      .parent()
      .siblings(".sel-budget")
      .find("input")
      .val();

    $("#targetAmount").val(selectedTarget);
    $("#warningAmount").val(selectedWarning);
    $(`#categoryList option[data-name='${selectedCatName}']`).attr(
      "selected",
      "selected"
    );
  });

  $(document).on("click", "#updateBudget", function (event) {
    event.preventDefault();
    // console.log("clicked");
    let newTarget = $("#targetAmount").val();
    let newWarning = $("#warningAmount").val();
    let categoryId = $("#categoryList")
      .find(":selected")
      .val();

    let reqObj = {
      categoryId: categoryId,
      capAmount: newTarget,
      warnAmount: newWarning
    };
    //console.log(reqObj);
    $.ajax({
      url: "/caps/" + uid,
      method: "PUT",
      data: reqObj
    }).then(function (response) {
      if (response[0] === 1) {
        // alert("Updates saved.");
        location.reload();
      } else {
        alert("Data not saved.");
      }
    });
  });

  $(".logOut").on("click", function () {
    deleteCookie();
    document.location.href = "/login";
  });
});
