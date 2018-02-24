'use strict';

(function() {
	angular.module('restaurant', ['public', 'common'])
		.config(Config);

	Config.$inject = ['$urlRouterProvider', '$httpProvider'];
	function Config($urlRouterProvider, $httpProvider) {
		$urlRouterProvider.otherwise('/');
		$httpProvider.interceptors.push('loadingInterceptor');
	} 
})();