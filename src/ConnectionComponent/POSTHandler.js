import config from '../config/config.js';

class POSTHandler {
	static performPOSTRequest(apiRoute, postData, errorHandler, responseHandler) {
		fetch(config.backendAPIRoute + apiRoute, {
			method: 'post',
			body: JSON.stringify(postData)
		}).then(function(response) {
			if(response.status === 200) {
				response.json().then(function(responseObject) {
					responseHandler(responseObject);
				})
			} else {
				response.json().then(function(responseObject) {
					errorHandler('Login error', responseObject.message);
				});
				throw new Error("Authentication Error");
			}
		}, function(reason) {
			//Error
			console.log(reason);
			errorHandler('Server error', reason.message);
		}).catch(function(reason) {
			console.log(reason);
		});
	}
} export default POSTHandler;