function generateRandom(min, max) {
	return Math.random() * (max - min) + min;
}

function getRandomEvenOddNumber(type, generateRandom) {
	while (true) {
		var cur = Math.floor(generateRandom(1, 10));
		if (type === 'odd') {
			if (cur % 2 !== 0) {
				return cur;
			}
		} else if (cur % 2 === 0) {
			return cur;
		}
	}
}