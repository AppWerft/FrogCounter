const FOLDER = 'MP3Cache';
if (Ti.Filesystem.isExternalStoragePresent())
	var DEPOT = Ti.Filesystem.externalStorageDirectory;
else
	var DEPOT = Ti.Filesystem.applicationDataDirectory;
var folder = Ti.Filesystem.getFile(DEPOT, FOLDER);
if (!folder.exists()) {
	folder.createDirectory();
}

/* Adapter object */
var Adapter = function(_urls) {
	console.log('Info: start URL cache');
	this.eventhandlers = {};
	var _this = this;
	this.urls = [];
	if (_urls && Array.isArray(_urls)) {
		_urls.forEach(function(url) {
			var file = Ti.Filesystem.getFile(DEPOT, FOLDER, Ti.Utils.md5HexDigest(url));
			_this.urls.push({
				url : url,
				file : file,
				cached : file.exists() ? true : false,
				size : file.size
			});
		});
	}
	console.log(this.urls.length);
	console.log(this.urls[0].file.nativePath);
	return this;
};
Adapter.prototype = {
	getURLs : function() {
		return this.urls;
	},
	getURL : function(_url) {
		var file = Ti.Filesystem.getFile(DEPOT, FOLDER, Ti.Utils.md5HexDigest(_url));
		return file.exists() ? file.nativePath : _url;
	},
	areCached : function() {
		var urls = this.urls.filter(function(url) {
			return Ti.Filesystem.getFile(DEPOT, FOLDER, Ti.Utils.md5HexDigest(url.url)).exists();
		});
		return urls.length == this.urls.length ? true : false;
	},
	toggleAllURLs : function() {
		if (this.areCached() == true) {
			console.log('was TRUE, we uncache all');
			this.uncacheAllURLs();
		} else {
			console.log('was FALSE, we cache all');
			this.cacheAllURLs();
		}
	},
	cacheAllURLs : function() {
		var _this = this;
		function loadIt(url, onloadFn) {
			var $ = Ti.Network.createHTTPClient({
				onload : function() {
					console.log(this.status);
					if (this.status == 200) {
						onloadFn(this.responseData);
					}
				}
			});
			//console.log('caching of ' + url.url);
			$.open('GET', url.url, true);
			$.send();
		}
		_this.fireEvent('onprogress', {
			progress : 0.1
		});
		var ndx = 0;
		function cacheURL(ndx) {
			loadIt(_this.urls[ndx], function(blob) {
				_this.urls[ndx].file.write(blob);
				_this.urls[ndx].cached = true;
				ndx++;
				if (ndx < _this.urls.length) {
					console.log('NEXT model');
					var progress = ndx / _this.urls.length;
					_this.fireEvent('onprogress', {
						progress : progress
					});
					cacheURL(ndx);
				} else {
					_this.fireEvent('onfinish', {
						cached : true
					});
				}

			});
		}
		cacheURL(ndx);
	},
	uncacheAllURLs : function() {
		console.log('Info try to remove all caches');
		this.urls.forEach(function(url) {
			if (url.file.exists()) {
				console.log('Info deleting file from cache ' + url.file.nativePath);
				url.file.deleteFile();
			}
			url.cached = false;
			console.log(url);
		});
		this.fireEvent('onfinish', {
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
