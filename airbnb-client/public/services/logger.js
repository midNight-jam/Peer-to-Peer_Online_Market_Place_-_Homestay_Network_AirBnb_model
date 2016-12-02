dashboard.service("logger",['$rootScope','$http','$state',function($rootScope,$http,$state){

  this.write =function(pageName,propertyName,city)
  {
    var activity ={
      userId :"anonymous",
      pageName:pageName,
      city:city
    };

    console.log('aout to wietwe..... Logger.Write =---+ ');
    $http.post('/activity',activity).success(function(res){
      console.log("got response", res);
    }).error(function(err){
      if(err){
        console.log(err);
      }
    })
    console.log("Calling servie log");
  }
}]);