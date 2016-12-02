dashboard.controller("userHome",['$scope','$http','$state','Upload' ,'isLoggedIn', '$cookies','$cookieStore','auth','$stateParams','logger',function($scope,$http ,$state,Upload,isLoggedIn,$cookies,$cookieStore,auth,$stateParams,logger){

    $scope.fixedPriceLandingPage = true;
    $scope.auctionsLandingPage = false;
     $scope.loggedIn=true;
     console.log("Hello from userHome Controller");

     console.log(isLoggedIn);
     $scope.profilePic=isLoggedIn.data.user.profilePic;
     $scope.host=isLoggedIn.data.user.host;
     console.log(auth.getUserInfo());

    $scope.logout= function(){
        auth.logout();
        };

   $scope.dropdownChange ="changeDropdown";


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
        logger.write('userHome');
    }

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