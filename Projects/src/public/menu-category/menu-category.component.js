(function() {
	'use strict';

	angular.module('public')
	.component('menuCategory', {
		bindings: {
			categories: "<",
		},
		templateUrl: 'src/public/menu-category/menu-category.tpl.html',
	});
})();