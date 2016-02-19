var АктйонБар = require('com.alcoapps.actionbarextras');

module.exports = function(species) {
	if (!species.big) {
		Ti.UI.createNotification({
			message : 'Leider liegt kein Photo mit ausreichender Auflösung dieser Art vor'
		}).show();
		return;
	}
	Ti.UI.createNotification({
		message : 'Das zoombare Photo wird geladen …'
	}).show();
	var $ = Ti.UI.createWindow({
		backgroundColor : 'transparent',
		title : '',
		theme : 'Theme.NoSystemNavigation',
		fullscreen : true,
		width : Ti.UI.FILL,
		height : Ti.UI.FILL
	});
	$.add(Ti.UI.createView({
		backgroundColor : '#c030'
	}));
	$.zoomView = require('com.gbaldera.titouchgallery').createTouchGallery({
		height : Ti.UI.FILL

	});
	$.zoomView.addImage(species.big);

	$.add($.zoomView);
	$.addEventListener('open', function(_event) {
		var activity = $.getActivity();
		function onCloseFn() {
			$.close();
		}


		АктйонБар.setTitle('Amphibienlaute');
		АктйонБар.setSubtitle(species.name);
		activity.actionBar.displayHomeAsUp = true;
		activity.actionBar.onHomeIconItemSelected = onCloseFn;
	});
	$.open();
};
