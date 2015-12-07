var Model = new (require('model/index'))();
var Dicho = require('model/dichotomy.adapter');
var АктйонБар = require('com.alcoapps.actionbarextras');


module.exports = function(id) {
	var $ = Ti.UI.createWindow({
		fullScreen : true,
		title : 'Bestimmung'
	});
	var decision = Dicho.getDecision(id);
	$.setTitle(decision.title);
	$.list = Ti.UI.createTableView();
	$.add($.list);
	var rows = decision.questions.map(function(q, i) {
		
		var row = Ti.UI.createTableViewRow({
			height : Ti.UI.SIZE,
			hasChild :  true,
			itemId : q.id,
			wiki : q.wiki
		});
		row.add(Ti.UI.createLabel({
			text : (i+1),
			left : 10,
			top : 5,

			color : '#6f7',
			opacity : 0.7,
			font : {
				fontSize : 36,
				fontWeight : 'bold'
			}
		}));
		row.add(Ti.UI.createView({
			top : 10,right:10,
			bottom:10,
			left : 60,
			layout : 'vertical'
		}));
		row.children[1].add(Ti.UI.createLabel({
			left : 0,
			textAlign : 'left',
			text : q.questiontext,
			font : {
				fontSize : 18
			}
		}));
		if (q.images.length)
		row.children[1].add(Ti.UI.createImageView({
			left : 0,
			top:10,
			image: q.images[0],
			width:Ti.UI.FILL,
			height: 'auto',
			defaultImage : '/assets/default.png'
		}));
		if (q.description)
			row.children[1].add(Ti.UI.createLabel({
				left : 0,
				textAlign : 'left',
				text : q.description,
				font : {
					fontSize : 14
				}
			}));
		return row;
	});
	$.list.setData(rows);
	$.list.addEventListener('click', function(e) {
		if (e.row.itemId)
			require('ui/dicho.window')(e.row.itemId).open();
		else if (e.row.wiki)
			require('ui/wiki.window')({wiki:e.row.wiki}).open();
	});
	$.addEventListener('open',function(_event) {
		АктйонБар.setTitle('Bestimmungsschlüssel');
		АктйонБар.setSubtitle(decision.title);
		_event.source.getActivity().actionBar.displayHomeAsUp=true;
     		var activity = _event.source.getActivity();
     		activity.actionBar.onHomeIconItemSelected = function() {
  				_event.source.close();
  				
    	 };
    	 
    	  activity.onCreateOptionsMenu = function(_menuevent) {
    	 
    	  };
    }); 
	return $;
};
