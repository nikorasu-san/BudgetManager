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


    $('.buttonDelete').on('click', function () {
        var id = $(this).attr('data-billId');
        console.log(id);
        //make the ajax put
        $.ajax(`/bills/delete/${id}`, {
            type: 'PUT',
        }).then(function () {
            console.log('deleted bill id ' + id);
        })

    })

})