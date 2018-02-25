(function() {
	'use strict';
	angular.module('public')
	.controller('menuItemController', menuItemController);

	menuItemController.$inject = ['menuItem', 'ApiPath'];
	function menuItemController(menuItem, ApiPath) {
		var $ctrl = this;
		$ctrl.menuItem = menuItem;
		$ctrl.ApiPath = ApiPath;
	}
})();
