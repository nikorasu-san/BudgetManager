//get all the information and format it
$(document).ready(function() {
  var uid;
  checkCookie(function(data) {
    uid = data;
  });
  if (!uid) {
    document.location.href = "/login";
  }

  //get the information from the api to the dashboard
  $.get("/" + uid).then(function(data) {
    pieChart(
      data.cat0name,
      data.cat1name,
      data.cat2name,
      data.cat3name,
      data.cat4name,
      data.cat5name,
      data.cat6name,
      data.cat7name,
      data.cat8name,
      data.cat9name,
      100,
      34,
      43,
      25,
      76,
      235,
      432,
      85,
      134,
      135
    );
    //make a function for the pieChart

    console.log(data);
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

  console.log("success!");
}
