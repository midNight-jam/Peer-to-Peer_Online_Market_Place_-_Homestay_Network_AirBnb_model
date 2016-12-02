/**
 * Created by Gaurang on 14-11-2016.
 */
var dashboard =  angular.module('dashboard',['ui.router','ngMessages','ngMaterial','ngFileUpload']);

dashboard.config(function($stateProvider,$urlRouterProvider,$locationProvider)

{

	$urlRouterProvider.otherwise('/');

	$stateProvider.state('landingPage',{
		url:'/',
		templateUrl:'adminGraphDashboard/adminGraphDashboard.html',
		controller : 'adminGraphDashboard',
		//controller :"landiingPage"
	})
		.state('hostList',{
		url:"/hostList",
		templateUrl:'hostList/hostList.html',
		controller : 'hostList',
	}).state('userList', {
		url: "/userList",
		templateUrl: 'userList/userList.html',
		controller: 'userList',
	}).state('billList',{
		url:"/billList",
		templateUrl:'billList/billList.html',
		controller : 'billList',
	}).state('approvedListings',{
		url:"/approvedListings",
		templateUrl:'approvedListings/approvedListings.html',
		controller : 'approvedListings',
	}).state('pendingListings',{
		url:"/pendingListings",
		templateUrl:'pendingListings/pendingListings.html',
		controller : 'pendingListings',
	}).state('rejectedListings',{
		url:"/rejectedListings",
		templateUrl:'rejectedListings/rejectedListings.html',
		controller : 'rejectedListings',
	}).state('adminGraphDashboard',{
	url:"/adminGraphDashboard",
	templateUrl:'adminGraphDashboard/adminGraphDashboard.html',
	controller : 'adminGraphDashboard',
	});







});