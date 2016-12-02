/**
 * Created by Mak on 11/19/16.
 */


dashboard.controller("hostDashboard",['$scope','$http','$state','isLoggedIn','auth' ,function($scope,$http ,$state,isLoggedIn,auth) {

    // get areas less seen and draw pie chart
    $scope.getAreasLessSeen = function(){
        $http({
            method: 'GET',
            url: '/adminGetLessSeenAreas'
        }).then(function (res) {
            var areas= res.data;
            var areaNames= [];
            var areasData = [];
            areas.forEach(function (arr) {

                if(arr.area){
                  if(areaNames.indexOf(arr.area) ===-1){
                    var tuple = [];
                    tuple.push(arr.area);
                    tuple.push(arr.seen);
                    areasData.push(tuple);
                    areaNames.push(arr.area);
                  }

                }
            });

            lessSeenAreasData = areasData;
            $scope.drawLessSeenAreasPieGraph(lessSeenAreasData);
        });

    };

    $scope.getAreasLessSeen();

    $scope.drawLessSeenAreasPieGraph = function (lessSeenAreasData) {

        $(function () {
            Highcharts.chart('arealessSeen', {
                chart: {
                    type: 'pie',
                    options3d: {
                        enabled: true,
                        alpha: 45
                    }
                },
                title: {
                    text: "Area's  which are less seen"
                },
                subtitle: {
                    text: ''
                },
                plotOptions: {
                    pie: {
                        innerSize: 100,
                        depth: 45
                    }
                },
                series: [{
                    name: 'Area explored by only',
                    data:lessSeenAreasData
                }]
            });
        });

    }

    // get Prperty Clicks and draw Bar Graph
    $scope.getPropertyClicks = function(){
        $http({
            method: 'GET',
            url: '/adminGetAllAnalytics'
        }).then(function (res) {
            var propertyClicks= res.data.propertiesClick;
            var areas= res.data;
            var propertyNames= Object.keys(propertyClicks);
            var propertyClicksData = [];
            var propertyClicksName= [];
            propertyNames.forEach(function (propertyKey) {
                var dataObj = {};
                dataObj.name=propertyKey;
                dataObj.drilldown=propertyKey;
                dataObj.y = propertyClicks[propertyKey];
                propertyClicksData.push(dataObj);
                propertyClicksName.push(propertyKey);
            });
            var bargraphData = {
                data:propertyClicksData,
                keys:propertyClicksName
            }
            $scope.propertyClickBarGraph(bargraphData);
            $scope.drawUserTrackLinePlotGraph(res.data.userTrack);
            $scope.drawTrackTree(res.data.userTrackTree);
        });

    };


    $scope.getPropertiesBids = function(){
        $http({
            method: 'POST',
            url: '/adminBiddingTrack'
        }).then(function (res) {
            console.log(res);
            var finalGraphData = [];
            var keys = Object.keys(res.data);
            var data = res.data;
            keys.forEach(function (prop) {
                var tuple = {};
                tuple.name = prop;
                tuple.data = data[prop];
                finalGraphData.push(tuple);
            });

            $scope.drawBiddingTrack(finalGraphData);
        });

    };

    $scope.getPropertiesBids();


    $scope.drawBiddingTrack = function (finalGraphData) {

        var keys = Object.keys(finalGraphData);
        $(function () {
            Highcharts.chart('trackBidding', {
                chart: {
                    type: 'line'
                },
                title: {
                    text: 'Bid Price Track on Properties'
                },
                subtitle: {
                    text: ''
                },
                xAxis: {
                    categories: keys
                },
                yAxis: {
                    title: {
                        text: 'Bid Price ($)'
                    }
                },
                plotOptions: {
                    line: {
                        dataLabels: {
                            enabled: true
                        },
                        enableMouseTracking: false
                    }
                },
                series:finalGraphData

            });
        });

    }



    $scope.getPropertyClicks();

    /// draw user track plot graph
    $scope.drawUserTrackLinePlotGraph = function (trackData) {
        console.log('readt for graph'+trackData);

        var pages = [];
        var userData = [];
        var userKeys = Object.keys(trackData);
        userKeys.forEach(function (key) {

            var graphUser = {};
            graphUser.name = key;
            graphUser.data = [];

            var userSpentPage = Object.keys(trackData[key]);

            userSpentPage.forEach(function (usp) {
                if(usp!=="area"){
                    if(pages.indexOf(usp) === -1 ){
                        pages.push(usp);
                    }
                    graphUser.data.push((trackData[key][usp]/100));
                }

            });
            userData.push(graphUser);
        });

        console.log(userData);

        $(function () {
            Highcharts.chart('trackByUser', {
                title: {
                    text: 'User Activity',
                    x: -20 //center
                },
                subtitle: {
                    text: 'activity per page',
                    x: -20
                },
                xAxis: {
                    categories: pages
                },
                yAxis: {
                    title: {
                        text: 'Seconds spent'
                    },
                    plotLines: [{
                        value: 0,
                        width: 1,
                        color: '#808080'
                    }]
                },
                tooltip: {
                    valueSuffix: 's'
                },
                legend: {
                    layout: 'vertical',
                    align: 'right',
                    verticalAlign: 'middle',
                    borderWidth: 0
                },
                series: userData
            });
        });

    }


    // draw User track

    $scope.revenuCount = 1;

    $scope.getPropertyReview = function(){
        $http({
            method: 'POST',
            url: '/getHostRatings',
            data: {user:'ram@gmail.com'}
        }).success(function (res) {
            console.log(res);

            var keys = Object.keys(res)

            var finalData = [];

            keys.forEach(function (k) {

                var tuple = {};
                tuple.name = k;
                tuple.data = Object.values(res[k]);

                finalData.push(tuple);
            });

            $scope.draPropertyReveiwStackGraph(keys,finalData);
        });



        $scope.draPropertyReveiwStackGraph =function (keys,finalData) {


            $(function () {
                Highcharts.chart('propertyReview', {
                    chart: {
                        type: 'bar'
                    },
                    title: {
                        text: 'Stacked bar chart'
                    },
                    xAxis: {
                        categories: keys
                    },
                    yAxis: {
                        min: 0,
                        title: {
                            text: 'Total fruit consumption'
                        }
                    },
                    legend: {
                        reversed: true
                    },
                    plotOptions: {
                        series: {
                            stacking: 'normal'
                        }
                    },
                    series: finalData
                });
            });

        };



    }
    $scope.getPropertyReview ();

    $scope.propertyClickBarGraph = function (bargraphData) {
        $(function () {
            // Create the chart
            Highcharts.chart('propertyClick', {
                chart: {
                    type: 'column'
                },
                title: {
                    text: 'Hits on your Properties'
                },
                subtitle: {
                    text: 'Click the columns to view details.'
                },
                xAxis: {
                    type: 'Property',
                    categories: bargraphData.keys
                },
                yAxis: {
                    title: {
                        text: 'No of Clicks '
                    }

                },
                legend: {
                    enabled: false
                },
                plotOptions: {
                    series: {
                        borderWidth: 0,
                        dataLabels: {
                            enabled: true,
                            format: '{point.y:.0f}'
                        }
                    }
                },

                tooltip: {
                    headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
                    pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.0f}</b> Clicks<br/>'
                },

                series: [{
                    name: 'Property',
                    colorByPoint: true,
                    data: bargraphData.data
                }],
                drilldown: {
                    series: [{
                        name: 'Microsoft Internet Explorer',
                        id: 'Microsoft Internet Explorer',
                    },
                        {
                            name: 'Chrome',
                            id: 'Chrome',
                        }, {
                            name: 'Firefox',
                            id: 'Firefox',
                        }, {
                            name: 'Safari',
                            id: 'Safari'
                        },
                        {
                            name: 'Opera',
                            id: 'Opera'
                        }
                    ]}
            });
        });
    };

    $scope.loggedIn=true;
    $scope.profilePic=isLoggedIn.data.user.profilePic;
    $scope.host=isLoggedIn.data.user.host;
    $scope.username=isLoggedIn.data.user.firstname;
    $scope.logout= function(){
        auth.logout();
    };

    $scope.dropdownChange ="changeDropdown";

    $scope.drawTrackTree = function (treeData) {

        var users = Object.keys(treeData);
        var allData = {
            name:'LandingPage',
            children:[]
        };
        users.forEach(function (u) {
            var tuple = {
                name:u,
                children:[treeData[u]]
            };
            allData.children.push(tuple);
        });

        treeData = allData;

        var width = 1070;
        var height = 400;
        var maxLabel = 150;
        var duration = 500;
        var radius = 5;

        var i = 0;
        var root;

        var tree = d3.layout.tree()
          .size([height, width]);

        var diagonal = d3.svg.diagonal()
          .projection(function(d) { return [d.y, d.x]; });

        var svg = d3.select("#tree").append("svg")
          .attr("width", width)
          .attr("height", height)
          .append("g")
          .attr("transform", "translate(" + maxLabel + ",0)");

        root = treeData;
        root.x0 = height / 2;
        root.y0 = 0;

        root.children.forEach(collapse);

        function update(source)
        {
            // Compute the new tree layout.
            var nodes = tree.nodes(root).reverse();
            var links = tree.links(nodes);

            // Normalize for fixed-depth.
            nodes.forEach(function(d) { d.y = d.depth * maxLabel; });

            // Update the nodes…
            var node = svg.selectAll("g.node")
              .data(nodes, function(d){
                  return d.id || (d.id = ++i);
              });

            // Enter any new nodes at the parent's previous position.
            var nodeEnter = node.enter()
              .append("g")
              .attr("class", "node")
              .attr("transform", function(d){ return "translate(" + source.y0 + "," + source.x0 + ")"; })
              .on("click", click);

            nodeEnter.append("circle")
              .attr("r", 0)
              .style("fill", function(d){
                  return d._children ? "lightsteelblue" : "white";
              });

            nodeEnter.append("text")
              .attr("x", function(d){
                  var spacing = computeRadius(d) + 5;
                  return d.children || d._children ? -spacing : spacing;
              })
              .attr("dy", "3")
              .attr("text-anchor", function(d){ return d.children || d._children ? "end" : "start"; })
              .text(function(d){ return d.name; })
              .style("fill-opacity", 0);

            // Transition nodes to their new position.
            var nodeUpdate = node.transition()
              .duration(duration)
              .attr("transform", function(d) { return "translate(" + d.y + "," + d.x + ")"; });

            nodeUpdate.select("circle")
              .attr("r", function(d){ return computeRadius(d); })
              .style("fill", function(d) { return d._children ? "lightsteelblue" : "#fff"; });

            nodeUpdate.select("text").style("fill-opacity", 1);

            // Transition exiting nodes to the parent's new position.
            var nodeExit = node.exit().transition()
              .duration(duration)
              .attr("transform", function(d) { return "translate(" + source.y + "," + source.x + ")"; })
              .remove();

            nodeExit.select("circle").attr("r", 0);
            nodeExit.select("text").style("fill-opacity", 0);

            // Update the links…
            var link = svg.selectAll("path.link")
              .data(links, function(d){ return d.target.id; });

            // Enter any new links at the parent's previous position.
            link.enter().insert("path", "g")
              .attr("class", "link")
              .attr("d", function(d){
                  var o = {x: source.x0, y: source.y0};
                  return diagonal({source: o, target: o});
              });

            // Transition links to their new position.
            link.transition()
              .duration(duration)
              .attr("d", diagonal);

            // Transition exiting nodes to the parent's new position.
            link.exit().transition()
              .duration(duration)
              .attr("d", function(d){
                  var o = {x: source.x, y: source.y};
                  return diagonal({source: o, target: o});
              })
              .remove();

            // Stash the old positions for transition.
            nodes.forEach(function(d){
                d.x0 = d.x;
                d.y0 = d.y;
            });
        }

        function computeRadius(d)
        {
            if(d.children || d._children) return radius + (radius * nbEndNodes(d) / 10);
            else return radius;
        }

        function nbEndNodes(n)
        {
            nb = 0;
            if(n.children){
                n.children.forEach(function(c){
                    nb += nbEndNodes(c);
                });
            }
            else if(n._children){
                n._children.forEach(function(c){
                    nb += nbEndNodes(c);
                });
            }
            else nb++;

            return nb;
        }

        function click(d)
        {
            if (d.children){
                d._children = d.children;
                d.children = null;
            }
            else{
                d.children = d._children;
                d._children = null;
            }
            update(d);
        }

        function collapse(d){
            if (d.children){
                d._children = d.children;
                d._children.forEach(collapse);
                d.children = null;
            }
        }

        update(root);

    }

}]);
