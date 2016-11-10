function submitApproval() {
    var formNames = ["application_id", "description", "sc_ka", "failure_fault_ka", "sc_duration", "n_shots", "from_time", "to_time", "fees"];
    var ajaxData = getValObjFromDom(formNames);
    $.ajax({
        //create code through post request
        url: "http://localhost:3000/api/approvals/",
        type: "POST",
        data: ajaxData,
        dataType: "json",
        success: function (data) {
            //console.log(data);
            if (data["Error"]) {
                console.log("Approval couldn't be created, Error: " + JSON.stringify(data.Error));
            } else {
                if (data.redirect) {
                    // data.redirect contains the string URL to redirect to
                    window.location.href = data.redirect;
                }
                console.log("The approval id created is " + data.approval_id);
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            //console.log(textStatus, errorThrown);
            console.log("The Error from server is --- " + jqXHR.responseJSON.message);
        }
    });
}
