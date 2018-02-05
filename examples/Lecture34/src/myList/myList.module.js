(function() {
	'use strict';
	angular.module('myList', []);

	angular.module('myList')
	.config(() => {
		console.log('config is fired!');
	})
	.run(() => {
		console.log('run is fired!');
	})
})();