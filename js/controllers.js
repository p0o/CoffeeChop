var cchopControllers = angular.module('cchopControllers',[]);

cchopControllers.controller('FrontpageCtrl', ['$scope' ,'$http',
 function($scope,$http) {
	$http.get('data/frontpage.json').success(function(data){
		$scope.lists = data.lists;
		$scope.offs = data.offs;
		$scope.offers = data.offers;
	});
}]);

cchopControllers.controller('ViewitemCtrl',['$scope','$http','$routeParams','item_feed_value',
 function($scope,$http,$routeParams,feedTemplateURL){
 	var url = null;

 	// Size selector
 	$scope.sizeBtn = {};
 	$scope.sizeBtnToggle = function(size) {
 		$scope.sizeBtn[size] = !$scope.sizeBtn[size];
 	}
 	// Color selector
 	$scope.colorBtn = {};
 	$scope.colorBtnToggle = function(color) {
 		$scope.colorBtn[color] = !$scope.colorBtn[color];
 	}
 	// Creating item feed URL to fetch data
 	url = feedTemplateURL.replace('[PRODUCTID]',$routeParams.itemId);
 	$http.get(url).success(function(data) {
 		$scope.item = data;
 		// Seperate sizes and colors string to Arrays
 		$scope.item.sizes = data.available_sizes.split('|');
 		$scope.item.colors = data.available_colors.split('|');
 		// Calculate discount if it's not zero
 		data.off = parseInt(data.off);
 		data.price = parseFloat(data.price);
 		if (data.off !== 0) 
 			$scope.hasOff = true;

 		$scope.getFinalPrice = function() {
 			if ($scope.hasOff) {
 				var price = data.price * (1 - (data.off/100));
 				return price.toFixed(2);
 			}
 			else
 				return data.price;
 		}	
 	});
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