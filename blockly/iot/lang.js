(function (global) {
  'use strict';

  var locales = {
    zh: {
      messages: {
        ALERT_MESSAGE: '发布通知',
        DICTS_CREATE_EMPTY_TITLE: '创建空字典',
        DICTS_CREATE_EMPTY_TOOLTIP: '返回一个不包含任何条目的空字典。',
        DICTS_CREATE_WITH_CONTAINER_TOOLTIP: '添加、删除或重新排列字典条目。',
        DICTS_CREATE_WITH_INPUT_WITH: '创建字典，内容：',
        DICTS_CREATE_WITH_ITEM_TITLE: '条目',
        DICTS_CREATE_WITH_ITEM_TOOLTIP: '向字典中添加一个条目。',
        DICTS_CREATE_WITH_TOOLTIP: '创建一个包含任意数量条目的字典。',
        DICTS_CREATE_WITH_ITEM_KEY: '键',
        DICT_KEYS: '获取所有键',
        DICTS_KEYS_TOOLTIP: '返回包含字典中所有键的列表。',
        DICTS_GET_FROM_DICTS: '从字典',
        DICTS_GET_IN: '获取键',
        DICTS_GET_TOOLTIP: '获取字典中指定键的值；键不存在时会产生错误。',
        DICTS_GET_DEFAULT_TOOLTIP: '获取字典中指定键的值；键不存在时返回默认值。',
        DICTS_ADD_in_DICT: '在字典',
        DICTS_ADD: '添加或修改键',
        DICTS_ADD_: '添加',
        DICTS_ADD_VALUE: '对应值',
        DICTS_ADD_OR_CHANGE: '添加或修改',
        DICTS_ADD_OR_CHANGE_TOOLTIP: '在字典中添加条目或修改已有条目。',
        DICTS_ADD_TOOLTIP: '向字典添加一个条目。',
        DICTS_DELETE_IN: '删除键',
        DICTS_DELETE_VALUE: '及对应值',
        DICTS_DELETE_TOOLTIP: '删除字典中的指定条目。',
        DICTS_DEFAULT_VALUE: '默认值',
        DICT_CLEAR: '清空所有条目',
        DICTS_CLEAR_TOOLTIP: '删除字典中的所有条目。',
        DICT_ITEMS: '将字典条目转为列表',
        DICTS_ITEMS_TOOLTIP: '返回包含字典中所有键和值的列表。',
        DICT_VALUES: '获取所有值',
        DICTS_VALUES_TOOLTIP: '返回包含字典中所有值的列表。',
        DICT_LENGTH_TOOLTIP: '返回字典中的键数量。',
        DICTS_LENGTH_TOOLTIP: '返回字典中的键数量。',
        DICT_DELDICT: '删除字典',
        DICTS_DEL_TOOLTIP: '删除整个字典。',
        MAKE_DICT: '更新字典',
        DICT_UPDATE: '使用',
        DICTS_UPDATE_TOOLTIP: '使用另一个字典的条目更新当前字典。',
        DICT_POP_TOOLTIP: '删除指定键并返回对应值。',
        DICTS_SET_DEFAULT: '设置键',
        DICTS_SETDEFAULT_TOOLTIP: '键不存在时写入默认值。',
        PRINT_MESSAGE: '打印输出',
        EVERY: '每隔',
        MILLISECOND: '毫秒',
        AFTER: '后',
        CURRENT_TIME: '获取当前时间',
        TEXT_APPEND_TO: '向'
      },
      blocks: {
        MESSAGE: '消息', RECEIVE: '当收到', ANY_MESSAGE: '任意消息时', TOPIC_MESSAGE: '主题消息时',
        PUBLISH_MESSAGE: '发布主题消息', GETREQ: 'GET 请求', POSTREQ: 'POST 请求', USEDATA: '使用数据',
        WAITREQ: '并等待响应', WAITJSONREQ: '并等待 JSON 响应',
        BUTTON_DOWN: '按键被按下时', BUTTON_UP: '按键/开关松开时', BUTTON_RECIEVE_MESSAGE: '开关收到消息时',
        BUTTON_SWITCH: '切换', BUTTON_SWITCH_STATE: '开关的状态', PIXEL_SWITCH: '切换', PIXEL_SWITCH_STATE: '点阵屏的像素',
        DRAG_SLIDER: '滑杆被拖动时', SLIDER_RECIEVE_MESSAGE: '滑杆收到消息时', SLIDER_NUM_IS: '滑杆数值为', SLIDER_NUM: '滑杆的数值',
        WHEN_TEXTINPUT_SEND: '文本输入发送消息时', THROUGH: '通过', TEXTINPUT_SEND: '文本输入发送消息',
        SELECT_SEND: '下拉选项发送消息并将选项改为', SELECT_SENT: '下拉选项发送消息时',
        JOYSTICK_DRAGGED: '摇杆被拖动时', JOYSTICK_SENDXY: '摇杆发送位置消息', JOYSTICK_X: '摇杆的横坐标', JOYSTICK_Y: '摇杆的纵坐标',
        RGB_COLOR_SELECTED: 'RGB 色盘选中颜色时', RGB_MESSAGE_RECIEVED: 'RGB 色盘收到消息时', RGB_SEND: 'RGB 色盘发送消息', RGB_NOW_COLOR: 'RGB 色盘的当前颜色',
        BULB_RECIEVED_MESSAGE: '指示灯收到消息时', TO: '向', SEND_MESSAGE: '指示灯发送消息', BULB_NOW_STATE: '指示灯的当前状态',
        LED_RECIEVED_MESSAGE: '文本显示屏收到消息时', TEXTLED_SEND_MESSAGE: '文本显示屏发送消息', TEXTLED_NOW: '文本显示屏的当前显示',
        LINECHART_RECIEVED: '折线图表收到消息时', LINECHART_SEND_MESSAGE: '折线图表发送消息', LET: '令', CLEAR_LINECHART: '清空折线图表',
        LINECHART_ALL_MESSAGE: '折线图表的全部历史消息', LINECHART_N_MESSAGE: '折线图表最近的', LINECHART_MESSAGE: '条消息', LINECHART_LATEST_MESSAGE: '折线图表的最新消息',
        TIMER_TRIGGERED: '定时触发器触发时', GET_TRIGGER_TIMES: '定时触发器的触发次数', TRIGGER_TRIGGERED: '条件触发器触发时', GET_TRIGGER_TRIGGERS: '条件触发器的触发次数',
        BLUETOOTH_TRIGGERED: '蓝牙转发器收到消息时', GET_BLUETOOTH_STATUS: '蓝牙转发器连接的设备', BLUETOOTH_SENT: '蓝牙转发器发送消息',
        CAMERA_SENT: '摄像头发送消息时', MIC_SENT: '语音识别发送消息时',
        BARCHART_RECIEVED: '投票器收到消息时', BARCHART_SEND_MESSAGE: '投票器发送消息', CLEAR_BARCHART: '清空投票器图表', BARCHART_NOW_MESSAGE: '投票器的当前数据',
        DATASHEET_RECIEVED: '数据表格收到消息时', DATASHEET_SEND_MESSAGE: '数据表格发送消息', CLEAR_DATASHEET: '清空数据表格', DATASHEET_ALL_MESSAGE: '数据表格的全部数据',
        DASHBOARD_RECIEVED: '仪表盘收到消息时', DASHBOARD_SEND_MESSAGE: '仪表盘发送消息', DASHBOARD_NOW_MESSAGE: '仪表盘的当前值',
        DATAMAP_RECIEVED: '数据地图收到消息时', DATAMAP: '数据地图', DATAMAP_LONG: '经度', DATAMAP_LAT: '纬度', DATAMAP_SEND_MESSAGE: '发送消息列表', CLEAR_DATAMAP: '清空数据地图',
        CLEAR_PIXEL: '清空点阵屏画布', FACE_RECOGNIZED: '人脸识别组件识别到人脸时', BEEP_RECEIVED: '蜂鸣器发出声音时', BEEP_SEND: '蜂鸣器发出声音', QR_RECOGNIZED: '二维码识别组件识别到二维码时',
        WS_UPDATED: '气象仪更新数据时', WS_SEND: '气象仪发送数据时', LET_WS_UPDATE: '气象仪更新数据', LET_WS_SEND: '气象仪下发数据', WS_PARA: '气象仪的', WS_INFO: '信息',
        MIXLY_MICROPYTHON_SOCKET_TO: '至', MIXLY_MICROBIT_JS_CURRENT: '当', MIXLY_MICROBIT_PY_STORAGE_GET: '获取', MIXLY_LENGTH: '的长度', MIXLY_CHANGE: '改变',
        MIXLY_MICROBIT_TYPE_DICT: '字典', MIXLY_MICROBIT_JS_DELETE_VAR: '删除', MIXLY_MICROPYTHON_SOCKET_MAKE: '键', MIXLY_MID: '中的条目', blockpy_DICT_POP: '弹出键',
        MIXLY_TODICT: '转为字典', MIXLY_PYTHON_TOOLTIP_TODICT: '将值转换为字典。',
        PARSE_INT: '转为整数', PARSE_FLOAT: '转为浮点数', GET_LONG: '获取当前经度', GET_LATI: '获取当前纬度',
        GET_KEYBOARD_INPUT: '文本输入的文本', GET_SELECT_OPTIONS: '下拉选项的选项列表', JSON2TEXT: '字典转文本', TEXT2JSON: '文本转字典',
        USEAPIKEY: '使用百度 API Key', USESECRETKEY: '和 Secret Key', GETTOKEN: '获取 Access Token', TRANSORIGIN: '使用 Access Token',
        USETEXT: '将文本', USETEXT2: '使用文本', BOT: '与文心一言对话', TOLANG: '翻译为', PARA1: '，参数：result'
      },
      toolbox: {
        '控制': '控制', '数学': '数学', '逻辑': '逻辑', '文本': '文本', '列表': '列表', '字典': '字典', '变量': '变量', '函数': '函数',
        'MQTT消息': 'MQTT 消息', '网络': '网络', '开关/按键': '开关/按键', '滑杆': '滑杆', '摇杆手柄': '摇杆手柄', 'RGB色盘': 'RGB 色盘',
        '指示灯': '指示灯', '定时触发器': '定时触发器', '条件触发器': '条件触发器', '蓝牙转发器': '蓝牙转发器', '折线图表': '折线图表',
        '投票器': '投票器', '数据表格': '数据表格', '数据地图': '数据地图', '仪表盘': '仪表盘', '实时气象仪': '实时气象仪', '摄像头': '摄像头',
        '语音识别': '语音识别', '下拉选项': '下拉选项', '文本输入': '文本输入', '文本显示屏': '文本显示屏', '点阵屏': '点阵屏',
        '人脸识别': '人脸识别', '蜂鸣器': '蜂鸣器', '二维码识别': '二维码识别'
      },
      options: {
        switchState: [['开', 'true'], ['关', 'false']], pixelState: [['亮', 'true'], ['灭', 'false']],
        trafficLight: [['关闭', '0'], ['绿灯', '1'], ['黄灯', '2'], ['红灯', '3']],
        weather: [['天气', '"weather_type"'], ['温度', '"temperature"'], ['湿度', '"humidity"'], ['风向', '"wind_dir"'], ['风级', '"wind_class"'], ['区域信息', '"district"']]
      }
    },
    tw: {
      messages: {
        ALERT_MESSAGE: '發佈通知', DICTS_CREATE_EMPTY_TITLE: '建立空字典', DICTS_CREATE_EMPTY_TOOLTIP: '回傳一個不含任何項目的空字典。',
        DICTS_CREATE_WITH_CONTAINER_TOOLTIP: '新增、刪除或重新排列字典項目。', DICTS_CREATE_WITH_INPUT_WITH: '建立字典，內容：', DICTS_CREATE_WITH_ITEM_TITLE: '項目',
        DICTS_CREATE_WITH_ITEM_TOOLTIP: '新增一個項目到字典。', DICTS_CREATE_WITH_TOOLTIP: '建立包含任意數量項目的字典。', DICTS_CREATE_WITH_ITEM_KEY: '鍵',
        DICT_KEYS: '取得所有鍵', DICTS_KEYS_TOOLTIP: '回傳包含字典中所有鍵的清單。', DICTS_GET_FROM_DICTS: '從字典', DICTS_GET_IN: '取得鍵',
        DICTS_GET_TOOLTIP: '取得字典中指定鍵的值；鍵不存在時會產生錯誤。', DICTS_GET_DEFAULT_TOOLTIP: '取得字典中指定鍵的值；鍵不存在時回傳預設值。',
        DICTS_ADD_in_DICT: '在字典', DICTS_ADD: '新增或修改鍵', DICTS_ADD_: '新增', DICTS_ADD_VALUE: '對應值', DICTS_ADD_OR_CHANGE: '新增或修改',
        DICTS_ADD_OR_CHANGE_TOOLTIP: '在字典中新增項目或修改現有項目。', DICTS_ADD_TOOLTIP: '新增一個項目到字典。', DICTS_DELETE_IN: '刪除鍵', DICTS_DELETE_VALUE: '及對應值',
        DICTS_DELETE_TOOLTIP: '刪除字典中的指定項目。', DICTS_DEFAULT_VALUE: '預設值', DICT_CLEAR: '清空所有項目', DICTS_CLEAR_TOOLTIP: '刪除字典中的所有項目。',
        DICT_ITEMS: '將字典項目轉為清單', DICTS_ITEMS_TOOLTIP: '回傳包含字典中所有鍵和值的清單。', DICT_VALUES: '取得所有值', DICTS_VALUES_TOOLTIP: '回傳包含字典中所有值的清單。',
        DICT_LENGTH_TOOLTIP: '回傳字典中的鍵數量。', DICTS_LENGTH_TOOLTIP: '回傳字典中的鍵數量。', DICT_DELDICT: '刪除字典', DICTS_DEL_TOOLTIP: '刪除整個字典。',
        MAKE_DICT: '更新字典', DICT_UPDATE: '使用', DICTS_UPDATE_TOOLTIP: '使用另一個字典的項目更新目前字典。', DICT_POP_TOOLTIP: '刪除指定鍵並回傳對應值。',
        DICTS_SET_DEFAULT: '設定鍵', DICTS_SETDEFAULT_TOOLTIP: '鍵不存在時寫入預設值。', PRINT_MESSAGE: '列印輸出', EVERY: '每隔', MILLISECOND: '毫秒', AFTER: '後', CURRENT_TIME: '取得目前時間', TEXT_APPEND_TO: '向'
      },
      blocks: {
        MESSAGE: '訊息', RECEIVE: '當收到', ANY_MESSAGE: '任意訊息時', TOPIC_MESSAGE: '主題訊息時', PUBLISH_MESSAGE: '發佈主題訊息', GETREQ: 'GET 請求', POSTREQ: 'POST 請求', USEDATA: '使用資料', WAITREQ: '並等待回應', WAITJSONREQ: '並等待 JSON 回應',
        BUTTON_DOWN: '按鍵被按下時', BUTTON_UP: '按鍵/開關放開時', BUTTON_RECIEVE_MESSAGE: '開關收到訊息時', BUTTON_SWITCH: '切換', BUTTON_SWITCH_STATE: '開關的狀態', PIXEL_SWITCH: '切換', PIXEL_SWITCH_STATE: '點陣顯示器的像素',
        DRAG_SLIDER: '滑桿被拖曳時', SLIDER_RECIEVE_MESSAGE: '滑桿收到訊息時', SLIDER_NUM_IS: '滑桿數值為', SLIDER_NUM: '滑桿的數值', WHEN_TEXTINPUT_SEND: '文字輸入傳送訊息時', THROUGH: '透過', TEXTINPUT_SEND: '文字輸入傳送訊息',
        SELECT_SEND: '下拉選項傳送訊息並將選項改為', SELECT_SENT: '下拉選項傳送訊息時', JOYSTICK_DRAGGED: '搖桿被拖曳時', JOYSTICK_SENDXY: '搖桿傳送位置訊息', JOYSTICK_X: '搖桿的橫座標', JOYSTICK_Y: '搖桿的縱座標',
        RGB_COLOR_SELECTED: 'RGB 色盤選取顏色時', RGB_MESSAGE_RECIEVED: 'RGB 色盤收到訊息時', RGB_SEND: 'RGB 色盤傳送訊息', RGB_NOW_COLOR: 'RGB 色盤的目前顏色', BULB_RECIEVED_MESSAGE: '指示燈收到訊息時', TO: '向', SEND_MESSAGE: '指示燈傳送訊息', BULB_NOW_STATE: '指示燈的目前狀態',
        LED_RECIEVED_MESSAGE: '文字顯示器收到訊息時', TEXTLED_SEND_MESSAGE: '文字顯示器傳送訊息', TEXTLED_NOW: '文字顯示器的目前顯示', LINECHART_RECIEVED: '折線圖表收到訊息時', LINECHART_SEND_MESSAGE: '折線圖表傳送訊息', LET: '令', CLEAR_LINECHART: '清空折線圖表', LINECHART_ALL_MESSAGE: '折線圖表的全部歷史訊息', LINECHART_N_MESSAGE: '折線圖表最近的', LINECHART_MESSAGE: '則訊息', LINECHART_LATEST_MESSAGE: '折線圖表的最新訊息',
        TIMER_TRIGGERED: '計時觸發器觸發時', GET_TRIGGER_TIMES: '計時觸發器的觸發次數', TRIGGER_TRIGGERED: '條件觸發器觸發時', GET_TRIGGER_TRIGGERS: '條件觸發器的觸發次數', BLUETOOTH_TRIGGERED: '藍牙轉發器收到訊息時', GET_BLUETOOTH_STATUS: '藍牙轉發器連線的裝置', BLUETOOTH_SENT: '藍牙轉發器傳送訊息', CAMERA_SENT: '攝影機傳送訊息時', MIC_SENT: '語音辨識傳送訊息時',
        BARCHART_RECIEVED: '投票器收到訊息時', BARCHART_SEND_MESSAGE: '投票器傳送訊息', CLEAR_BARCHART: '清空投票器圖表', BARCHART_NOW_MESSAGE: '投票器的目前資料', DATASHEET_RECIEVED: '資料表格收到訊息時', DATASHEET_SEND_MESSAGE: '資料表格傳送訊息', CLEAR_DATASHEET: '清空資料表格', DATASHEET_ALL_MESSAGE: '資料表格的全部資料', DASHBOARD_RECIEVED: '儀表板收到訊息時', DASHBOARD_SEND_MESSAGE: '儀表板傳送訊息', DASHBOARD_NOW_MESSAGE: '儀表板的目前值',
        DATAMAP_RECIEVED: '資料地圖收到訊息時', DATAMAP: '資料地圖', DATAMAP_LONG: '經度', DATAMAP_LAT: '緯度', DATAMAP_SEND_MESSAGE: '傳送訊息清單', CLEAR_DATAMAP: '清空資料地圖', CLEAR_PIXEL: '清空點陣顯示器畫布', FACE_RECOGNIZED: '人臉辨識元件辨識到人臉時', BEEP_RECEIVED: '蜂鳴器發出聲音時', BEEP_SEND: '蜂鳴器發出聲音', QR_RECOGNIZED: 'QR Code 辨識元件辨識到 QR Code 時',
        WS_UPDATED: '氣象儀更新資料時', WS_SEND: '氣象儀傳送資料時', LET_WS_UPDATE: '氣象儀更新資料', LET_WS_SEND: '氣象儀下發資料', WS_PARA: '氣象儀的', WS_INFO: '資訊', MIXLY_MICROPYTHON_SOCKET_TO: '至', MIXLY_MICROBIT_JS_CURRENT: '當', MIXLY_MICROBIT_PY_STORAGE_GET: '取得', MIXLY_LENGTH: '的長度', MIXLY_CHANGE: '變更', MIXLY_MICROBIT_TYPE_DICT: '字典', MIXLY_MICROBIT_JS_DELETE_VAR: '刪除', MIXLY_MICROPYTHON_SOCKET_MAKE: '鍵', MIXLY_MID: '中的項目', blockpy_DICT_POP: '取出鍵', MIXLY_TODICT: '轉為字典', MIXLY_PYTHON_TOOLTIP_TODICT: '將值轉換為字典。',
        PARSE_INT: '轉為整數', PARSE_FLOAT: '轉為浮點數', GET_LONG: '取得目前經度', GET_LATI: '取得目前緯度', GET_KEYBOARD_INPUT: '文字輸入的文字', GET_SELECT_OPTIONS: '下拉選項的選項清單', JSON2TEXT: '字典轉文字', TEXT2JSON: '文字轉字典', USEAPIKEY: '使用百度 API Key', USESECRETKEY: '和 Secret Key', GETTOKEN: '取得 Access Token', TRANSORIGIN: '使用 Access Token', USETEXT: '將文字', USETEXT2: '使用文字', BOT: '與文心一言對話', TOLANG: '翻譯為', PARA1: '，參數：result'
      },
      toolbox: {
        '控制': '控制', '数学': '數學', '逻辑': '邏輯', '文本': '文字', '列表': '清單', '字典': '字典', '变量': '變數', '函数': '函式', 'MQTT消息': 'MQTT 訊息', '网络': '網路', '开关/按键': '開關/按鍵', '滑杆': '滑桿', '摇杆手柄': '搖桿手把', 'RGB色盘': 'RGB 色盤', '指示灯': '指示燈', '定时触发器': '計時觸發器', '条件触发器': '條件觸發器', '蓝牙转发器': '藍牙轉發器', '折线图表': '折線圖表', '投票器': '投票器', '数据表格': '資料表格', '数据地图': '資料地圖', '仪表盘': '儀表板', '实时气象仪': '即時氣象儀', '摄像头': '攝影機', '语音识别': '語音辨識', '下拉选项': '下拉選項', '文本输入': '文字輸入', '文本显示屏': '文字顯示器', '点阵屏': '點陣顯示器', '人脸识别': '人臉辨識', '蜂鸣器': '蜂鳴器', '二维码识别': 'QR Code 辨識'
      },
      options: {
        switchState: [['開', 'true'], ['關', 'false']], pixelState: [['亮', 'true'], ['滅', 'false']], trafficLight: [['關閉', '0'], ['綠燈', '1'], ['黃燈', '2'], ['紅燈', '3']], weather: [['天氣', '"weather_type"'], ['溫度', '"temperature"'], ['濕度', '"humidity"'], ['風向', '"wind_dir"'], ['風級', '"wind_class"'], ['區域資訊', '"district"']]
      }
    },
    en: {
      messages: {
        ALERT_MESSAGE: 'publish notification', DICTS_CREATE_EMPTY_TITLE: 'create empty dictionary', DICTS_CREATE_EMPTY_TOOLTIP: 'Returns an empty dictionary with no entries.', DICTS_CREATE_WITH_CONTAINER_TOOLTIP: 'Add, remove, or reorder dictionary entries.', DICTS_CREATE_WITH_INPUT_WITH: 'create dictionary with', DICTS_CREATE_WITH_ITEM_TITLE: 'entry', DICTS_CREATE_WITH_ITEM_TOOLTIP: 'Add an entry to the dictionary.', DICTS_CREATE_WITH_TOOLTIP: 'Create a dictionary with any number of entries.', DICTS_CREATE_WITH_ITEM_KEY: 'key', DICT_KEYS: 'get all keys', DICTS_KEYS_TOOLTIP: 'Returns a list containing all keys in the dictionary.', DICTS_GET_FROM_DICTS: 'from dictionary', DICTS_GET_IN: 'get key', DICTS_GET_TOOLTIP: 'Get the value for a key; an error occurs if the key does not exist.', DICTS_GET_DEFAULT_TOOLTIP: 'Get the value for a key, or return the default value if the key does not exist.', DICTS_ADD_in_DICT: 'in dictionary', DICTS_ADD: 'add or update key', DICTS_ADD_: 'add', DICTS_ADD_VALUE: 'value', DICTS_ADD_OR_CHANGE: 'add or update', DICTS_ADD_OR_CHANGE_TOOLTIP: 'Add a new dictionary entry or update an existing entry.', DICTS_ADD_TOOLTIP: 'Add an entry to the dictionary.', DICTS_DELETE_IN: 'delete key', DICTS_DELETE_VALUE: 'and its value', DICTS_DELETE_TOOLTIP: 'Delete an entry from the dictionary.', DICTS_DEFAULT_VALUE: 'default value', DICT_CLEAR: 'clear all entries', DICTS_CLEAR_TOOLTIP: 'Delete all entries from the dictionary.', DICT_ITEMS: 'dictionary entries as list', DICTS_ITEMS_TOOLTIP: 'Returns a list containing all dictionary keys and values.', DICT_VALUES: 'get all values', DICTS_VALUES_TOOLTIP: 'Returns a list containing all values in the dictionary.', DICT_LENGTH_TOOLTIP: 'Returns the number of keys in the dictionary.', DICTS_LENGTH_TOOLTIP: 'Returns the number of keys in the dictionary.', DICT_DELDICT: 'delete dictionary', DICTS_DEL_TOOLTIP: 'Delete the entire dictionary.', MAKE_DICT: 'update dictionary', DICT_UPDATE: 'using', DICTS_UPDATE_TOOLTIP: 'Update this dictionary with entries from another dictionary.', DICT_POP_TOOLTIP: 'Delete a key and return its value.', DICTS_SET_DEFAULT: 'set key', DICTS_SETDEFAULT_TOOLTIP: 'Write the default value if the key does not exist.', PRINT_MESSAGE: 'print output', EVERY: 'every', MILLISECOND: 'milliseconds', AFTER: 'after', CURRENT_TIME: 'get current time', TEXT_APPEND_TO: 'to'
      },
      blocks: {
        MESSAGE: 'message', RECEIVE: 'when receiving', ANY_MESSAGE: 'any message', TOPIC_MESSAGE: 'topic message', PUBLISH_MESSAGE: 'publish topic message', GETREQ: 'GET request', POSTREQ: 'POST request', USEDATA: 'with data', WAITREQ: 'and wait for response', WAITJSONREQ: 'and wait for JSON response', BUTTON_DOWN: 'when button is pressed', BUTTON_UP: 'when button/switch is released', BUTTON_RECIEVE_MESSAGE: 'when switch receives a message', BUTTON_SWITCH: 'switch', BUTTON_SWITCH_STATE: 'switch state', PIXEL_SWITCH: 'set', PIXEL_SWITCH_STATE: 'matrix pixel', DRAG_SLIDER: 'when slider is dragged', SLIDER_RECIEVE_MESSAGE: 'when slider receives a message', SLIDER_NUM_IS: 'set slider value to', SLIDER_NUM: 'slider value', WHEN_TEXTINPUT_SEND: 'when text input sends a message', THROUGH: 'through', TEXTINPUT_SEND: 'text input sends message', SELECT_SEND: 'dropdown sends a message and changes option to', SELECT_SENT: 'when dropdown sends a message', JOYSTICK_DRAGGED: 'when joystick is dragged', JOYSTICK_SENDXY: 'joystick sends position message', JOYSTICK_X: 'joystick X coordinate', JOYSTICK_Y: 'joystick Y coordinate', RGB_COLOR_SELECTED: 'when RGB picker selects a color', RGB_MESSAGE_RECIEVED: 'when RGB picker receives a message', RGB_SEND: 'RGB picker sends a message', RGB_NOW_COLOR: 'current RGB picker color', BULB_RECIEVED_MESSAGE: 'when indicator receives a message', TO: 'to', SEND_MESSAGE: 'indicator sends a message', BULB_NOW_STATE: 'current indicator state', LED_RECIEVED_MESSAGE: 'when text display receives a message', TEXTLED_SEND_MESSAGE: 'text display sends a message', TEXTLED_NOW: 'current text display content', LINECHART_RECIEVED: 'when line chart receives a message', LINECHART_SEND_MESSAGE: 'line chart sends a message', LET: 'set', CLEAR_LINECHART: 'clear line chart', LINECHART_ALL_MESSAGE: 'all line chart history', LINECHART_N_MESSAGE: 'latest', LINECHART_MESSAGE: 'line chart messages', LINECHART_LATEST_MESSAGE: 'latest line chart message', TIMER_TRIGGERED: 'when timer trigger fires', GET_TRIGGER_TIMES: 'timer trigger count', TRIGGER_TRIGGERED: 'when conditional trigger fires', GET_TRIGGER_TRIGGERS: 'conditional trigger count', BLUETOOTH_TRIGGERED: 'when Bluetooth relay receives a message', GET_BLUETOOTH_STATUS: 'device connected to Bluetooth relay', BLUETOOTH_SENT: 'Bluetooth relay sends a message', CAMERA_SENT: 'when camera sends a message', MIC_SENT: 'when speech recognition sends a message', BARCHART_RECIEVED: 'when poll receives a message', BARCHART_SEND_MESSAGE: 'poll sends a message', CLEAR_BARCHART: 'clear poll chart', BARCHART_NOW_MESSAGE: 'current poll data', DATASHEET_RECIEVED: 'when data table receives a message', DATASHEET_SEND_MESSAGE: 'data table sends a message', CLEAR_DATASHEET: 'clear data table', DATASHEET_ALL_MESSAGE: 'all data table data', DASHBOARD_RECIEVED: 'when gauge receives a message', DASHBOARD_SEND_MESSAGE: 'gauge sends a message', DASHBOARD_NOW_MESSAGE: 'current gauge value', DATAMAP_RECIEVED: 'when data map receives a message', DATAMAP: 'data map', DATAMAP_LONG: 'longitude', DATAMAP_LAT: 'latitude', DATAMAP_SEND_MESSAGE: 'send message list', CLEAR_DATAMAP: 'clear data map', CLEAR_PIXEL: 'clear LED matrix canvas', FACE_RECOGNIZED: 'when face recognition detects a face', BEEP_RECEIVED: 'when buzzer sounds', BEEP_SEND: 'sound buzzer', QR_RECOGNIZED: 'when QR recognition detects a QR code', WS_UPDATED: 'when weather station updates data', WS_SEND: 'when weather station sends data', LET_WS_UPDATE: 'update weather station data', LET_WS_SEND: 'send weather station data', WS_PARA: 'weather station', WS_INFO: 'information', MIXLY_MICROPYTHON_SOCKET_TO: 'to', MIXLY_MICROBIT_JS_CURRENT: 'when', MIXLY_MICROBIT_PY_STORAGE_GET: 'get', MIXLY_LENGTH: 'length', MIXLY_CHANGE: 'change', MIXLY_MICROBIT_TYPE_DICT: 'dictionary', MIXLY_MICROBIT_JS_DELETE_VAR: 'delete', MIXLY_MICROPYTHON_SOCKET_MAKE: 'key', MIXLY_MID: 'entries', blockpy_DICT_POP: 'pop key', MIXLY_TODICT: 'to dictionary', MIXLY_PYTHON_TOOLTIP_TODICT: 'Convert a value to a dictionary.', PARSE_INT: 'parse integer', PARSE_FLOAT: 'parse decimal', GET_LONG: 'get current longitude', GET_LATI: 'get current latitude', GET_KEYBOARD_INPUT: 'text input value', GET_SELECT_OPTIONS: 'dropdown option list', JSON2TEXT: 'dictionary to text', TEXT2JSON: 'text to dictionary', USEAPIKEY: 'use Baidu API Key', USESECRETKEY: 'and Secret Key', GETTOKEN: 'get Access Token', TRANSORIGIN: 'use Access Token', USETEXT: 'text', USETEXT2: 'use text', BOT: 'chat with ERNIE Bot', TOLANG: 'translate to', PARA1: ', parameter: result'
      },
      toolbox: {
        '控制': 'Control', '数学': 'Math', '逻辑': 'Logic', '文本': 'Text', '列表': 'Lists', '字典': 'Dictionaries', '变量': 'Variables', '函数': 'Functions', 'MQTT消息': 'MQTT Messages', '网络': 'Network', '开关/按键': 'Switches / Buttons', '滑杆': 'Slider', '摇杆手柄': 'Joystick', 'RGB色盘': 'RGB Color Picker', '指示灯': 'Indicator', '定时触发器': 'Timer Trigger', '条件触发器': 'Conditional Trigger', '蓝牙转发器': 'Bluetooth Relay', '折线图表': 'Line Chart', '投票器': 'Poll', '数据表格': 'Data Table', '数据地图': 'Data Map', '仪表盘': 'Gauge', '实时气象仪': 'Live Weather', '摄像头': 'Camera', '语音识别': 'Speech Recognition', '下拉选项': 'Dropdown', '文本输入': 'Text Input', '文本显示屏': 'Text Display', '点阵屏': 'LED Matrix', '人脸识别': 'Face Recognition', '蜂鸣器': 'Buzzer', '二维码识别': 'QR Recognition'
      },
      options: {
        switchState: [['On', 'true'], ['Off', 'false']], pixelState: [['On', 'true'], ['Off', 'false']], trafficLight: [['Off', '0'], ['Green', '1'], ['Yellow', '2'], ['Red', '3']], weather: [['Weather', '"weather_type"'], ['Temperature', '"temperature"'], ['Humidity', '"humidity"'], ['Wind direction', '"wind_dir"'], ['Wind scale', '"wind_class"'], ['Area', '"district"']]
      }
    }
  };

  var currentLanguage = 'en';

  function normalize(language) {
    var code = String(language || '').replace('_', '-').toLowerCase();
    if (code === 'tw' || code === 'zh-tw' || code === 'zh-hk' || code === 'zh-mo' || code === 'zh-hant') return 'tw';
    if (code === 'zh' || code === 'zh-cn' || code === 'zh-sg' || code === 'zh-hans') return 'zh';
    return 'en';
  }

  function apply(language) {
    if (!global.Blockly || !global.Blockly.Msg) throw new Error('Blockly must be loaded before its locale.');
    currentLanguage = normalize(language);
    var locale = locales[currentLanguage];
    Object.keys(locale.messages).forEach(function (key) { global.Blockly.Msg[key] = locale.messages[key]; });
    Object.keys(locale.blocks).forEach(function (key) { global.Blockly[key] = locale.blocks[key]; });
    return currentLanguage;
  }

  function options(key) {
    var values = locales[currentLanguage].options[key];
    return values ? values.map(function (item) { return item.slice(); }) : [];
  }

  function translateToolbox(toolbox) {
    if (!toolbox || !toolbox.querySelectorAll) return;
    var translations = locales[currentLanguage].toolbox;
    Array.prototype.forEach.call(toolbox.querySelectorAll('category[name]'), function (category) {
      var sourceName = category.getAttribute('data-blockly-source-name') || category.getAttribute('name');
      category.setAttribute('data-blockly-source-name', sourceName);
      if (translations[sourceName]) category.setAttribute('name', translations[sourceName]);
    });
  }

  global.BlocklyI18n = {
    locales: locales,
    normalize: normalize,
    apply: apply,
    options: options,
    translateToolbox: translateToolbox,
    getCurrentLanguage: function () { return currentLanguage; }
  };
})(typeof window !== 'undefined' ? window : this);
