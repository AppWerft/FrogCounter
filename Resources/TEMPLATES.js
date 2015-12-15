exports.frogsounds = {
	properties : {
		height : Ti.UI.SIZE,
	},
	childTemplates : [{
		type : 'Ti.UI.ImageView',
		bindId : 'spectrogram',
		properties : {
			left : 0,
			touchEnabled : false,
			top : 0,
			width : 100,
			height : 80
		}
	}, {
		type : 'Ti.UI.View',
		properties : {
			left : 110,
			top : 10,
			layout : 'vertical',
			width : Ti.UI.FILL,
			height : Ti.UI.SIZE
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
					fontFamily : 'Helvetica-Bold'

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
					fontFamily : 'Helvetica-Bold'

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
				color : '#888',
				font : {
					fontSize : 16,
					fontFamily : 'Helvetica-Bold'

				},
			}
		},{
			type : 'Ti.UI.Label',
			bindId : 'latlng',
			left : 0,
			properties : {
				left : 0,
				touchEnabled : false,
				top : 5,
				color : '#777',
				font : {
					fontSize : 16,
					fontFamily : 'DroidSans'

				},
			}
		}, {
			type : 'Ti.UI.Label',
			bindId : 'description',
			properties : {
				top : 5,
				font : {
					fontSize : 16,
					fontFamily : 'Helvetica-Bold'
				},
				color : '#eee',
				left : 0,
				right : 15,
				bottom : 10,
				width : Ti.UI.FILL,
			}
		}]
	}]
};
exports.animalsounds = {
	properties : {
		height : Ti.UI.SIZE,
	},
	childTemplates : [{
		type : 'Ti.UI.ImageView',
		bindId : 'spectrogram',
		properties : {
			left : 0,
			touchEnabled : false,
			top : 0,
			width : 100,
			height : 80
		}
	}, {
		type : 'Ti.UI.View',
		properties : {
			left : 110,
			top : 10,
			layout : 'vertical',
			width : Ti.UI.FILL,
			height : Ti.UI.SIZE
		},
		childTemplates : [ {
			type : 'Ti.UI.Label',
			bindId : 'title',
			properties : {
				font : {
					fontSize : 20,
					fontFamily : 'Helvetica-Bold'
				},
				color : '#eee',
				left : 0,
				right : 15,
				width : Ti.UI.FILL,
			}
		}]
	}]
};
