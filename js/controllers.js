var cchopControllers = angular.module('cchopControllers',[]);
/**
* CoffeeChop frontpage controller
*/
cchopControllers.controller('FrontpageCtrl', ['$scope' ,'$http','$location',
 function($scope,$http,$location) {
	$http.get('data/frontpage.json').success(function(data){
		$scope.lists = data.lists;
		$scope.offs = data.offs;
		$scope.offers = data.offers;
		$scope.slides = data.slides;
	});
	$scope.goToItem = function(id) {
		$location.url('/item/'+id);
	}
}]);

/**
* CoffeeChop View item controller
* @namespace Item
*/
cchopControllers.controller('ViewItemCtrl',['$scope','$http','$routeParams','item_feed_value','shoppingCart',
 function($scope,$http,$routeParams,feedTemplateURL,shoppingCart){
 	var url = null;
 	$scope.itemId = $routeParams.itemId;
 	$scope.hasOff = false;
 	// initilize default order piece
 	$scope.piecesOrdered = 1;
 	$scope.colorBtn = {};
 	$scope.sizeBtn = {};

 	/**
	* Adding items to shopping cart
	* This method will prepare info and send it to shoppingCart factory
	* @memberOf Item
	*/
 	$scope.add2Cart = function() {
 		var sCart = {};
 		// Preparing ordered item's features and sending it to shoppingCart
 		for (var index in $scope.sizeBtn)
 			if ($scope.sizeBtn[index]) sCart.size = index;
 		for (var index in $scope.colorBtn)
 			if ($scope.colorBtn[index]) sCart.color = index;

 		sCart.id = $scope.itemId;
 		sCart.title = $scope.item.title;
 		sCart.img = $scope.selectedImage;
 		sCart.off = $scope.item.off;
 		sCart.price = $scope.getFinalPrice();
 		sCart.pieces = $scope.piecesOrdered;

 		shoppingCart.add2Cart(sCart);
 		$('#cartModal').foundation('reveal', 'open');
 	}
 	/**
	* Closing the modal the apeared after adding to cart
	* @memberOf Item
	*/
 	$scope.closeModal = function() {
 		$('#cartModal').foundation('reveal', 'close');
 	}
 	/**
	* Handling Size feature - On/Off buttons
	* should be refactored to a directive soon 
	* @memberOf Item
	* @param {String} size - Size name like (medium,large etc)
	*/
 	$scope.sizeBtnToggle = function(size) {
 		var currentBtnValue = $scope.sizeBtn[size];
 		_turnoff($scope.sizeBtn);
 		$scope.sizeBtn[size] = !currentBtnValue;
 	}
 	/**
	* Handling Color feature - On/Off buttons
	* should be refactored to a directive soon 
	* @memberOf Item
	* @param {String} color - Color code in rgb format (e.g #ffffff)
	*/
 	$scope.colorBtnToggle = function(color) {
 		var currentBtnValue = $scope.colorBtn[color];
 		_turnoff($scope.colorBtn);
 		$scope.colorBtn[color] = !currentBtnValue;
 	}
 	/**
	* Turning off all buttons
	* Used by {@link colorBtnToggle} and {@link sizeBtnToggle} features to turn off buttons 
	* when a new button is slected.
	* should be refactored to a directive soon.
	* @memberOf Item
	* @param {Object}
	*/
 	var _turnoff = function(btnObject) {
 		for (index in btnObject)
 			btnObject[index] = false;
 	}
 	/**
	* Used to view images in larger size by user
	* @memberOf Item
	* @param {String} imageAddr - The full or relative address of image resource
	*/
	$scope.changeImage = function(imageAddr) {
		$scope.selectedImage = imageAddr;
	}
	
 	// Generating JSON data URL
 	// [PRODUCTID] is a placeholder for item's ID
 	url = feedTemplateURL.replace('[PRODUCTID]',$scope.itemId);
 	// Loading JSON
 	$http.get(url).success(function(data) {
 		$scope.item = data;
 		/**
		* Calculate the price with possible discounts for view.
		* @memberOf Item
		*/
		$scope.getFinalPrice = function() {
			var data = $scope.item;
			if ($scope.hasOff) {
				var price = data.price * (1 - (data.off/100));
				return price.toFixed(2);
			}
			else
				return data.price;
		}
 		// Informing the view that data is loaded now
 		$scope.dataIsLoaded=true;
 		// Seperate sizes, images and colors from string to Arrays
 		$scope.item.sizes = data.available_sizes.split('|');
 		$scope.item.colors = data.available_colors.split('|');
 		$scope.item.images = data.img.split('|');
 		// Image settings
 		$scope.selectedImage = $scope.item.images[0];
 		// Calculate discount if it's not zero
 		data.off = parseInt(data.off);
 		data.price = parseFloat(data.price);
 		if (data.off !== 0) 
 			$scope.hasOff = true;
 	});
}]);

// Controling the page that show lists of different items
// Dependency Injected 'list' is a provider in services.js
cchopControllers.controller('ViewListCtrl',['$scope','$http','$routeParams','list','$location',
 function($scope,$http,$routeParams,list,$location) {
 	$scope.filteredList= [];
 	if ($routeParams.sortType === undefined)
 		$location.url($location.url() + '/sort/newest');
 	// Just for sending sortType to view
 	$scope.sortType = $routeParams.sortType;
 	// Using expression filtering to add filters
 	$scope.listFilter = {};
 	$scope.listFilter.list_id = $routeParams.listId;

 	// User selected sorting
 	if ($routeParams.sortType !== undefined) {
 		if ($routeParams.sortType === 'newest')
 			$scope.sorting = 'id';
 		if ($routeParams.sortType === 'price')
 			$scope.sorting = 'price';
 		if ($routeParams.sortType === 'off')
 			$scope.sorting = '-off';
 	}

 	// Waiting for asynchronous promise from $http
 	list.res().then(function(res) {
 		$scope.list = res.data;
 	});
 	// Method to redirect users to item's page by clicking on the whole div
 	$scope.goToItem = function(id) {
 		$location.url('item/'+id);
 	}

 	$scope.isSort = function(arg) {
 		if ($scope.sortType === arg) 
 			return true;
 		else
 			return false;
 	}

 	// Re-run foundation initialization to activate Mangellan addon script
 	setTimeout(function() { $(document).foundation(); },100);

 	
}]);

// Top navbar controller
cchopControllers.controller('NavbarCtrl' , ['$scope','shoppingCart',function($scope,shoppingCart) {
	$scope.getCart = function() {
		var itemsInCart = shoppingCart.getCart().length;
		// Show 'No items' in view instead of '0 items'
		if (itemsInCart === 0)
			return 'No';
		else
			return itemsInCart;
	}
}]);

cchopControllers.controller('ViewCartCtrl', ['$scope','shoppingCart',function($scope,shoppingCart) {
	$scope.shoppingCart = shoppingCart.getCart();
	$scope.cartTotalPrice = shoppingCart.getCartTotalPrice();
}]);