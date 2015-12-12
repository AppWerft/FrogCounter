if (Ti.App.Properties.hasProperty('SPECIES') || false) {
	console.log('Info: species from locale storage');
	var species = JSON.parse(Ti.App.Properties.getString('SPECIES'));
} else {
	console.log('Info: species must build');
	var csv = require('jp.coe.mod.csvparser');
    var f = csv.getFileToJSON("model/frogsounds.csv");
    console.log(f);
	var data = JSON.parse(Ti.Filesystem.getFile(Ti.Filesystem.resourcesDirectory, 'model', 'frogsounds.json').read().text);
	var records = Ti.Filesystem.getFile(Ti.Filesystem.resourcesDirectory, 'model', 'recordslist.text').read().text;
	var species = {};
	data.forEach(function(line) {
		var latin = line[0];
		if (!species[latin])
			species[latin] = [];
		if (line[33] && line[17] && records.match(new RegExp(line[33], 'gm'))) {
			species[latin].push({
				locality : line[2],
				administrative_area : line[3],
				country : line[4],
				state : line[5],
				scenic_area : line[6],
				lat : line[7],
				lng : line[8],
				cdate : line[10] || 'keine Angabe',
				ctime : line[11] || '',
				description : line[17],
				sound_type : line[18],
				background_species : line[19],
				author : line[22],
				weather : line[23],
				duration : line[32],
				mp3 : 'http://www.tierstimmenarchiv.de/recordings/' + line[33] + '_short.mp3'
			});
		}
	});
	Object.getOwnPropertyNames(species).forEach(function(s) {
		if (!species[s].length)
			delete species[s];
	});
	Ti.App.Properties.setString('SPECIES', JSON.stringify(species));
	Ti.UI.createNotification({
		message : 'Tierstimmenarchiv erfolgtreich importiert.'
	}).show();
}
exports.getAllSpeciesNames = function() {
	return Ti.App.Properties.hasProperty('SPECIES') ? Object.getOwnPropertyNames(species) : [];

};
exports.getRecordsBySpecies = function(s) {
	if (Ti.App.Properties.hasProperty('SPECIES'))
		return species[s];
	else
	return {};
};
