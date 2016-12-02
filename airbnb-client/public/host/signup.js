dashboard.controller("signup",['$scope','$http','$state','auth','$stateParams',function($scope,$http ,$state,auth,$stateParams) {


    $scope.closePopUp = function()
    {
        console.log("I am coming til here");
        $state.go("landingPage");

    }

    $scope.signUp= function()
    {

        console.log("I am clicked");
        console.log($scope.user);
        $http.post('/signup',$scope.user).success(function(res){

            console.log(res);
            if(res.msg=="success")
            {
                console.log("redirect to homepage");
                $state.go("userHome");
            }


        }).error(function(err)

        {

            if(err)
            {
                console.log(err);
            }
        })

    }

}]);