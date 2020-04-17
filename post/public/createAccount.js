const database = require('../../database');
const {mongodbConfig, frontendDirectory, indexHTMLPath} = require('../../config');
const {respondWithFile, respondWithError} = require('../../route');
const {getRequestBody} = require('../../httpFunctions');

module.exports = function(request, response, templateMap) {
	getRequestBody(request, function(bodyObject) {
		try {
			database.create(mongodbConfig.userDataCollectionName, database.createUserDataObject(bodyObject.username, bodyObject.email, bodyObject.password));
			respondWithFile(response, frontendDirectory + indexHTMLPath, templateMap);
		}
		catch (error) {
			console.log(error)
			respondWithError(response, 404, frontendDirectory + '/public/views/error404.html', templateMap);
		}
	});
}