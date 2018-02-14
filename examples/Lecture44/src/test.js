(function() {
	'use strict';
	angular.module('app', [])
	.controller('appController', appController)
	.service('appService', appService);

	function appService() {
		var service = this;
		var items = [];
		service.getItems = () => items;
		service.addItems = () => {};
	}

	appController.$inject = ['appService', '$timeout'];
	function appController(appService, $timeout) {
		console.log('appService is: ', appService);
		var ctrl = this;
		ctrl.timeout = () => {
			$timeout(() => {
				console.log('in time out!')
			}, 900);
		};
		
		ctrl.items = appService.getItems();
		ctrl.addItems = () => {
			try {
				appService.addItems();
			} catch(error) {
				ctrl.errorMessage = error.message;
			}
		}
	}
})();