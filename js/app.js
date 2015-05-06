/*=========================================================================
Loading Angularjs app module
written by Pooria Attarzadeh - github.com/p0o
=========================================================================*/

var cchopApp = angular.module('cchopApp',
	['ngRoute','cchopControllers','cchopServices','cchopAnimations','slick']);

/**
* CoffeeChop URLs routes
*/
cchopApp.config(['$routeProvider',function($routeProvider){

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
	 when('/contact', {
	 	templateUrl: 'partials/view-contact.html'
	 }).
	 otherwise({
		redirectTo: '/frontpage'
	});

}]);

/**
* CoffeeChop Feeds address - you can change them anto any files that will
* generate the expected JSON output.
*/
cchopApp.value('frontpage_feed_value',  '/data/frontpage.json');
cchopApp.value('list_feed_value',       '/data/products.json');
cchopApp.value('item_feed_value',       '/data/item_[PRODUCTID].json');
