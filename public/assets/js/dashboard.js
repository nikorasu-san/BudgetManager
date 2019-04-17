//get all the information and format it
$(document).ready(function () {
  var uid = checkCookie();
  if (!uid) {
    document.location.href = "/login";
  }
  $(".dashboardLink").attr("href", `/${uid}`);
  $(".dashboardLink").attr("tabindex", `0`);
  $(".profileLink").attr("href", `/profile/${uid}`);
  $(".profileLink").attr("tabindex", `0`);
  $(".entriesLink").attr("href", `/entry/${uid}`);
  $(".entriesLink").attr("tabindex", `0`);
  $(".billsLink").attr("href", `/bills/${uid}`);
  $(".billsLink").attr("tabindex", `0`);
  $(".budgetLink").attr("href", `/caps/${uid}`);
  $(".budgetLink").attr("tabindex", `0`);

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
    }

    //if the width of the
  });
  //get the information from the api to the dashboard
  $.get("/api/" + uid).then(function (data) {
    //console.log(two);
    pieChart(
      [data.catNames[0].cat],
      [data.catNames[1].cat],
      [data.catNames[2].cat],
      [data.catNames[3].cat],
      [data.catNames[4].cat],
      [data.catNames[5].cat],
      [data.catNames[6].cat],
      [data.catNames[7].cat],
      [data.catNames[8].cat],
      [data.catNames[9].cat],
      [data.catTotalFloats[0].catTotalF],
      [data.catTotalFloats[1].catTotalF],
      [data.catTotalFloats[2].catTotalF],
      [data.catTotalFloats[3].catTotalF],
      [data.catTotalFloats[4].catTotalF],
      [data.catTotalFloats[5].catTotalF],
      [data.catTotalFloats[6].catTotalF],
      [data.catTotalFloats[7].catTotalF],
      [data.catTotalFloats[8].catTotalF],
      [data.catTotalFloats[9].catTotalF]
    );
    //make a function for the pieChart

    // console.log(data);
  });

  $(".logOut").on("click", function () {
    deleteCookie();
    document.location.href = "/login";
  });
});
//split it up into sections

function pieChart(
  cat0name,
  cat1name,
  cat2name,
  cat3name,
  cat4name,
  cat5name,
  cat6name,
  cat7name,
  cat8name,
  cat9name,
  cat0value,
  cat1value,
  cat2value,
  cat3value,
  cat4value,
  cat5value,
  cat6value,
  cat7value,
  cat8value,
  cat9value
) {
  var chart = $("#pieChart");

  var options = {
    responsive: true,
    legend: {
      display: true,
      position: "right",
      labels: {
        fontColor: "#586b8f",
        fontSize: 20
      }
    }
  };

  var data = {
    labels: [
      cat0name,
      cat1name,
      cat2name,
      cat3name,
      cat4name,
      cat5name,
      cat6name,
      cat7name,
      cat8name,
      cat9name
    ],
    datasets: [
      {
        data: [
          cat0value,
          cat1value,
          cat2value,
          cat3value,
          cat4value,
          cat5value,
          cat6value,
          cat7value,
          cat8value,
          cat9value
        ],
        backgroundColor: [
          "#480032",
          "#8158fc",
          "#ff8b6a",
          "#34314f",
          "#df0054",
          "#ffc15e",
          "#ffd6c2",
          "#692db7",
          "#ff5959",
          "#3426a4"
        ],
        borderWidth: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
      }
    ]
  };
  var newDoughnut = new Chart(chart, {
    type: "doughnut",
    data: data,
    options: options
  });

  //console.log("success!");
}
