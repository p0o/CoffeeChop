/*=========================================================================
Loading Angularjs app module
written by Pooria Attarzadeh - github.com/p0o
=========================================================================*/

var cchopApp = angular.module('cchopApp',
	['ngRoute','cchopControllers','cchopServices','cchopAnimations']);

// App URL routes
cchopApp.config(['$routeProvider','$locationProvider',function($routeProvider, $locationProvider){

	$routeProvider.
	 when('/frontpage',{
		templateUrl: 'partials/front-page.html',
		controller: 'FrontpageCtrl'
	 }).
	 when('/item/:itemId',{
		templateUrl: 'partials/view-item.html',
		controller: 'ViewItemCtrl'
	 }).
	 when('/list/:listId',{
	 	templateUrl: 'partials/view-list.html',
	 	controller: 'ViewListCtrl'
	 }).
	 when('/list/:listId/sort/:sortType',{
	 	templateUrl: 'partials/view-list.html',
	 	controller: 'ViewListCtrl'
	 }).
	 when('/cart', {
	 	templateUrl: 'partials/view-cart.html',
	 	controller: 'ViewCartCtrl'
	 }).
	 otherwise({
		redirectTo: '/frontpage'
	});

	//$locationProvider.html5Mode(true);
}]);

// Feeds used to load data
cchopApp.value('frontpage_feed_value',  '/data/frontpage.json');
cchopApp.value('list_feed_value',       '/data/products.json');
cchopApp.value('item_feed_value',       '/data/item_[PRODUCTID].json');
