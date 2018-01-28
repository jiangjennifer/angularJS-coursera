(function() {
'use strict';

angular.module('app', [])
.controller('ShoppingListController', ShoppingListController)
.factory('ShoppingListService', ShoppingListService)
.directive('myList', MyList);

function ShoppingListService() {
	return function(maxItem) {
		return new ShoppingService(maxItem);
	}
}

function ShoppingService(maxItem) {
	var service = this;
	var items = [];
	service.getItems = function() {
		return items;
	}
	service.addItem = function(name, quantity) {
		var newItem = {
			name: name,
			quantity: quantity
		};
		items.push(newItem);
	}

	service.removeItem = function(index) {
		items.splice(index, 1);
	}
}

ShoppingListController.$inject = ['ShoppingListService'];	
function ShoppingListController(ShoppingListService) {
	var list = this;
	list.name = "Jenn";
	var service = ShoppingListService();
	list.items = service.getItems();
	list.title = "ShoppingList #1";
	list.itemName = "";
	list.itemNumber = 0;
	list.add = function() {
		service.addItem(list.itemName, list.itemNumber);
		list.title = "ShoppingList #1   " + list.items.length;
	}
	list.remove = function(index) {
		service.removeItem(index);
		list.title = "ShoppingList #1    " + list.items.length;
	}
};

function MyList() {
	var ddo = {
		templateUrl: "myList.html",
		resttrict: "E",
		scope: {
			items: "<",
			remove: "&",
			title: "@",
		},
		controller: myListController,
		controllerAs: 'myList',
		bindToController: true,
		transclude: true,
		link: MyListLink,
	}
	return ddo;
}

function myListController() {
	var myList = this;
	myList.cookiesDectector = function() {
		for (let item of myList.items) {
			if (item.name.toLowerCase().indexOf("cookies") !== -1) {
				return true;
			}
		}
		return false;
	}
}

function MyListLink(scope, element, attrs, controller, transclude) {
	scope.$watch(() => scope.myList.cookiesDectector(), (newValue) => {
		if (newValue) {
			console.log("newValue is:", newValue);
			element.find('.error').slideDown(900);
		} else {
			element.find('.error').slideUp(900);
		}
	});
}


})();