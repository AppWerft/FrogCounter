var FrogSounds = require('model/frogsounds.adapter');

module.exports = function(species) {
	console.log(species);
	var headerView = Ti.UI.createView();
	headerView.add(Ti.UI.createLabel({
		text : species,
		color : 'green',
		font : {
			fontSize : 30,
			fontWeight : 'bold'
		}
	}));
	return Ti.UI.createListView({
		sections : [Ti.UI.createListSection({
			items : FrogSounds.getRecordsBySpecies(species).map(function(sound) {
				return {
					properties : {
						itemId : JSON.stringify(sound),
						accessoryType : Ti.UI.LIST_ACCESSORY_TYPE_DISCLOSURE
					},
					description : {
						text : sound.description
					},
					author : {
						text : 'Autor: ' + sound.author
					},
					ctime : {
						text : 'Aufnahme: ' + sound.cdate + ' ' + sound.ctime
					}
				};
			})
		})],
		templates : {
			'template' : require('TEMPLATES').frogsounds
		},
		defaultItemTemplate : 'template',
		headerView : headerView
	});
};

$.add($.scrollableView);
/*


 });*/
