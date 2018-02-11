(function() {
	'use strict';
	angular.module('Spinner', [])
	.controller('spinnerController', spinnerController)
	.component('spinner', {
		templateUrl: 'app/Spinner/spinner.tpl.html',
		controller: 'spinnerController',
	});

	spinnerController.$inject = ['$scope'];
	function spinnerController($scope) {
		var $ctrl = this; 
		$ctrl.showSpinner = false;
		var cancelList = [];

		$ctrl.$onInit = () => {
			var cancel = $scope.$on('$stateChangeStart', 
			(event, toState, toParams, fromState, fromParams, options) => {
				// console.log('event is: ', event);
				// console.log('toState is: ', toState);
				// console.log('toParams is: ', toParams);
				// console.log('fromState is: ', fromState);
				// console.log('fromParams is: ', fromParams);
				// console.log('options is: ', options);
				$ctrl.showSpinner = true;
			});
				cancelList.push(cancel);
	
				cancel = $scope.$on('$stateChangeSuccess',
					(event, toState, toParams, fromState, fromParams) => {
						$ctrl.showSpinner = false;
					});
				cancelList.push(cancel);
	
				$scope.$on('$stateChangeError',
					(event, toState, toParams, fromState, fromParams, error) => {
						$ctrl.showSpinner = false;
					});
			cancelList.push(cancel);
		}
		

		$ctrl.$onDestroy = () => {
			for (let unsubscribe of cancelList) {
				unsubscribe();
		}
	}
}
})();