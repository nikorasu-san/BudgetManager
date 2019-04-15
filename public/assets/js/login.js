$(document).ready(function () {
    // var uid = checkCookie();
    // // Check to see if the user has a login id.

    // if (uid){
    //     // Code to redirect them to the dashboard.
    // }

    // initialize modal
    var elems = document.querySelectorAll('.modal');
    var instances = M.Modal.init(elems);
    // var instance = M.Modal.getInstance(elem);
    //$('.modal').modal();



    $(document).on("click", "#loginbtn", function (event) {
        event.preventDefault();
        let email = $("#email").val();
        let password = $("#password").val();

        // validate if email
        if (email.trim() === "") {
            alert("Please add in an email");
        } else if (password.length < 6) {
            alert("Please enter a password of at least 6 characters");
        } else {
            let userDetails = {
                email: email.trim(),
                password: password.trim()
            };
            console.log(userDetails);
            $.post("/login", userDetails).then(function (data) {
                if (data.error) {
                    alert(data.error)
                    //modal attempts
                    $('#error-content').append("<p>" + data.error + "</p>");
                    // instances.open();
                    $.get('#modal1').modal();



                } else if (data.id) {
                    console.log(data.success)
                    location.replace("/" + data.id);
                    localStorage.setItem("budget_user_id", data.id)
                }
            });
            // test if we can redirect on front end
            // document.location.href = "/";
        }
    });

    $(document).on("click", "#newUser", function (event) {
        event.preventDefault()
        let preferredName = $("#preferredName").val();
        let email = $("#email").val();
        let phoneNumber = $("#phoneNumber").val();
        if (phoneNumber.length < 10) {
            phoneNumber = 5555555555;
        }
        let password = $("#password").val();

        // validate if email is not blank
        if (email.trim() === "") {
            alert("Please add in an email");
        } else if (preferredName.trim() === "") {
            alert("Please add in a name");
        } else if (password.length < 6) {
            alert("Please enter a password of at least 6 characters");
        } else {
            let newUser = {
                preferredName: preferredName.trim(),
                email: email.trim(),
                phoneNumber: phoneNumber,
                password: password
            };
            console.log(newUser);
            $.post("/signup", newUser).then(function (data) {
                console.log("data: ", data)
                if (data.id) {
                    localStorage.setItem("budget_user_id", data.id);
                    location.replace("/" + data.id)
                } else if (data.error) {
                    let message = data.error;
                    alert(message);
                }
            });
        }
    });
});
