var globalVer = "MixIO ver 1.11.24"
var isChanged = false;
var globalBLE = {}
function copy(obj) {
    return JSON.parse(JSON.stringify(obj))
}
globalGottenScripts = [];
(function () {
    $.getScript = function(url, callback, cache)
    {
        if(globalGottenScripts.indexOf(url) != -1)
        {
            callback();
            return;
        }
        globalGottenScripts.push(url);
        $.ajax({
                type: "GET",
                url: url,
                success: callback,
                dataType: "script",
                cache: cache
        });
    };
})();
$(function() {
    if ('_cordovaNative' in window) {
        var scriptcordova = document.createElement('script');
        scriptcordova.async = false;
        scriptcordova.src = "https://injection/www/cordova.js";
        document.head.appendChild(scriptcordova);
    }
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
        showtext("密钥信息已复制到剪贴板")
    })
})
$(function() {
    get_width();
    activeExit = false;
    currentPage = 0;
    pageCount = 1;
    get_projects(currentPage);
    window.onbeforeunload = function() {
        if (!activeExit)
            if ((typeof globalProjectName) != "undefined") {
                save_layout();
            }
    };
    /*
    if (Math.random() > 0.6) {
        var d = dialog({
            title: '限时推广',
            content: '<div style="width:250px">尊敬的MixIO用户，您好！<br>现邀请您参与《MixIO平台技术接受度调查》，共计10题，预计用时5-8分钟。您的作答数据将被用于科学研究和平台改进设计，感谢您的参与！ <a href="https://wj.qq.com/s2/11118283/89a9/">点击此处进入调查</a></div>',
            cancelValue: '我知道了',
            cancel: function() {}
        });
        d.showModal();
    }
    */
})

const DATA_MODE = 0;
const PROJ_MODE = 1;
const LOGIC_MODE = 2;
const SERVER_CONNECTED = 0;
const SERVER_CONNECTING = 1;
const SERVER_DISCONNECTED = 2;

var isCode = true;

var globalProjectType = DATA_MODE;
var globalTableProjectInfo = {
    received: {},
    toBeSent: "",
    toBeSentJSON: "",
    currentTp: '$',
    currentTp2: ""
}
var globalXML = '';
var isRunning = false;
var connected_hardwares = [];
var connected = SERVER_CONNECTING;
var globalCode = ''

var dataManage = function() {
    window.location.href = 'storage'
}

var hidePass = function() {
    $("#prjpass").attr("hidden", "hidden");
    $("#prjpass_hidden").removeAttr("hidden");
}

var showPass = function() {
    $("#prjpass_hidden").attr("hidden", "hidden");
    $("#prjpass").removeAttr("hidden");
}

function edit_project(prjName, prjType) {
    var projectName = prjName
    var content = $("<div class='nnt'/>")
    content.append("<div style='margin-top:-63px;margin-left:82.5px;margin-bottom:15px;box-shadow: 1px 1px 20px #4e73df;background-color:white;width:75px;height:75px;padding:40px;border-radius:80px;border:solid #4e73df 3px;display:flex;align-items:center;justify-content:center'><img src='icons/modify.svg' style='width:45px;'></div>");
    content.append($("<p style='text-align:center;font-size:1.5rem;margin-bottom:15px;max-width:250px;overflow:hidden;text-overflow: ellipsis;white-space: nowrap;'>" + JSLang[lang].modify + "'" + projectName + "'</p>"))
    var form = $("<form method='post' style='margin:0;width:250px;display:flex;flex-direction:column;align-items:center;justify-content:center'>");
    content.append(form)
    var change_project_button = $('<a class="btn btn-primary btn-icon-split btn-lg" style="margin:10px"><span class="icon text-white-50"><i class="fa fa-pencil" style="margin-top:5px"></i></span><span class="text" style="width:8rem">' + JSLang[lang].rename + '</span></a>')
    change_project_button.click(function() {
        var content = $("<div class='nnt'/>")
        content.append("<div style='margin-top:-63px;margin-left:82.5px;margin-bottom:15px;box-shadow: 1px 1px 20px #4e73df;background-color:white;width:75px;height:75px;padding:40px;border-radius:80px;border:solid #4e73df 3px;display:flex;align-items:center;justify-content:center'><img src='icons/create_prj.svg' style='width:45px;'></div>");
        content.append($("<p style='text-align:center;font-size:1.5rem;margin-bottom:15px'>" + JSLang[lang].renamePrj + "</p>"))
        var form = $("<form method='post' style='margin:0'>");
        content.append(form)
        var formDiv = $("<div class='col-xs-9'/>")
        form.append(formDiv)
        var formGrp = $("<div class='form-group'>")
        formDiv.append(formGrp)
        var prjName = $("<input type='text' class='form-control form-control-user' style='text-align:center' name='projectName' class='form-control' placeholder='" + JSLang[lang].newPrjName + "'/>");
        prjName.val(projectName)
        formGrp.append(prjName)
        var btDiv = $("<div class='col-xs-3'/>")
        var innerBtDiv = $("<div style='display:flex;width:100%;flex-direction:row;align-items:center;justify-content:space-around'/>")
        form.append(btDiv)
        btDiv.append(innerBtDiv)
        var submitBt = $("<a class='btn btn-primary btn-circle' style='box-shadow:1px 1px 5px #4e73df;margin-left:40px'><i class='fa fa-check'></i></a>")
        var cancelBt = $("<a class='btn btn-danger btn-circle' style='box-shadow:1px 1px 5px #e74a3b;margin-right:40px'><i class='fa fa-arrow-left'></i></a>")
        innerBtDiv.append(submitBt)
        innerBtDiv.append(cancelBt)
        submitBt.click(function() {
            if (prjName.val().length < 3 || prjName.val().length > 10) {
                showtext(JSLang[lang].lengthRes)
            } else {
                submitBt.attr("disabled", "disabled")
                $.getJSON('renameProject', {
                    'oldProjectName': projectName,
                    'newProjectName': prjName.val()
                }, function(res) {
                    if (res == 1) {
                        window.location.href = "projects"
                    } else {
                        submitBt.removeAttr("disabled")
                        showtext(JSLang[lang].prjExist)
                    }
                })
            }
        });
        var d = dialog({
            'content': content[0]
        })
        cancelBt.click(function() {
            d.close().remove()
        })
        d.showModal();
    })
    var copy_project_button = $('<a class="btn btn-success btn-icon-split btn-lg" style="margin:10px"><span class="icon text-white-50"><i class="fa fa-copy" style="margin-top:5px"></i></span><span class="text" style="width:8rem">' + JSLang[lang].copy + '</span></a>')
    copy_project_button.click(function() {
        var content = $("<div class='nnt'/>")
        content.append("<div style='margin-top:-63px;margin-left:82.5px;margin-bottom:15px;box-shadow: 1px 1px 20px #4e73df;background-color:white;width:75px;height:75px;padding:40px;border-radius:80px;border:solid #4e73df 3px;display:flex;align-items:center;justify-content:center'><img src='icons/create_prj.svg' style='width:45px;'></div>");
        content.append($("<p style='text-align:center;font-size:1.5rem;margin-bottom:15px'>" + JSLang[lang].copyName + "</p>"))
        var form = $("<form method='post' style='margin:0'>");
        content.append(form)
        var formDiv = $("<div class='col-xs-9'/>")
        form.append(formDiv)
        var formGrp = $("<div class='form-group'>")
        formDiv.append(formGrp)
        var prjName = $("<input type='text' class='form-control form-control-user' style='text-align:center' name='projectName' class='form-control' placeholder='" + JSLang[lang].newPrjName + "'/>");
        prjName.val(projectName)
        formGrp.append(prjName)
        var btDiv = $("<div class='col-xs-3'/>")
        var innerBtDiv = $("<div style='display:flex;width:100%;flex-direction:row;align-items:center;justify-content:space-around'/>")
        form.append(btDiv)
        btDiv.append(innerBtDiv)
        var submitBt = $("<a class='btn btn-primary btn-circle' style='box-shadow:1px 1px 5px #4e73df;margin-left:40px'><i class='fa fa-check'></i></a>")
        var cancelBt = $("<a class='btn btn-danger btn-circle' style='box-shadow:1px 1px 5px #e74a3b;margin-right:40px'><i class='fa fa-arrow-left'></i></a>")
        innerBtDiv.append(submitBt)
        innerBtDiv.append(cancelBt)
        submitBt.click(function() {
            if (prjName.val().length < 3 || prjName.val().length > 10) {
                showtext(JSLang[lang].lengthRes)
            } else {
                submitBt.attr("disabled", "disabled")
                $.getJSON('copyProject', {
                    'oldProjectName': projectName,
                    'newProjectName': prjName.val()
                }, function(res) {
                    if (res == 1) {
                        window.location.href = "projects"
                    } else if (res == 2) {
                        submitBt.removeAttr("disabled")
                        showtext(JSLang[lang].prjExist)
                    } else {
                        submitBt.removeAttr("disabled")
                        showtext(JSLang[lang].prjOverflow)
                    }
                })
            }
        });
        var d = dialog({
            'content': content[0]
        })
        cancelBt.click(function() {
            d.close().remove()
        })
        d.showModal();
    })
    var share_project_button = $('<a class="btn btn-info btn-icon-split btn-lg" style="margin:10px"><span class="icon text-white-50"><i class="fa fa-share" style="margin-top:5px"></i></span><span class="text" style="width:8rem">' + JSLang[lang].share + '</span></a>')
    share_project_button.click(function() {
        var content = $("<div class='nnt'/>")
        content.append("<div style='margin-top:-63px;margin-left:82.5px;margin-bottom:15px;box-shadow: 1px 1px 20px #4e73df;background-color:white;width:75px;height:75px;padding:40px;border-radius:80px;border:solid #4e73df 3px;display:flex;align-items:center;justify-content:center'><img src='icons/create_prj.svg' style='width:45px;'></div>");
        var ttl = $("<p style='text-align:center;font-size:1.5rem;margin-bottom:15px'>" + JSLang[lang].share + "</p>")
        content.append(ttl)
        var submitBt = $("<a class='btn btn-primary btn-circle' style='box-shadow:1px 1px 5px #4e73df;margin-left:40px'><i class='fa fa-check'></i></a>")
        var cancelBt = $("<a class='btn btn-danger btn-circle' style='box-shadow:1px 1px 5px #e74a3b;margin-right:40px'><i class='fa fa-arrow-left'></i></a>")
        var ctt = $("<p style='text-align:center;width:250px'>" + JSLang[lang].shareConfirm + "</p>")
        content.append(ctt)
        var resDiv = $("<div style='display:flex;flex-direction:column;align-items:center;justify-content:center'/>")
        content.append(resDiv)
        var btDiv = $("<div class='col-xs-3'/>")
        var innerBtDiv = $("<div style='display:flex;width:100%;flex-direction:row;align-items:center;justify-content:space-around'/>")
        content.append(btDiv)
        btDiv.append(innerBtDiv)
        innerBtDiv.append(submitBt)
        innerBtDiv.append(cancelBt)
        submitBt.click(function() {
            var modald = showmodaltext("<div style='text-align:center'><i class='fa fa-spin fa-cog' style='font-size:2rem;color:#4e73df'></i><p style='margin-top:6px;margin-bottom:0;color:#4e73df;font-size:1rem;font-weight:bold'>" + JSLang[lang].loading + "</p></div>")
            $.get('share', {
                'projectName': projectName
            }, function(res) {
                var link = window.location.href.split('/')
                link.pop()
                link.push("observe?sid=" + res)
                link = link.join('/')
                ttl.html(JSLang[lang].shareSuccess)
                ctt.remove()
                resDiv.append($("<span style='font-size:1.2rem;'>" + JSLang[lang].aucode + "</span>"))
                resDiv.append($("<span style='margin-bottom:8px;font-size:2rem;color:#1cc88a;font-weight:bold'>" + res + "</span>"))
                resDiv.append($("<span style='font-size:1.2rem;margin-bottom:2px'>" + JSLang[lang].guestURL + "</span>"))
                resDiv.append($("<a href='" + link + "' style='margin-bottom:3px;word-wrap: break-word;word-break: break-all;white-space: pre-wrap !important;width:250px;text-align:center'>" + link + "</a>"))
                var qrCode = $("<div style='width:100px;height:100px;margin-bottom:12px'></div>")
                resDiv.append(qrCode)
                new QRCode(qrCode[0], {
                    text: link,
                    width: 100,
                    height: 100,
                    colorDark: "#000000",
                    colorLight: "#ffffff",
                    correctLevel: QRCode.CorrectLevel.M
                })
                modald.close().remove()
                submitBt.attr("hidden", "hidden")
                cancelBt.css("margin-right", "0")
            })
        });
        var d = dialog({
            'content': content[0]
        })
        cancelBt.click(function() {
            d.close().remove()
        })
        d.showModal();
    })
    var delete_project_button = $('<a class="btn btn-warning btn-icon-split btn-lg" style="margin:10px;margin-bottom:25px"><span class="icon text-white-50"><i class="fa fa-trash" style="margin-top:5px;width:20px"></i></span><span class="text" style="width:8rem">' + JSLang[lang].delete + '</span></a>')
    delete_project_button.click(function() {
        delete_project(projectName)
    })
    form.append(change_project_button)
    form.append(copy_project_button)
    form.append(share_project_button)
    form.append(delete_project_button)
    var btDiv = $("<div class='col-xs-3'/>")
    var innerBtDiv = $("<div style='display:flex;width:100%;flex-direction:row;align-items:center;justify-content:space-around'/>")
    form.append(btDiv)
    btDiv.append(innerBtDiv)
    var cancelBt = $("<a class='btn btn-danger btn-circle' style='box-shadow:1px 1px 5px #e74a3b;'><i class='fa fa-arrow-left'></i></a>")
    innerBtDiv.append(cancelBt)
    var d = dialog({
        'content': content[0]
    })
    cancelBt.click(function() {
        d.close().remove()
    })
    d.showModal();
}

async function run_project() {
    if ((typeof Notification) != "undefined")
        Notification.requestPermission();
    isRunning = true
    $(".facial").attr("hidden", "hidden")
    try {
        var logicFunction = Function(globalCode);
        if(globalCode!="")
        {
            await init_codemirror();
            logicFunction()
        }
    } catch (e) {
        MixIO.log(e)
        showtext(JSLang[lang].logicError)
        isRunning = false;
        return false;
    }
    $("#grid").removeClass("gridbg")
    $("#grid").children(".item").addClass("itemrun")
    $("#grid").children(".item").draggable({
        disabled: true
    })
    $("#grid").children(".item").resizable({
        disabled: true
    })
    $("#grid").children(".item").removeClass("moveDiv")
    $("#top_right_button_1").attr("hidden", "hidden")
    $("#top_right_button_2_1").attr("hidden", "hidden")
    $("#top_right_button_2_2").removeAttr("hidden")
}

function stop_project() {
    isRunning = false
    $(".facial").removeAttr("hidden")
    $("#grid").addClass("gridbg")
    $("#grid").children(".item").removeClass("itemrun")
    $("#grid").children(".item").draggable({
        disabled: false
    })
    $("#grid").children(".item").resizable({
        disabled: false
    })
    $("#grid").children(".item").addClass("moveDiv")
    if (globalProjectType == PROJ_MODE)
        $("#top_right_button_1").removeAttr("hidden")
    $("#top_right_button_2_1").removeAttr("hidden")
    $("#top_right_button_2_2").attr("hidden", "hidden")
    MixIO.safe_pause()
}

function view_module() {
    showtext(JSLang[lang].blocklyDev)
        /*
        isCode = false;
        switch_mode()
        */
}

function view_code() {
    isCode = true;
    switch_mode()
}

function prev_page() {
    if (currentPage >= 1) {
        currentPage = currentPage - 1
        get_projects(currentPage)
    }
}

function next_page() {
    if (currentPage <= pageCount - 2) {
        currentPage = currentPage + 1
        get_projects(currentPage)
    }
}

function get_projects(page) {
    var modald = showmodaltext("<div style='text-align:center'><i class='fa fa-spin fa-cog' style='font-size:2rem;color:#4e73df'></i><p style='margin-top:6px;margin-bottom:0;color:#4e73df;font-size:1rem;font-weight:bold'>" + JSLang[lang].loading + "</p></div>")
    $("#prjmr").empty()
    $.getJSON('getProjects', {
        page: page
    }, function(res) {
        console.log(res)
        if (res == -1)
            window.location.href = '/logout'
        var count = 0;
        $("#prj_num").html(res['count'] + " / " + MAX_PROJECT_NUM_PER_USER)
        $("#prj_num_bar").attr("aria-valuenow", res['count'])
        $("#prj_num_bar").css("width", (res['count'] * 100 / MAX_PROJECT_NUM_PER_USER) + "%")
        pageCount = Math.ceil(res['count'] / 8);
        $("#page_count").html(currentPage + 1 + " / " + pageCount);
        $("#prev_page").removeClass("disabled")
        $("#prev_page").removeAttr("disabled")
        $("#next_page").removeClass("disabled")
        $("#next_page").removeAttr("disabled")
        if (currentPage == 0) {
            $("#prev_page").addClass("disabled")
            $("#prev_page").attr("disabled", "disabled")
        }
        if (currentPage + 1 == pageCount) {
            $("#next_page").addClass("disabled")
            $("#next_page").attr("disabled", "disabled")
        }
        delete res['count']
        res = res['rows']
        for (item in res) {
            if (res[item]['userName'][0] == '@') {
                $("#top_right_button_0").attr("hidden", "hidden")
                $("#top_right_button_-1").attr("hidden", "hidden")
                $("#share_app").remove()
                view_project('default', 0)
                $("#sidebarToggleTop").remove()
                $("#top_back_button").remove()
                $("#title_phase1").parent().remove()
                $("#title_phase2").html(JSLang[lang].prjManage)
                $("#title_phase2").css("font-weight", 400)
                $("#title_phase2").css("margin-left", "10px")
                isMixly = true
                $("#top_exit_button").removeAttr("hidden")
                break
            }
            try {
                add_prjblock(res[item]['projectName'], res[item]['projectLayout'], res[item]['timestamp'], res[item]['projectType'], res[item]['isTask'])
                count = count + 1
            } catch (e) {
                console.log(res[item])
                console.log(e)
            }
        }
        modald.close().remove()
        if (count == 0 && !isMixly)
            add_project()
    })
}

function sync_connect_status() {
    var contentDiv = $("<div style='width:230px' class='nnt'/>")
    var emqx_connection_div = $("<div style='font-size:1rem'/>")
    if (connected == 0) {
        var emqx_connection_icon = $("<i class='fa fa-link' style='color:#1cc88a'></i>")
        var emqx_connection_descrp = $("<span style='margin-left:5px'>" + JSLang[lang].connected + "</span>")
        $("#connect_span").css("color", "#1cc88a")
        $("#connect_span").html("<i class='fa fa-check-circle-o' style='margin-right:3px'></i>" + connected_hardwares.length + JSLang[lang].connectCount)
    } else if (connected == 1) {
        var emqx_connection_icon = $("<i class='fa fa-spin fa-spinner' style='color:#4e73df'></i>")
        var emqx_connection_descrp = $("<span style='margin-left:5px'>" + JSLang[lang].connecting + "</span>")
        $("#connect_span").css("color", "#858796")
        $("#connect_span").html("<i class='fa fa-spinner fa-spin' style='margin-right:3px'></i>" + JSLang[lang].connecting)
    } else if (connected == 2) {
        var emqx_connection_icon = $("<i class='fa fa-unlink' style='color:#e74a3b'></i>")
        var emqx_connection_descrp = $("<span style='margin-left:5px'>" + JSLang[lang].disconnected + "</span>")
        $("#connect_span").css("color", "#858796")
        $("#connect_span").html("<i class='fa fa-unlink' style='margin-right:3px'></i>" + JSLang[lang].disconnected)
    }
    if (connected == 0) {
        emqx_connection_div.append(emqx_connection_icon)
        emqx_connection_div.append(emqx_connection_descrp)
        var hardware_connection_div = $("<div style='font-size:1rem;margin-top:10px'/>")
        var hardware_connection_icon = $("<i class='fa fa-podcast' style='color:#1cc88a;margin-left:1px;margin-right:1px'></i>")
        var hardware_connection_descrp = $("<span style='margin-left:5px'>" + connected_hardwares.length + JSLang[lang].connectCount + "</span>")
        hardware_connection_div.append(hardware_connection_icon)
        hardware_connection_div.append(hardware_connection_descrp)
        for (hardware in connected_hardwares) {
            //Modified
            var iconName = "microchip"
            if(connected_hardwares[hardware].indexOf("wechat_")!=-1)
                iconName = "wechat"
            var hardName = $("<p style='margin:0;color:#1cc88a;font-size:0.8rem'>" + "<i class='fa fa-"+iconName+"' style='margin-right:3px'></i>" + connected_hardwares[hardware] + "</p>")
            contentDiv.append(hardName)
        }
        contentDiv.append("<p style='font-weight:bold;margin-top:10px;margin-bottom:5px;font-size:1rem'>私有凭证 Private Key</p>")
        contentDiv.append("<p style='margin:0;font-size:0.6rem'><i class='fa fa-user' style='margin-right:3px'></i>" + globalUserName + "</p>")
        contentDiv.append("<p style='margin:0;font-size:0.6rem'><i class='fa fa-lock' style='margin-right:3px'></i>" + globalProjectPass + "</p>")
        contentDiv.append("<div style='margin-top:5px;margin-bottom:0px;display:flex;flex-direction:row;align-items:center'><span style='font-weight:bold;font-size:1rem;margin-right:6px'>项目授权码 Share Key</span><a id='shareKey' onclick='shareKey()' class='btn btn-sm btn-secondary' style='padding:3px;padding-left:6px;padding-right:6px;font-size:0.8rem;border-radius:3px'>OFF</a><br></div>")
        sharekey = $("<span style='color:#1cc88a;font-weight:bold;font-size:2rem'></span>")
        contentDiv.append(sharekey)
        contentDiv.append("<p style='font-weight:bold;margin-top:5px;margin-bottom:5px;font-size:1rem'>共享链接 Share Link</p>")
        sharelink = $("<a style='font-size:1rem'></a>")
        // hover sharelink, show QR code
        sharelink.hover(function() {
            var qrCode = $("<div style='width:50px;height:50px;margin-bottom:12px'></div>")
            // let it show over the sharelink
            qrCode.css("position", "absolute")
            qrCode.css("left", "calc(50% - 25px)")
            qrCode.css("top", "100%")
            $(this).append(qrCode)
            // set width and height to 0 to avoid the QR code being too large
            new QRCode(qrCode[0], {
                text: $(this).attr("href")
            })
        }, function() {
            $(this).children("div").remove()
        })
        contentDiv.append(sharelink)
    }
    var cancelDiv = $("<div style='width:100%;text-align:center;margin-top:15px'/>")
    var cancelBt = $("<a class='btn btn-success btn-circle' style='box-shadow:1px 1px 5px #1cc88a;margin-bottom:-48px'><i class='fa fa-check'></i></a>")
    cancelBt.click(function() {
        connectStatusDia.close()
    })
    cancelDiv.append(cancelBt)
    contentDiv.append(cancelDiv)
    connectStatusDia.content(contentDiv[0])
    if (connectStatusDia.open)
        check_share_key()
}

function check_share_key() {
    if (typeof globalShareKey == 'undefined') {
        $("#shareKey").addClass('btn-secondary')
        $("#shareKey").removeClass('btn-success')
        $("#shareKey").html("OFF")
        sharekey.html("")
        sharelink.html("项目未共享授权")
        sharelink.removeAttr("href")
        sharelink.css("color","#858796")
    } else {
        $("#shareKey").removeClass('btn-secondary')
        $("#shareKey").addClass('btn-success')
        $("#shareKey").html("ON")
        sharekey.html(globalShareKey)
        sharelink.html(window.location.href.split("/")[0]+"//"+window.location.host + "/observe?sid=" + globalShareKey)
        sharelink.attr("href", window.location.href.split("/")[0]+"//"+window.location.host + "/observe?sid=" + globalShareKey)
        sharelink.css("color","#1cc88a")
    }
}

function shareKey() {
    if ($("#shareKey").html() == "OFF") {
        var modald = showmodaltext("<div style='text-align:center' class='nnt'><i class='fa fa-spin fa-cog' style='font-size:2rem;color:#4e73df'></i><p style='margin-top:6px;margin-bottom:0;color:#4e73df;font-size:1rem;font-weight:bold'>" + JSLang[lang].loading + "</p></div>")
        $.get('addShareKey', {
            'projectName': globalProjectName,
            'projectPass': globalProjectPass
        }, function(res) {
            if (res.length == 6) {
                $("#shareKey").removeClass('btn-secondary')
                $("#shareKey").addClass('btn-success')
                $("#shareKey").html("ON")
                sharekey.html(res)
                globalShareKey = res
                sharelink.html("http://"+window.location.host + "/observe?sid=" + globalShareKey)
                sharelink.attr("href", "http://"+window.location.host + "/observe?sid=" + globalShareKey)
                sharelink.css("color","#1cc88a")
            } else
                showtext(res)
            modald.close().remove()
        })
    } else {
        var modald = showmodaltext("<div style='text-align:center' class='nnt'><i class='fa fa-spin fa-cog' style='font-size:2rem;color:#4e73df'></i><p style='margin-top:6px;margin-bottom:0;color:#4e73df;font-size:1rem;font-weight:bold'>" + JSLang[lang].loading + "</p></div>")
        $.get('removeShareKey', {
            'shareid': globalShareKey
        }, function(res) {
            if (res == 1) {
                $("#shareKey").addClass('btn-secondary')
                $("#shareKey").removeClass('btn-success')
                $("#shareKey").html("OFF")
                sharekey.html("")
                globalShareKey = undefined
                sharelink.html("项目未共享授权")
                sharelink.removeAttr("href")
                sharelink.css("color","#858796")
            } else
                showtext(res)
            modald.close().remove()
            
        })

    }
}

function switch_mode() {
    grid.on("contextmenu", function(e) {
        e.preventDefault()
    })
    grid.removeAttr("hidden")
    grid2.removeAttr("hidden")
    grid3.removeAttr("hidden")
    
    if (globalProjectType == DATA_MODE) {
        $("#projMode").removeClass("btn-primary")
        $("#projMode").addClass("btn-light")
        $("#projMode").css("color", "#4e73df")
        $("#logicMode").removeClass("btn-primary")
        $("#logicMode").addClass("btn-light")
        $("#logicMode").css("color", "#4e73df")
        $("#dataMode").removeClass("btn-light")
        $("#dataMode").addClass("btn-primary")
        $("#dataMode").css("color", "#fff")
        grid.css("height", 0)
        grid2.css("height", "calc(100vh - 4.375rem)")
        grid3.css("height", 0)
        $("#top_right_button_1").attr("hidden", "hidden")
        $("#top_right_button_2_1").attr("hidden", "hidden")
        $("#top_right_button_2_2").attr("hidden", "hidden")
        $("#top_right_button_1_" + (isCode ? 2 : 3)).attr("hidden", "hidden")
    } else if (globalProjectType == PROJ_MODE) {
        $("#dataMode").removeClass("btn-primary")
        $("#dataMode").addClass("btn-light")
        $("#dataMode").css("color", "#4e73df")
        $("#logicMode").removeClass("btn-primary")
        $("#logicMode").addClass("btn-light")
        $("#logicMode").css("color", "#4e73df")
        $("#projMode").removeClass("btn-light")
        $("#projMode").addClass("btn-primary")
        $("#projMode").css("color", "#fff")
        grid2.css("height", 0)
        grid.css("height", "calc(100vh - 4.375rem)")
        grid3.css("height", 0)
        if (!isRunning)
            $("#top_right_button_1").removeAttr("hidden")
        if (isRunning) {
            $("#top_right_button_2_2").removeAttr("hidden")
            $("#top_right_button_2_1").attr("hidden", "hidden")
        } else {
            $("#top_right_button_2_1").removeAttr("hidden")
            $("#top_right_button_2_2").attr("hidden", "hidden")
        }
        $("#top_right_button_1_" + (isCode ? 2 : 3)).attr("hidden", "hidden")
    } else if (globalProjectType == LOGIC_MODE) {
        $("#dataMode").removeClass("btn-primary")
        $("#dataMode").addClass("btn-light")
        $("#dataMode").css("color", "#4e73df")
        $("#projMode").removeClass("btn-primary")
        $("#projMode").addClass("btn-light")
        $("#projMode").css("color", "#4e73df")
        $("#logicMode").removeClass("btn-light")
        $("#logicMode").addClass("btn-primary")
        $("#logicMode").css("color", "#fff")
        grid2.css("height", 0)
        grid3.css("height", "calc(100vh - 4.375rem)")
        grid.css("height", 0)
        $("#top_right_button_1").attr("hidden", "hidden")
        if (isRunning) {
            $("#top_right_button_2_2").removeAttr("hidden")
            $("#top_right_button_2_1").attr("hidden", "hidden")
        } else {
            $("#top_right_button_2_1").removeAttr("hidden")
            $("#top_right_button_2_2").attr("hidden", "hidden")
        }
        $("#top_right_button_1_" + (isCode ? 2 : 3)).removeAttr("hidden")
        $("#top_right_button_1_" + (isCode ? 3 : 2)).attr("hidden", "hidden")
    }
}

function workspaceToDom() {
    globalXML = stringendecoder.encodeHtml(Blockly.Xml.domToText(Blockly.Xml.workspaceToDom(workspace)))
}


function view_project(projectName, projectType) {
    init_codemirror = function() {
        return new Promise(function(resolve, reject) {
            var modald = showmodaltext("<div style='text-align:center'><i class='fa fa-spin fa-cog' style='font-size:2rem;color:#4e73df'></i><p style='margin-top:6px;margin-bottom:0;color:#4e73df;font-size:1rem;font-weight:bold'>加载逻辑引擎...</p></div>")
            $.getScript("js/codemirror.min.js", function(){
            $.getScript("blockly/blockly_compressed.js", function() {
                $.getScript("blockly/blocks_compressed.js", function() {
                    $.getScript("blockly/javascript_compressed.js", function() {
                        $.getScript("blockly/iot/IOT_Blocks.js?v=1", function() {
                            var currentProjectType = globalProjectType
                            globalProjectType = LOGIC_MODE
                            switch_mode()
                            
                            if (!grid3.children()[0]) {
                                Blockly.registry.register(
                                    Blockly.registry.Type.TOOLBOX_ITEM,
                                    Blockly.ToolboxCategory.registrationName,
                                    CustomCategory, true);
                                var mainDiv = $("<div style='width:100%;height:100%;overflow:hidden;white-space:nowrap'></div>")
                                grid3.append(mainDiv)
                                var leftDiv = $("<div id='block' style='height:100%;display:inline-block;border-right:3px dashed #4e73df'></div>")
                                leftDiv.css("width", mainDiv.width() / 7 * 4 + "px")
                                mainDiv.append(leftDiv)
                                workspace = Blockly.inject('block', {
                                    toolbox: document.getElementById('toolbox'),
                                    media: 'blockly/media/',
                                    zoom: {
                                        controls: true,
                                        wheel: true,
                                        startScale: 0.75,
                                        maxScale: 4,
                                        minScale: 0.25,
                                        scaleSpeed: 1.1
                                    },
                                });
                                var toJS = function() {
                                    MixIO.triggersToPreCode()
                                    MixIO.editor.setValue(MixIO.preCode + Blockly.JavaScript.workspaceToCode(workspace))
                                }

                                function ast(event) {
                                    toJS()
                                    workspaceToDom()
                                }
                                workspace.addChangeListener(ast);
                                var rightDiv = $("<div style='height:100%;display:inline-block'></div>")
                                rightDiv.css("width", mainDiv.width() / 7 * 3 + "px")
                                mainDiv.append(rightDiv)
                                leftDiv.resizable({
                                    handles: "w,e",
                                    onResize: function() {
                                        MixIO.editor.setSize((mainDiv.width() - leftDiv.width()) + "px", '50%')
                                        rightDiv.css("width", (mainDiv.width() - leftDiv.width()) + "px")
                                        Blockly.svgResize(workspace);
                                    },
                                    onStopResize: function() {
                                        MixIO.editor.setSize((mainDiv.width() - leftDiv.width()) + "px", '50%')
                                        rightDiv.css("width", (mainDiv.width() - leftDiv.width()) + "px")
                                    }
                                })
                                window.addEventListener('resize', function() {
                                    MixIO.editor.setSize((mainDiv.width() - leftDiv.width()) + "px", '50%')
                                    rightDiv.css("width", (mainDiv.width() - leftDiv.width()) + "px")
                                    Blockly.svgResize(workspace);
                                })
                                var jTa = $("<textarea style='height:50%'></textarea>")
                                rightDiv.append(jTa)
                                if (globalXML != "") {
                                    Blockly.Xml.domToWorkspace(Blockly.Xml.textToDom(stringendecoder.decodeHtml(globalXML).replaceAll("&", "&amp;")), workspace);
                                }
                                MixIO.editor = CodeMirror.fromTextArea(jTa[0], {
                                    mode: "text/javascript",
                                    lineNumbers: true,
                                    matchBrackets: true,
                                    hintOptions: {
                                        completeSingle: false
                                    }
                                });
                                MixIO.editor.on("inputRead", function(instance, changeObj) {
                                    if (isRunning) {
                                        showtext(JSLang[lang].pauseBeforeModify)
                                    }
                                    if (/^[a-zA-Z]/.test(changeObj.text[0])) {
                                        var words = MixIO.editor.getValue() + "";
                                        words = words.replace(/[a-z]+[\-|\']+[a-z]+/ig, '').match(/([a-z]+)/ig);
                                        CodeMirror.ukeys = words;
                                        MixIO.editor.showHint();
                                    }
                                });
                                MixIO.editor.on('change', function() {
                                    globalCode = MixIO.editor.getValue()
                                })
                                MixIO.editor.setSize('100%', '50%')
                                MixIO.editor.setValue(globalCode)
                                MixIO.editor.setCursor(MixIO.editor.lineCount(), 0);
                                var jTa2Div = $("<div style='font-family:monospace;height:50%;background-color:white'></div>")
                                jTa2Div.append($('<div style="height:2rem;display:flex;align-items:center;background-image: linear-gradient(to right, #4e73df, #b6c5f2);padding-left:5px;font-size:1rem;color:white"><p style="margin:0;">' + JSLang[lang].console + '</p><i class="fa fa-unlock" style="margin-left:10px;cursor:pointer" id="console_icon"></i></div>'))
                                var jTa2 = $("<div style='width:100%;overflow:auto;height:calc(100% - 2rem);padding:3px;color:black;border:none'></div>")
                                jTa2Div.append(jTa2)
                                rightDiv.append(jTa2Div)
                                $("#console_icon").click(function() {
                                    if (typeof globalConsoleStyle == "undefined") {
                                        $("#console_icon").removeClass("fa-unlock")
                                        $("#console_icon").addClass("fa-lock")
                                        globalConsoleStyle = jTa2Div.attr("style")
                                        $("body").append(jTa2Div)
                                        jTa2Div.css("z-index", 999)
                                        jTa2Div.draggable({
                                            disabled: false
                                        })
                                        jTa2Div.resizable({
                                            disabled: false
                                        })
                                        jTa2Div.css("border", "solid black 1px")
                                        jTa2Div.css("position", "absolute")
                                        jTa2Div.css("left", "20px")
                                        jTa2Div.css("top", "20px")
                                        MixIO.editor.setSize((mainDiv.width() - leftDiv.width()) + "px", '100%')
                                    } else {
                                        jTa2Div.attr("style", globalConsoleStyle)
                                        $("#console_icon").addClass("fa-unlock")
                                        $("#console_icon").removeClass("fa-lock")
                                        rightDiv.append(jTa2Div)
                                        jTa2Div.draggable({
                                            disabled: true
                                        })
                                        jTa2Div.resizable({
                                            disabled: true
                                        })
                                        MixIO.editor.setSize((mainDiv.width() - leftDiv.width()) + "px", '50%')
                                        globalConsoleStyle = undefined
                                    }
                                })
                                MixIO.log = function(text) {
                                    if(typeof text == "object")
                                        text = JSON.stringify(text)
                                    if (jTa2.html())
                                        jTa2.html(jTa2.html() + '<br>' + '[' + timeStamp2String().substring(11) + '] ' + text)
                                    else
                                        jTa2.html(jTa2.html() + '[' + timeStamp2String().substring(11) + '] ' + text)
                                    jTa2.scrollTop(jTa2[0].scrollHeight)
                                }
                                MixIO.log("Version: " + globalVer)
                                MixIO.log("入门指南：<a target='_blank' href='devAPI'>dev-api</a>")
                            }
                            globalProjectType = currentProjectType
                            switch_mode()
                            modald.close().remove()
                            resolve();
                        },true);
                    }, true);
                }, true);
            }, true);
        }, true);
        })
    }

    var modald = showmodaltext("<div style='text-align:center'><i class='fa fa-spin fa-cog' style='font-size:2rem;color:#4e73df'></i><p style='margin-top:6px;margin-bottom:0;color:#4e73df;font-size:1rem;font-weight:bold'>" + JSLang[lang].downloading + "</p></div>")
    $.post('getProject', { 'projectName': projectName }, function(res) {
        console.log(JSON.parse(res))
        modald.close().remove()
        if (res == 0) {
            showtext(JSLang[lang].prj404)
        } else {
            $("#title_phase1").parent().remove()
            $("#accordionSidebar").remove()
            $("#sidebarToggleTop").remove()
            $("#connect_span").removeAttr("hidden")
            $("#storage_space").removeAttr("hidden")
            init_layout()
            $("#projMode").click(function() {
                if (globalProjectType != PROJ_MODE) {
                    globalProjectType = PROJ_MODE
                    switch_mode()
                }
                $(".blocklyHtmlInput").attr("hidden", "hidden")
            })
            $("#dataMode").click(function() {
                $(".blocklyHtmlInput").attr("hidden", "hidden")
                if (globalProjectType != DATA_MODE) {
                    $("#data_icon").removeClass("fa-table")
                    $("#data_icon").addClass("fa-spin")
                    $("#data_icon").addClass("fa-spinner")
                    setTimeout(function() {
                        var time1 = new Date()
                        globalProjectType = DATA_MODE
                        switch_mode()
                        init_table()
                        chart.resize()
                        var time2 = new Date()
                        $("#data_icon").addClass("fa-table")
                        $("#data_icon").removeClass("fa-spin")
                        $("#data_icon").removeClass("fa-spinner")
                        if (time2 - time1 > 1000)
                            showtext(JSLang[lang].slow + "(" + (time2 - time1) + "ms)" + JSLang[lang].remindClear)
                    }, 50)

                }
            })
            $("#logicMode").click(function() {
                if (globalProjectType != LOGIC_MODE) {
                    globalProjectType = LOGIC_MODE
                    switch_mode()
                    init_codemirror().then(function() {
                        MixIO.triggersToPreCode()
                        MixIO.editor.setValue(MixIO.preCode + Blockly.JavaScript.workspaceToCode(workspace))
                    })
                }
                $(".blocklySvg").attr("height", "100%")
                $(".blocklyHtmlInput").removeAttr("hidden")
            })
            $("#bottom_2").removeAttr("hidden")
            var prevLogic = JSON.parse(res)['logicStorage']
            if (prevLogic) {
                globalCode = stringendecoder.decodeHtml(JSON.parse(prevLogic)['code'])
                globalXML = stringendecoder.decodeHtml(JSON.parse(prevLogic)['module'])
            }
            globalProjectName = projectName
            globalProjectType = projectType
            switch_mode()
            connectStatusDia = dialog({
                content: ''
            });
            $("#project_list").css("display", "none")
            $("#project_list").remove()
            $("#project_detail").css("display", "")
            $("#top_right_button_0").attr("hidden", "hidden")
            $("#top_right_button_-1").attr("hidden", "hidden")
            $("#top_right_button_3").removeAttr("hidden")
            $("#top_back_button").removeAttr("hidden")
            $("#title_phase1").attr("class", "d-none d-sm-inline-block h3 mb-0 text-gray-800")
            if (!isMixly)
                $("#title_phase2").text(projectName)

            var resJSON = JSON.parse(JSON.parse(res)['projectLayout'])
            var userName = JSON.parse(res)['userName']
            var history = JSON.parse(res).history
            var hisDiv = $("<div style='width:270px' class='nnt'></div>")
            var hisP = $("<p style='margin-bottom:5px'>" + JSLang[lang].duringOff + history.length + JSLang[lang].messageRem + "</p>")
            hisDiv.append(hisP)
            var hisD = $("<div style='max-height:400px;overflow-y:auto'></div>")
            var hisT = $("<table class='cntb' style='width:auto'></table>")
            hisD.append(hisT)
            hisT.append($('<tr style="font-weight:bold"><td>' + JSLang[lang].topic + '</td><td>' + JSLang[lang].message + '</td><td>' + JSLang[lang].time + '</td></tr>'))
            hisDiv.append(hisD)
            for (hisItem in history) {
                var topic = history[hisItem].topicName;
                var msg = history[hisItem].msg;
                var timeStamp = history[hisItem].timeStamp;
                hisT.append($('<tr><td>' + topic + '</td><td style="word-break:break-all">' + msg + '</td><td>' + timeStamp + '</td></tr>'))
            }
            var hisButDiv = $('<div style="width:100%;text-align:center;margin-top:15px"></div>')
            var hisBut = $('<a class="btn btn-success btn-circle btn-lg" style="box-shadow:1px 1px 5px #1cc88a;margin-bottom:-48px"><i class="fa fa-check"></i></a>')
            hisButDiv.append(hisBut)
            hisDiv.append(hisButDiv)
            var d = dialog({
                content: hisDiv[0]
            })
            hisBut.click(function() {
                d.close().remove()
            })
            if (history.length > 0)
                d.showModal()

            globalUserName = userName
            var projectPass = JSON.parse(res)['projectPass']
            globalProjectPass = projectPass
            randomClientID = (IsPC() ? 'MixIO_' : "mixio_") + Math.random().toString(16).substr(2, 8)
            if (isMixly) {
                keyName = userName.slice(1)
                userName = 'MixIO_public'
            }
            client = mqtt.connect((location.protocol == 'https:' ? 'wss://' : 'ws://') + window.location.host.split(":")[0] + ":" + (location.protocol == 'https:' ? MIXIO_WSS_PORT : MIXIO_WS_PORT), {
                'clientId': randomClientID,
                'username': userName,
                'password': projectPass,
                'will': {
                    'topic': globalUserName + '/' + globalProjectName + '/' + '9d634e1a156dc0c1611eb4c3cff57276',
                    'payload': randomClientID,
                    'qos': 0
                }
            })
            client.on('connect', function() {
                publish('b640a0ce465fa2a4150c36b305c1c11b', randomClientID, true)
                connected = 0
                var tempdevices = []
                var tmpclients = []
                if (!isMixly)
                    $.getJSON('getDevices', { 'userName': userName }, function(res) {

                        var devices = res
                        console.log(devices)
                        for (device in devices) {
                            if (devices[device].clientid.indexOf("mixio_") == -1 && devices[device].clientid.indexOf("MixIO_") == -1 && devices[device].clientid.indexOf('OBGuest_') == -1)
                                tempdevices.push(devices[device].clientid)
                            else if (devices[device].clientid.indexOf("mixio_") != -1 || devices[device].clientid.indexOf("MixIO_") != -1)
                                tmpclients.push(devices[device].clientid)
                        }
                        connected_hardwares = tempdevices
                        connected_devices = tmpclients
                        sync_connect_status()
                        prepare_storDia()
                            //check_link()
                    })
                else {
                    $("#title_phase2").css("margin-left", "0")
                    $("#connect_span").css("color", "#1cc88a")
                    $("#connect_span").html("<i class='fa fa-check-circle-o' style='margin-right:3px'></i>" + JSLang[lang].connected)
                    prepare_storDia()
                }
            })
            client.on('close', function() {
                publish('9d634e1a156dc0c1611eb4c3cff57276', randomClientID, true)
            })
            setTimeout(function() {
                if (connected != SERVER_CONNECTED) {
                    connected = SERVER_DISCONNECTED
                    $("#title_phase2").css("margin-left", "0")
                    $("#connect_span").css("color", "#e74a3b")
                    $("#connect_span").html("<i class='fa fa-unlink' style='margin-right:3px'></i>" + JSLang[lang].disconnected)
                }
            }, 20000)
            client.on('message', function(topic1, message1) {
                isChanged = true
                var convertedMessage = Uint8ArrayToString(message1)
                if (topic1.split('/')[2] == 'b640a0ce465fa2a4150c36b305c1c11b' || (topic1.split('/').length == 4 && isMixly && topic1.split('/')[3] == 'b640a0ce465fa2a4150c36b305c1c11b')) {
                    console.log(convertedMessage)
                    if (convertedMessage.indexOf('MixIO_') == -1 && convertedMessage.indexOf('mixio_') == -1) {
                        if (connected_hardwares.indexOf(convertedMessage) == -1) {
                            connected_hardwares.push(convertedMessage)
                        }
                        sync_connect_status()
                    }
                } else if (topic1.split('/')[2] == '9d634e1a156dc0c1611eb4c3cff57276' || (topic1.split('/').length == 4 && isMixly && topic1.split('/')[3] == '9d634e1a156dc0c1611eb4c3cff57276')) {
                    if (convertedMessage.indexOf('MixIO_') == -1 && convertedMessage.indexOf('mixio_') == -1) {
                        if (connected_hardwares.indexOf(convertedMessage) != -1) {

                            connected_hardwares.splice(connected_hardwares.indexOf(convertedMessage), 1)
                        }
                        sync_connect_status()
                    }
                } else if (topic1.split('/').length == 3 && !isMixly) {
                    var tp = stringendecoder.encodeHtml(topic1.split('/')[2])
                    var ms = message1.toString()
                    if(ms.length>500)
                    {
                        const allowFormats = ['png', 'bmp', 'jpg', 'jpeg', 'gif', 'svg', 'ico'];
                        const base64Reg = /^data:image\/(\w+);base64,/;
                        const match = ms.match(base64Reg);
                        if(match && allowFormats.includes(match[1])) {
                            ms = '[Image]'
                        }
                        else{
                            ms = "[Too long to display]"
                        }
                    }
                    if(isJSON(ms))
                    {   
                        var msJSON = JSON.parse(ms)
                        if(("clientid" in msJSON)&&("long" in msJSON)&&("lat" in msJSON)&&("message" in msJSON))
                        {
                            var newJSON = {}
                            var clientid = String(msJSON["clientid"]).split('b\'').pop().split('\'')[0]
                            newJSON["clientid"] = clientid
                            newJSON["long"] = msJSON["long"]
                            newJSON["lat"] = msJSON["lat"]
                            var msg = msJSON["message"]
                            if(typeof msg == "string")
                                msg = JSON.parse(msg)
                            for(item of msg)
                            {
                                newJSON[item["label"]] = item["value"]
                            }
                            ms = JSON.stringify(newJSON)
                        }
                    }
                    if (globalTableProjectInfo.received[tp]) {
                        globalTableProjectInfo.received[tp].unshift({
                            '时间': timeStamp2String(),
                            '值': stringendecoder.encodeHtml(ms)
                        })
                    } else {
                        for(topicSelect of topicSelects)
                            topicSelect.append($("<option value='" + tp + "'>" + tp + "</option>"))
                        globalTableProjectInfo.received[tp] = []
                        globalTableProjectInfo.received[tp].unshift({
                            '时间': timeStamp2String(),
                            '值': stringendecoder.encodeHtml(ms)
                        })
                    }
                    if (globalTableProjectInfo.currentTp == '$') {
                        globalTableProjectInfo.currentTp = tp
                        topicSelect.val(stringendecoder.decodeHtml(tp))
                    }
                    if (globalTableProjectInfo.currentTp == tp) {
                        fresh(true)
                    }
                    else
                    {
                        for(topic = 0; topic<= globalTableProjectInfo.currentTp.split(',,').length; topic = topic + 1) {
                            if(tp == globalTableProjectInfo.currentTp.split(',,')[topic])
                            {
                                fresh(true)
                                break
                            }
                        }
                    }
                } else if (topic1.split('/').length == 4 && isMixly) {
                    var tp = stringendecoder.encodeHtml(topic1.split('/')[3])
                    var ms = message1.toString()
                    if(ms.length>500)
                    {
                        const allowFormats = ['png', 'bmp', 'jpg', 'jpeg', 'gif', 'svg', 'ico'];
                        const base64Reg = /^data:image\/(\w+);base64,/;
                        const match = ms.match(base64Reg);
                        if(match && allowFormats.includes(match[1])) {
                            ms = '[Image]'
                        }
                        else{
                            ms = "[Too long to display]"
                        }
                    }
                    if(isJSON(ms))
                    {   
                        var msJSON = JSON.parse(ms)
                        if(("clientid" in msJSON)&&("long" in msJSON)&&("lat" in msJSON)&&("message" in msJSON))
                        {
                            var newJSON = {}
                            var clientid = msJSON["clientid"]
                            newJSON[clientid+"-"+"long"] = msJSON["long"]
                            newJSON[clientid+"-"+"lat"] = msJSON["lat"]
                            var msg = msJSON["message"]
                            if(typeof msg == "string")
                                msg = JSON.parse(msg)
                            for(item of msg)
                            {
                                newJSON[clientid+"-"+item["label"]] = item["value"]
                            }
                            ms = JSON.stringify(newJSON)
                        }
                    }
                    if (globalTableProjectInfo.received[tp]) {
                        globalTableProjectInfo.received[tp].unshift({
                            '时间': timeStamp2String(),
                            '值': stringendecoder.encodeHtml(ms)
                        })
                    } else {
                        for(topicSelect of topicSelects)
                            topicSelect.append($("<option value='" + tp + "'>" + tp + "</option>"))
                        globalTableProjectInfo.received[tp] = []
                        globalTableProjectInfo.received[tp].unshift({
                            '时间': timeStamp2String(),
                            '值': stringendecoder.encodeHtml(ms)
                        })
                    }
                    if (globalTableProjectInfo.currentTp == '$') {
                        globalTableProjectInfo.currentTp = tp
                        topicSelect.val(stringendecoder.decodeHtml(tp))
                    }
                    if (globalTableProjectInfo.currentTp == tp) {
                        fresh(true)
                    }
                    else
                    {
                        for(topic = 0; topic<= globalTableProjectInfo.currentTp.split(',,').length; topic = topic + 1) {
                            if(tp == globalTableProjectInfo.currentTp.split(',,')[topic])
                            {
                                fresh(true)
                                break
                            }
                        }
                    }
                }

            })
            if (!isMixly) {
                client.subscribe(globalUserName + '/' + globalProjectName + '/#')
            } else {
                client.subscribe('MixIO' + '/' + keyName + '/' + globalProjectName + '/#')
            }
            var prev_layout = stringendecoder.decodeHtml(resJSON.layout_info)
            var units_array = $(prev_layout)
            for (var ct = 0; ct <= units_array.length - 1; ct = ct + 1) {
                var un = $(units_array[ct])
                var titleHidden = un.attr('title-hidden')
                // if no title-hidden attribute, set it to false
                if (titleHidden == undefined)
                    titleHidden = false
                if (titleHidden == "true")
                    titleHidden = true
                if (titleHidden == "false")
                    titleHidden = false
                toolkits = {
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
                    'trigger': add_trigger,
                    'magic': add_magic,
                    'pixel': add_pixel,
                    'table': add_table,
                    'decorate_text': add_decorate_text,
                    'decorate_pic': add_decorate_pic,
                    'timer': add_timer,
                    'ble': add_ble,
                    'camera': add_camera,
                    'face': add_face,
                    'ocr': add_ocr,
                    'qr':add_qr,
                    'input_mic': add_mic,
                    'tinydb': add_tinydb,
                }
                toolkits[un.attr('user-type')](un.attr('user-title'), un.attr('user-topic'), un.attr('user-content'), un.attr('style'), titleHidden)
            }
            var topicOuterDiv = $("<div style='width:100%;display:flex;align-items:center;'></div>")
            var topicDiv = $("<div style='z-index:1000;margin:0;display:flex;flex-direction:row;align-items:center;justify-content:center;margin-bottom:20px;width:320px;background-color:white;border-radius:0 0 40px 0;padding-left:10px;padding-right:10px;padding-top:5px;padding-bottom:10px;box-shadow:0 .15rem 1.75rem 0 rgba(58,59,69,.15)!important;flex-wrap:wrap'></div>")
            var topicSelect = $("<select class='form-control' style='width:150px;'></select>")
            var topicSelects = []
            topicSelects.push(topicSelect)
            topicDiv.append($("<span style='font-weight:bold'>" + JSLang[lang].listener + "&nbsp;</span>"))
            topicSelect.append($("<option value='$'>" + JSLang[lang].select + "</option>"))
            fresh = function(clear){
                if(!clear)
                    chart.clear()
                var tmpArr = []
                for(var i=0;i<topicSelects.length;i++)
                {
                    tmpArr.push(topicSelects[i].val())
                }
                globalTableProjectInfo.currentTp = tmpArr.join(',,')
                var toBeMerge = []
                for(var i=0;i<topicSelects.length;i++)
                {
                    if(topicSelects[i].val()!='$')
                        toBeMerge.push(copy(globalTableProjectInfo.received[topicSelects[i].val()]))
                }
                if(toBeMerge.length>1)
                {
                    var allTime = []
                    for(var i=0;i<toBeMerge.length;i++)
                    {
                        for(var j=0;j<toBeMerge[i].length;j++)
                        {
                            var time = toBeMerge[i][j][JSLang[lang].time]
                            if(allTime.indexOf(time)==-1 && time!=undefined)
                                allTime.push(time)
                        }
                    }
                    // sort allTime from small to big
                    allTime.sort(function(a,b){
                        return new Date(b) - new Date(a)
                    })
                    console.log(allTime)
                    // merge all data
                    dataset = []
                    for(var i=0;i<allTime.length;i++)
                    {
                        var tmp = {}
                        tmp[JSLang[lang].time] = allTime[i]
                        tmp[JSLang[lang].value] = {}
                        for(var j=0;j<toBeMerge.length;j++)
                        {
                            for(var k=0;k<toBeMerge[j].length;k++)
                            {
                                if(toBeMerge[j][k][JSLang[lang].time]==allTime[i])
                                {
                                    if(isJSON(stringendecoder.decodeHtml(toBeMerge[j][k][JSLang[lang].value])))
                                    {
                                        toBeMerge[j][k][JSLang[lang].value] = JSON.parse(stringendecoder.decodeHtml(toBeMerge[j][k][JSLang[lang].value]))
                                        for(var key in toBeMerge[j][k][JSLang[lang].value])
                                        {
                                            tmp[JSLang[lang].value][topicSelects[j].val() + " - " + key] = toBeMerge[j][k][JSLang[lang].value][key]
                                        }
                                    }
                                    else{
                                        tmp[JSLang[lang].value][topicSelects[j].val()] = toBeMerge[j][k][JSLang[lang].value]
                                    }
                                }
                            }
                        }
                        tmp[JSLang[lang].value] = stringendecoder.decodeHtml(JSON.stringify(tmp[JSLang[lang].value]))
                        dataset.push(tmp)
                    }
                }
                else if(toBeMerge.length==1)
                {
                    dataset = toBeMerge[0]
                }
                else
                {
                    dataset = []
                }
                init_table()
            }
            topicSelect.bind('change', function() {
                fresh()
            })
            globalTableProjectInfo.currentTp = '$'
            topicDiv.append(topicSelect)
            var addTopicButton = $('<a class="btn btn-primary btn-circle btn-sm" style="margin-left:8px"><i class="fa fa-plus"></i></a>')
            topicDiv.append(addTopicButton)
            var addBind = function(){
                var newtopicSelect = $("<select class='form-control' style='width:150px; margin-top:5px'></select>")
                newtopicSelect.append($("<option value='$'>" + JSLang[lang].select + "</option>"))
                for (var tp in globalTableProjectInfo.received) {
                    newtopicSelect.append($("<option value='" + tp + "'>" + tp + "</option>"))
                }
                topicSelects.push(newtopicSelect)
                var tempTitle = $("<span style='font-weight:bold; color:white; margin-top:5px'>" + JSLang[lang].listener + "&nbsp;</span>")
                var removeTopicButton = $('<a class="btn btn-primary btn-circle btn-sm" style="margin-left:8px; margin-top:5px"><i class="fa fa-minus"></i></a>')
                addTopicButton.after(removeTopicButton)
                addTopicButton.after(newtopicSelect)
                addTopicButton.after(tempTitle)
                removeTopicButton.bind('click',function(){
                    newtopicSelect.remove()
                    removeTopicButton.remove()
                    tempTitle.remove()
                    var index = topicSelects.indexOf(newtopicSelect)
                    topicSelects.splice(index,1)
                    fresh()
                })
                newtopicSelect.bind('change', function() {
                    fresh()
                })
                
            }
            addTopicButton.bind('click', function() {
                addBind()
            })
            topicOuterDiv.append(topicDiv)
            grid2.append(topicOuterDiv)
            var row = $("<div class='row' style='margin:0'></div>")
            grid2.append(row)
            var leftDiv = $("<div class='col-xl-6'></div>")
            var rightDiv = $("<div class='col-xl-6'></div>")
            row.append(leftDiv)
            row.append(rightDiv)
            var leftCard = $('<div class="card shadow mb-4">')
            var rightCard = $('<div class="card shadow mb-4">')
            leftDiv.append(leftCard)
            rightDiv.append(rightCard)
            var leftCardTitle = $('<div class="card-header py-3" style="display:flex;align-items:center">')
            var rightCardTitle = $('<div class="card-header py-3" style="display:flex;align-items:center">')
            leftCard.append(leftCardTitle)
            rightCard.append(rightCardTitle)
            leftCardTitle.append($('<h6 class="m-0 font-weight-bold text-primary">' + JSLang[lang].monitor + '</h6>'))
            var httpAPIButton = $('<a class="btn btn-info btn-sm" style="padding:0 5px 0 5px;margin-left:10px">' + "HTTP API" + '</a>')
            var downloadButton = $('<a class="btn btn-primary btn-sm" download="data.csv" style="padding:0 5px 0 5px;margin-left:10px">' + JSLang[lang].download + '</a>')
            var clearButton = $('<a class="btn btn-success btn-sm" style="padding:0 5px 0 5px;margin-left:8px">' + JSLang[lang].clear + '</a>')
            var clearAllButton = $('<a class="btn btn-warning btn-sm" style="padding:0 5px 0 5px;margin-left:8px">' + JSLang[lang].clearAll + '</a>')
            httpAPIButton.click(function() {
                var text = "URL: " + window.location.href.replace("projects-mixly", "").replace("projects", "") + "api/v1/getData?user=" + globalUserName + "&password=" + globalProjectPass + "&project=" + globalProjectName + "&topic=" + "[想要获取的主题]" + "&num=" + "[想要获取的最新消息数量]"
                var text = "Method: GET<br>" + text
                var text = text + "<br>" + "一般情况下，数据更新频率为30秒/次，手动保存项目会立即更新数据。"
                // dialog, 自动换行
                var text = "<div style='word-wrap:break-word;word-break:break-all;'>" + text + "</div>"
                var dia = dialog({
                    title: "通过HTTP API获取数据",
                    content: text,
                    okValue: JSLang[lang].close,
                    ok: function() {
                        dia.close().remove()
                    }
                })
                dia.showModal()
            })

            clearAllButton.click(function() {
                isChanged = true
                if (globalTableProjectInfo.currentTp != "$") {
                    if (globalTableProjectInfo.currentTp.split(",,").length == 1)
                        delete globalTableProjectInfo.received[globalTableProjectInfo.currentTp]
                    else {
                        var temp = globalTableProjectInfo.currentTp.split(",,")
                        for (var i in temp) {
                            if(temp[i] != "$")
                                delete globalTableProjectInfo.received[temp[i]]
                        }
                    }
                    for(var i in topicSelects)
                    {
                        topicSelects[i].val('$')
                        if (globalTableProjectInfo.currentTp.split(",,").length == 1)
                            topicSelects[i].children("[value='" + globalTableProjectInfo.currentTp + "']").remove()
                        else {
                            var temp = globalTableProjectInfo.currentTp.split(",,")
                            for (var j in temp) {
                                if(temp[j] != "$")
                                    topicSelects[i].children("[value='" + temp[j] + "']").remove()
                            }
                        }
                    }
                    globalTableProjectInfo.currentTp = '$'
                    dataset = []
                    init_table()
                }
            })
            leftCardTitle.append(httpAPIButton)
            leftCardTitle.append(downloadButton)
            leftCardTitle.append(clearButton)
            leftCardTitle.append(clearAllButton)
            clearButton.click(function() {
                isChanged = true
                if (globalTableProjectInfo.currentTp.split(",,").length == 1)
                    globalTableProjectInfo.received[globalTableProjectInfo.currentTp] = []
                else {
                    var temp = globalTableProjectInfo.currentTp.split(",,")
                    for (var i in temp) {
                        if(temp[i] != "$")
                            globalTableProjectInfo.received[temp[i]] = []
                    }
                }
                fresh()
            })
            var sync_export = function() {
                var fields = globalTable.data().JSGrid.fields
                var data = globalTable.data().JSGrid.data
                var names = []
                for (field in fields) {
                    names.push(fields[field].name)
                }
                var str = names.join(',') + "\n"
                for (row in data) {

                    for (rname in names) {
                        if (data[row][names[rname]])
                            str = str + stringendecoder.decodeHtml(data[row][names[rname]]) + ","
                        else
                            str = str + ","
                    }
                    str = str + "\n"
                }
                downloadButton.attr("href", "data:text/csv;charset=utf-8,\ufeff" + encodeURIComponent(str))
            }
            rightCardTitle.append($('<h6 class="m-0 font-weight-bold text-primary">' + JSLang[lang].rtchart + '</h6>'))
            // 两个select, 分别是rightCardGroup和rightCardLabel，显示按rightCardGroup分组显示rightCardLabel的数据
            rightCardGroup = $('<select class="form-control" style="width:72px;height:24px;padding:0" disabled="disabled"></select>')
            rightCardLabel = $('<select class="form-control" style="width:72px;height:24px;padding:0" disabled="disabled"></select>')
            // on change
            rightCardLabel.bind('change', function() {
                fresh()
            }
            )
            rightCardGroup.bind('change', function() {
                // 如果值不为空
                fresh()
                if (rightCardGroup.val()) {
                    // 把rightCardLabel的options清空，改为rightCardGroup的options(除了选中的)
                    rightCardLabel.removeAttr("disabled")
                    rightCardLabel.empty()
                    var rightCardGroupChildren = rightCardGroup.children()
                    for (var i = 0; i < rightCardGroupChildren.length; i++) {
                        if (rightCardGroupChildren[i].value != rightCardGroup.val())
                        {
                            if(rightCardGroupChildren[i].value == '')
                                rightCardLabel.append($("<option value=''>无</option>"))
                            else
                                rightCardLabel.append($("<option value='" + rightCardGroupChildren[i].value + "'>" + rightCardGroupChildren[i].value + "</option>"))
                        }
                    }
                }
                else{
                    rightCardLabel.empty()
                    rightCardLabel.attr("disabled", "disabled")
                }
            })
            var rightGroupDiv = $('<div style="display:flex;align-items:center"></div>')
            rightGroupDiv.append("<span style='font-weight:bold'>&nbsp;&nbsp;按&nbsp;</span>")
            rightGroupDiv.append(rightCardGroup)
            rightGroupDiv.append("<span style='font-weight:bold'>&nbsp;分组显示&nbsp;</span>")
            rightGroupDiv.append(rightCardLabel)
            rightCardTitle.append(rightGroupDiv)
            var leftCardBody = $('<div class="card-body" style="height:400px;padding:0">')
            var rightCardBody = $('<div class="card-body" style="height:400px">')
            leftCard.append(leftCardBody)
            rightCard.append(rightCardBody)
            var leftCardBodyDiv = $('<div></div>')
            leftCardBody.append(leftCardBodyDiv)
            var rightCardBodyDiv = $('<div style="width:100%;height:100%"></div>')
            rightCardBody.append(rightCardBodyDiv)

            var topicOuterDiv2 = $("<div style='width:100%;display:flex;align-items:center;'></div>")
            var topicDiv2 = $("<div style='margin:0;display:flex;flex-direction:row;align-items:center;justify-content:center;margin-bottom:20px;width:320px;background-color:white;border-radius:0 0 40px 0;padding-left:10px;padding-right:10px;padding-top:10px;padding-bottom:10px;box-shadow:0 .15rem 1.75rem 0 rgba(58,59,69,.15)!important'></div>")
            var topicSelect2 = $("<input class='form-control' style='width:150px;min-width:150px'></input>")
            topicDiv2.append($("<span style='font-weight:bold'>" + JSLang[lang].sender + "&nbsp;</span>"))
            topicSelect2.bind('input', function() {
                globalTableProjectInfo.currentTp2 = stringendecoder.encodeHtml(topicSelect2.val())
            })
            globalTableProjectInfo.currentTp2 = ''
            topicDiv2.append(topicSelect2)
            var removeTopicButton2 = $('<a class="btn btn-danger btn-circle btn-sm" style="margin-left:8px"><i class="fa fa-close"></i></a>')
            topicDiv2.append(removeTopicButton2)
            removeTopicButton2.click(function() {
                topicSelect2.val("")
                globalTableProjectInfo.currentTp2 = ""
            })
            topicOuterDiv2.append(topicDiv2)
            grid2.append(topicOuterDiv2)
            var dataset = []
            chart = echarts.init(rightCardBodyDiv[0])
            chart.setOption({
                tooltip:{
                    trigger: "axis",
                    formatter: function(params){
                        let str = '';
                        params.forEach((item, idx) => {
                            str += "<div style='margin:0;display:flex;justify-content:space-between;align-items:center'><div>" + `${item.marker}${item.seriesName}:&nbsp;&nbsp;&nbsp;</div><b>${chart.getOption().series[item.seriesIndex].oriData[item.dataIndex]}</b>` + "</div>"
                            
                        })
                        return str
                    }
                }
            })
            init_table = function() {
                var fields = ["时间"]
                for (dataitem in dataset) {
                    if (isJSON(stringendecoder.decodeHtml(dataset[dataitem].值))) {
                        var json_parsed = JSON.parse(stringendecoder.decodeHtml(dataset[dataitem].值))
                        for (key in json_parsed) {
                            var alreadyHave = false
                            for (field in fields) {
                                if (fields[field] == key) {
                                    alreadyHave = true
                                    break
                                }
                            }
                            if (!alreadyHave)
                                fields.push(key)
                        }
                    } else {
                        var alreadyHave = false
                        for (field in fields) {
                            if (fields[field] == '值') {
                                alreadyHave = true
                                break
                            }
                        }
                        if (!alreadyHave)
                            fields.push("值")
                    }
                }
                var tableFields = []
                for (field in fields) {
                    let cvtName = fields[field]
                    if (cvtName == "时间")
                        cvtName = JSLang[lang].time
                    else if (cvtName == "值")
                        cvtName = JSLang[lang].value
                    tableFields.push({
                        name: cvtName,
                        type: 'text',
                        align: 'center',
                        itemTemplate: function(value, item) {
                            return item[cvtName]
                        }
                    })
                }
                var parsedDataset = []
                for (dataitem in dataset) {
                    if (lang == 'en') {
                        if (dataset[dataitem].时间) {
                            dataset[dataitem].time = dataset[dataitem].时间
                            delete dataset[dataitem].时间
                            dataset[dataitem].value = dataset[dataitem].值
                            delete dataset[dataitem].值
                        }
                    } else if (lang == 'tw') {
                        if (dataset[dataitem].时间) {
                            dataset[dataitem].時間 = dataset[dataitem].时间
                            delete dataset[dataitem].时间
                        }
                    }
                }
                for (dataitem in dataset) {
                    if (isJSON(stringendecoder.decodeHtml(dataset[dataitem][JSLang[lang].value]))) {
                        var json_parsed = JSON.parse(stringendecoder.decodeHtml(dataset[dataitem][JSLang[lang].value]))
                        json_parsed[JSLang[lang].time] = dataset[dataitem][JSLang[lang].time]
                        parsedDataset.push(json_parsed)
                    } else {
                        parsedDataset.push(dataset[dataitem])
                    }
                }
                globalTable = leftCardBodyDiv.jsGrid({
                    width: "100%",
                    height: "100%",
                    noDataContent: JSLang[lang].noData,
                    data: parsedDataset,
                    confirmDeleting: false,
                    fields: tableFields,
                    onItemDeleted: function() {
                        setContent()
                    },
                    onItemUpdated: function() {
                        setContent()
                    }
                })
                var xAxis = {
                    type: 'category',
                    data: []
                }
                var yAxis = {
                    type: 'value'
                }

                var series = []

                var last_group_options = []
                for(child in rightCardGroup.children())
                {
                    if(rightCardGroup.children()[child].value)
                        last_group_options.push(rightCardGroup.children()[child].value)
                }
                var isUpdateGroup = false
                var new_group_options = []
                for (tableField in tableFields) {
                    if (tableFields[tableField].name != JSLang[lang].time)
                    {
                        new_group_options.push(tableFields[tableField].name)
                    }
                }
                // 判断是否需要更新group
                if(last_group_options.length != new_group_options.length)
                    isUpdateGroup = true
                else
                {
                    for(var i=0;i<last_group_options.length;i++)
                    {
                        if(last_group_options[i] != new_group_options[i])
                        {
                            isUpdateGroup = true
                            break
                        }
                    }
                }
                console.log(isUpdateGroup)
                if(isUpdateGroup)
                {
                    rightCardGroup.empty()
                    rightCardLabel.empty()
                    rightCardGroup.append($("<option value=''>无</option>"))
                    rightCardGroup.removeAttr("disabled")
                    rightCardLabel.attr("disabled","disabled")
                    for (tableField in tableFields) {
                        if (tableFields[tableField].name != JSLang[lang].time)
                        {
                            rightCardGroup.append($("<option value='" + tableFields[tableField].name + "'>" + tableFields[tableField].name + "</option>"))
                        }
                    }
                }
                var isGrouping = false
                if(rightCardGroup.val() && rightCardLabel.val())
                    isGrouping = true
                if(isGrouping)
                {
                    var groupBy = rightCardGroup.val()
                    var valueUse = rightCardLabel.val()
                    var allGroups = []
                    for (dataitem in dataset){
                        xAxis.data.unshift(dataset[dataitem][JSLang[lang].time].slice(11))
                        if(isJSON(stringendecoder.decodeHtml(dataset[dataitem][JSLang[lang].value])))
                        {
                            var json_parsed = JSON.parse(stringendecoder.decodeHtml(dataset[dataitem][JSLang[lang].value]))
                            if(json_parsed[groupBy] || json_parsed[groupBy] === 0 || json_parsed[groupBy] === false || json_parsed[groupBy] === "")
                            {
                                if(allGroups.indexOf(json_parsed[groupBy])==-1)
                                    allGroups.push(json_parsed[groupBy])
                            }
                        }
                    }
                    for (group in allGroups) {
                        var seriesData = []
                        var seriesOriData = []
                        for (dataitem in dataset) {
                            if(isJSON(stringendecoder.decodeHtml(dataset[dataitem][JSLang[lang].value])))
                            {
                                var json_parsed = JSON.parse(stringendecoder.decodeHtml(dataset[dataitem][JSLang[lang].value]))
                                if(json_parsed[groupBy] == allGroups[group])
                                {
                                    if(json_parsed[valueUse] || json_parsed[valueUse] === 0 || json_parsed[valueUse] === false || json_parsed[valueUse] === "")
                                    {
                                        seriesData.unshift(parseFloat(json_parsed[valueUse]))
                                        seriesOriData.unshift(json_parsed[valueUse])
                                    }
                                    else
                                    {
                                        seriesData.unshift(NaN)
                                        seriesOriData.unshift("-")
                                    }
                                }
                                else
                                {
                                    seriesData.unshift(NaN)
                                    seriesOriData.unshift("-")
                                }
                            }
                        }
                        series.push({
                            type: 'line',
                            name: allGroups[group],
                            data: seriesData,
                            oriData: seriesOriData,
                            connectNulls: true
                        })
                        console.log(series)
                    }
                }
                else{
                    for (tableField in tableFields) {
                        series.push({
                            type: 'line',
                            name: tableFields[tableField].name,
                            data: [],
                            oriData:[],
                            connectNulls: true
                        })
                    }
                    for (dataitem in dataset) {
                        xAxis.data.unshift(dataset[dataitem][JSLang[lang].time].slice(11))
                        if (isJSON(stringendecoder.decodeHtml(dataset[dataitem][JSLang[lang].value]))) {
                            var json_parsed = JSON.parse(stringendecoder.decodeHtml(dataset[dataitem][JSLang[lang].value]))
                            for (sery in series) {
                                var seryName = series[sery].name
                                if (seryName != JSLang[lang].time)
                                    if (json_parsed[seryName] || json_parsed[seryName] === 0) {
                                        series[sery].data.unshift(parseFloat(json_parsed[seryName]))
                                        series[sery].oriData.unshift(json_parsed[seryName])
                                    } else
                                    {
                                        series[sery].data.unshift(NaN)
                                        series[sery].oriData.unshift("-")
                                    }
                            }
                        } else {
                            for (sery in series) {
                                var seryName = series[sery].name
                                if (seryName != JSLang[lang].time)
                                    if (seryName == JSLang[lang].value){
                                        series[sery].data.unshift(parseFloat(dataset[dataitem][JSLang[lang].value]))
                                        series[sery].oriData.unshift(dataset[dataitem][JSLang[lang].value])
                                    }
                                    else
                                    {
                                        series[sery].data.unshift(NaN)
                                        series[sery].oriData.unshift("-")
                                    }
                            }
                        }
                    }
                }
                chart.setOption({
                    dataZoom: [{
                        id: 'dataZoomX',
                        type: 'slider',
                        xAxisIndex: [0]
                    }],
                    xAxis: xAxis,
                    yAxis: yAxis,
                    series: series,

                        tooltip:{
                            trigger: "axis",
                            formatter: function(params){
                                let str = '';
                                params.forEach((item, idx) => {
                                    str += "<div style='margin:0;display:flex;justify-content:space-between;align-items:center'><div>" + `${item.marker}${item.seriesName}:&nbsp;&nbsp;&nbsp;</div><b>${chart.getOption().series[item.seriesIndex].oriData[item.dataIndex]}</b>` + "</div>"
                                    
                                })
                                return str
                            }
                        }

                })
                sync_export()
            }
            var bottomDiv = $("<div class='col-xl-6'></div>")
            var row2 = $("<div class='row' style='margin:0'></div>")
            grid2.append(row2)
            row2.append(bottomDiv)
            var bottomCard = $('<div class="card shadow mb-4">')
            bottomDiv.append(bottomCard)
            var bottomCardTitle = $('<div class="card-header py-3" style="display:flex">')
            bottomCard.append(bottomCardTitle)
            bottomCardTitle.append($('<h6 class="m-0 font-weight-bold text-primary">' + JSLang[lang].sendString + '</h6>'))
            bottomCardTitle.append($('<input type="checkbox" id="sendClear" style="min-width:0px!important;margin-left:20px;margin-right:3px"/><label style="margin:0;padding:0;font-size:small">发送后清空</label>'))
            var bottomCardBody = $('<div class="card-body">')
            bottomCard.append(bottomCardBody)
            var bottomCardBodyDiv = $('<div style="display:flex;align-items:center"></div>')
            bottomCardBody.append(bottomCardBodyDiv)
            var messageInput = $('<textarea class="form-control"></textarea>')
            messageInput.bind('input', function() {
                globalTableProjectInfo['toBeSent'] = stringendecoder.encodeHtml(messageInput.val())
            })
            var messageSendButton = $('<a class="btn btn-primary btn-circle btn-lg" style="margin-left:10px"></a>')
            var messageSendIcon = $('<i class="fa fa-paper-plane" style="margin-right:3px"></i>')
            messageSendButton.append(messageSendIcon)
            bottomCardBodyDiv.append(messageInput)
            bottomCardBodyDiv.append(messageSendButton)
            messageSendButton.click(function() {
                if (globalTableProjectInfo.currentTp2 && globalTableProjectInfo.currentTp2 != '')
                    publish(stringendecoder.decodeHtml(globalTableProjectInfo.currentTp2), messageInput.val(), true)
                else
                    showtext(JSLang[lang].topicUnset)
                messageSendButton.removeClass("btn-primary")
                messageSendButton.addClass("btn-success")
                setTimeout(function(){
                    messageSendButton.addClass("btn-primary")
                    messageSendButton.removeClass("btn-success") 
                },200)
                if($("#sendClear").prop("checked"))
                    messageInput.val("")
            })

            var bottomDiv2 = $("<div class='col-xl-6'></div>")
            row2.append(bottomDiv2)
            var bottomCard2 = $('<div class="card shadow mb-4">')
            bottomDiv2.append(bottomCard2)
            var bottomCardTitle2 = $('<div class="card-header py-3" style="display:flex">')
            bottomCard2.append(bottomCardTitle2)
            bottomCardTitle2.append($('<h6 class="m-0 font-weight-bold text-primary">' + JSLang[lang].sendJSON + '</h6>'))
            var bottomCardBody2 = $('<div class="card-body">')
            bottomCard2.append(bottomCardBody2)
            var bottomCardBodyDiv2 = $('<div style="display:flex;align-items:center"></div>')
            bottomCardBody2.append(bottomCardBodyDiv2)
            var messageInput2Div = $('<div style="width:100%"></div>')
            var valueDiv = $('<div style="display:flex;align-items:center;margin-bottom:10px"></div>')
            valueDiv.append($('<span style="margin-right:8px">' + JSLang[lang].key + '</span>'))
            var keyInput = $('<input class="form-control" style="min-width:0;width:120px"/>')
            valueDiv.append(keyInput)
            $(function() { keyInput.bind('input', syncGlobalJSONMemory) });
            valueDiv.append($('<span style="margin-left:15px;margin-right:8px">' + JSLang[lang].value + '</span>'))
            var valInput = $('<input style="min-width:0" class="form-control"/>')
            valueDiv.append(valInput)
            $(function() { valInput.bind('input', syncGlobalJSONMemory) });
            var removeButton = $('<a class="btn btn-danger btn-circle btn-sm" style="height:1.2rem;width:1.2rem;font-size:.5rem;margin-right:6px"><i class="fa fa-minus"></i></a>')
            removeButton.click(function() {
                if (messageInput2Div.children().length > 2)
                    valueDiv.remove()
                else
                    showtext(JSLang[lang].JSONempty)
                syncGlobalJSONMemory()
            })
            valueDiv.prepend(removeButton)
            messageInput2Div.append(valueDiv)
            var addButton = $('<a class="btn btn-primary btn-block" style="display:inline-block"><i class="fa fa-plus" style="margin-right:10px;margin-top:5px"></i>' + JSLang[lang].addKey + '</a>')
            addButton.click(function() {
                var valueDiv = $('<div style="display:flex;align-items:center;margin-bottom:10px"></div>')
                valueDiv.append($('<span style="margin-right:8px">' + JSLang[lang].key + '</span>'))
                var keyInput = $('<input class="form-control" style="min-width:0;width:120px"/>')
                valueDiv.append(keyInput)
                keyInput.bind('input', syncGlobalJSONMemory)
                valueDiv.append($('<span style="margin-left:15px;margin-right:8px">' + JSLang[lang].value + '</span>'))
                var valInput = $('<input style="min-width:0" class="form-control"/>')
                valueDiv.append(valInput)
                valInput.bind('input', syncGlobalJSONMemory)
                var removeButton = $('<a class="btn btn-danger btn-circle btn-sm" style="height:1.2rem;width:1.2rem;font-size:.5rem;margin-right:6px"><i class="fa fa-minus"></i></a>')
                removeButton.click(function() {
                    if (messageInput2Div.children().length > 2)
                        valueDiv.remove()
                    else
                        showtext(JSLang[lang].JSONempty)
                    syncGlobalJSONMemory()
                })
                valueDiv.prepend(removeButton)
                valueDiv.insertBefore(addButton)
            })
            var syncGlobalJSONMemory = function() {
                var toBeSaved = {}
                var inputDivs = messageInput2Div.children()
                for (inputDiv = 0; inputDiv < inputDivs.length - 1; inputDiv = inputDiv + 1) {
                    if ($($(inputDivs[inputDiv]).children()[2]).val() != "") {
                        toBeSaved[$($(inputDivs[inputDiv]).children()[2]).val()] = $($(inputDivs[inputDiv]).children()[4]).val()
                    }
                }
                globalTableProjectInfo['toBeSentJSON'] = stringendecoder.encodeHtml(JSON.stringify(toBeSaved))
            }
            messageInput2Div.append(addButton)
            var messageSendButton2 = $('<a class="btn btn-primary btn-circle btn-lg" style="margin-left:10px"><i class="fa fa-paper-plane" style="margin-right:3px"></i></a>')
            bottomCardBodyDiv2.append(messageInput2Div)
            bottomCardBodyDiv2.append(messageSendButton2)
            messageSendButton2.click(function() {
                if (globalTableProjectInfo.currentTp2 && globalTableProjectInfo.currentTp2 != '') {
                    if (isJSON(stringendecoder.decodeHtml(globalTableProjectInfo.toBeSentJSON)))
                        publish(stringendecoder.decodeHtml(globalTableProjectInfo.currentTp2), stringendecoder.decodeHtml(globalTableProjectInfo.toBeSentJSON), true)
                    else
                        showtext(JSLang[lang].invalidJSON)
                } else
                    showtext(JSLang[lang].topicUnset)
            })
            init_table()
            if (JSON.parse(JSON.parse(res)['projectLayout']).data_info || JSON.parse(res)['dataStorage']) {
                var resJSON = JSON.parse(JSON.parse(res)['projectLayout']).data_info || JSON.parse(JSON.parse(res)['dataStorage'])
                if (resJSON['currentTp']) {
                    for (tp in resJSON['received'])
                        topicSelect.append($("<option value='" + tp + "'>" + tp + "</option>"))
                    topicSelect.val(stringendecoder.decodeHtml(resJSON['currentTp']))
                    globalTableProjectInfo = resJSON

                    if (isJSON(stringendecoder.decodeHtml(globalTableProjectInfo['toBeSentJSON']))) {
                        var json_parsed = JSON.parse(stringendecoder.decodeHtml(globalTableProjectInfo['toBeSentJSON']))
                        for (key in json_parsed) {
                            let valueDiv = $('<div style="display:flex;align-items:center;margin-bottom:10px"></div>')
                            valueDiv.append($('<span style="margin-right:8px">' + JSLang[lang].key + '</span>'))
                            let keyInput = $('<input class="form-control" style="min-width:0;width:120px"/>')
                            keyInput.val(key)
                            valueDiv.append(keyInput)
                            $(function() { keyInput.bind('input', syncGlobalJSONMemory) });
                            valueDiv.append($('<span style="margin-left:15px;margin-right:8px">' + JSLang[lang].value + '</span>'))
                            let valInput = $('<input style="min-width:0" class="form-control"/>')
                            valueDiv.append(valInput)
                            valInput.val(json_parsed[key])
                            $(function() { valInput.bind('input', syncGlobalJSONMemory) });
                            let removeButton = $('<a class="btn btn-danger btn-circle btn-sm" style="height:1.2rem;width:1.2rem;font-size:.5rem;margin-right:6px"><i class="fa fa-minus"></i></a>')
                            removeButton.click(function() {
                                if (messageInput2Div.children().length > 2)
                                    valueDiv.remove()
                                else
                                    showtext(JSLang[lang].JSONempty)
                                syncGlobalJSONMemory()
                            })
                            valueDiv.prepend(removeButton)
                            messageInput2Div.prepend(valueDiv)
                        }
                    }

                    var history = JSON.parse(res).history
                    for (hisItem in history) {
                        var hisTopic = history[hisItem].topicName
                        var hisMessage = history[hisItem].msg
                        var hisTime = history[hisItem].timeStamp
                        if (globalTableProjectInfo['received'][hisTopic])
                            globalTableProjectInfo['received'][hisTopic].unshift({
                                '时间': hisTime,
                                '值': stringendecoder.encodeHtml(hisMessage)
                            })
                        else {
                            globalTableProjectInfo['received'][hisTopic] = []
                            topicSelect.append($("<option value='" + hisTopic + "'>" + hisTopic + "</option>"))
                            globalTableProjectInfo['received'][hisTopic].unshift({
                                '时间': hisTime,
                                '值': stringendecoder.encodeHtml(hisMessage)
                            })
                        }
                    }
                    if (globalTableProjectInfo['currentTp'] != '$') {
                        globalTableProjectInfo['currentTp'] = globalTableProjectInfo['currentTp'].split(',,')[0]
                        topicSelect.val(stringendecoder.decodeHtml(globalTableProjectInfo['currentTp']))
                        fresh()
                    }
                    messageInput.val(stringendecoder.decodeHtml(globalTableProjectInfo['toBeSent']))
                    if (globalTableProjectInfo['currentTp2'])
                        topicSelect2.val(stringendecoder.decodeHtml(globalTableProjectInfo['currentTp2']))
                    init_table()
                }
            }
            var modaldd = showmodaltext("<div style='text-align:center' class='nnt'><i class='fa fa-spin fa-cog' style='font-size:2rem;color:#4e73df'></i><p style='margin-top:6px;margin-bottom:0;color:#4e73df;font-size:1rem;font-weight:bold'>" + JSLang[lang].loading + "</p></div>")
            $.get('queryShareKey', {
                'projectName': globalProjectName,
                'projectPass': globalProjectPass
            }, function(res) {
                if (res != -1)
                    globalShareKey = JSON.parse(res)['share_key']
                modaldd.close().remove()
            })
        }
        window.addEventListener("resize", function() {
            chart.resize();
        });
        if (projectType == LOGIC_MODE && isCode) {
            init_codemirror()
        }
    })
}

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

function add_widget() {
    var widget_list = $("<div class='widget_list nnt' style='display:flex;max-width:900px;width:900px;align-items:center;justify-content:center;flex-direction:row;flex-wrap:wrap;padding:10px'/>")
    var title = $("<div style='display:flex;align-items:center;justify-content:center;font-size:1.8rem!important;width:100%;text-align:center;margin-bottom:15px;margin-top:5px;color:#4e73df;font-size:1.3rem;font-weight:bold'><i class='fa fa-cube' style='margin-right:5px;font-size:2rem'></i><p style='margin:0'>" + JSLang[lang].widget + "</p><a class='btn btn-primary btn-block' style='width:90px;margin-left:8px;padding:2px' href='./documentation' target='_blank'>" + JSLang[lang].guide + "</a></div>")
    widget_list.append(title)
    //widget_list.append($("<h5 style='width:100%;text-align:center;margin-bottom:5px;margin-top:5px;color:#4e73df;font-size:1.3rem;font-weight:bold'>" + JSLang[lang].control + "</h5>"))
    var input_button_add = $("<div class='widget_div'><div><img src='icons/input_button.svg'><span>" + JSLang[lang].switch+"</span></div><a class='btn btn-success btn-block'><i class='fa fa-plus'></i></a></div>")
    widget_list.append(input_button_add)
    var input_button_add2 = $("<div class='widget_div'><div><img src='icons/input_button2.svg'><span>" + JSLang[lang].button + "</span></div><a class='btn btn-success btn-block'><i class='fa fa-plus'></i></a></div>")
    widget_list.append(input_button_add2)
    var input_slider_add = $("<div class='widget_div'><div><img src='icons/input_slider.svg'><span>" + JSLang[lang].slider + "</span></div><a class='btn btn-success btn-block'><i class='fa fa-plus'></i></a></div>")
    widget_list.append(input_slider_add)
    var input_controller_add = $("<div class='widget_div'><div><img src='icons/input_controller.svg'><span>" + JSLang[lang].joystick + "</span></div><a class='btn btn-success btn-block'><i class='fa fa-plus'></i></a></div>")
    widget_list.append(input_controller_add)
    var input_rgb_add = $("<div class='widget_div'><div><img src='icons/input_rgb.svg'><span>" + JSLang[lang].RGB + "</span></div><a class='btn btn-success btn-block'><i class='fa fa-plus'></i></a></div>")
    widget_list.append(input_rgb_add)
    var output_bulb_add = $("<div class='widget_div'><div><img src='icons/output_bulb.svg'><span>" + JSLang[lang].bulb + "</span></div><a class='btn btn-success btn-block'><i class='fa fa-plus'></i></a></div>")
    widget_list.append(output_bulb_add)
    var timer_add = $("<div class='widget_div'><div><img src='icons/timer.svg'><span>" + JSLang[lang].timer + "</span></div><a class='btn btn-success btn-block'><i class='fa fa-plus'></i></a></div>")
    widget_list.append(timer_add)
    var trigger_add = $("<div class='widget_div'><div><img src='icons/trigger.svg'><span>" + JSLang[lang].trigger + "</span></div><a class='btn btn-success btn-block'><i class='fa fa-plus'></i></a></div>")
    widget_list.append(trigger_add)
    var ble_add = $("<div class='widget_div'><div><img src='icons/ble.svg'><span>" + JSLang[lang].ble + "</span></div><a class='btn btn-success btn-block'><i class='fa fa-plus'></i></a></div>")
    widget_list.append(ble_add)
    //widget_list.append($("<h5 style='width:100%;text-align:center;margin-bottom:5px;margin-top:10px;color:#4e73df;font-size:1.3rem;font-weight:bold'>" + JSLang[lang].data + "</h5>"))
    var output_chart_add = $("<div class='widget_div'><div><img src='icons/output_chart.svg'><span>" + JSLang[lang].lineChart + "</span></div><a class='btn btn-success btn-block'><i class='fa fa-plus'></i></a></div>")
    widget_list.append(output_chart_add)
    var output_bar_add = $("<div class='widget_div'><div><img src='icons/output_bar.svg'><span>" + JSLang[lang].barChart + "</span></div><a class='btn btn-success btn-block'><i class='fa fa-plus'></i></a></div>")
    widget_list.append(output_bar_add)
    var table_add = $("<div class='widget_div'><div><img src='icons/table.svg'><span>" + JSLang[lang].dataTable + "</span></div><a class='btn btn-success btn-block'><i class='fa fa-plus'></i></a></div>")
    widget_list.append(table_add)
    var output_map_add = $("<div class='widget_div'><div><img src='icons/output_map.svg'><span>" + JSLang[lang].dataMap + "</span></div><a class='btn btn-" + (OFFLINE_MODE ? 'secondary' : 'success') + " btn-block'><i class='fa fa-" + (OFFLINE_MODE ? 'lock' : 'plus') + "'></i></a></div>")
    widget_list.append(output_map_add)
    var output_dashboard_add = $("<div class='widget_div'><div><img src='icons/output_dashboard.svg'><span>" + JSLang[lang].dashboard + "</span></div><a class='btn btn-success btn-block'><i class='fa fa-plus'></i></a></div>")
    widget_list.append(output_dashboard_add)
    var input_weather_add = $("<div class='widget_div'><div><img src='icons/input_weather.svg'><span>" + JSLang[lang].weather + "</span></div><a class='btn btn-" + (OFFLINE_MODE ? 'secondary' : 'success') + " btn-block'><i class='fa fa-" + (OFFLINE_MODE ? 'lock' : 'plus') + "'></i></a></div>")
    widget_list.append(input_weather_add)
    var input_camera_add = $("<div class='widget_div'><div><img src='icons/camera.svg'><span>" + JSLang[lang].camera + "</span></div><a class='btn btn-success btn-block'><i class='fa fa-plus'></i></a></div>")
    widget_list.append(input_camera_add)
    var input_mic_add = $("<div class='widget_div'><div><img src='icons/mic.svg'><span>" + JSLang[lang].mic + "</span></div><a class='btn btn-success btn-block'><i class='fa fa-plus'></i></a></div>")
    widget_list.append(input_mic_add)
    var input_tinydb_add = $("<div class='widget_div'><div><img src='icons/database.svg'><span>" + JSLang[lang].tinydb + "</span></div><a class='btn btn-success btn-block'><i class='fa fa-plus'></i></a></div>")
    widget_list.append(input_tinydb_add)
    //widget_list.append($("<h5 style='width:100%;text-align:center;margin-bottom:5px;margin-top:10px;color:#4e73df;font-size:1.3rem;font-weight:bold'>" + JSLang[lang].text + "</h5>"))
    var input_keyboard_add = $("<div class='widget_div'><div><img src='icons/input_keyboard.svg'><span>" + JSLang[lang].keyboard + "</span></div><a class='btn btn-success btn-block'><i class='fa fa-plus'></i></a></div>")
    widget_list.append(input_keyboard_add)
    var output_text_add = $("<div class='widget_div'><div><img src='icons/output_text.svg'><span>" + JSLang[lang].screen + "</span></div><a class='btn btn-success btn-block'><i class='fa fa-plus'></i></a></div>")
    widget_list.append(output_text_add)
    var output_pixel_add = $("<div class='widget_div'><div><img src='icons/output_pixel.svg'><span>" + JSLang[lang].pixel + "</span></div><a class='btn btn-success btn-block'><i class='fa fa-plus'></i></a></div>")
    widget_list.append(output_pixel_add)
    var decorate_text_add = $("<div class='widget_div'><div><img src='icons/decorate_text.svg'><span>" + JSLang[lang].label + "</span></div><a class='btn btn-success btn-block'><i class='fa fa-plus'></i></a></div>")
    widget_list.append(decorate_text_add)
    var decorate_pic_add = $("<div class='widget_div'><div><img src='icons/decorate_pic.svg'><span>" + JSLang[lang].picture + "</span></div><a class='btn btn-success btn-block'><i class='fa fa-plus'></i></a></div>")
    widget_list.append(decorate_pic_add)
    var magic_add = $("<div class='widget_div'><div><img src='icons/magic.svg'><span>" + JSLang[lang].magic + "</span></div><a class='btn btn-success btn-block'><i class='fa fa-plus'></i></a></div>")
    widget_list.append(magic_add)

    //widget_list.append($("<h5 style='width:100%;text-align:center;margin-bottom:5px;margin-top:10px;color:#4e73df;font-size:1.3rem;font-weight:bold'>" + JSLang[lang].tensorAI + "</h5>"))
    var blazeFace_add = $("<div class='widget_div'><div><img src='icons/blazeFace.svg'><span>" + JSLang[lang].blazeFace + "</span></div><a class='btn btn-success btn-block'><i class='fa fa-plus'></i></a></div>")
    widget_list.append(blazeFace_add)
    var ocr_add = $("<div class='widget_div'><div><img src='icons/mediaPipe.svg'><span>" + JSLang[lang].ocr + "</span></div><a class='btn btn-success btn-block'><i class='fa fa-plus'></i></a></div>")
    widget_list.append(ocr_add)
    var qr_add = $("<div class='widget_div'><div><img src='icons/qrcode.svg'><span>" + JSLang[lang].qr + "</span></div><a class='btn btn-success btn-block'><i class='fa fa-plus'></i></a></div>")
    widget_list.append(qr_add)
    //var bertQA_add = $("<div class='widget_div'><div><img src='icons/Bert.svg'><span>" + JSLang[lang].Bert + "</span></div><a class='btn btn-secondary btn-block'><i class='fa fa-plus'></i></a></div>")
    //widget_list.append(bertQA_add)

    ble_add.children("a").click(function() {
        d.close().remove()
        var editForm = $('<div class="nnt"/>')
        editForm.append($('<div style="margin-top:-63px;margin-left:82.5px;margin-bottom:15px;box-shadow: 1px 1px 20px #4e73df;background-color:white;width:75px;height:75px;padding:40px;border-radius:80px;border:solid #4e73df 3px;display:flex;align-items:center;justify-content:center"><img src="icons/ble.svg" style="width:45px;"></div>'))
        editForm.append($('<h5 style="text-align:center">' + JSLang[lang].unitName + '</h5>'))
        var title_input_div = $('<div style="display:flex;flex-direction:row;align-items:center"/>')
        var title_input = $("<input class='form-control form-control-user'  style='text-align:center' autofocus='autofocus'/>")
        title_input_div.append(title_input)
        editForm.append(title_input_div)
        editForm.append($('<h5 style="margin-top:15px;text-align:center">' + JSLang[lang].readMessTopic + '</h5>'))
        var topic_input_div = $('<div style="display:flex;flex-direction:row;align-items:center"/>')
        var topic_input = $("<input class='form-control form-control-user'  style='text-align:center'/>")
        topic_input_div.append(topic_input)
        topic_input.val("bleread")
        editForm.append(topic_input_div)
        editForm.append($('<h5 style="margin-top:15px;text-align:center">' + JSLang[lang].writeMessTopic + '</h5>'))
        var topic_input_div_2 = $('<div style="display:flex;flex-direction:row;align-items:center"/>')
        var topic_input_2 = $("<input class='form-control form-control-user'  style='text-align:center'/>")
        topic_input_div_2.append(topic_input_2)
        topic_input_2.val("blewrite")
        editForm.append(topic_input_div_2)
        editForm.append($('<h5 style="margin-top:15px;text-align:center">' + JSLang[lang].bleTarget + '</h5>'))
        var ble_target_div = $('<div style="display:flex;flex-direction:row;align-items:center"/>')
        var ble_target = $("<input class='form-control form-control-user'  style='text-align:center;cursor:pointer' readonly/>")
        ble_target.val(JSLang[lang].select)
        ble_target_div.append(ble_target)
        ble_target.click(function() {
            // use web bluetooth to select device, no filter
            if (navigator.bluetooth) {
                navigator.bluetooth.requestDevice({
                    acceptAllDevices: true,
                    // read and write to device characteristic (for example, to send data to a micro:bit)
                    optionalServices: [0xfff0]
                }).then(function(device) {
                    var old_ble_target = ble_target.val()
                    if(old_ble_target != JSLang[lang].select)
                    {
                        globalBLE[old_ble_target].gatt.disconnect()
                        delete globalBLE[old_ble_target]
                    }
                    ble_target.val(device.name + ' (' + device.id + ')')
                    globalBLE[device.name + ' (' + device.id + ')'] = device
                }).catch(function(error) {
                    // if user cancel the selection(NotFoundError)
                    if(error.name == "NotFoundError")
                    {
                        var old_ble_target = ble_target.val()
                        globalBLE[old_ble_target].gatt.disconnect()
                        delete globalBLE[old_ble_target]
                        ble_target.val(JSLang[lang].select)
                        title.parent().parent().attr('user-content', JSLang[lang].select)
                    }
                    else
                        showtext(error)
                })
            } else {
                showtext(JSLang[lang].noWebBluetooth)
            }
        })

        editForm.append(ble_target_div)
        var bottomDiv = $('<div style="width:100%;margin-top:15px;display:flex;flex-direction:row;align-items:center;justify-content:space-around"/>')
        var confirmEdit = $('<a class="btn btn-primary btn-circle" style="margin-right:10px;box-shadow:1px 1px 5px #4e73df;"><i class="fa fa-check"></i></a>')
        bottomDiv.append(confirmEdit)
        confirmEdit.click(function() {
            if (getByteLen(title_input.val()) > 0 && getByteLen(title_input.val()) < 21) {
                var re = /^[a-z0-9]+$/i;
                if (getByteLen(topic_input.val()) > 0 && getByteLen(topic_input.val()) < 11 && getByteLen(topic_input_2.val()) > 0 && getByteLen(topic_input_2.val()) < 11)
                    if (true) {
                        if (countSubstr(grid.html(), 'user-title=\"' + title_input.val() + '\"', false) <= 0) {
                            add_ble(title_input.val(), topic_input.val()+","+topic_input_2.val(), ble_target.val())
                            modifyDia.close().remove()
                        } else
                            showtext(JSLang[lang].sameUnit)
                    } else
                        showtext("")
                else
                    showtext(JSLang[lang].topicLenIllegal)
            } else
                showtext(JSLang[lang].nameLenIllegal)
        })
        var cancelEdit = $('<a class="btn btn-danger btn-circle"><i class="fa fa-arrow-left"></i></a>')
        cancelEdit.click(function() {
            modifyDia.close().remove()
            add_widget()
        })
        bottomDiv.append(cancelEdit)
        editForm.append(bottomDiv)
        var modifyDia = dialog({
            content: editForm[0],
            cancel: false
        })
        modifyDia.showModal()
    })

    blazeFace_add.children("a").click(function() {
        d.close().remove()
        var editForm = $('<div class="nnt"/>')
        editForm.append($('<div style="margin-top:-63px;margin-left:82.5px;margin-bottom:15px;box-shadow: 1px 1px 20px #4e73df;background-color:white;width:75px;height:75px;padding:40px;border-radius:80px;border:solid #4e73df 3px;display:flex;align-items:center;justify-content:center"><img src="icons/blazeFace.svg" style="width:45px;"></div>'))
        editForm.append($('<h5 style="text-align:center">' + JSLang[lang].unitName + '</h5>'))
        var title_input_div = $('<div style="display:flex;flex-direction:row;align-items:center"/>')
        var title_input = $("<input class='form-control form-control-user'  style='text-align:center' autofocus='autofocus'/>")
        title_input_div.append(title_input)
        editForm.append(title_input_div)
        editForm.append($('<h5 style="margin-top:15px;text-align:center">' + JSLang[lang].messTopic + '</h5>'))
        var topic_input_div = $('<div style="display:flex;flex-direction:row;align-items:center"/>')
        var topic_input = $("<input class='form-control form-control-user'  style='text-align:center'/>")
        topic_input_div.append(topic_input)
        topic_input.val("face")
        editForm.append(topic_input_div)
        editForm.append($('<h5 style="margin-top:15px;text-align:center">' + JSLang[lang].triggerInterval + '</h5>'))
        var trigger_interval_div = $('<div style="display:flex;flex-direction:row;align-items:center"/>')
        var trigger_interval = $("<input type='number' step='100' min='1000' max='100000' required class='form-control form-control-user'  style='text-align:center'/>")
        trigger_interval.val(1000)
        trigger_interval_div.append(trigger_interval)
        trigger_interval.change(function(){
            if(trigger_interval.val()<1000)
                trigger_interval.val(1000)
        })
        editForm.append(trigger_interval_div)
        var bottomDiv = $('<div style="width:100%;margin-top:15px;display:flex;flex-direction:row;align-items:center;justify-content:space-around"/>')
        var confirmEdit = $('<a class="btn btn-primary btn-circle" style="margin-right:10px;box-shadow:1px 1px 5px #4e73df;"><i class="fa fa-check"></i></a>')
        bottomDiv.append(confirmEdit)
        confirmEdit.click(function() {
            if (getByteLen(title_input.val()) > 0 && getByteLen(title_input.val()) < 21) {
                var re = /^[a-z0-9]+$/i;
                if (getByteLen(topic_input.val()) > 0 && getByteLen(topic_input.val()) < 11)
                    if (true) {
                        if (countSubstr(grid.html(), 'user-title=\"' + title_input.val() + '\"', false) <= 0) {
                            add_face(title_input.val(), topic_input.val(), "[" + trigger_interval.val() + "]")
                            modifyDia.close().remove()
                        } else
                            showtext(JSLang[lang].sameUnit)
                    } else
                        showtext("")
                else
                    showtext(JSLang[lang].topicLenIllegal)
            } else
                showtext(JSLang[lang].nameLenIllegal)
        })
        var cancelEdit = $('<a class="btn btn-danger btn-circle"><i class="fa fa-arrow-left"></i></a>')
        cancelEdit.click(function() {
            modifyDia.close().remove()
            add_widget()
        })
        bottomDiv.append(cancelEdit)
        editForm.append(bottomDiv)
        var modifyDia = dialog({
            content: editForm[0],
            cancel: false
        })
        modifyDia.showModal()
    })

    qr_add.children("a").click(function() {
        d.close().remove()
        var editForm = $('<div class="nnt"/>')
        editForm.append($('<div style="margin-top:-63px;margin-left:82.5px;margin-bottom:15px;box-shadow: 1px 1px 20px #4e73df;background-color:white;width:75px;height:75px;padding:40px;border-radius:80px;border:solid #4e73df 3px;display:flex;align-items:center;justify-content:center"><img src="icons/qrcode.svg" style="width:45px;"></div>'))
        editForm.append($('<h5 style="text-align:center">' + JSLang[lang].unitName + '</h5>'))
        var title_input_div = $('<div style="display:flex;flex-direction:row;align-items:center"/>')
        var title_input = $("<input class='form-control form-control-user'  style='text-align:center' autofocus='autofocus'/>")
        title_input_div.append(title_input)
        editForm.append(title_input_div)
        editForm.append($('<h5 style="margin-top:15px;text-align:center">' + JSLang[lang].messTopic + '</h5>'))
        var topic_input_div = $('<div style="display:flex;flex-direction:row;align-items:center"/>')
        var topic_input = $("<input class='form-control form-control-user'  style='text-align:center'/>")
        topic_input_div.append(topic_input)
        topic_input.val("qr")
        editForm.append(topic_input_div)
        var bottomDiv = $('<div style="width:100%;margin-top:15px;display:flex;flex-direction:row;align-items:center;justify-content:space-around"/>')
        var confirmEdit = $('<a class="btn btn-primary btn-circle" style="margin-right:10px;box-shadow:1px 1px 5px #4e73df;"><i class="fa fa-check"></i></a>')
        bottomDiv.append(confirmEdit)
        confirmEdit.click(function() {
            if (getByteLen(title_input.val()) > 0 && getByteLen(title_input.val()) < 21) {
                var re = /^[a-z0-9]+$/i;
                if (getByteLen(topic_input.val()) > 0 && getByteLen(topic_input.val()) < 11)
                    if (true) {
                        if (countSubstr(grid.html(), 'user-title=\"' + title_input.val() + '\"', false) <= 0) {
                            add_qr(title_input.val(), topic_input.val(), "")
                            modifyDia.close().remove()
                        } else
                            showtext(JSLang[lang].sameUnit)
                    } else
                        showtext("")
                else
                    showtext(JSLang[lang].topicLenIllegal)
            } else
                showtext(JSLang[lang].nameLenIllegal)
        })
        var cancelEdit = $('<a class="btn btn-danger btn-circle"><i class="fa fa-arrow-left"></i></a>')
        cancelEdit.click(function() {
            modifyDia.close().remove()
            add_widget()
        })
        bottomDiv.append(cancelEdit)
        editForm.append(bottomDiv)
        var modifyDia = dialog({
            content: editForm[0],
            cancel: false
        })
        modifyDia.showModal()
    })

    ocr_add.children("a").click(function() {
        d.close().remove()
        var editForm = $('<div class="nnt"/>')
        editForm.append($('<div style="margin-top:-63px;margin-left:82.5px;margin-bottom:15px;box-shadow: 1px 1px 20px #4e73df;background-color:white;width:75px;height:75px;padding:40px;border-radius:80px;border:solid #4e73df 3px;display:flex;align-items:center;justify-content:center"><img src="icons/mediaPipe.svg" style="width:45px;"></div>'))
        editForm.append($('<h5 style="text-align:center">' + JSLang[lang].unitName + '</h5>'))
        var title_input_div = $('<div style="display:flex;flex-direction:row;align-items:center"/>')
        var title_input = $("<input class='form-control form-control-user'  style='text-align:center' autofocus='autofocus'/>")
        title_input_div.append(title_input)
        editForm.append(title_input_div)
        editForm.append($('<h5 style="margin-top:15px;text-align:center">' + JSLang[lang].messTopic + '</h5>'))
        var topic_input_div = $('<div style="display:flex;flex-direction:row;align-items:center"/>')
        var topic_input = $("<input class='form-control form-control-user'  style='text-align:center'/>")
        topic_input.val("beep")
        topic_input_div.append(topic_input)
        editForm.append(topic_input_div)
        editForm.append($('<h5 style="margin-top:15px;text-align:center">' + JSLang[lang].beepAudio + '</h5>'))
        var beep_select = $('<select class="form-control form-control-user" style="margin-top:15px;text-align:center"/>')
        beep_select.append($('<option value="weak">弱提示</option>'))
        beep_select.append($('<option value="strong">强提示</option>'))
        beep_select.append($('<option value="alarm">警报音</option>'))
        editForm.append(beep_select)
        beep_select.val("weak")
        var bottomDiv = $('<div style="width:100%;margin-top:15px;display:flex;flex-direction:row;align-items:center;justify-content:space-around"/>')
        var confirmEdit = $('<a class="btn btn-primary btn-circle" style="margin-right:10px;box-shadow:1px 1px 5px #4e73df"><i class="fa fa-check"></i></a>')
        bottomDiv.append(confirmEdit)
        confirmEdit.click(function() {
            if (getByteLen(title_input.val()) > 0 && getByteLen(title_input.val()) < 21) {
                var re = /^[a-z0-9]+$/i;
                if (getByteLen(topic_input.val()) > 0 && getByteLen(topic_input.val()) < 11)
                    if (true) {
                        if (countSubstr(grid.html(), 'user-title=\"' + title_input.val() + '\"', false) <= 0) {
                            add_ocr(title_input.val(), topic_input.val(), beep_select.val())
                            modifyDia.close().remove()
                        } else
                            showtext(JSLang[lang].sameUnit)
                    } else
                        showtext("")
                else
                    showtext(JSLang[lang].topicLenIllegal)
            } else
                showtext(JSLang[lang].nameLenIllegal)
        })
        var cancelEdit = $('<a class="btn btn-danger btn-circle" style="box-shadow:1px 1px 5px #e74a3b"><i class="fa fa-arrow-left"></i></a>')
        cancelEdit.click(function() {
            modifyDia.close().remove()
            add_widget()
        })
        bottomDiv.append(cancelEdit)
        editForm.append(bottomDiv)
        var modifyDia = dialog({
            content: editForm[0],
            cancel: false
        })
        modifyDia.showModal()
    })

    input_camera_add.children("a").click(function() {
        d.close().remove()
        var editForm = $('<div class="nnt"/>')
        editForm.append($('<div style="margin-top:-63px;margin-left:82.5px;margin-bottom:15px;box-shadow: 1px 1px 20px #4e73df;background-color:white;width:75px;height:75px;padding:40px;border-radius:80px;border:solid #4e73df 3px;display:flex;align-items:center;justify-content:center"><img src="icons/camera.svg" style="width:45px;"></div>'))
        editForm.append($('<h5 style="text-align:center">' + JSLang[lang].unitName + '</h5>'))
        var title_input_div = $('<div style="display:flex;flex-direction:row;align-items:center"/>')
        var title_input = $("<input class='form-control form-control-user'  style='text-align:center' autofocus='autofocus'/>")
        title_input_div.append(title_input)
        editForm.append(title_input_div)
        editForm.append($('<h5 style="margin-top:15px;text-align:center">' + JSLang[lang].messTopic + '</h5>'))
        var topic_input_div = $('<div style="display:flex;flex-direction:row;align-items:center"/>')
        var topic_input = $("<input class='form-control form-control-user'  style='text-align:center'/>")
        topic_input_div.append(topic_input)
        topic_input.val("camera")
        editForm.append(topic_input_div)
        // resolution selection
        editForm.append($('<h5 style="margin-top:15px;text-align:center">' + JSLang[lang].resolution + '</h5>'))
        var resolution_input_div = $('<div style="display:flex;flex-direction:row;align-items:center"/>')
        var resolution_input = $("<select class='form-control form-control-user' style='text-align:center;cursor:pointer'/>")
        resolution_input_div.append(resolution_input)
        resolution_input.append($("<option value='160x120'>160x120</option>"))
        resolution_input.append($("<option value='320x240'>320x240</option>"))
        editForm.append(resolution_input_div)
        // fps selection
        editForm.append($('<h5 style="margin-top:15px;text-align:center">' + JSLang[lang].fps + '</h5>'))
        var fps_input_div = $('<div style="display:flex;flex-direction:row;align-items:center"/>')
        var fps_input = $("<select class='form-control form-control-user' style='text-align:center;cursor:pointer'/>")
        fps_input_div.append(fps_input)
        fps_input.append($("<option value='1'>1</option>"))
        fps_input.append($("<option value='2'>2</option>"))
        editForm.append(fps_input_div)
        var bottomDiv = $('<div style="width:100%;margin-top:15px;display:flex;flex-direction:row;align-items:center;justify-content:space-around"/>')
        var confirmEdit = $('<a class="btn btn-primary btn-circle" style="margin-right:10px;box-shadow:1px 1px 5px #4e73df;"><i class="fa fa-check"></i></a>')
        bottomDiv.append(confirmEdit)
        confirmEdit.click(function() {
            if (getByteLen(title_input.val()) > 0 && getByteLen(title_input.val()) < 21) {
                var re = /^[a-z0-9]+$/i;
                if (getByteLen(topic_input.val()) > 0 && getByteLen(topic_input.val()) < 11)
                    if (true) {
                        if (countSubstr(grid.html(), 'user-title=\"' + title_input.val() + '\"', false) <= 0) {
                            add_camera(title_input.val(), topic_input.val(), resolution_input.val() + "," + fps_input.val())
                            modifyDia.close().remove()
                        } else
                            showtext(JSLang[lang].sameUnit)
                    } else
                        showtext("")
                else
                    showtext(JSLang[lang].topicLenIllegal)
            } else
                showtext(JSLang[lang].nameLenIllegal)
        })
        var cancelEdit = $('<a class="btn btn-danger btn-circle"><i class="fa fa-arrow-left"></i></a>')
        cancelEdit.click(function() {
            modifyDia.close().remove()
            add_widget()
        })
        bottomDiv.append(cancelEdit)
        editForm.append(bottomDiv)
        var modifyDia = dialog({
            content: editForm[0],
            cancel: false
        })
        modifyDia.showModal()
    })

    output_pixel_add.children("a").click(function() {
        d.close().remove()
        var editForm = $('<div class="nnt"/>')
        editForm.append($('<div style="margin-top:-63px;margin-left:82.5px;margin-bottom:15px;box-shadow: 1px 1px 20px #4e73df;background-color:white;width:75px;height:75px;padding:40px;border-radius:80px;border:solid #4e73df 3px;display:flex;align-items:center;justify-content:center"><img src="icons/output_pixel.svg" style="width:45px;"></div>'))
        editForm.append($('<h5 style="text-align:center">' + JSLang[lang].unitName + '</h5>'))
        var title_input_div = $('<div style="display:flex;flex-direction:row;align-items:center"/>')
        var title_input = $("<input class='form-control form-control-user'  style='text-align:center'/>")
        title_input_div.append(title_input)
        editForm.append(title_input_div)
        editForm.append($('<h5 style="margin-top:15px;text-align:center">' + JSLang[lang].messTopic + '</h5>'))
        var topic_input_div = $('<div style="display:flex;flex-direction:row;align-items:center"/>')
        var topic_input = $("<input class='form-control form-control-user'  style='text-align:center'/>")
        topic_input_div.append(topic_input)
        topic_input.val("pixel")
        editForm.append(topic_input_div)
        editForm.append($('<h5 style="margin-top:15px;text-align:center">' + JSLang[lang].xpixel + '</h5>'))
        var xpixel_input_div = $('<div style="display:flex;flex-direction:row;align-items:center"/>')
        var xpixel_input = $("<input class='form-control form-control-user' type='number' min='1' max='100' style='text-align:center'/>")
        xpixel_input_div.append(xpixel_input)
        editForm.append(xpixel_input_div)
        editForm.append($('<h5 style="margin-top:15px;text-align:center">' + JSLang[lang].ypixel + '</h5>'))
        var ypixel_input_div = $('<div style="display:flex;flex-direction:row;align-items:center"/>')
        var ypixel_input = $("<input class='form-control form-control-user' type='number' min='1' max='100' style='text-align:center'/>")
        ypixel_input_div.append(ypixel_input)
        editForm.append(ypixel_input_div)
        var bottomDiv = $('<div style="width:100%;margin-top:15px;display:flex;flex-direction:row;align-items:center;justify-content:space-around"/>')
        var confirmEdit = $('<a class="btn btn-primary btn-circle" style="margin-right:10px;box-shadow:1px 1px 5px #4e73df;"><i class="fa fa-check"></i></a>')
        bottomDiv.append(confirmEdit)
        xpixel_input.val(30)
        ypixel_input.val(20)
        confirmEdit.click(function() {
            if (getByteLen(title_input.val()) > 0 && getByteLen(title_input.val()) < 21) {
                var re = /^[a-z0-9]+$/i;
                if (getByteLen(topic_input.val()) > 0 && getByteLen(topic_input.val()) < 11)
                    if (xpixel_input.val() > 0 && xpixel_input.val() < 101 && ypixel_input.val() > 0 && ypixel_input.val() < 101) {
                        if (countSubstr(grid.html(), 'user-title=\"' + title_input.val() + '\"', false) <= 0) {
                            add_pixel(title_input.val(), topic_input.val(), xpixel_input.val() + "," + ypixel_input.val())
                            modifyDia.close().remove()
                        } else
                            showtext(JSLang[lang].sameUnit)
                    } else
                        showtext(JSLang[lang].invalidPixel)
                else
                    showtext(JSLang[lang].topicLenIllegal)
            } else
                showtext(JSLang[lang].nameLenIllegal)
        })
        var cancelEdit = $('<a class="btn btn-danger btn-circle"><i class="fa fa-arrow-left"></i></a>')
        cancelEdit.click(function() {
            modifyDia.close().remove()
            add_widget()
        })
        bottomDiv.append(cancelEdit)
        editForm.append(bottomDiv)
        var modifyDia = dialog({
            content: editForm[0],
            cancel: false
        })
        modifyDia.showModal()
    })

    input_button_add.children("a").click(function() {
        d.close().remove()
        var editForm = $('<div class="nnt"/>')
        editForm.append($('<div style="margin-top:-63px;margin-left:82.5px;margin-bottom:15px;box-shadow: 1px 1px 20px #4e73df;background-color:white;width:75px;height:75px;padding:40px;border-radius:80px;border:solid #4e73df 3px;display:flex;align-items:center;justify-content:center"><img src="icons/input_button.svg" style="width:45px;"></div>'))
        editForm.append($('<h5 style="text-align:center">' + JSLang[lang].unitName + '</h5>'))
        var title_input_div = $('<div style="display:flex;flex-direction:row;align-items:center"/>')
        var title_input = $("<input class='form-control form-control-user'  style='text-align:center' autofocus='autofocus'/>")
        title_input_div.append(title_input)
        editForm.append(title_input_div)
        editForm.append($('<h5 style="margin-top:15px;text-align:center">' + JSLang[lang].messTopic + '</h5>'))
        var topic_input_div = $('<div style="display:flex;flex-direction:row;align-items:center"/>')
        var topic_input = $("<input class='form-control form-control-user'  style='text-align:center'/>")
        topic_input_div.append(topic_input)
        topic_input.val("button")
        editForm.append(topic_input_div)
        editForm.append($('<h5 style="margin-top:15px;text-align:center">' + JSLang[lang].feedbackMode + '</h5>'))
        var modeButton = $("<label class='switch' style='margin-bottom:0'></label>")
        var modeCheckbox = $("<input type='checkbox'>")
        modeCheckbox.prop("checked", false)
        modeCheckbox.click(function() {
            if (modeCheckbox.prop("checked"))
                editForm.find("img").attr("src", "icons/input_button2.svg")
            else
                editForm.find("img").attr("src", "icons/input_button.svg")
        })
        var modeCheckDiv = $("<div class='slider2 round'></div>")
        modeButton.append(modeCheckbox)
        modeButton.append(modeCheckDiv)
        var modeDiv = $("<div style='display:flex;margin-top:10px;flex-direction:row;align-items:center;justify-content:center'/>")
        modeDiv.append($("<span style='font-size:1rem;margin-right:10px;color:#4e73df;font-weight:bold'>" + JSLang[lang].switch+"</span>"))
        modeDiv.append(modeButton)
        modeDiv.append($("<span style='font-size:1rem;margin-left:10px;color:#e74a3b;font-weight:bold'>" + JSLang[lang].button + "</span>"))
        editForm.append(modeDiv)
        var bottomDiv = $('<div style="width:100%;margin-top:15px;display:flex;flex-direction:row;align-items:center;justify-content:space-around"/>')
        var confirmEdit = $('<a class="btn btn-primary btn-circle" style="margin-right:10px;box-shadow:1px 1px 5px #4e73df;"><i class="fa fa-check"></i></a>')
        bottomDiv.append(confirmEdit)
        confirmEdit.click(function() {
            if (getByteLen(title_input.val()) > 0 && getByteLen(title_input.val()) < 21) {
                var re = /^[a-z0-9]+$/i;
                if (getByteLen(topic_input.val()) > 0 && getByteLen(topic_input.val()) < 11)
                    if (true) {
                        if (countSubstr(grid.html(), 'user-title=\"' + title_input.val() + '\"', false) <= 0) {
                            add_button(title_input.val(), topic_input.val(), modeCheckbox.prop('checked') ? 2 : 0)
                            modifyDia.close().remove()
                        } else
                            showtext(JSLang[lang].sameUnit)
                    } else
                        showtext("")
                else
                    showtext(JSLang[lang].topicLenIllegal)
            } else
                showtext(JSLang[lang].nameLenIllegal)
        })
        var cancelEdit = $('<a class="btn btn-danger btn-circle"><i class="fa fa-arrow-left"></i></a>')
        cancelEdit.click(function() {
            modifyDia.close().remove()
            add_widget()
        })
        bottomDiv.append(cancelEdit)
        editForm.append(bottomDiv)
        var modifyDia = dialog({
            content: editForm[0],
            cancel: false
        })
        modifyDia.showModal()
    })

    input_button_add2.children("a").click(function() {
        d.close().remove()
        var editForm = $('<div class="nnt"/>')
        editForm.append($('<div style="margin-top:-63px;margin-left:82.5px;margin-bottom:15px;box-shadow: 1px 1px 20px #4e73df;background-color:white;width:75px;height:75px;padding:40px;border-radius:80px;border:solid #4e73df 3px;display:flex;align-items:center;justify-content:center"><img src="icons/input_button2.svg" style="width:45px;"></div>'))
        editForm.append($('<h5 style="text-align:center">' + JSLang[lang].unitName + '</h5>'))
        var title_input_div = $('<div style="display:flex;flex-direction:row;align-items:center"/>')
        var title_input = $("<input class='form-control form-control-user'  style='text-align:center' autofocus='autofocus'/>")
        title_input_div.append(title_input)
        editForm.append(title_input_div)
        editForm.append($('<h5 style="margin-top:15px;text-align:center">' + JSLang[lang].messTopic + '</h5>'))
        var topic_input_div = $('<div style="display:flex;flex-direction:row;align-items:center"/>')
        var topic_input = $("<input class='form-control form-control-user'  style='text-align:center'/>")
        topic_input_div.append(topic_input)
        topic_input.val("button")
        editForm.append(topic_input_div)
        editForm.append($('<h5 style="margin-top:15px;text-align:center">' + JSLang[lang].feedbackMode + '</h5>'))
        var modeButton = $("<label class='switch' style='margin-bottom:0'></label>")
        var modeCheckbox = $("<input type='checkbox'>")
        modeCheckbox.prop("checked", true)
        modeCheckbox.click(function() {
            if (modeCheckbox.prop("checked"))
                editForm.find("img").attr("src", "icons/input_button2.svg")
            else
                editForm.find("img").attr("src", "icons/input_button.svg")
        })
        var modeCheckDiv = $("<div class='slider2 round'></div>")
        modeButton.append(modeCheckbox)
        modeButton.append(modeCheckDiv)
        var modeDiv = $("<div style='display:flex;margin-top:10px;flex-direction:row;align-items:center;justify-content:center'/>")
        modeDiv.append($("<span style='font-size:1rem;margin-right:10px;color:#4e73df;font-weight:bold'>" + JSLang[lang].switch+"</span>"))
        modeDiv.append(modeButton)
        modeDiv.append($("<span style='font-size:1rem;margin-left:10px;color:#e74a3b;font-weight:bold'>" + JSLang[lang].button + "</span>"))
        editForm.append(modeDiv)
        var bottomDiv = $('<div style="width:100%;margin-top:15px;display:flex;flex-direction:row;align-items:center;justify-content:space-around"/>')
        var confirmEdit = $('<a class="btn btn-primary btn-circle" style="margin-right:10px;box-shadow:1px 1px 5px #4e73df;"><i class="fa fa-check"></i></a>')
        bottomDiv.append(confirmEdit)
        confirmEdit.click(function() {
            if (getByteLen(title_input.val()) > 0 && getByteLen(title_input.val()) < 21) {
                var re = /^[a-z0-9]+$/i;
                if (getByteLen(topic_input.val()) > 0 && getByteLen(topic_input.val()) < 11)
                    if (true) {
                        if (countSubstr(grid.html(), 'user-title=\"' + title_input.val() + '\"', false) <= 0) {
                            add_button(title_input.val(), topic_input.val(), modeCheckbox.prop('checked') ? 2 : 0)
                            modifyDia.close().remove()
                        } else
                            showtext(JSLang[lang].sameUnit)
                    } else
                        showtext("")
                else
                    showtext(JSLang[lang].topicLenIllegal)
            } else
                showtext(JSLang[lang].nameLenIllegal)
        })
        var cancelEdit = $('<a class="btn btn-danger btn-circle"><i class="fa fa-arrow-left"></i></a>')
        cancelEdit.click(function() {
            modifyDia.close().remove()
            add_widget()
        })
        bottomDiv.append(cancelEdit)
        editForm.append(bottomDiv)
        var modifyDia = dialog({
            content: editForm[0],
            cancel: false
        })
        modifyDia.showModal()
    })

    input_slider_add.children("a").click(function() {
        d.close().remove()
        var editForm = $('<div class="nnt"/>')
        editForm.append($('<div style="margin-top:-63px;margin-left:105px;margin-bottom:15px;box-shadow: 1px 1px 20px #4e73df;background-color:white;width:75px;height:75px;padding:40px;border-radius:80px;border:solid #4e73df 3px;display:flex;align-items:center;justify-content:center"><img src="icons/input_slider.svg" style="width:45px;"></div>'))
        editForm.append($('<h5 style="text-align:center">' + JSLang[lang].unitName + '</h5>'))
        var title_input_div = $('<div style="display:flex;flex-direction:row;align-items:center"/>')
        var title_input = $("<input class='form-control form-control-user'  style='text-align:center' autofocus='autofocus'/>")
        title_input_div.append(title_input)
        editForm.append(title_input_div)
        editForm.append($('<h5 style="margin-top:15px;text-align:center">' + JSLang[lang].messTopic + '</h5>'))
        var topic_input_div = $('<div style="display:flex;flex-direction:row;align-items:center"/>')
        var topic_input = $("<input class='form-control form-control-user'  style='text-align:center'/>")
        topic_input.val("slider")
        topic_input_div.append(topic_input)
        editForm.append(topic_input_div)
        var bottomDiv = $('<div style="width:100%;margin-top:15px;display:flex;flex-direction:row;align-items:center;justify-content:space-around"/>')
        var confirmEdit = $('<a class="btn btn-primary btn-circle" style="margin-right:10px;box-shadow:1px 1px 5px #4e73df"><i class="fa fa-check"></i></a>')
        bottomDiv.append(confirmEdit)
        confirmEdit.click(function() {
            if (getByteLen(title_input.val()) > 0 && getByteLen(title_input.val()) < 21) {
                var re = /^[a-z0-9]+$/i;
                if (getByteLen(topic_input.val()) > 0 && getByteLen(topic_input.val()) < 11)
                    if (true) {
                        if (countSubstr(grid.html(), 'user-title=\"' + title_input.val() + '\"', false) <= 0) {
                            if (!isNaN(parseFloat(minInput.val())) && !isNaN(parseFloat(maxInput.val())) && !isNaN(parseFloat(paceInput.val())) && (parseFloat(paceInput.val()) > 0) && (parseFloat(maxInput.val()) > parseFloat(minInput.val())) && ((parseFloat(maxInput.val()) - parseFloat(minInput.val())) > parseFloat(paceInput.val()))) {
                                add_slider(title_input.val(), topic_input.val(), minInput.val() + "," + maxInput.val() + "," + paceInput.val() + "," + minInput.val())
                                modifyDia.close().remove()
                            } else {
                                showtext(JSLang[lang].invalidSlideRange)
                            }
                        } else
                            showtext(JSLang[lang].sameUnit)
                    } else
                        showtext("")
                else
                    showtext(JSLang[lang].topicLenIllegal)
            } else
                showtext(JSLang[lang].nameLenIllegal)
        })
        editForm.append($('<h5 style="margin-top:15px;text-align:center">' + JSLang[lang].slideRange + '</h5>'))
        var rangeDiv = $("<div style='display:flex;flex-direction:row;align-items:center;justify-content:center'/>")
        var minInput = $("<input placeholder='" + JSLang[lang].min + "' class='form-control' style='min-width:70px;width:70px'/>")
        rangeDiv.append(minInput)
        rangeDiv.append("<span style='margin-left:10px;margin-right:10px'>-</span>")
        var maxInput = $("<input placeholder='" + JSLang[lang].max + "' class='form-control' style='min-width:70px;width:70px'/>")
        rangeDiv.append(maxInput)
        rangeDiv.append($('<span style="margin-left:20px;margin-right:5px">' + JSLang[lang].step + '</span>'))
        var paceInput = $("<input placeholder='' class='form-control' style='min-width:70px;width:70px'/>")
        rangeDiv.append(paceInput)
        editForm.append(rangeDiv)
        var cancelEdit = $('<a class="btn btn-danger btn-circle" style="box-shadow:1px 1px 5px #e74a3b"><i class="fa fa-arrow-left"></i></a>')
        minInput.val(0)
        maxInput.val(10)
        paceInput.val(1)
        cancelEdit.click(function() {
            modifyDia.close().remove()
            add_widget()
        })
        bottomDiv.append(cancelEdit)
        editForm.append(bottomDiv)
        var modifyDia = dialog({
            content: editForm[0],
            cancel: false
        })
        modifyDia.showModal()
    })

    input_keyboard_add.children("a").click(function() {
        d.close().remove()
        var editForm = $('<div class="nnt"/>')
        editForm.append($('<div style="margin-top:-63px;margin-left:82.5px;margin-bottom:15px;box-shadow: 1px 1px 20px #4e73df;background-color:white;width:75px;height:75px;padding:40px;border-radius:80px;border:solid #4e73df 3px;display:flex;align-items:center;justify-content:center"><img src="icons/input_keyboard.svg" style="width:45px;"></div>'))
        editForm.append($('<h5 style="text-align:center">' + JSLang[lang].unitName + '</h5>'))
        var title_input_div = $('<div style="display:flex;flex-direction:row;align-items:center"/>')
        var title_input = $("<input class='form-control form-control-user'  style='text-align:center' autofocus='autofocus'/>")
        title_input_div.append(title_input)
        editForm.append(title_input_div)
        editForm.append($('<h5 style="margin-top:15px;text-align:center">' + JSLang[lang].messTopic + '</h5>'))
        var topic_input_div = $('<div style="display:flex;flex-direction:row;align-items:center"/>')
        var topic_input = $("<input class='form-control form-control-user'  style='text-align:center'/>")
        topic_input.val("keyboard")
        topic_input_div.append(topic_input)
        editForm.append(topic_input_div)
        var bottomDiv = $('<div style="width:100%;margin-top:15px;display:flex;flex-direction:row;align-items:center;justify-content:space-around"/>')
        var confirmEdit = $('<a class="btn btn-primary btn-circle" style="margin-right:10px;box-shadow:1px 1px 5px #4e73df"><i class="fa fa-check"></i></a>')
        bottomDiv.append(confirmEdit)
        confirmEdit.click(function() {
            if (getByteLen(title_input.val()) > 0 && getByteLen(title_input.val()) < 21) {
                var re = /^[a-z0-9]+$/i;
                if (getByteLen(topic_input.val()) > 0 && getByteLen(topic_input.val()) < 11)
                    if (true) {
                        if (countSubstr(grid.html(), 'user-title=\"' + title_input.val() + '\"', false) <= 0) {
                            add_keyboard(title_input.val(), topic_input.val(), "")
                            modifyDia.close().remove()
                        } else
                            showtext(JSLang[lang].sameUnit)
                    } else
                        showtext("")
                else
                    showtext(JSLang[lang].topicLenIllegal)
            } else
                showtext(JSLang[lang].nameLenIllegal)
        })
        var cancelEdit = $('<a class="btn btn-danger btn-circle" style="box-shadow:1px 1px 5px #e74a3b"><i class="fa fa-arrow-left"></i></a>')
        cancelEdit.click(function() {
            modifyDia.close().remove()
            add_widget()
        })
        bottomDiv.append(cancelEdit)
        editForm.append(bottomDiv)
        var modifyDia = dialog({
            content: editForm[0],
            cancel: false
        })
        modifyDia.showModal()
    })

    input_tinydb_add.children("a").click(function() {
        d.close().remove()
        var editForm = $('<div class="nnt"/>')
        editForm.append($('<div style="margin-top:-63px;margin-left:82.5px;margin-bottom:15px;box-shadow: 1px 1px 20px #4e73df;background-color:white;width:75px;height:75px;padding:40px;border-radius:80px;border:solid #4e73df 3px;display:flex;align-items:center;justify-content:center"><img src="icons/database.svg" style="width:45px;"></div>'))
        editForm.append($('<h5 style="text-align:center">' + JSLang[lang].unitName + '</h5>'))
        var title_input_div = $('<div style="display:flex;flex-direction:row;align-items:center"/>')
        var title_input = $("<input class='form-control form-control-user'  style='text-align:center' autofocus='autofocus'/>")
        title_input_div.append(title_input)
        editForm.append(title_input_div)
        editForm.append($('<h5 style="margin-top:15px;text-align:center">' + JSLang[lang].messTopic + '</h5>'))
        var topic_input_div = $('<div style="display:flex;flex-direction:row;align-items:center"/>')
        var topic_input = $("<input class='form-control form-control-user'  style='text-align:center'/>")
        topic_input.val("select")
        topic_input_div.append(topic_input)
        editForm.append(topic_input_div)
        editForm.append($('<h5 style="margin-top:15px;text-align:center">' + JSLang[lang].options + '</h5>'))
        var options_input_div = $('<div style="display:flex;flex-direction:row;align-items:center"/>')
        var options_input = $("<input class='form-control form-control-user'  style='text-align:center'/>")
        options_input_div.append(options_input)
        editForm.append(options_input_div)
        var bottomDiv = $('<div style="width:100%;margin-top:15px;display:flex;flex-direction:row;align-items:center;justify-content:space-around"/>')
        var confirmEdit = $('<a class="btn btn-primary btn-circle" style="margin-right:10px;box-shadow:1px 1px 5px #4e73df"><i class="fa fa-check"></i></a>')
        bottomDiv.append(confirmEdit)
        confirmEdit.click(function() {
            if (getByteLen(title_input.val()) > 0 && getByteLen(title_input.val()) < 21) {
                var re = /^[a-z0-9]+$/i;
                if (getByteLen(topic_input.val()) > 0 && getByteLen(topic_input.val()) < 11)
                    if (true) {
                        if (countSubstr(grid.html(), 'user-title=\"' + title_input.val() + '\"', false) <= 0) {
                            add_tinydb(title_input.val(), topic_input.val(), options_input.val())
                            modifyDia.close().remove()
                        } else
                            showtext(JSLang[lang].sameUnit)
                    } else
                        showtext("")
                else
                    showtext(JSLang[lang].topicLenIllegal)
            } else
                showtext(JSLang[lang].nameLenIllegal)
        })
        var cancelEdit = $('<a class="btn btn-danger btn-circle" style="box-shadow:1px 1px 5px #e74a3b"><i class="fa fa-arrow-left"></i></a>')
        cancelEdit.click(function() {
            modifyDia.close().remove()
            add_widget()
        })
        bottomDiv.append(cancelEdit)
        editForm.append(bottomDiv)
        var modifyDia = dialog({
            content: editForm[0],
            cancel: false
        })
        modifyDia.showModal()
    })

    input_mic_add.children("a").click(function() {
        d.close().remove()
        var editForm = $('<div class="nnt"/>')
        editForm.append($('<div style="margin-top:-63px;margin-left:82.5px;margin-bottom:15px;box-shadow: 1px 1px 20px #4e73df;background-color:white;width:75px;height:75px;padding:40px;border-radius:80px;border:solid #4e73df 3px;display:flex;align-items:center;justify-content:center"><img src="icons/mic.svg" style="width:45px;"></div>'))
        editForm.append($('<h5 style="text-align:center">' + JSLang[lang].unitName + '</h5>'))
        var title_input_div = $('<div style="display:flex;flex-direction:row;align-items:center"/>')
        var title_input = $("<input class='form-control form-control-user'  style='text-align:center' autofocus='autofocus'/>")
        title_input_div.append(title_input)
        editForm.append(title_input_div)
        editForm.append($('<h5 style="margin-top:15px;text-align:center">' + JSLang[lang].messTopic + '</h5>'))
        var topic_input_div = $('<div style="display:flex;flex-direction:row;align-items:center"/>')
        var topic_input = $("<input class='form-control form-control-user'  style='text-align:center'/>")
        topic_input.val("mic")
        topic_input_div.append(topic_input)
        editForm.append(topic_input_div)
        var bottomDiv = $('<div style="width:100%;margin-top:15px;display:flex;flex-direction:row;align-items:center;justify-content:space-around"/>')
        var confirmEdit = $('<a class="btn btn-primary btn-circle" style="margin-right:10px;box-shadow:1px 1px 5px #4e73df"><i class="fa fa-check"></i></a>')
        bottomDiv.append(confirmEdit)
        confirmEdit.click(function() {
            if (getByteLen(title_input.val()) > 0 && getByteLen(title_input.val()) < 21) {
                var re = /^[a-z0-9]+$/i;
                if (getByteLen(topic_input.val()) > 0 && getByteLen(topic_input.val()) < 11)
                    if (true) {
                        if (countSubstr(grid.html(), 'user-title=\"' + title_input.val() + '\"', false) <= 0) {
                            add_mic(title_input.val(), topic_input.val(), "")
                            modifyDia.close().remove()
                        } else
                            showtext(JSLang[lang].sameUnit)
                    } else
                        showtext("")
                else
                    showtext(JSLang[lang].topicLenIllegal)
            } else
                showtext(JSLang[lang].nameLenIllegal)
        })
        var cancelEdit = $('<a class="btn btn-danger btn-circle" style="box-shadow:1px 1px 5px #e74a3b"><i class="fa fa-arrow-left"></i></a>')
        cancelEdit.click(function() {
            modifyDia.close().remove()
            add_widget()
        })
        bottomDiv.append(cancelEdit)
        editForm.append(bottomDiv)
        var modifyDia = dialog({
            content: editForm[0],
            cancel: false
        })
        modifyDia.showModal()
    })

    input_controller_add.children("a").click(function() {
        d.close().remove()
        var editForm = $('<div class="nnt"/>')
        editForm.append($('<div style="margin-top:-63px;margin-left:82.5px;margin-bottom:15px;box-shadow: 1px 1px 20px #4e73df;background-color:white;width:75px;height:75px;padding:40px;border-radius:80px;border:solid #4e73df 3px;display:flex;align-items:center;justify-content:center"><img src="icons/input_controller.svg" style="width:45px;"></div>'))
        editForm.append($('<h5 style="text-align:center">' + JSLang[lang].unitName + '</h5>'))
        var title_input_div = $('<div style="display:flex;flex-direction:row;align-items:center"/>')
        var title_input = $("<input class='form-control form-control-user'  style='text-align:center' autofocus='autofocus'/>")
        title_input_div.append(title_input)
        editForm.append(title_input_div)
        editForm.append($('<h5 style="margin-top:15px;text-align:center">' + JSLang[lang].messTopic + '</h5>'))
        var topic_input_div = $('<div style="display:flex;flex-direction:row;align-items:center"/>')
        var topic_input = $("<input class='form-control form-control-user'  style='text-align:center'/>")
        topic_input.val("controller")
        topic_input_div.append(topic_input)
        editForm.append(topic_input_div)
        var bottomDiv = $('<div style="width:100%;margin-top:15px;display:flex;flex-direction:row;align-items:center;justify-content:space-around"/>')
        var confirmEdit = $('<a class="btn btn-primary btn-circle" style="margin-right:10px;box-shadow:1px 1px 5px #4e73df"><i class="fa fa-check"></i></a>')
        bottomDiv.append(confirmEdit)
        confirmEdit.click(function() {
            if (getByteLen(title_input.val()) > 0 && getByteLen(title_input.val()) < 21) {
                var re = /^[a-z0-9]+$/i;
                if (getByteLen(topic_input.val()) > 0 && getByteLen(topic_input.val()) < 11)
                    if (true) {
                        if (countSubstr(grid.html(), 'user-title=\"' + title_input.val() + '\"', false) <= 0) {
                            add_controller(title_input.val(), topic_input.val())
                            modifyDia.close().remove()
                        } else
                            showtext(JSLang[lang].sameUnit)
                    } else
                        showtext("")
                else
                    showtext(JSLang[lang].topicLenIllegal)
            } else
                showtext(JSLang[lang].nameLenIllegal)
        })
        var cancelEdit = $('<a class="btn btn-danger btn-circle" style="box-shadow:1px 1px 5px #e74a3b"><i class="fa fa-arrow-left"></i></a>')
        cancelEdit.click(function() {
            modifyDia.close().remove()
            add_widget()
        })
        bottomDiv.append(cancelEdit)
        editForm.append(bottomDiv)
        var modifyDia = dialog({
            content: editForm[0],
            cancel: false
        })
        modifyDia.showModal()
    })

    input_rgb_add.children("a").click(function() {
        d.close().remove()
        var editForm = $('<div class="nnt"/>')
        editForm.append($('<div style="margin-top:-63px;margin-left:82.5px;margin-bottom:15px;box-shadow: 1px 1px 20px #4e73df;background-color:white;width:75px;height:75px;padding:40px;border-radius:80px;border:solid #4e73df 3px;display:flex;align-items:center;justify-content:center"><img src="icons/input_rgb.svg" style="width:45px;"></div>'))
        editForm.append($('<h5 style="text-align:center">' + JSLang[lang].unitName + '</h5>'))
        var title_input_div = $('<div style="display:flex;flex-direction:row;align-items:center"/>')
        var title_input = $("<input class='form-control form-control-user'  style='text-align:center' autofocus='autofocus'/>")
        title_input_div.append(title_input)
        editForm.append(title_input_div)
        editForm.append($('<h5 style="margin-top:15px;text-align:center">' + JSLang[lang].messTopic + '（R）</h5>'))
        var Rtopic_input_div = $('<div style="display:flex;flex-direction:row;align-items:center"/>')
        var Rtopic_input = $("<input class='form-control form-control-user'  style='text-align:center'/>")
        Rtopic_input.val("R")
        Rtopic_input_div.append(Rtopic_input)
        editForm.append(Rtopic_input_div)
        editForm.append($('<h5 style="margin-top:15px;text-align:center">' + JSLang[lang].messTopic + '（G）</h5>'))
        var Gtopic_input_div = $('<div style="display:flex;flex-direction:row;align-items:center"/>')
        var Gtopic_input = $("<input class='form-control form-control-user'  style='text-align:center'/>")
        Gtopic_input_div.append(Gtopic_input)
        Gtopic_input.val("G")
        editForm.append(Gtopic_input_div)
        editForm.append($('<h5 style="margin-top:15px;text-align:center">' + JSLang[lang].messTopic + '（B）</h5>'))
        var Btopic_input_div = $('<div style="display:flex;flex-direction:row;align-items:center"/>')
        var Btopic_input = $("<input class='form-control form-control-user'  style='text-align:center'/>")
        Btopic_input.val("B")
        Btopic_input_div.append(Btopic_input)
        editForm.append(Btopic_input_div)
        var bottomDiv = $('<div style="width:100%;margin-top:15px;display:flex;flex-direction:row;align-items:center;justify-content:space-around"/>')
        var confirmEdit = $('<a class="btn btn-primary btn-circle" style="margin-right:10px;box-shadow:1px 1px 5px #4e73df"><i class="fa fa-check"></i></a>')
        bottomDiv.append(confirmEdit)
        confirmEdit.click(function() {
            if (getByteLen(title_input.val()) > 0 && getByteLen(title_input.val()) < 21) {
                var re = /^[a-z0-9]+$/i;
                if (getByteLen(Rtopic_input.val()) > 0 && getByteLen(Rtopic_input.val()) < 11 && getByteLen(Gtopic_input.val()) > 0 && getByteLen(Gtopic_input.val()) < 11 && getByteLen(Btopic_input.val()) > 0 && getByteLen(Btopic_input.val()) < 11)
                    if (re.test(Rtopic_input.val()) && re.test(Gtopic_input.val()) && re.test(Btopic_input.val())) {
                        if (countSubstr(grid.html(), 'user-title=\"' + title_input.val() + '\"', false) <= 0) {
                            add_rgb(title_input.val(), Rtopic_input.val() + "/" + Gtopic_input.val() + "/" + Btopic_input.val(), '0,0,0')
                            modifyDia.close().remove()
                        } else
                            showtext(JSLang[lang].sameUnit)
                    } else
                        showtext("")
                else
                    showtext(JSLang[lang].topicLenIllegal)
            } else
                showtext(JSLang[lang].nameLenIllegal)
        })
        var cancelEdit = $('<a class="btn btn-danger btn-circle" style="box-shadow:1px 1px 5px #e74a3b"><i class="fa fa-arrow-left"></i></a>')
        cancelEdit.click(function() {
            modifyDia.close().remove()
            add_widget()
        })
        bottomDiv.append(cancelEdit)
        editForm.append(bottomDiv)
        var modifyDia = dialog({
            content: editForm[0],
            cancel: false
        })
        modifyDia.showModal()
    })

    if (!OFFLINE_MODE)
        input_weather_add.children("a").click(function() {
            d.close().remove()
            var editForm = $('<div class="nnt"/>')
            editForm.append($('<div style="margin-top:-63px;margin-left:82.5px;margin-bottom:15px;box-shadow: 1px 1px 20px #4e73df;background-color:white;width:75px;height:75px;padding:40px;border-radius:80px;border:solid #4e73df 3px;display:flex;align-items:center;justify-content:center"><img src="icons/input_weather.svg" style="width:45px;"></div>'))
            editForm.append($('<h5 style="text-align:center">' + JSLang[lang].unitName + '</h5>'))
            var title_input_div = $('<div style="display:flex;flex-direction:row;align-items:center"/>')
            var title_input = $("<input class='form-control form-control-user'  style='text-align:center' autofocus='autofocus'/>")
            title_input_div.append(title_input)
            editForm.append(title_input_div)
            editForm.append($('<h5 style="margin-top:15px;text-align:center">' + JSLang[lang].messTopic + '</h5>'))
            var topic_input_div = $('<div style="display:flex;flex-direction:row;align-items:center"/>')
            var topic_input = $("<input class='form-control form-control-user'  style='text-align:center'/>")
            topic_input.val("weather")
            topic_input_div.append(topic_input)
            editForm.append(topic_input_div)

            editForm.append($('<h5 style="margin-top:15px;text-align:center">' + JSLang[lang].syncInterval + '</h5>'))
            var sync_input_div = $('<div style="display:flex;flex-direction:row;align-items:center"/>')
            var sync_input = $("<select class='form-control form-control-user' style='text-align:center;text-align-last:center;appearance:none;'></select>")
            sync_input.append($("<option value='0'>" + JSLang[lang].never + "</option>"))
            sync_input.append($("<option value='15'>" + JSLang[lang].i15min + "</option>"))
            sync_input.append($("<option value='30'>" + JSLang[lang].i30min + "</option>"))
            sync_input.append($("<option value='60'>" + JSLang[lang].i60min + "</option>"))
            sync_input_div.append(sync_input)
            editForm.append(sync_input_div)

            editForm.append($('<h5 style="margin-top:15px;text-align:center">' + JSLang[lang].sendInterval + '</h5>'))
            var send_input_div = $('<div style="display:flex;flex-direction:row;align-items:center"/>')
            var send_input = $("<select class='form-control form-control-user' style='text-align:center;text-align-last:center;appearance:none;'></select>")
            send_input.append($("<option value='0'>" + JSLang[lang].never + "</option>"))
            send_input.append($("<option value='1'>" + JSLang[lang].i1min + "</option>"))
            send_input.append($("<option value='3'>" + JSLang[lang].i3min + "</option>"))
            send_input.append($("<option value='5'>" + JSLang[lang].i5min + "</option>"))
            send_input.append($("<option value='10'>" + JSLang[lang].i10min + "</option>"))
            send_input_div.append(send_input)
            editForm.append(send_input_div)

            editForm.append($('<h5 style="margin-top:15px;text-align:center">' + JSLang[lang].location + '</h5>'))
            var province_input = $("<select class='form-control form-control-user' style='text-align:center;text-align-last:center;appearance:none;'></select>")
            province_input.append($("<option value='unselected'>" + JSLang[lang].province + "</option>"))
            for (district in districts) {
                province_input.append($("<option value='" + district + "'>" + districts[district].name + "</option>"))
            }
            editForm.append(province_input)
            var city_input = $("<select class='form-control form-control-user' style='margin-top:5px;text-align:center;text-align-last:center;appearance:none;' disabled></select>")
            city_input.append($("<option value='unselected'>" + JSLang[lang].city + "</option>"))
            editForm.append(city_input)
            province_input.change(function() {
                city_input.empty()
                city_input.append($("<option value='unselected'>" + JSLang[lang].city + "</option>"))
                district_input.empty()
                district_input.append($("<option value='unselected'>" + JSLang[lang].district + "</option>"))
                district_input.attr('disabled', 'disabled')
                if (province_input.val() != "unselected") {
                    console.log(province_input.val())
                    for (district in districts[province_input.val()].child) {
                        city_input.append($("<option value='" + district + "'>" + (districts[province_input.val()].child)[district].name + "</option>"))
                    }
                    city_input.removeAttr('disabled')
                } else
                    city_input.attr('disabled', 'disabled')
            })
            var district_input = $("<select class='form-control form-control-user' style='margin-top:5px;text-align:center;text-align-last:center;appearance:none;' disabled></select>")
            district_input.append($("<option value='unselected'>" + JSLang[lang].district + "</option>"))
            editForm.append(district_input)
            city_input.change(function() {
                district_input.empty()
                district_input.append($("<option value='unselected'>" + JSLang[lang].district + "</option>"))
                if (city_input.val() != "unselected") {
                    console.log(province_input.val())
                    for (district in (districts[province_input.val()].child)[city_input.val()].child) {
                        district_input.append($("<option value='" + district + "'>" + ((districts[province_input.val()].child)[city_input.val()].child)[district] + "</option>"))
                    }
                    district_input.removeAttr('disabled')
                } else
                    district_input.attr('disabled', 'disabled')
            })
            var bottomDiv = $('<div style="width:100%;margin-top:15px;display:flex;flex-direction:row;align-items:center;justify-content:space-around"/>')
            var confirmEdit = $('<a class="btn btn-primary btn-circle" style="margin-right:10px;box-shadow:1px 1px 5px #4e73df"><i class="fa fa-check"></i></a>')
            bottomDiv.append(confirmEdit)

            confirmEdit.click(function() {
                var placecode = province_input.val() == "unselected" ? "unselected" : (city_input.val() == "unselected" ? province_input.val() : (district_input.val() == "unselected" ? city_input.val() : district_input.val()))
                if (placecode == "unselected")
                    showtext(JSLang[lang].locationSet)
                else {
                    if (getByteLen(title_input.val()) > 0 && getByteLen(title_input.val()) < 21) {
                        var re = /^[a-z0-9]+$/i;
                        if (getByteLen(topic_input.val()) > 0 && getByteLen(topic_input.val()) < 11)
                            if (true) {
                                if (countSubstr(grid.html(), 'user-title=\"' + title_input.val() + '\"', false) <= 0) {
                                    add_weather(title_input.val(), topic_input.val(), placecode + "w" + sync_input.val() + "w" + send_input.val())
                                    modifyDia.close().remove()
                                } else
                                    showtext(JSLang[lang].sameUnit)
                            } else
                                showtext("")
                        else
                            showtext(JSLang[lang].topicLenIllegal)
                    } else
                        showtext(JSLang[lang].nameLenIllegal)
                }
            })
            var cancelEdit = $('<a class="btn btn-danger btn-circle" style="box-shadow:1px 1px 5px #e74a3b"><i class="fa fa-arrow-left"></i></a>')
            cancelEdit.click(function() {
                modifyDia.close().remove()
                add_widget()
            })
            bottomDiv.append(cancelEdit)
            editForm.append(bottomDiv)
            var modifyDia = dialog({
                content: editForm[0],
                cancel: false
            })
            modifyDia.showModal()
        })

    output_bulb_add.children("a").click(function() {
        d.close().remove()
        var editForm = $('<div class="nnt"/>')
        editForm.append($('<div style="margin-top:-63px;margin-left:82.5px;margin-bottom:15px;box-shadow: 1px 1px 20px #4e73df;background-color:white;width:75px;height:75px;padding:40px;border-radius:80px;border:solid #4e73df 3px;display:flex;align-items:center;justify-content:center"><img src="icons/output_bulb.svg" style="width:45px;"></div>'))
        editForm.append($('<h5 style="text-align:center">' + JSLang[lang].unitName + '</h5>'))
        var title_input_div = $('<div style="display:flex;flex-direction:row;align-items:center"/>')
        var title_input = $("<input class='form-control form-control-user'  style='text-align:center' autofocus='autofocus'/>")
        title_input_div.append(title_input)
        editForm.append(title_input_div)
        editForm.append($('<h5 style="margin-top:15px;text-align:center">' + JSLang[lang].messTopic + '</h5>'))
        var topic_input_div = $('<div style="display:flex;flex-direction:row;align-items:center"/>')
        var topic_input = $("<input class='form-control form-control-user'  style='text-align:center'/>")
        topic_input_div.append(topic_input)
        topic_input.val("bulb")
        editForm.append(topic_input_div)
        var bottomDiv = $('<div style="width:100%;margin-top:15px;display:flex;flex-direction:row;align-items:center;justify-content:space-around"/>')
        var confirmEdit = $('<a class="btn btn-primary btn-circle" style="margin-right:10px;box-shadow:1px 1px 5px #4e73df"><i class="fa fa-check"></i></a>')
        bottomDiv.append(confirmEdit)
        confirmEdit.click(function() {
            if (getByteLen(title_input.val()) > 0 && getByteLen(title_input.val()) < 21) {
                var re = /^[a-z0-9]+$/i;
                if (getByteLen(topic_input.val()) > 0 && getByteLen(topic_input.val()) < 11)
                    if (true) {
                        if (countSubstr(grid.html(), 'user-title=\"' + title_input.val() + '\"', false) <= 0) {
                            add_bulb(title_input.val(), topic_input.val(), 0)
                            modifyDia.close().remove()
                        } else
                            showtext(JSLang[lang].sameUnit)
                    } else
                        showtext("")
                else
                    showtext(JSLang[lang].topicLenIllegal)
            } else
                showtext(JSLang[lang].nameLenIllegal)
        })
        var cancelEdit = $('<a class="btn btn-danger btn-circle" style="box-shadow:1px 1px 5px #e74a3b"><i class="fa fa-arrow-left"></i></a>')
        cancelEdit.click(function() {
            modifyDia.close().remove()
            add_widget()
        })
        bottomDiv.append(cancelEdit)
        editForm.append(bottomDiv)
        var modifyDia = dialog({
            content: editForm[0],
            cancel: false
        })
        modifyDia.showModal()
    })

    timer_add.children("a").click(function() {
        d.close().remove()
        var editForm = $('<div class="nnt"/>')
        editForm.append($('<div style="margin-top:-63px;margin-left:82.5px;margin-bottom:15px;box-shadow: 1px 1px 20px #4e73df;background-color:white;width:75px;height:75px;padding:40px;border-radius:80px;border:solid #4e73df 3px;display:flex;align-items:center;justify-content:center"><img src="icons/timer.svg" style="width:45px;"></div>'))
        editForm.append($('<h5 style="text-align:center">' + JSLang[lang].unitName + '</h5>'))
        var title_input_div = $('<div style="display:flex;flex-direction:row;align-items:center"/>')
        var title_input = $("<input class='form-control form-control-user'  style='text-align:center' autofocus='autofocus'/>")
        title_input_div.append(title_input)
        editForm.append(title_input_div)
        editForm.append($('<h5 style="margin-top:15px;text-align:center">' + JSLang[lang].triggerTopic + '</h5>'))
        var topic_input_div = $('<div style="display:flex;flex-direction:row;align-items:center"/>')
        var topic_input = $("<input class='form-control form-control-user'  style='text-align:center'/>")
        topic_input_div.append(topic_input)
        topic_input.val("timer")
        editForm.append(topic_input_div)
        editForm.append($('<h5 style="margin-top:15px;text-align:center">' + JSLang[lang].triggerMessage + '</h5>'))
        var moreButtonDiv = $('<div style="display:flex;flex-direction:row;align-items:center;justify-content:center"></div>')
        var currTimeBtn = $('<a class="btn btn-sm btn-light" style="margin:1px 4px">实时时间</a>')
        var ranNumBtn = $('<a class="btn btn-sm btn-light" style="margin:1px 4px">随机整数（1-99）</a>')
        moreButtonDiv.append(currTimeBtn)
        moreButtonDiv.append(ranNumBtn)
        editForm.append(moreButtonDiv)
        var message_input_div = $('<div style="display:flex;flex-direction:row;align-items:center"/>')
        var message_input = $("<input class='form-control form-control-user'  style='text-align:center'/>")
        message_input_div.append(message_input)
        editForm.append(message_input_div)
        currTimeBtn.click(function(){
            message_input.val("$CURR_TIME$")
        })
        ranNumBtn.click(function(){
            message_input.val("$RAN_NUM$")
        })
        editForm.append($('<h5 style="margin-top:15px;text-align:center">' + JSLang[lang].triggerInterval + '</h5>'))
        var trigger_interval_div = $('<div style="display:flex;flex-direction:row;align-items:center"/>')
        var trigger_interval = $("<input type='number' step='100' min='500' max='100000' required class='form-control form-control-user'  style='text-align:center'/>")
        trigger_interval.val(1000)
        trigger_interval_div.append(trigger_interval)
        editForm.append(trigger_interval_div)
        editForm.append($('<h5 style="margin-top:15px;text-align:center">' + JSLang[lang].triggerTimes + '</h5>'))
        var trigger_times_div = $('<div style="display:flex;flex-direction:row;align-items:center"/>')
        var trigger_times = $("<input type='number' step='1' min='0' max='100000' class='form-control form-control-user'  style='text-align:center'/>")
        trigger_times.val(0)
        trigger_times_div.append(trigger_times)
        editForm.append(trigger_times_div)
        var bottomDiv = $('<div style="width:100%;margin-top:15px;display:flex;flex-direction:row;align-items:center;justify-content:space-around"/>')
        var confirmEdit = $('<a class="btn btn-primary btn-circle" style="margin-right:10px;box-shadow:1px 1px 5px #4e73df"><i class="fa fa-check"></i></a>')
        bottomDiv.append(confirmEdit)
        confirmEdit.click(function() {
            if (getByteLen(title_input.val()) > 0 && getByteLen(title_input.val()) < 21) {
                var re = /^[a-z0-9]+$/i;
                if (getByteLen(topic_input.val()) > 0 && getByteLen(topic_input.val()) < 11)
                    if (getByteLen(message_input.val()) > 0) {
                        if (countSubstr(grid.html(), 'user-title=\"' + title_input.val() + '\"', false) <= 0) {
                            if (parseInt(trigger_interval.val()) && parseInt(trigger_interval.val()) >= 500) {
                                if (!isNaN(parseInt(trigger_times.val())) && parseInt(trigger_times.val()) >= 0) {
                                    add_timer(title_input.val(), topic_input.val() + "$$$" + message_input.val(), trigger_interval.val() + "," + trigger_times.val())
                                    modifyDia.close().remove()
                                } else
                                    showtext(JSLang[lang].illegalTimes)
                            } else
                                showtext(JSLang[lang].illegalInterval)
                        } else
                            showtext(JSLang[lang].sameUnit)
                    } else
                        showtext(JSLang[lang].messageLenIllegal)
                else
                    showtext(JSLang[lang].topicLenIllegal)
            } else
                showtext(JSLang[lang].nameLenIllegal)
        })
        var cancelEdit = $('<a class="btn btn-danger btn-circle" style="box-shadow:1px 1px 5px #e74a3b"><i class="fa fa-arrow-left"></i></a>')
        cancelEdit.click(function() {
            modifyDia.close().remove()
            add_widget()
        })
        bottomDiv.append(cancelEdit)
        editForm.append(bottomDiv)
        var modifyDia = dialog({
            content: editForm[0],
            cancel: false
        })
        modifyDia.showModal()
    })

    trigger_add.children("a").click(function() {
        d.close().remove()
        var editForm = $('<div class="nnt"/>')
        editForm.append($('<div style="margin-top:-63px;margin-left:82.5px;margin-bottom:15px;box-shadow: 1px 1px 20px #4e73df;background-color:white;width:75px;height:75px;padding:40px;border-radius:80px;border:solid #4e73df 3px;display:flex;align-items:center;justify-content:center"><img src="icons/trigger.svg" style="width:45px;"></div>'))
        editForm.append($('<h5 style="text-align:center">' + JSLang[lang].unitName + '</h5>'))
        var title_input_div = $('<div style="display:flex;flex-direction:row;align-items:center"/>')
        var title_input = $("<input class='form-control form-control-user'  style='text-align:center' autofocus='autofocus'/>")
        title_input_div.append(title_input)
        editForm.append(title_input_div)
        editForm.append($('<h5 style="margin-top:15px;text-align:center">' + JSLang[lang].srcTopic + '</h5>'))
        var topic_input_div = $('<div style="display:flex;flex-direction:row;align-items:center"/>')
        var topic_input = $("<input class='form-control form-control-user'  style='text-align:center'/>")
        topic_input_div.append(topic_input)
        editForm.append(topic_input_div)
        topic_input.val("trigger")
        editForm.append($('<h5 style="margin-top:15px;text-align:center">' + JSLang[lang].condition + '1</h5>'))
        var condition1_input_div = $('<div style="display:flex;flex-direction:row;align-items:center"/>')
        var condition1_input1 = $("<select class='form-control form-control-user'  style='text-align:center;width:120px!important;min-width:120px!important;margin-right:5px'/>")
        condition1_input1.append($("<option value='\>'>\></option>"))
        condition1_input1.append($("<option value='≥'>\≥</option>"))
        condition1_input1.append($("<option value='\<'>\<</option>"))
        condition1_input1.append($("<option value='≤'>\≤</option>"))
        condition1_input1.append($("<option value='\='>\=</option>"))
        condition1_input1.append($("<option value='≠'>≠</option>"))
        var condition1_input2 = $("<input class='form-control form-control-user'  style='text-align:center;width:120px!important;min-width:120px!important;margin-left:5px'/>")
        condition1_input_div.append(condition1_input1)
        condition1_input_div.append(condition1_input2)
        editForm.append(condition1_input_div)
        editForm.append($('<h5 style="margin-top:15px;text-align:center">' + JSLang[lang].condition + '2</h5>'))
        var condition2_input_div = $('<div style="display:flex;flex-direction:row;align-items:center"/>')
        var condition2_input1 = $("<select class='form-control form-control-user'  style='text-align:center;width:120px!important;min-width:120px!important;margin-right:5px'/>")
        condition2_input1.append($("<option value='--'>--</option>"))
        condition2_input1.append($("<option value='\>'>\></option>"))
        condition2_input1.append($("<option value='≥'>\≥</option>"))
        condition2_input1.append($("<option value='\<'>\<</option>"))
        condition2_input1.append($("<option value='≤'>\≤</option>"))
        condition2_input1.append($("<option value='\='>\=</option>"))
        condition2_input1.append($("<option value='≠'>≠</option>"))
        var condition2_input2 = $("<input disabled class='form-control form-control-user'  style='text-align:center;width:120px!important;min-width:120px!important;margin-left:5px'/>")
        condition2_input_div.append(condition2_input1)
        condition2_input_div.append(condition2_input2)
        editForm.append(condition2_input_div)
        editForm.append($('<h5 style="margin-top:15px;text-align:center">' + JSLang[lang].conditionRelation + '</h5>'))
        var condition_relation_div = $('<div style="display:flex;flex-direction:row;align-items:center"/>')
        var condition_relation = $("<select class='form-control form-control-user'  style='text-align:center'/>")
        condition_relation.append($("<option value='AND'>AND</option>"))
        condition_relation.append($("<option value='OR'>OR</option>"))
        condition_relation.append($("<option value='XOR'>XOR</option>"))
        condition_relation_div.append(condition_relation)
        editForm.append(condition_relation_div)
        editForm.append($('<h5 style="margin-top:15px;text-align:center">' + JSLang[lang].dstTopic + '</h5>'))
        var dstTopic_input_div = $('<div style="display:flex;flex-direction:row;align-items:center"/>')
        var dstTopic_input = $("<input class='form-control form-control-user'  style='text-align:center'/>")
        dstTopic_input_div.append(dstTopic_input)
        editForm.append(dstTopic_input_div)
        editForm.append($('<h5 style="margin-top:15px;text-align:center">' + JSLang[lang].dstMessage + '</h5>'))
        var dstMessage_input_div = $('<div style="display:flex;flex-direction:row;align-items:center"/>')
        var dstMessage_input = $("<input class='form-control form-control-user'  style='text-align:center'/>")
        dstMessage_input_div.append(dstMessage_input)
        editForm.append(dstMessage_input_div)
        condition2_input1.bind("change", function() {
            if (condition2_input1.val() == "--")
                condition2_input2.attr("disabled", "disabled")
            else
                condition2_input2.removeAttr("disabled")
        })
        var bottomDiv = $('<div style="width:100%;margin-top:15px;display:flex;flex-direction:row;align-items:center;justify-content:space-around"/>')
        var confirmEdit = $('<a class="btn btn-primary btn-circle" style="margin-right:10px;box-shadow:1px 1px 5px #4e73df"><i class="fa fa-check"></i></a>')
        bottomDiv.append(confirmEdit)
        confirmEdit.click(function() {
            if (getByteLen(title_input.val()) > 0 && getByteLen(title_input.val()) < 21) {
                var re = /^[a-z0-9]+$/i;
                if (getByteLen(topic_input.val()) > 0 && getByteLen(topic_input.val()) < 11)
                    if (getByteLen(condition1_input2.val()) > 0 && (condition2_input1.val() == "--" || getByteLen(condition2_input2.val()) > 0)) {
                        if (countSubstr(grid.html(), 'user-title=\"' + title_input.val() + '\"', false) <= 0) {
                            if (getByteLen(dstTopic_input.val()) > 0) {
                                if (getByteLen(dstMessage_input.val()) > 0) {
                                    var content = [condition1_input1.val(), condition1_input2.val(), condition2_input1.val(), condition2_input2.val(), condition_relation.val(), dstTopic_input.val(), dstMessage_input.val()].join("$$$")
                                    add_trigger(title_input.val(), topic_input.val(), content)
                                    modifyDia.close().remove()
                                } else
                                    showtext(JSLang[lang].dstMessageLenIllegal)
                            } else
                                showtext(JSLang[lang].dstTopicLenIllegal)
                        } else
                            showtext(JSLang[lang].sameUnit)
                    } else
                        showtext(JSLang[lang].conditionLenIllegal)
                else
                    showtext(JSLang[lang].topicLenIllegal)
            } else
                showtext(JSLang[lang].nameLenIllegal)
        })
        var cancelEdit = $('<a class="btn btn-danger btn-circle" style="box-shadow:1px 1px 5px #e74a3b"><i class="fa fa-arrow-left"></i></a>')
        cancelEdit.click(function() {
            modifyDia.close().remove()
            add_widget()
        })
        bottomDiv.append(cancelEdit)
        editForm.append(bottomDiv)
        var modifyDia = dialog({
            content: editForm[0],
            cancel: false
        })
        modifyDia.showModal()
    })

    magic_add.children("a").click(function() {
        d.close().remove()
        var editForm = $('<div class="nnt"/>')
        editForm.append($('<div style="margin-top:-63px;margin-left:82.5px;margin-bottom:15px;box-shadow: 1px 1px 20px #4e73df;background-color:white;width:75px;height:75px;padding:40px;border-radius:80px;border:solid #4e73df 3px;display:flex;align-items:center;justify-content:center"><img src="icons/magic.svg" style="width:45px;"></div>'))
        editForm.append($('<h5 style="text-align:center">' + JSLang[lang].unitName + '</h5>'))
        var title_input_div = $('<div style="display:flex;flex-direction:row;align-items:center"/>')
        var title_input = $("<input class='form-control form-control-user'  style='text-align:center' autofocus='autofocus'/>")
        title_input_div.append(title_input)
        editForm.append(title_input_div)
        editForm.append($('<h5 style="text-align:center;margin-top:15px">' + JSLang[lang].color + '</h5>'))
        var color_input_div = $('<div style="display:flex;flex-direction:row;align-items:center"/>')
        var color_select = $('<select class="form-control form-control-user" style="text-align:center"/>')
        color_select.append($('<option value="#4e73df">' + JSLang[lang].blue + '</option>'))
        color_select.append($('<option value="#1cc88a">' + JSLang[lang].green + '</option>'))
        color_select.append($('<option value="#36b9cc">' + JSLang[lang].cyan + '</option>'))
        color_select.append($('<option value="#f6c23e">' + JSLang[lang].yellow + '</option>'))
        color_select.append($('<option value="#e74a3b">' + JSLang[lang].red + '</option>'))
        color_select.append($('<option value="#858796">' + JSLang[lang].gray + '</option>'))
        color_input_div.append(color_select)
        editForm.append(color_input_div)
        var bottomDiv = $('<div style="width:100%;margin-top:15px;display:flex;flex-direction:row;align-items:center;justify-content:space-around"/>')
        var confirmEdit = $('<a class="btn btn-primary btn-circle" style="margin-right:10px;box-shadow:1px 1px 5px #4e73df;"><i class="fa fa-check"></i></a>')
        bottomDiv.append(confirmEdit)
        confirmEdit.click(function() {
            if (getByteLen(title_input.val()) > 0 && getByteLen(title_input.val()) < 21) {
                add_magic(title_input.val(), undefined, color_select.val())
                modifyDia.close().remove()
            }
            else
                showtext(JSLang[lang].nameLenIllegal)
        })
        var cancelEdit = $('<a class="btn btn-danger btn-circle"><i class="fa fa-arrow-left"></i></a>')
        cancelEdit.click(function() {
            modifyDia.close().remove()
            add_widget()
        })
        bottomDiv.append(cancelEdit)
        editForm.append(bottomDiv)
        var modifyDia = dialog({
            content: editForm[0],
            cancel: false
        })
        modifyDia.showModal()
    })

    output_text_add.children("a").click(function() {
        d.close().remove()
        var editForm = $('<div class="nnt"/>')
        editForm.append($('<div style="margin-top:-63px;margin-left:82.5px;margin-bottom:15px;box-shadow: 1px 1px 20px #4e73df;background-color:white;width:75px;height:75px;padding:40px;border-radius:80px;border:solid #4e73df 3px;display:flex;align-items:center;justify-content:center"><img src="icons/output_text.svg" style="width:45px;"></div>'))
        editForm.append($('<h5 style="text-align:center">' + JSLang[lang].unitName + '</h5>'))
        var title_input_div = $('<div style="display:flex;flex-direction:row;align-items:center"/>')
        var title_input = $("<input class='form-control form-control-user'  style='text-align:center' autofocus='autofocus'/>")
        title_input_div.append(title_input)
        editForm.append(title_input_div)
        editForm.append($('<h5 style="margin-top:15px;text-align:center">' + JSLang[lang].messTopic + '</h5>'))
        var topic_input_div = $('<div style="display:flex;flex-direction:row;align-items:center"/>')
        var topic_input = $("<input class='form-control form-control-user'  style='text-align:center'/>")
        topic_input_div.append(topic_input)
        topic_input.val("text")
        editForm.append(topic_input_div)
        var bottomDiv = $('<div style="width:100%;margin-top:15px;display:flex;flex-direction:row;align-items:center;justify-content:space-around"/>')
        var confirmEdit = $('<a class="btn btn-primary btn-circle" style="margin-right:10px;box-shadow:1px 1px 5px #4e73df"><i class="fa fa-check"></i></a>')
        bottomDiv.append(confirmEdit)
        confirmEdit.click(function() {
            if (getByteLen(title_input.val()) > 0 && getByteLen(title_input.val()) < 21) {
                var re = /^[a-z0-9]+$/i;
                if (getByteLen(topic_input.val()) > 0 && getByteLen(topic_input.val()) < 11)
                    if (true) {
                        if (countSubstr(grid.html(), 'user-title=\"' + title_input.val() + '\"', false) <= 0) {
                            add_text(title_input.val(), topic_input.val(), '')
                            modifyDia.close().remove()
                        } else
                            showtext(JSLang[lang].sameUnit)
                    } else
                        showtext("")
                else
                    showtext(JSLang[lang].topicLenIllegal)
            } else
                showtext(JSLang[lang].nameLenIllegal)
        })
        var cancelEdit = $('<a class="btn btn-danger btn-circle" style="box-shadow:1px 1px 5px #e74a3b"><i class="fa fa-arrow-left"></i></a>')
        cancelEdit.click(function() {
            modifyDia.close().remove()
            add_widget()
        })
        bottomDiv.append(cancelEdit)
        editForm.append(bottomDiv)
        var modifyDia = dialog({
            content: editForm[0],
            cancel: false
        })
        modifyDia.showModal()
    })

    table_add.children("a").click(function() {
        d.close().remove()
        var editForm = $('<div class="nnt"/>')
        editForm.append($('<div style="margin-top:-63px;margin-left:82.5px;margin-bottom:15px;box-shadow: 1px 1px 20px #4e73df;background-color:white;width:75px;height:75px;padding:40px;border-radius:80px;border:solid #4e73df 3px;display:flex;align-items:center;justify-content:center"><img src="icons/table.svg" style="width:45px;"></div>'))
        editForm.append($('<h5 style="text-align:center">' + JSLang[lang].unitName + '</h5>'))
        var title_input_div = $('<div style="display:flex;flex-direction:row;align-items:center"/>')
        var title_input = $("<input class='form-control form-control-user'  style='text-align:center' autofocus='autofocus'/>")
        title_input_div.append(title_input)
        editForm.append(title_input_div)
        editForm.append($('<h5 style="margin-top:15px;text-align:center">' + JSLang[lang].messTopic + '</h5>'))
        var topic_input_div = $('<div style="display:flex;flex-direction:row;align-items:center"/>')
        var topic_input = $("<input class='form-control form-control-user'  style='text-align:center'/>")
        topic_input_div.append(topic_input)
        topic_input.val("table")
        editForm.append(topic_input_div)
        editForm.append($('<h5 style="margin-top:15px;text-align:center">' + JSLang[lang].columns + '</h5>'))
        var count_input_div = $('<div style="display:flex;flex-direction:row;align-items:center"/>')
        var count_input = $("<input class='form-control form-control-user' style='text-align:center'/>")
        count_input_div.append(count_input)
        editForm.append(count_input_div)
        count_input.val(JSLang[lang].time + "," + JSLang[lang].value)
        var bottomDiv = $('<div style="width:100%;margin-top:15px;display:flex;flex-direction:row;align-items:center;justify-content:space-around"/>')
        var confirmEdit = $('<a class="btn btn-primary btn-circle" style="margin-right:10px;box-shadow:1px 1px 5px #4e73df"><i class="fa fa-check"></i></a>')
        bottomDiv.append(confirmEdit)
        confirmEdit.click(function() {
            if (getByteLen(title_input.val()) > 0 && getByteLen(title_input.val()) < 21) {
                var re = /^[a-z0-9]+$/i;
                if (getByteLen(topic_input.val()) > 0 && getByteLen(topic_input.val()) < 11)
                    if (true) {
                        if (countSubstr(grid.html(), 'user-title=\"' + title_input.val() + '\"', false) <= 0) {
                            if (count_input.val() != "") {
                                var tmpstr = count_input.val().split(',').length + ',' + count_input.val()
                                add_table(title_input.val(), topic_input.val(), tmpstr)
                                modifyDia.close().remove()
                            } else
                                showtext(JSLang[lang].columnsSet)
                        } else
                            showtext(JSLang[lang].sameUnit)
                    } else
                        showtext("")
                else
                    showtext(JSLang[lang].topicLenIllegal)
            } else
                showtext(JSLang[lang].nameLenIllegal)
        })
        var cancelEdit = $('<a class="btn btn-danger btn-circle" style="box-shadow:1px 1px 5px #e74a3b"><i class="fa fa-arrow-left"></i></a>')
        cancelEdit.click(function() {
            modifyDia.close().remove()
            add_widget()
        })
        bottomDiv.append(cancelEdit)
        editForm.append(bottomDiv)
        var modifyDia = dialog({
            content: editForm[0],
            cancel: false
        })
        modifyDia.showModal()
    })

    output_chart_add.children("a").click(function() {
        d.close().remove()
        var editForm = $('<div class="nnt"/>')
        editForm.append($('<div style="margin-top:-63px;margin-left:82.5px;margin-bottom:15px;box-shadow: 1px 1px 20px #4e73df;background-color:white;width:75px;height:75px;padding:40px;border-radius:80px;border:solid #4e73df 3px;display:flex;align-items:center;justify-content:center"><img src="icons/output_chart.svg" style="width:45px;"></div>'))
        editForm.append($('<h5 style="text-align:center">' + JSLang[lang].unitName + '</h5>'))
        var title_input_div = $('<div style="display:flex;flex-direction:row;align-items:center"/>')
        var title_input = $("<input class='form-control form-control-user'  style='text-align:center' autofocus='autofocus'/>")
        title_input_div.append(title_input)
        editForm.append(title_input_div)
        editForm.append($('<h5 style="margin-top:15px;text-align:center">' + JSLang[lang].messTopic + '</h5>'))
        var topic_input_div = $('<div style="display:flex;flex-direction:row;align-items:center;margin-bottom:5px"/>')
        var topic_input = $("<input class='form-control form-control-user'  style='text-align:center;min-width:250px;width:250px'/>")
        topic_input.val("chart")
        topic_input_div.append(topic_input)
        editForm.append(topic_input_div)
        var modeButton = $("<label class='switch' style='margin-bottom:0'></label>")
        var modeCheckbox = $("<input type='checkbox'>")
        var modeCheckDiv = $("<div class='slider2 round'></div>")
        modeButton.append(modeCheckbox)
        modeButton.append(modeCheckDiv)
        var modeDiv = $("<div style='display:flex;margin-top:10px;flex-direction:row;align-items:center;justify-content:center' hidden/>")
        modeDiv.append($("<span style='font-size:1rem;margin-right:10px;color:#4e73df;font-weight:bold'></span>"))
        modeDiv.append(modeButton)
        modeDiv.append($("<span style='font-size:1rem;margin-left:10px;color:#e74a3b;font-weight:bold'></span>"))
        editForm.append(modeDiv)

        var bottomDiv = $('<div style="width:100%;margin-top:15px;display:flex;flex-direction:row;align-items:center;justify-content:space-around"/>')
        var confirmEdit = $('<a class="btn btn-primary btn-circle" style="margin-right:10px;box-shadow:1px 1px 5px #4e73df;"><i class="fa fa-check"></i></a>')
        bottomDiv.append(confirmEdit)
        confirmEdit.click(function() {
            if (getByteLen(title_input.val()) > 0 && getByteLen(title_input.val()) < 21) {
                var re = /^[a-z0-9]+$/i;
                if (getByteLen(topic_input.val()) > 0 && getByteLen(topic_input.val()) < 11)
                    if (true) {
                        if (countSubstr(grid.html(), 'user-title=\"' + title_input.val() + '\"', false) <= 0) {
                            add_chart(title_input.val(), topic_input.val(), "0" + (modeCheckbox.prop("checked") ? "1" : "0"))
                            modifyDia.close().remove()
                        } else
                            showtext(JSLang[lang].sameUnit)
                    } else
                        showtext("")
                else
                    showtext(JSLang[lang].topicLenIllegal)
            } else
                showtext(JSLang[lang].nameLenIllegal)

        })
        var cancelEdit = $('<a class="btn btn-danger btn-circle"><i class="fa fa-arrow-left"></i></a>')
        cancelEdit.click(function() {
            modifyDia.close().remove()
            add_widget()
        })
        bottomDiv.append(cancelEdit)
        editForm.append(bottomDiv)
        var modifyDia = dialog({
            content: editForm[0],
            cancel: false
        })
        modifyDia.showModal()
    })

    output_bar_add.children("a").click(function() {
        d.close().remove()
        var editForm = $('<div class="nnt"/>')
        editForm.append($('<div style="margin-top:-63px;margin-left:82.5px;margin-bottom:15px;box-shadow: 1px 1px 20px #4e73df;background-color:white;width:75px;height:75px;padding:40px;border-radius:80px;border:solid #4e73df 3px;display:flex;align-items:center;justify-content:center"><img src="icons/output_bar.svg" style="width:45px;"></div>'))
        editForm.append($('<h5 style="text-align:center">' + JSLang[lang].unitName + '</h5>'))
        var title_input_div = $('<div style="display:flex;flex-direction:row;align-items:center"/>')
        var title_input = $("<input class='form-control form-control-user'  style='text-align:center' autofocus='autofocus'/>")
        title_input_div.append(title_input)
        editForm.append(title_input_div)
        editForm.append($('<h5 style="margin-top:15px;text-align:center">' + JSLang[lang].messTopic + '</h5>'))
        var topic_input_div = $('<div style="display:flex;flex-direction:row;align-items:center"/>')
        var topic_input = $("<input class='form-control form-control-user'  style='text-align:center'/>")
        topic_input.val("bar")
        topic_input_div.append(topic_input)
        editForm.append(topic_input_div)
        editForm.append($('<h5 style="margin-top:15px;text-align:center">' + JSLang[lang].choicesList + '</h5>'))
        var option_input_div = $('<div style="display:flex;flex-direction:row;align-items:center"/>')
        var option_input = $("<input class='form-control form-control-user'  style='text-align:center'/>")
        option_input.val("A,B,C,D")
        option_input_div.append(option_input)
        editForm.append(option_input_div)
        editForm.append($('<h5 style="margin-top:15px;text-align:center">' + JSLang[lang].recvMode + '</h5>'))
        var modeButton = $("<label class='switch' style='margin-bottom:0'></label>")
        var modeCheckbox = $("<input type='checkbox'>")
        var modeCheckDiv = $("<div class='slider2 round'></div>")
        modeButton.append(modeCheckbox)
        modeButton.append(modeCheckDiv)
        var modeDiv = $("<div style='display:flex;margin-top:10px;flex-direction:row;align-items:center;justify-content:center'/>")
        modeDiv.append($("<span style='font-size:1rem;margin-right:10px;color:#4e73df;font-weight:bold'>" + JSLang[lang].single + "</span>"))
        modeDiv.append(modeButton)
        modeDiv.append($("<span style='font-size:1rem;margin-left:10px;color:#e74a3b;font-weight:bold'>" + JSLang[lang].multiple + "</span>"))
        editForm.append(modeDiv)
        var bottomDiv = $('<div style="width:100%;margin-top:15px;display:flex;flex-direction:row;align-items:center;justify-content:space-around"/>')
        var confirmEdit = $('<a class="btn btn-primary btn-circle" style="margin-right:10px;box-shadow:1px 1px 5px #4e73df;"><i class="fa fa-check"></i></a>')
        bottomDiv.append(confirmEdit)
        confirmEdit.click(function() {
            if (option_input.val() != "") {
                if (getByteLen(title_input.val()) > 0 && getByteLen(title_input.val()) < 21) {
                    var re = /^[a-z0-9]+$/i;
                    if (getByteLen(topic_input.val()) > 0 && getByteLen(topic_input.val()) < 11)
                        if (true) {
                            if (countSubstr(grid.html(), 'user-title=\"' + title_input.val() + '\"', false) <= 0) {
                                var optionList = option_input.val().split(',')
                                var optionCount = optionList.length
                                for (var ct = 0; ct <= optionCount - 1; ct = ct + 1) {
                                    optionList.push(0)
                                }
                                var optionStr = optionList.join(',')
                                add_bar(title_input.val(), topic_input.val(), "0" + (modeCheckbox.prop("checked") ? "1" : "0") + optionStr)
                                modifyDia.close().remove()
                            } else
                                showtext(JSLang[lang].sameUnit)
                        } else
                            showtext("")
                    else
                        showtext(JSLang[lang].topicLenIllegal)
                } else
                    showtext(JSLang[lang].nameLenIllegal)
            } else
                showtext(JSLang[lang].listEmpty)
        })
        var cancelEdit = $('<a class="btn btn-danger btn-circle"><i class="fa fa-arrow-left"></i></a>')
        cancelEdit.click(function() {
            modifyDia.close().remove()
            add_widget()
        })
        bottomDiv.append(cancelEdit)
        editForm.append(bottomDiv)
        var modifyDia = dialog({
            content: editForm[0],
            cancel: false
        })
        modifyDia.showModal()
    })

    output_dashboard_add.children("a").click(function() {
        d.close().remove()
        var editForm = $('<div class="nnt"/>')
        editForm.append($('<div style="margin-top:-63px;margin-left:82.5px;margin-bottom:15px;box-shadow: 1px 1px 20px #4e73df;background-color:white;width:75px;height:75px;padding:40px;border-radius:80px;border:solid #4e73df 3px;display:flex;align-items:center;justify-content:center"><img src="icons/output_dashboard.svg" style="width:45px;"></div>'))
        editForm.append($('<h5 style="text-align:center">' + JSLang[lang].unitName + '</h5>'))
        var title_input_div = $('<div style="display:flex;flex-direction:row;align-items:center"/>')
        var title_input = $("<input class='form-control form-control-user'  style='text-align:center' autofocus='autofocus'/>")
        title_input_div.append(title_input)
        editForm.append(title_input_div)
        editForm.append($('<h5 style="margin-top:15px;text-align:center">' + JSLang[lang].messTopic + '</h5>'))
        var topic_input_div = $('<div style="display:flex;flex-direction:row;align-items:center"/>')
        var topic_input = $("<input class='form-control form-control-user'  style='text-align:center'/>")
        topic_input_div.append(topic_input)
        topic_input.val("dashboard")
        editForm.append(topic_input_div)
        editForm.append($('<h5 style="margin-top:15px;text-align:center">' + JSLang[lang].displayRange + '</h5>'))
        var range_input_div = $('<div style="display:flex;flex-direction:row;align-items:center;justify-content:center"/>')
        var min_input = $("<input class='form-control form-control-user' style='text-align:center;min-width:100px!important;width:100px;margin-right:10px'/>")
        var max_input = $("<input class='form-control form-control-user' style='text-align:center;min-width:100px!important;width:100px;margin-left:10px'/>")
        min_input.val(0)
        max_input.val(100)
        range_input_div.append(min_input)
        range_input_div.append("-")
        range_input_div.append(max_input)
        editForm.append(range_input_div)
        var bottomDiv = $('<div style="width:100%;margin-top:15px;display:flex;flex-direction:row;align-items:center;justify-content:space-around"/>')
        var confirmEdit = $('<a class="btn btn-primary btn-circle" style="margin-right:10px;box-shadow:1px 1px 5px #4e73df"><i class="fa fa-check"></i></a>')
        bottomDiv.append(confirmEdit)
        confirmEdit.click(function() {
            if (getByteLen(title_input.val()) > 0 && getByteLen(title_input.val()) < 21) {
                var re = /^[a-z0-9]+$/i;
                if (getByteLen(topic_input.val()) > 0 && getByteLen(topic_input.val()) < 11)
                    if (true) {
                        if (countSubstr(grid.html(), 'user-title=\"' + title_input.val() + '\"', false) <= 0) {
                            if (parseInt(max_input.val()) - parseInt(min_input.val()) >= 5 && (parseInt(max_input.val()) - parseInt(min_input.val())) % 5 == 0) {
                                add_dashboard(title_input.val(), topic_input.val(), parseInt(min_input.val()) + "," + parseInt(max_input.val()) + "," + parseInt(min_input.val()))
                                modifyDia.close().remove()
                            } else {
                                showtext(JSLang[lang].mod5)
                            }
                        } else
                            showtext(JSLang[lang].sameUnit)
                    } else
                        showtext("")
                else
                    showtext(JSLang[lang].topicLenIllegal)
            } else
                showtext(JSLang[lang].nameLenIllegal)
        })
        var cancelEdit = $('<a class="btn btn-danger btn-circle" style="box-shadow:1px 1px 5px #e74a3b"><i class="fa fa-arrow-left"></i></a>')
        cancelEdit.click(function() {
            modifyDia.close().remove()
            add_widget()
        })
        bottomDiv.append(cancelEdit)
        editForm.append(bottomDiv)
        var modifyDia = dialog({
            content: editForm[0],
            cancel: false
        })
        modifyDia.showModal()
    })

    if (!OFFLINE_MODE)
        output_map_add.children("a").click(function() {
            d.close().remove()
            var editForm = $('<div class="nnt"/>')
            editForm.append($('<div style="margin-top:-63px;margin-left:82.5px;margin-bottom:15px;box-shadow: 1px 1px 20px #4e73df;background-color:white;width:75px;height:75px;padding:40px;border-radius:80px;border:solid #4e73df 3px;display:flex;align-items:center;justify-content:center"><img src="icons/output_map.svg" style="width:45px;"></div>'))
            editForm.append($('<h5 style="text-align:center">' + JSLang[lang].unitName + '</h5>'))
            var title_input_div = $('<div style="display:flex;flex-direction:row;align-items:center"/>')
            var title_input = $("<input class='form-control form-control-user'  style='text-align:center' autofocus='autofocus'/>")
            title_input_div.append(title_input)
            editForm.append(title_input_div)
            editForm.append($('<h5 style="margin-top:15px;text-align:center">' + JSLang[lang].messTopic + '</h5>'))
            var topic_input_div = $('<div style="display:flex;flex-direction:row;align-items:center"/>')
            var topic_input = $("<input class='form-control form-control-user'  style='text-align:center'/>")
            topic_input_div.append(topic_input)
            topic_input.val("map")
            editForm.append(topic_input_div)
            var bottomDiv = $('<div style="width:100%;margin-top:15px;display:flex;flex-direction:row;align-items:center;justify-content:space-around"/>')
            var confirmEdit = $('<a class="btn btn-primary btn-circle" style="margin-right:10px;box-shadow:1px 1px 5px #4e73df"><i class="fa fa-check"></i></a>')
            bottomDiv.append(confirmEdit)
            confirmEdit.click(function() {
                if (getByteLen(title_input.val()) > 0 && getByteLen(title_input.val()) < 21) {
                    var re = /^[a-z0-9]+$/i;
                    if (getByteLen(topic_input.val()) > 0 && getByteLen(topic_input.val()) < 11)
                        if (true) {
                            if (countSubstr(grid.html(), 'user-title=\"' + title_input.val() + '\"', false) <= 0) {
                                add_map(title_input.val(), topic_input.val(), "")
                                modifyDia.close().remove()
                            } else
                                showtext(JSLang[lang].sameUnit)
                        } else
                            showtext("")
                    else
                        showtext(JSLang[lang].topicLenIllegal)
                } else
                    showtext(JSLang[lang].nameLenIllegal)
            })
            var cancelEdit = $('<a class="btn btn-danger btn-circle" style="box-shadow:1px 1px 5px #e74a3b"><i class="fa fa-arrow-left"></i></a>')
            cancelEdit.click(function() {
                modifyDia.close().remove()
                add_widget()
            })
            bottomDiv.append(cancelEdit)
            editForm.append(bottomDiv)
            var modifyDia = dialog({
                content: editForm[0],
                cancel: false
            })
            modifyDia.showModal()
        })

    decorate_text_add.children("a").click(function() {
        d.close().remove()
        var editForm = $('<div class="nnt"/>')
        editForm.append($('<div style="margin-top:-63px;margin-left:82.5px;margin-bottom:15px;box-shadow: 1px 1px 20px #4e73df;background-color:white;width:75px;height:75px;padding:40px;border-radius:80px;border:solid #4e73df 3px;display:flex;align-items:center;justify-content:center"><img src="icons/decorate_text.svg" style="width:45px;"></div>'))
        editForm.append($('<h5 style="text-align:center">' + JSLang[lang].displayText + '</h5>'))
        var text_input_div = $('<div style="display:flex;flex-direction:row;align-items:center"/>')
        var text_input = $("<textarea class='form-control form-control-user'  style='text-align:center;width:250px' autofocus='autofocus'/>")
        text_input_div.append(text_input)
        editForm.append(text_input_div)
        var bottomDiv = $('<div style="width:100%;margin-top:15px;display:flex;flex-direction:row;align-items:center;justify-content:space-around"/>')
        var confirmEdit = $('<a class="btn btn-primary btn-circle" style="margin-right:10px;box-shadow:1px 1px 5px #4e73df;"><i class="fa fa-check"></i></a>')
        bottomDiv.append(confirmEdit)
        confirmEdit.click(function() {
            add_decorate_text(undefined, undefined, text_input.val())
            modifyDia.close().remove()
        })
        var cancelEdit = $('<a class="btn btn-danger btn-circle"><i class="fa fa-arrow-left"></i></a>')
        cancelEdit.click(function() {
            modifyDia.close().remove()
            add_widget()
        })
        bottomDiv.append(cancelEdit)
        editForm.append(bottomDiv)
        var modifyDia = dialog({
            content: editForm[0],
            cancel: false
        })
        modifyDia.showModal()
    })

    decorate_pic_add.children("a").click(function() {
        d.close().remove()
        var editForm = $('<div class="nnt"/>')
        editForm.append($('<div style="margin-top:-63px;margin-left:82.5px;margin-bottom:15px;box-shadow: 1px 1px 20px #4e73df;background-color:white;width:75px;height:75px;padding:40px;border-radius:80px;border:solid #4e73df 3px;display:flex;align-items:center;justify-content:center"><img src="icons/decorate_pic.svg" style="width:45px;"></div>'))
        editForm.append($('<h5 style="text-align:center">' + JSLang[lang].imageURL + '</h5>'))
        var text_input_div = $('<div style="display:flex;flex-direction:row;align-items:center"/>')
        var text_input = $("<textarea class='form-control form-control-user'  style='text-align:center;width:250px' autofocus='autofocus'/>")
        text_input_div.append(text_input)
        editForm.append(text_input_div)
        editForm.append($('<h5 style="margin-top:15px;text-align:center">' + JSLang[lang].messTopic + '</h5>'))
        var topic_input_div = $('<div style="display:flex;flex-direction:row;align-items:center"/>')
        var topic_input = $("<input class='form-control form-control-user'  style='text-align:center'/>")
        topic_input.val("pic")
        topic_input_div.append(topic_input)
        editForm.append(topic_input_div)
        var bottomDiv = $('<div style="width:100%;margin-top:15px;display:flex;flex-direction:row;align-items:center;justify-content:space-around"/>')
        var confirmEdit = $('<a class="btn btn-primary btn-circle" style="margin-right:10px;box-shadow:1px 1px 5px #4e73df;"><i class="fa fa-check"></i></a>')
        bottomDiv.append(confirmEdit)
        confirmEdit.click(function() {
            add_decorate_pic(undefined, topic_input.val(), text_input.val())
            modifyDia.close().remove()
        })
        var cancelEdit = $('<a class="btn btn-danger btn-circle"><i class="fa fa-arrow-left"></i></a>')
        cancelEdit.click(function() {
            modifyDia.close().remove()
            add_widget()
        })
        bottomDiv.append(cancelEdit)
        editForm.append(bottomDiv)
        var modifyDia = dialog({
            content: editForm[0],
            cancel: false
        })
        modifyDia.showModal()
    })

    var exitdiv = $('<div style="width:100%;text-align:center"></div>')
    var exitbutton = $('<a class="btn btn-danger btn-circle btn-lg" style="box-shadow:1px 1px 5px #e74a3b;margin-bottom:-33px"><i class="fa fa-close"></i></a>')
    exitdiv.append(exitbutton)
    exitbutton.click(function() {
        d.close().remove()
    })
    var content = $("<div/>")
    content.append(widget_list)
    content.append(exitdiv)
    var d = dialog({
        'content': content[0],
        padding: '5px'
    });
    d.showModal();
}

function save_layout(exit, silent) {
    $("#top_right_icon_3").attr('class', 'fa fa-spin fa-spinner')
    var layout_info = grid.html()
    var layout_and_time_info = {
        'update_time': timeStamp2String(),
        'layout_info': stringendecoder.encodeHtml(layout_info)
    }
    var layout_JSON = JSON.stringify(layout_and_time_info)
    var data_JSON = JSON.stringify(globalTableProjectInfo)
    globalLogicInfo = {
        module: globalXML,
        code: stringendecoder.encodeHtml(globalCode)
    }
    var logic_JSON = JSON.stringify(globalLogicInfo)
    $.post('saveProject', { 'layout': layout_JSON, 'dataStorage': data_JSON, 'logicStorage': logic_JSON, 'projectName': globalProjectName, 'projectType': globalProjectType }, function(res) {
        if (res == 1) {
            isChanged = false
            if(typeof globalShareKey != 'undefined')
            {
                $.post('updateShareContent', { 'shareid':globalShareKey, 'projectName': globalProjectName, 'projectLayout':layout_JSON, 'dataStorage': data_JSON, 'logicStorage': logic_JSON }, function(res) {
                    if(res == 1)
                    {
                        $("#top_right_icon_3").attr('class', 'fa fa-save')
                        if(!silent)
                            showtext(JSLang[lang].saveSuccess)
                        if (exit)
                            window.location.href = 'logout'
                    }
                    else
                    {
                        $("#top_right_icon_3").attr('class', 'fa fa-save')
                        showtext(JSLang[lang].saveFail + res)
                    }
                })
            }
            else
            {
                $("#top_right_icon_3").attr('class', 'fa fa-save')
                if(!silent)
                    showtext(JSLang[lang].saveSuccess)
                if (exit)
                    window.location.href = 'logout'
            }
        } else {
            $("#top_right_icon_3").attr('class', 'fa fa-save')
            showtext(JSLang[lang].saveFail + res)
        }
    })
}

function check_link() {
    if (!isMixly && connected == SERVER_CONNECTED) {
        connectStatusDia.show($("#connect_span")[0]);
        check_share_key()
    }
}

function delete_project(prjName) {
    var d = dialog({
        title: JSLang[lang].info,
        content: JSLang[lang].confirmDel + "'" + prjName + "'？",
        button: [{
            value: JSLang[lang].confirm,
            callback: function() {
                var c = dialog({
                    title: JSLang[lang].info,
                    content: JSLang[lang].deleting
                });
                c.showModal();
                $.post('deleteProject', { 'projectName': prjName }, function(res) {
                    if (res == 1) {
                        c.close().remove()
                        window.location.href = "projects"
                    } else {
                        c.close().remove()
                        var e = dialog({
                            title: JSLang[lang].error,
                            content: JSLang[lang].deleteFail
                        });
                        e.showModal();
                    }
                })
            }
        }, {
            value: JSLang[lang].cancel
        }]
    });
    d.showModal();
}

function back_to_list() {
    if (client)
        client.end()
    window.location.href = 'projects'
}
var isBottomBarHidden = false;

function init_layout() {
    grid = $("#grid")
    grid2 = $("#grid2")
    grid3 = $("#grid3")
    $("#hideOrShowSwitchBar").click(function() {
        if (isBottomBarHidden) {
            $("#bottom_2").css("right", "0")
            $("#switchChevron").removeClass("fa-chevron-left")
            $("#switchChevron").addClass("fa-chevron-right")
            isBottomBarHidden = false
        } else {
            $("#bottom_2").css("right", "calc(-12rem - 30px)")
            $("#switchChevron").removeClass("fa-chevron-right")
            $("#switchChevron").addClass("fa-chevron-left")
            isBottomBarHidden = true
        }
    })
}

var standardWidth = 100

function get_width() {
    fullWidth = window.screen.width
    if ((fullWidth - 84) / 3 < 100)
        standardWidth = (fullWidth - 84) / 3
}

function listen_project(projectName) {
    showtext("平台使用高峰期，后台运行功能暂时禁用。")
    return
    var modald = showmodaltext("<div style='text-align:center' class='nnt'><i class='fa fa-spin fa-cog' style='font-size:2rem;color:#4e73df'></i><p style='margin-top:6px;margin-bottom:0;color:#4e73df;font-size:1rem;font-weight:bold'>" + JSLang[lang].loading + "</p></div>")
    $.get('/startHost', {
        'projectName': projectName
    }, function(res) {
        console.log(res)
        var code = JSON.parse(res)["code"]
        console.log(code)
        modald.close().remove()
        if (code == 1) {
            window.location.href = window.location.href
        } else if (code == -1) {
            showtext(JSLang[lang].codeException + ": " + JSON.stringify(JSON.parse(res)["exception"]))
        } else if (code == -2)
            showtext(JSLang[lang].prj404)
        else if (code == -3)
            showtext(JSLang[lang].illegalCycle)
    })
}

function listenerr_project(projectName, projectType, reason) {
    var editForm = $('<div class="nnt" style="width:294px"/>')
    editForm.append($('<div style="margin-top:-63px;margin-left:105px;margin-bottom:15px;box-shadow: 1px 1px 20px #4e73df;background-color:white;width:75px;height:75px;padding:40px;border-radius:80px;border:solid #4e73df 3px;display:flex;align-items:center;justify-content:center"><img src="icons/crash.svg" style="width:45px;"></div>'))
    editForm.append($('<h3 style="text-align:center;margin-bottom:5px">出错了</h3>'))
    editForm.append($('<h6 style="text-align:center;margin-bottom:10px">项目于后台运行期间，发生了如下错误</h6>'))
    var p = $("<p></p>")
    p.html(reason)
    editForm.append(p)
    var bottomDiv = $('<div style="width:100%;margin-top:15px;display:flex;flex-direction:row;align-items:center;justify-content:space-around"/>')
    var cancelEdit = $('<a class="btn btn-danger btn-circle" style="box-shadow:1px 1px 5px #e74a3b"><i class="fa fa-arrow-left"></i></a>')
    cancelEdit.click(function() {
        unlisten_project(projectName)
    })
    bottomDiv.append(cancelEdit)
    editForm.append(bottomDiv)
    var modifyDia = dialog({
        content: editForm[0],
        cancel: false
    })
    modifyDia.showModal()
}

function unlisten_project(projectName) {
    var modald = showmodaltext("<div style='text-align:center' class='nnt'><i class='fa fa-spin fa-cog' style='font-size:2rem;color:#4e73df'></i><p style='margin-top:6px;margin-bottom:0;color:#4e73df;font-size:1rem;font-weight:bold'>" + JSLang[lang].loading + "</p></div>")
    $.get('/endHost', {
        'projectName': projectName
    }, function(res) {
        modald.close().remove()
        if (res == 1) {
            window.location.href = window.location.href
        } else
            showtext("unknown error")
    })
}

function add_project() {
    var content = $("<div class='nnt'/>")
    content.append("<div style='margin-top:-63px;margin-left:82.5px;margin-bottom:15px;box-shadow: 1px 1px 20px #4e73df;background-color:white;width:75px;height:75px;padding:40px;border-radius:80px;border:solid #4e73df 3px;display:flex;align-items:center;justify-content:center'><img src='icons/create_prj.svg' style='width:45px;'></div>");
    content.append($("<p style='text-align:center;font-size:1.5rem;margin-bottom:15px'>" + JSLang[lang].createPrj + "</p>"))
    var form = $("<form method='post' style='margin:0'>");
    content.append(form)
    // replace enter key trigger of form
    form.keypress(function(e) {
        if (e.which == 13) {
            e.preventDefault();
            submitBt.click()
        }
    })
    var formDiv = $("<div class='col-xs-9'/>")
    form.append(formDiv)
    var formGrp = $("<div class='form-group'>")
    formDiv.append(formGrp)
    var prjName = $("<input type='text' class='form-control form-control-user' style='text-align:center' name='projectName' class='form-control' placeholder='" + JSLang[lang].createPrjName + "'/>");
    formGrp.append(prjName)
    var btDiv = $("<div class='col-xs-3'/>")
    var innerBtDiv = $("<div style='display:flex;width:100%;flex-direction:row;align-items:center;justify-content:space-around'/>")
    form.append(btDiv)
    btDiv.append(innerBtDiv)
    var submitBt = $("<a class='btn btn-primary btn-circle' style='box-shadow:1px 1px 5px #4e73df;margin-left:40px'><i class='fa fa-check'></i></a>")
    var cancelBt = $("<a class='btn btn-danger btn-circle' style='box-shadow:1px 1px 5px #e74a3b;margin-right:40px'><i class='fa fa-arrow-left'></i></a>")
    innerBtDiv.append(submitBt)
    innerBtDiv.append(cancelBt)
    submitBt.click(function() {
        if (prjName.val().length < 3 || prjName.val().length > 10) {
            showtext(JSLang[lang].lengthRes)
        } else {
            submitBt.attr("disabled", "disabled")
            $.getJSON('createProject', {
                'projectName': prjName.val(),
                'projectType': 1
            }, function(res) {
                if (res == 1) {
                    window.location.href = "/projects"
                } else if (res == 2) {
                    submitBt.removeAttr("disabled")
                    showtext(JSLang[lang].prjExist)
                } else {
                    submitBt.removeAttr("disabled")
                    showtext(JSLang[lang].prjOverflow)
                }
            })
        }
    });
    var d = dialog({
        'content': content[0]
    })
    cancelBt.click(function() {
        d.close().remove()
    })
    d.showModal();
}

function import_project() {
    var content = $("<div class='nnt'/>")
    content.append("<div style='margin-top:-63px;margin-left:82.5px;margin-bottom:15px;box-shadow: 1px 1px 20px #4e73df;background-color:white;width:75px;height:75px;padding:40px;border-radius:80px;border:solid #4e73df 3px;display:flex;align-items:center;justify-content:center'><img src='icons/download.svg' style='width:45px;'></div>");
    content.append($("<p style='text-align:center;font-size:1.5rem;margin-bottom:15px'>" + JSLang[lang].import+"</p>"))
    var form = $("<form method='post' style='margin:0'>");
    content.append(form)
    var formDiv = $("<div class='col-xs-9'/>")
    form.append(formDiv)
    var formGrp = $("<div class='form-group'>")
    formDiv.append(formGrp)
    var prjName = $("<input type='text' class='form-control form-control-user' style='text-align:center' name='projectName' class='form-control' placeholder='" + JSLang[lang].inputAuCode + "'/>");
    formGrp.append(prjName)
    var btDiv = $("<div class='col-xs-3'/>")
    var innerBtDiv = $("<div style='display:flex;width:100%;flex-direction:row;align-items:center;justify-content:space-around'/>")
    form.append(btDiv)
    btDiv.append(innerBtDiv)
    var submitBt = $("<a class='btn btn-primary btn-circle' style='box-shadow:1px 1px 5px #4e73df;margin-left:40px'><i class='fa fa-check'></i></a>")
    var cancelBt = $("<a class='btn btn-danger btn-circle' style='box-shadow:1px 1px 5px #e74a3b;margin-right:40px'><i class='fa fa-arrow-left'></i></a>")
    innerBtDiv.append(submitBt)
    innerBtDiv.append(cancelBt)
    submitBt.click(function() {
        if (prjName.val().length == 6) {
            var modald = showmodaltext("<div style='text-align:center' class='nnt'><i class='fa fa-spin fa-cog' style='font-size:2rem;color:#4e73df'></i><p style='margin-top:6px;margin-bottom:0;color:#4e73df;font-size:1rem;font-weight:bold'>" + JSLang[lang].loading + "</p></div>")
            $.get('getShare', {
                shareid: prjName.val()
            }, function(res) {
                modald.close().remove()
                if (res == 1) {
                    window.location.href = window.location.href
                } else {
                    showtext(JSLang[lang].invalidAU)
                }
            })
        } else {
            showtext(JSLang[lang].incorrectAU)
        }
    });
    var d = dialog({
        'content': content[0]
    })
    cancelBt.click(function() {
        d.close().remove()
    })
    d.showModal();
}

function add_prjblock(projectName, projectLay, timeStamp, projectType, isTask) {
    var itemdiv2 = $("<div class='col-xl-3 col-md-6' style='margin-bottom:1rem'></div>");
    var itemdiv = $("<div class='prj_blk'></div>");
    var laydiv = $("<div class='laydiv'/>")
    var laydiv2 = $("<div class='laydiv2'/>")
    var laydiv3 = $("<div class='laydiv3'/>")
    itemdiv.append(laydiv)
    itemdiv.append(laydiv2)
    itemdiv.append(laydiv3)
    var modifytime = timeStamp.substr(0, 16)
    if (JSON.parse(projectLay.replaceAll(/\\/, "")).update_time)
        modifytime = JSON.parse(projectLay).update_time.substr(0, 16)
    var bottomdiv = $("<div style='display:flex;flex-direction:row;z-index:3;align-items:center;justify-content:space-between;position:absolute;bottom:0;height:70px;background-color:rgba(78,115,223,0.8);width:100%;border-radius:0 0 0.5rem 0.5rem'/>")
    bottomdiv.append('<div style="display:flex;flex-direction:column;margin-left:16px;max-width:calc(100% - 7.5rem - 45px);"><span style="color:white;font-weight:bold;display:block;overflow:hidden;font-size:1.2rem;white-space: nowrap;max-width:50vw;text-overflow: ellipsis;">' + projectName + '</span><span style="color:white;font-size:0.5rem;white-space: nowrap;text-overflow: ellipsis;max-width:50vw;overflow: hidden;"><i class="fa fa-edit" style="margin-right:3px"></i>' + modifytime.substr(0, 16) + '</span></div>')
    var bottomButtonDiv = $("<div style='min-width:calc(7.5rem + 35px)'/>")
    console.log(isTask)
    if (isTask == 0)
        bottomButtonDiv.append('<a title="' + JSLang[lang].backRun + '" onclick="listen_project(`' + projectName + '`,`' + projectType + '`)" class="btn btn-primary btn-circle" style="width:2.5rem;height:2.5rem;font-size:1rem;margin-right:10px;z-index:9"><i class="fa fa-cloud-upload"></i></a>')
    else if (isTask == 1)
        bottomButtonDiv.append('<a title="' + JSLang[lang].stopBackRun + '" onclick="unlisten_project(`' + projectName + '`,`' + projectType + '`)" class="btn btn-danger btn-circle" style="width:2.5rem;height:2.5rem;font-size:1rem;margin-right:10px;z-index:9"><i class="fa fa-stop"></i></a>')
    else {
        var reason = stringendecoder.encodeHtml(isTask)
        bottomButtonDiv.append('<a title="' + JSLang[lang].backRunErr + '" onclick="listenerr_project(`' + projectName + '`,`' + projectType + '`,`' + reason + '`)" class="btn btn-danger btn-circle" style="width:2.5rem;height:2.5rem;font-size:1rem;margin-right:10px;z-index:9"><i class="fa fa-exclamation-triangle"></i></a>')
    }
    if (isTask == 0)
        bottomButtonDiv.append('<a title="' + JSLang[lang].editProper + '" onclick="edit_project(`' + projectName + '`,`' + projectType + '`)" class="btn btn-info btn-circle" style="width:2.5rem;height:2.5rem;font-size:1rem;margin-right:10px;z-index:9"><i class="fa fa-pencil"></i></a>')
    else
        bottomButtonDiv.append('<a title="' + JSLang[lang].editProper + '" class="btn btn-info btn-circle disabled" style="width:2.5rem;height:2.5rem;font-size:1rem;margin-right:10px;z-index:9"><i class="fa fa-pencil"></i></a>')
    if (isTask == 0)
        bottomButtonDiv.append('<a title="' + JSLang[lang].viewProject + '" onclick="view_project(`' + projectName + '`,`' + projectType + '`)" class="btn btn-success btn-circle" style="width:2.5rem;height:2.5rem;font-size:1rem;margin-right:15px;z-index:9"><i class="fa fa-arrow-right"></i></a>')
    else
        bottomButtonDiv.append('<a title="' + JSLang[lang].viewProject + '" class="btn btn-success btn-circle disabled" style="width:2.5rem;height:2.5rem;font-size:1rem;margin-right:15px;z-index:9"><i class="fa fa-arrow-right"></i></a>')
    bottomdiv.append(bottomButtonDiv)
    itemdiv.append(bottomdiv)
    itemdiv2.append(itemdiv)
    $("#prjmr").append(itemdiv2)
    var lay = $(stringendecoder.decodeHtml(JSON.parse(projectLay).layout_info))
    laydiv.html(lay)
    for (unit = 0; unit <= lay.length - 1; unit += 1) {
        if ($(lay[unit]).attr('user-type') == "output_dashboard") {
            var tid = $(lay[unit]).find("canvas").attr('id')
            var gauge = new RadialGauge({ renderTo: tid, highlights: [] })
            gauge.draw();
            var ctt = $(lay[unit]).attr('user-content')
            gauge.options.minValue = parseInt(ctt.split(',')[0])
            gauge.options.maxValue = parseInt(ctt.split(',')[1])
            gauge.value = ctt.split(',')[2]
            var max = gauge.options.maxValue
            var min = gauge.options.minValue
            var step = (gauge.options.maxValue - gauge.options.minValue) / 5
            gauge.options.majorTicks = [min, min + step, min + step * 2, min + step * 3, min + step * 4, max]
            gauge.update()
        }
    }
}
var lastPublishTime = [new Date(0), new Date(0), new Date(0), new Date(0), new Date(0), new Date(0), new Date(0), new Date(0), new Date(0), new Date(0), new Date(0), new Date(0), new Date(0), new Date(0), new Date(0), new Date(0), new Date(0), new Date(0), new Date(0), new Date(0)]
var minPublishInterval = 500

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
            stop_project()
        }
    }
}

function propublish(project, topic, message){
    var newPublishTime = new Date()
    if (newPublishTime - lastPublishTime[0] >= minPublishInterval) {
        if (!isMixly)
            client.publish(globalUserName + '/' + project + '/' + topic, message)
        else
            client.publish('MixIO' + '/' + globalUserName.slice(1) + '/' + project + '/' + topic, message)
        lastPublishTime.shift()
        lastPublishTime.push(new Date())
    } else {
        showtext(JSLang[lang].speedLimit)
        MixIO.log(JSLang[lang].speedLimit)
        stop_project()
    }
}

var exit = function() {
    activeExit = true
    save_layout(true)
}



var uploadProjects = function() {
    var editForm = $('<div class="nnt" style="width:294px"/>')
    editForm.append($('<div style="margin-top:-63px;margin-left:105px;margin-bottom:15px;box-shadow: 1px 1px 20px #4e73df;background-color:white;width:75px;height:75px;padding:40px;border-radius:80px;border:solid #4e73df 3px;display:flex;align-items:center;justify-content:center"><img src="icons/transfer.svg" style="width:45px;"></div>'))
    editForm.append($('<h3 style="text-align:center;margin-bottom:5px">' + JSLang[lang].importData + '</h3>'))
    editForm.append($('<h6 style="text-align:center;margin-bottom:10px">' + JSLang[lang].importDataWarning + '</h6>'))
    var bottomDiv = $('<div style="width:100%;margin-top:15px;display:flex;flex-direction:row;align-items:center;justify-content:space-around"/>')
    var confirmEdit = $('<a class="btn btn-success btn-circle" style="box-shadow:1px 1px 5px #1cc88a"><i class="fa fa-check"></i></a>')
    var cancelEdit = $('<a class="btn btn-danger btn-circle" style="box-shadow:1px 1px 5px #e74a3b"><i class="fa fa-arrow-left"></i></a>')
    var fileInput = $('<input type="file" accept=".json" style="border:solid black 1px;min-width:0!important;width:294px"/>')
    var fileContent = ""
    editForm.append(fileInput)
    fileInput.bind('change', function() {
        if (fileInput[0].files.length == 1) {
            var resultFile = fileInput[0].files[0]
            var reader = new FileReader()
            reader.readAsText(resultFile, 'UTF-8')
            reader.onload = function(e) {
                fileContent = e.target.result
            }
        }
    })
    confirmEdit.click(function() {
        var dataJSON = JSON.parse(fileContent)
        var mustKeys = ["userName", "projectName", "projectType", "projectLayout", "dataStorage", "logicStorage", "timestamp"]
        var isLegal = true
        for (i in dataJSON) {
            for (j in mustKeys) {
                if (!(mustKeys[j] in dataJSON[i]))
                    isLegal = false
            }
        }
        if (!isLegal) {
            showtext(JSLang[lang].invalidContent)
            return
        }
        var modald = showmodaltext("<div style='text-align:center'><i class='fa fa-spin fa-cog' style='font-size:2rem;color:#4e73df'></i><p style='margin-top:6px;margin-bottom:0;color:#4e73df;font-size:1rem;font-weight:bold'>" + JSLang[lang].loading + "</p></div>")
        var insertOne = function(index) {
            $.post("importProjects", {
                "projectName": dataJSON[index]["projectName"],
                "projectType": dataJSON[index]["projectType"],
                "projectLayout": dataJSON[index]["projectLayout"],
                "dataStorage": dataJSON[index]["dataStorage"],
                "logicStorage": dataJSON[index]["logicStorage"]
            }, function(res) {
                if (res == 3)
                    showtext(JSLang[lang].prjOverflow)
                else if (res != 1)
                    showtext("Unknown error")
                if (res != 1 || index == dataJSON.length - 1) {
                    modald.close().remove()
                    window.location.href = window.location.href
                } else
                    insertOne(index + 1)
            })
        }
        insertOne(0)
    })
    cancelEdit.click(function() {
        modifyDia.close().remove()
    })
    bottomDiv.append(confirmEdit)
    bottomDiv.append(cancelEdit)
    editForm.append(bottomDiv)
    var modifyDia = dialog({
        content: editForm[0],
        cancel: false
    })
    modifyDia.showModal()
    return false;
}

var exportProjects = function() {
    var modald = showmodaltext("<div style='text-align:center'><i class='fa fa-spin fa-cog' style='font-size:2rem;color:#4e73df'></i><p style='margin-top:6px;margin-bottom:0;color:#4e73df;font-size:1rem;font-weight:bold'>" + JSLang[lang].loading + "</p></div>")
    $.getJSON('exportProjects', function(res) {
        modald.close().remove()
        if (res != -1) {
            var exportRes = []
            for (i in res) {
                exportRes.push({
                    "dataStorage": res[i].dataStorage,
                    "logicStorage": res[i].logicStorage,
                    "projectLayout": res[i].projectLayout,
                    "projectName": res[i].projectName,
                    "projectType": res[i].projectType,
                    "userName": res[i].userName,
                    "timestamp": res[i].timestamp
                })
            }
            // dialog, 允许用户选择导出哪些项目
            var editForm = $('<div class="nnt" style="width:294px"/>')
            editForm.append($('<div style="margin-top:-63px;margin-left:105px;margin-bottom:15px;box-shadow: 1px 1px 20px #4e73df;background-color:white;width:75px;height:75px;padding:40px;border-radius:80px;border:solid #4e73df 3px;display:flex;align-items:center;justify-content:center"><img src="icons/transfer.svg" style="width:45px;"></div>'))
            editForm.append($('<h3 style="text-align:center;margin-bottom:5px">' + arrLang[lang].EXPORT + '</h3>'))
            // 选择导出项目，多选input，选项为所有项目的projectName
            var checkBoxes = $('<div style="display:flex;flex-direction:column;max-height:200px;overflow:auto"/>')
            for (i in exportRes) {
                var checkbox = $('<input type="checkbox" style="width:20px;height:20px;min-width:0!important;min-height:0!important;margin:10px" id="' + exportRes[i].projectName + '"/>')
                var label = $('<label style="color:black;font-size:1rem;padding-top:2px" for="' + exportRes[i].projectName + '">' + exportRes[i].projectName + '</label>')
                // 默认选中
                checkbox.prop("checked", true)
                checkBoxes.append($('<div style="display:flex;flex-direction:row;align-items:center;"/>').append(checkbox).append(label))
            }
            editForm.append(checkBoxes)
            var bottomDiv = $('<div style="width:100%;margin-top:15px;display:flex;flex-direction:row;align-items:center;justify-content:space-around"/>')
            var confirmEdit = $('<a class="btn btn-success btn-circle" style="box-shadow:1px 1px 5px #1cc88a"><i class="fa fa-check"></i></a>')
            var cancelEdit = $('<a class="btn btn-danger btn-circle" style="box-shadow:1px 1px 5px #e74a3b"><i class="fa fa-arrow-left"></i></a>')
            bottomDiv.append(confirmEdit)
            bottomDiv.append(cancelEdit)
            editForm.append(bottomDiv)
            var modifyDia = dialog({
                content: editForm[0],
                cancel: false
            })
            modifyDia.showModal()
            confirmEdit.click(function() {
                var eleLink = document.createElement('a');
                eleLink.download = "backup.json";
                eleLink.style.display = 'none';
                var selectedProjects = []
                for (i in exportRes) {
                    if ($("#" + exportRes[i].projectName).prop("checked"))
                        selectedProjects.push(exportRes[i].projectName)
                }
                var selectedData = []
                for (i in exportRes) {
                    if (selectedProjects.includes(exportRes[i].projectName))
                        selectedData.push(exportRes[i])
                }
                var blob = new Blob([JSON.stringify(selectedData, null, 4)]);
                eleLink.href = URL.createObjectURL(blob);
                document.body.appendChild(eleLink);
                eleLink.click();
                document.body.removeChild(eleLink);
                modifyDia.close().remove()
            })
            cancelEdit.click(function() {
                modifyDia.close().remove()
            })
        } else
            showtext("Unknown Error")
    })
}

setInterval(function(){
    if(isChanged)
    {
        save_layout(false, true)
        isChanged = false
    }
}, 30000)

storDia = false
function prepare_storDia(){
    var editForm = $('<div class="nnt" style="width:80vw;height:80vh;display:flex;flex-direction:column"/>')
    editForm.append($('<div style="margin-top:-63px;margin-left:calc(40vw - 43px);margin-bottom:15px;box-shadow: 1px 1px 20px #4e73df;background-color:white;width:75px;height:75px;padding:40px;border-radius:80px;border:solid #4e73df 3px;display:flex;align-items:center;justify-content:center"><img src="icons/store.svg" style="width:45px;"></div>'))
    editForm.append($('<h3 style="text-align:center;margin-bottom:15px">所有前缀为<span style="color:#4e73df;font-weight:bold">$</span>主题下的消息和图片会被自动保存</h3>'))
    
    // Create table structure
    var tableContainer = $('<div style="flex:1;overflow-y:auto;padding:10px;background-color:#f8f9fc;border-radius:5px"/>')
    var fileTable = $('<table id="fileTableBody" class="table table-bordered table-hover" style="background-color:white;margin-bottom:0"></table>')
    var thead = $('<thead></thead>')
    fileTable.append(thead)
    var tr = $('<tr></tr>')
    thead.append(tr)
    var selectAll = $('<input type="checkbox" id="selectAll">')
    var th = $('<th width="40"></th>')
    th.append(selectAll)
    tr.append(th)
    tr.append('<th>文件名</th>')
    tr.append('<th width="150">类型</th>')
    tr.append('<th width="180">日期</th>')
    tr.append('<th width="180">操作</th>')
    var tableBody = $('<tbody></tbody>')
    fileTable.append(tableBody)
    
    // Create grid view container (hidden by default)
    var gridContainer = $('<div id="gridViewContainer" style="display:none;flex:1;overflow-y:auto;padding:10px;background-color:#f8f9fc;border-radius:5px;display:flex;flex-wrap:wrap;gap:15px;"></div>')
    
    // Add action buttons
    var actionBar = $('<div style="margin-bottom:15px;display:flex;justify-content:space-between;align-items:center">')
    var buttonDiv = $('<div style="display:flex;align-items:center"/>')
    var deleteSelected = $('<button id="deleteSelected" class="btn btn-danger btn-sm" disabled><i class="fa fa-trash"></i> 删除选中</button>')
    var downloadSelected = $('<button id="downloadSelected" class="btn btn-primary btn-sm" style="margin-left:5px" disabled><i class="fa fa-download"></i> 下载选中</button>')
    var toggleViewBtn = $('<button id="toggleViewBtn" class="btn btn-secondary btn-sm" style="margin-left:5px"><i class="fa fa-th-large"></i> 平铺视图</button>')
    buttonDiv.append(deleteSelected)
    buttonDiv.append(downloadSelected)
    buttonDiv.append(toggleViewBtn)
    actionBar.append(buttonDiv)
    
    editForm.append(actionBar)
    tableContainer.append(fileTable)
    editForm.append(tableContainer)
    editForm.append(gridContainer) // Add grid container to the form
    
    // Bottom section
    var bottomDiv = $('<div style="width:100%;margin-top:15px;display:flex;flex-direction:row;align-items:center;justify-content:space-around"/>')
    var cancelEdit = $('<a class="btn btn-danger btn-circle" style="box-shadow:1px 1px 5px #e74a3b"><i class="fa fa-arrow-left"></i></a>')
    bottomDiv.append(cancelEdit)
    editForm.append(bottomDiv)
    
    function downloadFile(filename) {
        let url = "store/" + globalUserName + "/" + globalProjectName + "/" + filename;
        let a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }

    selectedFiles = [];
    var currentView = 'list'; // 'list' or 'grid'
    
    // Toggle view button
    toggleViewBtn.click(function() {
        if(currentView === 'list') {
            currentView = 'grid';
            toggleViewBtn.html('<i class="fa fa-list"></i> 列表视图');
            tableContainer.hide();
            gridContainer.show();
        } else {
            currentView = 'list';
            toggleViewBtn.html('<i class="fa fa-th-large"></i> 平铺视图');
            gridContainer.hide();
            tableContainer.show();
        }
    });
    gridContainer.hide()
    
    // Select all checkbox
    selectAll.change(function() {
        $('.fileCheckbox').prop('checked', $(this).is(':checked')).trigger('change');
    });
    
    // Delete selected button
    deleteSelected.click(function() {
        if(selectedFiles.length === 0) return;
        
        if(confirm('确定要删除选中的 ' + selectedFiles.length + ' 个文件吗？')) {
            let deletePromises = selectedFiles.map(filename => {
                return $.getJSON('deleteImgStore', {
                    'projectName': globalProjectName,
                    'filename': filename
                });
            });
            
            Promise.all(deletePromises).then(() => {
                sync_stor();
            });
        }
    });
    
    // Download selected button
    downloadSelected.click(function() {
        if(selectedFiles.length === 0) return;
        
        // Download each file one by one
        selectedFiles.forEach(filename => {
            downloadFile(filename);
        });
    });
    
    storDia = dialog({
        content: editForm[0],
        cancel: false
    });
    
    cancelEdit.click(function() {
        storDia.close();
    });
    
    sync_stor = function(){
        tableBody.empty()
        gridContainer.empty()
        selectedFiles = [];
        deleteSelected.prop('disabled', true);
        downloadSelected.prop('disabled', true);
        selectAll.prop('checked', false);
        
        $.getJSON('getImgStore', {
            'projectName': globalProjectName,
            'isMixly': isMixly
        }, function(res) {
            if(res.length == 0) {
                tableBody.append('<tr><td colspan="6" style="text-align:center;padding:20px">暂无存储文件</td></tr>')
                gridContainer.append('<div style="width:100%;text-align:center;padding:20px">暂无存储文件</div>')
                return;
            }
            var sortedRes = res.sort(function(a, b) {
                // 提取时间戳
                let getTimestamp = function(filename) {
                    if(filename.split("_").length>1) {
                        return parseInt(filename.split("_")[1].split('.')[0]);
                    } else {
                        return parseInt(filename.split('.')[0]);
                    }
                };
                
                let timeA = getTimestamp(a);
                let timeB = getTimestamp(b);
                
                // 从新到旧排序 (最新的在前面)
                return timeB - timeA;
                
                // 如果要从旧到新排序，使用下面这行代替上面那行
                // return timeA - timeB;
            });
            
            res = sortedRes;
            for (let ri = 0; ri < res.length; ri++) {
                let filename = res[ri];
                let url = "store/" + globalUserName + "/" + globalProjectName + "/" + filename;
                if(isMixly) {
                    url = "store/MixIO/" + globalUserName.substr(1) + "/" + globalProjectName + "/" + filename;
                }
                let isText = filename.endsWith('.txt');
                let timeStamp;
                if(filename.split("_").length>1) {
                    timeStamp = parseInt(filename.split("_")[1].split('.')[0])
                } else {
                    timeStamp = parseInt(filename.split('.')[0]);
                }
                let timeString = new Date(timeStamp).toLocaleString();
                let fileType = isText ? '文本' : '图片';
                
                // List view row
                let row = $('<tr></tr>');
                
                // Checkbox
                row.append('<td><input type="checkbox" class="fileCheckbox" data-filename="' + filename + '"></td>');
                
                // Filename
                row.append('<td style="word-break:break-all">' + filename + '</td>');
                
                // Type
                row.append('<td>' + fileType + '</td>');
                
                // Date
                row.append('<td>' + timeString + '</td>');
                
                // Actions
                let actionCell = $('<td></td>');
                
                // Download button (added for each file)
                let downloadBtn = $('<button class="btn btn-success btn-xs" style="margin-right:5px" title="下载"><i class="fa fa-download"></i></button>');
                downloadBtn.click(function() {
                    downloadFile(filename);
                });
                actionCell.append(downloadBtn);
                
                if (isText) {
                    let viewBtn = $('<button class="btn btn-primary btn-xs" style="margin-right:5px" title="查看"><i class="fa fa-eye"></i></button>');
                    viewBtn.click(function() {
                        $.ajax({
                            url: url,
                            success: function(content) {
                                let textDialog = dialog({
                                    content: $('<div style="width:50vw;height:50vh;padding:20px;overflow:auto"><pre style="white-space:pre-wrap">' + content + '</pre></div>')[0],
                                    cancel: true,
                                    cancelValue: '关闭'
                                });
                                textDialog.showModal();
                            }
                        });
                    });
                    actionCell.append(viewBtn);
                } else {
                    let viewBtn = $('<button class="btn btn-primary btn-xs" style="margin-right:5px" title="查看"><i class="fa fa-eye"></i></button>');
                    viewBtn.click(function() {
                        let fullDialog = dialog({
                            content: $('<div style="width:60vw;height:60vh;display:flex;align-items:center;justify-content:center"><img src="' + url + '" style="max-width:100%;max-height:100%"/></div>')[0],
                            cancel: true,
                            cancelValue: '关闭'
                        });
                        fullDialog.showModal();
                    });
                    actionCell.append(viewBtn);
                }
                
                let deleteBtn = $('<button class="btn btn-danger btn-xs" title="删除"><i class="fa fa-trash"></i></button>');
                deleteBtn.click(function() {
                    if(confirm('确定要删除此文件吗？')) {
                        $.getJSON('deleteImgStore', {
                            'projectName': globalProjectName,
                            'filename': filename,
                            'isMixly': isMixly
                        }, function() {
                            sync_stor();
                        });
                    }
                });
                actionCell.append(deleteBtn);
                
                row.append(actionCell);
                tableBody.append(row);
                
                // Grid view item
                let gridItem = $('<div class="grid-item" style="width:200px;height:257px;background:white;border-radius:5px;overflow:hidden;box-shadow:0 2px 5px rgba(0,0,0,0.1);display:flex;flex-direction:column">');
                
                // File preview
                let previewDiv = $('<div style="height:120px;display:flex;align-items:center;justify-content:center;background:#f5f5f5;cursor:pointer">');
                
                if (isText) {
                    previewDiv.append('<i class="fa fa-file-text-o" style="font-size:48px;color:#4e73df"></i>');
                } else {
                    previewDiv.append('<img src="' + url + '" style="max-width:100%;max-height:100%;object-fit:contain">');
                }
                
                previewDiv.click(function() {
                    if (isText) {
                        $.ajax({
                            url: url,
                            success: function(content) {
                                let textDialog = dialog({
                                    content: $('<div style="width:50vw;height:50vh;padding:20px;overflow:auto"><pre style="white-space:pre-wrap">' + content + '</pre></div>')[0],
                                    cancel: true,
                                    cancelValue: '关闭'
                                });
                                textDialog.showModal();
                            }
                        });
                    } else {
                        let fullDialog = dialog({
                            content: $('<div style="width:60vw;height:60vh;display:flex;align-items:center;justify-content:center"><img src="' + url + '" style="max-width:100%;max-height:100%"/></div>')[0],
                            cancel: true,
                            cancelValue: '关闭'
                        });
                        fullDialog.showModal();
                    }
                });
                
                gridItem.append(previewDiv);
                
                // File info
                let infoDiv = $('<div style="padding:10px;flex:1;display:flex;flex-direction:column">');
                
                // Filename (truncated)
                let shortName = filename.length > 20 ? filename.substring(0, 17) + '...' : filename;
                infoDiv.append('<div style="font-weight:bold;margin-bottom:5px;word-break:break-all" title="' + filename + '">' + shortName + '</div>');
                
                // File type and date
                infoDiv.append('<div style="font-size:12px;color:#666;margin-bottom:5px">' + fileType + '</div>');
                infoDiv.append('<div style="font-size:12px;color:#666">' + timeString + '</div>');
                
                gridItem.append(infoDiv);
                
                // Actions
                let actionsDiv = $('<div style="padding:10px;border-top:1px solid #eee;display:flex;justify-content:space-between">');
                
                // Checkbox
                actionsDiv.append('<div><input type="checkbox" class="fileCheckbox" style="min-width:0!important" data-filename="' + filename + '"> 选择</div>');
                
                // Buttons
                let btnGroup = $('<div style="display:flex;gap:5px">');
                
                let gridDownloadBtn = $('<button class="btn btn-success btn-xs" title="下载"><i class="fa fa-download"></i></button>');
                gridDownloadBtn.click(function(e) {
                    e.stopPropagation();
                    downloadFile(filename);
                });
                btnGroup.append(gridDownloadBtn);
                
                let gridDeleteBtn = $('<button class="btn btn-danger btn-xs" title="删除"><i class="fa fa-trash"></i></button>');
                gridDeleteBtn.click(function(e) {
                    e.stopPropagation();
                    if(confirm('确定要删除此文件吗？')) {
                        $.getJSON('deleteImgStore', {
                            'projectName': globalProjectName,
                            'filename': filename,
                            'isMixly': isMixly
                        }, function() {
                            sync_stor();
                        });
                    }
                });
                btnGroup.append(gridDeleteBtn);
                
                actionsDiv.append(btnGroup);
                gridItem.append(actionsDiv);
                
                gridContainer.append(gridItem);
            }
            
            // Add checkbox event handlers for both views
            $('.fileCheckbox').change(function() {
                let filename = $(this).data('filename');
                if($(this).is(':checked')) {
                    if(!selectedFiles.includes(filename)) {
                        selectedFiles.push(filename);
                    }
                } else {
                    selectedFiles = selectedFiles.filter(f => f !== filename);
                    selectAll.prop('checked', false);
                }
                deleteSelected.prop('disabled', selectedFiles.length === 0);
                downloadSelected.prop('disabled', selectedFiles.length === 0);
            });
        });
    }
    
    sync_stor();
    client.on('message', function(topic, msg) {
        if(isMixly)
        {
            if(topic.split("/")[3][0] == "$")
                sync_stor();
        }
        else
        {
            if(topic.split("/")[2][0] == "$")
            {
                sync_stor();
            }
        }
    });
}

function open_storage(){
    storDia.showModal();
}