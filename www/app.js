function onDeviceReady() {

    navigator.geolocation.getCurrentPosition(onSuccess, onError);

    function onSuccess(position) {
        $('#Lat').val(position.coords.latitude);
        $('#Lang').val(position.coords.longitude);
    }

    function onError(error) {
        alert('code: ' + error.code + '\n' +
              'message: ' + error.message + '\n');
    }

    $('select#CarType').change(function () {
        $('#spanCarType').text($(this).attr('value'));
    });

    $('select#PickupTime').change(function () {
        $('#spanPickupTime').text($(this).attr('value'));
    });

    $('select#Services').change(function () {
        $('#spanServices').text($(this).attr('value'));
    });

    $('#submit').click(function () {

        if ($('#FirstName').val() == '') {
            alert('Please enter first name');
            $('#FirstName').focus();
            return;
        }

        if ($('#LastName').val() == '') {
            alert('Please enter last name');
            $('#LastName').focus();
            return;
        }

        if ($('#Email').val() == '' && $('#Phone').val() == '') {
            alert('Email/Phone is required');
            return;
        }

        var postData = $('#ceeadaForm').serialize();
        $.post("http://ceeada.azurewebsites.net/api/booking",
        postData,
        function (json) {
            if (json == null || json == 'undefined') {
                alert("Failed Booking, Please contact administrator");
            }
            else {
                alert("Saved successfully");
                $('#FirstName').val('').focus();
                $('#LastName').val('');
                $('#Email').val('');
                $('#Phone').val('');
                $('#Date').val('');
                $('#NumberOfPassengers').val('');
                $("select#CarType")[0].selectedIndex = 0;
                $("select#PickupTime")[0].selectedIndex = 0;
                $("select#Services")[0].selectedIndex = 0;
                $('#spanCarType').text('Car Type');
                $('#spanPickupTime').text('Pickup Time');
                $('#spanServices').text('Services');
                $('#SpeacialRequests').val('')
            }
        });       
               
        return false;
    });
}

