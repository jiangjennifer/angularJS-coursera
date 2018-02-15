'use strict';

// describe('appController', function() {
// 	var $controller;
// 	beforeEach(module('app'));
// 	beforeEach(inject(function($injector) {
// 		$controller = $injector.get('$controller');
// 		var mockService = {};
// 		mockService.getItems = () => null;
// 		mockService.addItems = () => {
// 			throw new Error('test error message');
// 		}
// 		this.ctrl = $controller('appController', {appService: mockService});
// 	}));

// 	it('should return correct error message', function() {
// 		this.ctrl.addItems();
// 		expect(this.ctrl.errorMessage).toEqual('test error message');
// 	})
// })

describe('appController', function() {
	beforeEach(module('app'));

	beforeEach(function () {
		module(function($provide) {
			$provide.service('mockService', function() {
				var service = this;
				service.getItems = () => [];
				service.addItems = function() {
					throw new Error('test error message');
				}
			})
		});
	});

	beforeEach(inject(function($controller, mockService) {

		this.ctrl = $controller('appController', {appService: mockService});
	}));


	it('should return correct error message', function() {
		this.ctrl.addItems();
		expect(this.ctrl.errorMessage).toEqual('test error message');
	})
})