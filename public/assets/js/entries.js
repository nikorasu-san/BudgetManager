$(document).ready(function () {
    //set up the variables
    $('#spendingForm').on('submit', function (e) {
        var description = $('#desc').val();
        var amount = $('#amount').val();
        var category = $('#spendingList option:selected').val();
        var isBill = $('#isBill:checked').val();
        var date = $('#date').val();
        //reset the date to make it readable by the database
        console.log(date);

        let formatDate = moment(date, 'MMM-DD-YYYY');
        console.log(formatDate);
        let newDate = formatDate.format('YYYY-MM-DD');
        console.log(newDate);
        //store the values into an object
        var data = {
            description: description,
            amount: amount,
            category: category,
            isRecurring: isBill,
            date: newDate
        }
        e.preventDefault();
        console.log('it works!');
        console.log(data);

        $.post('/entry', data).then(function (data) {
            console.log('success!');
        })
    });

});
//grab the entry info on submit
//define the object 
//put info in an ajax post