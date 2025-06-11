MixIO.log = console.log
stop_project = console.log('stop_project')
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
$(function() {
    init_layout();
    get_width();

    function view_project(resJSON, userName, projectPass, projectName, timeStamp) {
        $("#prjName").html(projectName)
        $("#shareMessage").html(userName + JSLang[lang].shareAt + timeStamp)
        randomClientID = 'OBGuest_' + Math.random().toString(16).substr(2, 8)
        globalUserName = userName
        globalProjectName = projectName
        client = mqtt.connect((location.protocol == 'https:' ? 'wss://' : 'ws://') + window.location.host + ":" + (location.protocol == 'https:' ? MIXIO_WSS_PORT : MIXIO_WS_PORT) + '/mqtt', {
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
                'decorate_pic': add_decorate_pic,
                'magic': add_magic,
                'ble': add_ble,
                'pixel': add_pixel,
                'input_mic': add_mic,
                'tinydb': add_tinydb,
                'timer': add_timer,
                'trigger': add_trigger,
                'camera': add_camera,
                'face': add_face,
                'ocr': add_ocr,
                'qr': add_qr
            }
            console.log(un.attr('user-type'))
            toolkits[un.attr('user-type')](un.attr('user-title'), un.attr('user-topic'), un.attr('user-content'), un.attr('style'), un.attr('title_style'), true);
        }
    }
    var modald = showmodaltext("<div style='text-align:center' class='nnt'><i class='fa fa-spin fa-cog' style='font-size:2rem;color:#4e73df'></i><p style='margin-top:6px;margin-bottom:0;color:#4e73df;font-size:1rem;font-weight:bold'>" + JSLang[lang].loading + "</p></div>")
    if (getPar("sid")) {
        $.get('fetchObserve', { 'sid': stringendecoder.encodeHtml(getPar("sid")) }, function(res) {
            if (res != -1) {
                view_project(JSON.parse(JSON.parse(res).projectLayout), JSON.parse(res).userName, JSON.parse(res).projectPass, JSON.parse(res).projectName, JSON.parse(res).timeStamp)
                if (JSON.parse(res).logicStorage)
                    globalCode = MixIO.preCode + stringendecoder.decodeHtml(JSON.parse(JSON.parse(res).logicStorage).code)
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
                var forceHide = setInterval(function() {
                    $(".facial").attr("hidden", "hidden")
                    $("#grid").children(".item").draggable({
                            disabled: true
                        })
                        // 设置jsgrid为不可编辑
                    $(".jsgrid").each(function() {
                        $(this).jsGrid("option", "editing", false);
                        $(this).jsGrid("option", "inserting", false);
                        $(this).jsGrid("option", "deleting", false);
                        $(this).find(".jsgrid-button").hide();
                        // 如果存在.jsgrid-button且已经隐藏，则取消forceHide事件
                        if ($(this).find(".jsgrid-button").is(":hidden")) {
                            clearInterval(forceHide);
                        }
                    })
                }, 500)

                modald.close()
                try {
                    var logicFunction = Function(globalCode);
                    logicFunction()
                } catch (e) {
                    showtext(JSLang[lang].logicError)
                    return false;
                }
            } else {
                modald.close()
                showmodaltext(JSLang[lang].invalidAUPrj)
            }
        })
    }
})

function open_storage(){
    var editForm = $('<div class="nnt" style="width:80vw;height:80vh;display:flex;flex-direction:column"/>')
    editForm.append($('<div style="margin-top:-63px;margin-left:calc(40vw - 43px);margin-bottom:15px;box-shadow: 1px 1px 20px #4e73df;background-color:white;width:75px;height:75px;padding:40px;border-radius:80px;border:solid #4e73df 3px;display:flex;align-items:center;justify-content:center"><img src="icons/store.svg" style="width:45px;"></div>'))
    editForm.append($('<h3 style="text-align:center;margin-bottom:5px">所有发送到<span style="color:#4e73df;font-weight:bold">/storage</span>主题下的消息和图片会被自动保存</h3>'))
    var messagesContainer = $('<div style="flex:1;overflow-y:auto;padding:20px;display:grid;grid-template-columns:repeat(auto-fill, minmax(200px, 1fr));gap:15px;align-content:flex-start"/>')
    var sync_stor = function(){
        messagesContainer.empty()
        var sampleMessages = [
        ]
        $.getJSON('getImgStore', {
            'projectName': globalProjectName
        }, function(res) {
            if(res.length==0)
            {
                messagesContainer.append($('<div style="background:white;border-radius:8px;padding:15px;box-shadow:0 2px 5px rgba(0,0,0,0.1);height:150px;display:flex;flex-direction:column;align-items:center;justify-content:center">暂无存储</div>'))
            }
            for (let ri = 0; ri < res.length; ri++) {
            {
                let url = "store/" + globalUserName + "/" + globalProjectName + "/" + res[ri]
                if (url.endsWith('.txt')) {
                    sampleMessages.push({ type: 'text', content: url })
                } else{
                    sampleMessages.push({ type: 'image', content: url })
                }
            }
            }
            for(let ji = 0; ji < sampleMessages.length; ji++) {
                let msg = sampleMessages[ji]
                let messageBox = $('<div style="background:white;border-radius:8px;padding:15px;box-shadow:0 2px 5px rgba(0,0,0,0.1);height:150px;display:flex;flex-direction:column"/>')
                
                if (msg.type === 'text') {
                    $.ajax({
                        url: msg.content,
                        success: function(res) {
                            messageBox.append($('<div style="font-size:14px;word-break:break-all;height:100px"/>').text(res))
                            // Add timestamp (sample)
                            let timeStamp = parseInt(msg.content.split("/")[msg.content.split("/").length - 1].split(".")[0])
                            let timeString = new Date(timeStamp).toLocaleString()
                            let btdiv = $('<div style="font-size:11px;color:#999;margin-top:10px;text-align:right"></div>')
                            btdiv.append("<span>" + timeString +"</span>")
                            let deletebtn = $('<a class="btn btn-danger btn-sm" style="margin-left:10px"><i class="fa fa-trash"></i></a>')
                            deletebtn.click(function(){
                                $.getJSON('deleteImgStore', {
                                    'projectName': globalProjectName,
                                    'filename': msg.content.split("/")[msg.content.split("/").length - 1]
                                }, function(){
                                    sync_stor()
                                })
                            })
                            btdiv.append(deletebtn)
                            messageBox.append(btdiv)
                        }
                    })
                } else if (msg.type === 'image') {
                    messageBox.append($('<div style="width:100%;height:100px;text-align:center;overflow:hidden"/><img src="' + msg.content + '" style="max-width:100%;max-height:100px;object-fit:contain;margin:auto"/></div>'))
                    // Add timestamp (sample)
                    let timeStamp = parseInt(msg.content.split("/")[msg.content.split("/").length - 1].split(".")[0])
                    let timeString = new Date(timeStamp).toLocaleString()
                    let btdiv = $('<div style="font-size:11px;color:#999;margin-top:10px;text-align:right"></div>')
                    btdiv.append("<span>" + timeString +"</span>")
                    let viewbtn = $('<a class="btn btn-primary btn-sm" style="margin-left:10px"><i class="fa fa-eye"></i></a>')
                    viewbtn.click(function(){
                        // 全屏显示图片，点击任意退出
                        let fullDialog = dialog({
                            content: $('<div style="width:60vw;height:60vh;display:flex;align-items:center;justify-content:center"><img src="' + msg.content + '" style="max-width:100%;max-height:100%"/></div>')[0],
                            cancel: true,
                            cancelValue: '关闭'
                        })
                        fullDialog.showModal()
                        
                    })
                    let deletebtn = $('<a class="btn btn-danger btn-sm" style="margin-left:10px"><i class="fa fa-trash"></i></a>')
                    deletebtn.click(function(){
                        $.getJSON('deleteImgStore', {
                            'projectName': globalProjectName,
                            'filename': msg.content.split("/")[msg.content.split("/").length - 1]
                        }, function(){
                            sync_stor()
                        })
                    })
                    btdiv.append(viewbtn)
                    btdiv.append(deletebtn)
                    messageBox.append(btdiv)
                }
                messagesContainer.prepend(messageBox)
            }
        })
    }
    editForm.append(messagesContainer)
    sync_stor()
    client.on('message', function(topic, msg) {
        if(topic.split("/")[2] == "storage")
            sync_stor()
    })
    // Bottom section
    var bottomDiv = $('<div style="width:100%;margin-top:15px;display:flex;flex-direction:row;align-items:center;justify-content:space-around"/>')
    var cancelEdit = $('<a class="btn btn-danger btn-circle" style="box-shadow:1px 1px 5px #e74a3b"><i class="fa fa-arrow-left"></i></a>')
    bottomDiv.append(cancelEdit)
    editForm.append(bottomDiv)
    
    var modifyDia = dialog({
        content: editForm[0],
        cancel: false
    })
    
    cancelEdit.click(function() {
        modifyDia.close().remove()
    })
    
    modifyDia.showModal()
}