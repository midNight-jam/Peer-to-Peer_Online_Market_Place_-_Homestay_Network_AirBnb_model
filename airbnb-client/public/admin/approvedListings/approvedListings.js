/**
 * Created by Gaurang on 15-11-2016.
 */


dashboard.controller('approvedListings',function($scope, $filter,$http){

    $scope.invalid_login = true;
    $scope.unexpected_error = true;

    console.log("Admin: inside approvedListings controller.");

    initialize();
    function initialize() {
        $http({
            method: "POST",
            url: '/adminGetAllApprovedListings',
            data: {}
        }).success(function (data) {
            console.log("inside success");
            console.log(data);

            $scope.approvedListings = data;

        }).error(function (error) {
            console.log("inside error");
            console.log(error);

        });
    }
    
});