/**
 * Created by Gaurang on 17-11-2016.
 */

dashboard.controller('adminGraphDashboard',function($scope, $filter,$http){
    console.log("Inside Admin Dashboard");

    $scope.totalHosts ;
    $scope.totalBookings ;
    $scope.totalRevenue ;
    $scope.properties ;

    ///Get total Revenue
    $http({
        method: 'GET',
        url: '/totalRevenue'
    }).then(function (res) {
        $scope.totalRevenue = (res.data[0].revenue)/1000;
    });


    ///Get total Bookings
    $http({
        method: 'GET',
        url: '/totalBokings'
    }).then(function (res) {
        $scope.totalBookings = res.data[0].bookings;
    });

    //Get total Listings
    $http({
        method: 'GET',
        url: '/totalListings'
    }).then(function (res) {
        $scope.properties = res.data.listings;
    });

    //Get total Users
    $http({
        method: 'GET',
        url: '/totalUsers'
    }).then(function (res) {
        $scope.totalHosts= res.data.users;
    });


    $scope.getlastMonthTopRevenueHosts = function(){
        $http({
            method: 'GET',
            url: '/adminTopTenRevenueHost'
        }).then(function (res) {
            var data = res.data;
            var hosts = Object.keys(res.data);
            var biddingRevenue = [];
            var listingRevenue = [];
            hosts.forEach(function (h) {
                var arr = [];
                biddingRevenue.push(data[h][0]);
                listingRevenue.push(data[h][1]);
            });

            $scope.drawRevenuePyramid(hosts,biddingRevenue,listingRevenue);
        });

    };
    $scope.getlastMonthTopRevenueHosts();
    $scope.drawRevenuePyramid= function (hosts,biddingRevenue,listingRevenue) {

        $(function () {
            var categories = hosts;
            $(document).ready(function () {
                Highcharts.chart('hostRevenue', {
                    chart: {
                        type: 'bar'
                    },
                    title: {
                        text: 'Top Revenue making hosts in last month'
                    },
                    subtitle: {
                        text: ''
                    },
                    xAxis: [{
                        categories: categories,
                        reversed: false,
                        labels: {
                            step: 1
                        }
                    }, { // mirror axis on right side
                        opposite: true,
                        reversed: false,
                        categories: categories,
                        linkedTo: 0,
                        labels: {
                            step: 1
                        }
                    }],
                    yAxis: {
                        title: {
                            text: null
                        },
                        labels: {
                            formatter: function () {
                                return Math.abs(this.value) + '$';
                            }
                        }
                    },

                    plotOptions: {
                        series: {
                            stacking: 'normal'
                        }
                    },

                    tooltip: {
                        formatter: function () {
                            return '<b>' + this.series.name + ', host ' + this.point.category + '</b><br/>' +
                                'Revenue: ' + Highcharts.numberFormat(Math.abs(this.point.y), 0);
                        }
                    },

                    series: [{
                        name: 'Lisiting Revenue',
                        data: biddingRevenue
                    }, {
                        name: 'Bidding Revenue',
                        data: listingRevenue
                    }]
                });
            });

        });

    }


    $scope.getPropertiesRevenue= function(){
        $http({
            method: 'GET',
            url: '/adminTopTenRevenueProperties'
        }).then(function (res) {
            var properties= res.data;
            var propertyNames= Object.keys(properties);
            var propertyRevenues = [];
            propertyNames.forEach(function (propertyKey) {
                propertyRevenues.push(properties[propertyKey]);
            });
            var _3dBargraphData = {
                data:propertyRevenues,
                keys:propertyNames
            }

            $scope.drawRevenue3DBarGraph(_3dBargraphData);
        });

    };
    $scope.getPropertiesRevenue();
    $scope.drawRevenue3DBarGraph= function (_3dBargraphData ) {

        $(function () {
            // Set up the chart
            var chart = new Highcharts.Chart({
                chart: {
                    renderTo: 'propertiesRevenue',
                    type: 'column',
                    options3d: {
                        enabled: true,
                      alpha: 12,
                      beta: 16,
                      depth: 75,
                      viewDistance: 60
                    }
                },
                xAxis: {
                    type: 'Property',
                    categories: _3dBargraphData.keys
                },
                yAxis: {
                    title: {
                        text: 'Yearly Revenue (K)'
                    }

                },
                title: {
                    text: 'Highest Revenue Properties'
                },
                subtitle: {
                    text: 'Top 10 revenue generating Properties'
                },
                plotOptions: {
                    column: {
                        depth: 25
                    }
                },
                series: [{
                    name: 'Revenue ',
                    data: _3dBargraphData.data
                }],
                // colors: ['#cc99ff']
            });

            function showValues() {
                $('#alpha-value').html(chart.options.chart.options3d.alpha);
                $('#beta-value').html(chart.options.chart.options3d.beta);
                $('#depth-value').html(chart.options.chart.options3d.depth);
            }

            // Activate the sliders
            $('#sliders input').on('input change', function () {
                chart.options.chart.options3d[this.id] = this.value;
                showValues();
                chart.redraw(false);
            });

            showValues();
        });
    }

    $scope.getCityWiseRevenue= function(){
        $http({
            method: 'GET',
            url: '/adminCityWiseRevenue'
        }).then(function (res) {
            var cities= res.data;
            var cityNames= Object.keys(cities);
            var cityNamesRevenues = [];
            cityNames.forEach(function (propertyKey) {
                cityNamesRevenues.push(cities[propertyKey]);
            });
            var cityBargraphData = {
                data:cityNamesRevenues,
                keys:cityNames
            };

            $scope.drawCityWiseRevenueGraph(cityBargraphData);
        });

    };
    $scope.getCityWiseRevenue();
    $scope.drawCityWiseRevenueGraph= function (cityBargraphData ) {
        $(function () {
            // Set up the chart
            var chart = new Highcharts.Chart({
                chart: {
                    renderTo: 'cityWiseRevenue',
                    type: 'column',
                    options3d: {
                        enabled: true,
                        alpha: 12,
                        beta: 16,
                        depth: 75,
                        viewDistance: 60
                    }
                },
                xAxis: {
                    type: 'Property',
                    categories: cityBargraphData.keys
                },
                yAxis: {
                    title: {
                        text: 'Yearly Revenue (K)'
                    }

                },
                title: {
                    text: 'City wise revenue'
                },
                subtitle: {
                    text: 'Cities with revenue for 2016 in USD'
                },
                plotOptions: {
                    column: {
                        depth: 25
                    }
                },
                series: [{
                    name: 'Revenue ',
                    data: cityBargraphData.data
                }],
                colors: ['#66dd22']
            });

            function showValues() {
                $('#alpha-value').html(chart.options.chart.options3d.alpha);
                $('#beta-value').html(chart.options.chart.options3d.beta);
                $('#depth-value').html(chart.options.chart.options3d.depth);
            }

            // Activate the sliders
            $('#sliders input').on('input change', function () {
                chart.options.chart.options3d[this.id] = this.value;
                showValues();
                chart.redraw(false);
            });

            showValues();
        });


    }


});