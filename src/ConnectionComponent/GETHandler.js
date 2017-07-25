import config from '../config/config.js';

class GETHandler {
	static performGetRequest(apiRoute, errorHandler, responseHandler) {
		fetch(config.backendAPIRoute + apiRoute)
			.then(function(response) {
				if(response.status === 200) {
					response.json().then(function(responseObject) {
						responseHandler(responseObject.response);
					})
				} else {
					response.json().then(function(responseObject) {
						errorHandler('Server error (' + apiRoute + ')', responseObject.message);
						throw new Error("Bad response from server");
					});
					throw new Error("Authentication Error");
				}
			}, function(reason) {
				//Error
				errorHandler('Server error (' + apiRoute + ')', reason.message);
				throw new Error(reason.message);
			})
			.catch(function(reason) {
				console.log(reason);
			});
	}
} export default GETHandler;