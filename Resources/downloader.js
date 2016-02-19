var service = Titanium.Android.currentService;
var intent = service.intent;
var Cache = JSON.parse(intent.getStringExtra("Cache"));
function loadIt(item, onloadFn) {
	var $ = Ti.Network.createHTTPClient({
		onload : function() {
			if (this.status == 200) {
				onloadFn(this.responseData);
			}
		}
	});
	$.open('GET', item.url, true);
	$.send();
}
var ndx = 0;
function CacheURL(ndx) {
	loadIt(Cache[ndx], function(blob) {
		Cache[ndx].file.write(blob);
		Cache[ndx].Cached = true;
		ndx++;
		if (ndx < Cache.length) {
			CacheURL(ndx);
		} else {
			service.close();
		}
	});
}
CacheURL(ndx);

