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
		activity.onCreateOptionsMenu = function(_menuevent) {
			var urls = FrogSounds.getAllSoundURLs();
			var AR2Go = new (require('vendor/sound2go.adapter'))(urls);
			AR2Go.addEventListener('oncompleted', function(_e) {
				var status = _e.cached ? 'offline' : 'online';
				_menuevent.menu.findItem(MODELCACHE).setIcon(Ti.App.Android.R.drawable['ic_action_' + status]);
			});
			AR2Go.addEventListener('onprogress', function(_payload) {
				if (_payload && _payload.progress) {
					var ndx = Math.ceil(_payload.progress * 10);
					_menuevent.menu.findItem(MODELCACHE).setIcon(Ti.App.Android.R.drawable['ic_action_online_' + ndx]);
				}
			});
			_menuevent.menu.add({
				title : '2Go',
				itemId : MODELCACHE,
				icon : AR2Go.areCached() ? Ti.App.Android.R.drawable.ic_action_offline : Ti.App.Android.R.drawable.ic_action_online,
				showAsAction : Ti.Android.SHOW_AS_ACTION_ALWAYS,
			}).addEventListener("click", function() {
			  	AR2Go.toggleAllURLCache();
			});
			console.log('Info: ACTIONBAR COMPLETED');
		};
		$.flipViewContainer.addEventListener('itemclick', function(_e) {
			var sound = JSON.parse(_e.itemId);
			Ti.UI.createNotification({
				message : Ti.Network.online ? 'Audiowiedergabe gestartet.' : "Wiedergabe leider nicht möglich, da das " + Ti.Platform.model + ' keine Verbindung ins Neuland hat. '
			}).show();
			if (Ti.Network.online)
				require('ui/player.window')(sound).open();
		});
		$.add($.flipViewContainer);
		$.flipViewContainer.peakNext(true);
	});
	return $;
};
