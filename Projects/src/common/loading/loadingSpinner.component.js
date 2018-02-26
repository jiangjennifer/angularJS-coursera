(function(){
	'use strict';

	angular.module('common')
	.component('loadingSpinner', {
		templateUrl: 'src/common/loading/loadingSpinner.tpl.html',
		controller: spinnerController,
	});

	spinnerController.$inject = ['$scope', '$rootScope'];
	function spinnerController($scope, $rootScope) {
		var $ctrl = this;
		var listener;

		$ctrl.$onInit = () => {
			$ctrl.spinnerOn = false;
			listener = $rootScope.$on('spinner: active', (event, data) => {
				$ctrl.spinnerOn = data.on;
			})
		};

		$ctrl.$onDestroy = () => {
			listener();
		}
	}
})();