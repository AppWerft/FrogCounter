exports.frogsounds = {
	properties : {
		height : Ti.UI.SIZE,
		itemId : '',
		layout : 'vertical'
	},
	childTemplates : [{
		type : 'Ti.UI.Label',
		bindId : 'start',
		properties : {
			left : 5,
			touchEnabled : false,
			top : 5,
			color : '#777',
			font : {
				fontSize : 22,
				fontFamily : 'Aller'
			},
		}
	}, {
		type : 'Ti.UI.View',
		properties : {
			width : Ti.UI.FILL,
			layout : 'vertical',
			left : 10,
			bottom : 10,
			top : 0,
			height : Ti.UI.SIZE,
			right : 25
		},
		childTemplates : [{
			type : 'Ti.UI.Label',
			bindId : 'description',
			properties : {
				top : 5,
				font : {
					fontSize : 16,
				},
				color : '#eee',
				left : 10,
				right : 15,
				width : Ti.UI.FILL,
			}
		}]
	}]
};
