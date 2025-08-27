/**
 * @Author 宋义深 1371033826@qq.com
 * @Description MixIO逻辑视图基础库
 * @Version 2.9.5
 */

curlong = 0
curlati = 0

navigator.geolocation.getCurrentPosition(function(position) {
    curlong = position.coords.longitude
    curlati = position.coords.latitude
}, function(error) {
    console.log(error)
})

function MixIOLogicError(message) {
    this.message = message
    this.name = "MixIOLogicError"
}
MixIOLogicError.prototype = new Error()

var MixIO = {

    preCode: "",
    alert: function(msg) {
        if ((typeof cordova) != "undefined" && (typeof cordova.plugins) != "undefined" && (typeof cordova.plugins.notification) != "undefined") {
            cordova.plugins.notification.local.schedule({
                text: String(msg),
                foreground: true
            });
        } else if ((typeof Notification) != "undefined")
            new Notification("Message", { body: msg, tag: "MixIO" })
    },
    triggers: {},
    listeners_to_be_removed: [],
    timers_to_be_removed: [],
    cycles_to_be_removed: [],

    triggersToPreCode: function() {
        MixIO.preCode = ""
        for (trigger in MixIO.triggers) {
            MixIO.preCode = MixIO.preCode + "MixIO.triggers." + trigger + "()\n"
        }
    },
    safe_pause: function() {
        for (listener in this.listeners_to_be_removed) {
            for (eventIndex in client._events.message) {
                if (client._events.message[eventIndex] == this.listeners_to_be_removed[listener]) {
                    client._events.message.splice(eventIndex, 1)
                    break;
                }
            }
        }
        for (timer in this.timers_to_be_removed) {
            clearTimeout(this.timers_to_be_removed[timer])
        }
        for (cycle in this.cycles_to_be_removed) {
            clearInterval(this.cycles_to_be_removed[cycle])
        }
        this.listeners_to_be_removed = []
        this.timers_to_be_removed = []
        this.cycles_to_be_removed = []
        for (tagIndex in MixIO.eventTags)
            $('*[user-title]').unbind(MixIO.eventTags[tagIndex])
    },

    /*合法的MixIO组件种类*/
    typeTags: {
        BUTTON: 1,
        SLIDER: 2,
        KEYBOARD: 3,
        JOYSTICK: 4,
        RGB_PICKER: 5,
        BULB: 6,
        TEXT_SCREEN: 7,
        LINE_CHART: 8,
        BAR_CHART: 9,
        DATA_TABLE: 10,
        DASHBOARD: 11,
        DATA_MAP: 12,
        WEATHER: 13,
        TIMER: 14,
        TRIGGER: 15,
        BLE: 16,
        CAMERA: 17
    },

    oldTags: ["input_button", "input_slider", "input_keyboard", "input_controller", "input_rgb", "output_bulb", "output_text",
        "output_chart", "output_bar", "table", "output_dashboard", "output_map", "input_weather", "timer", "trigger", "ble", "camera"
    ],
    zhcnTags: ["按键/开关", "滑杆", "文本输入", "摇杆手柄", "RGB色盘", "指示灯", "文本显示屏", "折线图表", "柱状图表", "数据表格", "仪表盘", "数据地图", "实时气象仪", "定时触发器", "条件触发器", "蓝牙转发器", "摄像头"],

    /*合法的MixIO事件种类*/
    eventTags: {

        MQTT_MESSAGE_RECEIVED: "11", //收到MQTT消息

        BUTTON_PRESSED: "111", //按键被按下
        BUTTON_LOOSED: "112", //按键/开关被松开
        BUTTON_CHANGED: "113", //按键/开关收到消息

        SLIDER_SLIDED: "211", //滑杆被拖动
        SLIDER_CHANGED: "212", //滑杆收到消息

        KEYBOARD_SENT: "311", //键盘发送消息

        JOYSTICK_CHANGED: "411", //摇杆被拖动

        RGB_PICKER_PICKED: "511", //RGB色盘被选色
        RGB_PICKER_CHANGED: "512", //RGB色盘收到消息

        BULB_CHANGED: "611", //指示灯收到消息

        TEXT_SCREEN_CHANGED: "711", //文本显示屏收到消息

        LINE_CHART_CHANGED: "811", //折线图表收到消息

        BAR_CHART_CHANGED: "911", //柱状图表收到消息

        DATA_TABLE_CHANGED: "1011", //数据表格收到消息

        DASHBOARD_CHANGED: "1111", //仪表盘收到消息

        DATA_MAP_CHANGED: "1211", //数据地图收到消息

        WEATHER_SYNCED: "1311", //气象仪更新数据
        WEATHER_SENT: "1312", //气象仪发送数据

        TIMER_TRIGGERED: "1411",

        TRIGGER_TRIGGERED: "1511",

        BLUETOOTH_TRIGGERED: "1611",

        CAMERA_SENT: "1711"

    },

    /*合法的MixIO行为种类*/
    actionTags: {

        SEND_MQTT_MESSAGE: "21", //发送MQTT消息

        BUTTON_SWITCH: "121", //切换开关状态

        SLIDER_SEND: "221", //改变滑杆数值

        KEYBOARD_SEND: "321", //通过键盘发送消息

        JOYSTICK_SEND: "421", //通过摇杆发送位置消息

        RGB_PICKER_SEND: "521", //通过RGB色盘发送消息

        BULB_CHANGE: "621", //向指示灯发送消息

        TEXT_SCREEN_CHANGE: "721", //向文本显示屏发送消息

        LINE_CHART_CHANGE: "821", //向折线图表发送消息
        LINE_CHART_CLEAR: "822", //清空折线图表消息

        BAR_CHART_CHANGE: "921", //向柱状图表发送消息
        BAR_CHART_CLEAR: "922", //清空柱状图表消息

        DATA_TABLE_CHANGE: "1021", //向数据表格发送消息
        DATA_TABLE_CLEAR: "1022", //清空数据表格消息

        DASHBOARD_CHANGE: "1121", //向仪表盘发送消息

        DATA_MAP_CHANGE: "1221", //向数据地图发送消息
        DATA_MAP_CLEAR: "1222", //清空数据地图数据

        WEATHER_SYNC: "1321", //更新气象仪数据
        WEATHER_SEND: "1322", //发送气象仪数据

        TRIGGER_TIMER: "1411",

        BLUETOOTH_SENT: "1611"
    },
    publish: function(topic, message) {
        // if message undefined
        if (message === undefined)
            publish(topic.toString(), "undefined")
        else
            publish(topic.toString(), message.toString())
    },

    setInterval(triggerFunction, intervalTime) {
        MixIO.cycles_to_be_removed.push(setInterval(triggerFunction, intervalTime))
    },

    setTimeout(triggerFunction, waitTime) {
        MixIO.timers_to_be_removed.push(setTimeout(triggerFunction, waitTime))
    },

    onMessage: function(trigger) {
        var toBeRemoved = function(topic, message) {
            var splitTopic = topic.split('/').pop()
            trigger(splitTopic, message)
        }
        client.on("message", toBeRemoved)
        this.listeners_to_be_removed.push(toBeRemoved)
    },

    isValidType: function(typeTag) {
        for (target in this.typeTags) {
            if (typeTag === this.typeTags[target])
                return true;
        }
        return false;
    },

    /*获取组件实例*/
    getInstance: function(name, type) {
        if (!this.isValidType(type))
            throw new MixIOLogicError(JSLang[lang].invalidUType)
        var instance = $("[" + "user-title='" + name + "']")
        if (instance.length != 1)
            throw new MixIOLogicError(JSLang[lang].noUnitFound)
        if (instance.attr("user-type") != this.oldTags[type - 1])
            throw new MixIOLogicError(JSLang[lang].invalidUType)
        instance.toString = function() {
            return MixIO.zhcnTags[type - 1] + ":" + name
        }
        if (type === MixIO.typeTags.BUTTON) {
            //获取开关状态
            instance.isOn = function() {
                return instance.attr('user-content') == '1'
            }
        } else if (type === MixIO.typeTags.SLIDER) {
            //获取滑杆数值
            instance.getValue = function() {
                return parseFloat(instance.attr('user-content').split(',')[3])
            }
        } else if (type === MixIO.typeTags.JOYSTICK) {
            //获取摇杆横坐标
            instance.getX = function() {
                    return parseInt(instance.attr('user-content').split(',')[0])
                }
                //获取摇杆纵坐标
            instance.getY = function() {
                return parseInt(instance.attr('user-content').split(',')[1])
            }
        } else if (type === MixIO.typeTags.KEYBOARD) {
            instance.getText = function() {
                return instance.attr('user-content')
            }
        } else if (type === MixIO.typeTags.RGB_PICKER) {
            //获取RGB色盘当前颜色
            instance.getColor = function() {
                var tmp = instance.attr('user-content').split(',')
                for (i in tmp) {
                    tmp[i] = parseInt(tmp[i])
                }
                return tmp
            }
        } else if (type === MixIO.typeTags.BULB) {
            //获取指示灯当前状态
            instance.getStatus = function() {
                return instance.attr('user-content')
            }
        } else if (type === MixIO.typeTags.TEXT_SCREEN) {
            //获取文本显示屏的当前显示
            instance.getText = function() {
                return instance.attr('user-content')
            }
        } else if (type === MixIO.typeTags.LINE_CHART) {
            var allJSON = []
            if (instance.attr('user-content').length > 2) {
                var allMsg = JSON.parse(stringendecoder.decodeHtml(instance.attr('user-content').slice(2)))
                var prevX = allMsg.prevX.data
                var series = allMsg.series
                for (i in prevX) {
                    let oneJSON = {}
                    let j = i
                    oneJSON.time = prevX[j]
                    for (sery in series)
                        oneJSON[series[sery].name] = series[sery]['data'][j]
                    allJSON.push(oneJSON)
                }
            }
            //获取折线图表的全部历史消息
            instance.getAllMessages = function(index) {
                    return allJSON
                }
                //获取折线图表的至多前num条消息
            instance.getLatestMessages = function(num) {
                    return allJSON.slice(0 - num)
                }
                //获取折线图表的最新一条消息
            instance.getLatestMessage = function(index) {
                return allJSON.slice(-1)
            }
        } else if (type === MixIO.typeTags.BAR_CHART) {
            var allMsg = instance.attr('user-content').slice(2).split(',')
            var sepMsgs = {
                keys: [],
                values: []
            }
            var count = allMsg.length / 2
            for (msg in allMsg) {
                if (msg < count)
                    sepMsgs.keys.push(allMsg[msg])
                else
                    sepMsgs.values.push(allMsg[msg])
            }
            //获取柱状图表的当前数据
            instance.getData = function() {
                return sepMsgs
            }
        } else if (type === MixIO.typeTags.DATA_TABLE) {
            var allMsg = instance.attr('user-content').split(',')
            var sepMsgs = {}
            var colCount = parseInt(allMsg[0])
            for (var i = 0; i < colCount; i = i + 1) {
                sepMsgs[allMsg[i + 1]] = []
                console.log(allMsg[i + 1])
            }
            for (var i = 1 + colCount; i < allMsg.length; i = i + 1) {
                sepMsgs[allMsg[(i - 1 - colCount) % colCount + 1]].push(allMsg[i])
                console.log(allMsg[(i - 1 - colCount) % colCount + 1])
                console.log(allMsg[i])
            }
            //获取数据表格的全部数据
            instance.getData = function() {
                return sepMsgs
            }
        } else if (type === MixIO.typeTags.DASHBOARD) {
            //获取仪表盘的当前值
            instance.getValue = function() {
                return instance.attr('user-content').split(',')[2]
            }
        } else if (type === MixIO.typeTags.WEATHER) {
            var sepMsgs = {
                    district: instance.attr('user-content').split(',')[1],
                    weather_type: instance.attr('user-content').split(',')[2],
                    temperature: instance.attr('user-content').split(',')[3],
                    humidity: instance.attr('user-content').split(',')[4],
                    wind_dir: instance.attr('user-content').split(',')[5],
                    wind_class: instance.attr('user-content').split(',')[6]
                }
                //获取气象仪的信息
            instance.getData = function(type) {
                return sepMsgs[type]
            }
        } else if (type === MixIO.typeTags.TIMER || type === MixIO.typeTags.TRIGGER){
            instance.getTriggerTimes = function(){
                try{
                    return parseInt(instance.attr('user-times'))
                }
                catch{
                    return 0
                }
            }
        } else if (type === MixIO.typeTags.BLE){
            instance.getBluetoothStatus = function() {
                return instance.attr('user-content')
            }
        }
        return instance
    },
    getClientid: function() {
        return client.options.clientId
    },
    getLong: function() {
        return curlong
    },
    getLati: function() {
        return curlati
    }
}
var mixio = MixIO