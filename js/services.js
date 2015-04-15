var cchopServices = angular.module('cchopServices',[]);

// Loding list feed 
cchopServices.factory('list',['$http','list_feed_value',
 function listFactory($http,feedURL) {
 	var listData = $http.get(feedURL).success(function(data){
		return data; 
	});

	return {
		res : function() {
			return listData;
		}
	}
}]);