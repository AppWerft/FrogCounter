var FrogSounds = require('model/frogsounds.adapter');
var АктйонБар = require('com.alcoapps.actionbarextras');

module.exports = function(id) {
	var $ = Ti.UI.createWindow({
		fullScreen : true,
		title : 'Froschstimmen'
	});
	$.addEventListener('open', function(_event) {
		АктйонБар.setTitle('Tierstimmenarchiv.de');
		АктйонБар.setSubtitle('Frösche/Unken/Kröten');
		_event.source.getActivity().actionBar.displayHomeAsUp = true;

		$.flipViewContainer = require('de.manumaticx.androidflip').createFlipView({
			views : FrogSounds.getAllSpeciesNames().map(function(species) {
				return require('ui/frogsounds.list')(species);
			})
		});
		var activity = _event.source.getActivity();
     	activity.actionBar.onHomeIconItemSelected = function() {
  			_event.source.close();
    	};
    	activity.onCreateOptionsMenu = function(_menuevent) {};
		$.flipViewContainer.addEventListener('itemclick', function(_e) {
			var sound = JSON.parse(_e.itemId);
			Ti.UI.createNotification({
				message : Ti.Network.online ?'Audiowiedergabe gestartet.' : "Wiedergabe leider nicht möglich, da das " + Ti.Platform.model + ' keine Verbindung ins Neuland hat. '
			}).show();
			if (Ti.Network.online)
				require('ui/player.window')(sound).open();
		});
		$.add($.flipViewContainer);
		$.flipViewContainer.peakNext(true);
	});
	return $;
};
