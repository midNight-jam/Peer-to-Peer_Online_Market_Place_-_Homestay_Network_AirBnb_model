dashboard.controller("hostingStepsController",
  ['$scope',
    '$http',
    '$state',
    'Upload' ,
    'isLoggedIn',
    'auth',
    'logger','$stateParams',
    function($scope,$http ,$state,Upload,isLoggedIn,auth,logger,$stateParams){

var hosting={};
$scope.loggedIn =isLoggedIn.data.user.firstname;
$scope.username =isLoggedIn.data.user.firstname;
$scope.profilePic =isLoggedIn.data.user.profilePic;
        console.log("State params",$stateParams.user,isLoggedIn.data.user.email);
 $stateParams.user =isLoggedIn.data.user.email;

console.log("Hello from hostingSteps controller");

$scope.logout = function()
{
	auth.logout();
}

$scope.hostStep1Clicked = function(){

  console.log('YOu clokec in hostStep1... (0)^(0)');

  logger.write("hostStep1") ;
}

$scope.continueStep =function()
{

	hosting.place = $scope.place;
	hosting.place.bathCount=$scope.count;

	console.log($scope.place)
	console.log(hosting);
	$state.go("hostingSteps.location",{"place":$scope.place,"user": isLoggedIn.data.user.email});

}

$scope.next = function()
{


}

$scope.pageClicked = function () {

  logger.write("hostStep1-location") ;
}

$scope.back = function()
{

$state.go("hostingSteps.step1");

}

$scope.uploadImage = function(file){
    console.log("State params afteer",$stateParams);

Upload.upload({
                url: 'http://localhost:3000/upload', //webAPI exposed to upload the file
                data:{file:file} //pass file as data, should be user ng-model
            }).then(function (resp) { //upload function returns a promise
                if(resp === "uploaded"){ //validate success
                    alert('Success ' + resp.config.data.file.name + 'uploaded. Response: ');
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