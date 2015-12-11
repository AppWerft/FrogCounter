var Module = function(t) {
	if (this.color = t.color || "gray", this.name = t.name || "time", this.size = t.size || 10, !exports[this.name])
		return console.log(this.name + " not found in collection of icons"), null;
	var e = Ti.Filesystem.getFile(Ti.Filesystem.isExternalStoragePresent() ? Ti.Filesystem.getExternalStorageDirectory() : Ti.Filesystem.getApplicationDataDirectory(), "icon-" + this.name + "-" + this.size + "-" + this.color + ".png"),
	    o = Ti.UI.createLabel({
		font : {
			fontFamily : "FontAwesome",
			fontSize : .8 * this.size,
			fontWeight : "normal"
		},
		color : this.color,
		backgroundColor : "transparent",
		height : this.size,
		width : this.size,
		text : exports[this.name],
		textAlign : Ti.UI.TEXT_ALIGNMENT_CENTER,
		verticalAlign : Ti.UI.TEXT_VERTICAL_ALIGNMENT_CENTER
	}),
	    r = o.toImage();
	return
	void 0 !== r.media && ( r = r.media), e.write(r, !1), e.nativePath;
};
exports.createIcon = function(t) {
	return new Module(t);
};

exports.getIcon = function(name) {
	console.log(name + ' ' + exports[name]);
	 return exports[name];
};

var icons = {};
[["glass", 61440], ["music", 61441], ["search", 61442], ["envelope", 61443], ["heart", 61444], ["star", 61445], ["star_empty", 61446], ["user", 61447], ["film", 61448], ["th_large", 61449], ["th", 61450], ["th_list", 61451], ["tick", 61452], ["ok", 61452], ["x_mark", 61453], ["remove", 61453], ["zoom_in", 61454], ["zoom_out", 61456], ["power_off", 61457], ["off", 61457], ["signal", 61458], ["cog", 61459], ["trash", 61460], ["home", 61461], ["file", 61462], ["time", 61463], ["road", 61464], ["download_alt", 61465], ["download", 61466], ["upload", 61467], ["inbox", 61468], ["play_circle", 61469], ["rotate_right", 61470], ["repeat", 61470], ["refresh", 61473], ["list_alt", 61474], ["lock", 61475], ["flag", 61476], ["headphones", 61477], ["volume_off", 61478], ["volume_down", 61479], ["volume_up", 61480], ["qrcode", 61481], ["barcode", 61482], ["tag", 61483], ["tags", 61484], ["book", 61485], ["bookmark", 61486], ["print", 61487], ["camera", 61488], ["font", 61489], ["bold", 61490], ["italic", 61491], ["text_height", 61492], ["text_width", 61493], ["align_left", 61494], ["align_center", 61495], ["align_right", 61496], ["align_justify", 61497], ["list", 61498], ["indent_left", 61499], ["indent_right", 61500], ["facetime_video", 61501], ["picture", 61502], ["pencil", 61504], ["map_marker", 61505], ["adjust", 61506], ["tint", 61507], ["edit", 61508], ["share", 61509], ["check", 61510], ["move", 61511], ["step_backward", 61512], ["fast_backward", 61513], ["backward", 61514], ["play", 61515], ["pause", 61516], ["stop", 61517], ["forward", 61518], ["fast_forward", 61520], ["step_forward", 61521], ["eject", 61522], ["chevron_left", 61523], ["chevron_right", 61524], ["plus_sign", 61525], ["minus_sign", 61526], ["remove_sign", 61527], ["ok_sign", 61528], ["question_sign", 61529], ["info_sign", 61530], ["screenshot", 61531], ["remove_circle", 61532], ["ok_circle", 61533], ["ban_circle", 61534], ["arrow_left", 61536], ["arrow_right", 61537], ["arrow_up", 61538], ["arrow_down", 61539], ["mail_forward", 61540], ["share_alt", 61540], ["resize_full", 61541], ["resize_small", 61542], ["plus", 61543], ["minus", 61544], ["asterisk", 61545], ["exclamation_sign", 61546], ["gift", 61547], ["leaf", 61548], ["fire", 61549], ["eye_open", 61550], ["eye_close", 61552], ["warning_sign", 61553], ["plane", 61554], ["calendar", 61555], ["random", 61556], ["comment", 61557], ["magnet", 61558], ["chevron_up", 61559], ["chevron_down", 61560], ["retweet", 61561], ["shopping_cart", 61562], ["folder_close", 61563], ["folder_open", 61564], ["resize_vertical", 61565], ["resize_horizontal", 61566], ["bar_chart", 61568], ["twitter_sign", 61569], ["facebook_sign", 61570], ["camera_retro", 61571], ["key", 61572], ["cogs", 61573], ["comments", 61574], ["thumbs_up", 61575], ["thumbs_down", 61576], ["star_half", 61577], ["heart_empty", 61578], ["signout", 61579], ["linkedin_sign", 61580], ["pushpin", 61581], ["external_link", 61582], ["signin", 61584], ["trophy", 61585], ["github_sign", 61586], ["upload_alt", 61587], ["lemon", 61588], ["phone", 61589], ["unchecked", 61590], ["check_empty", 61590], ["bookmark_empty", 61591], ["phone_sign", 61592], ["twitter", 61593], ["facebook", 61594], ["github", 61595], ["unlock", 61596], ["credit_card", 61597], ["rss", 61598], ["hdd", 61600], ["bullhorn", 61601], ["bell", 61602], ["certificate", 61603], ["hand_right", 61604], ["hand_left", 61605], ["hand_up", 61606], ["hand_down", 61607], ["circle_arrow_left", 61608], ["circle_arrow_right", 61609], ["circle_arrow_up", 61610], ["circle_arrow_down", 61611], ["globe", 61612], ["wrench", 61613], ["tasks", 61614], ["filter", 61616], ["briefcase", 61617], ["fullscreen", 61618], ["group", 61632], ["link", 61633], ["cloud", 61634], ["beaker", 61635], ["cut", 61636], ["copy", 61637], ["paper_clip", 61638], ["save", 61639], ["sign_blank", 61640], ["reorder", 61641], ["list_ul", 61642], ["list_ol", 61643], ["strikethrough", 61644], ["underline", 61645], ["table", 61646], ["magic", 61648], ["truck", 61649], ["pinterest", 61650], ["pinterest_sign", 61651], ["google_plus_sign", 61652], ["google_plus", 61653], ["money", 61654], ["caret_down", 61655], ["caret_up", 61656], ["caret_left", 61657], ["caret_right", 61658], ["columns", 61659], ["sort", 61660], ["sort_down", 61661], ["sort_up", 61662], ["envelope_alt", 61664], ["linkedin", 61665], ["rotate_left", 61666], ["undo", 61666], ["legal", 61667], ["dashboard", 61668], ["comment_alt", 61669], ["comments_alt", 61670], ["bolt", 61671], ["sitemap", 61672], ["umbrella", 61673], ["paste", 61674], ["lightbulb", 61675], ["exchange", 61676], ["cloud_download", 61677], ["cloud_upload", 61678], ["user_md", 61680], ["stethoscope", 61681], ["suitcase", 61682], ["bell_alt", 61683], ["coffee", 61684], ["food", 61685], ["file_text", 61686], ["building", 61687], ["hospital", 61688], ["ambulance", 61689], ["medkit", 61690], ["fighter_jet", 61691], ["beer", 61692], ["h_sign", 61693], ["plus_sign_alt", 61694], ["double_angle_left", 61696], ["double_angle_right", 61697], ["double_angle_up", 61698], ["double_angle_down", 61699], ["angle_left", 61700], ["angle_right", 61701], ["angle_up", 61702], ["angle_down", 61703], ["desktop", 61704], ["laptop", 61705], ["tablet", 61706], ["mobile_phone", 61707], ["circle_blank", 61708], ["quote_left", 61709], ["quote_right", 61710], ["spinner", 61712], ["circle", 61713], ["mail_reply", 61714], ["reply", 61714], ["github_alt", 61715], ["folder_close_alt", 61716], ["folder_open_alt", 61717], ["expand_alt", 61718], ["collapse_alt", 61719], ["smile", 61720], ["frown", 61721], ["meh", 61722], ["gamepad", 61723], ["keyboard", 61724], ["flag_alt", 61725], ["flag_checkered", 61726], ["terminal", 61728], ["code", 61729], ["mail_reply_all", 61730], ["reply_all", 61730], ["star_half_full", 61731], ["star_half_empty", 61731], ["location_arrow", 61732], ["crop", 61733], ["code_fork", 61734], ["unlink", 61735], ["question", 61736], ["info", 61737], ["exclamation", 61738], ["superscript", 61739], ["subscript", 61740], ["eraser", 61741], ["puzzle_piece", 61742], ["microphone", 61744], ["microphone_off", 61745], ["shield", 61746], ["calendar_empty", 61747], ["fire_extinguisher", 61748], ["rocket", 61749], ["maxcdn", 61750], ["chevron_sign_left", 61751], ["chevron_sign_right", 61752], ["chevron_sign_up", 61753], ["chevron_sign_down", 61754], ["html5", 61755], ["css3", 61756], ["anchor", 61757], ["unlock_alt", 61758], ["bullseye", 61760], ["ellipsis_horizontal", 61761], ["ellipsis_vertical", 61762], ["rss_sign", 61763], ["play_sign", 61764], ["ticket", 61765], ["minus_sign_alt", 61766], ["check_minus", 61767], ["level_up", 61768], ["level_down", 61769], ["check_sign", 61770], ["edit_sign", 61771], ["external_link_sign", 61772], ["share_sign", 61773], ["compass", 61774], ["collapse", 61776], ["collapse_top", 61777], ["expand", 61778], ["eur", 61779], ["gbp", 61780], ["usd", 61781], ["inr", 61782], ["jpy", 61783], ["cny", 61784], ["krw", 61785], ["btc", 61786], ["file_alt", 61787], ["file_text_alt", 61788], ["sort_by_alphabet", 61789], ["sort_by_alphabet_alt", 61790], ["sort_by_attributes", 61792], ["sort_by_attributes_alt", 61793], ["sort_by_order", 61794], ["sort_by_order_alt", 61795], ["thumbs_up_alt", 61796], ["thumbs_down_alt", 61797], ["youtube_sign", 61798], ["youtube", 61799], ["xing", 61800], ["xing_sign", 61801], ["youtube_play", 61802], ["dropbox", 61803], ["stackexchange", 61804], ["instagram", 61805], ["flickr_sign", 61806], ["adn", 61808], ["bitbucket", 61809], ["bitbucket_sign", 61810], ["tumblr", 61811], ["tumblr_sign", 61812], ["long_arrow_down", 61813], ["long_arrow_up", 61814], ["long_arrow_left", 61815], ["long_arrow_right", 61816], ["apple", 61817], ["windows_8", 61818], ["android", 61819], ["linux", 61820], ["dribble", 61821], ["skype", 61822], ["foursquare", 61824], ["trello", 61825], ["female", 61826], ["male", 61827], ["gittip", 61828], ["sun", 61829], ["moon", 61830], ["archive", 61831], ["bug", 61832], ["vk", 61833], ["weibo", 61834], ["renren", 61835], ["search_alt", 62210], ["trash_alt", 62228], ["download_alt2", 62233], ["print_alt", 62255], ["indent_right_alt", 62267], ["indent_left_alt", 62268], ["pencil_alt", 62272], ["edit_alt", 62276], ["fire_alt", 62317], ["pushpin_alt", 62349], ["upload_alt2", 62355], ["lemon_alt", 62356], ["github_alt2", 62363], ["group_alt", 62400], ["link_alt", 62401], ["cloud_alt", 62402], ["save_alt", 62407], ["windows", 62464], ["camcorder", 62465], ["tv", 62466], ["radio", 62467], ["bar_chart_alt", 62468], ["pie_chart", 62469], ["line_chart", 62470], ["line_chart_alt", 62471], ["car", 62472], ["truck_long", 62473], ["bicycle", 62474], ["motorbike", 62475], ["laptop_mobile_phone", 62476], ["sunny", 62477], ["cloudy", 62478], ["rainy", 62479], ["partly_sunny", 62480], ["partly_cloudy", 62480], ["thundery", 62481], ["snowy", 62482], ["snow", 62483], ["bullseye_alt", 62484], ["podcast", 62485], ["globe_alt", 62486], ["wifi", 62496], ["alarm_clock", 62497], ["comment_square", 62498], ["comments_square", 62499], ["tag_alt", 62500], ["book_alt", 62501], ["calculator", 62512], ["stopwatch", 62513], ["lightbulb_alt", 62514], ["brick_wall", 62515], ["guage", 62516], ["file_cabinet", 62517], ["clapper", 62518], ["weight", 62519], ["computer_network", 62520], ["thunder", 62521], ["bucket", 62544], ["thermometer", 62545], ["flashlight", 62546], ["voice_mail", 62547], ["database", 62548], ["guage_alt", 62549], ["megaphone", 62550], ["droplet", 62551], ["water", 62552], ["air", 62553], ["graduation_cap", 62554], ["palette", 62555], ["paper_plane", 62556], ["brush", 62557], ["magnet_alt", 62558], ["lifebuoy", 62559], ["signpost", 62560], ["vcard", 62561], ["infinity", 62562], ["hourglass", 62563], ["dot", 62564], ["two_dots", 62565], ["three_dots", 62566], ["cup", 62567], ["tools", 62568], ["light_down", 62569], ["light_up", 62570], ["light_adjust", 62571], ["flow_cascade", 62572], ["flow_branch", 62573], ["flow_tree", 62574], ["flow_line", 62575], ["flow_parallel", 62576], ["share_alt2", 62577], ["shareable", 62578], ["direction", 62579], ["js_fiddle", 62722], ["vimeo_sign", 62726], ["vimeo", 62727], ["lastfm_sign", 62728], ["lastfm", 62729], ["reddit", 62731], ["delicious_sign", 62732], ["wordpress_sign", 62733], ["wordpress", 62734], ["git_fork", 62735], ["blogger_sign", 62736], ["blogger", 62737], ["flickr", 62741], ["picasa_sign", 62742], ["picasa", 62743], ["amazon_sign", 62744], ["amazon", 62745], ["yelp_sign", 62746], ["yelp", 62747], ["soundcloud", 62748], ["spotify", 62749], ["yahoo_sign", 62752], ["yahoo", 62753], ["evernote_sign", 62754], ["evernote", 62755], ["google_sign", 62756], ["google", 62757], ["hacker_news", 62758], ["map", 62761], ["bus_sign", 62762], ["bike_sign", 62763], ["car_sign", 62764], ["taxi_sign", 62765], ["truck_sign", 62766], ["handicap_sign", 62767]].forEach(function(t) {
	icons[t[0]] = String.fromCharCode(t[1]);
}), [["glass", 61440], ["music", 61441], ["search", 61442], ["envelope", 61443], ["heart", 61444], ["star", 61445], ["star_empty", 61446], ["user", 61447], ["film", 61448], ["th_large", 61449], ["th", 61450], ["th_list", 61451], ["tick", 61452], ["ok", 61452], ["x_mark", 61453], ["remove", 61453], ["zoom_in", 61454], ["zoom_out", 61456], ["power_off", 61457], ["off", 61457], ["signal", 61458], ["cog", 61459], ["trash", 61460], ["home", 61461], ["file", 61462], ["time", 61463], ["road", 61464], ["download_alt", 61465], ["download", 61466], ["upload", 61467], ["inbox", 61468], ["play_circle", 61469], ["rotate_right", 61470], ["repeat", 61470], ["refresh", 61473], ["list_alt", 61474], ["lock", 61475], ["flag", 61476], ["headphones", 61477], ["volume_off", 61478], ["volume_down", 61479], ["volume_up", 61480], ["qrcode", 61481], ["barcode", 61482], ["tag", 61483], ["tags", 61484], ["book", 61485], ["bookmark", 61486], ["print", 61487], ["camera", 61488], ["font", 61489], ["bold", 61490], ["italic", 61491], ["text_height", 61492], ["text_width", 61493], ["align_left", 61494], ["align_center", 61495], ["align_right", 61496], ["align_justify", 61497], ["list", 61498], ["indent_left", 61499], ["indent_right", 61500], ["facetime_video", 61501], ["picture", 61502], ["pencil", 61504], ["map_marker", 61505], ["adjust", 61506], ["tint", 61507], ["edit", 61508], ["share", 61509], ["check", 61510], ["move", 61511], ["step_backward", 61512], ["fast_backward", 61513], ["backward", 61514], ["play", 61515], ["pause", 61516], ["stop", 61517], ["forward", 61518], ["fast_forward", 61520], ["step_forward", 61521], ["eject", 61522], ["chevron_left", 61523], ["chevron_right", 61524], ["plus_sign", 61525], ["minus_sign", 61526], ["remove_sign", 61527], ["ok_sign", 61528], ["question_sign", 61529], ["info_sign", 61530], ["screenshot", 61531], ["remove_circle", 61532], ["ok_circle", 61533], ["ban_circle", 61534], ["arrow_left", 61536], ["arrow_right", 61537], ["arrow_up", 61538], ["arrow_down", 61539], ["mail_forward", 61540], ["share_alt", 61540], ["resize_full", 61541], ["resize_small", 61542], ["plus", 61543], ["minus", 61544], ["asterisk", 61545], ["exclamation_sign", 61546], ["gift", 61547], ["leaf", 61548], ["fire", 61549], ["eye_open", 61550], ["eye_close", 61552], ["warning_sign", 61553], ["plane", 61554], ["calendar", 61555], ["random", 61556], ["comment", 61557], ["magnet", 61558], ["chevron_up", 61559], ["chevron_down", 61560], ["retweet", 61561], ["shopping_cart", 61562], ["folder_close", 61563], ["folder_open", 61564], ["resize_vertical", 61565], ["resize_horizontal", 61566], ["bar_chart", 61568], ["twitter_sign", 61569], ["facebook_sign", 61570], ["camera_retro", 61571], ["key", 61572], ["cogs", 61573], ["comments", 61574], ["thumbs_up", 61575], ["thumbs_down", 61576], ["star_half", 61577], ["heart_empty", 61578], ["signout", 61579], ["linkedin_sign", 61580], ["pushpin", 61581], ["external_link", 61582], ["signin", 61584], ["trophy", 61585], ["github_sign", 61586], ["upload_alt", 61587], ["lemon", 61588], ["phone", 61589], ["unchecked", 61590], ["check_empty", 61590], ["bookmark_empty", 61591], ["phone_sign", 61592], ["twitter", 61593], ["facebook", 61594], ["github", 61595], ["unlock", 61596], ["credit_card", 61597], ["rss", 61598], ["hdd", 61600], ["bullhorn", 61601], ["bell", 61602], ["certificate", 61603], ["hand_right", 61604], ["hand_left", 61605], ["hand_up", 61606], ["hand_down", 61607], ["circle_arrow_left", 61608], ["circle_arrow_right", 61609], ["circle_arrow_up", 61610], ["circle_arrow_down", 61611], ["globe", 61612], ["wrench", 61613], ["tasks", 61614], ["filter", 61616], ["briefcase", 61617], ["fullscreen", 61618], ["group", 61632], ["link", 61633], ["cloud", 61634], ["beaker", 61635], ["cut", 61636], ["copy", 61637], ["paper_clip", 61638], ["save", 61639], ["sign_blank", 61640], ["reorder", 61641], ["list_ul", 61642], ["list_ol", 61643], ["strikethrough", 61644], ["underline", 61645], ["table", 61646], ["magic", 61648], ["truck", 61649], ["pinterest", 61650], ["pinterest_sign", 61651], ["google_plus_sign", 61652], ["google_plus", 61653], ["money", 61654], ["caret_down", 61655], ["caret_up", 61656], ["caret_left", 61657], ["caret_right", 61658], ["columns", 61659], ["sort", 61660], ["sort_down", 61661], ["sort_up", 61662], ["envelope_alt", 61664], ["linkedin", 61665], ["rotate_left", 61666], ["undo", 61666], ["legal", 61667], ["dashboard", 61668], ["comment_alt", 61669], ["comments_alt", 61670], ["bolt", 61671], ["sitemap", 61672], ["umbrella", 61673], ["paste", 61674], ["lightbulb", 61675], ["exchange", 61676], ["cloud_download", 61677], ["cloud_upload", 61678], ["user_md", 61680], ["stethoscope", 61681], ["suitcase", 61682], ["bell_alt", 61683], ["coffee", 61684], ["food", 61685], ["file_text", 61686], ["building", 61687], ["hospital", 61688], ["ambulance", 61689], ["medkit", 61690], ["fighter_jet", 61691], ["beer", 61692], ["h_sign", 61693], ["plus_sign_alt", 61694], ["double_angle_left", 61696], ["double_angle_right", 61697], ["double_angle_up", 61698], ["double_angle_down", 61699], ["angle_left", 61700], ["angle_right", 61701], ["angle_up", 61702], ["angle_down", 61703], ["desktop", 61704], ["laptop", 61705], ["tablet", 61706], ["mobile_phone", 61707], ["circle_blank", 61708], ["quote_left", 61709], ["quote_right", 61710], ["spinner", 61712], ["circle", 61713], ["mail_reply", 61714], ["reply", 61714], ["github_alt", 61715], ["folder_close_alt", 61716], ["folder_open_alt", 61717], ["expand_alt", 61718], ["collapse_alt", 61719], ["smile", 61720], ["frown", 61721], ["meh", 61722], ["gamepad", 61723], ["keyboard", 61724], ["flag_alt", 61725], ["flag_checkered", 61726], ["terminal", 61728], ["code", 61729], ["mail_reply_all", 61730], ["reply_all", 61730], ["star_half_full", 61731], ["star_half_empty", 61731], ["location_arrow", 61732], ["crop", 61733], ["code_fork", 61734], ["unlink", 61735], ["question", 61736], ["info", 61737], ["exclamation", 61738], ["superscript", 61739], ["subscript", 61740], ["eraser", 61741], ["puzzle_piece", 61742], ["microphone", 61744], ["microphone_off", 61745], ["shield", 61746], ["calendar_empty", 61747], ["fire_extinguisher", 61748], ["rocket", 61749], ["maxcdn", 61750], ["chevron_sign_left", 61751], ["chevron_sign_right", 61752], ["chevron_sign_up", 61753], ["chevron_sign_down", 61754], ["html5", 61755], ["css3", 61756], ["anchor", 61757], ["unlock_alt", 61758], ["bullseye", 61760], ["ellipsis_horizontal", 61761], ["ellipsis_vertical", 61762], ["rss_sign", 61763], ["play_sign", 61764], ["ticket", 61765], ["minus_sign_alt", 61766], ["check_minus", 61767], ["level_up", 61768], ["level_down", 61769], ["check_sign", 61770], ["edit_sign", 61771], ["external_link_sign", 61772], ["share_sign", 61773], ["compass", 61774], ["collapse", 61776], ["collapse_top", 61777], ["expand", 61778], ["eur", 61779], ["gbp", 61780], ["usd", 61781], ["inr", 61782], ["jpy", 61783], ["cny", 61784], ["krw", 61785], ["btc", 61786], ["file_alt", 61787], ["file_text_alt", 61788], ["sort_by_alphabet", 61789], ["sort_by_alphabet_alt", 61790], ["sort_by_attributes", 61792], ["sort_by_attributes_alt", 61793], ["sort_by_order", 61794], ["sort_by_order_alt", 61795], ["thumbs_up_alt", 61796], ["thumbs_down_alt", 61797], ["youtube_sign", 61798], ["youtube", 61799], ["xing", 61800], ["xing_sign", 61801], ["youtube_play", 61802], ["dropbox", 61803], ["stackexchange", 61804], ["instagram", 61805], ["flickr_sign", 61806], ["adn", 61808], ["bitbucket", 61809], ["bitbucket_sign", 61810], ["tumblr", 61811], ["tumblr_sign", 61812], ["long_arrow_down", 61813], ["long_arrow_up", 61814], ["long_arrow_left", 61815], ["long_arrow_right", 61816], ["apple", 61817], ["windows_8", 61818], ["android", 61819], ["linux", 61820], ["dribble", 61821], ["skype", 61822], ["foursquare", 61824], ["trello", 61825], ["female", 61826], ["male", 61827], ["gittip", 61828], ["sun", 61829], ["moon", 61830], ["archive", 61831], ["bug", 61832], ["vk", 61833], ["weibo", 61834], ["renren", 61835], ["search_alt", 62210], ["trash_alt", 62228], ["download_alt2", 62233], ["print_alt", 62255], ["indent_right_alt", 62267], ["indent_left_alt", 62268], ["pencil_alt", 62272], ["edit_alt", 62276], ["fire_alt", 62317], ["pushpin_alt", 62349], ["upload_alt2", 62355], ["lemon_alt", 62356], ["github_alt2", 62363], ["group_alt", 62400], ["link_alt", 62401], ["cloud_alt", 62402], ["save_alt", 62407], ["windows", 62464], ["camcorder", 62465], ["tv", 62466], ["radio", 62467], ["bar_chart_alt", 62468], ["pie_chart", 62469], ["line_chart", 62470], ["line_chart_alt", 62471], ["car", 62472], ["truck_long", 62473], ["bicycle", 62474], ["motorbike", 62475], ["laptop_mobile_phone", 62476], ["sunny", 62477], ["cloudy", 62478], ["rainy", 62479], ["partly_sunny", 62480], ["partly_cloudy", 62480], ["thundery", 62481], ["snowy", 62482], ["snow", 62483], ["bullseye_alt", 62484], ["podcast", 62485], ["globe_alt", 62486], ["wifi", 62496], ["alarm_clock", 62497], ["comment_square", 62498], ["comments_square", 62499], ["tag_alt", 62500], ["book_alt", 62501], ["calculator", 62512], ["stopwatch", 62513], ["lightbulb_alt", 62514], ["brick_wall", 62515], ["guage", 62516], ["file_cabinet", 62517], ["clapper", 62518], ["weight", 62519], ["computer_network", 62520], ["thunder", 62521], ["bucket", 62544], ["thermometer", 62545], ["flashlight", 62546], ["voice_mail", 62547], ["database", 62548], ["guage_alt", 62549], ["megaphone", 62550], ["droplet", 62551], ["water", 62552], ["air", 62553], ["graduation_cap", 62554], ["palette", 62555], ["paper_plane", 62556], ["brush", 62557], ["magnet_alt", 62558], ["lifebuoy", 62559], ["signpost", 62560], ["vcard", 62561], ["infinity", 62562], ["hourglass", 62563], ["dot", 62564], ["two_dots", 62565], ["three_dots", 62566], ["cup", 62567], ["tools", 62568], ["light_down", 62569], ["light_up", 62570], ["light_adjust", 62571], ["flow_cascade", 62572], ["flow_branch", 62573], ["flow_tree", 62574], ["flow_line", 62575], ["flow_parallel", 62576], ["share_alt2", 62577], ["shareable", 62578], ["direction", 62579], ["js_fiddle", 62722], ["vimeo_sign", 62726], ["vimeo", 62727], ["lastfm_sign", 62728], ["lastfm", 62729], ["reddit", 62731], ["delicious_sign", 62732], ["wordpress_sign", 62733], ["wordpress", 62734], ["git_fork", 62735], ["blogger_sign", 62736], ["blogger", 62737], ["flickr", 62741], ["picasa_sign", 62742], ["picasa", 62743], ["amazon_sign", 62744], ["amazon", 62745], ["yelp_sign", 62746], ["yelp", 62747], ["soundcloud", 62748], ["spotify", 62749], ["yahoo_sign", 62752], ["yahoo", 62753], ["evernote_sign", 62754], ["evernote", 62755], ["google_sign", 62756], ["google", 62757], ["hacker_news", 62758], ["map", 62761], ["bus_sign", 62762], ["bike_sign", 62763], ["car_sign", 62764], ["taxi_sign", 62765], ["truck_sign", 62766], ["handicap_sign", 62767]].forEach(function(t) {
	exports[t[0]] = String.fromCharCode(t[1]);
}); 