import config from '../config/config.js';

class POSTHandler {
	static performPOSTRequest(apiRoute, postData, errorHandler, responseHandler) {
		fetch(config.backendAPIRoute + apiRoute, {
			method: 'post',
			body: JSON.stringify(postData)
		}).then(function(response) {
			if(response.status === 200) {
				return response.json();
			} else {
				errorHandler('Login error', 'Could not validate credentials');
				throw new Error("Authentication Error");
			}
		}, function(reason) {
			//Error
			console.log(reason);
			errorHandler('Server error', reason.message);
		}).then(function(responseObject) {
			responseHandler(responseObject);
		}).catch(function(reason) {
			console.log(reason);
		});
	}
} export default POSTHandler;