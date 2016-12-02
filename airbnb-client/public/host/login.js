dashboard.controller("login",['$scope','$http','$state','auth','$stateParams',function($scope,$http ,$state,auth,$stateParams) {

    $scope.signin = function () {
        if ($scope.user == undefined) {
            $scope.authError = true;
            $scope.authErrorMessage = "Please enter username and password";
        }
        else {
            $scope.authError = false;
            console.log("inside signin");
            $http.post('/login', $scope.user).success(function (res) {

                if (res.msg == "404") {

                    $scope.authError = true;
                    $scope.authErrorMessage = "Email id not found, Please register";
                    //$scope.incorrectCredentials = true;
                }

                else if (res.msg == "success") {
                    $scope.authError = false;
                    console.log("response" + JSON.stringify(res));

                    $state.go("userHome" );

                }
                else if (res.msg == "IncorrectPassword") {
                    $scope.authError = true;
                    $scope.authErrorMessage = "Invalid Password";
                    //$scope.incorrectCredentials = true;
                }
                else if (res == "Timeout") {
                    alert("Request Timeout, Please try again ");
                }


            }).error(function (err) {

                if (err == "Unauthorized") {

                    $scope.authErrorMessage = "Invalid Email or Password";
                }


            })

        }
    }


    $scope.closePopUp = function()
    {
        console.log("I am coming til here");
        $state.go("landingPage");

    }

}]);