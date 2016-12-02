dashboard.controller("afterSignIn",['$scope','$http','$state','Upload','isLoggedIn','auth' ,function($scope,$http ,$state,Upload,isLoggedIn,auth){


    $scope.uploadImage = function(file){    console.log("",isLoggedIn );
    Upload.upload({
        url: 'http://localhost:3000/uploadProfilePic', //webAPI exposed to upload the file
        data:{file:file,user:isLoggedIn.data.user.email } //pass file as data, should be user ng-model
    }).then(function (resp) { //upload function returns a promise
        console.log("Response of the server  after upload",resp);
        if(resp.data === "uploaded"){ //validate success
            //alert('Success ' + resp.config.data.file.name + 'uploaded. Response: ');
            auth.login().then(function(result)
            {

                $state.go("userHome" );
            });
        } else {
            alert('an error occured');
        }
    }, function (resp) { //catch error
        console.log('Error status: ' + resp.status);
        alert('Error status: ' + resp.status);
    }, function (evt) {
        console.log(evt);
        var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
        console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
        $scope.progress = 'progress: ' + progressPercentage + '% '; // capture upload progress
    });

    }

}]);