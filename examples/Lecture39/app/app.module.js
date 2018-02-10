(function() {
	'use strict';
	angular.module('app', ['ui.router'])
	.controller('shoppingListController', shoppingListController)
	.service('shoppingListService', shoppingListService)
	.config(Config)
	.component('myList', {
		templateUrl: 'app/myList.tpl.html',
		bindings: {
			items: "<",
		}
	})

	Config.$inject = ['$stateProvider', '$urlRouterProvider'];
	function Config($stateProvider, $urlRouterProvider) {
		$urlRouterProvider.otherwise('/home');

		$stateProvider
			.state('home', {
				url: '/home',
				templateUrl: 'app/mainList.tpl.html',
			})

			.state('list', {
				url: '/list',
				templateUrl: 'app/list.tpl.html',
				controller: 'shoppingListController',
				controllerAs: '$ctrl',
				resolve: {
					items: ['shoppingListService', (shoppingListService) => shoppingListService.getItems()]
				}
			})

			.state('listItem', {
				url: '/list/{itemId}',
				templateUrl: 'app/listItem.tpl.html',
				controller: listItemController,
				controllerAs: '$ctrl', 
				resolve: {
					item: ['shoppingListService', '$stateParams', 
								(shoppingListService, $stateParams) => shoppingListService.getItems().then((items) => items[$stateParams.itemId])]
				}
			})
	};

	listItemController.$inject = ['$stateParams','item'];
	function listItemController($stateParams, item) {
		var $ctrl = this;
		$ctrl.item = item;
		console.log('item is: ', $ctrl.item);
	}

	shoppingListController.$inject = ['items'];
	function shoppingListController(items) {
		var $ctrl = this; 
		$ctrl.items = items;

	}

	shoppingListService.$inject = ['$q', '$timeout'];
	function shoppingListService($q, $timeout) {
		var service = this;
		var items = [
			{
				name: 'apple', 
				quantity: 2,
				description: 'best with cinemmon', 
			},
			{
				name: 'brocolli',
				quantity: 3,
				description: 'high fiber',
			},
			{
				name: 'bread',
				quantity: 1,
				description: 'good for breakfast',
			},
			{
				name: 'egg',
				quantity: 10,
				description: 'best with fried rice',
			}
		];

		service.getItems = () => {
			var defered = $q.defer();
			$timeout(() => {defered.resolve(items)}, 900);
			return defered.promise;
		}
	}
})();