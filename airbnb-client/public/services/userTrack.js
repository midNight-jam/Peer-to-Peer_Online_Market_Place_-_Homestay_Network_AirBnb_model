/**
 * Created by jayam on 11/26/16.
 */
dashboard.service("userTrack",[
  '$rootScope',
  '$http',
  '$state',
  '$window',
  function($rootScope,$http,$state,$window){
    var trackInfo;
    var track;
    this.lastVisitedTime;
  this.lastPage;
  this.addChild =function(pageName,timeStamp)
  {
    ////////////////Preparing Track Tree////////////////

    // trackInfo = $window.sessionStorage["trackInfo"];
    //
    // if(trackInfo === undefined || trackInfo === "null"){
    //     trackInfo = {};
    //     //will add the time logic later
    //   // trackInfo.lastPage = pageName;
    //   // trackInfo.lastVisitedTime= timeStamp;
    //   trackInfo.name = pageName;
    //   trackInfo.children = [];
    //   $window.sessionStorage["trackInfo"] = JSON.stringify(trackInfo);
    // }
    //
    // else{
    //   trackInfo= JSON.parse(trackInfo);
    //   while((trackInfo.children) && (trackInfo.children.length!==0)){
    //     trackInfo= trackInfo.children;
    //   }
    //   trackInfo.children = [];
    //   trackInfo.children.push({name:pageName,children:[]});
    //   $window.sessionStorage["trackInfo"] = JSON.stringify(trackInfo);
    //
    // }
    //
    // ////////////////Preparing Track Tree////////////////
    //
    // ////////////////Preparing Track ////////////////
    //
    // track = $window.sessionStorage["track"];
    // if(track === undefined || trackInfo === "null"){
    //   track = {};
    //   track[pageName] = Date.now();
    //   track.lastPage = pageName;
    //   $window.sessionStorage["track"] = JSON.stringify(track);
    // }
    //
    // else{
    //   track= JSON.parse(track);
    //   var now = Date.now();
    //   track[track.lastPage] = now - track[track.lastPage];
    //   track[pageName] = now;
    //   track.lastPage = pageName;
    //   $window.sessionStorage["track"] = JSON.stringify(track);
    // }

  }
}]);