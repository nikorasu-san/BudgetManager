$(document).ready(function () {
  var uid;
  checkCookie(function (data) {
    uid = data;
  });
  if (!uid) {
    document.location.href = "/login";
  }

  $(".dashboardLink").attr("href", `/${uid}`)
  $(".profileLink").attr("href", `/profile/${uid}`)

  $("#spendingForm").on("submit", function (e) {
    var description = $("#desc").val();
    var amount = $("#amount").val();
    var category = $("#spendingList option:selected").val();
    var isBill = $("#isBill:checked").val();
    var date = $("#date").val();
    //reset the date to make it readable by the database
    console.log(date);
    console.log(category);
    category = parseInt(category);
    amount = parseFloat(amount);
    let formatDate = moment(date, "MMM-DD-YYYY");
    console.log(formatDate);
    let newDate = formatDate.format("YYYY-MM-DD");
    console.log(newDate);
    //store the values into an object
    var data = {
      uid: parseInt(uid),
      description: description,
      amount: amount,
      categoryId: category,
      isRecurring: isBill,
      date: newDate
    };
    e.preventDefault();
    console.log("it works!");
    console.log(data);

    $.post("/entry", data).then(function (data) {
      if (data.id) {
        // console.log("success!");
        location.reload();
      }
    });
  });

  $(".spending-delete").on("click", function () {
    var id = $(this).attr("data-entryId");
    // console.log(id);

    $.ajax({
      url: `/entry/delete/${id}`,
      method: "PUT"
    }).then(function (data) {
      // console.log(data);
      // console.log("deleted bill id " + id);
      location.reload();
    });
  });
});
//grab the entry info on submit
//define the object
//put info in an ajax post
