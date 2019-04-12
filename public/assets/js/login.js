$(document).ready(function () {
    $(document).on("click", "#loginbtn", function (event) {
        event.preventDefault()
        let email = $("#email").val();
        let password = $("#password").val();

        // validate if email
        if (email.trim() === "") {
            alert("Please add in an email")
        }
        else if (password.length < 6) {
            alert("Please enter a password of at least 6 characters")
        } else {
            console.log("yay")
            let userDetails = {
                email: email.trim(),
                password: password.trim()
            }
            console.log(userDetails);
            $.post("/login", userDetails).then(function (data) {
                if (data.id) {
                    location.replace("/");
                }
            })

            //test if we can redirect on front end
            // location.replace("/");
        }
    })

    $(document).on("click", "#newUser", function () {
        let preferredName = $("#preferredName").val();
        let email = $("#email").val();
        let phoneNumber = $("#phoneNumber").val();
        let password = $("#password").val();
        console.log("name:", preferredName)

        // validate if email is not blank
        if (email.trim() === "") {
            alert("Please add in an email")
        } else if (preferredName.trim() === "") {
            alert("Please add in a name")
        } else if (password.length < 6) {
            alert("Please enter a password of at least 6 characters")
        } else {
            let newUser = {
                preferredName: preferredName.trim(),
                email: email.trim(),
                phoneNumber: phoneNumber,
                password: password
            }
            console.log(newUser);
            $.post("/signup", userDetails).then(function (data) {
                if (data.id) {
                    location.replace("/");
                } else if (data.error) {
                    let message = data.error;
                    alert(message);
                }
            })

        }
    })


});