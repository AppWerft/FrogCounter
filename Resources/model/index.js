if (!Ti.App.Properties.hasProperty('COUNTLIST')) {
	Ti.App.Properties.setList('COUNTLIST', []);
}

var $ = function() {
	return this;
};

$.prototype = {
	getId : function() {
		var latestentry = Ti.App.Properties.getList('COUNTLIST').shift();
		return latestentry ? latestentry.id : null;
	},
	incrementCounter : function(key) {
		var id = this.getId();
		var counter;
		if (id) {
			counter = Ti.App.Properties.getObject(id);
			counter[key] = counter[key] ? counter[key] + 1 : 1;
			Ti.App.Properties.setObject(id, counter);
		}
		return counter[key];
	},
	add : function() {
		var options = arguments[0] || {};
		var list = Ti.App.Properties.getList('COUNTLIST');
		var id = Ti.Platform.getId() + new Date().getTime();
		list.unshift({
			id : id,
			latlng : [],
			ctime : new Date().getTime(),
			state : 0,
			title : options.title
		});
		Ti.App.Properties.setList('COUNTLIST', list);
		Ti.App.Properties.setObject(id, {});
		Ti.Media.vibrate([1, 0]);

	},
	list : function() {
		var list = Ti.App.Properties.getList('COUNTLIST',[]);
		list.forEach(function(counter) {
			counter.result = Ti.App.Properties.getObject(counter.id);
			var total = 0;
			Object.getOwnPropertyNames(counter.result).forEach(function(species) {
				total += counter.result[species];
			});
			counter.summary = {
				total : total,
				species : Object.getOwnPropertyNames(counter.result).length
			};
		});
		return list;
	},
	stop : function() {

	}
};

module.exports = $;
