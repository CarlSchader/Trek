(async function() {
	let database = require('./database');

	await database.connect();

	let https = require('https');
	let http = require('http');
	let {ports} = require('./config');
	let app = require('./app');
	let fs = require('fs');

	// http server that redirects all http traffic to https.
	http.createServer(function(request, response) {
		response.writeHead(301, {Location: 'https://' + request.headers.host + request.url});
		response.end();
	}).listen(ports.http);

	// SSL key and certificate loading for https createServer options.
	let options = {
		key: fs.readFileSync('./ssl/key.pem'),
		cert: fs.readFileSync('./ssl/cert.pem')
	};

	// Actual https server. app.onRequest handles all https requests.
	https.createServer(options, app.onRequest).listen(ports.https);
})();