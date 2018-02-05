(function() {
	'use strict';

	angular.module('app', ['spinner', 'myList'])
	.controller('ShoppingListController', ShoppingListController)
	.factory('ShoppingListService', ShoppingListService);

	function ShoppingListService() {
		return function() {
			return new listService();
		}
	}

	function listService() {
		var service = this;
		var items = [];
		service.getItems = () => items;
		service.add = (name, quantity) => {
			var newItem = {
				name: name,
				quantity: quantity,
			};
			items.push(newItem);
		}
		service.remove = (index) => {
			items.splice(index, 1);
		}
	}

	ShoppingListController.$inject = ['ShoppingListService'];
	function ShoppingListController(ShoppingListService) {
		var list = this;
		var service = ShoppingListService();
		list.items = service.getItems();
		list.name = "";
		list.quantity = "";
		list.add = () => {
			service.add(list.name, list.quantity);
		}

		list.remove = (index) => {
			service.remove(index, 1);
		}
	}
})();