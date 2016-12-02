dashboard.controller("hostingUploadController",['$scope','$http','$state','Upload' ,'isLoggedIn','auth','$stateParams',function($scope,$http ,$state,Upload,isLoggedIn,auth,$stateParams){


console.log("Hello from upload controller");

console.log("stateparams",$stateParams);

$scope.uploadImage = function(){

console.log($scope.up.file.length);
file=$scope.up.file;
console.log($scope.up.file);

Upload.upload({
                url: 'http://localhost:3000/upload', //webAPI exposed to upload the file
                data:{file:file,listId:$stateParams } //pass file as data, should be user ng-model
            }).then(function (resp) { //upload function returns a promise
                if(resp.data === "uploaded"){ //validate success
                    alert('Success ' + resp.config.data.file.name + 'uploaded. Response: ');

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