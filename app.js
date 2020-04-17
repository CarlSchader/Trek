const {router, catchDefaultRoute, respondWithError} = require('./route');
const {manageSession} = require('./session');
const {domain, loginHTMLPath, indexHTMLPath, frontendDirectory, defaultTemplateMap} = require('./config');
const {handleCORS} = require('./cors');

async function onRequest(request, response) {
	let method = request.method;
	let url = request.url;
	let templateMap = {};
	Object.assign(templateMap, defaultTemplateMap);
	console.log(method, url);

	handleCORS(response);

	if (request.method != 'OPTIONS') [method, url] = await manageSession(request, response, method, url);
	
	switch (request.method) {
		case 'GET':
			router(response, url, templateMap);
			break;
		case 'POST':
			try {
				require('./post' + url.slice(0, url.length - 3))(request, response, templateMap);
			}
			catch (error) {
				console.error(error);
			}
			break;
		case 'OPTIONS': // This is more CORS stuff.
			response.setHeader('Access-Control-Allow-Methods', 'PUT, POST, PATCH DELETE, GET');
			response.statusCode = 200;
			response.end();
		default:
			respondWithError(response, 404, frontendDirectory + '/public/views/error404.html', templateMap)
			break;
	}
}

module.exports.onRequest = onRequest;