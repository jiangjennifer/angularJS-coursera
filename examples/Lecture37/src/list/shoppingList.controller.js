(function() {
	'use strict';
	angular.module('shoppingList')
	.controller('shoppingListController', shoppingListController)
	.service('shoppingListService', shoppingListService)
	.component('myList', {
		templateUrl: 'src/myList.tpl.html',
		bindings: {
			items: "<",
		},
	});


  shoppingListService.$inject = ['$timeout', '$q'];
	function shoppingListService($timeout, $q) {
		var service = this;
		var items = [
		{
			name: 'rice',
			quantity: 1,
		},
		{
			name: 'cake',
			quantity: 2,
		},
		{
			name: 'apple',
			quantity: 3,
		},
		{
			name: 'broccoli',
			quantity: 4,
		}];

		service.getItems = () => {
			var defered = $q.defer();
			$timeout(() => {
				defered.resolve(items); 
			}, 900);
			return defered.promise;
		}
	}

	shoppingListController.$inject = ['shoppingListService'];
	function shoppingListController(shoppingListService) {
		var list = this;
		var promise = shoppingListService.getItems();
		console.log('promise is: ', promise);
		promise.then((items) => {
			list.items = items;
		})
	}
})();