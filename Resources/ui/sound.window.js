var FrogSounds = require('model/frogsounds.adapter');
var АктйонБар = require('com.alcoapps.actionbarextras');

module.exports = function(id) {
	var $ = Ti.UI.createWindow({
		fullScreen : true,
		title : 'Froschstimmen'
	});
	$.player = Ti.Media.createVideoPlayer({
		left:10,
		right:10,
		mediaControlStyle:Ti.Media.VIDEO_CONTROL_DEFAULT,
		top:0,allowsAirPlay :true,
		height:50
	});
	$.add($.player);
	$.list = Ti.UI.createListView({
		top:80,
		templates : {
			'template' : require('TEMPLATES').frogsounds
		},
		defaultItemTemplate : 'template',
		sections : FrogSounds.getAllSpeciesNames().map(function(species){
			return Ti.UI.createListSection({
				headerTitle:species,
				items : FrogSounds.getRecordsBySpecies(species).map(function(sound){
					return {
						properties:{
							itemId : JSON.stringify(sound),
							accessoryType : Ti.UI.LIST_ACCESSORY_TYPE_DISCLOSURE
						},
						description : {
							text : sound.description
						}
					};
				})
			})
		})
	});
	$.add($.list);
	$.list.addEventListener('itemclick', function(_e) {
		var sound = JSON.parse(_e.itemId);
		Ti.UI.createNotification({
			message:'Autor: ' +sound.author+ '\nZeit: '+sound.duration}).show();
		$.player.release();
		$.player.setUrl(sound.mp3);
		$.player.play();
		
	});
	$.addEventListener('open',function(_event) {
		АктйонБар.setTitle('Tierstimmenarchiv.de');
		АктйонБар.setSubtitle('Frösche');
		_event.source.getActivity().actionBar.displayHomeAsUp = true;
     		var activity = _event.source.getActivity();
     		activity.actionBar.onHomeIconItemSelected = function() {
  				_event.source.close();
  				
    	  };
    	  activity.onCreateOptionsMenu = function(_menuevent) {
    	  };
    }); 
	return $;
};
