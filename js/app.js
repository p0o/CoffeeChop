/*=========================================================================
Loading Angularjs app module
written by Pooria Attarzadeh - github.com/p0o
=========================================================================*/

var cchopApp = angular.module('cchopApp',['ngRoute','cchopControllers','cchopServices']);

// App URL routes
cchopApp.config(['$routeProvider',function($routeProvider){

	$routeProvider.
	 when('/frontpage',{
		templateUrl: 'partials/front-page.html',
		controller: 'FrontpageCtrl'
	 }).
	 when('/item/:itemId',{
		templateUrl: 'partials/view-item.html',
		controller: 'ViewitemCtrl'
	 }).
	 when('/list/:listId',{
	 	templateUrl:'partials/view-list.html',
	 	controller: 'ViewlistCtrl'
	 }).
	 otherwise({
		redirectTo: '/frontpage'
	 });
}]);

// Feeds used to load data
cchopApp.value('frontpage_feed_value',  '/data/frontpage.json');
cchopApp.value('list_feed_value',       '/data/products.json');
cchopApp.value('item_feed_value',       '/data/item_[PRODUCTID].json?ss=3');
