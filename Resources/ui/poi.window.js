var FrogSounds = require('model/frogsounds.adapter');
var URL2go = new (require('vendor/url2go.adapter'))(FrogSounds.getAllSoundURLs());
var АктйонБар = require('com.alcoapps.actionbarextras');
var Map = require('ti.map');



module.exports = function(id) {
	var $ = Ti.UI.createWindow({
		fullScreen : true,
		title : 'Froschstimmen',
		theme : 'Theme:NoSystemNavigation',
		fullscreen : true
	});
	$.addEventListener('open', function(_event) {
		function onCloseFn() {
			_event.source.close();
		}
		АктйонБар.setTitle('Amphibienlaute');
		АктйонБар.setSubtitle('Aufnahmeorte auf Weltkarte');

		var activity = _event.source.getActivity();
		activity.actionBar.displayHomeAsUp = true;
		activity.actionBar.onHomeIconItemSelected = onCloseFn;
		activity.onCreateOptionsMenu = function(_menuevent) {

		};

		$.mapView = Map.createView({
			region : {
				latitude : 43,
				longitude : 10,
				latitudeDelta : 30,
				longitudeDelta : 30
			},
			mapType : 1,
			enableZoomControls : false,
			compassEnabled : false,
			userLocation : false,
			userLocationButton : false,
		});
		$.mapView.addEventListener('click', function(_e) {
			Ti.Media.createAudioPlayer({
				url : URL2go.getURL(_e.annotation.mp3url)
			}).play();
		});
		$.add($.mapView);
		$.mapView.addAnnotations(FrogSounds.getAllPOIs().map(function(poi) {
			return Map.createAnnotation({
				latitude : poi.lat,
				mp3url : poi.mp3url,
				longitude : poi.lng,
				title : poi.latin,
				subtitle : poi.description
			});
		}));

		Ti.UI.createNotification({
			message : 'Klick auf Marker startet sofort Wiedergabe'
		}).show();
		Ti.Gesture.addEventListener('orientationchange', onOrientationchangeFn);
	});
	function onOrientationchangeFn() {
		if (Ti.Platform.displayCaps.platformHeight > Ti.Platform.displayCaps.platformWidth)
			$.activity.actionBar.show();
		else
			$.activity.actionBar.hide();
	}

	return $;
};
