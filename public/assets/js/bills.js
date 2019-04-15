$(document).ready(function () {
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