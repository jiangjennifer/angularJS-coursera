(function(){
	'use strict';

	angular.module('common')
	.component('loadingSpinner', {
		templateUrl: 'src/common/loading/loadingSpinner.tpl.html',
		controller: spinnerController,
	});

	spinnerController.$inject = ['$scope'];
	function spinnerController($scope) {
		var $ctrl = this;
		$ctrl.$onInit = () => {
			$ctrl.spinnerOn = false;
			$scope.$on('spinner: active', (event, data) => {
				$ctrl.spinnerOn = data.on;
			})
		}
	}
})();