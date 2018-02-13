function cookieDetector(items) {
	console.log('run in the js file');
	for (let item of items) {
		if (item.toLowerCase().indexOf('cookies') !== -1) {
			return true;
		}
	}
	return false;
}