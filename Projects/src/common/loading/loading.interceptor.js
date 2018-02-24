(function() {
	'use strict';

	angular.module('common')
	.factory('loadingInterceptor', loadingInterceptor);

	loadingInterceptor.$inject = ['$rootScope', '$q'];
	function loadingInterceptor($rootScope, $q) {
		var loadingCount = 0;
		return {
			request: function(config) {
				console.log('config is: ', config);
				if (++loadingCount === 1) {
					$rootScope.$broadcast('spinner: active', {
						on: true,
					});
				}
				return config;
			},

			response: function(response) {
				console.log('response is: ', response);
				if (--loadingCount === 0) {
					$rootScope.$broadcast('spinner: active', {
						on: false,
					});
				}
				
				return response;
			},

			responseError: function(rejection) {
				console.log('rejection is: ', rejection);
				if (--loadingCount === 0) {
					$rootScope.$broadcast('spinner: active', {
						on: false,
					});
				}
				
				$q.$reject(rejection);
			}
		}
	};
})();