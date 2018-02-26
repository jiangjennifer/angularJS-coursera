(function() {
	'use strict';
	angular.module('public')
	.controller('myInfoController', myInfoController);

	myInfoController.$inject = ['customerInfo', 'menuService', 'ApiPath'];
	function myInfoController(customerInfo, menuService, ApiPath) {
		var $ctrl = this;
		$ctrl.ApiPath = ApiPath;
		$ctrl.myInfo = customerInfo.getInfo();
		if ($ctrl.myInfo) {
			menuService.getMenuItem($ctrl.myInfo.favorite).then((response) => {
				if (response) {
					$ctrl.description = response.description;
					$ctrl.favoriteName = response.name;
				}
			});
		}
		
	}
})();