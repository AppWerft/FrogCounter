exports.frogsounds = {
	properties : {
		height : Ti.UI.SIZE,
		itemId : '',
		left : 20,
		layout : 'vertical'
	},
	childTemplates : [{
		type : 'Ti.UI.Label',
		bindId : 'ctime',

		properties : {
			left : 0,
			touchEnabled : false,
			top : 5,
			color : '#777',
			font : {
				fontSize : 16,

			},
		}
	}, {
		type : 'Ti.UI.Label',
		bindId : 'author',
		properties : {
			left : 0,
			touchEnabled : false,
			top : 5,
			color : '#777',
			font : {
				fontSize : 16,

			},
		}
	}, {
		type : 'Ti.UI.Label',
		bindId : 'locality',
		left : 0,
		properties : {
			left : 0,
			touchEnabled : false,
			top : 5,
			color : '#777',
			font : {
				fontSize : 16,

			},
		}
	}, {
		type : 'Ti.UI.Label',
		bindId : 'description',
		properties : {
			top : 5,
			font : {
				fontSize : 16,
			},
			color : '#eee',
			left : 0,
			right : 15,
			bottom : 10,
			width : Ti.UI.FILL,
		}
	}]
};
