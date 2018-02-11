(function() {
	'use strict';
	angular.module('app', ['ui.router'])
	.controller('category', category)
	.config(Config);

	category.$inject = ['categories'];
	function category(categories) {
		var $ctrl = this;
		$ctrl.categories = categories.data;
	}

	Config.$inject = ['$stateProvider', '$urlRouterProvider'];
	function Config($stateProvider, $urlRouterProvider) {
		$urlRouterProvider.otherwise('/home');

		$stateProvider
			.state('home', {
				url: '/home',
				templateUrl: 'src/home.tpl.html',
			})

			.state('category', {
				url: '/category',
				templateUrl: 'src/category.tpl.html',
				controller: 'category',
				controllerAs: '$ctrl',
				resolve: {
					categories: ['$http', ($http) => 
						$http({
							url: 'https://davids-restaurant.herokuapp.com/categories.json',
						})
					]
				}
			})

			.state('menuDetail', {
				url: '/menuDetail/{itemId}',
				templateUrl: 'src/menuDetail.tpl.html',
				controller: menuDetailController,
				controllerAs: '$ctrl',
				resolve: {
					details: ['$http', '$stateParams', ($http, $stateParams) => 
					$http({
						url: ' https://davids-restaurant.herokuapp.com/menu_items.json',
						params: {category: $stateParams.itemId}
					})]
				}
			});
	}

	menuDetailController.$inject = ['details', '$stateParams'];
	function menuDetailController(details, $stateParams) {
		var $ctrl = this;
		$ctrl.details = details.data.menu_items;
	}
})();