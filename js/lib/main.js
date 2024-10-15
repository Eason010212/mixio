define(function(require, exports, module) {

    // 通过 require 引入依赖
    var $ = require('jquery');
    var tools = require('tools');
    $("#copypass").click(function(){
        projectPass = $("#prjpass").text()
        var input = document.createElement('input');
        document.body.appendChild(input);
        input.setAttribute('value', projectPass);
        input.select();
        if (document.execCommand('copy')) {
            document.execCommand('copy');
        }
        document.body.removeChild(input);
        tools.showtext("密钥信息已复制到剪贴板")
    })
    module.exports = {}
});

  