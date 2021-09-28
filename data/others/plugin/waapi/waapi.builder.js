/*
    ティラノビルダープラグイン開発用のテンプレート
    まず、このファイルを編集してプラグイン開発を試してみると良いでしょう。    
*/

'use strict';
module.exports = class plugin_setting {
    
    constructor(TB) {
        
        /* TBはティラノビルダーの機能にアクセスするためのインターフェスを提供する */
        this.TB = TB;
        
        /* プラグイン名を格納する */
        this.name= TB.$.s("BGM/SEのシームレスループ再生プラグイン(WEB_AUDIO_API利用)");
        
        /*プラグインの説明文を格納する*/
        this.plugin_text= TB.$.s("音声ファイルをつなぎの自然なループ(シームレスループ)で再生できます。<br />フェードしながら音量操作ができます。<br />音声ファイルの一時停止と、停止時点からの再生再開ができます。");
        
        /*プラグイン説明用の画像ファイルを指定する。プラグインフォルダに配置してください*/
        this.plugin_img = "no_image";
        
    }
    
    
    /* プラグインをインストールを実行した時１度だけ走ります。フォルダのコピーなどにご活用ください。*/
    triggerInstall(){
        
        /*
        //プラグインからプロジェクトにファイルをコピーするサンプルです 
        var project_path = TB.getProjectPath() ; 
        var from_path = project_path + "data/others/plugin/plugin_template/copy_folder";
        var to_path = project_path + "data/image/copy_folder";
        TB.io.copy(from_path,to_path);
        */
        
    }
        
    /*
        追加するコンポーネントを定義します。
    */
    
    defineComponents(){
        
        var cmp = {};
        var TB = this.TB;

        
        cmp["loadbgm"] = {
            
            "info":{
                
                "default":true, /*trueを指定するとコンポーネントがデフォルトで配置されます。*/
                "name":TB.$.s("ループBGMのロード"), /* コンポーネント名称 */
                "help":TB.$.s("実際に再生するタイミングより前に余裕を持ってロードしておくことをオススメします"), /* コンポーネントの説明を記述します */ 
                "icon":TB.$.s("s-icon-star-full") /* ここは変更しないでください */
                
            },
            
            /* コンポーネントの情報の詳細を定義します */
            
            "component":{
                
                name : TB.$.s("ループBGMのロード"), /* コンポーネント名称 */

                header : function(obj) {
                    
                    return obj.data.pm.storage;
                    
                },

                component_type : "Sound", /*タイムラインのコンポーネントタイプ Simple Movie Image Text Soundが指定可能 */
                
                /*ビューに渡す値*/
                default_view : {
                    base_sound_url : "data/bgm/", /* soundフォルダから選択させる場合は data/sound に変更 */
                    icon : "s-icon-star-full", /*変更しない*/
                    icon_color : "#FFFF99", /*変更しない*/
                    category : "plugin", /*変更しない*/
                },
                
                /*変更しない*/
                param_view : {
                },
            
                /* コンポーネントのパラメータを定義していきます */
                param:{
                    
                    /*パラメータを指定します。storageはパラメータ名を表しています。*/
                    /*画像選択の例*/
                    str : {
                        type : "SoundSelect",   /*パラメータのタイプです。これは画像選択の場合*/
                        file_path : "bgm/", /* 効果音の場合はsoundに変更 */
                        name : TB.$.s("BGMの選択"),
                        vital : true, //必須かどうか
                        default_val : "",
                    },
                    
                },
            
            }
            
        };
        
        cmp["loadse"] = {
            
            "info":{
                
                "default":true, /*trueを指定するとコンポーネントがデフォルトで配置されます。*/
                "name":TB.$.s("ループSEのロード"), /* コンポーネント名称 */
                "help":TB.$.s("実際に再生するタイミングより前に余裕を持ってロードしておくことをオススメします"), /* コンポーネントの説明を記述します */ 
                "icon":TB.$.s("s-icon-star-full") /* ここは変更しないでください */
                
            },
            
            /* コンポーネントの情報の詳細を定義します */
            
            "component":{
                
                name : TB.$.s("ループSEのロード"), /* コンポーネント名称 */

                header : function(obj) {
                    
                    return obj.data.pm.storage;
                    
                },

                component_type : "Sound", /*タイムラインのコンポーネントタイプ Simple Movie Image Text Soundが指定可能 */
                
                /*ビューに渡す値*/
                default_view : {
                    base_sound_url : "data/sound/", /* soundフォルダから選択させる場合は data/sound に変更 */
                    icon : "s-icon-star-full", /*変更しない*/
                    icon_color : "#FFFF99", /*変更しない*/
                    category : "plugin", /*変更しない*/
                },
                
                /*変更しない*/
                param_view : {
                },
            
                /* コンポーネントのパラメータを定義していきます */
                param:{
                    
                    /*パラメータを指定します。storageはパラメータ名を表しています。*/
                    /*画像選択の例*/
                    str : {
                        type : "SoundSelect",   /*パラメータのタイプです。これは画像選択の場合*/
                        file_path : "sound/", /* 効果音の場合はsoundに変更 */
                        name : TB.$.s("SEの選択"),
                        vital : true, //必須かどうか
                        default_val : "",
                    },
                    
                },
            
            }
            
        };
        
        cmp["lbgm"] = {
            
            "info":{
                
                "default":true, /*trueを指定するとコンポーネントがデフォルトで配置されます。*/
                "name":TB.$.s("ループBGM再生"), /* コンポーネント名称 */
                "help":TB.$.s("ロード済みのBGMを再生します。事前ロード必須。oggのループタグに対応"), /* コンポーネントの説明を記述します */ 
                "icon":TB.$.s("s-icon-star-full") /* ここは変更しないでください */
                
            },
            
            /* コンポーネントの情報の詳細を定義します */
            
            "component":{
                
                name : TB.$.s("ループBGM再生"), /* コンポーネント名称 */

                header : function(obj) {
                    
                    return obj.data.pm.storage;
                    
                },

                component_type : "Sound", /*タイムラインのコンポーネントタイプ Simple Movie Image Text Soundが指定可能 */
                
                /*ビューに渡す値*/
                default_view : {
                    base_sound_url : "data/bgm/", /* soundフォルダから選択させる場合は data/sound に変更 */
                    icon : "s-icon-star-full", /*変更しない*/
                    icon_color : "#FFFF99", /*変更しない*/
                    category : "plugin", /*変更しない*/
                },
                
                /*変更しない*/
                param_view : {
                },
            
                /* コンポーネントのパラメータを定義していきます */
                param:{
                    
                    /*パラメータを指定します。storageはパラメータ名を表しています。*/
                    /*画像選択の例*/
                    str : {
                        type : "SoundSelect",   /*パラメータのタイプです。これは画像選択の場合*/
                        file_path : "bgm/", /* 効果音の場合はsoundに変更 */
                        name : TB.$.s("BGMの選択"),
                        vital : true, //必須かどうか
                        default_val : "",
                    },
                    
                    vol : {
                        type : "Num",
                        name : TB.$.s("音量"),
                        unit : TB.$.s("%"),
                        validate : {
                            number : true
                        },
                        spinner : {
                            min : 0,
                            max : 100,
                            step : 5
                        },
                        default_val : 50
                    },
                    loop : {
                        type : "Check",
                        text : TB.$.s("ループ再生する"),
                        default_val : "true",
                        name : "",
                    },
                    time : {
                        type : "Num",
                        name : TB.$.s("フェードイン時間"),
                        unit : TB.$.s("ﾐﾘ秒"),
                        validate : {
                            number : true
                        },
                        spinner : {
                            min : 0,
                            max : 99999,
                            step : 100
                        },
                        default_val : 1000
                    },
                    buf : {
                        type : "Num",
                        name : TB.$.s("再生リスト番号"),
                        validate : {
                            number : true
                        },
                        spinner : {
                            min : 0,
                            max : 100,
                            step : 1
                        },
                        default_val : 0
                    },
                    start : {
                        type : "Num",
                        name : TB.$.s("再生開始位置"),
                        unit : TB.$.s("秒"),
                        validate : {
                            number : true
                        },
                        spinner : {
                            min : 0,
                            max : 100,
                            step : 0.1
                        },
                        default_val : 0
                    },
                    
                },
            
            }
            
        };
        
        cmp["lse"] = {
            
            "info":{
                
                "default":true, /*trueを指定するとコンポーネントがデフォルトで配置されます。*/
                "name":TB.$.s("ループSE再生"), /* コンポーネント名称 */
                "help":TB.$.s("ロード済みのSEを再生します。事前ロード必須。oggのループタグに対応"), /* コンポーネントの説明を記述します */ 
                "icon":TB.$.s("s-icon-star-full") /* ここは変更しないでください */
                
            },
            
            /* コンポーネントの情報の詳細を定義します */
            
            "component":{
                
                name : TB.$.s("ループSE再生"), /* コンポーネント名称 */

                header : function(obj) {
                    
                    return obj.data.pm.storage;
                    
                },

                component_type : "Sound", /*タイムラインのコンポーネントタイプ Simple Movie Image Text Soundが指定可能 */
                
                /*ビューに渡す値*/
                default_view : {
                    base_sound_url : "data/sound/", /* soundフォルダから選択させる場合は data/sound に変更 */
                    icon : "s-icon-star-full", /*変更しない*/
                    icon_color : "#FFFF99", /*変更しない*/
                    category : "plugin", /*変更しない*/
                },
                
                /*変更しない*/
                param_view : {
                },
            
                /* コンポーネントのパラメータを定義していきます */
                param:{
                    
                    /*パラメータを指定します。storageはパラメータ名を表しています。*/
                    /*画像選択の例*/
                    str : {
                        type : "SoundSelect",   /*パラメータのタイプです。これは画像選択の場合*/
                        file_path : "sound/", /* 効果音の場合はsoundに変更 */
                        name : TB.$.s("BGMの選択"),
                        vital : true, //必須かどうか
                        default_val : "",
                    },
                    
                    vol : {
                        type : "Num",
                        name : TB.$.s("音量"),
                        unit : TB.$.s("%"),
                        validate : {
                            number : true
                        },
                        spinner : {
                            min : 0,
                            max : 100,
                            step : 5
                        },
                        default_val : 50
                    },
                    loop : {
                        type : "Check",
                        text : TB.$.s("ループ再生する"),
                        default_val : "true",
                        name : "",
                    },
                    time : {
                        type : "Num",
                        name : TB.$.s("フェードイン時間"),
                        unit : TB.$.s("ﾐﾘ秒"),
                        validate : {
                            number : true
                        },
                        spinner : {
                            min : 0,
                            max : 99999,
                            step : 100
                        },
                        default_val : 1000
                    },
                    buf : {
                        type : "Num",
                        name : TB.$.s("再生リスト番号"),
                        validate : {
                            number : true
                        },
                        spinner : {
                            min : 0,
                            max : 100,
                            step : 1
                        },
                        default_val : 0
                    },
                    start : {
                        type : "Num",
                        name : TB.$.s("再生開始位置"),
                        unit : TB.$.s("秒"),
                        validate : {
                            number : true
                        },
                        spinner : {
                            min : 0,
                            max : 100,
                            step : 0.1
                        },
                        default_val : 0
                    },
                    
                },
            
            }
            
        };
        
        cmp["lbgmstop"] = {
            
            "info":{
                
                "default":true, /*trueを指定するとコンポーネントがデフォルトで配置されます。*/
                "name":TB.$.s("ループBGM一時停止"), /* コンポーネント名称 */
                "help":TB.$.s("BGMの再生を一時停止します。"), /* コンポーネントの説明を記述します */ 
                "icon":TB.$.s("s-icon-star-full") /* ここは変更しないでください */
                
            },
            
            /* コンポーネントの情報の詳細を定義します */
            
            "component":{
                
                name : TB.$.s("ループBGM一時停止"), /* コンポーネント名称 */

                header : function(obj) {
                    
                    return obj.data.pm.storage;
                    
                },

                component_type : "Simple", /*タイムラインのコンポーネントタイプ Simple Movie Image Text Soundが指定可能 */
                
                /*ビューに渡す値*/
                default_view : {
                    base_sound_url : "data/bgm/", /* soundフォルダから選択させる場合は data/sound に変更 */
                    icon : "s-icon-star-full", /*変更しない*/
                    icon_color : "#FFFF99", /*変更しない*/
                    category : "plugin", /*変更しない*/
                },
                
                /*変更しない*/
                param_view : {
                },
            
                /* コンポーネントのパラメータを定義していきます */
                param:{

                    buf : {
                        type : "Num",
                        name : TB.$.s("再生リスト番号"),
                        validate : {
                            number : true
                        },
                        spinner : {
                            min : 0,
                            max : 100,
                            step : 1
                        },
                        default_val : 0
                    },
                    time : {
                        type : "Num",
                        name : TB.$.s("フェードアウト時間"),
                        unit : TB.$.s("ﾐﾘ秒"),
                        validate : {
                            number : true
                        },
                        spinner : {
                            min : 0,
                            max : 99999,
                            step : 100
                        },
                        default_val : 1000
                    },
                    
                },
            
            }
            
        };
        
        cmp["lsestop"] = {
            
            "info":{
                
                "default":true, /*trueを指定するとコンポーネントがデフォルトで配置されます。*/
                "name":TB.$.s("ループSE一時停止"), /* コンポーネント名称 */
                "help":TB.$.s("SEの再生を一時停止します。"), /* コンポーネントの説明を記述します */ 
                "icon":TB.$.s("s-icon-star-full") /* ここは変更しないでください */
                
            },
            
            /* コンポーネントの情報の詳細を定義します */
            
            "component":{
                
                name : TB.$.s("ループSE一時停止"), /* コンポーネント名称 */

                header : function(obj) {
                    
                    return obj.data.pm.storage;
                    
                },

                component_type : "Simple", /*タイムラインのコンポーネントタイプ Simple Movie Image Text Soundが指定可能 */
                
                /*ビューに渡す値*/
                default_view : {
                    base_sound_url : "data/sound/", /* soundフォルダから選択させる場合は data/sound に変更 */
                    icon : "s-icon-star-full", /*変更しない*/
                    icon_color : "#FFFF99", /*変更しない*/
                    category : "plugin", /*変更しない*/
                },
                
                /*変更しない*/
                param_view : {
                },
            
                /* コンポーネントのパラメータを定義していきます */
                param:{

                    buf : {
                        type : "Num",
                        name : TB.$.s("再生リスト番号"),
                        validate : {
                            number : true
                        },
                        spinner : {
                            min : 0,
                            max : 100,
                            step : 1
                        },
                        default_val : 0
                    },
                    time : {
                        type : "Num",
                        name : TB.$.s("フェードアウト時間"),
                        unit : TB.$.s("ﾐﾘ秒"),
                        validate : {
                            number : true
                        },
                        spinner : {
                            min : 0,
                            max : 99999,
                            step : 100
                        },
                        default_val : 1000
                    },
                    
                },
            
            }
            
        };
        
        cmp["lbgmresume"] = {
            
            "info":{
                
                "default":true, /*trueを指定するとコンポーネントがデフォルトで配置されます。*/
                "name":TB.$.s("ループBGM再生再開"), /* コンポーネント名称 */
                "help":TB.$.s("一時停止したBGMの再生を再開します"), /* コンポーネントの説明を記述します */ 
                "icon":TB.$.s("s-icon-star-full") /* ここは変更しないでください */
                
            },
            
            /* コンポーネントの情報の詳細を定義します */
            
            "component":{
                
                name : TB.$.s("ループBGM再生再開"), /* コンポーネント名称 */

                header : function(obj) {
                    
                    return obj.data.pm.storage;
                    
                },

                component_type : "Sound", /*タイムラインのコンポーネントタイプ Simple Movie Image Text Soundが指定可能 */
                
                /*ビューに渡す値*/
                default_view : {
                    base_sound_url : "data/bgm/", /* soundフォルダから選択させる場合は data/sound に変更 */
                    icon : "s-icon-star-full", /*変更しない*/
                    icon_color : "#FFFF99", /*変更しない*/
                    category : "plugin", /*変更しない*/
                },
                
                /*変更しない*/
                param_view : {
                },
            
                /* コンポーネントのパラメータを定義していきます */
                param:{
                    
                    /*パラメータを指定します。storageはパラメータ名を表しています。*/
                    /*画像選択の例*/
                    str : {
                        type : "SoundSelect",   /*パラメータのタイプです。これは画像選択の場合*/
                        file_path : "bgm/", /* 効果音の場合はsoundに変更 */
                        name : TB.$.s("BGMの選択"),
                        vital : true, //必須かどうか
                        default_val : "",
                    },
                    
                    vol : {
                        type : "Num",
                        name : TB.$.s("音量"),
                        unit : TB.$.s("%"),
                        validate : {
                            number : true
                        },
                        spinner : {
                            min : 0,
                            max : 100,
                            step : 5
                        },
                        default_val : 50
                    },
                    loop : {
                        type : "Check",
                        text : TB.$.s("ループ再生する"),
                        default_val : "true",
                        name : "",
                    },
                    time : {
                        type : "Num",
                        name : TB.$.s("フェードイン時間"),
                        unit : TB.$.s("ﾐﾘ秒"),
                        validate : {
                            number : true
                        },
                        spinner : {
                            min : 0,
                            max : 99999,
                            step : 100
                        },
                        default_val : 1000
                    },
                    buf : {
                        type : "Num",
                        name : TB.$.s("再生リスト番号"),
                        validate : {
                            number : true
                        },
                        spinner : {
                            min : 0,
                            max : 100,
                            step : 1
                        },
                        default_val : 0
                    },
                    
                },
            
            }
            
        };
        
        cmp["lseresume"] = {
            
            "info":{
                
                "default":true, /*trueを指定するとコンポーネントがデフォルトで配置されます。*/
                "name":TB.$.s("ループSE再生再開"), /* コンポーネント名称 */
                "help":TB.$.s("一時停止したSEの再生を再開します"), /* コンポーネントの説明を記述します */ 
                "icon":TB.$.s("s-icon-star-full") /* ここは変更しないでください */
                
            },
            
            /* コンポーネントの情報の詳細を定義します */
            
            "component":{
                
                name : TB.$.s("ループSE再生再開"), /* コンポーネント名称 */

                header : function(obj) {
                    
                    return obj.data.pm.storage;
                    
                },

                component_type : "Sound", /*タイムラインのコンポーネントタイプ Simple Movie Image Text Soundが指定可能 */
                
                /*ビューに渡す値*/
                default_view : {
                    base_sound_url : "data/bgm/", /* soundフォルダから選択させる場合は data/sound に変更 */
                    icon : "s-icon-star-full", /*変更しない*/
                    icon_color : "#FFFF99", /*変更しない*/
                    category : "plugin", /*変更しない*/
                },
                
                /*変更しない*/
                param_view : {
                },
            
                /* コンポーネントのパラメータを定義していきます */
                param:{
                    
                    /*パラメータを指定します。storageはパラメータ名を表しています。*/
                    /*画像選択の例*/
                    str : {
                        type : "SoundSelect",   /*パラメータのタイプです。これは画像選択の場合*/
                        file_path : "bgm/", /* 効果音の場合はsoundに変更 */
                        name : TB.$.s("BGMの選択"),
                        vital : true, //必須かどうか
                        default_val : "",
                    },
                    
                    vol : {
                        type : "Num",
                        name : TB.$.s("音量"),
                        unit : TB.$.s("%"),
                        validate : {
                            number : true
                        },
                        spinner : {
                            min : 0,
                            max : 100,
                            step : 5
                        },
                        default_val : 50
                    },
                    loop : {
                        type : "Check",
                        text : TB.$.s("ループ再生する"),
                        default_val : "true",
                        name : "",
                    },
                    time : {
                        type : "Num",
                        name : TB.$.s("フェードイン時間"),
                        unit : TB.$.s("ﾐﾘ秒"),
                        validate : {
                            number : true
                        },
                        spinner : {
                            min : 0,
                            max : 99999,
                            step : 100
                        },
                        default_val : 1000
                    },
                    buf : {
                        type : "Num",
                        name : TB.$.s("再生リスト番号"),
                        validate : {
                            number : true
                        },
                        spinner : {
                            min : 0,
                            max : 100,
                            step : 1
                        },
                        default_val : 0
                    },
                    
                },
            
            }
            
        };
        
        cmp["lbgmvol"] = {
            
            "info":{
                
                "default":true, /*trueを指定するとコンポーネントがデフォルトで配置されます。*/
                "name":TB.$.s("ループBGM音量変更"), /* コンポーネント名称 */
                "help":TB.$.s("再生中のBGMの音量を変更します"), /* コンポーネントの説明を記述します */ 
                "icon":TB.$.s("s-icon-star-full") /* ここは変更しないでください */
                
            },
            
            /* コンポーネントの情報の詳細を定義します */
            
            "component":{
                
                name : TB.$.s("ループBGM音量変更"), /* コンポーネント名称 */

                header : function(obj) {
                    
                    return obj.data.pm.storage;
                    
                },

                component_type : "Simple", /*タイムラインのコンポーネントタイプ Simple Movie Image Text Soundが指定可能 */
                
                /*ビューに渡す値*/
                default_view : {
                    base_sound_url : "data/bgm/", /* soundフォルダから選択させる場合は data/sound に変更 */
                    icon : "s-icon-star-full", /*変更しない*/
                    icon_color : "#FFFF99", /*変更しない*/
                    category : "plugin", /*変更しない*/
                },
                
                /*変更しない*/
                param_view : {
                },
            
                /* コンポーネントのパラメータを定義していきます */
                param:{
                    
                    vol : {
                        type : "Num",
                        name : TB.$.s("変更後の音量"),
                        unit : TB.$.s("%"),
                        validate : {
                            number : true
                        },
                        spinner : {
                            min : 0,
                            max : 100,
                            step : 5
                        },
                        vital : true, //必須かどうか
                        default_val : 50
                    },

                    time : {
                        type : "Num",
                        name : TB.$.s("フェード時間"),
                        unit : TB.$.s("ﾐﾘ秒"),
                        validate : {
                            number : true
                        },
                        spinner : {
                            min : 0,
                            max : 99999,
                            step : 100
                        },
                        default_val : 1000
                    },
                    buf : {
                        type : "Num",
                        name : TB.$.s("再生リスト番号"),
                        validate : {
                            number : true
                        },
                        spinner : {
                            min : 0,
                            max : 100,
                            step : 1
                        },
                        default_val : 0
                    },
                    
                },
            
            }
            
        };
        
        cmp["lsevol"] = {
            
            "info":{
                
                "default":true, /*trueを指定するとコンポーネントがデフォルトで配置されます。*/
                "name":TB.$.s("ループSE音量変更"), /* コンポーネント名称 */
                "help":TB.$.s("再生中のSEの音量を変更します"), /* コンポーネントの説明を記述します */ 
                "icon":TB.$.s("s-icon-star-full") /* ここは変更しないでください */
                
            },
            
            /* コンポーネントの情報の詳細を定義します */
            
            "component":{
                
                name : TB.$.s("ループSE音量変更"), /* コンポーネント名称 */

                header : function(obj) {
                    
                    return obj.data.pm.storage;
                    
                },

                component_type : "Simple", /*タイムラインのコンポーネントタイプ Simple Movie Image Text Soundが指定可能 */
                
                /*ビューに渡す値*/
                default_view : {
                    base_sound_url : "data/sound/", /* soundフォルダから選択させる場合は data/sound に変更 */
                    icon : "s-icon-star-full", /*変更しない*/
                    icon_color : "#FFFF99", /*変更しない*/
                    category : "plugin", /*変更しない*/
                },
                
                /*変更しない*/
                param_view : {
                },
            
                /* コンポーネントのパラメータを定義していきます */
                param:{
                    
                    vol : {
                        type : "Num",
                        name : TB.$.s("変更後の音量"),
                        unit : TB.$.s("%"),
                        validate : {
                            number : true
                        },
                        spinner : {
                            min : 0,
                            max : 100,
                            step : 10
                        },
                        vital : true, //必須かどうか
                        default_val : 50
                    },

                    time : {
                        type : "Num",
                        name : TB.$.s("フェード時間"),
                        unit : TB.$.s("ﾐﾘ秒"),
                        validate : {
                            number : true
                        },
                        spinner : {
                            min : 0,
                            max : 99999,
                            step : 100
                        },
                        default_val : 1000
                    },
                    buf : {
                        type : "Num",
                        name : TB.$.s("再生リスト番号"),
                        validate : {
                            number : true
                        },
                        spinner : {
                            min : 0,
                            max : 100,
                            step : 1
                        },
                        default_val : 0
                    },
                    
                },
            
            }
            
        };  
                
        return cmp;
    
        
    }
    
    test(){
        
        
    }
        
}

