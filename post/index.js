/* Directory Module Loader
This anonymous function is called right away when this directory is called as a module.
This function loads the function in each file (except for index.js) into this directory's module.exports .
Each file in this directory has one function named after the file.
Each function takes two required arguments named request and response.
The request and response args are the http request and response objects to be handled by that file's function.
*/
(function() {
	// Retrieve an array of all the files.
	require('fs').readdirSync(__dirname).forEach(function(fileName) {
		if (fileName != 'index.js') {
			let extensionIndex = fileName.indexOf('.');

			// This if runs if the file is a directory. It will load from the module loader in the directory's index.js . 
			if (extensionIndex < 0) {
				// Export the directory's module.
				module.exports[fileName] = require('./' + fileName);
			}
			else {
				// Remove the file extension to get the module name.
				let moduleName = fileName.substring(0, fileName.indexOf('.'));
				// Export each file's function.
				module.exports[moduleName] = require('./' + moduleName)[moduleName];
			}
		}
	});
})();