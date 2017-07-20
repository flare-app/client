self.addEventListener('sync', function(event) {
	if (event.tag == "oneTimeSync") {
		console.log('Onee Sync event fired');
	}
});