function updateApproval() {
    var formNames = ["approval_id", "application_id", "description", "sc_ka", "failure_fault_ka", "sc_duration", "n_shots", "from_time", "to_time", "fees"];
    var ajaxData = getValObjFromDom(formNames);
    $.ajax({
        //update approval through put request
        url: "http://localhost:3000/api/approvals/",
        type: "PUT",
        data: ajaxData,
        dataType: "json",
        success: function (data) {
            //console.log(data);
            if (data["Error"]) {
                console.log("Approval couldn't be updated, Error: " + JSON.stringify(data.Error));
            } else {
                if (data.redirect) {
                    // data.redirect contains the string URL to redirect to
                    window.location.href = data.redirect;
                }
                console.log("The approval update info is " + JSON.stringify(data));
                toastr.success("The approval update info is " + JSON.stringify(data));
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            //console.log(textStatus, errorThrown);
            console.log("The Error from server is --- " + jqXHR.responseJSON.message);
            toastr.error("The Error from server is --- " + jqXHR.responseJSON.message);
        }
    });
}
