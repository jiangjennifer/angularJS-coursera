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
			})
			.state('public.items', {
				url: '/menu-items/{param}',
				controller: 'menuItemController',
				controllerAs: '$ctrl',
				templateUrl: 'src/public/menuItem/menuItem.tpl.html',
				resolve: {
					menuItem: ['menuService', '$stateParams', (menuService, $stateParams) => {
						return menuService.getMenuItems($stateParams.param);
					}],
				}
			})
			.state('public.subscribe', {
				url: '/subscribe',
				templateUrl: 'src/public/subscribe/subscribe.tpl.html',
				controller: 'subscribeController',
				controllerAs: '$ctrl',
			})
	}
})();