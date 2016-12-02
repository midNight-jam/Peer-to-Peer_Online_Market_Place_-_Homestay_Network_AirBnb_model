
dashboard.factory("auth", ["$http","$q","$window","$state",function ($http, $q, $window,$state) {
    var userInfo;
console.log("In the factorty");
    function login() {
        var deferred = $q.defer();
        console.log("In the factorty login called");
        $http.get("/isLoggedIn")
            .then(function (result) {
            	console.log("userInfo in service ",result);
                userInfo = result;
                $window.sessionStorage["userInfo"] = JSON.stringify(userInfo);
                deferred.resolve(userInfo);
            }, function (error) {
                deferred.reject(error);
            });

        return deferred.promise;
    }

    function logout() {
        // var deferred = $q.defer();
        writeUserTrackTree();
        writeUserTrack();
        $http.get("/logout").then(function (result) {
            userInfo = null;
			console.log("I am in the logout");
            $window.sessionStorage["userInfo"] = null;
            $state.go("landingPage");
            // deferred.resolve(result);
        }, function (error) {
            // deferred.reject(error);
        });

        // return deferred.promise;
    }

    function writeUserTrackTree() {

        // console.log($window.sessionStorage["trackInfo"]);
        //
        // var trackTree = $window.sessionStorage["trackInfo"];
        // if(trackTree ){
        //     trackTree = JSON.parse(trackTree);
        //   var email = userInfo.data.user.email;
        //   email = email.replace('.','_');
        //     var msg = {
        //         user: email,
        //         tree:trackTree
        //     };
        //
        //     $window.sessionStorage["trackInfo"] = null;
        //
        //     $http.post('/trackTree',msg).success(function(res){
        //         console.log("got response", res);
        //     }).error(function(err){
        //         if(err){
        //             console.log(err);
        //         }
        //     });
        //
        // }

    }

    function writeUserTrack() {

        // console.log($window.sessionStorage["track"]);
        //
        // var track = $window.sessionStorage["track"];
        // if(track ){
        //     track = JSON.parse(track);
        //     var now = Date.now();
        //     track[track.lastPage] = now - track[track.lastPage];
        //
        //     delete track['lastPage'];
        //
        //     var userInfo = getUserInfo();
        //     var email = userInfo.data.user.email;
        //     email = email.replace('.','_');
        //     var msg = {
        //         userId:email,
        //         area:'some',
        //         track:track
        //     };
        //
        //     $window.sessionStorage["track"] = null;
        //
        //     $http.post('/track',msg).success(function(res){
        //         console.log("got response", res);
        //     }).error(function(err){
        //         if(err){
        //             console.log(err);
        //         }
        //     });
        //
        // }

    }

    function getUserInfo() {
        return userInfo;
    }

    function init() {
        if ($window.sessionStorage["userInfo"]) {

            userInfo = JSON.parse($window.sessionStorage["userInfo"]);
            console.log("USER INFO after refreshing the session",JSON.stringify(userInfo));
        }
    }
    init();



    return {
        login: login,
         logout: logout,
        getUserInfo: getUserInfo
    };
}]);


dashboard.run(["$rootScope", "$state", function ($rootScope, $state) {

    // $rootScope.$on("$routeChangeSuccess", function (userInfo) {
    //     console.log(userInfo);
    // });
    console.log("dashborad window");
    $rootScope.$on("$stateChangeError", function (event, current, previous, eventObj,x) {
        console.log("roueChangeError",event);
        console.log("roueChangeError",current.name);
        // console.log("roueChangeError",previous);
        // console.log("roueChangeError",eventObj);
        // console.log("roueChangeError",x);
        if (current.name == "landingPage") {
            console.log("BINGO")
            $state.go("userHome");
        }
    });
}]);