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
				templateUrl: "src/public/home/home.html",
			});
	}
})();