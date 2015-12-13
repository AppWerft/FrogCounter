var АктйонБар = require('com.alcoapps.actionbarextras');
const DURATION = 20000;

module.exports = function(sound) {
	var audioPlayer = Ti.Media.createVideoPlayer({
		url : sound.mp3url,
		allowBackground : true,
		volume : 1
	});
	audioPlayer.start();
	audioPlayer.addEventListener('progress', function(_e) {
		// calculation of width:
		var procent = (100 * (1 - _e.progress / DURATION)) + '%';
		$.playerView.darker && $.playerView.darker.setWidth(procent);
	});

	audioPlayer.addEventListener('complete', function(_e) {
		$.close();
	});
	var $ = Ti.UI.createWindow({
		backgroundColor : 'transparent',
		title : '',
		fullScreen : true,
		screenOrientations : [Ti.UI.PORTRAIT]
	});
	$.darker = Ti.UI.createView({
		backgroundColor : '#a030'
	});
	$.add($.darker);
	$.addEventListener('click', function() {
		$.close();
	});
	$.playerView = Ti.UI.createView({
		backgroundColor : 'black',
		bottom : 0,
		height : 200
	});
	$.playerView.add(Ti.UI.createImageView({
		width : Ti.UI.FILL,
		height : Ti.UI.FILL,
		image : sound.spectrogram
	}));
	$.playerView.darker = Ti.UI.createView({
		backgroundColor : '#8000',
		width : '100%'
	});
	$.playerView.add($.playerView.darker);
	$.add($.playerView);

	$.addEventListener('open', function() {
		$.activity.actionBar.hide();
	});
	return $;
};
