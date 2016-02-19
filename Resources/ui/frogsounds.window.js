var FrogSounds = require('model/frogsounds.adapter');

var URL2go = new (require('vendor/url2go.adapter'))(FrogSounds.getAllSoundURLs());
const MODELCACHE = 1,
    SEARCH = 2;

var АктйонБар = require('com.alcoapps.actionbarextras');

module.exports = function(id) {
	var $ = Ti.UI.createWindow({
		fullscreen : true,
		title : 'Froschstimmen',
		theme : "Theme.WithActionBar"
	});
	$.addEventListener('open', function(_event) {
		var activity = $.getActivity();
		//activity.invalidateOptionsMenu( );
		activity.onCreateOptionsMenu = require('ui/soundmenu.widget');

		function onCloseFn() {
			$.close();
		}


		АктйонБар.setTitle('Amphibienlaute');
		АктйонБар.setSubtitle('Tierstimmenarchiv.de');

		activity.actionBar.displayHomeAsUp = true;
		activity.actionBar.onHomeIconItemSelected = onCloseFn;

		$.flipViewContainer = require('de.manumaticx.androidflip').createFlipView({
			top : 60,
			views : FrogSounds.getAllSpeciesNames().map(function(species) {
				return require('ui/frogsounds.list')(species);
			})
		});
		$.flipViewContainer.addEventListener('click', function(_e) {
			require('ui/zoomview.window')(FrogSounds.getImagesBySpecies(_e.source.itemId));
		});
		$.flipViewContainer.addEventListener('itemclick', function(_e) {
			var sound = JSON.parse(_e.itemId);
			Ti.UI.createNotification({
				message : Ti.Network.online ? 'Audiowiedergabe gestartet.' : "Wiedergabe leider nicht möglich, da das " + Ti.Platform.model + ' keine Verbindung ins Neuland hat. '
			}).show();
			sound.mp3 = URL2go.getURL(sound.mp3url);
			console.log("PATH=" + sound.mp3);

			if (Ti.Network.online)
				require('ui/player.window')(sound).open();
		});
		$.add($.flipViewContainer);
		$.flipViewContainer.peakNext(true);
	});
	return $;
};
