const {ObjectId} = require('mongodb'); 
const database = require('./database');
const {mongodbConfig, cookieNames, visitorStateName, sessionStateAccessRights, indexHTMLPath, loginHTMLPath} = require('./config');
const {parseCookies} = require('./httpFunctions');

function getBottomDirectory(pathName) {
	let index;
	if (pathName[0] === '/') {
		index = pathName.indexOf('/', 1);
		if (index > 0) return pathName.substring(1, index);
		else return pathName;
	}
	else {
		index = pathName.search('/');
		if (index > 0) return pathName.substring(1, index);
		else return pathName;
	}
}

async function setSession(username, response) {
	if (await database.read(mongodbConfig.userDataCollectionName, {username: username}) != null) {
		let sessionObject = await database.read(mongodbConfig.sessionsCollectionName, {username: username});
		if (sessionObject != null) {
			await database.update(mongodbConfig.sessionsCollectionName, {username: username}, {creationDate: new Date()});
		}
		else {
			await database.create(mongodbConfig.sessionsCollectionName, database.createSessionObject(username));
		}
		response.setHeader('Set-Cookie', cookieNames.sessionID + '=' + sessionObject._id);
	}
}

function getSessionID(request) {
	let cookies = parseCookies(request);
	if (cookies.hasOwnProperty(cookieNames.sessionID)) return cookies[cookieNames.sessionID];
	else return null;
}

async function getSessionState(request) {
	let id = getSessionID(request);
	if (id != null) {
		let sessionObject = await database.read(mongodbConfig.sessionsCollectionName, {_id: ObjectId(id)});
		if (sessionObject != null) {
			let userDataObject = await database.read(mongodbConfig.userDataCollectionName, {username: sessionObject.username});
			if (userDataObject != null) return userDataObject.state;
		}
	}
	return visitorStateName;
}

async function manageSession(request, response, method, url) {
	if (method === 'GET' && (url === '/' || url === '')) { // Default pathway
		return ['GET', indexHTMLPath];
	}
	if (!sessionStateAccessRights[await getSessionState(request)].has(getBottomDirectory(request.url))) {
		return ['GET', loginHTMLPath];
	}
	return [method, url];
}

module.exports = {
	manageSession: manageSession,
	getSessionState: getSessionState,
	getSessionID: getSessionID,
	setSession: setSession
};