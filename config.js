const visitorSessionStateName = 'visitor';
const domainName = 'https://bytespace.io';
module.exports = {
	domain: domainName,
	ports: {
		http: 80, // 80 is the port browsers use for http.
		https: 443 // 443 is the port browsers use for https.
	},

	mongodbConfig: {
		username: 'mongoTrek',
		password: 'RedGreenBlue@1',
		uri: 'mongodb+srv://mongoTrek:RedGreenBlue@1@trek-9zavu.mongodb.net/test?retryWrites=true&w=majority',
		databaseName: 'Trek',
		userDataCollectionName: 'userData',
		userDataSchemaPath: __dirname + '/lib/userDataSchema.json',
		sessionsCollectionName: 'sessions',
		sessionsSchemaPath: __dirname + '/lib/sessionsSchema.json',
	},

	cookieNames: { // DO NOT use < = > equal sign in any of the cookie names!!!
		sessionID: 'trekSessionID',
	},

	email: {
		service: 'gmail',
		address: 'carlwschader@gmail.com',
		password: 'dncrqgxuljgkhgms'
	},

	visitorStateName: visitorSessionStateName,
	sessionStateAccessRights: {
		[visitorSessionStateName]: new Set(['public']), // These are the accessible frontend directories for visitors.
		user: new Set(['public'])
	},

	// These paths assume / is the frontend directory.
	indexHTMLPath: '/public/views/index.html',
	loginHTMLPath: '/public/views/login.html',

	// These paths assume / is the root directory of your system.
	frontendDirectory: __dirname + '/frontend',

	defaultTemplateMap: {
		'#DOMAIN': domainName
	}
};