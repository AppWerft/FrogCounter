var AF = require('vendor/awesomeicons');

module.exports = function() {

	var $ = Ti.UI.createView({
		height : 100,
		top : -100,
		backgroundColor : '#a090'
	});
	$.timer = Ti.UI.createLabel({
		top : 10,
		right : 20,
		width : Ti.UI.SIZE
	});
	$.playStopBtn = Ti.UI.createButton({
		textAlign : Ti.UI.TEXT_ALIGNMENT_LEFT,
		backgroundColor : "transparent",
		font : {
			fontSize : 30,
			fontFamily : "FontAwesome"
		},
		color : "#906f",
		top : 0,
		title : AF.getIcon('play'),
		width : Ti.UI.SIZE,
		height : Ti.UI.SIZE
	});
	$.scrubBar = Ti.UI.createSlider({
		top : "60dp",
		width : "80%",
		height : "30dp",
		min : 0,
		max : 100,
		value : 0,
		style : (Ti.Android ? undefined : Titanium.UI.iPhone.ProgressBarStyle.PLAIN)
	});
	$.add($.timer);
	$.add($.playStopBtn);
	$.add($.scrubBar);

	var args = arguments[0] || {};

	// save off current idle timer state
	Ti.App.idleTimerDisabled = true;

	var idleTimer = Ti.App.idleTimerDisabled,
	    audioPlayer = Ti.Media.createSound(),
	    timer,
	    sliderTouched = false,
	    sliderIsPausingPlayback = false,
	    timerIsActive = false,
	    totalDisplayDuration,
	    playIcon,
	    pauseIcon;
	// show by default
	$.scrubBar.show();

	$.scrubBar.addEventListener('touchstart', function(e) {
		sliderTouched = true;

		if (audioPlayer.playing) {
			sliderIsPausingPlayback = true;
			stopTimer();
			audioPlayer.pause();
		}
	});

	$.scrubBar.addEventListener('change', function(e) {
		if (sliderTouched) {
			updateTimeLabel(e.value);
		}
	});

	$.scrubBar.addEventListener('touchend', function(e) {
		audioPlayer.setTime($.scrubBar.value);
		if (audioPlayer.paused) {
			if (sliderIsPausingPlayback) {
				audioPlayer.play();
				startTimer();
			}
		}
		sliderTouched = false;
		sliderIsPausingPlayback = false;
	});

	function onPlayStopBtnClicked() {
		if (audioPlayer.playing) {
			audioPlayer.pause();
			stopTimer();
			$.playStopBtn.title = AF.getIcon('play');
		} else {
			audioPlayer.play();
			$.scrubBar.max = getDuration();
			// start the timer
			startTimer();
			// update the icon
			$.playStopBtn.title = AF.getIcon('stop');
		}
	}

	function getDuration() {
		return Ti.Android ? Math.ceil(audioPlayer.duration * 1000) : Math.ceil(audioPlayer.duration);
	}

	/**
	 * prettifyTime
	 * @param {String} time in seconds
	 * @return {String} pretty time
	 */
	function prettifyTime(time) {
		time = Math.floor(time);
		// find minutes and seconds
		var minutes = Math.floor(time / 60);
		var seconds = time - minutes * 60;
		return padLeft(minutes, 2) + ":" + padLeft(seconds, 2);
	}

	function padLeft(nr, n, str) {
		return Array(n - String(nr).length + 1).join(str || '0') + nr;
	}

	function calcTotalDurationForTimeLabel() {
		// calc the duration - only once
		totalDisplayDuration = prettifyTime(getDuration() / 1000);
	}

	function updateTimeLabel(time) {
		if (!time) {
			time = audioPlayer.time;
		}
		$.timer.text = prettifyTime(Math.round(time) / 1000) + " / " + (totalDisplayDuration || '0');
	}

	function startTimer() {
		// twice per second
		if (!timerIsActive) {
			timer = setInterval(function() {
				if (audioPlayer && audioPlayer.time) {
					var currentTime = Math.round(audioPlayer.time);
					$.scrubBar.value = currentTime;
					$.timer.text = prettifyTime(currentTime / 1000) + " / " + totalDisplayDuration;
				}
			}, 500);
			setTimeout(function() {
				clearInterval(timer);
			}, 30000);
		}

		timerIsActive = true;
	}

	function stopTimer() {
		clearInterval(timer);
		timerIsActive = false;
	}

	if (!Ti.Android) {
		// iOS only events
		audioPlayer.addEventListener('interrupted', function(e) {
			//Ti.API.debug('[AudioPlayerWidget]' + e.type);
			stopTimer();
		});

		audioPlayer.addEventListener('resume', function(e) {
			//Ti.API.debug('[AudioPlayerWidget]' + e.type);
			startTimer();
		});

	} else {
		// Android only events
		audioPlayer.addEventListener('change', function(e) {
			Ti.API.debug("[AudioPlayerWidget] State: " + e.description + ' (' + e.state + ')');
			// state handling
			if (e.state == Ti.Media.Sound.STATE_PLAYING) {
				startTimer();
			} else if (e.state == Ti.Media.Sound.STATE_PAUSED) {
				stopTimer();
			} else if (e.state == Ti.Media.Sound.STATE_STOPPED) {
				$.top.animate({
					top : -100
				});
				stopTimer();
			}
		});
	}

	$.setUrl = function(url) {
		// we instatiate a new sound
		audioPlayer = Ti.Media.createSound({
			url : url,
			allowBackground : true
		});

		// calc the duration
		calcTotalDurationForTimeLabel();

		// new sound - update the display
		updateTimeLabel();

		// update the icon
		$.playStopBtn.title = AF.getIcon('pause');
		audioPlayer.play();
		startTimer();
		return;
		$.animate({
			top : 0
		});
	};
	$.dispose = function() {
		audioPlayer.stop();
		if (Ti.Android) {
			audioPlayer.release();
		}
		Ti.App.idleTimerDisabled = idleTimer;
	};
	return $;
};
