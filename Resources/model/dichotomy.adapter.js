var start = new Date().getTime();

var tree = JSON.parse(Ti.Filesystem.getFile(Ti.Filesystem.resourcesDirectory, 'model', 'amphibienbaum.json').read().text);
console.log(tree);

var decisions = tree.dichotomy;

/*tree.content.forEach(function(c) {
 if (c.type == 'decisiontree' || c.type == 'imageswitch') {

 c.decision.forEach(function(d) {
 console.log(d.id);
 d.title = c.metadata.title[0].content;
 decisions[d.id] = d;
 });

 };
 });

 function getUrl(media) {
 var media = tree.media.filter(function(m) {
 return m.local_file_id == id ? true : false;
 });
 console.log(media);

 }
 */
exports.getDecision = function(id) {
	if (!id)
		id = tree.rootid;
	return {
		title : decisions[id].title,
		questions : decisions[id].alternatives.map(function(alt) {
			return {
				questiontext : alt.property,
				images : alt.images || [],
				id : alt.nextdecision,
				wiki: alt.wiki,
				

			};
		})
	};
};
