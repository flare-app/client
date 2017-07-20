self.addEventListener('sync', function(event) {
	if (event.tag === "oneTimeSync") {
		console.log('One Sync event fired');
	}
});