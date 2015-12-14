const FOLDER = 'MP3Cache';
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
var Adapter = function(urls) {
	var cachedurls = urls;
	this.eventhandlers = {};
	var _this = this;
	_this.mp3s = [];
	if (cachedurls && Array.isArray(cachedurls)) {
		cachedurls.forEach(function(url) {
			var file = Ti.Filesystem.getFile(DEPOT, FOLDER, Ti.Utils.md5HexDigest(url) + '.wt3');
			_this.mp3s.push({
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
		var models = _this.mp3s.filter(function(m, i) {
			return _this.mp3s[i].url == modelurl ? true : false;
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
	toggleAllURLs : function() {
		if (this.areCached() == true) {
			console.log('TRUE');
			this.uncacheAllURLs();
		} else {
			this.cacheAllURLs();
		}
	},
	cacheAllURLs : function() {
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
		function cacheURL(ndx) {
			loadIt(_this.mp3s[ndx], function(modelblob) {
				_this.mp3s[ndx].file.write(modelblob);
				_this.mp3s[ndx].cached = true;
				ndx++;
				if (ndx < _this.mp3s.length) {
					console.log('NEXT model');
					var progress = ndx / _this.mp3s.length;
					_this.fireEvent('onprogress', {
						progress : progress
					});
					cacheURL(ndx);
				} else {
					_this.fireEvent('oncompleted', {
						cached : true
					});
				}

			});
		}
		cacheURL(ndx);
	},
	uncacheAllURLs : function() {
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
