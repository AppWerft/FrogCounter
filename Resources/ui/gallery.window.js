var frogs = require('model/frogs');

var Model = new (require('model/index'))();
var flippableView = require('de.manumaticx.androidflip');

module.exports = function() {
	var $ = Ti.UI.createWindow({
		title : 'Froschzähler',
		fullScreen : true
	});
	var views = frogs.map(function(frog) {
		var view = Ti.UI.createView();
		var scrollView = Ti.UI.createScrollView({
			backgroundColor : 'black',
			scrollType : 'vertical',
			layout : 'vertical',
			bubbleParent : false
		});
		view.add(scrollView);
		frog.images.forEach(function(image) {
			scrollView.add(Ti.UI.createImageView({
				top : 0,
				image : '/assets/' + image,
				width : Ti.UI.FILL,
				height : 'auto'
			}));
		});
		view.animalname = Ti.UI.createLabel({
			top : 10,
			left : 10,
			color : '#6f7',
			opacity : 0.7,
			font : {
				fontWeight : 'bold',
				fontSize : 36
			},
			text : frog.name
		});
		view.latinname = Ti.UI.createLabel({
			top : 50,
			left : 10,
			color : '#6f7',
			opacity : 0.7,
			font : {
				fontWeight : 'bold',
				fontSize : 20,
				fontStyle: 'cursive'
			},
			text : frog.latin || ''
		});
		view.add(view.animalname);
		view.add(view.latinname);
		view.counter = Ti.UI.createLabel({
			top : -10,
			right : 10,
			height : 120,
			color : '#DF8F00',
			opacity : 1,
			font : {
				fontWeight : 'bold',
				fontSize : 96
			},
			text : ''
		});
		view.add(view.counter);
		return view;
	});
	//	console.log(views);
	$.scrollableView = flippableView.createFlipView({
		views : views
	});

	$.add($.scrollableView);
	$.button = Ti.UI.createButton({
		backgroundImage : '/assets/counter.png',
		width : 200,
		height : 160,
		bottom : 10,
		opacity : 0.6
	});

	$.add($.button);
	$.button.animate({
		opacity : 1
	});
	$.scrollableView.addEventListener('flipped', function(_e) {
		views[_e.index].children[0].children[0].animate({
			opacity : 1,
			duration : 100
		});
		$.button.animate({
			opacity : 0.6
		});
	});
	$.scrollableView.peakNext(true);
	$.button.addEventListener('touchstart', function() {
		if (!Model.getId()) {
			Ti.UI.createNotification({
				message : 'Um Amphibien zählen zu können, musst Du rechts oben auf den Zähler klicken und eine Zählung mit „+“ anlegen.',
				duration : 10000
			}).show();
			return;
		}
		$.button.backgroundImage = '/assets/counter_.png';
		setTimeout(function() {
			$.button.backgroundImage = '/assets/counter.png';
		}, 50);
		var value = Model.incrementCounter(frogs[$.scrollableView.currentPage].name);
		views[$.scrollableView.currentPage].counter.text = value;
	});

	$.addEventListener('open', require('ui/actionbar'));
	require('vendor/versionsreminder')();
	return $;
};
