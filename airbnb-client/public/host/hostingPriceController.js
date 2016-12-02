dashboard.controller("hostingPriceController",['$scope','$http','$state','Upload' ,'isLoggedIn','auth','$stateParams',function($scope,$http ,$state,Upload,isLoggedIn,auth,$stateParams){


console.log("hello from price controller");

var placeType;
console.log($stateParams);

$scope.toggleView =function(val){

if(val=='auction')
{
	$scope.showFixedPrice=false;
	$scope.showAuctionPrice=true;
	$scope.place="";
	$scope.selectedA='buttonSelected';
	$scope.selectedF='';	
}
if(val=='fixed')
{
	$scope.showFixedPrice=true;
	$scope.showAuctionPrice=false;
	$scope.place="";
	$scope.selectedF='buttonSelected';	
	$scope.selectedA='';
}

}
$scope.finish=function()
    {
        console.log($stateParams.place);

       
        if($scope.place.availableTillDate<$scope.place.availableFromDate)
        {
        	console.log("err");
        	alert("Check out date should be greater tha checkin date");
        }
        else
        {
        	console.log("all good");

        	if( typeof $scope.place.auctionPrice== 'undefined')
            {
                $scope.place.auctionPrice=null;
            }
            if(typeof $scope.place.fixedPrice=='undefined')
            {
                $scope.place.fixedPrice=null;
            }

        placeType =$stateParams.place;

        placeType.auctionPrice=$scope.place.auctionPrice;
        placeType.fixedPrice=$scope.place.fixedPrice;
        placeType.availableFromDate=$scope.place.availableFromDate;
        placeType.availableTillDate=$scope.place.availableTillDate;
        placeType.hostId=$stateParams.user; 
        console.log(placeType);
        //$state.go('hostingSteps.uploadImage',{"place":placeType})

        $http.post('/newListing',placeType).success(function(res){

        	console.log("got response", res);

            $state.go("hostingSteps.upload",{"listId":res.listId});
        }).error(function(err){

        	if(err){
        		console.log(err);
        	}
        })
        }

        ;
    }


}])