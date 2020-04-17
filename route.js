const fs = require('fs');
const url = require('url');
const path = require('path');

const {frontendDirectory, indexHTMLPath} = require('./config');
const {templateHTMLString} = require('./templating');

const mimeTypes = JSON.parse(fs.readFileSync(__dirname + '/lib/mime_types.json'));

function respondWithError(response, code, pathName, templateMap) {
	try {
		let data = fs.readFileSync(pathName, 'utf-8');
		data = templateHTMLString(data, templateMap);
		response.setHeader('Content-Type', 'text/html');
		response.statusCode = code;
		response.write(data);
		response.end();
	}
	catch (error) {
		console.error(error);
		response.status = code;
		// response.setHeader('Content-Type', 'text/plain');
		response.write('error ' + code.toString());
		response.end()
	}
}

function respondWithFile(response, pathName, templateMap) {
	try {
		let data = fs.readFileSync(pathName, 'utf-8')
		if (path.extname(pathName) === '.html') {
			data = templateHTMLString(data, templateMap)
		}
		response.setHeader('Content-Type', mimeTypes[path.extname(pathName)]);
		response.statusCode = 200;
		response.write(data);
		response.end();
	}
	catch (error) {
		console.error(error);
		respondWithError(response, 404, frontendDirectory + '/public/views/error404.html', templateMap);
	}
}

function router(response, url, templateMap) {
	respondWithFile(response, frontendDirectory + url, templateMap);
}

module.exports = {
	router: router,
	respondWithFile: respondWithFile,
	respondWithError: respondWithError
};