dashboard.controller("landingPage",[
  '$scope',
  '$http',
  '$state' ,
  'logger' ,
    'auth',
    '$cookies',
    '$cookieStore',
  function($scope,$http ,$state, logger,auth,$cookies,$cookieStore){

console.log("Hello from landingPage");

    $scope.fixedPriceLandingPage = true;
    $scope.auctionsLandingPage = false;
    $scope.myInterval = 4000;
    $scope.noWrapSlides = false;
    $scope.active = 0;
    var currIndex = 0;
    $scope.slides = [
        {
            image: 'https://a0.muscache.com/airbnb/static/engagement/p1/medium/keynote_mobile_med.jpg',
			id:0,
			header:"Airbnb Places",
			text:"Get lost in a city with insiders, like Woody.",
            buttontext:"See what' New",
			class:"side"
        },
        {
            image: 'https://a0.muscache.com/airbnb/static/engagement/p1/medium/experiences_mobile_med.jpg',
            id:1,
            header:"Airbnb Places",
            text:"Get lost in a city with insiders, like Woody.",
            buttontext:"See what' New",
            class:"top"

        },
        {
            image: 'https://a0.muscache.com/airbnb/static/engagement/p1/medium/worldoftrips5_tablet.jpg',
            id:2,
            header:"Airbnb Places",
            text:"Get lost in a city with insiders, like Woody.",
            buttontext:"See what' New",
            class:"top"
        },
        {
            image: 'https://a0.muscache.com/airbnb/static/engagement/p1/medium/places_mobile_med.jpg',
            id:3,
            header:"Airbnb Places",
            text:"Get lost in a city with insiders, like Woody.",
            buttontext:"See what' New",
            class:"side"
        }
    ];


$scope.showDate =function(dt) {
    console.log("In show date", dt);


    if (dt == "checkin") {
        console.log("in checkin");

        if ($scope.checkin) {
            $scope.checkin = false;
            $scope.dt.checkin = "";
        }
        else {
            $scope.checkin = true;
            $scope.checkout = false;
        }

        if ($scope.dt) {
            $scope.dt.checkin = "";
        }
    }

    if (dt == "checkout") {
        if ($scope.dt) {
            $scope.dt.checkout = "";
        }

        if ($scope.checkout) {

            $scope.checkout = false;
        }
        else {
            $scope.checkin = false;
            $scope.checkout = true;
        }
    }

}




$scope.login = function ()
{

	$scope.showWrapper=true;
    $scope.showLogin =true;
	$scope.showPreSignup=false;
	$scope.showSignup=false;

}

$scope.closePopUp = function()
{
	console.log("I am coming til here");
    $scope.showWrapper=false;
    $scope.showLogin =false;
    $scope.showPreSignup=false;
    $scope.showSignup=false;

}

$scope.signin = function()
{
	if($scope.user==undefined)
	{
		$scope.authError = true;
		$scope.authErrorMessage ="Please enter username and password";
	}
	else
	{
		$scope.authError = false;
		console.log("inside signin");
				$http.post('/login',$scope.user).success(function(res){

			if(res.msg=="404")
			{

				$scope.authError = true;
				$scope.authErrorMessage ="Email id not found, Please register";
				//$scope.incorrectCredentials = true;
			}

			else if(res.msg=="success")
			{
				$scope.authError = false;
				console.log("response" +JSON.stringify(res));
				//$scope.authError = true;
                 auth.login().then(function(result)
                 {

                     $state.go("userHome" );
                 });


			}
			else if(res.msg=="IncorrectPassword")
			{
				$scope.authError = true;
				$scope.authErrorMessage ="Invalid Password";
				//$scope.incorrectCredentials = true;
			}
			else if(res=="Timeout")
			{
				alert("Request Timeout, Please try again ");
			}


		}).error(function(err){

			if(err=="Unauthorized")
			{

				$scope.authErrorMessage ="Invalid Email or Password";
			}


		})

	}
}


$scope.openSignUp = function ()
{
    $scope.showWrapper=true;
	$scope.showLogin=false;
	$scope.showPreSignup=true;

}
$scope.goSignup = function()
{
    $scope.showWrapper=true;
	$scope.showLogin=false;
	$scope.showPreSignup=false;
	$scope.showSignUp=true;
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
                $scope.showWrapper=false;
                $scope.showLogin=false;
                $scope.showPreSignup=false;
                $scope.showSignUp=false;
                auth.login().then(function(result)
                {

                    $state.go("landingPage.afterSignIn" );
                })
                ;
			}

			else if(res.msg=="UserExist") {

			    console.log("In user Exist");
			    $scope.authError = true;
                $scope.authErrorMessage="Email already registered";


            }


		}).error(function(err)

		{

			if(err)
			{
				console.log(err);
			}
		})

}


/********Kunal-Search function from landing page************/

$scope.searchAll = function(dstcity)
{
            console.log("Destination City:"+dstcity);
            if(dstcity !== undefined)

            {
                $scope.error = false;
                console.log("*****LandingPage*********Searching the properties******")
                console.log("Dst City:"+dstcity);
                localStorage.setItem("dstcity1", dstcity);
                console.log("localstorage dstcity:"+localStorage.dstcity1);
               //$state.go("showalllistings",{"listings":data.properties});
               $state.go("showalllistings");


                /*$http({

                    method : "POST",
                    url: '/getProperties',
                    data: {

                        "dstcity": dstcity

                    }
                }).success(function(data)
                {

                    console.log("Status Code " + data.statusCode);
                    if(data.statusCode==200)
                    {
                        console.log("Fetched Properties ");
                        console.log("Data:"+data);


                       /!* $cookieStore.put('properties', data.properties);
                        $scope.x = { "properties" : $cookieStore.get('properties')};
                         console.log("Cookies X:"+$scope.x);
                         $scope.properties = $scope.x.properties;
                         console.log("Cookies Properties:"+$scope.properties);

                         console.log("Cookies:"+$scope.properties);*!/
                       /!* $state.go("showalllistings");*!/

/!*
                        $state.go("showalllistings",{"listings":data.properties});
*!/



                    }

                })*/
            }
            else
                       {
                           $scope.error =true;
                           $scope.msg = "*Please enter the destination city";
                        }




};


      $scope.pageClicked = function(){
          logger.write('landingPage');
      };



      function getCities()
      {
          $http.get("/allCities").success(function (res) {

              console.log("response",res);
               $scope.cities=res.fixedCity;
               $scope.auctionCities=res.auctionCity;

          }).error(function(err){

              console.log(err);
          })
      }
      getCities();



}]);