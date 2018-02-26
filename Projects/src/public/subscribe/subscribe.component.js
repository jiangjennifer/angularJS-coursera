(function() {
	'use strict';
	angular.module('public')
	.controller('subscribeController', subscribeController)
	.directive('existence', existence)
	.service('customerInfo', customerInfo);

	function customerInfo() {
		var info = this;
		var myInfo;
		info.store = function (firstName, lastName, email, phone, favorite) {
			myInfo = {
				firstName: firstName,
				lastName: lastName,
				email: email,
				phone: phone,
				favorite: favorite,
			}
		};

		info.getInfo = () => myInfo;
	}

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

	subscribeController.$inject = ['menuService', 'customerInfo'];
	function subscribeController(menuService, customerInfo) {
		var $ctrl = this;
		$ctrl.favoriteExist = true;
		$ctrl.submit = () => {
			menuService.getMenuItem($ctrl.favorite).then((response) => {
				$ctrl.favoriteExist = response;
				if (response) {
					customerInfo.store($ctrl.firstName, $ctrl.lastName, $ctrl.email, $ctrl.phone, $ctrl.favorite);
					$ctrl.storeSuccess = true;
				} else {
					$ctrl.storeSuccess = false;
				}
			});
		}
	}
})();