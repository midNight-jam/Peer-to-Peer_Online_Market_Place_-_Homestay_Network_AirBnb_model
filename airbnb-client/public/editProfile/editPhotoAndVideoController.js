dashboard.controller("editPhotoAndVideoController",['$scope','$http','$state','Upload' ,'isLoggedIn','auth','$stateParams',function($scope,$http ,$state,Upload,isLoggedIn,auth,$stateParams){
	$scope.loggedIn = isLoggedIn.data.user.firstname;
	$scope.profilePic = isLoggedIn.data.user.profilePic;
	$scope.host = isLoggedIn.data.user.host;
	$scope.myVideo = isLoggedIn.data.user.profileVideo;

	
	$scope.logout= function(){
        auth.logout();
    };

    $scope.dropdownChange ="changeDropdown";



    $scope.uploadImage = function(file){    console.log("",isLoggedIn );
        Upload.upload({
            url: 'http://localhost:3000/uploadProfilePic', //webAPI exposed to upload the file
            data:{file:file,user:isLoggedIn.data.user.email } //pass file as data, should be user ng-model
        }).then(function (resp) { //upload function returns a promise
            console.log("Response of the server  after upload",resp);
            if(resp.data === "uploaded"){ //validate success
                //alert('Success ' + resp.config.data.file.name + 'uploaded. Response: ');

					alert("Profile updated Successfully");
                $state.go($state.current, {}, {reload: true})

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


    $scope.uploadTheVideo = function(file){    console.log("",isLoggedIn );
        Upload.upload({
            url: 'http://localhost:3000/uploadProfileVideo', //webAPI exposed to upload the file
            data:{file:file,user:isLoggedIn.data.user.email } //pass file as data, should be user ng-model
        }).then(function (resp) { //upload function returns a promise
            console.log("Response of the server  after upload",resp);
            if(resp.data === "uploaded"){ //validate success
                //alert('Success ' + resp.config.data.file.name + 'uploaded. Response: ');

                alert("Video updated Successfully");
                $state.go($state.current, {}, {reload: true})

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