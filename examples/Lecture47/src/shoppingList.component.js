(function() {
	'use strict';

	angular.module('app', [])
	.component('shoppingListComopnent', {
		template: '<div> Hi </div>',
		controller: shoppingListController,
		bindings: {
			items: "<",
		}
	});

	shoppingListController.$inject = ['$q'];
	function shoppingListController($q) {
		var $ctrl = this;
		// this.ctrl.cookieIn = false;

		// $ctrl.$doCheck = () => {
		// 	this.ctrl.cookieIn = $ctrl.cookieDetector();
		// };

		$ctrl.cookieDetector = () => {
			for (let item of $ctrl.items) {
				if (item.name.toLowerCase().indexOf('cookies') !== -1) {
					return true;
				}
			}
			return false;
		}
	}
})();