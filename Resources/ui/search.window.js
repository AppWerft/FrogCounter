var FrogSounds = require('model/frogsounds.adapter');
var АктйонБар = require('com.alcoapps.actionbarextras');

module.exports = function(id) {

	var $ = Ti.UI.createWindow({
		fullscreen : true,
		title : 'Froschstimmen'
	});
	$.addEventListener('open', function(_event) {
		function onCloseFn() {
			$.close();
		};
		АктйонБар.setTitle('Suche');
		АктйонБар.setSubtitle('Tierstimmenarchiv.de');
		_event.source.getActivity().actionBar.displayHomeAsUp = true;
		var activity = _event.source.getActivity();
		activity.actionBar.onHomeIconItemSelected = onCloseFn;

	});
	$.searchView = Ti.UI.createTextField({
		height : 50,
		top : 0,
		hintText : "Suchbebegriff, beispielsweise „Ratte“"
	});
	$.listView = Ti.UI.createListView({
		sections : [Ti.UI.createListSection({

		})],
		templates : {
			'template' : require('TEMPLATES').animalsounds
		},
		defaultItemTemplate : 'template',
		top : 50
	});
	$.add($.listView);
	$.add($.searchView);
	$.searchView.addEventListener('change', function(_e) {
		var needle = _e.source.getValue();
		var timer;
		var time = new Date().getTime();
		if (needle.length > 2) {
			if (timer)
				clearTimeout(timer);
			timer = setTimeout(function() {
				var items = FrogSounds.searchAnimals(needle).map(function(sound) {
					return {
						properties : {
							itemId : JSON.stringify(sound),
							accessoryType : Ti.UI.LIST_ACCESSORY_TYPE_DISCLOSURE
						},
						title : {
							text : sound.title
						},
						spectrogram : {
							image : sound.spectrogram
						}
					};
				});
				$.listView.sections[0].items = items;
				setTimeout(function() {
					$.searchView.blur();
				}, 2000);
			}, 600);

		}

	});
	$.listView.addEventListener('itemclick', function(_e) {
		var sound = JSON.parse(_e.itemId);
		require('ui/player.window')(sound).open();
	});
	$.addEventListener('close', function(_e) {
		if ($ && $.listView)
			$.listView = null;
	});

	return $;
};
