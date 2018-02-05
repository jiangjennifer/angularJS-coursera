(function() {
	'use strict';
	angular.module('spinner')
	.component('mySpinner', {
		templateUrl: 'src/spinner/spinner.template.html',
		controller: spinnerController,
	});

	spinnerController.$inject = ['$rootScope'];
	function spinnerController($rootScope) {
		var $ctrl = this;
		var cancelSubsciber = $rootScope.$on('shoppingList: processing', (event, data) => {
			console.log('event is: ', event);
			console.log('data is: ', data);
			$ctrl.showSpinner = data.on;
		});

		$rootScope.$onDestroy = () => {
			cancelSubsciber();
		}

	}
})();