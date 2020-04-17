const {templateMap} = require('./config');

function getRequestBody(request, callback) {
	let body = '';
	let bodyObject = {};
	request.on('data', async function(data) {
		body += decodeURIComponent(data); // convert Buffer to decoded string
		body.split('&').forEach(function(keyValuePair) {
			let pairs = keyValuePair.split('=');
			bodyObject[pairs[0]] = pairs[1];
		});
		callback(bodyObject);
	});
}

function parseCookies(request) {
    var list = {},
        rc = request.headers.cookie;

    rc && rc.split(';').forEach(function( cookie ) {
        var parts = cookie.split('=');
        list[parts.shift().trim()] = decodeURI(parts.join('='));
    });

    return list;
}

module.exports = {
	getRequestBody: getRequestBody,
	parseCookies: parseCookies
};