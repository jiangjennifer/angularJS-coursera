describe('test service', function() {
	beforeEach(module('app'));

	// beforeEach(inject(function($httpBackend, appService) {
	// 	this.$httpBackend = $httpBackend;
	// 	this.appService = appService;
	// }));

	beforeEach(inject(function($injector) {
		this.$httpBackend = $injector.get('$httpBackend');
		this.appService = $injector.get('appService');
	}))

	it('should return correct response when call getItems', function() {
		this.$httpBackend.whenGET('www.google.com').respond(['hello']);
		var items;
		// this.appService.getItems().then((response) => {
		// 	console.log("response is: ", response);
		// 	items = response.data;
		// });
		// this.$httpBackend.flush();
		// expect(items).toEqual(['hello']);
		this.appService.getItems().then((response) => {
			expect(response.data).toEqual(['hello']);
		});

		this.$httpBackend.flush();
	})
})