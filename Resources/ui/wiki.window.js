var АктйонБар = require('com.alcoapps.actionbarextras');

Widget = function(options) {
	var $ = Ti.UI.createWindow();
	var webkit = Ti.UI.createWebView({
		url : options.wiki,
		enableZoomControls : false,
		scalesPageToFit : false
	});
	$.add(webkit);
	$.addEventListener('close', function() {
		webkit = null;
	});
	$.addEventListener('androidback', function() {
		if (webkit.canGoBack()) {
			webkit.goBack();
		} else {
			$.close();
		}
	});
	$.addEventListener('open',function(_event) {
		АктйонБар.setTitle('Bestimmungsschlüssel');
		АктйонБар.setSubtitle('');
		_event.source.getActivity().actionBar.displayHomeAsUp=true;
     		var activity = _event.source.getActivity();
     		activity.actionBar.onHomeIconItemSelected = function() {
  				_event.source.close();
    	 };
    }); 
	return $;
};
module.exports = Widget;
