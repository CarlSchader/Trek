const nodemailer = require('nodemailer');

const database = require('../../database');
const {respondWithFile} = require('../../route');
const {email, domain, frontendDirectory, loginHTMLPath, mongodbConfig} = require('../../config');
// const {templateHTMLString} = require('../../templating');
const {getRequestBody} = require('../../httpFunctions');
const {templateHTMLString} = require('../../templating');

module.exports = function(request, response, templateMap) {
	getRequestBody(request, function(bodyObject) {
		respondWithFile(response, frontendDirectory + loginHTMLPath, templateMap);
		let emailString = require('fs').readFileSync(frontendDirectory + '/private/views/email-verification.html', 'utf-8');
		templateMap['#USERNAME'] = bodyObject['username'];
		templateMap['#EMAIL'] = bodyObject['email'];
		templateMap['#PASSWORD'] = bodyObject['password'];
		emailString = templateHTMLString(emailString, templateMap);

		let transporter = nodemailer.createTransport({
			service: email.service,
			auth: {
				user: email.address,
				pass: email.password
			}
		});
		let mailOptions = {
		  from: email.address,
		  to: bodyObject['email'],
		  subject: 'Trek account verification',
		  html: emailString
		};
		if (database.read(mongodbConfig.userDataCollectionName, {username: bodyObject['username']}) === null || database.read(mongodbConfig.userDataCollectionName, {email: bodyObject['email']}) === null) {
			transporter.sendMail(mailOptions, function(error, info) {
				if (error) {
					console.error(error);
					console.log('email: ' + bodyObject['email'] + " doesn't exist.");
				}
				else {
					try {
						database.create(mongodbConfig.userDataCollectionName, database.createUserDataObject(bodyObject.username, bodyObject.email, bodyObject.password));
						console.log("New user created: " + bodyObject['username']);
					}
					catch (error) {
						console.log(error);
					}
				}
			});
		}
		else {
			console.log("Username or email already in use for", bodyObject);
		}
	});
}