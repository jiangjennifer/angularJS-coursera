'use strict';

describe('shopping list component', function() {
	beforeEach(module('app'));

	beforeEach(inject(function($componentController, $rootScope) {
		var items = [
					{name: 'apple', quantity: 2, description: 'healthy fruit'},
					{name: 'orange', quantity: 1, description: 'yummy fruit'},
					{name: 'bread', quantity: 1, description: 'good for breakfast'},
				];
		this.ctrl = $componentController('shoppingListComopnent', {}, {items});
		// this.$rootScope = $rootScope.$new();
	}));

	it('should return false when there are no cookies in the list', function() {
		expect(this.ctrl.cookieDetector()).toBeFalsy();
	});

	it('should return true if there are cookies in the list', function() {
		this.ctrl.items = [
			{name: 'cookies', quantity: 1, description: 'yay dessert!'},
		];
		expect(this.ctrl.cookieDetector()).toBeTruthy();
	})

	// it('should return false when there are no cookies in the list', function() {
	// 	this.ctrl.items = [
	// 		{name: 'apple', quantity: 1, description: 'kk'},
	// 	];
	// 	this.ctrl.cookieDetector();
	// 	expect(this.ctrl.cookieIn).toBeFalsy();
	// });

	// it('should return true if there are cookies in the list', function() {
	// 	this.ctrl.items = [
	// 		{name: 'cookies', quantity: 1, description: 'yay dessert!'},
	// 	];
	// 	this.ctrl.cookieDetector();
	// 	this.$rootScope.$apply();
	// 	expect(this.ctrl.cookieIn).toBeTruthy();
	// })

})