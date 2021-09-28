tyrano.plugin.kag.tag.ruby.start = function(pm) {
    var custom_ruby = TYRANO.kag.tmp.custom_ruby;

	var ruby_scale;
	var ruby_x;
	var ruby_y;

	if (pm.scale === undefined) {
		ruby_scale = custom_ruby.scale;
	} else {
		ruby_scale = pm.scale;
	}

	if (pm.x === undefined) {
		ruby_x = custom_ruby.x;
	} else {
		ruby_x = pm.x;
	}

	if (pm.y === undefined) {
		ruby_y = custom_ruby.y;
	} else {
		ruby_y = pm.y;
	}

	var text = String(pm.text);
	if ( text.length >= 1 ) {
	
		var start = (text.length / 2 * -1) - 1;
		var end = text.length / 2 * -1;
		var defaultPitch = TYRANO.kag.config.defaultPitch;
		var isVertical = String(this.kag.stat.vertical);

		//字間設定されていた場合
		if ( parseFloat(defaultPitch) != 0 ){
			var spacing = (text.length - 1) * defaultPitch / 2;
			text = text.slice( 0, -1 ) + "<span style='letter-spacing: 0px; display: inline;'>" + text.slice( -1 ) + "</span>"
			start = "calc(" + start + "em - " + spacing + "px)";
			end = "calc(" + end + "em - " + spacing + "px)";
		} else {
			start = start + "em";
			end = end + "em";
		}
		
		var str = "";

		if ( isVertical != "true" ) {
			//字間設定があった場合は補正する
			ruby_x = parseFloat(parseFloat(ruby_x) - parseFloat(defaultPitch));
			
			//safariだけ横書き時上方向にズレるから補正する getBrowser関数がないことを一応考慮
			try{
				if ($.getBrowser() == "safari") {
					ruby_y = parseFloat(ruby_y) + 4;
				}
			} catch(e){}
			str = "</rt></ruby><span style='position: relative; display: inline;'><span class='custom_ruby' style='position: absolute; transform: translate(" + ruby_x + "px," + ruby_y + "px) scale(" + ruby_scale + "); left:" + start + "; right:" + end + ";'>" +  text + "</span></span>";
		} else {
			//縦書き時
			ruby_y = parseFloat(parseFloat(ruby_y) - parseFloat(defaultPitch));
			str = "</rt></ruby><span style='position: relative ; writing-mode: initial; -webkit-writing-mode: initial; width: 1em; display: inline;'><span class='custom_ruby_rl' style='position: absolute; transform: translate(" + ruby_x + "px," + ruby_y + "px) scale(" + ruby_scale + "); top:" + start + "; bottom:" + end + ";'>" +  text + "</span></span>";
		}

	    //ここに文字が入っている場合、ルビを設定してから、テキスト表示する
	    this.kag.stat.ruby_str = str;
	}

    this.kag.ftag.nextOrder();

}

TYRANO.kag.tmp.custom_ruby = {

	scale      : TYRANO.kag.stat.mp.scale      || "0.5",
	x          : TYRANO.kag.stat.mp.x          || "0",
	y          : TYRANO.kag.stat.mp.y          || "-2.5"

}
