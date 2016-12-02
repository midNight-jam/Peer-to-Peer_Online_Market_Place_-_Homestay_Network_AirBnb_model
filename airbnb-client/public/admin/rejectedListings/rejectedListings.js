/**
 * Created by Gaurang on 15-11-2016.
 */


dashboard.controller('rejectedListings',function($scope, $filter,$http){

    $scope.invalid_login = true;
    $scope.unexpected_error = true;

    console.log("Admin: inside rejectedListings controller.");

    initialize();
    function initialize() {
        $http({
            method: "POST",
            url: '/adminGetAllRejectedListings',
            data: {}
        }).success(function (data) {
            console.log("inside success");
            console.log(data);

            $scope.rejectedListings = data;

        }).error(function (error) {
            console.log("inside error");
            console.log(error);

        });
    }

});