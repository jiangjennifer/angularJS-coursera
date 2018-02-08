(function() {
'use strict';

angular.module('app', [])
.controller('ShoppingListController', ShoppingListController)
.factory('ShoppingListService', ShoppingListService)
.component('myList', {
	templateUrl: 'myList.html',
	bindings: {
		items: "<",
		title: "@",
		remove: "&",
		obj: "<",
	},
	controller: myListController,
});

myListController.$inject=['$scope', '$element'];
function myListController($scope, $element) {
	var $ctrl = this;
	var cookieIn;
	$ctrl.cookieDetector = () => {
		for (let item of this.items) {
			if (item.name.toLowerCase().indexOf('cookies') !== -1) {
				return true;
			}
		}
		return false;
	}

	$ctrl.$onInit = () => {
		console.log('$scope in onInit is: ', $scope);
		$scope.$watch('$ctrl.items', (newValue, oldValue) => {
			console.log('the item listener is fired! newValue: ', newValue);
		});
		$scope.$watch('$ctrl.obj', (newValue) => {
			console.log('the obj listener is fired! newValue: ', newValue);
		});
		cookieIn = false;
		$ctrl.name = "Jenn";
	}

	$ctrl.$onChanges = (changeObj) => {
		console.log("changesObj is: ", changeObj);
	};

	// $ctrl.$postLink = () => {
	// 	$scope.$watch('$ctrl.cookieDetector()', (newValue) => {
	// 		if (newValue) {
	// 			$element.find('.error').slideDown(900);
	// 		} else {
	// 			$element.find('.error').slideUp(900);
	// 		}
	// 	});
	// }

	//Version Angular 1.5.8 or above support
	$ctrl.$doCheck = () => {
		if (cookieIn && !$ctrl.cookieDetector()) {
			cookieIn = !cookieIn;
			$element.find('.error').slideUp(900);
		} else if (!cookieIn && $ctrl.cookieDetector()) {
			cookieIn = !cookieIn;
			$element.find('.error').slideDown(900);
		}
	}

}

function ShoppingListService() {
	return function() {
		return new shoppingService();
	}
}

function shoppingService() {
	var service = this;
	var items = [];
	service.getItems = () => items;
	service.addItem = (name, quantity) => {
		var newItem = {
			name: name,
			quantity: quantity,
		};
		items.push(newItem);
	};
	service.removeItem = (index) => {
		items.splice(index, 1);
	}
}

ShoppingListController.$inject = ['ShoppingListService'];
function ShoppingListController(ShoppingListService) {
	var list = this;
	var service = ShoppingListService();
	list.name = "";
	list.quantity = 0;
	list.items = service.getItems();
	list.title = "ShoppingList # 1";
	list.obj = {
		name: "Jenn",
	}
	list.add = () => {
		service.addItem(list.name, list.quantity);
		list.title = "ShoppingList # 1 " + " (" + list.items.length + ")";
		list.obj = 23;
	};
	list.remove = (index) => {
		list.removed = "Last removed item is " + list.items[index].name;
		service.removeItem(index);
		list.title = "ShoppingList # 1"  + " (" + list.items.length + ")";
	};
}

})();