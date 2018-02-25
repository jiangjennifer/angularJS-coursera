'use strict';

(function() {
	angular.module('public')
	.config(RouteConfig);

	RouteConfig.$inject = ['$stateProvider'];
	function RouteConfig($stateProvider) {
		$stateProvider
			.state('public', {
				abstract: true,
				templateUrl: 'src/public/public.html',
			})
			.state('public.home', {
				url: '/',
				templateUrl: 'src/public/home/home.html',
			})
			.state('public.menu', {
				url: '/menu',
				templateUrl: 'src/public/menu/menu.tpl.html',
				controller: 'menuController as $ctrl',
				resolve: {
					categories: ['menuService', (menuService) => {
						return menuService.getCategory();
					}]
				}
			});
	}
})();