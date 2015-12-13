const FOLDER = '3DModelsCache';
if (Ti.Filesystem.isExternalStoragePresent())
	var DEPOT = Ti.Filesystem.externalStorageDirectory;
else
	var DEPOT = Ti.Filesystem.applicationDataDirectory;
var folder = Ti.Filesystem.getFile(DEPOT, FOLDER);
if (!folder.exists()) {
	folder.createDirectory();
}
var Model = new (require('adapter/model'))();

/* Adapter object */
var Adapter = function() {
	var mainmenu = Model.getMainmenu();
	var modelurls = [];
	mainmenu.forEach(function(menuitem) {
		if (menuitem.app == 'ar') {
			modelurls = menuitem.subcategories.map(function(s) {
				return s.data.wt3;
			});
		}
	});
	this.eventhandlers = {};
	var _this = this;
	_this.models = [];
	if (modelurls && Array.isArray(modelurls)) {
		modelurls.forEach(function(url) {
			var file = Ti.Filesystem.getFile(DEPOT, FOLDER, Ti.Utils.md5HexDigest(url) + '.wt3');
			_this.models.push({
				url : url,
				file : file,
				cached : file.exists() ? true : false,
			});
		});
	}
	return this;
};
Adapter.prototype = {
	getModels : function() {
		return this.models;
	},
	getWT3 : function(modelurl) {
		var _this = this;
		var models = _this.models.filter(function(m, i) {
			return _this.models[i].url == modelurl ? true : false;
		});
		if (!models)
			return modelurl;
		return models[0].cached ? models[0].file.nativePath : models[0].url;
	},
	areCached : function() {
		var cachedmodels = this.models.filter(function(model) {
			return Ti.Filesystem.getFile(DEPOT, FOLDER, Ti.Utils.md5HexDigest(model.url) + '.wt3').exists();
		});
		return cachedmodels.length == this.models.length ? true : false;
	},
	toggleAllModelsCache : function() {
		if (this.areCached() == true) {
			console.log('TRUE');
			this.uncacheAllModels();
		} else {
			console.log('FALSE');
			this.cacheAllModels();
		}
	},
	cacheAllModels : function() {
		var _this = this;
		function loadIt(model, onloadFn) {
			var $ = Ti.Network.createHTTPClient({
				onload : function() {
					console.log(this.status);
					if (this.status == 200) {
						onloadFn(this.responseData);
					}
				}
			});
			console.log('caching of ' + model.url);
			$.open('GET', model.url, true);
			$.send();
		}
		_this.fireEvent('onprogress', {
			progress : 0.1
		});
		var ndx = 0;
		function cacheModel(ndx) {
			loadIt(_this.models[ndx], function(modelblob) {
				_this.models[ndx].file.write(modelblob);
				_this.models[ndx].cached = true;
				ndx++;
				if (ndx < _this.models.length) {
					console.log('NEXT model');
					var progress = ndx / _this.models.length;
					_this.fireEvent('onprogress', {
						progress : progress
					});
					cacheModel(ndx);
				} else {
					_this.fireEvent('oncompleted', {
						cached : true
					});
				}

			});
		}
		cacheModel(ndx);
	},
	uncacheAllModels : function() {
		console.log('Info try to remove all caches');
		this.models.forEach(function(model) {
			if (model.file.exists()) {
				model.file.deleteFile();
			}
			model.cached = false;
		});
		this.fireEvent('oncompleted', {
			cached : false
		});
	},
	fireEvent : function(_event, _payload) {
		if (this.eventhandlers[_event]) {
			for (var i = 0; i < this.eventhandlers[_event].length; i++) {
				this.eventhandlers[_event][i].call(this, _payload);
			}
		}
	},
	addEventListener : function(_event, _callback) {
		if (!this.eventhandlers)
			this.eventhandlers = {};
		if (!this.eventhandlers[_event])
			this.eventhandlers[_event] = [];
		this.eventhandlers[_event].push(_callback);
	},
	removeEventListener : function(_event, _callback) {
		if (!this.eventhandlers[_event])
			return;
		var newArray = this.eventhandlers[_event].filter(function(element) {
			return element != _callback;
		});
		this.eventhandlers[_event] = newArray;
	}
};

module.exports = Adapter;
