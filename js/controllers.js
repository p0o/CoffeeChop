var cchopApp = angular.module('cchopApp',[]);

cchopApp.controller('FrontpageCtrl', ['$scope' ,'$http', function($scope,$http) {
	$http.get('data/frontpage.json').success(function(data){
		$scope.data = data;
	});
}]);