$(document).ready(function () {
    var uid;
    checkCookie(function (data) {
        uid = data;
    });
    // Check to see if the user has a login id.

    if (uid) {
        document.location.href = "/" + uid;

        // Code to redirect them to the dashboard.
    } else {


        $(document).on("click", "#loginbtn", function (event) {
            event.preventDefault();
            let email = $("#email").val();
            let password = $("#password").val();

            // validate if email
            if (email.trim() === "") {
                // open error modal
                $(".modal").modal();
                $("#error-body").empty();
                $("#error-body").append("<p>Please add in an email</p>");
                // alert("Please add in an email");
            } else if (password.length < 6) {
                // open error modal
                $(".modal").modal();
                $("#error-body").empty();
                $("#error-body").append(
                    "<p>Please enter a password of at least 6 characters</p>"
                );
                //alert("Please enter a password of at least 6 characters");
            } else {
                let userDetails = {
                    email: email.trim(),
                    password: password.trim()
                };
                // console.log(userDetails);
                $.post("/login", userDetails).then(function (data) {
                    // console.log(data);
                    if (data.error) {
                        // open error modal
                        $(".modal").modal();
                        $("#error-body").empty();
                        $("#error-body").append("<p>" + data.error + "</p>");
                    } else if (data.id) {
                        // console.log(data.success);
                        setCookie(data.id);
                        location.replace("/" + data.id);
                        // set local storage as backup
                        //localStorage.setItem("budget_user_id", data.uid);
                    }
                });
            }
        });

        $(document).on("click", "#newUser", function (event) {
            event.preventDefault();
            let preferredName = $("#preferredName").val();
            let email = $("#email").val();
            let phoneNumber = $("#phoneNumber").val();
            // if validation on backend is still on to require length 10 -- set a default value
            // if (phoneNumber.length < 10) {
            //     phoneNumber = 5555555555;
            // }
            let password = $("#password").val();

            // validate if email is not blank
            if (email.trim() === "") {
                // open error modal
                $(".modal").modal();
                $("#error-body").empty();
                $("#error-body").append("<p>Please add in an email</p>");
                //alert("Please add in an email");
            } else if (preferredName.trim() === "") {
                // open error modal
                $(".modal").modal();
                $("#error-body").empty();
                $("#error-body").append("<p>Please add in a name</p>");
                //alert("Please add in a name");
            } else if (password.length < 6) {
                // open error modal
                $(".modal").modal();
                $("#error-body").empty();
                $("#error-body").append(
                    "<p>Please enter a password of at least 6 characters</p>"
                );
                //alert("Please enter a password of at least 6 characters");
            } else {
                let newUser = {
                    preferredName: preferredName.trim(),
                    email: email.trim(),
                    phoneNumber: phoneNumber,
                    password: password
                };
                // console.log(newUser);
                // console.log("Should now make a post call");
                $.post("/signup", newUser).then(function (data) {
                    // console.log("data: ", data);
                    if (data.id) {
                        // Create a cookie
                        setCookie(data.id);

                        // set local storage as backup
                        //localStorage.setItem("budget_user_id", data.id);
                        location.replace("/profile/" + data.id);
                    } else if (data.error) {
                        let message = data.error;
                        // open error modal
                        $(".modal").modal();
                        $("#error-body").empty();
                        $("#error-body").append(`<p>${message}</p>`);
                        //alert(message);
                    } else {
                        // open error modal
                        $(".modal").modal();
                        $("#error-body").empty();
                        $("#error-body").append(
                            `<p>There was an error with this request. Please make sure you have filled out the form correctly.</p>`
                        );
                    }
                });
                // console.log("After the post");
            }
        });
    }
});
