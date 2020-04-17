function validateNewUser() {
	let username = document.forms["newUserForm"]['username'].value;
	let email = document.forms["newUserForm"]['email']value;
	let password = document.forms["newUserForm"]['password']value;

	console.log(username, email, password)
	if (!username.match(/^[a-z0-9_]+$/)) {
		alert("Username can only contain lowercase letters and underscores.");
		return false;
	}
	if (username == '') {
		alert("Username can't be empty.");
		return false;
	}
	if (email == '') {
		alert("Email can't be empty.");
		return false;
	}
	if (password.length < 7) {
		alert("Password must be at least 7 characters long.");
		return false;
	}

}