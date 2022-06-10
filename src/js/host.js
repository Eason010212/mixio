MixIO.log = console.log
stop_project = function () {
    console.log('stop_project')
}
var lastPublishTime = [new Date(0), new Date(0), new Date(0), new Date(0), new Date(0), new Date(0), new Date(0), new Date(0), new Date(0), new Date(0), new Date(0), new Date(0), new Date(0), new Date(0), new Date(0), new Date(0), new Date(0), new Date(0), new Date(0), new Date(0)]
var minPublishInterval = 500

function isJSON(str) {
    if (typeof str == 'string') {
        try {
            var obj = JSON.parse(str);
            if (typeof obj == 'object' && obj) {
                return true;
            } else {
                return false;
            }

        } catch (e) {
            return false;
        }
    }
}

function publish(topic, message, omit) {
    if (isRunning || omit) {
        var newPublishTime = new Date()
        if (newPublishTime - lastPublishTime[0] >= minPublishInterval) {
            if (!isMixly)
                client.publish(globalUserName + '/' + globalProjectName + '/' + topic, message)
            else
                client.publish('MixIO' + '/' + globalUserName.slice(1) + '/' + globalProjectName + '/' + topic, message)
            lastPublishTime.shift()
            lastPublishTime.push(new Date())
        } else {
            showtext(JSLang[lang].speedLimit)
            MixIO.log(JSLang[lang].speedLimit)
        }
    }
}
isRunning = true;
isMixly = false;
$(function () {
    init_layout();
    get_width();
    function view_project(resJSON, userName, projectPass, projectName) {
        randomClientID = 'OBGuest_' + Math.random().toString(16).substr(2, 8)
        globalUserName = userName
        globalProjectName = projectName
        client = mqtt.connect('ws://' + window.location.host + ':8083/mqtt', {
            'clientId': randomClientID,
            'username': userName,
            'password': projectPass
        })
        client.subscribe(userName + '/' + projectName + '/#')
        var prev_layout = stringendecoder.decodeHtml(resJSON.layout_info)
        var units_array = $(prev_layout)
        for (var ct = 0; ct <= units_array.length - 1; ct = ct + 1) {
            var un = $(units_array[ct])
            var toolkits = {
                'input_button': add_button,
                'input_slider': add_slider,
                'input_keyboard': add_keyboard,
                'input_controller': add_controller,
                'input_rgb': add_rgb,
                'output_bulb': add_bulb,
                'output_text': add_text,
                'output_chart': add_chart,
                'output_bar': add_bar,
                'output_dashboard': add_dashboard,
                'output_map': add_map,
                'input_weather': add_weather,
                'table': add_table,
                'decorate_text': add_decorate_text,
                'decorate_pic': add_decorate_pic
            }
            console.log(un.attr('user-type'))
            toolkits[un.attr('user-type')](un.attr('user-title'), un.attr('user-topic'), un.attr('user-content'), un.attr('style'));
        }
    }
    var modald = showmodaltext("<div style='text-align:center' class='nnt'><i class='fa fa-spin fa-cog' style='font-size:2rem;color:#4e73df'></i><p style='margin-top:6px;margin-bottom:0;color:#4e73df;font-size:1rem;font-weight:bold'>" + JSLang[lang].loading + "</p></div>")
    var userName = getPar("userName")
    var projectName = getPar("projectName")
    var projectPass = getPar("projectPass")
    $.post('/getHostProject',{
        'userName':userName,
        'projectName':projectName,
        'projectPass':projectPass
    },function(res){
        var projectLayout = JSON.parse(JSON.parse(res).projectLayout)
        var projectPass = JSON.parse(res).projectPass
        view_project(projectLayout, userName, projectPass, projectName)
        if (JSON.parse(res).logicStorage)
            globalCode = stringendecoder.decodeHtml(JSON.parse(JSON.parse(res).logicStorage).code)
        else
            globalCode = ''
        $("#grid").removeClass("gridbg")
        $("#grid").children(".item").addClass("itemrun")
        $("#grid").children(".item").draggable({
            disabled: true
        })
        $("#grid").children("[user-type='output_chart']").resizable({
            disabled: true
        })
        $("#grid").children("[user-type='output_bar']").resizable({
            disabled: true
        })
        $("#grid").children("[user-type='output_map']").resizable({
            disabled: true
        })
        $("#grid").children("[user-type='table']").resizable({
            disabled: true
        })
        $("#grid").children("[user-type='output_chart']").removeClass("moveDiv")
        $("#grid").children("[user-type='output_bar']").removeClass("moveDiv")
        $("#grid").children("[user-type='table']").removeClass("moveDiv")
        $("#grid").children("[user-type='output_map']").removeClass("moveDiv")
        modald.close()
        try {
            var logicFunction = Function(globalCode);
            logicFunction()
        } catch (e) {
            showtext(JSLang[lang].logicError)
            return false;
        }
    })
    
})
function save_layout(){
    var layout_info = grid.html()
    var layout_and_time_info = {
        'update_time': timeStamp2String(),
        'layout_info': stringendecoder.encodeHtml(layout_info)
    }
    var layout_JSON = JSON.stringify(layout_and_time_info)
    $.post('saveLay',{'layout':layout_JSON,'projectName':globalProjectName,'userName':globalUserName},function(res){
        if(res==1){
            console.log('1')
        }
        else{
            console.log('-1')
        }
    })
}