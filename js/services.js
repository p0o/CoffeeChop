var cchopServices = angular.module('cchopServices',[]);

// Loading list feed 
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

cchopServices.service('shoppingCart', shoppingCart);

function shoppingCart() {
	var cart = [];
	var getCart = function() {
		return cart;
	}
	var getCartTotalPrice = function() {
		var sum = 0.0;
		for (var item in cart) {
			sum += cart[item].price * cart[item].pieces;
		}
		return sum;
	}
	var add2Cart = function(sCart) {
		cart.push(sCart);
	}
	
	return {
		getCart: getCart,
		getCartTotalPrice: getCartTotalPrice,
		add2Cart: add2Cart
	}
}