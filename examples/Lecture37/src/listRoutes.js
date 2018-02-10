(function() {
	'use strict';
	angular.module('shoppingList')
	.config(Config);

	Config.$inject = ['$stateProvider', '$urlRouterProvider'];
	function Config($stateProvider, $urlRouterProvider) {
		$stateProvider
			.state('home', {
				templateUrl: "src/shoppingList.tpl.html",
				url: "/home",
			})

			.state('list', {
				templateUrl: 'src/listItem.tpl.html',
				url: '/list',
				controller: 'shoppingListController as $ctrl',
				resolve: {
					items: ['shoppingListService', (shoppingListService) => shoppingListService.getItems()
					]
				}
			});

		$urlRouterProvider.otherwise('/home');
	}
})();
