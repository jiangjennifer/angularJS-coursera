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
			description: 'jasmine rice',
		},
		{
			name: 'cake',
			quantity: 2,
			description: 'yummy cake',
		},
		{
			name: 'apple',
			quantity: 3,
			description: 'sweet apple',
		},
		{
			name: 'broccoli',
			quantity: 4,
			description: 'fiber!!!'
		}];

		service.getItems = () => {
			var defered = $q.defer();
			$timeout(() => {
				defered.resolve(items); 
			}, 900);
			return defered.promise;
		}
	}

	shoppingListController.$inject = ['items'];
	function shoppingListController(items) {
		var list = this;
		// var promise = shoppingListService.getItems();
		// console.log('promise is: ', promise);
		// promise.then((items) => {
		// 	list.items = items;
		// })
		list.items = items;
	}
})();