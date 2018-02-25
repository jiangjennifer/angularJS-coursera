(function() {
	'use strict';

	angular.module('public')
	.controller('menuController', menuController);

	menuController.$inject = ['categories'];
	function menuController(categories) {
		var $ctrl = this;
		$ctrl.categories = categories;
	};
})();