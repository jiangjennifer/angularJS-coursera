describe('evenOdd', function() {
	xit('should return a random number between 1 to 10', function() {
		var res = generateRandom(1, 10);
		console.log('res is: ', res);
		expect(res).toBeLessThan(10);
		expect(res).not.toBeLessThan(1);
	});

	it ('should return an odd number when given the odd type', function() {
		var generateRandom3 = () => 3;
		var res = getRandomEvenOddNumber('odd', generateRandom3);
		expect(res).toBe(3);
	});

	it ('should return an even number when given the even type', function() {
		var generateRandom8 = () => 8;
		var res = getRandomEvenOddNumber('even', generateRandom8);
		expect(res).toBe(8);
	});
});