dashboard.controller("presignup",['$scope','$http','$state','auth','$stateParams',function($scope,$http ,$state,auth,$stateParams) {

    $scope.showPresignup=true;
    $scope.goSignup = function()
    {
         console.log(" go sinup is cliked");
        // $state.go("landingPage.signup");

        $scope.showPresignup=false;
        $scope.showsignup=true;

    }
}]);