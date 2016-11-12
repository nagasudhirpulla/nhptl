document.onreadystatechange = function () {
    if (document.readyState == "interactive") {

    } else if (document.readyState == "complete") {
        fetchApplications();
    }
};

function fetchApplications() {
    $.ajax({
        //fetch categories from sever
        url: "http://localhost:3000/api/applications/",
        type: "GET",
        dataType: "json",
        success: function (data) {
            //toastr["info"]("Categories fetch result is " + JSON.stringify(data.categories));
            console.log("Applications fetched are " + JSON.stringify(data.applications));
            fillApplicationsTable(data.applications);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(textStatus, errorThrown);
            toastr.error("The error from server is --- " + jqXHR.responseJSON.message);
        }
    });
}

function fillApplicationsTable(applicationsArray){
    angular.element(document.getElementById('applications-list')).scope().updateApplications(applicationsArray);
}

angular.module('ApplicationDisplayApp', ['angularUtils.directives.dirPagination'])

    .controller('ApplicationDisplayController', function ($scope) {
        $scope.sortType = 'id'; // set the default sort type
        $scope.sortReverse = true;  // set the default sort order
        $scope.searchLine = '';     // set the default search/filter term
        $scope.applications = [];

        $scope.updateApplications = function (applicationsArray) {
            $scope.applications = applicationsArray.map(function(obj) {
                obj.from_time = new Date(obj.from_time);
                obj.to_time = new Date(obj.to_time);
                obj.created_at = new Date(obj.created_at);
                obj.updated_at = new Date(obj.updated_at);
                return obj;
            });
            $scope.$apply();
        };

        //set page size
        $scope.pageSize = 30;
    });