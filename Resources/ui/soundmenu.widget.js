const MODELCACHE = 1,
    SEARCH = 2;
module.exports = function(_e) {
	var FrogSounds = require('model/frogsounds.adapter');
	var URL2go = new (require('vendor/url2go.adapter'))(FrogSounds.getAllSoundURLs());

	var menu = _e.menu;
	menu.clear();
	var poimenuitem = menu.add({
		title : 'Karte',
		itemId : 3,
		icon : Ti.App.Android.R.drawable.ic_action_poi,
		showAsAction : Ti.Android.SHOW_AS_ACTION_IF_ROOM
	});
	poimenuitem.addEventListener("click", require('ui/poi.window'));
	var searchmenuitem = menu.add({
		title : 'Suche',
		itemId : SEARCH,
		icon : Ti.App.Android.R.drawable.ic_action_search,
		showAsAction : Ti.Android.SHOW_AS_ACTION_IF_ROOM
	});

	var cachemenuitem = menu.add({
		title : '2Go',
		itemId : MODELCACHE,
		icon : URL2go.areCached() ? Ti.App.Android.R.drawable.ic_action_offline : Ti.App.Android.R.drawable.ic_action_online,
		showAsAction : Ti.Android.SHOW_AS_ACTION_ALWAYS
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
	Ti.UI.createNotification({
		message : URL2go.areCached() ? 'Alle Laute sind jetzt auch ohne Netz verfügbar' : 'Die Laute sind derweil nur online verfügbar. Wenn sie auch ohne Netz verfügbar sein soll, könne sie mit dem Knopf recht oben runtergeladen werden.'
	}).show();

	searchmenuitem.addEventListener("click", require('ui/search.window'));
	cachemenuitem.addEventListener("click", function() {
		URL2go.toggleAllURLs();
	});

};
