var Model = new (require('model/index'))();
var Moment = require('vendor/moment');
Moment.locale('de');

module.exports = function() {
	function updateList() {
		var data = Model.list();
		console.log(data);
		if (data.length==0) return;
		var rows = data.map(function(e){
			console.log(e.summary);
			var row = Ti.UI.createTableViewRow({
				height:Ti.UI.SIZE,
				itemId : JSON.stringify(e)
			});
			row.add(Ti.UI.createLabel({
				color : '#6f7',
				text: e.title,
				height:Ti.UI.SIZE,
				font : {
					fontWeight:'bold',
					fontSize:20
				},
				top:10,
				left:10
				
			}));
			row.add(Ti.UI.createLabel({
				color:'#eee',
				text: Moment(e.ctime).format('LLLL'),
				height:Ti.UI.SIZE,
				font : {fontSize:16},
				top:40,
				left:10
			}));
			row.add(Ti.UI.createLabel({
				color:'#eee',
				text: 'Individuen: ' + e.summary.total + ',  Arten: ' + e.summary.species ,
				height:Ti.UI.SIZE,
				font : {fontSize:16},
				top:60,
				left:10
			}));
			return row;
		});
		$.list.setData(rows);
	}
	var $ = Ti.UI.createWindow({
		title : 'Zählverwaltung'
	});
	$.list = Ti.UI.createTableView({
		top:0,
		bottom:0,
		height:Ti.UI.FILL
	});
	$.list.addEventListener('click',function(e){
		var data = JSON.parse(e.row.itemId);
		var emailDialog = Ti.UI.createEmailDialog()
		emailDialog.subject = "Amphibienzählung";
		emailDialog.toRecipients = ['info@nabu.de'];
		var results = Object.getOwnPropertyNames(data.result).map(function(amphibienname){
			console.log(amphibienname);
			return amphibienname + ': ' + data.result[amphibienname];
		});
		emailDialog.messageBody = 'Zeit: ' +Moment(data.ctime).format('LLLL') + ' Uhr,\nOrt: ' + data.title + '\n' +'Zählergebnisse:\n===============\n\n'+
	results.join('\n');
		emailDialog.open();
	});
  	$.addEventListener('open',function(_event){
  		
  		$.add($.list);
  		_event.source.getActivity().actionBar.displayHomeAsUp=true;
     		var activity = _event.source.getActivity();
     		activity.actionBar.onHomeIconItemSelected = function() {
  				_event.source.close();
    	 };
  		activity.onCreateOptionsMenu = function(_menuevent) {
        _menuevent.menu.clear();
        _menuevent.menu.add({
                    title : 'Add',
                    itemId : 1,
                    icon:Ti.App.Android.R.drawable.ic_action_add,
                 showAsAction : Ti.Android.SHOW_AS_ACTION_IF_ROOM,
        }).addEventListener("click", function(){
        	       	require('ui/project.dialog')(function(title){
        	     	Model.add({
        				title:title
        			});
        			updateList();
        			//_event.source.close();
        	});
        });
      }  	
       activity.invalidateOptionsMenu();
       activity.actionBar.onHomeIconItemSelected = function() {
       _event.source.close();
     };
    });
    updateList();
	return $;
}; 