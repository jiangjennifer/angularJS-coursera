(function() {
	'use strict';
	angular.module('app', [])
	.controller('formValidationController', formValidationController);

	function formValidationController() {
		var validate = this;
		validate.complete = false;
		validate.user = {
		}
		validate.submit = () => {
			validate.complete = true;
		}
	}
})();