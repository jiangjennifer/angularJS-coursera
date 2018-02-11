(function() {
	'use strict';
	angular.module('app', ['ui.router', 'Spinner'])
	.controller('mainListController', mainListController)
	.service('listService', listService)
	.config(RouterConfig);

	RouterConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
	function RouterConfig($stateProvider, $urlRouterProvider) {
		$urlRouterProvider.otherwise('/home');

		$stateProvider
		 	.state('home', {
		 		url: '/home',
		 		templateUrl: 'app/home.tpl.html',
		 	})

		 	.state('mainList', {
		 		url: '/mainList',
		 		templateUrl: 'app/mainList.tpl.html',
		 		controller: 'mainListController',
		 		controllerAs: '$ctrl',
		 		resolve: {
		 			items: ['listService', (listService) => listService.getItems()],
		 		}
		 	})

		 	.state('mainList.item', {
		 		url: '/item/{itemId}',
		 		templateUrl: 'app/item.tpl.html',
		 		controller: itemController,
		 		controllerAs: '$ctrl',
		 	})
	};

	itemController.$inject = ['$stateParams', 'items'];
	function itemController($stateParams, items) {
		var $ctrl = this;
		$ctrl.item = items[$stateParams.itemId];
	}

	listService.$inject = ['$q', '$timeout'];
	function listService($q, $timeout) {
		var service = this;
		var items = [
			{
				name: 'apple',
				quantity: 3,
				description: 'yummy fruit',
			},
			{
				name: 'brocolli',
				quantity: 5,
				description: 'high fiber! good for health',
			},
			{
				name: 'bread',
				quantity: 1,
				description: 'good for breakfast',
			},
			{
				name: 'yogurt',
				quantity: 2,
				description: 'healthy foods'
			}
		];
		service.getItems = () => {
			var defered = $q.defer();
			$timeout(() => {defered.resolve(items)}, 900);
			return defered.promise;
		}
	};

	mainListController.$inject = ['listService', 'items', '$scope'];
	function mainListController(listService, items, $scope) {
		var $ctrl = this;
		// var promise = listService.getItems();
		// promise.then((items) => {
		// 	$ctrl.items = items;
		// })
		$ctrl.items = items;
	}
})();