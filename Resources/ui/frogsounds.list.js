var FrogSounds = require('model/frogsounds.adapter');

module.exports = function(species) {
	var $= Ti.UI.createView();
	$.headerView = Ti.UI.createView({height:100,top:0});
	$.headerView.add(Ti.UI.createImageView({
		left : 0,
		height : 100,
		width : 'auto',
		image : '/assets/' + species.toLowerCase() + '.jpg'
	}));
	$.headerView.add(Ti.UI.createLabel({
		text : species,
		right : 10,
		color : '#6f7',
		textAlign : 'right',
		bottom : 2,
		width : Ti.UI.FILL,
		opacity : .7,
		font : {
			fontSize : 30,
			fontWeight : 'bold'
		}
	}));
	$.list= Ti.UI.createListView({
		top:100,
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
						text : 'Author: ' + sound.author
					},
					ctime : {
						height : sound.date || sound.ctime ? Ti.UI.SIZE : 0,
						text : 'Aufnahmezeit: ' + sound.cdate + ' ' + sound.ctime
					},
					locality : {
						height : sound.locality || sound.administrative_area ? Ti.UI.SIZE : 0,
						text : 'Ort: ' + sound.locality + ', ' + sound.administrative_area
					},
					latlng : {
						height : sound.lat &&  sound.lng ? Ti.UI.SIZE : 0,
						text : 'GPS: ' + sound.lat + ',' + sound.lng
					},
					spectrogram : {
						image : sound.spectrogram
					}
				};
			})
		})],
		templates : {
			'template' : require('TEMPLATES').frogsounds
		},
		defaultItemTemplate : 'template',
		
	});
	$.add($.headerView);
	$.add($.list);
	return $;
};

/*

 });*/
