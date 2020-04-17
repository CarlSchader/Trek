module.exports = {
	signIn: function(request, response, templateMap) {
		require('../../route').respondWithFile(response, require('../route').frontendDirectory + '/views/index.html', templateMap);
	}
}