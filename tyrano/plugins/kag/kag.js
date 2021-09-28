tyrano.plugin.kag = {
  version: 450,
  tyrano: null,
  kag: null,
  sound_swf: null,
  is_rider: false,
  cache_html: {},
  cache_scenario: {},
  save_key_id:"",
  save_key_val:"",
  config: {
    defaultStorageExtension: "jpg",
    projectID: "tyranoproject",
    game_version: "0.0",
    preload: "on",
    skipSpeed: "30",
    patch_apply_auto: "true",
    mediaFormatDefault: "ogg",
    configSave: "webstorage"
  },
  define: {
    TYRANO_ENGINE_VERSION: 400,
    "BASE_DIV_NAME": "tyrano_base",
    FLAG_APRI: false,
    "www": ""
  },
  variable: {
    sf: {},
    tf: {}
  },
  tmp: {
    checking_macro: false,
    ready_audio: false,
    audio_context: false,
    num_anim: 0,
    map_bgm: {},
    map_se: {},
    sleep_game: null,
    sleep_game_next: false,
    base_scale: 1,
    is_se_play: false,
    is_se_play_wait: false,
    is_vo_play: false,
    is_vo_play_wait: false,
    is_bgm_play: false,
    is_bgm_play_wait: false,
    is_audio_stopping: false,
    loading_make_ref: false,
    wait_id: "",
    map_chara_talk_top: {},
    video_playing: false
  },
  stat: {
    map_label: {},
    map_macro: {},
    vertical: "false",
    f: {},
    mp: {},
    current_layer: "message0",
    current_page: "fore",
    is_stop: false,
    is_wait: false,
    is_trans: false,
    is_wait_anim: false,
    is_strong_stop: false,
    strong_stop_recover_index: 0,
    is_nowait: false,
    current_message_str: "ゲームスタート",
    current_save_str: "",
    current_keyframe: "",
    map_keyframe: {},
    is_script: false,
    buff_script: "",
    is_html: false,
    map_html: {},
    cssload: {},
    save_img: "",
    stack: {
      "if": [],
      "call": [],
      "macro": []
    },
    set_text_span: false,
    current_scenario: "first.ks",
    is_skip: {},
    is_auto: {},
    current_bgm: "",
    current_bgm_vol: "",
    current_se: {},
    load_auto_next: false,
    enable_keyconfig: true,
    current_bgmovie: {
      storage: "",
      volume: ""
    },
    current_camera: {},
    current_camera_layer: "",
    is_move_camera: false,
    is_wait_camera: false,
    current_line: 0,
    is_hide_message: false,
    is_click_text: false,
    is_adding_text: false,
    flag_ref_page: false,
    ruby_str: "",
    ch_speed: "",
    skip_link: "true",
    log_join: "false",
    log_clear: false,
    f_chara_ptext: "false",
    flag_glyph: "false",
    current_cursor: "auto",
    font: {
      enable: false,
      color: "",
      bold: "",
      size: "",
      face: "",
      italic: ""
    },
    locate: {
      x: 0,
      y: 0
    },
    default_font: {
      color: "",
      bold: "",
      size: "",
      face: "",
      italic: "",
      edge: "",
      shadow: ""
    },
    sysview: {
      save: "./tyrano/html/save.html",
      load: "./tyrano/html/load.html",
      backlog: "./tyrano/html/backlog.html",
      menu: "./tyrano/html/menu.html"
    },
    chara_pos_mode: "true",
    chara_effect: "swing",
    chara_ptext: "",
    chara_time: "600",
    chara_memory: "false",
    chara_anim: "true",
    pos_change_time: "600",
    chara_talk_focus: "none",
    chara_brightness_value: "60",
    chara_blur_value: "2",
    chara_talk_anim: "none",
    chara_talk_anim_time: 230,
    chara_talk_anim_value: 30,
    apply_filter_str: "",
    video_stack: null,
    is_wait_bgmovie: false,
    charas: {},
    jcharas: {},
    play_bgm: true,
    play_se: true,
    play_speak: false,
    map_se_volume: {},
    map_bgm_volume: {},
    map_vo: {
      vobuf: {},
      vochara: {}
    },
    vostart: false,
    log_write: true,
    buff_label_name: "",
    already_read: false,
    visible_menu_button: false,
    title: ""
  },
  init: function () {
    this.kag = this;
    var that = this;
    this.tyrano.test();
    this.parser.loadConfig(function (map_config) {
      that.config = $.extend(true, that.config, map_config);
      that.checkUpdate(function () {
        that.init_game()
      })
    });
    $("script").each(function () {
      if ($(this).attr("src"))
        if ($(this).attr("src").indexOf("cordova") != -1 || $(this).attr("src").indexOf("phonegap") != -1) that.define.FLAG_APRI = true
    });
    if (typeof TyranoPlayer == "function") this.tmp.ready_audio = true;
    else if ($.isNWJS()) this.tmp.ready_audio = true;
    var AudioContext = window.AudioContext || window.webkitAudioContext || false;
    if (AudioContext) this.tmp.audio_context = new AudioContext;
    try {
      var browser = $.getBrowser()
    } catch (e) {
      console.log(e)
    }
  },
  checkUpdate: function (call_back) {
    if (!$.isNWJS()) {
      call_back();
      return
    }
    if (this.kag.config.patch_apply_auto == "false") {
      call_back();
      return
    }
    var patch_path = $.localFilePath();
    var that = this;
    patch_path = patch_path + "/" + this.kag.config.projectID + ".tpatch";
    this.applyPatch(patch_path, "true", call_back)
  },
  applyPatch: function (patch_path, flag_reload, call_back) {
    var fs = require("fs");
    var fse = require("fs-extra");
    if (!fs.existsSync(patch_path)) {
      call_back();
      return
    }
    if (fs.existsSync("./updated")) {
      call_back();
      return
    }
    var AdmZip = require("adm-zip");
    var path = require("path");
    var abspath = path.resolve("./");
    var zip = new AdmZip(patch_path);
    zip.extractAllTo("./update_tmp", true);
    fse.copySync("./update_tmp/", "./");
    fse.removeSync("./update_tmp");
    if (flag_reload == "true") {
      fs.writeFileSync("./updated", "true");
      location.reload()
    } else call_back()
  },
  evalScript: function (str) {
    var TG = this;
    var f = this.stat.f;
    var sf = this.variable.sf;
    var tf = this.variable.tf;
    var mp = this.stat.mp;
    eval(str);
    this.saveSystemVariable();
    if (this.kag.is_rider) this.kag.rider.pushVariableGrid()
  },
  embScript: function (str, preexp) {
    var f = this.stat.f;
    var sf = this.variable.sf;
    var tf = this.variable.tf;
    var mp = this.stat.mp;
    return eval(str)
  },
  saveSystemVariable: function () {
    $.setStorage(this.kag.config.projectID + "_sf", this.variable.sf, this.kag.config.configSave)
  },
  clearVariable: function () {
    this.stat.f = {};
    this.variable.sf = {};
    this.clearTmpVariable();
    this.saveSystemVariable()
  },
  clearTmpVariable: function () {
    var tmp_sys = this.kag.variable.tf["system"];
    this.kag.variable.tf = {};
    this.kag.variable.tf["system"] = tmp_sys
  },
  pushStack: function (name, flag) {
    this.stat.stack[name].push(flag)
  },
  popStack: function (name) {
    return this.stat.stack[name].pop()
  },
  getStack: function (name) {
    return this.stat.stack[name][this.stat.stack[name].length - 1]
  },
  setStack: function (name, flag) {
    this.stat.stack[name][this.stat.stack[name].length - 1] = flag
  },
  endStorage: function () {
    var pm = this.kag.getStack("call");
    if (pm == null) return false;
    this.kag.popStack("call");
    this.kag.ftag.nextOrderWithIndex(pm.index, pm.storage)
  },
  init_game: function () {
    var that = this;
    this.parser = object(tyrano.plugin.kag.parser);
    this.parser.kag = that;
    this.ftag = object(tyrano.plugin.kag.ftag);
    this.ftag.kag = that;
    this.ftag.init();
    this.layer = object(tyrano.plugin.kag.layer);
    this.layer.kag = that;
    this.layer.init();
    this.menu = object(tyrano.plugin.kag.menu);
    this.menu.kag = that;
    this.menu.init();
    this.key_mouse = object(tyrano.plugin.kag.key_mouse);
    this.key_mouse.kag = that;
    this.key_mouse.init();
    this.event = object(tyrano.plugin.kag.event);
    this.event.kag = that;
    this.event.init();
    this.rider = object(tyrano.plugin.kag.rider);
    this.rider.kag = that;
    this.rider.init();
    
    if($.isNWJS()){
    	if(process.execPath.indexOf("var/folders")!=-1){
    		that.save_key_id = that.kag.config.projectID+"_save_key";
		}else{
			that.save_key_id = $.getProcessPath()+"_"+that.kag.config.projectID;
		}
    	if (localStorage.getItem(that.save_key_id)) {
			that.save_key_val = localStorage.getItem(that.save_key_id);
		}else{
			that.save_key_val = $.makeSaveKey();
			localStorage.setItem(that.save_key_id,that.save_key_val);
			var tmp_array = that.menu.getSaveData();
			tmp_array["hash"] = that.save_key_val;
			$.setStorage(that.kag.config.projectID + "_tyrano_data", tmp_array, that.kag.config.configSave);
		}
	
		var tmp_array = that.menu.getSaveData();
		if(tmp_array["hash"] != that.save_key_val){
			
			alert('不正なセーブデータの改変を検知しました。ゲームの起動を中止します');
			alert("起動を中止しました。セーブデータを削除してもう一度、起動してください");
			return false;
		    
		}
    }
    
    var tmpsf = $.getStorage(this.kag.config.projectID + "_sf", that.config.configSave);
    if (tmpsf == null) this.variable.sf = {};
    else this.variable.sf = JSON.parse(tmpsf);
    if (typeof that.variable.sf._system_config_bgm_volume !== "undefined") that.config["defaultBgmVolume"] = String(that.variable.sf._system_config_bgm_volume);
    if (typeof that.variable.sf._system_config_se_volume !== "undefined") that.config["defaultSeVolume"] = String(that.variable.sf._system_config_se_volume);
    if (that.variable.sf._config_ch_speed) that.config["chSpeed"] = that.variable.sf._config_ch_speed;
    if (typeof that.variable.sf._system_config_auto_speed !== "undefined") that.config["autoSpeed"] = that.variable.sf._system_config_auto_speed;
    if (that.variable.sf._system_config_auto_click) that.config["autoClickStop"] = that.variable.sf._system_config_auto_click_stop;
    if (that.variable.sf._system_config_already_read_text_color) that.config["alreadyReadTextColor"] = that.variable.sf._system_config_already_read_text_color;
    if (typeof that.variable.sf._system_config_unread_text_skip != "undefined") that.config["unReadTextSkip"] = that.variable.sf._system_config_unread_text_skip;
    var auto_save_data = $.getStorage(this.kag.config.projectID + "_tyrano_auto_save", this.kag.config.configSave);
    this.variable.sf["system"] = {};
    if (auto_save_data) this.variable.sf["system"]["autosave"] = true;
    else this.variable.sf["system"]["autosave"] = false;
    this.variable.tf["system"] = {};
    this.variable.tf["system"]["backlog"] = [];
    var button_menu_obj = $("<div class='button_menu' style='z-index:100000000'><img src='./tyrano/images/system/" + $.novel("file_button_menu") + "'  /></div>");
    if (this.kag.config.configLeft != "-1" && this.kag.config.configTop != "-1") {
      button_menu_obj.css("left", parseInt(this.kag.config.configLeft));
      button_menu_obj.css("top", parseInt(this.kag.config.configTop))
    } else {
      button_menu_obj.css("left", this.config.scWidth - 35);
      button_menu_obj.css("top", this.config.scHeight - 35)
    }
    button_menu_obj.click(function () {
      that.menu.showMenu()
    });
    if (this.kag.config.configVisible == "false") {
      button_menu_obj.hide();
      this.kag.stat.visible_menu_button = false
    } else this.kag.stat.visible_menu_button = true;
    $("." + this.kag.define.BASE_DIV_NAME).append(button_menu_obj);
    if (this.kag.config["ScreenCentering"] && this.kag.config["ScreenCentering"] == "false") {
      $(".tyrano_base").css("transform-origin", "0 0");
      $(".tyrano_base").css({
        margin: 0
      })
    } else {
      $(".tyrano_base").css("transform-origin", "0 0");
      $(".tyrano_base").css({
        margin: 0
      })
    }
    
    //スマホの場合
    if($.userenv()!="pc"){

    	//absolute指定
    	$("#tyrano_base").css("position","absolute");

    	function noScroll(event) {
		     event.preventDefault();
		}
		// スクロール禁止(SP) vchatのときは例外
		if(this.kag.config["vchat"]!="true"){
			document.addEventListener('touchmove', noScroll, { passive: false });
		}

    }

    
    this.tyrano.base.setBaseSize(this.config.scWidth, this.config.scHeight);
    this.tyrano.base.fitBaseSize(that.config.scWidth, that.config.scHeight);
    $(window).bind("load orientationchange resize", function () {
      if (Math.abs(window.orientation) === 90) {
        window.scrollTo(0, 1);
        that.tyrano.base.fitBaseSize(that.config.scWidth, that.config.scHeight);
      } else {
        if (window.pageYOffset === 0) window.scrollTo(0, 1);
        that.tyrano.base.fitBaseSize(that.config.scWidth, that.config.scHeight)
      }
    });
    this.layer.addLayer("base");
    this.layer.addLayer("message0");
    var j_message = $("<div class='message_outer'></div>");
    j_message.css("background-color", $.convertColor(this.config.frameColor)).css("opacity", $.convertOpacity(this.config.frameOpacity)).css("left", eval(this.config.ml)).css("top", eval(this.config.mt)).css("width", eval(this.config.mw)).css("height", eval(this.config.mh)).css("z-index", 100);
    j_message.l_visible;
    this.layer.appendObj("message0", "fore", j_message);
    var j_message_inner = $("<div class='message_inner' style='z-index:1001'></div>");
    if (this.config.WordBreak == "false") j_message_inner.css("word-break", "break-all");
    $.insertRule(".message_inner p{ padding-top:" + this.kag.config.defaultLineSpacing + "px;}");
    this.layer.appendObj("message0", "fore", j_message_inner);
    var num_message_layer = parseInt(this.config.numMessageLayers);
    for (var i = 1; i < num_message_layer; i++) {
      var message_layer_name = "message" + i;
      this.layer.addLayer(message_layer_name);
      this.layer.getLayer(message_layer_name).attr("l_visible", "false");
      this.layer.getLayer(message_layer_name).hide();
      var j_message1 = j_message.clone(false);
      this.layer.appendObj(message_layer_name, "fore", j_message1);
      var j_message_inner1 = j_message_inner.clone(false);
      this.layer.appendObj(message_layer_name, "fore", j_message_inner1)
    }
    this.layer.refMessageLayer();
    var fore_layer_num = parseInt(this.config.numCharacterLayers);
    for (var i = 0; i < fore_layer_num; i++) {
      this.layer.addLayer("" + i);
      this.layer.getLayer("" + i, "fore").css("display", "none").css("z-index", 10 + i);
      this.layer.getLayer("" + i, "back").css("display", "none").css("z-index", 10 + i)
    }
    this.stat.default_font.color = $.convertColor(this.kag.config.defaultChColor);
    this.stat.default_font.bold = $.convertBold(this.kag.config.defaultBold);
    this.stat.default_font.size = this.kag.config.defaultFontSize;
    this.stat.default_font.face = this.kag.config.userFace;
    var smooth = this.kag.config.defaultAntialiased;
    if (smooth == "2") $(".tyrano_base").css("-webkit-font-smoothing", "antialiased");
    else if (smooth == "0") $(".tyrano_base").css("-webkit-font-smoothing", "none");
    else $(".tyrano_base").css("-webkit-font-smoothing", "subpixel-antialiased");
    if (this.kag.config.defaultShadow == "true") this.stat.default_font.shadow = $.convertColor(this.kag.config.defaultShadowColor);
    if (this.kag.config.defaultEdge == "true") this.stat.default_font.edge = $.convertColor(this.kag.config.defaultEdgeColor);
    this.stat.vertical = this.kag.config.vertical;
    this.kag.stat.font = $.extend(true, $.cloneObject(this.kag.stat.font), this.stat.default_font);
    this.setTitle(this.config["System.title"]);
    this.setCursor(this.config["cursorDefault"]);
    var first_scenario_file = "first.ks";
    if ($("#first_scenario_file").length > 0) first_scenario_file = $("#first_scenario_file").val();
    this.loadScenario(first_scenario_file, function (array_tag) {
      that.ftag.buildTag(array_tag)
    });
    that.rider.complete(this)
  },
  pushBackLog: function (str, type) {
    if (this.stat.log_write == false) return;
    type = type || "add";
    var max_back_log = parseInt(this.kag.config["maxBackLogNum"]);
    if (max_back_log < 1) return;
    if (this.kag.stat.log_clear == true) {
      type = "add";
      this.kag.stat.log_clear = false
    }
    if (type == "join") {
      var index = this.variable.tf.system.backlog.length - 1;
      if (index >= 0) {
        var tmp = this.variable.tf["system"]["backlog"][index];
        this.variable.tf["system"]["backlog"][this.variable.tf.system.backlog.length - 1] = tmp + str
      } else this.variable.tf["system"]["backlog"].push(str)
    } else this.variable.tf["system"]["backlog"].push(str);
    this.stat.current_save_str = this.variable.tf["system"]["backlog"][this.variable.tf.system.backlog.length - 1];
    if (max_back_log < this.variable.tf["system"]["backlog"].length) this.variable.tf["system"]["backlog"].shift()
  },
  setTitle: function (title) {
    this.stat.title = title;
    document.title = title
  },
  pushAnimStack: function () {
    this.kag.tmp.num_anim++
  },
  backTitle: function () {
    if ("appJsInterface" in window) appJsInterface.finishGame();
    else if (typeof TyranoPlayer == "function") location.href = "tyranoplayer-back://endgame";
    else $.confirm($.lang("go_title"), function () {
      location.href = "./index.html"
    }, function () {
      return false
    })
  },
  cutTimeWithSkip: function (time) {
    if (this.kag.stat.is_skip == true)
      if (this.kag.config.skipEffectIgnore == "true") return 70;
    return time
  },
  readyAudio: function () {
    this.tmp.ready_audio = true;
    if ($.userenv() != "pc") {
      var pm = {
        loop: "false",
        storage: "",
        stop: "true"
      };
      if (!this.tmp.map_bgm[0]) {
        this.kag.ftag.startTag("playse", pm);
        this.kag.ftag.startTag("playbgm", pm)
      }
      var bgm_slot = parseInt(this.kag.config.defaultBgmSlotNum);
      var se_slot = parseInt(this.kag.config.defaultSoundSlotNum);
      for (var i = 1; i < bgm_slot; i++) {
        pm.buf = i;
        if (this.tmp.map_bgm[pm.buf]) this.kag.ftag.startTag("playbgm", pm)
      }
      for (var i = 1; i < se_slot; i++) {
        pm.buf = i;
        if (!this.tmp.map_se[pm.buf]) this.kag.ftag.startTag("playse", pm)
      }
      if ($.isNWJS() != true && "speechSynthesis" in window) speechSynthesis.speak(new SpeechSynthesisUtterance(""))
    }
  },
  setCursor: function (cursor) {
    this.stat.current_cursor = cursor;
    if (cursor === "default") $("body").css("cursor", "auto");
    else $("body").css("cursor", "url(./data/image/" + cursor + "),default")
  },
  popAnimStack: function () {
    if (this.kag.tmp.num_anim > 0) this.kag.tmp.num_anim--;
    if (this.kag.tmp.num_anim <= 0)
      if (this.kag.stat.is_wait_anim == true) {
        this.kag.stat.is_wait_anim = false;
        this.kag.layer.showEventLayer();
        this.kag.ftag.nextOrder()
      }
  },
  loadScenario: function (file_name, call_back) {
    var that = this;
    this.stat.is_strong_stop = true;
    this.stat.current_scenario = file_name;
    var file_url = "";
    if ($.isHTTP(file_name)) file_url = file_name;
    else file_url = "./data/scenario/" + file_name;
    if (that.cache_scenario[file_url]) {
      if (call_back) {
        var result_obj = that.cache_scenario[file_url];
        var tag_obj = result_obj.array_s;
        var map_label = result_obj.map_label;
        that.stat.map_label = map_label;
        that.stat.is_strong_stop = false;
        call_back(tag_obj)
      }
    } else $.loadText(file_url, function (text_str) {
      var result_obj = that.parser.parseScenario(text_str);
      that.cache_scenario[file_url] = result_obj;
      var tag_obj = result_obj.array_s;
      var map_label = result_obj.map_label;
      that.stat.map_label = map_label;
      that.stat.is_strong_stop = false;
      if (call_back) call_back(tag_obj)
    })
  },
  getMessageInnerLayer: function () {
    return this.layer.getLayer(this.stat.current_layer, this.stat.current_page).find(".message_inner")
  },
  getMessageOuterLayer: function () {
    return this.layer.getLayer(this.stat.current_layer, this.stat.current_page).find(".message_outer")
  },
  getMessageCurrentSpan: function () {
    var j_obj = this.layer.getLayer(this.stat.current_layer, this.stat.current_page).find(".message_inner").find("p").find(".current_span");
    return j_obj
  },
  setMessageCurrentSpan: function () {
    var jtext = this.getMessageInnerLayer();
    if (jtext.find("p").length == 0)
      if (this.stat.vertical == "true") jtext.append($("<p class='vertical_text'></p>"));
      else jtext.append($("<p class=''></p>"));
    if (jtext.find("p").find(".current_span").length > 0) {
      jtext.find("p").find(".current_span").removeClass("current_span");
      this.stat.set_text_span = false
    }
    var j_span = $("<span class='current_span'></span>");
    jtext.find("p").append(j_span);
    return j_span
  },
  checkMessage: function (jtext) {
    if (this.stat.set_text_span == true) {
      jtext.find("p").find(".current_span").removeClass("current_span");
      this.stat.set_text_span = false
    }
    if (jtext.find(".current_span").length == 0) jtext.find("p").append($("<span class='current_span'></span>"))
  },
  appendMessage: function (jtext, str) {
    jtext.find("p").find(".current_span").html(str)
  },
  preload: function (src, callbk) {
    var that = this;
    $("<img />").attr("src", src).on("load", function (e) {
      if (callbk) callbk()
    }).on("error", function (e) {
      that.kag.error("画像ファイル「" + src + "」が見つかりません。場所はフルパスで指定されていますか？ (例)data/fgimage/file.png");
      if (callbk) callbk()
    })
  },
  preloadAll: function (storage, callbk) {
    var that = this;
    if (typeof storage == "object" && storage.length >= 0) {
      if (storage.length == 0) {
        callbk();
        return
      }
      var sum = 0;
      for (var i = 0; i < storage.length; i++) that.kag.preload(storage[i], function () {
        sum++;
        if (storage.length == sum) callbk()
      })
    } else this.kag.preload(pm.storage, function () {
      callbk()
    })
  },
  setStyles: function (j_obj, array_style) {
    for (key in array_style)
      if (array_style[key])
        if (array_style[key] == "");
        else j_obj.css(key, array_style[key]);
    return j_obj
  },
  html: function (html_file_name, data, callback) {
    var that = this;
    data = data || {};
    if (this.cache_html[html_file_name]) {
      if (callback) {
        var tmpl = $.templates(this.cache_html[html_file_name]);
        var html = tmpl.render(data);
        callback($(html))
      }
    } else {
      if (!this.kag.stat.sysview) {
        this.kag.stat.sysview = {};
        this.kag.stat.sysview = {
          save: "./tyrano/html/save.html",
          load: "./tyrano/html/load.html",
          backlog: "./tyrano/html/backlog.html",
          menu: "./tyrano/html/menu.html"
        }
      }
      var path_html = this.kag.stat.sysview[html_file_name];
      $.loadText(path_html, function (text_str) {
        var tmpl = $.templates(text_str);
        var html = tmpl.render(data);
        that.cache_html[html_file_name] = text_str;
        if (callback) callback($(html))
      })
    }
  },
  error: function (str) {
    if (this.kag.config["debugMenu.visible"] == "true") {
      var current_storage = this.kag.stat.current_scenario;
      var line = parseInt(this.kag.stat.current_line) + 1;
      var err = "Error:" + current_storage + ":" + line + "行目:" + str;
      $.error_message(err)
    }
  },
  warning: function (str) {
    if (this.kag.config["debugMenu.visible"] == "true") alert(str)
  },
  log: function (obj) {
    if (this.kag.config["debugMenu.visible"] == "true") console.log(obj)
  },
  test: function () {}
};
tyrano.plugin.kag.tag = {};