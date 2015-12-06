var frogs = [{
	name : "Erdkröte",
	images : ["Erdkroete/0.jpg", "Erdkroete/1.jpg", "Erdkroete/2.jpg", "Erdkroete/3.jpg", "Erdkroete/4.jpg"],
	description : "ein Text ohne Sinn"
}, {
	name : "Grasfrosch",
	description : "ein Text ohne Sinn",
	images : ["Grasfrosch/1.jpg", "Grasfrosch/2.jpg", "Grasfrosch/3.jpg", "Grasfrosch/4.jpg"]
}, {
	name : "Teichmolch",
	images : ["Teichmolch/1.jpg", "Teichmolch/2.jpg", "Teichmolch/3.jpg", "Teichmolch/4.jpg"]
}, {
	name : "Fadenmolch",
	images : ["Fadenmolch/0.jpg", "Fadenmolch/1.jpg", "Fadenmolch/2.jpg", "Fadenmolch/4.jpg"]
}, {
	name : "Bergmolch",
	images : ["Bergmolch/1.jpg", "Bergmolch/2.jpg", "Bergmolch/4.jpg", "Bergmolch/5.jpg"]
}, {
	name : "Grünfrosch",
	images : ["Gruenfrosch/1.jpg", "Gruenfrosch/2.jpg", "Gruenfrosch/3.jpg"]
}, {
	name : "Moorfrosch",
	images : ["Moorfrosch/1.jpg", "Moorfrosch/2.jpg", "Moorfrosch/3.jpg"]
}, {
	name : "Springfrosch",
	images : ["Springfrosch/1.jpg", "Springfrosch/2.jpg", "Springfrosch/3.jpg"]
}];

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
		view.add(view.animalname);
		view.counter = Ti.UI.createLabel({
			top : 0,
			right : 10,
			height : 100,
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
