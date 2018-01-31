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
	},
	controller: myListController,
});

function myListController() {
	this.cookieDetector = () => {
		for (let item of this.items) {
			if (item.name.toLowerCase().indexOf('cookies') !== -1) {
				return true;
			}
		}
		return false;
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
	list.add = () => {
		service.addItem(list.name, list.quantity);
		list.title = "ShoppingList # 1 " + " (" + list.items.length + ")";
	};
	list.remove = (index) => {
		list.removed = "Last removed item is " + list.items[index].name;
		service.removeItem(index);
		list.title = "ShoppingList # 1"  + " (" + list.items.length + ")";
	};
}

})();