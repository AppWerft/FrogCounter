
module.exports = function(_event) {
    var activity = _event.source.getActivity();
    activity.onCreateOptionsMenu = function(_menuevent) {
        _menuevent.menu.clear();
        _menuevent.menu.add({
                    title : 'Bestimmung',
                    itemId : 2,
                    icon:Ti.App.Android.R.drawable.ic_action_dicho,
                 showAsAction : Ti.Android.SHOW_AS_ACTION_IF_ROOM,
        }).addEventListener("click", function(){
        	require('ui/dicho.window')().open();
        	
        });
        _menuevent.menu.add({
                    title : 'Zählerverwaltung',
                    itemId : 1,
                    icon:Ti.App.Android.R.drawable.ic_action_counter,
                 showAsAction : Ti.Android.SHOW_AS_ACTION_IF_ROOM,
        }).addEventListener("click", function(){
        	require('ui/counteradmin')().open();
        	
        });
      }  	
        	activity.invalidateOptionsMenu();
        	activity.actionBar.onHomeIconItemSelected = function() {
           !_event.source.displayHomeAsUp && _event.source.close();
        };
     
    
};
