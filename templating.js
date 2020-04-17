function templateHTMLString(htmlString, templateMap) {
	htmlString = htmlString.toString('utf-8');
	for (const keyWord in templateMap) {
		htmlString = htmlString.replace(new RegExp(keyWord, 'g'), templateMap[keyWord]);
	}
	return htmlString;
}

module.exports = {
	templateHTMLString: templateHTMLString
}