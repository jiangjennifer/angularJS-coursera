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
				url: '/list/{params}',
				templateUrl: 'src/listItem.tpl.html',
				controller: 'shoppingListController as $ctrl',
				resolve: {
					items: ['shoppingListService', '$stateParams', 
					(shoppingListService, $stateParams) => shoppingListService.getItems().then((items) => items[$stateParams.params])
					]
				}
			})

		$urlRouterProvider.otherwise('/home');
	}
})();
