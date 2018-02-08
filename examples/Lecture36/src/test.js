(function() {
		'use strict';
		angular.module('app', ['ui.router'])
		.controller('appController', appController)
		.config(Config);
	
		Config.$inject = ['$stateProvider', '$urlRouterProvider'];
		function Config($stateProvider, $urlRouterProvider) {
			$stateProvider
				.state('view1', {
					templateUrl: 'src/tab1.html',
					url: '/view1',
				})
				.state('view2', {
					template: '<div> This is view2 </div>',
					// url: '/view2',
				});

				$urlRouterProvider.otherwise('/view1');
		};

		function appController() {

		};
})();