(function() {
	'use strict';

	angular.module('common')
	.service('menuService', menuService)
	.constant('ApiPath', 'https://david-chu-bistro.herokuapp.com');

	menuService.$inject = ['$http', 'ApiPath'];
	function menuService($http, ApiPath) {
		var service = this;
		service.getCategory = () => {
			return $http({
				url: ApiPath + '/categories.json',
			}).then((response) => response.data);
		}
		
	}
})();