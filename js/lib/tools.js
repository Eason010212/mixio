define(function(require, exports, module){
    var dialog = require("artdialog/src/dialog")
    function IsPC() {
        var userAgentInfo = navigator.userAgent;
        var Agents = ["Android", "iPhone",
                    "SymbianOS", "Windows Phone",
                    "iPad", "iPod"];
        var flag = true;
        for (var v = 0; v < Agents.length; v++) {
            if (userAgentInfo.indexOf(Agents[v]) > 0) {
                flag = false;
                break;
            }
        }
        return flag;
    }
    function getQueryString(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]); return null;
    } 
    var unique = 0
    function randomString(){
        unique = unique+1
        return (new Date()).valueOf()+""+unique
    }
    function Uint8ArrayToString(fileData){
        var dataString = "";
        for (var i = 0; i < fileData.length; i++) {
          dataString += String.fromCharCode(fileData[i]);
        }
        return dataString;
    }
    
    function getPar(par){
        var local_url = document.location.href; 
        var get = local_url.indexOf(par +"=");
        if(get == -1){
            return false;   
        }   
        var get_par = local_url.slice(par.length + get + 1);    
        var nextPar = get_par.indexOf("&");
        if(nextPar != -1){
            get_par = get_par.slice(0, nextPar);
        }
        return get_par;
    }
    
    stringendecoder = function(){
        this.REGX_HTML_ENCODE = /"|&|'|<|>|[\x00-\x20]|[\x7F-\xFF]|[\u0100-\u2700]/g;
        this.REGX_HTML_DECODE = /&\w+;|&#(\d+);/g;
        this.REGX_TRIM = /(^\s*)|(\s*$)/g;
        this.HTML_DECODE = {
            "&lt;" : "<", 
            "&gt;" : ">", 
            "&amp;" : "&", 
            "&nbsp;": " ", 
            "&quot;": "\"", 
            "&copy;": ""
        };
        this.encodeHtml = function(s){
            s = (s != undefined) ? s : this.toString();
            return (typeof s != "string") ? s :
                s.replace(this.REGX_HTML_ENCODE, 
                          function($0){
                              var c = $0.charCodeAt(0), r = ["&#"];
                              c = (c == 0x20) ? 0xA0 : c;
                              r.push(c); r.push(";");
                              return r.join("");
                          });
        };
        this.decodeHtml = function(s){
            var HTML_DECODE = this.HTML_DECODE;
            s = (s != undefined) ? s : this.toString();
            return (typeof s != "string") ? s :
                s.replace(this.REGX_HTML_DECODE,
                          function($0, $1){
                              var c = HTML_DECODE[$0];
                              if(c == undefined){
                                  if(!isNaN($1)){
                                      c = String.fromCharCode(($1 == 160) ? 32:$1);
                                  }else{
                                      c = $0;
                                  }
                              }
                              return c;
                          });
        };
        this.trim = function(s){
            s = (s != undefined) ? s : this.toString();
            return (typeof s != "string") ? s :
                s.replace(this.REGX_TRIM, "");
        };
        this.hashCode = function(){
            var hash = this.__hash__, _char;
            if(hash == undefined || hash == 0){
                hash = 0;
                for (var i = 0, len=this.length; i < len; i++) {
                    _char = this.charCodeAt(i);
                    hash = 31*hash + _char;
                    hash = hash & hash; // Convert to 32bit integer
                }
                hash = hash & 0x7fffffff;
            }
            this.__hash__ = hash;
            return this.__hash__; 
        };
    };
    stringendecoder.call(stringendecoder)
    
    function str2utf8(str) {
        return eval('\''+encodeURI(str).replace(/%/gm, '')+'\'').toLowerCase();
    }
    
    function showtext(text){
        var d = dialog({
            content: "<span class='nnt'>"+text+"</span>",
            quickClose: true
        });
        d.showModal();
        setTimeout(function(){
            d.close().remove();
        },1000)
    }
    
    function showmodaltext(text){
        var d = dialog({
            content: text
        });
        d.showModal();
        return d
    }
    
    function timeStamp2String(){
        var datetime = new Date();
        var year = datetime.getFullYear();
        var month = datetime.getMonth() + 1 < 10 ? "0" + (datetime.getMonth() + 1) : datetime.getMonth() + 1;
        var date = datetime.getDate() < 10 ? "0" + datetime.getDate() : datetime.getDate();
        var hour = datetime.getHours()< 10 ? "0" + datetime.getHours() : datetime.getHours();
        var minute = datetime.getMinutes()< 10 ? "0" + datetime.getMinutes() : datetime.getMinutes();
        var second = datetime.getSeconds()< 10 ? "0" + datetime.getSeconds() : datetime.getSeconds();
        return year + "-" + month + "-" + date+" "+hour+":"+minute+":"+second;
    }
    
    function getByteLen(val) {
        var len = 0;
        for (var i = 0; i < val.length; i++) {
          var a= val.charAt(i);
          if (a.match(/[^\x00-\xff]/ig) != null) {
            len += 2;
          }else {
            len += 1;
          }
        }
        return len;
    }
    
    function HEX2DEC(hex){
        return parseInt(hex,16).toString();
    }
    function HEX2RGB(hex){
        hex = hex.substring(1);
        if(hex.length === 3){
           hex += hex;
        }
        return [HEX2DEC(hex.substring(0,2)),HEX2DEC(hex.substring(2,4)),HEX2DEC(hex.substring(4))];
    }
    
    function RGB2Hex(r,g,b) {
        var hex = "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
        return hex;
    }
    
    function countSubstr(str, substr, isIgnore) {
        var count;
        var reg = "";
        substr2 = substr.replaceAll('\/','\\/')
        console.log(substr2)
        if (isIgnore == true) {
            reg = "/" + substr2 + "/gi";
        } else {
            reg = "/" + substr2 + "/g";
        }
        reg = eval(reg);
        if (str.match(reg) == null) {
            count = 0;
        } else {
            count = str.match(reg).length;
        }
        return count;
    }
    
    
    
    
    window.onerror = function (msg, url, lineNo, columnNo, error) {
        if((typeof globalProjectName)!="undefined")
            stop_project()
        var editForm = $('<div class="nnt" style="width:294px"/>')
        editForm.append($('<div style="margin-top:-63px;margin-left:105px;margin-bottom:15px;box-shadow: 1px 1px 20px #4e73df;background-color:white;width:75px;height:75px;padding:40px;border-radius:80px;border:solid #4e73df 3px;display:flex;align-items:center;justify-content:center"><img src="icons/crash.svg" style="width:45px;"></div>'))
        editForm.append($('<h3 style="text-align:center;margin-bottom:5px">出错了</h3>'))
        editForm.append($('<h6 style="text-align:center;margin-bottom:10px">请复制以下信息，发送给管理员</h6>'))
        console.log(msg)
        var string = msg.toLowerCase();
        var substring = "script error";
        if (string.indexOf(substring) > -1) {
            editForm.append('<p>Script Error: See Browser Console for Detail</p>');
        } else {
            var message = [
                '<b>User: </b>' + ((typeof globalUserName)=="undefined"?"undefined":globalUserName),
                '<b>Project: </b>' + ((typeof globalProjectName)=="undefined"?"undefined":globalProjectName),
                '<b>Message: </b>' + msg,
                '<b>URL: </b>' + url,
                '<b>Line: </b>' + lineNo,
                '<b>Column: </b>' + columnNo,
                '<b>Error object: </b>' + JSON.stringify(error)
            ].join('<br>');
            var p = $("<p></p>")
            p.html(message)
            editForm.append(p)
        }
        var bottomDiv = $('<div style="width:100%;margin-top:15px;display:flex;flex-direction:row;align-items:center;justify-content:space-around"/>')
        var cancelEdit = $('<a class="btn btn-danger btn-circle" style="box-shadow:1px 1px 5px #e74a3b"><i class="fa fa-arrow-left"></i></a>')
        cancelEdit.click(function(){
            modifyDia.close()
        })
        bottomDiv.append(cancelEdit)
        editForm.append(bottomDiv)
        var modifyDia = dialog({
            content:editForm[0],
            cancel:false
        })
        modifyDia.showModal()
        return false;
    }
    $(function(){
        String.prototype.replaceAll = function(s1,s2){
            return this.replace(new RegExp(s1,"gm"),s2);
        }
        function isIE() {
            if(!!window.ActiveXObject || "ActiveXObject" in window){
              return true;
            }else{
              return false;
        　　 }
        }
        if(isIE())
        {
            var editForm = $('<div class="nnt" style="width:294px"/>')
            editForm.append($('<div style="margin-top:-63px;margin-left:105px;margin-bottom:15px;box-shadow: 1px 1px 20px #4e73df;background-color:white;width:75px;height:75px;padding:40px;border-radius:80px;border:solid #4e73df 3px;display:flex;align-items:center;justify-content:center"><img src="icons/crash.svg" style="width:45px;"></div>'))
            editForm.append($('<h3 style="text-align:center;margin-bottom:5px">出错了</h3>'))
            editForm.append($('<h6 style="text-align:center;margin-bottom:10px">浏览器版本过低，无法正常使用MixIO平台，请您更新至最新版的Chrome、Edge、Firefox或Safari浏览器。</h6>'))
            var modifyDia = dialog({
                content:editForm[0],
                cancel:false
            })
            modifyDia.showModal()
        }
    })
    module.exports = {
        showtext: showtext
    }
})