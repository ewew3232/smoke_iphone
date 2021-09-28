【myscript.js】
var myobj = {
 config: function(){
 if (tyrano.plugin.kag.tmp.sleep_game != null) {
 return false;
 }
 tyrano.plugin.kag.ftag.startTag("sleepgame",{storage:"config.ks",next:false});
 setTimeout(function(){
 $('.layer.layer_menu').css({'display':'none'});
 },200);
 },
};