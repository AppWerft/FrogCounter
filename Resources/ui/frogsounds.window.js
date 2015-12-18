var FrogSounds = require('model/frogsounds.adapter');

var URL2go = new (require('vendor/url2go.adapter'))(FrogSounds.getAllSoundURLs());

var АктйонБар = require('com.alcoapps.actionbarextras');
const MODELCACHE = 1,
    SEARCH = 2;

module.exports = function(id) {
	var menu;
	var $ = Ti.UI.createWindow({
		fullscreen : true,
		title : 'Froschstimmen',theme: "Theme.WithActionBar"
	});
	$.addEventListener('open', function(_event) {
		function onCloseFn() {
			_event.source.close();
		}
		АктйонБар.setTitle('Amphibienlaute');
		АктйонБар.setSubtitle('Tierstimmenarchiv.de');
		var activity = _event.source.getActivity();
		activity.actionBar.displayHomeAsUp = true;
		activity.actionBar.onHomeIconItemSelected = onCloseFn;
		activity.onCreateOptionsMenu = function(_menuevent) {
			menu = _menuevent.menu;
			menu.add({
				title : 'Karte',
				itemId : 3,
				icon : Ti.App.Android.R.drawable.ic_action_poi,
				showAsAction : Ti.Android.SHOW_AS_ACTION_IF_ROOM,
			}).addEventListener("click", function() {
				require('ui/poi.window')().open();
			});
			menu.add({
				title : 'Suche',
				itemId : SEARCH,
				icon : Ti.App.Android.R.drawable.ic_action_search,
				showAsAction : Ti.Android.SHOW_AS_ACTION_IF_ROOM,
			}).addEventListener("click", function() {
				require('ui/search.window')().open();
			});
			menu.add({
				title : '2Go',
				itemId : MODELCACHE,
				icon : URL2go.areCached() ? Ti.App.Android.R.drawable.ic_action_offline : Ti.App.Android.R.drawable.ic_action_online,
				showAsAction : Ti.Android.SHOW_AS_ACTION_ALWAYS,
			}).addEventListener("click", function() {
				URL2go.toggleAllURLs();
			});
			URL2go.addEventListener('onfinish', function(_e) {
				var status = _e.cached ? 'offline' : 'online';
				var icon = 'ic_action_' + status;
				console.log('cachestate ICON = ' + icon);
				var item = menu.findItem(MODELCACHE);
				console.log(item.apiName);
				item && item.setIcon(Ti.App.Android.R.drawable[icon]);
			});
			URL2go.addEventListener('onprogress', function(_payload) {
				if (_payload && _payload.progress) {
					var ndx = (Math.ceil(_payload.progress * 10)) % 10;
					menu && menu.findItem(MODELCACHE).setIcon(Ti.App.Android.R.drawable['ic_action_online_' + ndx]);
				}
			});
		};
		Ti.UI.createNotification({
			message : URL2go.areCached() ? 'Alle Laute sind jetzt auch ohne Netz verfügbar' : 'Die Laute sind derweil nur online verfügbar. Wenn sie auch ohne Netz verfügbar sein soll, könne sie mit dem Knopf recht oben runtergeladen werden.'
		}).show();
		$.flipViewContainer = require('de.manumaticx.androidflip').createFlipView({
			top:60,
			views : FrogSounds.getAllSpeciesNames().map(function(species) {
				return require('ui/frogsounds.list')(species);
			})
		});
		$.flipViewContainer.addEventListener('itemclick', function(_e) {
			var sound = JSON.parse(_e.itemId);
			Ti.UI.createNotification({
				message : Ti.Network.online ? 'Audiowiedergabe gestartet.' : "Wiedergabe leider nicht möglich, da das " + Ti.Platform.model + ' keine Verbindung ins Neuland hat. '
			}).show();
			console.log("URL="+sound.mp3url);
			sound.mp3 = URL2go.getURL(sound.mp3url);
			console.log("PATH="+sound.mp3);
			
			if (Ti.Network.online)
				require('ui/player.window')(sound).open();
		});
		$.add($.flipViewContainer);
		$.flipViewContainer.peakNext(true);
	});
	return $;
};
