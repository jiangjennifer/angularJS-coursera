(function() {
	'use strict';
	angular.module('public')
	.controller('subscribeController', subscribeController)
	.directive('existence', existence);

	function existence() {
		var ddo = {
			restrict: 'A',
			require: 'ngModel',
			controller: existenceController,
			controllerAs: 'existCtrl',
			link: function(scope, element, attribute, ctrl, transclude) {
				ctrl.$validators.existence = function(modelValue, viewValue) {
					scope.existCtrl.menuService.getMenuItem(viewValue).then((response) => {
						console.log('response is: ', response);
						return response;
					});
				}
			}
		}
		return ddo;
	}

	existenceController.$inject = ['menuService'];	
	function existenceController(menuService) {
				var $ctrl = this;
				$ctrl.menuService = menuService;
	}

	subscribeController.$inject = ['menuService'];
	function subscribeController(menuService) {
		var $ctrl = this;
		$ctrl.favoriteExist = true;
		$ctrl.submit = () => {
			menuService.getMenuItem($ctrl.favorite).then((response) => {
				$ctrl.favoriteExist = response;
			});
		}
	}
})();