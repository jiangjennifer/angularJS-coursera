(function() {
	'use strict';
	angular.module('test', [])
	.controller('ShoppingListController', ShoppingListController)
	.factory('ShoppingListService', ShoppingListService)
	.directive('myList', MyList);

	function ShoppingListService() {
		return function(maxItem) {
			return new listService(maxItem);
		}
	}

	function listService(maxItem) {
		var service = this;
		var items = [];
		service.getItems = function() {
			return items;
		}
		service.addItem = function(name, quantity) {
			if (maxItem !== undefined && maxItem === items.length) {
				throw new Error("Max items exceed!");
			} else {
				var newItem = {
					name: name,
					quantity: quantity
				};
				items.push(newItem);
			}
		};
		service.removeItem = function(index) {
			items.splice(index, 1);
		}

	}

	ShoppingListController.$inject = ['ShoppingListService'];
	function ShoppingListController(ShoppingListService) {
		var list = this;
		var service = ShoppingListService();
		list.itemName = "";
		list.itemQuantity = "";
		list.items = service.getItems();
		list.add = function() {
			service.addItem(list.itemName, list.itemQuantity);
		}
		list.remove = function(index) {
			list.removed = "last removed item is " + list.items[index].name;
			service.removeItem(index);
		}
	}

	function MyList() {
		var ddo = {
			scope: {
				items: "<",
				remove: "&",
				list: "<",
				removed: "@",
			},
			restrict: "E",
			controller: MyListController,
			bindToController: true,
			controllerAs: "myList",
			templateUrl: "myList.html",
			link: MyListLink,
		};
		return ddo;
	}

	function MyListLink(scope, element, attrs, controller) {
		console.log("scope is :" , scope);
		// console.log("element is :", element);
		// console.log("attrs is : ", attrs);
		// console.log("controller is :", controller);
		console.log("this is :", this);
		// console.log(myList.cookieDetector);
		//Use Angular built in JQLite
		scope.$watch(() => scope.myList.cookieDetector(), (newValue) => {
			// console.log(myList.cookieDetector);
			var findDiv = element.find('div');
			if (newValue) {
				findDiv.css('display', 'block');
			} else {
				findDiv.css('display', 'none');
			}
		})
	}

	function MyListController() {
		var myList = this;
		myList.cookieDetector = function() {
			for (let item of myList.items) {
				if (item.name.toLowerCase().indexOf("cookies") === -1) {
					return false;
				}
				return true;
			};				
		};
	}
})();