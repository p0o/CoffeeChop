var cchopControllers = angular.module('cchopControllers',[]);

cchopControllers.controller('FrontpageCtrl', ['$scope' ,'$http',
 function($scope,$http) {
	$http.get('data/frontpage.json').success(function(data){
		$scope.lists = data.lists;
		$scope.offs = data.offs;
		$scope.offers = data.offers;
	});
}]);

cchopControllers.controller('ViewitemCtrl',['$scope','$http','$routeParams',
 function($scope,$http,$routeParams){
 	$scope.itemId = $routeParams.itemId;
}]);

// Controling the page that show lists of different items
// Dependency Injected 'list' is a provider in services.js
cchopControllers.controller('ViewlistCtrl',['$scope','$http','$routeParams','list','$location',
 function($scope,$http,$routeParams,list,$location) {
 	$scope.goToItem = function(id) {
 		$location.url('item/'+id);
 	}
 	// Using expression filtering
 	$scope.listFilter = {};
 	$scope.listFilter.list_id = $routeParams.listId;
 	// Waiting for asynchronous promise from $http
 	list.res().then(function(res) {
 		$scope.list = res.data;
 	});
 	
}]);