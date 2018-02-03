(function() {
	'use strict';

	angular.module('app', [])
	.controller('ShoppingListController', ShoppingListController)
	.factory('ShoppingListService', ShoppingListService)
	.component('myList', {
		templateUrl: 'myList.html',
		bindings: {
			items: "<",
			remove: "&",
		},
		controller: myListController,
		transclude: true,
	})
	.component('mySpinner', {
		templateUrl: 'spinner.html',
		controller: spinnerController,
	});

	spinnerController.$inject = ['$rootScope'];
	function spinnerController($rootScope) {
		var $ctrl = this;
		$rootScope.$on('shoppingList: processing', (event, data) => {
			$ctrl.showSpinner = data.on;
		})

	}

	myListController.$inject = ['$scope', '$element', '$q', '$timeout', '$rootScope'];
	function myListController($scope, $element, $q, $timeout, $rootScope) {
		var $ctrl = this;
		var cookieIn = false;
		var itemsLength = 0;
		$ctrl.cookieDetector = () => {
			var defered = $q.defer();
			$timeout(() => {
				for (let item of $ctrl.items) {
					if (item.name.toLowerCase().indexOf('cookies') !== -1) {
						defered.resolve(true);
					}
				}
				defered.reject(false);
			}, 2000);
			return defered.promise;
		}

		$ctrl.$doCheck = () => {
			if ($ctrl.items.length !== itemsLength) {
				$rootScope.$broadcast('shoppingList: processing', {on: true});
				var promise = $ctrl.cookieDetector();
				promise.then(() => {
					if (!cookieIn) {
						$element.find('.error').slideDown(900);
						cookieIn = !cookieIn;
					}
				}, () => {
					if (cookieIn) {
						$element.find('.error').slideUp(900);
						cookieIn = !cookieIn;
					}
				})
				.finally(() => {
					itemsLength = $ctrl.items.length;
					$rootScope.$broadcast('shoppingList: processing', {on: false});
				});
			}
		}

		// $ctrl.$postLink = () => {
		// 	$scope.$watch('$ctrl.cookieDetector()', (newValue) => {
		// 		if (newValue) {
		// 			$element.find('.error').slideDown(900);
		// 		} else {
		// 			$element.find('.error').slideUp(900);
		// 		};
		// 	});
		// };
	}

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