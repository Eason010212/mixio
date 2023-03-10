var JSLang = {
    "zh": {
        "syncInterval": "自动更新频率",
        "sendInterval": "自动发送频率",
        "never": "从不",
        "i1min": "每分钟一次",
        "i3min": "每3分钟一次",
        "i5min": "每5分钟一次",
        "i10min": "每10分钟一次",
        "i15min": "每15分钟一次",
        "i30min": "每30分钟一次",
        "i60min": "每60分钟一次",
        "dstTopicLenIllegal": "动作主题不能为空",
        "dstMessageLenIllegal": "动作消息不能为空",
        "conditionLenIllegal": "条件值不能为空",
        "srcTopic": "条件主题",
        "condition": "触发条件",
        "conditionRelation": "条件关系",
        "dstTopic": "动作主题",
        "dstMessage": "动作消息",
        "invalidContent": "数据内容无效",
        "backRun": "后台运行数据视图和逻辑视图",
        "stopBackRun": "停止后台运行",
        "backRunErr": "后台运行过程中发生错误",
        "editProper": "修改项目属性",
        "viewProject": "查看和编辑项目内容",
        "illegalCycle": "逻辑视图中存在循环方法，不允许后台运行",
        "codeException": "代码内部存在错误",
        "loading": "加载中",
        "loading2": "更改中",
        "wrongAcc": "用户名或密码错误",
        "noKey": "请输入Mixly Key",
        "noVfcode": "请输入项目授权码",
        "modify": "更改项目",
        "rename": "更改名称",
        "copy": "复制项目",
        "share": "共享项目",
        "delete": "删除项目",
        "renamePrj": "更改项目名称",
        "newPrjName": "请输入新项目名称",
        "lengthRes": "项目名称长度应为3-10个字符",
        "prjExist": "项目名称已存在",
        "copyName": "项目副本名称",
        "prjOverflow": "您管理的项目数量已达到上限",
        "shareConfirm": "确认为您当前的项目布局生成一个授权码？他人获得该授权码后，将可以访问或复制您的当前项目。",
        "shareSuccess": "共享成功",
        "aucode": "项目授权码",
        "guestURL": "访客访问链接",
        "logicError": "逻辑视图发生错误，请前往修改。",
        "prjManage": "项目管理",
        "blocklyDev": "图形化编程模式正在开发中，敬请期待！",
        "hardwarePass": "连接配置",
        "connected": "已连接至通讯服务器",
        "connectCount": "个设备已连接",
        "connecting": "正在连接通讯服务器",
        "disconnected": "连接已断开",
        "pauseBeforeModify": "若要修改逻辑代码，请先暂停项目。",
        "console": "输出",
        "downloading": "正在下载项目数据",
        "prj404": "项目不存在！",
        "slow": "检测到渲染卡顿",
        "remindClear": "，可能是由于数据视图中的数据过多，请您及时清除无用数据。",
        "duringOff": "离线期间，项目共收到",
        "messageRem": "条消息。<br>这些消息将被存储在“数据”视图中。",
        "topic": "主题",
        "message": "消息",
        "time": "时间",
        "listener": "监听主题：",
        "select": "请选择",
        "monitor": "数据监视表",
        "download": "下载数据",
        "clear": "清空数据",
        "rtchart": "可视化窗格",
        "sender": "发送主题：",
        "value": "值",
        "noData": "暂无数据",
        "sendString": "发送文本数据",
        "topicUnset": "请设置发送主题。",
        "sendJSON": "发送JSON数据",
        "key": "键",
        "JSONempty": "JSON消息必须至少包含一个键值",
        "addKey": "添加一个键值",
        "invalidJSON": "发送内容无效",
        "control": "- 控制 -",
        "switch": "开关",
        "button": "按键",
        "slider": "滑杆",
        "joystick": "摇杆手柄",
        "RGB": "RGB色盘",
        "bulb": "指示灯",
        "timer": "定时触发器",
        "trigger": "条件触发器",
        "data": "- 数据 -",
        "lineChart": "折线图表",
        "barChart": "柱状图表",
        "dataTable": "数据表格",
        "dataMap": "数据地图",
        "dashboard": "仪表盘",
        "weather": "实时气象仪",
        "text": "- 媒体 -",
        "keyboard": "文本输入",
        "screen": "文本显示屏",
        "decorate": "- 装饰 -",
        "label": "标签",
        "picture": "图片",
        "unitName": "组件名称",
        "messTopic": "消息主题",
        "triggerTopic": "触发消息主题",
        "triggerMessage": "触发消息内容",
        "triggerInterval": "触发间隔(毫秒)",
        "triggerTimes": "次数上限(0=无限)",
        "feedbackMode": "反馈模式",
        "sameUnit": "当前项目中已存在一个同名组件，请重新命名。",
        "nameLenIllegal": "组件名称非法（长度应为1-10个字符）",
        "topicLenIllegal": "消息主题非法（长度应为1-10个字符）",
        "messageLenIllegal": "消息内容不能为空",
        "illegalInterval": "最小触发间隔为500毫秒",
        "illegalTimes": "触发次数应为非负整数",
        "invalidSlideRange": "滑动数值设置有误",
        "slideRange": "滑动范围",
        "min": "最小值",
        "max": "最大值",
        "step": "步长",
        "choicesList": "选项列表",
        "recvMode": "接收模式",
        "single": "单选",
        "multiple": "多选",
        "listEmpty": "选项列表不能为空",
        "location": "采集位置",
        "province": "请选择省级区划",
        "city": "请选择市县",
        "district": "请选择区域",
        "locationSet": "请设置天气数据采集地域",
        "columns": "列名",
        "columnsSet": "请设置列名",
        "displayRange": "指示范围",
        "mod5": "取值范围的极差必须为5的正整数倍。",
        "displayText": "显示文本",
        "imageURL": "图片链接",
        "saveSuccess": "项目保存成功",
        "saveFail": "项目保存失败 ",
        "info": "提示信息",
        "confirmDel": "确定删除项目",
        "confirm": "确定",
        "deleting": "删除中...",
        "error": "错误信息",
        "deleteFail": "删除失败",
        "cancel": "取消",
        "createPrj": "创建一个项目",
        "createPrjName": "请输入新项目名称",
        "import": "导入一个项目",
        "importData": "导入用户数据",
        "importDataWarning": "同名项目将被覆盖，请谨慎操作",
        "inputAuCode": "请输入项目授权码",
        "invalidAU": "项目授权码无效（或已失效）",
        "incorrectAU": "项目授权码格式不正确",
        "speedLimit": "发送数据频率过高，已进行限制。",
        "diffRepeat": "两次输入的密码不一致",
        "userEmpty": "用户名不能为空",
        "passEmpty": "密码不能为空",
        "userExist": "用户名已存在",
        "emailEmpty": "请输入电子邮件地址",
        "querying": "查询中...",
        "queryS": "查询成功",
        "queryF": "查询失败",
        "queryN": "用户不存在",
        "answerEmpty": "答案不能为空！",
        "resetSuccess": "密码重置成功",
        "wrongAns": "答案错误",
        "shareAt": "分享于",
        "invalidAUPrj": "授权项目不存在或已失效。",
        "clearData": "清除数据",
        "confirmClear": "确认清除",
        'prjs': "项目中的",
        'clearAsk': "条离线存储数据吗？",
        "clearS": "清除成功",
        "settingP": "设置中...",
        "settingS": "设置成功",
        "settingF": "设置失败",
        "option": "选项",
        "noData": "暂无数据",
        "updating": "更新中...",
        "updateF": "更新失败",
        "mapJSON": "一个地图组件收到了无效的JSON消息。",
        "invalidUType": "不正确的组件类别。",
        "noUnitFound": "未找到组件。",
        "platformList": "已登录平台",
        "deviceList": "已连接设备"
    },
    "tw": {
        "syncInterval": "自動更新頻率",
        "sendInterval": "自動發送頻率",
        "never": "從不",
        "i1min": "每分鐘一次",
        "i3min": "每3分鐘一次",
        "i5min": "每5分鐘一次",
        "i10min": "每10分鐘一次",
        "i15min": "每15分鐘一次",
        "i30min": "每30分鐘一次",
        "i60min": "每60分鐘一次",
        "dstTopicLenIllegal": "動作主題不能為空",
        "dstMessageLenIllegal": "動作消息不能為空",
        "conditionLenIllegal": "條件值不能為空",
        "srcTopic": "條件主題",
        "condition": "觸發條件",
        "conditionRelation": "條件關係",
        "dstTopic": "動作主題",
        "dstMessage": "動作消息",
        "invalidContent": "數據內容無效",
        "backRun": "後台運行數據視圖和邏輯視圖",
        "stopBackRun": "停止後台運行",
        "backRunErr": "後台運行過程中發生錯誤",
        "editProper": "修改項目屬性",
        "viewProject": "查看和編輯項目內容",
        "illegalCycle": "邏輯視圖中存在迴圈方法，不允許後台運行",
        "codeException": "代碼內部存在錯誤",
        "loading": "加載中",
        "loading2": "更改中",
        "wrongAcc": "用戶名或密碼錯誤",
        "noKey": "請輸入Mixly Key",
        "noVfcode": "請輸入項目授權碼",
        "modify": "更改項目",
        "rename": "更改名稱",
        "copy": "復製項目",
        "share": "共享項目",
        "delete": "刪除項目",
        "renamePrj": "更改項目名稱",
        "newPrjName": "請輸入新項目名稱",
        "lengthRes": "項目名稱長度應為3-10個字符",
        "prjExist": "項目名稱已存在",
        "copyName": "項目副本名稱",
        "prjOverflow": "您管理的項目數量已達到上限",
        "shareConfirm": "確認為您當前的項目布局生成一個授權碼？他人獲得該授權碼後，將可以訪問或復製您的當前項目。",
        "shareSuccess": "共享成功",
        "aucode": "項目授權碼",
        "guestURL": "訪客訪問鏈接",
        "logicError": "邏輯視圖發生錯誤，請前往修改。",
        "prjManage": "項目管理",
        "blocklyDev": "圖形化編程模式正在開發中，敬請期待！",
        "hardwarePass": "連接配置",
        "connected": "已連接至通訊服務器",
        "connectCount": "個設備已連接",
        "connecting": "正在連接通訊服務器",
        "disconnected": "連接已斷開",
        "pauseBeforeModify": "若要修改邏輯代碼，請先暫停項目。",
        "console": "輸出",
        "downloading": "正在下載項目數據",
        "prj404": "項目不存在！",
        "slow": "檢測到渲染卡頓",
        "remindClear": "，可能是由於數據視圖中的數據過多，請您及時清除無用數據。",
        "duringOff": "離線期間，項目共收到",
        "messageRem": "條消息。<br>這些消息將被存儲在「數據」視圖中。",
        "topic": "主題",
        "message": "消息",
        "triggerTopic": "觸發消息主題",
        "triggerMessage": "觸發消息內容",
        "triggerInterval": "觸發間隔(毫秒)",
        "triggerTimes": "次数上限(0=无限)",
        "time": "時間",
        "listener": "監聽主題：",
        "select": "請選擇",
        "monitor": "數據監視表",
        "download": "下載數據",
        "clear": "清空數據",
        "rtchart": "可視化窗格",
        "sender": "發送主題：",
        "value": "值",
        "noData": "暫無數據",
        "sendString": "發送文本數據",
        "topicUnset": "請設置發送主題。",
        "sendJSON": "發送JSON數據",
        "key": "鍵",
        "JSONempty": "JSON消息必須至少包含一個鍵值",
        "addKey": "添加一個鍵值",
        "invalidJSON": "發送內容無效",
        "control": "- 控製 -",
        "switch": "開關",
        "button": "按鍵",
        "slider": "滑桿",
        "joystick": "搖桿手柄",
        "RGB": "RGB色盤",
        "bulb": "指示燈",
        "timer": "定時觸發器",
        "trigger": "條件觸發器",
        "data": "- 數據 -",
        "lineChart": "折線圖表",
        "barChart": "柱狀圖表",
        "dataTable": "數據表格",
        "dataMap": "數據地圖",
        "dashboard": "儀表盤",
        "weather": "實時氣象儀",
        "text": "- 媒體 -",
        "keyboard": "文本輸入",
        "screen": "文本顯示屏",
        "decorate": "- 裝飾 -",
        "label": "標簽",
        "picture": "圖片",
        "unitName": "組件名稱",
        "messTopic": "消息主題",
        "feedbackMode": "反饋模式",
        "sameUnit": "當前項目中已存在一個同名組件，請重新命名。",
        "nameLenIllegal": "組件名稱非法（長度應為1-10個字符）",
        "topicLenIllegal": "消息主題非法（長度應為1-10個字符）",
        "illegalInterval": "最小觸髮間隔為500毫秒",
        "illegalTimes": "觸發次數應為非負整數",
        "messageLenIllegal": "消息內容不能為空",
        "invalidSlideRange": "滑動數值設置有誤",
        "slideRange": "滑動範圍",
        "min": "最小值",
        "max": "最大值",
        "step": "步長",
        "choicesList": "選項列表",
        "recvMode": "接收模式",
        "single": "單選",
        "multiple": "多選",
        "listEmpty": "選項列表不能為空",
        "location": "采集位置",
        "province": "請選擇省級區劃",
        "city": "請選擇市縣",
        "district": "請選擇區域",
        "locationSet": "請設置天氣數據采集地域",
        "columns": "列名",
        "columnsSet": "請設置列名",
        "displayRange": "指示範圍",
        "mod5": "取值範圍的極差必須為5的正整數倍。",
        "displayText": "顯示文本",
        "imageURL": "圖片鏈接",
        "saveSuccess": "項目保存成功",
        "saveFail": "項目保存失敗 ",
        "info": "提示信息",
        "confirmDel": "確定刪除項目",
        "confirm": "確定",
        "deleting": "刪除中...",
        "error": "錯誤信息",
        "deleteFail": "刪除失敗",
        "cancel": "取消",
        "createPrj": "創建一個項目",
        "createPrjName": "請輸入新項目名稱",
        "import": "導入一個項目",
        "importData": "匯入用戶數據",
        "importDataWarning": "同名項目將被覆蓋，請謹慎操作",
        "inputAuCode": "請輸入項目授權碼",
        "invalidAU": "項目授權碼無效（或已失效）",
        "incorrectAU": "項目授權碼格式不正確",
        "speedLimit": "發送數據頻率過高，已進行限製。",
        "diffRepeat": "兩次輸入的密碼不一致",
        "userEmpty": "用戶名不能為空",
        "passEmpty": "密碼不能為空",
        "userExist": "用戶名已存在",
        "emailEmpty": "請輸入電子郵件地址",
        "querying": "查詢中...",
        "queryS": "查詢成功",
        "queryF": "查詢失敗",
        "queryN": "用戶不存在",
        "answerEmpty": "答案不能為空！",
        "resetSuccess": "密碼重置成功",
        "wrongAns": "答案錯誤",
        "shareAt": "分享於",
        "invalidAUPrj": "授權項目不存在或已失效。",
        "clearData": "清除數據",
        "confirmClear": "確認清除",
        'prjs': "項目中的",
        'clearAsk': "條離線存儲數據嗎？",
        "clearS": "清除成功",
        "settingP": "設置中...",
        "settingS": "設置成功",
        "settingF": "設置失敗",
        "option": "選項",
        "noData": "暫無數據",
        "updating": "更新中...",
        "updateF": "更新失敗",
        "mapJSON": "一個地圖組件收到了無效的JSON消息。",
        "invalidUType": "不正確的組件類別。",
        "noUnitFound": "未找到組件。",
        "platformList": "已登錄平台",
        "deviceList": "已連接設備"
    },
    "en": {
        "syncInterval": "Auto-sync",
        "sendInterval": "Auto-send",
        "never": "Never",
        "i1min": "1 time / min",
        "i3min": "3 times / min",
        "i5min": "5 times / min",
        "i10min": "10 times / min",
        "i15min": "15 times / min",
        "i30min": "30 times / min",
        "i60min": "60 times / min",
        "dstTopicLenIllegal": "Trigger topic can not be empty",
        "dstMessageLenIllegal": "Trigger Message can not be empty",
        "conditionLenIllegal": "Condition can not be empty",
        "srcTopic": "Condition Topic",
        "condition": "Condition",
        "conditionRelation": "Condition Relationship",
        "dstTopic": "Trigger Topic",
        "dstMessage": "Trigger Message",
        "invalidContent": "invalid content",
        "backRun": "Run data view & logic view in the background",
        "stopBackRun": "Stop running this project in the background",
        "backRunErr": "An error occured",
        "editProper": "Modify properties",
        "viewProject": "View & edit project",
        "illegalCycle": "Loop method detected in the logic view. It is not allowed to run in the background",
        "codeException": "An exception occured in your code",
        "loading": "Loading",
        "loading2": "Processing",
        "wrongAcc": "Wrong email adress or password",
        "noKey": "Mixly Key can not be empty",
        "noVfCode": "Project Verification Code can not be empty",
        "modify": "Modify ",
        "rename": "Rename",
        "copy": "Copy",
        "share": "Share",
        "delete": "Delete",
        "renamePrj": "Rename project",
        "triggerTopic": "Trigger topic",
        "triggerMessage": "Trigger content",
        "triggerInterval": "Trigger Interval (ms)",
        "triggerTimes": "Times Limit (0-Unlimited)",
        "newPrjName": "New name",
        "lengthRes": "The length of the project name should be between 3 and 10 characters",
        "prjExist": "A project with the same name already exists",
        "copyName": "Copy name",
        "prjOverflow": "The number of projects you managed has reached the maximum",
        "shareConfirm": "Are you sure to generate an authorization code for your current project layout? After others obtain the authorization code, they can access and copy your current project.",
        "shareSuccess": "Success",
        "aucode": "Authorization Code",
        "guestURL": "URL for guests",
        "logicError": "An error occurred in the logical view, please modify it.",
        "prjManage": "Project",
        "blocklyDev": "Blockly mode is under development.",
        "hardwarePass": "Connection Setting",
        "connected": "Connected to server",
        "connectCount": " device(s) connected",
        "connecting": "Connecting server...",
        "disconnected": "Disconnected",
        "pauseBeforeModify": "To modify the code, pause the project first.",
        "console": "console",
        "downloading": "downloading data...",
        "prj404": "This project does not exist!",
        "slow": "Render jam detected",
        "remindClear": ", it may be caused by too much data in the data view. Please clear the useless data in time.",
        "duringOff": "During offline, the project received ",
        "messageRem": " messages.<br>These messages have been saved in the data view.",
        "topic": "topic",
        "message": "message",
        "time": "time",
        "listener": "Listen Topic: ",
        "select": "Please selet",
        "monitor": "Data Monitor",
        "download": "Download Data",
        "clear": "Clear Data",
        "rtchart": "Real-time Chart",
        "sender": "Send Topic: ",
        "value": "value",
        "noData": "No Data",
        "sendString": "Send Text",
        "topicUnset": "Topic can not be empty.",
        "sendJSON": "Send JSON",
        "key": "key",
        "JSONempty": "1 key at least",
        "addKey": "Add Key",
        "invalidJSON": "invalid JSON",
        "control": "- Control -",
        "switch": "Switch",
        "button": "Button",
        "slider": "Slider",
        "joystick": "Joystick",
        "RGB": "RGB Picker",
        "bulb": "Bulb",
        "timer": "Timing triggers",
        "trigger": "Condition triggers",
        "data": "- Data -",
        "lineChart": "Line Chart",
        "barChart": "Bar Chart",
        "dataTable": "Data Table",
        "dataMap": "Map",
        "dashboard": "Dashboard",
        "weather": "Weather",
        "text": "- Media -",
        "keyboard": "Input",
        "screen": "Text Screen",
        "decorate": "- Decoration -",
        "label": "Label",
        "picture": "Image",
        "unitName": "Unit Name",
        "messTopic": "Message Topic",
        "feedbackMode": "Mode",
        "sameUnit": "A unit having the same name already exists.",
        "nameLenIllegal": "The length of the unit name should be between 1 and 10 characters.",
        "topicLenIllegal": "The length of the topic name should be between 1 and 10 characters.",
        "messageLenIllegal": "Message content can not be empty",
        "illegalInterval": "Interval illegal (should be more than 500 ms)",
        "illegalTimes": "Times illegal (should be an non-negative integer)",
        "invalidSlideRange": "Invalid slide range.",
        "slideRange": "Slide Range",
        "min": "min",
        "max": "max",
        "step": "step",
        "choicesList": "Choices List",
        "recvMode": "Mode",
        "single": "Single",
        "multiple": "Multiple",
        "listEmpty": "Choices list can not be empty",
        "location": "Location",
        "province": "Province",
        "city": "City",
        "district": "District",
        "locationSet": "Please select a location",
        "columns": "Columns",
        "columnsSet": "Please set at least 1 column",
        "displayRange": "Display Range",
        "mod5": "The range of values must be a positive integer multiple of 5.",
        "displayText": "Display Text",
        "imageURL": "Image URL",
        "saveSuccess": "Saved Successfully",
        "saveFail": "Save Fail ",
        "info": "Warning",
        "confirmDel": "Confirm to delete project ",
        "confirm": "Confirm",
        "deleting": "Deleting...",
        "error": "Error",
        "deleteFail": "Delete Fail",
        "cancel": "Cancel",
        "createPrj": "New Project",
        "createPrjName": "Project Name",
        "import": "Import Project",
        "importData": "Import User Data",
        "importDataWarning": "Projects with the same name will be overwritten, so proceed with caution",
        "inputAuCode": "Authorization Code",
        "invalidAU": "Invalid Authorization Code",
        "incorrectAU": "Incorrect Authorization Code",
        "speedLimit": "The frequency of sending data is too high and has been limited.",
        "diffRepeat": "Passwords entered twice are inconsistent",
        "userEmpty": "E-mail Address can not be empty",
        "passEmpty": "Password can not be empty",
        "userExist": "The E-mail Address has already been used",
        "emailEmpty": "E-mail Address can not be empty",
        "querying": "Querying...",
        "queryS": "Successfully Queried",
        "queryF": "Query Fail",
        "queryN": "User does not exist",
        "answerEmpty": "Answer can not be empty!",
        "resetSuccess": "Successfully Reseted",
        "wrongAns": "Wrong Answer",
        "shareAt": " shared at ",
        "invalidAUPrj": "Invalid Authorization Code",
        "clearData": "Clear Data",
        "confirmClear": "Confirm to clear ",
        'prjs': ": ",
        'clearAsk': " reserved offline messages?",
        "clearS": "Clear Success",
        "settingP": "Setting...",
        "settingS": "Success",
        "settingF": "Failed",
        "option": "option",
        "noData": "No Data",
        "updating": "Updating...",
        "updateF": "Update Failed",
        "mapJSON": "A map unit received an invalid JSON message.",
        "invalidUType": "Invalid unit type.",
        "noUnitFound": "The unit does not exist",
        "platformList": "Platforms",
        "deviceList": "Devices"
    }
}

var arrLang = {
    "en": {
        "OPENSRC": "Open Repo",
        "ADMINDASH": "Admin Dashboard",
        "TOPIC": "Topic",
        "MESSAGE": "Message",
        "TIME": "Time",
        "DATAMANAGE": "Data",
        "ADMIN": "Admin",
        "BASICADMIN": "Basic",
        "USERADMIN": "Users",
        "DATAADMIN": "Data",
        "UPEMAIL": "E-mail: ",
        "EMAIL": "placeholder$E-mail Address",
        "PASSWORD": "placeholder$Password",
        "LOGIN": "Sign in",
        "MIXLYKEY": "placeholder$Mixly Key",
        "LOGIN2": "Sign in",
        "VFCODE": "placeholder$Project Verification Code",
        "BROWSE": "Browse",
        "RESET": "Reset Password",
        "SIGNUP": "Sign Up",
        "GUIDE": "Quick Guide",
        "ANDROID": "App",
        "MANAGE": "Manage",
        "PROJECTSMANAGE": "Projects",
        "STORAGEMANAGE": "Storage",
        "SHAREMANAGE": "Share",
        "SETTINGS": "Settings",
        "LOGOUT": "Log out",
        "IMPORT": "Import user projects",
        "EXPORT": "Export user projects",
        "CONNECTINGSERVER": "Connecting server...",
        "MANAGECOUNT": "Projects Managed",
        "OFFLINECOUNT": "Temporary Messages Reserved",
        "MOREINFO": "Go to 'Storage' for more info ",
        "PREV": "Prev",
        "NEXT": "Next",
        "DATA": "Data",
        "PROJ": "Units",
        "LOGIC": "Logic",
        "REGACC": "Sign Up",
        "RPTPASS": "placeholder$Repeat Password",
        "RSTPASS": "Reset password",
        "HAVEACC": "Have an account? Click to sign in",
        "SRCPRJNAME": "Source Project",
        "SHARETIME": "Share Time",
        "AUCODE": "Authorization Code",
        "STATUSNOW": "Status",
        "USEDTIME": "Used Times",
        "OPTIONS": "Options",
        "ONSHARE": "Sharing",
        "OFFSHARE": "Paused",
        "VERIFYQ": "Reset Password",
        "VERIFYDES": "We need to verify your security question to confirm your identity.",
        "ANSWERQ": "Answer Question",
        "REGEMAIL": "placeholder$Email address used when registering",
        "ANSWERVQ": "Please answer the preset security question and set a new password.",
        "ANSWERINPUT": "placeholder$Answer",
        "NEWPASS": "placeholder$New Password",
        "NEWPASSRPT": "placeholder$Repeat New Password",
        "PRJNAME": "Project Name",
        "SETQ": "Set Security Verification Question",
        "SETQDES": "Please set the security verification question and its answer as the credential to retrieve the password when necessary.",
        "CHANGEQ": "Change Question",
        "SETANS": "placeholder$Answer",
        "CFMSET": "Confirm"
    },
    "zh": {
        "OPENSRC": "开源仓库",
        "ADMINDASH": "管理后台",
        "TOPIC": "主题",
        "MESSAGE": "消息",
        "TIME": "时间",
        "DATAMANAGE": "数据管理",
        "ADMIN": "管理",
        "BASICADMIN": "基础设置",
        "USERADMIN": "批量注册",
        "DATAADMIN": "数据管理",
        "UPEMAIL": "注册邮箱：",
        "EMAIL": "placeholder$请输入电子邮箱地址",
        "PASSWORD": "placeholder$请输入密码",
        "LOGIN": "登录MixIO",
        "MIXLYKEY": "placeholder$请输入Mixly Key",
        "LOGIN2": "登录MixIO",
        "VFCODE": "placeholder$请输入项目授权码",
        "BROWSE": "访问MixIO项目",
        "RESET": "重置密码",
        "SIGNUP": "注册账号",
        "GUIDE": "入门指南",
        "ANDROID": "安卓微端",
        "MANAGE": "管理",
        "PROJECTSMANAGE": "项目管理",
        "STORAGEMANAGE": "数据管理",
        "SHAREMANAGE": "共享管理",
        "SETTINGS": "设置",
        "LOGOUT": "退出登录",
        "IMPORT": "导入项目",
        "EXPORT": "导出项目",
        "CONNECTINGSERVER": "正在连接服务器",
        "MANAGECOUNT": "管理项目数",
        "OFFLINECOUNT": "离线消息数",
        "MOREINFO": "前往“存储管理”中查看更多信息 ",
        "PREV": "上页",
        "NEXT": "下页",
        "DATA": "数据",
        "PROJ": "组件",
        "LOGIC": "逻辑",
        "REGACC": "注册账号",
        "RPTPASS": "placeholder$重复密码",
        "RSTPASS": "重置密码",
        "HAVEACC": "已有帐号？点击此处登录",
        "SRCPRJNAME": "原项目名称",
        "SHARETIME": "共享时间",
        "AUCODE": "授权码",
        "STATUSNOW": "当前状态",
        "USEDTIME": "被使用次数",
        "OPTIONS": "操作",
        "ONSHARE": "正在共享",
        "OFFSHARE": "暂停共享",
        "VERIFYQ": "验证密保问题",
        "VERIFYDES": "我们需要验证您的密保问题以确认身份。",
        "ANSWERQ": "回答密保问题",
        "REGEMAIL": "placeholder$注册时使用的电子邮件地址",
        "ANSWERVQ": "请回答预设的密保问题，并设定新密码。",
        "ANSWERINPUT": "placeholder$请输入问题答案",
        "NEWPASS": "placeholder$请输入新密码",
        "NEWPASSRPT": "placeholder$重复输入新密码",
        "PRJNAME": "项目名称",
        "SETQ": "设置密保验证问题",
        "SETQDES": "请您设置密码保护问题及其答案，以作为必要时用以找回密码的凭据。",
        "CHANGEQ": "换问题",
        "SETANS": "placeholder$设置问题答案",
        "CFMSET": "确定设置"
    },
    "tw": {
        "OPENSRC": "開源倉庫",
        "ADMINDASH": "管理後台",
        "TOPIC": "主題",
        "MESSAGE": "消息",
        "TIME": "時間",
        "DATAMANAGE": "數據管理",
        "ADMIN": "管理",
        "BASICADMIN": "基礎設置",
        "USERADMIN": "批量註冊",
        "DATAADMIN": "數據管理",
        "UPEMAIL": "註冊郵箱：",
        "EMAIL": "placeholder$請輸入電子郵箱地址",
        "PASSWORD": "placeholder$請輸入密碼",
        "LOGIN": "登錄MixIO",
        "MIXLYKEY": "placeholder$請輸入Mixly Key",
        "LOGIN2": "登錄MixIO",
        "VFCODE": "placeholder$請輸入項目授權碼",
        "BROWSE": "訪問MixIO項目",
        "RESET": "重置密碼",
        "SIGNUP": "註冊賬號",
        "GUIDE": "入門指南",
        "ANDROID": "安卓微端",
        "MANAGE": "管理",
        "PROJECTSMANAGE": "項目管理",
        "STORAGEMANAGE": "存儲管理",
        "SHAREMANAGE": "共享管理",
        "SETTINGS": "設置",
        "LOGOUT": "退出登錄",
        "IMPORT": "匯入用戶項目",
        "EXPORT": "匯出用戶項目",
        "CONNECTINGSERVER": "正在連接服務器",
        "MANAGECOUNT": "管理項目數",
        "OFFLINECOUNT": "離線消息數",
        "MOREINFO": "前往「存儲管理」中查看更多信息 ",
        "PREV": "上頁",
        "NEXT": "下頁",
        "DATA": "數據",
        "PROJ": "組件",
        "LOGIC": "邏輯",
        "REGACC": "註冊賬號",
        "RPTPASS": "placeholder$重復密碼",
        "RSTPASS": "重置密碼",
        "HAVEACC": "已有帳號？點擊此處登錄",
        "SRCPRJNAME": "原項目名稱",
        "SHARETIME": "共享時間",
        "AUCODE": "授權碼",
        "STATUSNOW": "當前狀態",
        "USEDTIME": "被使用次數",
        "OPTIONS": "操作",
        "ONSHARE": "正在共享",
        "OFFSHARE": "暫停共享",
        "VERIFYQ": "驗證密保問題",
        "VERIFYDES": "我們需要驗證您的密保問題以確認身份。",
        "ANSWERQ": "回答密保問題",
        "REGEMAIL": "placeholder$註冊時使用的電子郵件地址",
        "ANSWERVQ": "請回答預設的密保問題，並設定新密碼。",
        "ANSWERINPUT": "placeholder$請輸入問題答案",
        "NEWPASS": "placeholder$請輸入新密碼",
        "NEWPASSRPT": "placeholder$重復輸入新密碼",
        "PRJNAME": "項目名稱",
        "SETQ": "設置密保驗證問題",
        "SETQDES": "請您設置密碼保護問題及其答案，以作為必要時用以找回密碼的憑據。",
        "CHANGEQ": "換問題",
        "SETANS": "placeholder$設置問題答案",
        "CFMSET": "確定設置"
    }
};
var lang = "en"
try {
    module.exports = {
        JSLang,
        arrLang,
        lang
    }
} catch (e) {
    //doNothing
}