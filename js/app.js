/*=========================================================================
Loading Angularjs app module
written by Pooria Attarzadeh - github.com/p0o
=========================================================================*/

var cchopApp = angular.module('cchopApp',['ngRoute','cchopControllers']);

cchopApp.config(['$routeProvider',function($routeProvider){
	
	$routeProvider.when('/frontpage',{
		templateUrl: 'partials/front-page.html',
		controller: 'FrontpageCtrl'
	}).
	otherwise({
		redirectTo: '/frontpage'
	});
}]);
