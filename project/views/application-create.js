function submitApplication() {
    var formNames = ["description", "sc_ka", "failure_fault_ka", "sc_duration", "n_shots", "from_time", "to_time"];
    var ajaxData = getValObjFromDom(formNames);
    $.ajax({
        //create code through post request
        url: "http://localhost:3000/api/applications/",
        type: "POST",
        data: ajaxData,
        dataType: "json",
        success: function (data) {
            //console.log(data);
            if (data["Error"]) {
                console.log("Application couldn't be created, Error: " + JSON.stringify(data.Error));
            } else {
                if (data.redirect) {
                    // data.redirect contains the string URL to redirect to
                    window.location.href = data.redirect;
                }
                console.log("The application id created is " + data.application_id);
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            //console.log(textStatus, errorThrown);
            console.log("The Error from server is --- " + jqXHR.responseJSON.message);
        }
    });
}
