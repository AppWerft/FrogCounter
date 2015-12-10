var data = JSON.parse(Ti.Filesystem.getFile(Ti.Filesystem.resourcesDirectory, 'model', 'frogsounds.json').read().text);
var species = {};
data.forEach(function(line) {
	if (!species[line[0]])
		species[line[0]] = [];
	if (line[33])
		species[line[0]].push({
			locality : line[2],
			district : line[5],
			lat : line[7],
			lng : line[8],
			date : line[9],
			time : line[10],
			description : line[17],
			sound_type : line[18],
			background_species : line[19],
			author : line[22],
			weather : line[23],
			duration : line[32],
			mp3 : 'http://www.tierstimmenarchiv.de/recordings/' + line[33] + '_short.mp3'
		});
});

exports.getAllSpeciesNames = function() {
	return Object.getOwnPropertyNames(species);
};
exports.getRecordsBySpecies = function(s) {
	return species[s];
};
