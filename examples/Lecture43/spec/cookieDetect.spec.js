describe('cookieDectector', function() {
	var itemsWithCookies;
	var itemsWithoutCookies;
	beforeEach(function() {
		itemsWithoutCookies = ['apple', 'broccoli', 'yogurt'];
		itemsWithCookies = ['juice', 'coke', 'Cookies'];
	});

	it('should return true when detect cookies', function() {
		var result = cookieDetector(itemsWithCookies);
		expect(result).toBe(true);
	});

	it('should return false when detect no cookies', function() {
		var result = cookieDetector(itemsWithoutCookies);
		expect(result).not.toBe(true);
	})
})