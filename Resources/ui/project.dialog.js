module.exports = function(onCompleted) {
	var $ = Ti.UI.createAlertDialog({
		androidView : Ti.Android ? Ti.UI.createTextField({
			left:20,
			right:20,
			hintText : 'Name/Ort der Zählung',
		}) : undefined,
		style : Ti.Android ? undefined : Ti.UI.iPhone.AlertDialogStyle.PLAIN_TEXT_INPUT,
		title : 'Ort der Zählung',
		buttonNames : ['OK'],
		message :  'Dieser Name taucht in der Liste der Zählungen auf und könnte beispielsweise der Zählort sein.'
	});
	$.show();
	$.addEventListener('click', function(e) {
		if (e.index >= 0) {
			onCompleted($.androidView.getValue());
		};
	});
	};