var FrogSounds = require('model/frogsounds.adapter');
var АктйонБар = require('com.alcoapps.actionbarextras');

module.exports = function(id) {
	var $ = Ti.UI.createWindow({
		fullScreen : true,
		title : 'Froschstimmen'
	});
	$.audioPlayer = require('vendor/audioplayer.widget')();
	$.audioPlayer.top = 0;
	$.audioPlayer.zIndex = 9999;
	$.add($.audioPlayer);
	$.addEventListener('open', function(_event) {
		АктйонБар.setTitle('Tierstimmenarchiv.de');
		АктйонБар.setSubtitle('Frösche');
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
				message : 'Originallaufzeit: ' + sound.duration
			}).show();

			$.audioPlayer.setUrl(sound.mp3);
		});
		$.add($.flipViewContainer);
		$.add($.audioPlayer);
	});
	$.addEventListener('close', $.audioPlayer.dispose);
	return $;
};
