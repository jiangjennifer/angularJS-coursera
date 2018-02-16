(function() {
	angular.module('app', [])
	.service('appService', appService);

	appService.$inject = ['$http'];
	function appService($http) {
		var service = this;
		service.getItems = () => $http({
			url: 'www.google.com',
		});
	}
})();