Ti.App.Properties.removeProperty('AMPHSPECIES');

if (Ti.App.Properties.hasProperty('AMPHSPECIES')) {
	var species = JSON.parse(Ti.App.Properties.getString('AMPHSPECIES'));
} else {
	console.log('Info: species must build ============================');
	var lines = JSON.parse(Ti.Filesystem.getFile(Ti.Filesystem.resourcesDirectory, 'model', 'frogsounds.json').read().text);
	var records = Ti.Filesystem.getFile(Ti.Filesystem.resourcesDirectory, 'model', 'recordslist.text').read().text;
	var species = {};
	var primarykey = {};
	var total = 0;
	lines.forEach(function(line) {
		var latin = line[0];
		var key = line[33];
		if (primarykey[key] == true)
			return;
		primarykey[key] = true;
		if (!species[latin])
			species[latin] = [];
		if (key && records.match(new RegExp(key, 'gm'))) {
			total++;
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
				mp3url : 'http://www.tierstimmenarchiv.de/recordings/' + key + '_short.mp3',
				spectrogram : 'http://mm.webmasterei.com/spectrogram/' + key + '_short.mp3.wav.png.jpg'
			});
		}
	});
	Object.getOwnPropertyNames(species).forEach(function(s) {
		if (!species[s].length)
			delete species[s];
	});

	Ti.App.Properties.setString('AMPHSPECIES', JSON.stringify(species));

	primarykey = null;
	Ti.UI.createNotification({
		message : 'Tierstimmenarchiv erfolgtreich importiert.\n' + total + ' Tonaufnahmen'
	}).show();
}
exports.getAllSpeciesNames = function() {
	var names = species ? Object.getOwnPropertyNames(species) : [];
	return names.sort(function(a, b) {
		return species[a].length < species[b].length ? true : false;
	});
};
exports.getRecordsBySpecies = function(name) {
	if (Ti.App.Properties.hasProperty('AMPHSPECIES'))
		return species[name];
	else
		return {};
};
exports.getAllSoundURLs = function() {
	var urls=[];
	Object.getOwnPropertyNames(species).forEach(function(name) {
		species[name].forEach(function(item){
			urls.push(item.mp3url);
		});
	});
	return urls;
}; 