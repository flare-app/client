import config from '../config/config.js';

class GETHandler {
	static performGetRequest(apiRoute, errorHandler, responseHandler) {
		fetch(config.backendAPIRoute + apiRoute)
			.then(function(response) {
				if (response.status >= 400) {
					errorHandler('Server error (' + apiRoute + ')', 'Server unreachable (' + response.status + ')');
					throw new Error("Bad response from server");
				}
				return response.json();
			}, function(reason) {
				//Error
				errorHandler('Server error (' + apiRoute + ')', reason.message);
				throw new Error(reason.message);
			})
			.then(function(responseObject) {
				responseHandler(responseObject);
			}).catch(function(reason) {
				console.log(reason);
			});
	}
} export default GETHandler;