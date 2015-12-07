var Papa = require('vendor/papaparse');

module.exports = function() {
	var csv = Ti.Filesystem.getFile(Ti.Filesystem.resourcesDirectory, 'model', 'frogsounds.csv').read().text;
	var sounds = Papa.parse(csv, {
		header : false,
		delimiter : ';',
		skipEmptyLines : true,
		dynamicTyping : true,
	});
	console.log(sounds.data);
	
	console.log('Length='+sounds.data.length);
	console.log(sounds.data[0]);

};
