var FrogSounds = require('model/frogsounds.adapter');


var URL2go = new (require('vendor/url2go.adapter'))();
			
var АктйонБар = require('com.alcoapps.actionbarextras');
const MODELCACHE=1;
module.exports = function(id) {
	var $ = Ti.UI.createWindow({
		fullScreen : true,
		title : 'Froschstimmen'
	});
	$.addEventListener('open', function(_event) {
		АктйонБар.setTitle('Amphibienlaute');
		АктйонБар.setSubtitle('Tierstimmenarchiv.de');
		_event.source.getActivity().actionBar.displayHomeAsUp = true;
		
		var activity = _event.source.getActivity();
		activity.actionBar.onHomeIconItemSelected = function() {
  			_event.source.close();
    	};
    	Ti.UI.createNotification({
    		message:URL2go.areCached() ?'Alle Laute sind jetzt auch ohne Netz verfügbar':'Die Laute sind derweil nur obline verfügbar. Wenn sie auch ohne Netz verfügbar sein soll, könne sie mit dem Knopf recht oben runtergeladen werden.'
    	}).show();
		activity.onCreateOptionsMenu = function(_menuevent) {
			_menuevent.menu.add({
				title : '2Go',
				itemId : MODELCACHE,
				icon : URL2go.areCached() ? Ti.App.Android.R.drawable.ic_action_offline : Ti.App.Android.R.drawable.ic_action_online,
				showAsAction : Ti.Android.SHOW_AS_ACTION_ALWAYS,
			}).addEventListener("click", function() {
			  	URL2go.toggleAllURLs();
			});
			URL2go.addEventListener('oncompleted', function(_e) {
				var status = _e.cached ? 'offline' : 'online';
				var icon = 'ic_action_' + status;
				console.log('cachesate = ' + icon);
				_menuevent.menu && _menuevent.menu.findItem(MODELCACHE).setIcon(Ti.App.Android.R.drawable[icon]);
			});
			URL2go.addEventListener('onprogress', function(_payload) {
				if (_payload && _payload.progress) {
					var ndx = Math.ceil(_payload.progress * 10);
					_menuevent.menu && _menuevent.menu.findItem(MODELCACHE).setIcon(Ti.App.Android.R.drawable['ic_action_online_' + ndx]);
				}
			});
			
		};
		$.flipViewContainer = require('de.manumaticx.androidflip').createFlipView({
			views : FrogSounds.getAllSpeciesNames().map(function(species) {
				return require('ui/frogsounds.list')(species);
			})
		});
		$.flipViewContainer.addEventListener('itemclick', function(_e) {
			var sound = JSON.parse(_e.itemId);
			Ti.UI.createNotification({
				message : Ti.Network.online ? 'Audiowiedergabe gestartet.' : "Wiedergabe leider nicht möglich, da das " + Ti.Platform.model + ' keine Verbindung ins Neuland hat. '
			}).show();
			sound.mp3 = URL2go.getURL(sound.mp3url);
			if (Ti.Network.online)
				require('ui/player.window')(sound).open();
		});
		$.add($.flipViewContainer);
		$.flipViewContainer.peakNext(true);
	});
	return $;
};
