var fs = require('fs')
var express = require('express');
var session = require('express-session');
const sqlite3 = require('sqlite3').verbose();
var md5 = require('js-md5');
var ejs = require('ejs');
var bodyParser = require("body-parser");
const aedesmodule = require('aedes');
const http = require('http');
const https = require('https');
const ws = require('websocket-stream');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
var jq = require("jquery");
const mqtt = require('mqtt');
const { execPath } = require('process');
var { JSLang, arrLang, lang } = require("./js/lang.js")
const path = require('path');

var versionPath = "../version.json"
if(!fs.existsSync(versionPath)){
    versionPath = path.join(__dirname,"../version.json")
}
var VERSION = JSON.parse(fs.readFileSync(versionPath), "utf-8")["version"]
var configPath = "./config.json"
if(!fs.existsSync(configPath)){
    configPath = path.join(__dirname,"./config.json")
}
var configs = fs.readFileSync(configPath);
configs = JSON.parse(configs.toString());


var MAX_MESSAGE_PER_USER = configs["MAX_MESSAGE_PER_USER"]
var MAX_MESSAGE_PER_SECOND = configs["MAX_MESSAGE_PER_SECOND"]

var serverStatus = true

var globalWeather = {}

var globalConnectionControl = {}

stringendecoder = function() {
    this.REGX_HTML_ENCODE = /"|&|'|<|>|[\x00-\x20]|[\x7F-\xFF]|[\u0100-\u2700]/g;
    this.REGX_HTML_DECODE = /&\w+;|&#(\d+);/g;
    this.REGX_TRIM = /(^\s*)|(\s*$)/g;
    this.HTML_DECODE = {
        "&lt;": "<",
        "&gt;": ">",
        "&amp;": "&",
        "&nbsp;": " ",
        "&quot;": "\"",
        "&copy;": ""
    };
    this.encodeHtml = function(s) {
        s = (s != undefined) ? s : this.toString();
        return (typeof s != "string") ? s :
            s.replace(this.REGX_HTML_ENCODE,
                function($0) {
                    var c = $0.charCodeAt(0),
                        r = ["&#"];
                    c = (c == 0x20) ? 0xA0 : c;
                    r.push(c);
                    r.push(";");
                    return r.join("");
                });
    };
    this.decodeHtml = function(s) {
        var HTML_DECODE = this.HTML_DECODE;
        s = (s != undefined) ? s : this.toString();
        return (typeof s != "string") ? s :
            s.replace(this.REGX_HTML_DECODE,
                function($0, $1) {
                    var c = HTML_DECODE[$0];
                    if (c == undefined) {
                        if (!isNaN($1)) {
                            c = String.fromCharCode(($1 == 160) ? 32 : $1);
                        } else {
                            c = $0;
                        }
                    }
                    return c;
                });
    };
    this.trim = function(s) {
        s = (s != undefined) ? s : this.toString();
        return (typeof s != "string") ? s :
            s.replace(this.REGX_TRIM, "");
    };
    this.hashCode = function() {
        var hash = this.__hash__,
            _char;
        if (hash == undefined || hash == 0) {
            hash = 0;
            for (var i = 0, len = this.length; i < len; i++) {
                _char = this.charCodeAt(i);
                hash = 31 * hash + _char;
                hash = hash & hash; // Convert to 32bit integer
            }
            hash = hash & 0x7fffffff;
        }
        this.__hash__ = hash;
        return this.__hash__;
    };
};
stringendecoder.call(stringendecoder)

async function daemon_start() {
    var app = express();
    app.use(bodyParser.json({
        limit: '50mb'
    }));
    app.use(bodyParser.urlencoded({
        limit: '50mb',
        extended: true
    }));
    app.set('trust proxy', 1)
    app.use(session({
        secret: 'mixio',
        name: 'mixio',
        resave: false,
        rolling: true,
        saveUninitialized: true,
        cookie: {
            path: '/',
            httpOnly: true,
            maxAge: 18000000
        }
    }));
    app.get('/', function(req, res) {
        ejs.renderFile(__dirname + '/ejs/admin.ejs', {}, function(err, data) {
            res.send(data)
        })
    })

    app.get('/queryData', function(req, res) {
        var data = []
        var messages = []
        var cb = function(num, newFunc) {
            if (num >= 1) {
                var next = num - 1
                reserveDBs[next].all("select userName,count(*) from `reserve` group by userName", function(err, rows) {
                    if (rows) {
                        messages.push(...rows)
                    }
                    cb(next, newFunc)
                })
            } else {
                newFunc()
            }
        }
        cb(8, function() {
            db.all("select username from `user`", function(err, rows1) {
                db.all("select userName,count(*) from `project` group by username", function(err, rows2) {
                    for (var i = 0; i <= rows1.length - 1; i = i + 1) {
                        var username = rows1[i]["username"]
                        var projects = 0
                        var msgs = 0
                        for (var j = 0; j <= rows2.length - 1; j = j + 1) {
                            if (rows2[j]["userName"] == username) {
                                projects = rows2[j]["count(*)"]
                                break
                            }
                        }
                        for (var j = 0; j <= messages.length - 1; j = j + 1) {
                            if (messages[j]["userName"] == username) {
                                msgs = messages[j]["count(*)"]
                                break
                            }
                        }
                        data.push({
                            "username": username,
                            "projects": projects,
                            "messages": msgs
                        })
                    }
                    res.send(data)
                })

            })
        })


    })

    app.get('/admin', function(req, res) {
        if (req.session.admin) {
            ejs.renderFile(__dirname + '/ejs/manage.ejs', {
                'configs': configs,
                'status': serverStatus ? "运行中" : "已暂停",
                'version': VERSION
            }, function(err, data) {
                res.send(data)
            })
        } else
            res.redirect('/')
    })

    app.get('/clearMessage', function(req, res) {
        if (req.session.admin) {
            var userName = req.query.userName
            if (userName) {
                var hash = 0,i, chr;
                for (i = 0; i < userName.length; i++) {
                    chr = userName.charCodeAt(i);
                    hash = ((hash << 5) - hash) + chr;
                    hash |= 0;
                }
                var targetDB = reserveDBs[Math.abs(hash) % 8]
                targetDB.run("delete from `reserve` where userName=?", [userName, ], function(err) {
                    if (err) {
                        console.log(err.message)
                        res.send('-1')
                    } else {
                        res.send('1')
                    }
                })
            } else
                res.send('-1')
        } else
            res.send('-1')
    })

    app.post('/adminLogin', function(req, res) {
        if (req.body.userName == (configs["ADMIN_USERNAME"] ? configs["ADMIN_USERNAME"] : "admin") && req.body.password == (configs["ADMIN_PASSWORD"] ? configs["ADMIN_PASSWORD"] : "public")) {
            req.session.admin = true
            res.send('1')
        } else {
            res.send('-1')
        }
    })

    app.get('/saveAndRestart', async function(req, res) {
        newConfig = req.query.configs
        if (newConfig) {
            fs.writeFileSync(configPath, newConfig)
            configs = JSON.parse(newConfig)
            console.log("[INFO] Shutting down MixIO Server...")
            await mixio.stop();
            serverStatus = false;
            console.log("[INFO] MixIO Server is already shut down.")
            console.log("[INFO] Starting MixIO Server...")
            mixio = await mixioServer();
            serverStatus = true;
            res.send('1')
        } else
            res.send('-1')
    })

    app.get('/stop', async function(req, res) {
        if (serverStatus) {
            console.log("[INFO] Shutting down MixIO Server...")
            await mixio.stop();
            console.log("[INFO] MixIO Server is already shut down.")
            serverStatus = false
            res.send('1')
        } else {
            res.send('-1')
        }
    })

    app.get('/addAccount', function(req, res2) {
        var userName = req.query.userName
        var password = req.query.password
        var question = req.query.question
        var answer = req.query.answer
        if (userName && password && question && answer) {
            require('http').get('http://localhost:' + configs["MIXIO_HTTP_PORT"] + "/addAccount?userName=" + userName + "&password=" + password + "&question=" + question + "&answer=" + answer, function(req, res) {
                var html = '';
                req.on('data', function(data) {
                    html += data;
                });
                req.on('end', function() {
                    res2.send(html)
                });
            }).on('error', function() {
                res2.send('3')
            })
        }

    })

    app.get('/start', async function(req, res) {
        if (!serverStatus) {
            console.log("[INFO] Starting MixIO Server...")
            mixio = await mixioServer();
            serverStatus = true
            res.send('1')
        } else
            res.send('-1')
    })


    app.use('/js', express.static(path.join(__dirname, 'js')));

    app.use('/css', express.static(path.join(__dirname, 'css')));

    app.use('/img', express.static(path.join(__dirname, 'img')));

    app.use('/fonts', express.static(path.join(__dirname, 'fonts')));

    app.use('/blockly', express.static(path.join(__dirname, 'blockly')));

    app.use('/icons', express.static(path.join(__dirname, 'icons')));

    app.use('/documentation', express.static(path.join(__dirname, 'documentation')));
    app.listen(18084, function() {
        console.log("[INFO] MixIO Admin server listening on port", 18084)
    })
}

var mixioServer = function() {
    var keyPath = "./certs/private.pem"
    if(!fs.existsSync(keyPath))
        keyPath = path.join(__dirname,"./certs/private.pem")
    var crtPath = "./certs/file.crt"
    if(!fs.existsSync(crtPath))
        crtPath = path.join(__dirname,"./certs/file.crt")
    var privateKey = fs.readFileSync(keyPath, 'utf8');
    var certificate = fs.readFileSync(crtPath, 'utf8');
    
    var credentials = {
        key: privateKey,
        cert: certificate
    };

    var chainPath = "./certs/chain.crt"
    if(!fs.existsSync(chainPath))
        chainPath = path.join(__dirname,"./certs/chain.crt")
    if(fs.existsSync(chainPath))
        credentials['ca'] = fs.readFileSync(chainPath, 'utf8')

    aedes = aedesmodule()
    const httpServer = http.createServer()
    var tasks = {};

    function startHost(userName, projectName, projectPass, callback) {
        db.get("select * from `project` where userName=? and projectName=?", [userName, projectName], function(err, row) {
            if (row) {
                var projectLayout = row["projectLayout"]
                var dataStorage = row["dataStorage"]
                if (dataStorage == null)
                    dataStorage = "{}"
                var logicStorage = row["logicStorage"]
                var code = ""
                var dom = ""
                try {
                    if (projectLayout != null) {
                        var layoutJSON = JSON.parse(projectLayout)["layout_info"]
                        if (layoutJSON && layoutJSON != [])
                            dom = stringendecoder.decodeHtml(layoutJSON)
                    }
                    if (logicStorage != null)
                        code = stringendecoder.decodeHtml(JSON.parse(logicStorage)["code"])
                    else
                        code = ""
                } catch {

                }
                var illegalKeywords = ["for", "while"]
                var isIllegal = false
                for (wordIndex in illegalKeywords) {
                    if (code.indexOf(illegalKeywords[wordIndex]) != -1) {
                        isIllegal = true
                        break
                    }
                }
                if (isIllegal) {
                    callback(JSON.stringify({
                        "code": -3
                    }))
                    return
                }
                var codeFunction = function(obj) {
                    return Function("return(" + obj + ")")()(
                        new MixIOclosure(userName, projectName, projectPass, dataStorage, dom)
                    )
                }
                try {
                    var closure = codeFunction("function(MixIO){ " + code + " return MixIO}")
                    if (tasks[userName])
                        tasks[userName].push({
                            'projectName': projectName,
                            'projectPass': projectPass,
                            'closure': closure
                        })
                    else
                        tasks[userName] = [{
                            'projectName': projectName,
                            'projectPass': projectPass,
                            'closure': closure
                        }]
                        //Normal start
                    callback(JSON.stringify({
                        "code": 1
                    }))
                } catch (e) {
                    console.log(e)
                        //Exception
                    callback(JSON.stringify({
                        "code": -1,
                        "exception": e
                    }))
                }
            } else {
                //Project Not Found
                callback(JSON.stringify({
                    "code": -2
                }))
            }
        })
    }

    function endHost(userName, projectName, callback) {
        if (tasks[userName]) {
            for (userTask in tasks[userName]) {
                if (tasks[userName][userTask]["projectName"] == projectName) {
                    tasks[userName][userTask]["closure"].stop_project()
                    tasks[userName].splice(userTask, 1);
                    callback()
                    break
                }
            }
        }
    }

    function randomString(length, chars) {
        var result = '';
        for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
        return result;
    }

    ws.createServer({
        server: httpServer
    }, aedes.handle)
    const plainServer = require('net').createServer(aedes.handle)

    const httpsServer = https.createServer(credentials)
    ws.createServer({
        server: httpsServer
    }, aedes.handle)


    aedes.authenticate = function(client, username, password, callback) {
        if (username == "MixIO_public" && password == "MixIO_public") {
            client.user = "MixIO"
            callback(null, true)
        } else
            db.get("select password from user where username = ?", [username], function(err, row) {
                var auth = false
                if (err)
                    console.log(err)
                else if (row && (row["password"] == password)) {
                    auth = true
                    client.user = username
                }
                callback(null, auth)
            })

    }
    aedes.authorizePublish = function(client, packet, callback) {
        if(packet.topic=="$SYS/hello")
            return callback(null)
        if (client.user != packet.topic.split('/')[0])
            return callback(new Error('wrong topic'))
        else
        {
            if(globalConnectionControl[client.id])
            {
                if(Date.now() - globalConnectionControl[client.id][0] > 1000)
                {
                    globalConnectionControl[client.id][0] = Date.now()
                    globalConnectionControl[client.id][1] = 0
                }
                else if(globalConnectionControl[client.id][1] > MAX_MESSAGE_PER_SECOND)
                {
                    delete globalConnectionControl[client.id]
                    return callback(new Error('too fast'))
                }
            }
            callback(null)
        }
    }

    aedes.authorizeSubscribe = function(client, subscription, callback) {
        if (client.user != subscription.topic.split('/')[0] && subscription.topic!="$SYS/hello")
            return callback(new Error('wrong topic'))
        else
            callback(null, subscription);
    }

    setInterval(function(){
        aedes.publish({
            cmd: 'publish',
            qos: 0,
            dup: false,
            topic: '$SYS/hello',
            payload: Buffer.from(""+Date.now()),
            retain: false
        })
    },10000)

    aedes.on('publish', function(packet, client) {
        
        if(client)
        {
            if(globalConnectionControl[client.id])
                globalConnectionControl[client.id][1] = globalConnectionControl[client.id][1] + 1
            else
                globalConnectionControl[client.id] = [Date.now(),1]
        }
            
        var topic = packet.topic.split('/')
        var payload = String(packet.payload)
        if (topic.length == 3) {
            if (topic[2] == 'b640a0ce465fa2a4150c36b305c1c11b') {
                db.run("insert or ignore into devices (userName, clientid) values (?,?)", [topic[0], payload])
            } else if (topic[2] == '9d634e1a156dc0c1611eb4c3cff57276') {
                db.run("delete from devices where userName = ? and clientid = ?", [topic[0], payload])
                delete globalConnectionControl[client.id]
            } else if (configs["ALLOW_HOOK"] && reserveJSON[topic[0]] && topic[0] != "$SYS") {
                var userName = topic[0]
                var reserveTopic = topic[1] + "/" + topic[2]
                var hash = 0,i, chr;
                for (i = 0; i < userName.length; i++) {
                    chr = userName.charCodeAt(i);
                    hash = ((hash << 5) - hash) + chr;
                    hash |= 0;
                }
                var targetDB = reserveDBs[Math.abs(hash) % 8]
                targetDB.get("select count(*) from 'reserve' where userName = ?", [userName, ], function(err, row) {
                    if (err) {
                        console.log(err.message)
                    } else {
                        if (row && row["count(*)"] < MAX_MESSAGE_PER_USER) {
                            targetDB.run("insert into 'reserve' (userName, topic, message) values (?,?,?)", [userName, reserveTopic, payload], function(err) {
                                if (err) {
                                    console.log(err.message)
                                }
                            })
                        } else if (row["count(*)"] >= MAX_MESSAGE_PER_USER) {
                                targetDB.get("select id from 'reserve' where userName = ? order by id asc limit 1", [userName, ], function(err, row) {
                                    if (err) {
                                        console.log(err.message)
                                    } else {
                                        if (row && row["id"]) {
                                            targetDB.run("delete from 'reserve' where id = ?", [row["id"], ], function(err) {
                                                if (err) {
                                                    console.log(err.message)
                                                }
                                                else{
                                                    targetDB.run("insert into 'reserve' (userName, topic, message) values (?,?,?)", [userName, reserveTopic, payload], function(err) {
                                                        if (err) {
                                                            console.log(err.message)
                                                        }
                                                    })
                                                }
                                            })
                                        }
                                    }
                                })   
                        }
                    }
                })
            }
        }
    })

    var app = express();
    app.use(bodyParser.json({
        limit: '50mb'
    }));
    app.use(bodyParser.urlencoded({
        limit: '50mb',
        extended: true
    }));
    app.use(session({
        secret: 'mixio',
        name: 'mixio',
        resave: false,
        rolling: true,
        saveUninitialized: true,
        cookie: {
            path: '/',
            httpOnly: true,
            maxAge: 18000000
        }
    }));

    app.set('trust proxy', 1)

    app.get('/', function(req, res) {
        ejs.renderFile(__dirname + '/ejs/index.ejs', {
            'main':fs.existsSync(__dirname + "/certs/chain.crt"),
            'mixly':fs.existsSync(__dirname + "/mixly")
        }, function(err, data) {
            res.send(data)
        })
    })

    app.get('/index', function(req, res) {
        ejs.renderFile(__dirname + '/ejs/index.ejs', {
            'main':fs.existsSync(__dirname + "/certs/chain.crt"),
            'mixly':fs.existsSync(__dirname + "/mixly")
        }, function(err, data) {
            res.send(data)
        })
    })

    app.get('/observe', function(req, res) {
        ejs.renderFile(__dirname + '/ejs/observe.ejs', {
            'configs': configs
        }, function(err, data) {
            res.send(data)
        })
    })

    app.get('/host', function(req, res) {
        ejs.renderFile(__dirname + '/ejs/host.ejs', {
            'configs': configs
        }, function(err, data) {
            res.send(data)
        })
    })


    app.get('/webapps', function(req, res) {
        if (req.session.userName) {
            db.all("select * from `share` where userName=?", [req.session.userName], function(err, rows) {
                if (err)
                    console.log(err)
                else
                    ejs.renderFile(__dirname + '/ejs/apps.ejs', {
                        'rows': rows
                    }, function(err, data) {
                        res.send(data)
                    })
            })

        } else
            res.redirect('/')
    })

    app.get('/register', function(req, res) {
        if (configs["ALLOW_REGISTER"])
            res.sendFile(__dirname + "/" + "ejs/register.html");
        else
            res.send('不允许自助注册！')
    })

    app.get('/forgot', function(req, res) {
        res.sendFile(__dirname + "/" + "ejs/forgot-password.html");
    })

    app.get('/verify', function(req, res) {
        if (req.session.userName && req.session.salt) {
            ejs.renderFile(__dirname + '/ejs/verify.ejs', {
                userName: req.session.userName
            }, function(err, data) {
                res.send(data)
            })
        } else
            res.redirect('/')
    })

    app.get('/android', function(req, res) {
        res.download(__dirname + "/" + "ejs/MixIO.apk")
    })

    app.get('/fetchObserve', function(req, res) {
        if (req.query.sid) {
            var sid = req.query.sid
            db.get("select * from `share` where shareid=?", [sid], function(err, row) {
                if (err) {
                    console.log(err)
                    res.send('-1')
                } else {
                    if (row && row["status"] == 1) {
                        var userName = row["userName"]
                        db.get("select * from `user` where username =?", [userName], function(err, row2) {
                            if (err) {
                                console.log(err)
                                res.send('-1')
                            } else if (row2) {
                                row["projectPass"] = row2["password"]
                                res.send(JSON.stringify(row))
                            } else
                                res.send('-1')
                        })
                    } else
                        res.send('-1')
                }
            })
        } else
            res.send('-1')
    })

    app.get('/reset', function(req, res) {
        if (req.query.target && req.query.vfcode && req.query.pass) {
            db.get("select * from `user` where username=?", [req.query.target], function(err, row) {
                if (err)
                    console.log(err)
                else
                if (row) {
                    if (row["answer"] == req.query.vfcode) {
                        var salt = randomString(16, "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789")
                        var password = md5(req.query.pass + salt)
                        db.run("update `user` set password = ?,salt = ? where username=?", [password, salt, req.query.target], function(err) {
                            if (err)
                                console.log(err)
                            else
                                res.send('1')
                        })
                    } else
                        res.send('2')
                } else
                    res.send('2')
            })
        } else
            res.send('2')
    })

    app.get('/setProtect', function(req, res) {
        if (req.session.userName && req.query.question && req.query.answer) {
            db.run("update `user` set question=? , answer=? , verified=1 where username=?", [req.query.question, req.query.answer, req.session.userName], function(err) {
                if (err)
                    console.log(err)
                else
                    res.send('1')
            })
        } else
            res.redirect('/')
    })

    app.get('/registerAccount', function(req, res) {
        if (req.query.userName && req.query.password) {
            db.get("select * from `user` where username=?", [req.query.userName], function(err, row) {
                if (err)
                    console.log(err)
                else {
                    if (row) {
                        if (req.session.salt)
                            req.session.salt = undefined
                        res.send('2')
                    } else {
                        var salt = randomString(16, "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789")
                        req.session.userName = req.query.userName
                        req.session.salt = salt
                        var password = md5(req.query.password + salt)
                        db.run("insert into `user` (username, password, salt, verified, question, answer) values(?,?,?,0, '', '')", [req.query.userName, password, salt], function(err) {
                            if (err)
                                console.log(err)
                            else
                                res.send('1')
                        })
                    }
                }
            })
        }
    })

    app.get('/addAccount', function(req, res) {
        if (req.query.userName && req.query.password && req.query.question && req.query.answer) {
            db.get("select * from `user` where username=?", [req.query.userName], function(err, row) {
                if (err)
                    console.log(err)
                else {
                    if (row) {
                        if (req.session.salt)
                            req.session.salt = undefined
                        res.send('2')
                    } else {
                        var salt = randomString(16, "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789")
                        req.session.userName = req.query.userName
                        req.session.salt = salt
                        var password = md5(req.query.password + salt)
                        db.run("insert into `user` (username, password, salt, verified, question, answer) values(?,?,?,1,?,?)", [req.query.userName, password, salt, req.query.question, req.query.answer], function(err) {
                            if (err)
                                console.log(err)
                            else
                                res.send('1')
                        })
                    }
                }
            })
        }
    })

    app.get('/getDevices', function(req, res) {
        if (req.session.userName && req.query.userName) {
            var userName = req.query.userName
            db.all("select clientid from devices where userName = ?", [userName], function(err, rows) {
                res.send(JSON.stringify(rows))
            })
        } else
            res.redirect('/')
    })

    app.get('/projects', function(req, res) {
        if (req.session.userName) {
            ejs.renderFile(__dirname + '/ejs/projects.ejs', {
                isMixly: 0,
                userName: req.session.userName,
                projectPass: req.session.projectPass,
                prjid: req.query.prjid ? req.query.prjid : 'no',
                'configs': configs
            }, function(err, data) {
                res.send(data)
            })
        } else
            res.redirect('/')
    })

    app.get('/mqttdata', function(req, res) {
        if (req.session.userName) {
            ejs.renderFile(__dirname + '/ejs/data.ejs', {
                userName: req.session.userName,
                projectPass: req.session.projectPass,
                'configs': configs
            }, function(err, data) {
                res.send(data)
            })
        } else
            res.redirect('/')
    })

    app.get('/projects-mixly', function(req, res) {
        ejs.renderFile(__dirname + '/ejs/projects.ejs', {
            isMixly: 1,
            userName: req.session.userName,
            projectPass: req.session.projectPass,
            count: 0,
            prjid: req.query.prjid ? req.query.prjid : 'no',
            'configs': configs
        }, function(err, data) {
            res.send(data)
        })
    })

    app.post('/importProjects', function(req, res) {
        var userName = req.session.userName
        var projectName = req.body.projectName
        if (userName && projectName) {
            var projectType = req.body.projectType
            var projectLayout = req.body.projectLayout
            var dataStorage = req.body.dataStorage
            var logicStorage = req.body.logicStorage
            db.run("delete from `project` where userName=? and projectName=?", [userName, projectName], function(err) {
                db.get("select COUNT(*) from `project` where userName=?", [userName], function(err, row) {
                    if (err)
                        console.log(err)
                    else
                    if (row["COUNT(*)"] >= configs['MAX_PROJECT_NUM_PER_USER'])
                        res.send('3')
                    else
                        db.run("insert into `project` (projectName,userName,projectLayout,projectType,dataStorage,logicStorage) values(?,?,?,?,?,?)", [projectName, userName, projectLayout, projectType, dataStorage, logicStorage], function(err) {
                            if (err)
                                console.log(err)
                            else
                                res.send('1')
                        })
                })
            })
        }
    })

    app.get('/exportProjects', function(req, res) {
        if (req.session.userName) {
            var userName = req.session.userName
            db.all("select * from `project` where userName=?", [userName], function(err, rows) {
                res.send(JSON.stringify(rows))
            })
        }
    })

    app.get('/getData', function(req, res) {
        if (req.session.userName) {
            var userName = req.session.userName
            var hash = 0,i, chr;
            for (i = 0; i < userName.length; i++) {
                chr = userName.charCodeAt(i);
                hash = ((hash << 5) - hash) + chr;
                hash |= 0;
            }
            reserveDBs[Math.abs(hash) % 8].all("select * from `reserve` where userName=?", [req.session.userName], function(err, rows) {
                if (err) {
                    console.log(err)
                } else {
                    if (rows) {
                        res.send({
                            "count": rows.length,
                            "rows": rows,
                            "max": configs['MAX_MESSAGE_PER_USER']
                        })
                    }
                }
            })
        }

    })

    app.get('/getProjects', function(req, res) {
        if (req.session.userName && req.query.page) {
            var pageStart = parseInt(req.query.page) * 8
            db.get("select COUNT(*) from `project` where userName=?", [req.session.userName], function(err, row) {
                var count = row['COUNT(*)']
                db.all("select projectName,projectLayout,timestamp,projectType,userName from `project` where userName=? order by timestamp desc limit ?,8", [req.session.userName, pageStart], function(err, rows) {
                    resrows = JSON.parse(JSON.stringify(rows))
                    for (r in resrows) {
                        resrows[r]['isTask'] = 0
                    }
                    if (tasks[req.session.userName]) {
                        for (r in resrows) {
                            var prjName = resrows[r]['projectName']
                            var userTasks = tasks[req.session.userName]
                            var isTask = 0
                            for (task in userTasks) {
                                if (userTasks[task]["projectName"] == prjName) {
                                    isTask = 1
                                    if (userTasks[task]["closure"].errorMessage != "") {
                                        isTask = resrows[r]['errorMessage'] = userTasks[task]["closure"].errorMessage
                                    }
                                    break
                                }
                            }
                            resrows[r]['isTask'] = isTask
                        }
                    }
                    res.send(JSON.stringify({
                        rows: resrows,
                        count: count
                    }))
                })
            })
        } else
            res.send('-1')
    })

    app.get('/modifyShare', function(req, res) {
        if (req.session.userName && req.query.shareid && req.query.method) {
            if (req.query.method == 2) {
                db.run("delete from `share_key` where share_key=?", [req.query.shareid], function(err) {
                    if (err)
                        console.log(err)
                    else {
                        db.run("delete from `share` where shareid=?", [req.query.shareid], function(err) {
                            if (err) {
                                console.log(err)
                                res.send('2')
                            } else
                                res.send('1')
                        })
                    }
                })
            } else if (req.query.method == 1 || req.query.method == 0) {
                db.run("update `share` set status = ? where shareid=?", [req.query.method, req.query.shareid], function(err) {
                    if (err) {
                        console.log(err)
                        res.send('2')
                    } else
                        res.send('1')
                })
            } else
                res.send('2')
        } else
            res.redirect('/')
    })

    app.get('/share', function(req, res) {
        if (req.session.userName && req.query.projectName) {
            var userName = req.session.userName
            var projectName = req.query.projectName
            var shareid = randomString(6, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ')
            db.run("delete from `share` where userName=? and projectName=?", [req.session.userName, req.query.projectName], function(err) {
                if (err)
                    console.log(err)
                else {
                    db.run("insert into `share` (shareid, userName, projectName, projectLayout, dataStorage, logicStorage) values(?,?,?,(select projectLayout from `project` where userName = ? and projectName = ?),(select dataStorage from `project` where userName = ? and projectName = ?),(select logicStorage from `project` where userName = ? and projectName = ?))", [shareid, userName, projectName, userName, projectName, userName, projectName, userName, projectName], function(err) {
                        if (err)
                            console.log(err)
                        else {
                            db.run("delete from `share_key` where userName=? and projectName=?", [req.session.userName, req.query.projectName], function(err) {
                                if (err)
                                    console.log(err)
                                else {
                                    db.run("insert into `share_key` (userName,projectPass,projectName,share_key) values (?,?,?,?)", [req.session.userName, req.session.projectPass, req.query.projectName, shareid], function(err) {
                                        if (err)
                                            console.log(err)
                                        else
                                            res.send(shareid)
                                    })
                                }
                            })
                        }
                    })
                }
            })
        } else
            res.redirect('/')
    })

    app.get('/getShare', function(req, res) {
        if (req.session.userName && req.query.shareid) {
            db.get("select * from `share` where shareid=?", [req.query.shareid], function(err, row) {
                if (err)
                    console.log(err)
                else {
                    if (row && row["status"] == 1) {
                        var userName = req.session.userName
                        var projectName = row['shareid'];
                        var projectCount = parseInt(row['shareCount']) + 1;
                        projectName = projectName + projectCount
                        db.run("update `share` set shareCount = ? where shareid=?", [projectCount, req.query.shareid], function(err) {
                            if (err) {
                                console.log(err)
                                res.send(err)
                            } else {
                                db.run("insert into `project`(projectName, userName, projectLayout, dataStorage, logicStorage) values(?,?,(select projectLayout from `share` where shareid = ?),(select dataStorage from `share` where shareid = ?),(select logicStorage from `share` where shareid = ?))", [projectName, userName, req.query.shareid, req.query.shareid, req.query.shareid], function(err) {
                                    if (err) {
                                        console.log(err)
                                        res.send(err)
                                    } else
                                        res.send('1')
                                })
                            }
                        })
                    } else
                        res.send('2')
                }
            })
        } else
            res.redirect('/')
    })

    app.post('/getProject', function(req, res) {
        var projectName = req.body.projectName
        if (req.session.userName && projectName) {
            db.get("select * from `project` where userName=? and projectName=?", [req.session.userName, projectName], function(err, row) {
                if (row) {
                    var result = {}
                    result['userName'] = req.session.userName
                    result['projectPass'] = req.session.projectPass
                    result['projectLayout'] = row['projectLayout']
                    result['dataStorage'] = row['dataStorage']
                    result['logicStorage'] = row['logicStorage']
                    result['history'] = []
                    res.send(JSON.stringify(result))
                } else
                    res.send('0')
            })
        } else
            res.redirect('/')
    })

    app.post('/getHostProject', function(req, res) {
        var userName = req.body.userName
        var projectName = req.body.projectName
        var projectPass = req.body.projectPass
        db.get("select * from `project` where userName=? and projectName=?", [userName, projectName], function(err, row) {
            if (row) {
                var result = {}
                result['userName'] = userName
                result['projectPass'] = projectPass
                result['projectLayout'] = row['projectLayout']
                result['dataStorage'] = row['dataStorage']
                result['logicStorage'] = row['logicStorage']
                res.send(JSON.stringify(result))
            } else
                res.send('0')
        })
    })

    app.post('/saveProject', function(req, res) {
        var projectLayout = req.body.layout
        var projectName = req.body.projectName
        var projectType = req.body.projectType
        var dataStorage = req.body.dataStorage
        var logicStorage = req.body.logicStorage
        if (req.session.userName && projectName && projectType && dataStorage && logicStorage && projectLayout) {
            db.run("update `project` set projectLayout=?, dataStorage=?, logicStorage=?, projectType=? where userName=? and projectName=?", [projectLayout, dataStorage, logicStorage, projectType, req.session.userName, projectName], function(err) {
                if (err) {
                    res.send(err)
                } else {
                    res.send('1')
                }
            })
        } else
            res.send('会话已过期')
    })

    app.post('/saveLay', function(req, res) {
        var projectLayout = req.body.layout
        var projectName = req.body.projectName
        var userName = req.body.userName
        if (projectLayout && projectName && userName) {
            db.run("update `project` set projectLayout=? where userName=? and projectName=?", [projectLayout, userName, projectName], function(err) {
                if (err)
                    res.send('-1')
                else
                    res.send('1')
            })
        }
    })

    app.get('/getSession', function(req, res) {
        result = {}
        if (req.session.userName) {
            result['userName'] = req.session.userName
            result['flag'] = true
        } else
            result['flag'] = false
        res.send(JSON.stringify(result))
    })

    app.get('/queryShareKey', function(req, res) {
        if (req.session.userName && req.query.projectName && req.query.projectPass) {
            var userName = req.session.userName
            var projectName = req.query.projectName
            var projectPass = req.query.projectPass
            db.get("select share_key from `share_key` where userName=? and projectPass=? and projectName=?", [userName, projectPass, projectName], function(err, row) {
                if (row) {
                    res.send(JSON.stringify(row))
                } else {
                    res.send('-1')
                }
            })
        } else
            res.redirect('/')
    })


    app.get('/login', function(req, res) {
        var userName = req.query.userName
        var password = req.query.password
        if (userName && password)
            db.get("select * from `user` where username=?", [userName], function(err, row) {
                if (row) {
                    if (row['password'] == md5(password + row['salt'])) {
                        if (row['verified'] == 1) {
                            req.session.userName = row['username']
                            req.session.projectPass = row['password']
                            if (req.session.salt)
                                req.session.salt = undefined
                            res.send('1')
                        } else {
                            req.session.userName = row['username']
                            req.session.salt = row['salt']
                            res.send('3')
                        }
                    } else
                        res.send('2')
                } else
                    res.send('2')
            })
        else
            res.send('2')
    })

    app.get('/createProject', function(req, res) {
        if (req.session.userName && req.query.projectName && req.query.projectType) {
            var userName = req.session.userName
            var projectName = req.query.projectName
            var projectType = req.query.projectType
            var projectInfo = '{"layout_info":[]}';
            db.get("select COUNT(*) from `project` where userName=? and projectName=?", [userName, projectName], function(err, row) {
                if (err)
                    console.log(err)
                else
                if (row["COUNT(*)"] > 0)
                    res.send('2')
                else {
                    db.get("select COUNT(*) from `project` where userName=?", [userName], function(err, row) {
                        if (err)
                            console.log(err)
                        else
                        if (row["COUNT(*)"] >= configs['MAX_PROJECT_NUM_PER_USER'])
                            res.send('3')
                        else
                            db.run("insert into `project` (projectName,userName,projectLayout,projectType) values(?,?,?,?)", [projectName, userName, projectInfo, projectType], function(err) {
                                if (err)
                                    console.log(err)
                                else
                                    res.send('1')
                            })
                    })
                }
            })
        } else
            res.redirect('/')
    })

    app.get('/renameProject', function(req, res) {
        if (req.session.userName && req.query.oldProjectName && req.query.newProjectName) {
            var userName = req.session.userName
            var oldProjectName = req.query.oldProjectName
            var newProjectName = req.query.newProjectName
            db.get("select * from `project` where userName=? and projectName=?", [userName, newProjectName], function(err, row) {
                if (err)
                    console.log(err)
                else
                if (row)
                    res.send('2')
                else {
                    db.run("update `project` set projectName=? where userName=? and projectName=?", [newProjectName, userName, oldProjectName], function(err) {
                        if (err)
                            console.log(err)
                        else {
                            res.send('1')
                        }
                    })
                }
            })
        } else
            res.redirect('/')
    })

    app.get('/copyProject', function(req, res) {
        if (req.session.userName && req.query.oldProjectName && req.query.newProjectName) {
            var userName = req.session.userName
            var oldProjectName = req.query.oldProjectName
            var newProjectName = req.query.newProjectName
            db.get("select * from `project` where userName=? and projectName=?", [userName, newProjectName], function(err, row) {
                if (err)
                    console.log(err)
                else
                if (row)
                    res.send('2')
                else {
                    db.get("select COUNT(*) from `project` where userName=?", [userName], function(err, row) {
                        if (err)
                            console.log(err)
                        else
                        if (row["COUNT(*)"] >= configs['MAX_PROJECT_NUM_PER_USER'])
                            res.send('3')
                        else
                            db.run("insert into `project` (userName, projectLayout, dataStorage, logicStorage, projectName) VALUES (?,(select a.projectLayout from (select projectLayout from `project` where userName=? and projectName=?)a),(select a.dataStorage from (select dataStorage from `project` where userName=? and projectName=?)a),(select a.logicStorage from (select logicStorage from `project` where userName=? and projectName=?)a),?)", [userName, userName, oldProjectName, userName, oldProjectName, userName, oldProjectName, newProjectName], function(err) {
                                if (err)
                                    console.log(err)
                                else
                                    res.send('1')
                            })
                    })
                }
            })
        } else
            res.redirect('/')
    })

    app.get('/addShareKey', function(req, res) {
        var rString = randomString(6, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');
        if (req.session.userName && req.query.projectName && req.query.projectPass) {
            db.run("delete from `share` where userName=? and projectName = ?", [req.session.userName, req.query.projectName], function(err) {
                if (err)
                    console.log(err)
                else {
                    db.run("insert into `share` (shareid, userName, projectName, projectLayout, dataStorage, logicStorage) values(?,?,?,(select projectLayout from `project` where userName = ? and projectName = ?),(select dataStorage from `project` where userName = ? and projectName = ?),(select logicStorage from `project` where userName = ? and projectName = ?))", [rString, req.session.userName, req.query.projectName, req.session.userName, req.query.projectName, req.session.userName, req.query.projectName, req.session.userName, req.query.projectName], function(err) {
                        if (err)
                            console.log(err)
                        else {
                            db.run("delete from `share_key` where userName=? and projectPass=? and projectName=?", [req.session.userName, req.query.projectPass, req.query.projectName], function(err) {
                                if (err)
                                    console.log(err)
                                else {
                                    db.run("insert into `share_key` (userName,projectPass,projectName,share_key) values (?,?,?,?)", [req.session.userName, req.query.projectPass, req.query.projectName, rString], function(err) {
                                        if (err) {
                                            console.log(err)
                                            res.send(err)
                                        } else {
                                            res.send(rString)
                                        }
                                    })
                                }
                            })
                        }
                    })
                }
            })

        } else
            res.redirect('/')
    })

    app.get('/removeShareKey', function(req, res) {
        if (req.session.userName && req.query.projectName && req.query.projectPass) {
            db.run("delete from `share` where userName=? and projectName=?", [req.session.userName, req.query.projectName], function(err) {
                if (err)
                    console.log(err)
                else {
                    db.run("delete from `share_key` where userName=? and projectPass=? and projectName=?", [req.session.userName, req.query.projectPass, req.query.projectName], function(err) {
                        if (err) {
                            console.log(err)
                            res.send(err)
                        } else {
                            res.send('1')
                        }
                    })
                }
            })
        } else
            res.redirect('/')
    })

    app.get('/getWeather', function(req, res) {
        if (req.query.dsc_code && !configs["OFFLINE_MODE"]) {
            if(globalWeather[req.query.dsc_code] && globalWeather[req.query.dsc_code].time && (new Date().getTime() - globalWeather[req.query.dsc_code].time) < 600000) {
                res.send(globalWeather[req.query.dsc_code].data)
            } else {
                http.get('http://api.map.baidu.com/weather/v1/?district_id=' + req.query.dsc_code + '&data_type=now&ak=' + configs["BAIDU_MAP_SERVER_AK"], function(req2, res2) {
                    var html = ''
                    req2.on('data', function(data) {
                        html += data;
                    });
                    req2.on('end', function() {
                        globalWeather[req.query.dsc_code] = {
                            time: new Date().getTime(),
                            data: html
                        }
                        res.send(html)
                    });
                })
            }
        } else
            res.send('-1')
    })

    app.post('/deleteProject', function(req, res) {
        if (req.session.userName && req.body.projectName) {
            db.run("delete from `project` where userName=? and projectName=?", [req.session.userName, req.body.projectName], function(err) {
                if (err)
                    res.send('2')
                else
                    res.send('1')
            })
        } else
            res.redirect('/')
    })

    app.get('/resetQuestion', function(req, res) {
        if (req.query.target) {
            db.get("select * from `user` where username=?", [req.query.target], function(err, row) {
                if (err || !row)
                    res.send({
                        'code': 999,
                        'question': ''
                    })
                else
                    res.send({
                        'code': 1,
                        'question': row['question']
                    })
            })
        }
    })


    app.get('/logout', function(req, res) {
        req.session.destroy(function(err) {
            res.redirect('/');
        })
    })

    app.get('/keyLogin', function(req, res) {
        if (req.query.userName) {
            req.session.userName = '@' + req.query.userName
            req.session.projectPass = 'MixIO_public'
            db.get("select COUNT(*) from `project` where username=?", [req.session.userName], function(err, row) {
                if (err) {
                    console.log(err)
                    res.send('-1')
                } else {
                    if (row["COUNT(*)"] > 0) {
                        res.send('1')
                    } else {
                        var layout = '{"layout_info":[]}';
                        db.run("insert into `project` (projectName,userName,projectLayout,projectType) values('default',?,?,'1')", [req.session.userName, layout], function(err) {
                            if (err) {
                                console.log(err)
                                res.send('-1')
                            } else
                                res.send('1')
                        })
                    }
                }
            })
        } else
            res.send('-1')
    })

    app.get('/time.php', function(req, res) {
        var date = new Date()
        res.send([date.getFullYear(), date.getMonth() + 1, date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds(), date.getDay()].join(','))
    })

    app.get('/mixio-php/sharekey.php', function(req, res) {
        if (req.query.sk) {
            db.get("select userName,userName as '0', projectName, projectName as '1' ,projectPass, projectPass as '2' from `share_key` where share_key = ?", [req.query.sk], function(err, row) {
                if (err)
                    console.log(err)
                else {
                    if (row)
                        res.send(row)
                    else
                        res.send('-1')
                }
            })
        } else
            res.send('-1')
    })

    app.get('/devAPI', function(req, res) {
        res.sendFile(__dirname + "/ejs/" + "dev.html");
    })

    app.get('/startHost', function(req, res) {
        var userName = req.session.userName
        var projectName = req.query.projectName
        var projectPass = req.session.projectPass
        if (userName && projectName && projectPass)
            startHost(userName, projectName, projectPass, function(status) {
                res.send(status)
            })
        else
            res.send('-1')
    })

    app.get('/queryHook', function(req, res) {
        if (req.session.userName) {
            if (reserveJSON[req.session.userName])
                res.send('1')
            else
                res.send('2')
        } else {
            res.send('0')
        }
    })

    var filterPath = "./reserve/filter.json"
    if(!fs.existsSync(filterPath)) 
        filterPath = path.join(__dirname,'./reserve/filter.json')
    app.get('/startHook', function(req, res) {
        if (req.session.userName) {
            reserveJSON[req.session.userName] = true
            fs.writeFileSync(filterPath, JSON.stringify(reserveJSON, false, 4))
            res.send('1')
        } else {
            res.send('0')
        }
    })

    app.get('/stopHook', function(req, res) {
        if (req.session.userName) {
            reserveJSON[req.session.userName] = false
            fs.writeFileSync(filterPath, JSON.stringify(reserveJSON, false, 4))
            res.send('1')
        } else {
            res.send('0')
        }
    })

    app.get('/clearHook', function(req, res) {
        if (req.session.userName) {
            var condition = req.query.condition
            var userName = req.session.userName
            var hash = 0,i, chr;
            for (i = 0; i < userName.length; i++) {
                chr = userName.charCodeAt(i);
                hash = ((hash << 5) - hash) + chr;
                hash |= 0;
            }
            reserveDBs[Math.abs(hash) % 8].run("delete from `reserve` where userName = ? and " + condition, [userName, ], function(err) {
                if (err) {
                    console.log(err.message)
                    res.send('-1')
                } else
                    res.send('1')
            })
        } else
            res.send('0')
    })

    app.get('/endHost', function(req, res) {
        var userName = req.session.userName
        var projectName = req.query.projectName
        if (userName && projectName) {
            endHost(userName, projectName, function() {
                res.send('1')
            })
        } else
            res.send('-1')
    })


    app.use('/js', express.static(path.join(__dirname, 'js')));

    app.use('/css', express.static(path.join(__dirname, 'css')));

    app.use('/img', express.static(path.join(__dirname, 'img')));

    app.use('/fonts', express.static(path.join(__dirname, 'fonts')));

    app.use('/blockly', express.static(path.join(__dirname, 'blockly')));

    app.use('/icons', express.static(path.join(__dirname, 'icons')));

    app.use('/documentation', express.static(path.join(__dirname, 'documentation')));

    var mixlyPath = "./mixly"
    if(!fs.existsSync(mixlyPath)) {
        mixlyPath = path.join(__dirname,'./mixly')
    }
    if(fs.existsSync(mixlyPath)){
        app.use('/mixly', express.static(mixlyPath));
    }

    var dbPath = "./mixio.db"
    if(!fs.existsSync(dbPath)) {
        dbPath = path.join(__dirname,'./mixio.db')
    }
    db = new sqlite3.Database(
        dbPath,
        sqlite3.OPEN_READWRITE,
        function(err) {
            if (err) {
                console.log(err.message)
            }
            db.run('delete from devices')
            console.log('[INFO] Database Connected!')
        }
    )

    reserveDBs = []
    for (var i = 1; i <= 8; i = i + 1) {
        var dbPath = "./reserve/" + i + ".db"
        if(!fs.existsSync(dbPath)) {
            dbPath = path.join(__dirname,'./reserve/' + i + ".db")
        }
        reserveDBs.push(
            new sqlite3.Database(
                dbPath,
                sqlite3.OPEN_READWRITE,
                function(err) {
                    if (err)
                        console.log(err.message)
                }
            )
        )
    }
    var reserveJSON = JSON.parse(fs.readFileSync(filterPath), "utf8")


    return new Promise(resolve => {
        plainServer.listen(1883, function() {
            console.log('[INFO] Plain MQTT server listening on port', 1883)
            httpServer.listen(8083, function() {
                console.log('[INFO] WebSocket MQTT server listening on port', 8083)
                httpsServer.listen(8084, function() {
                    console.log('[INFO] WebSocketS MQTT server listening on port', 8084)
                    httpServer2 = app.listen(configs['MIXIO_HTTP_PORT'], function() {
                        console.log("[INFO] MixIO server listening on port", configs['MIXIO_HTTP_PORT'])
                        httpsServer2 = https.createServer(credentials, app)
                        httpsServer2.listen(configs['MIXIO_HTTPS_PORT'], function() {
                            console.log("[INFO] MixIO server (HTTPS) listening on port", configs['MIXIO_HTTPS_PORT'])
                            resolve({
                                stop: function() {
                                    return new Promise(resolve => {
                                        //MQTT
                                        plainServer.close(function() {
                                            console.log("[INFO] Plain MQTT server closed")
                                            //MQTT Websocket
                                            httpServer.close(function() {
                                                console.log("[INFO] WebSocket MQTT server closed")
                                                //MixIO HTTP
                                                httpServer2.close(function() {
                                                    console.log("[INFO] MixIO server closed")
                                                    //MQTT WebsocketS
                                                    httpsServer.close(function() {
                                                        console.log("[INFO] WebSocketS MQTT server closed")
                                                        //MixIO HTTPS
                                                        httpsServer2.close(function() {
                                                            console.log("[INFO] MixIO server (HTTPS) closed")
                                                            resolve("1")
                                                        })
                                                    })
                                                })
                                            })
                                        })
                                    })
                                }
                            })
                        });
                    })
                })
            })
        })
    })

}

daemon_start()
async function startOnce() {
    mixio = await mixioServer()
}
startOnce()

//MixIO

curlong = 0
curlati = 0

function MixIOLogicError(message) {
    this.message = message
    this.name = "MixIOLogicError"
}

MixIOLogicError.prototype = new Error()

var MixIOclosure = function(userName, projectName, projectPass, dataStorage, dom) {
    var that = this
    this.errorMessage = ""
    this.dataSave = JSON.parse(dataStorage)
    if (!this.dataSave || !this.dataSave["received"]) {
        this.dataSave = {
            "received": {}
        }
    }
    this.lastPublishTime = [new Date(0), new Date(0), new Date(0), new Date(0), new Date(0), new Date(0), new Date(0), new Date(0), new Date(0), new Date(0), new Date(0), new Date(0), new Date(0), new Date(0), new Date(0), new Date(0), new Date(0), new Date(0), new Date(0), new Date(0)],
        this.minPublishInterval = 500,
        this.client = mqtt.connect('ws://localhost:8083', {
            'clientId': "MixIO_" + Math.random().toString(16).substr(2, 8),
            'username': userName,
            'password': projectPass
        }).on('connect', function() {
            this.subscribe(userName + "/" + projectName + "/" + "#")
        }).on('message', function(topic, message) {
            var saveTopic = topic.split('/').pop()
            var saveMessage = stringendecoder.encodeHtml(String(message))
            var addJSON = {
                "时间": timeStamp2String(),
                "值": saveMessage
            }
            if (saveTopic in that.dataSave["received"]) {
                that.dataSave["received"][saveTopic].unshift(addJSON)
            } else {
                that.dataSave["received"][saveTopic] = [addJSON]
            }
        }),
        this.publish = function(topic, message) {
            var newPublishTime = new Date()
            if (newPublishTime - this.lastPublishTime[0] >= this.minPublishInterval) {
                this.client.publish(userName + '/' + projectName + '/' + topic.toString(), message.toString())
                this.lastPublishTime.shift()
                this.lastPublishTime.push(new Date())
            } else {
                //MixIO.log(JSLang[lang].speedLimit)
                that.stop_project()

            }
        },
        this.activedom = (new JSDOM("<div id='grid'></div>")).window,
        this.$ = function(activedom) {
            return jq(activedom)
        }(this.activedom),
        this.isRunning = true,
        this.listeners_to_be_removed = [],
        this.timers_to_be_removed = [],
        this.cycles_to_be_removed = [],
        this.stop_project = function() {
            that.isRunning = false
            this.client.end()
            this.safe_pause()
            db.run("update `project` set dataStorage=? where userName=? and projectName=?", [JSON.stringify(that.dataSave), userName, projectName], function(err) {})
        },
        this.safe_pause = function() {
            this.isRunning = false
            for (listener in this.listeners_to_be_removed) {
                for (eventIndex in this.client._events.message) {
                    if (this.client._events.message[eventIndex] == this.listeners_to_be_removed[listener]) {
                        this.client._events.message.splice(eventIndex, 1)
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
            for (tagIndex in this.eventTags)
                this.$('*[user-title]').unbind(this.eventTags[tagIndex])
        },

        /*合法的MixIO组件种类*/
        this.typeTags = {
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
            WEATHER: 13
        },

        this.oldTags = ["input_button", "input_slider", "input_keyboard", "input_controller", "input_rgb", "output_bulb", "output_text",
            "output_chart", "output_bar", "table", "output_dashboard", "output_map", "input_weather"
        ],
        this.zhcnTags = ["按键/开关", "滑杆", "文本输入", "摇杆手柄", "RGB色盘", "指示灯", "文本显示屏", "折线图表", "柱状图表", "数据表格", "仪表盘", "数据地图", "实时气象仪"],

        /*合法的MixIO事件种类*/
        this.eventTags = {
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
            WEATHER_SENT: "1312" //气象仪发送数据

        },

        /*合法的MixIO行为种类*/
        this.actionTags = {

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
            WEATHER_SEND: "1322" //发送气象仪数据

        },

        this.setInterval = function(triggerFunction, intervalTime) {
            this.cycles_to_be_removed.push(setInterval(
                function() {
                    try {
                        triggerFunction()
                    } catch (e) {
                        console.log(e.message)
                        that.errorMessage = e.toString()
                        that.stop_project()
                    }
                }, intervalTime))
        },

        this.setTimeout = function(triggerFunction, waitTime) {
            this.timers_to_be_removed.push(setTimeout(
                function() {
                    try {
                        triggerFunction()
                    } catch (e) {
                        that.errorMessage = e.toString()
                        that.stop_project()
                    }
                }, waitTime))
        },

        this.onMessage = function(trigger) {
            var toBeRemoved = function(topic, message) {
                var splitTopic = topic.split('/').pop()
                try {
                    trigger(splitTopic, message)
                } catch (e) {
                    that.errorMessage = e.toString()
                    that.stop_project()
                }
            }
            this.client.on("message", toBeRemoved)
            this.listeners_to_be_removed.push(toBeRemoved)
        },

        this.isValidType = function(typeTag) {
            for (target in this.typeTags) {
                if (typeTag === this.typeTags[target])
                    return true;
            }
            return false;
        },

        /*获取组件实例*/
        this.getInstance = function(name, type) {
            if (!this.isValidType(type))
                throw new MixIOLogicError(JSLang[lang].invalidUType)
            var instance = this.$("[" + "user-title='" + name + "']")
            if (instance.length != 1)
                throw new MixIOLogicError(JSLang[lang].noUnitFound)
            if (instance.attr("user-type") != this.oldTags[type - 1])
                throw new MixIOLogicError(JSLang[lang].invalidUType)
            instance.toString = function() {
                return this.zhcnTags[type - 1] + ":" + name
            }
            if (type === this.typeTags.BUTTON) {
                //获取开关状态
                instance.isOn = function() {
                    return instance.attr('user-content') == '1'
                }
            } else if (type === this.typeTags.SLIDER) {
                //获取滑杆数值
                instance.getValue = function() {
                    return parseFloat(instance.attr('user-content').split(',')[3])
                }
            } else if (type === this.typeTags.JOYSTICK) {
                //获取摇杆横坐标
                instance.getX = function() {
                        return parseInt(instance.attr('user-content').split(',')[0])
                    }
                    //获取摇杆纵坐标
                instance.getY = function() {
                    return parseInt(instance.attr('user-content').split(',')[1])
                }
            } else if (type === this.typeTags.KEYBOARD) {
                instance.getText = function() {
                    return instance.attr('user-content')
                }
            } else if (type === this.typeTags.RGB_PICKER) {
                //获取RGB色盘当前颜色
                instance.getColor = function() {
                    var tmp = instance.attr('user-content').split(',')
                    for (i in tmp) {
                        tmp[i] = parseInt(tmp[i])
                    }
                    return tmp
                }
            } else if (type === this.typeTags.BULB) {
                //获取指示灯当前状态
                instance.getStatus = function() {
                    return instance.attr('user-content')
                }
            } else if (type === this.typeTags.TEXT_SCREEN) {
                //获取文本显示屏的当前显示
                instance.getText = function() {
                    return instance.attr('user-content')
                }
            } else if (type === this.typeTags.LINE_CHART) {
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
            } else if (type === this.typeTags.BAR_CHART) {
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
            } else if (type === this.typeTags.DATA_TABLE) {
                var allMsg = instance.attr('user-content').split(',')
                var sepMsgs = {}
                var colCount = parseInt(allMsg[0])
                for (var i = 0; i < colCount; i = i + 1) {
                    sepMsgs[allMsg[i + 1]] = []
                }
                for (var i = 1 + colCount; i < allMsg.length; i = i + 1) {
                    sepMsgs[allMsg[(i - 1 - colCount) % colCount + 1]].push(allMsg[i])
                }
                //获取数据表格的全部数据
                instance.getData = function() {
                    return sepMsgs
                }
            } else if (type === this.typeTags.DASHBOARD) {
                //获取仪表盘的当前值
                instance.getValue = function() {
                    return instance.attr('user-content').split(',')[2]
                }
            } else if (type === this.typeTags.WEATHER) {
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
            }
            return instance
        },
        this.getClientid = function() {
            return this.client.options.clientId
        },
        this.getLong = function() {
            return curlong
        },
        this.getLati = function() {
            return curlati
        },
        this.makedom = function() {
            var grid = that.$("#grid")
            var client = that.client
            var units_array = that.$(dom)
            var $ = that.$
            var isMixly = false
            var MixIO = that
            var add_block = function(width, height, contents, attrs) {
                var itemdiv = $("<div/>")
                itemdiv.attr("class", "item")
                contentdiv = $("<div/>")
                contentdiv.attr("class", "item-content")
                for (content in contents)
                    contentdiv.append(contents[content])
                for (attr in attrs)
                    itemdiv.attr(attrs[attr][0], attrs[attr][1])
                itemdiv.append(contentdiv)
                grid.append(itemdiv[0])
                return itemdiv
            }
            var toolkits = {
                'input_button': function(user_title, user_topic, user_content, user_style) {
                    var isAlive = true
                    var contents = []
                    var title = $("<h4 class='userTitle'>" + user_title + "</h4>")
                    contents.push(title)
                    var topicDiv = $("<div class='topicDiv'/>")
                    var topic = $("<span class='index-topic' style='margin:0;color:#858796;'>" + user_topic + "</span>")
                    topicDiv.append($("<i class='fa fa-podcast' style='color:#858796;margin-right:3px'></i>"))
                    topicDiv.append(topic)
                    var button = $("<label class='switch' style='margin-bottom:0'></label>")
                    var button2 = $("<a class='pushButton'/>")
                    var checkbox = $("<input type='checkbox'>")
                    if (user_content == 1)
                        checkbox.prop('checked', true)
                    else
                        checkbox.prop('checked', false)
                    var checkDiv = $("<div class='slider round'></div>")
                    button.append(checkbox)
                    button.append(checkDiv)
                    contents.push(button)
                    contents.push(button2)
                    client.on('message', function(topic1, message1) {
                        if (isAlive && that.isRunning)
                            if (title.parent().parent().attr('user-content') != 2 && topic1.split("/")[(isMixly ? 3 : 2)] == topic.text()) {
                                if (message1 == 0) {
                                    checkbox.prop('checked', false)
                                    title.parent().parent().attr('user-content', 0)
                                } else if (message1 == 1) {
                                    checkbox.prop('checked', true)
                                    title.parent().parent().attr('user-content', 1)
                                }
                                itemdiv.trigger(MixIO.eventTags.BUTTON_CHANGED, [Uint8ArrayToString(message1)])
                            }
                    })
                    attrs = [
                        ['user-type', 'input_button'],
                        ['user-title', user_title],
                        ['user-topic', user_topic],
                        ['user-content', user_content]
                    ]
                    var itemdiv = add_block(1, 1, contents, attrs)
                    itemdiv.bind(MixIO.actionTags.BUTTON_SWITCH, function(event, status) {
                        checkbox.prop('checked', !!status)
                        MixIO.publish(topic.text(), (!!status) ? 1 : 0)
                    })
                },
                'input_slider': function(user_title, user_topic, user_content, user_style) {
                    var isAlive = true
                    var contents = []
                    var title = $("<h4 class='userTitle'>" + user_title + "</h4>")
                    contents.push(title)
                    var topicDiv = $("<div class='topicDiv'/>")
                    var topic = $("<span class='index-topic' style='margin:0;color:#858796;'>" + user_topic + "</span>")
                    topicDiv.append($("<i class='fa fa-podcast' style='color:#858796;margin-right:3px'></i>"))
                    topicDiv.append(topic)
                    var sliderDiv = $("<div style='width:100%;display:flex;flex-direction:row;justify-content:center'/>")
                    var slider = $("<input type='range' min='0' max='10' step='1' value='0'></input>")
                    sliderDiv.append(slider)
                    contents.push(sliderDiv)
                    attrs = [
                        ['user-type', 'input_slider'],
                        ['user-title', user_title],
                        ['user-topic', user_topic],
                        ['user-content', user_content]
                    ]
                    var itemdiv = add_block(3, 1, contents, attrs)
                    client.on('message', function(topic1, message1) {
                        if (isAlive && that.isRunning)
                            if (topic1.split("/")[(isMixly ? 3 : 2)] == topic.text()) {
                                if (!isNaN(parseFloat(message1))) {
                                    var val = parseFloat(message1)
                                    if (val >= slider.attr('min') && val <= slider.attr('max')) {
                                        slider.val(val)
                                        title.parent().parent().attr('user-content', slider.attr('min') + "," + slider.attr('max') + "," + slider.attr('step') + "," + slider.val())
                                    }
                                }
                                itemdiv.trigger(MixIO.eventTags.SLIDER_CHANGED, [parseFloat(message1)])
                            }
                    })
                    itemdiv.bind(MixIO.actionTags.SLIDER_SEND, function(event, val) {
                        if (val >= slider.attr('min') && val <= slider.attr('max')) {
                            slider.val(val)
                        }
                        MixIO.publish(topic.text(), val)
                    })
                    var vals = user_content.split(',')
                    slider.attr('min', vals[0])
                    slider.attr('max', vals[1])
                    slider.attr('step', vals[2])
                    slider.val(vals[3])
                },
                'input_keyboard': function(user_title, user_topic, user_content, user_style) {
                    var isAlive = true
                    var contents = []
                    var title = $("<h4 class='userTitle'>" + user_title + "</h4>")
                    contents.push(title)
                    var topicDiv = $("<div class='topicDiv'/>")
                    var topic = $("<span class='index-topic' style='margin:0;color:#858796;'>" + user_topic + "</span>")
                    topicDiv.append($("<i class='fa fa-podcast' style='color:#858796;margin-right:3px'></i>"))
                    topicDiv.append(topic)
                    attrs = [
                        ['user-type', 'input_keyboard'],
                        ['user-title', user_title],
                        ['user-topic', user_topic],
                        ['user-content', user_content]
                    ]
                    var keyDiv = $("<div style='width:100%;display:flex;flex-direction:row;justify-content:center;align-items:center'/>")
                    var messDiv = $("<input class='form-control' style='width:70%;min-width:0px'/>")
                    messDiv.val(stringendecoder.decodeHtml(user_content))
                    keyDiv.append(messDiv)
                    contents.push(keyDiv)
                    var itemdiv = add_block(3, 1, contents, attrs)
                    itemdiv.bind(MixIO.actionTags.KEYBOARD_SEND, function(event, message) {
                        messDiv.val(message)
                        MixIO.publish(topic.text(), messDiv.val())
                    })
                },
                'input_controller': function(user_title, user_topic, user_content, user_style) {
                    var isAlive = true
                    var contents = []
                    var title = $("<h4 class='userTitle'>" + user_title + "</h4>")
                    contents.push(title)
                    var topicDiv = $("<div class='topicDiv'/>")
                    var topic = $("<span class='index-topic' style='margin:0;color:#858796;'>" + user_topic + "</span>")
                    topicDiv.append($("<i class='fa fa-podcast' style='color:#858796;margin-right:3px'></i>"))
                    topicDiv.append(topic)
                    var controllerDiv = $("<div style='width:70%;height:70%;'/>")
                    contents.push(controllerDiv)
                    attrs = [
                        ['user-type', 'input_controller'],
                        ['user-title', user_title],
                        ['user-content', "0,0"],
                        ['user-topic', user_topic]
                    ]
                    var itemdiv = add_block(2, 2, contents, attrs)
                    itemdiv.bind(MixIO.actionTags.JOYSTICK_SEND, function(event, x, y) {
                        MixIO.publish(topic.text(), x + "," + y)
                    })
                },
                'input_rgb': function(user_title, user_topic, user_content, user_style) {
                    var isAlive = true
                    var contents = []
                    var title = $("<h4 class='userTitle'>" + user_title + "</h4>")
                    contents.push(title)
                    var topicDiv = $("<div style='margin-top:5px;margin-bottom:5px;font-size:0.75rem'/>")
                    var Rtopic = $("<span class='index-topic' style='margin:0;color:#858796;;margin-right:10px'>" + user_topic.split('/')[0] + "</span>")
                    topicDiv.append($("<i class='fa fa-podcast' style='color:#e74a3b;margin-right:3px'></i>"))
                    topicDiv.append(Rtopic)
                    var Gtopic = $("<span class='index-topic' style='margin:0;color:#858796;;margin-right:10px'>" + user_topic.split('/')[1] + "</span>")
                    topicDiv.append($("<i class='fa fa-podcast' style='color:#1cc88a;margin-right:3px'></i>"))
                    topicDiv.append(Gtopic)
                    var Btopic = $("<span class='index-topic' style='margin:0;color:#858796;'>" + user_topic.split('/')[2] + "</span>")
                    topicDiv.append($("<i class='fa fa-podcast' style='color:#4e73df;margin-right:3px'></i>"))
                    topicDiv.append(Btopic)
                    var RGBDiv = $("<div style='color:black;margin-right:10px;display:flex;flex-direction:column;align-items:center'/>")
                    var RDiv = $("<div style='display:flex;flex-direction:row;align-items:center;justify-content:center;margin-top:5px;margin-bottom:5px'/>")
                    var GDiv = $("<div style='display:flex;flex-direction:row;align-items:center;justify-content:center;margin-top:5px;margin-bottom:5px'/>")
                    var BDiv = $("<div style='display:flex;flex-direction:row;align-items:center;justify-content:center;margin-top:5px;margin-bottom:5px'/>")
                    var RInput = $("<input class='form-control' style='width:45px;padding:3px;min-width:0px' readonly>")
                    var GInput = $("<input class='form-control' style='width:45px;padding:3px;min-width:0px' readonly>")
                    var BInput = $("<input class='form-control' style='width:45px;padding:3px;min-width:0px' readonly>")
                    RInput.val(user_content.split(',')[0])
                    GInput.val(user_content.split(',')[1])
                    BInput.val(user_content.split(',')[2])
                    RDiv.append(RInput)
                    GDiv.append(GInput)
                    BDiv.append(BInput)
                    RGBDiv.append(RDiv)
                    RGBDiv.append(GDiv)
                    RGBDiv.append(BDiv)
                    contents.push(RGBDiv)
                    attrs = [
                        ['user-type', 'input_rgb'],
                        ['user-title', user_title],
                        ['user-topic', user_topic],
                        ['user-content', user_content]
                    ]
                    var itemdiv = add_block(3, 3, contents, attrs)
                    itemdiv.bind(MixIO.actionTags.RGB_PICKER_SEND, function(event, r, g, b) {
                        MixIO.publish(Rtopic.text(), r)
                        MixIO.publish(Gtopic.text(), g)
                        MixIO.publish(Btopic.text(), b)
                    })
                    client.on('message', function(topic1, message1) {
                        if (isAlive && that.isRunning)
                            if (topic1.split("/")[(isMixly ? 3 : 2)] == Rtopic.text()) {
                                if (!isNaN(parseInt(message1))) {
                                    var val = parseInt(message1)
                                    if (val >= 0 && val <= 255) {
                                        RInput.val(val)
                                        title.parent().parent().attr('user-content', RInput.val() + "," + GInput.val() + "," + BInput.val())
                                        itemdiv.trigger(MixIO.eventTags.RGB_PICKER_CHANGED, [val, -1, -1])
                                    }
                                }
                            }
                        if (isAlive && that.isRunning)
                            if (topic1.split("/")[(isMixly ? 3 : 2)] == Gtopic.text()) {
                                if (!isNaN(parseInt(message1))) {
                                    var val = parseInt(message1)
                                    if (val >= 0 && val <= 255) {
                                        GInput.val(val)
                                        title.parent().parent().attr('user-content', RInput.val() + "," + GInput.val() + "," + BInput.val())
                                        itemdiv.trigger(MixIO.eventTags.RGB_PICKER_CHANGED, [-1, val, -1])
                                    }
                                }
                            }
                        if (isAlive && that.isRunning)
                            if (topic1.split("/")[(isMixly ? 3 : 2)] == Btopic.text()) {
                                if (!isNaN(parseInt(message1))) {
                                    var val = parseInt(message1)
                                    if (val >= 0 && val <= 255) {
                                        BInput.val(val)
                                        title.parent().parent().attr('user-content', RInput.val() + "," + GInput.val() + "," + BInput.val())
                                        itemdiv.trigger(MixIO.eventTags.RGB_PICKER_CHANGED, [-1, -1, val])
                                    }
                                }
                            }
                    })
                },
                'output_bulb': function(user_title, user_topic, user_content, user_style) {
                    var isAlive = true
                    var contents = []
                    var title = $("<h4 class='userTitle'>" + user_title + "</h4>")
                    contents.push(title)
                    var topicDiv = $("<div class='topicDiv'/>")
                    var topic = $("<span class='index-topic' style='margin:0;color:#858796;'>" + user_topic + "</span>")
                    topicDiv.append($("<i class='fa fa-podcast' style='color:#858796;margin-right:3px'></i>"))
                    topicDiv.append(topic)
                    attrs = [
                        ['user-type', 'output_bulb'],
                        ['user-title', user_title],
                        ['user-topic', user_topic],
                        ['user-content', user_content]
                    ]
                    var itemdiv = add_block(1, 1, contents, attrs)
                    itemdiv.bind(MixIO.actionTags.BULB_CHANGE, function(event, status) {
                        MixIO.publish(topic.text(), status)
                    })
                    client.on('message', function(topic1, message1) {
                        if (isAlive && that.isRunning)
                            if (topic1.split("/")[(isMixly ? 3 : 2)] == topic.text()) {
                                if (message1 == 0) {
                                    title.parent().parent().attr('user-content', 0)
                                } else if (message1 == 1) {
                                    title.parent().parent().attr('user-content', 1)
                                } else if (message1 == 2) {
                                    title.parent().parent().attr('user-content', 2)
                                } else if (message1 == 3) {
                                    title.parent().parent().attr('user-content', 3)
                                }
                                itemdiv.trigger(MixIO.eventTags.BULB_CHANGED, [Uint8ArrayToString(message1)])
                            }
                    })
                },
                'output_text': function(user_title, user_topic, user_content, user_style) {
                    var isAlive = true
                    var contents = []
                    var title = $("<h4 class='userTitle'>" + user_title + "</h4>")
                    contents.push(title)
                    var topicDiv = $("<div class='topicDiv'/>")
                    var topic = $("<span class='index-topic' style='margin:0;color:#858796;'>" + user_topic + "</span>")
                    topicDiv.append($("<i class='fa fa-podcast' style='color:#858796;margin-right:3px'></i>"))
                    topicDiv.append(topic)
                    var textDiv = $("<div/>")
                    textDiv.text(stringendecoder.decodeHtml(user_content))
                    textDiv.attr('class', 'mid_screen')
                    contents.push(textDiv)
                    attrs = [
                        ['user-type', 'output_text'],
                        ['user-title', user_title],
                        ['user-topic', user_topic],
                        ['user-content', user_content]
                    ]
                    var itemdiv = add_block(2, 2, contents, attrs)
                    itemdiv.bind(MixIO.actionTags.TEXT_SCREEN_CHANGE, function(event, message) {
                        MixIO.publish(topic.text(), message)
                    })
                    client.on('message', function(topic1, message1) {
                        if (isAlive && that.isRunning)
                            if (topic1.split("/")[(isMixly ? 3 : 2)] == topic.text()) {
                                textDiv.text(message1)
                                title.parent().parent().attr('user-content', stringendecoder.encodeHtml(String(message1)))
                                itemdiv.trigger(MixIO.eventTags.TEXT_SCREEN_CHANGED, [String(message1)])
                            }
                    })
                },
                'output_chart': function(user_title, user_topic, user_content, user_style) {
                    var isAlive = true
                    var contents = []
                    var titleDiv = $("<div style='display:flex;flex-direction:row;justify-content:center;align-items:center;margin-top:10px'/>")
                    var title = $("<h4 class='userTitle'>" + user_title + "</h4>")
                    titleDiv.append(title)
                    contents.push(titleDiv)
                    var topicDiv = $("<div class='topicDiv'/>")
                    var topic = $("<span class='index-topic' style='color:#858796;margin:0;'>" + user_topic + "</span>")
                    topicDiv.append($("<i class='fa fa-podcast' style='color:#858796;margin-right:3px'></i>"))
                    topicDiv.append(topic)
                    client.on('message', function(topic1, message1) {
                        if (isAlive && that.isRunning)
                            if ((topic1.split("/")[(isMixly ? 3 : 2)] == topic.text())) {
                                var label = (new Date().getHours() + ":" + (new Date().getMinutes() < 10 ? "0" : "") + new Date().getMinutes() + ":" + (new Date().getSeconds() < 10 ? "0" : "") + new Date().getSeconds())
                                var data = String(message1)
                                itemdiv.trigger(MixIO.eventTags.LINE_CHART_CHANGED, [label, data])
                            }
                    })
                    attrs = [
                        ['user-type', 'output_chart'],
                        ['user-title', user_title],
                        ['user-topic', user_topic],
                        ['user-content', user_content]
                    ]
                    var itemdiv = add_block(3, 3, contents, attrs)
                    itemdiv.addClass("moveDiv")
                    itemdiv.bind(MixIO.actionTags.LINE_CHART_CHANGE, function(event, value) {
                        MixIO.publish(topic.text(), value)
                    })
                    itemdiv.bind(MixIO.actionTags.LINE_CHART_CLEAR, function() {

                    })

                },
                'output_bar': function(user_title, user_topic, user_content, user_style) {
                    var isAlive = true
                    var contents = []
                    var titleDiv = $("<div style='display:flex;flex-direction:row;justify-content:center;align-items:center;margin-top:10px'/>")
                    var title = $("<h4 class='userTitle'>" + user_title + "</h4>")
                    titleDiv.append(title)
                    contents.push(titleDiv)
                    var topicDiv = $("<div class='topicDiv'/>")
                    var topic = $("<span class='index-topic' style='margin:0;color:#858796;'>" + user_topic + "</span>")
                    topicDiv.append($("<i class='fa fa-podcast' style='color:#858796;margin-right:3px'></i>"))
                    topicDiv.append(topic)
                    client.on('message', function(topic1, message1) {
                        if (isAlive && that.isRunning)
                            if ((topic1.split("/")[(isMixly ? 3 : 2)] == topic.text())) {
                                var data = String(message1)
                                itemdiv.trigger(MixIO.eventTags.BAR_CHART_CHANGED, [data])
                            }
                    })
                    attrs = [
                        ['user-type', 'output_bar'],
                        ['user-title', user_title],
                        ['user-topic', user_topic],
                        ['user-content', user_content]
                    ]
                    var itemdiv = add_block(3, 3, contents, attrs)
                    itemdiv.bind(MixIO.actionTags.BAR_CHART_CHANGE, function(event, message) {
                        MixIO.publish(topic.text(), message)
                    })
                    itemdiv.bind(MixIO.actionTags.BAR_CHART_CLEAR, function() {

                    })
                },
                'output_dashboard': function(user_title, user_topic, user_content, user_style) {
                    var isAlive = true
                    var contents = []
                    var title = $("<h4 class='userTitle'>" + user_title + "</h4>")
                    contents.push(title)
                    var topicDiv = $("<div class='topicDiv'/>")
                    var topic = $("<span class='index-topic' style='margin:0;color:#858796;'>" + user_topic + "</span>")
                    topicDiv.append($("<i class='fa fa-podcast' style='color:#858796;margin-right:3px'></i>"))
                    topicDiv.append(topic)
                    attrs = [
                        ['user-type', 'output_dashboard'],
                        ['user-title', user_title],
                        ['user-topic', user_topic],
                        ['user-content', user_content]
                    ]
                    var itemdiv = add_block(2, 2, contents, attrs)
                    client.on('message', function(topic1, message1) {
                        if (isAlive && that.isRunning)
                            if (topic1.split("/")[(isMixly ? 3 : 2)] == topic.text()) {
                                if (!isNaN(parseFloat(message1))) {
                                    itemdiv.trigger(MixIO.eventTags.DASHBOARD_CHANGED, [parseFloat(message1)])
                                }
                            }
                    })
                    itemdiv.bind(MixIO.actionTags.DASHBOARD_CHANGE, function(event, value) {
                        MixIO.publish(topic.text(), value)
                    })
                },
                'output_map': function(user_title, user_topic, user_content, user_style) {
                    var isAlive = true
                    var contents = []
                    var title = $("<h4 class='userTitle'>" + user_title + "</h4>")
                    contents.push(title)
                    var topicDiv = $("<div class='topicDiv'/>")
                    var topic = $("<span class='index-topic' style='margin:0;color:#858796;'>" + user_topic + "</span>")
                    topicDiv.append($("<i class='fa fa-podcast' style='color:#858796;margin-right:3px'></i>"))
                    topicDiv.append(topic)
                    var mapDiv = $("<div style='width:calc(100% - 20px);height:calc(100% - 60px)'/>")
                    contents.push(mapDiv)
                    attrs = [
                        ['user-type', 'output_map'],
                        ['user-title', user_title],
                        ['user-topic', user_topic],
                        ['user-content', user_content]
                    ]
                    var itemdiv = add_block(2, 2, contents, attrs)
                    itemdiv.bind(MixIO.actionTags.DATA_MAP_CHANGE, function(event, message) {
                        MixIO.publish(topic.text(), JSON.stringify(message))
                    })
                    itemdiv.bind(MixIO.actionTags.DATA_MAP_CLEAR, function() {

                    })
                    client.on('message', function(topic1, message1) {
                        if (isAlive && that.isRunning)
                            if (topic1.split("/")[(isMixly ? 3 : 2)] == topic.text()) {
                                if (isJSON(String(message1)) && JSON.parse(String(message1)).long && JSON.parse(String(message1)).lat && JSON.parse(String(message1)).clientid) {
                                    var jsonMessage = JSON.parse(String(message1))
                                    itemdiv.trigger(MixIO.eventTags.DATA_MAP_CHANGED, [jsonMessage.clientid, jsonMessage.long, jsonMessage.lat, jsonMessage.message])
                                }
                            }
                    })
                },
                'input_weather': function(user_title, user_topic, user_content, user_style) {
                    var isAlive = true
                    var contents = []
                    var title = $("<h4 class='userTitle'>" + user_title + "</h4>")
                    contents.push(title)
                    var topicDiv = $("<div class='topicDiv'/>")
                    var topic = $("<span class='index-topic' style='margin:0;color:#858796;'>" + user_topic + "</span>")
                    topicDiv.append($("<i class='fa fa-podcast' style='color:#858796;margin-right:3px'></i>"))
                    topicDiv.append(topic)
                    var buttonDiv = $("<div style='margin-top:10px'/>")
                    var district = ''
                    var weather_type = ''
                    var temperature = ''
                    var humidity = ''
                    var wind_dir = ''
                    var wind_class = ''
                    contents.push(buttonDiv)
                    attrs = [
                        ['user-type', 'input_weather'],
                        ['user-title', user_title],
                        ['user-topic', user_topic],
                        ['user-content', user_content]
                    ]
                    var itemdiv = add_block(2, 2, contents, attrs)
                    var sync_weather = function(){
                        var dsc_code = title.parent().parent().attr('user-content').split(',')[0].split('w')[0]
                        if(globalWeather[dsc_code] && globalWeather[dsc_code].time && (new Date().getTime() - globalWeather[dsc_code].time) < 600000) {
                            var result = globalWeather[dsc_code].data
                            var resJSON = JSON.parse(result)
                            weather_type = resJSON.result.now.text
                            temperature = resJSON.result.now.temp
                            humidity = resJSON.result.now.rh
                            wind_dir = resJSON.result.now.wind_dir                                
                            wind_class = resJSON.result.now.wind_class
                            district = resJSON.result.location.name
                            title.parent().parent().attr('user-content', [title.parent().parent().attr('user-content').split(',')[0], district, weather_type, temperature, humidity, wind_dir, wind_class].join(','))
                            itemdiv.trigger(MixIO.eventTags.WEATHER_SYNCED, [district, weather_type, temperature, humidity, wind_dir, wind_class])
                        } else {
                            http.get('http://api.map.baidu.com/weather/v1/?district_id=' + dsc_code + '&data_type=now&ak=' + configs["BAIDU_MAP_SERVER_AK"], function(req2, res2) {
                                var html = ''
                                req2.on('data', function(data) {
                                    html += data;
                                });
                                req2.on('end', function() {
                                    globalWeather[dsc_code] = {
                                        time: new Date().getTime(),
                                        data: html
                                    }
                                    var result = html
                                    var resJSON = JSON.parse(result)
                                    if(resJSON.result && resJSON.result.now)
                                    {
                                        weather_type = resJSON.result.now.text
                                        temperature = resJSON.result.now.temp
                                        humidity = resJSON.result.now.rh
                                        wind_dir = resJSON.result.now.wind_dir
                                        wind_class = resJSON.result.now.wind_class
                                        district = resJSON.result.location.name
                                        title.parent().parent().attr('user-content', [title.parent().parent().attr('user-content').split(',')[0], district, weather_type, temperature, humidity, wind_dir, wind_class].join(','))
                                        itemdiv.trigger(MixIO.eventTags.WEATHER_SYNCED, [district, weather_type, temperature, humidity, wind_dir, wind_class])
                                    }
                                });
                            })
                        }
                    }
                    itemdiv.bind(MixIO.actionTags.WEATHER_SYNC, function() {
                        sync_weather()
                    })
                    sync_weather()
                    itemdiv.bind(MixIO.actionTags.WEATHER_SEND, function() {
                        var weather = {
                            'district': district,
                            'weather_type': weather_type,
                            'temperature': temperature,
                            'humidity': humidity,
                            'wind_dir': wind_dir,
                            'wind_class': wind_class
                        }
                        MixIO.publish(topic.text(), JSON.stringify(weather))
                        itemdiv.trigger(MixIO.eventTags.WEATHER_SENT, [district, weather_type, temperature, humidity, wind_dir, wind_class])
                    })
                },
                'trigger': function() {
                    //Removed
                },
                'table': function(user_title, user_topic, user_content, user_style) {
                    var isAlive = true
                    client.on('message', function(topic1, message1) {
                        if (isAlive && that.isRunning)
                            if (topic1.split("/")[(isMixly ? 3 : 2)] == topic.text()) {
                                var message = String(message1).split(',')
                                itemdiv.trigger(MixIO.eventTags.DATA_TABLE_CHANGED, [message])
                            }
                    })
                    var contents = []
                    var title = $("<h4 class='userTitle'>" + user_title + "</h4>")
                    contents.push(title)
                    var topicDiv = $("<div class='topicDiv'/>")
                    var topic = $("<span class='index-topic' style='margin:0;color:#858796;'>" + user_topic + "</span>")
                    topicDiv.append($("<i class='fa fa-podcast' style='color:#858796;margin-right:3px'></i>"))
                    topicDiv.append(topic)
                    attrs = [
                        ['user-type', 'table'],
                        ['user-title', user_title],
                        ['user-topic', user_topic],
                        ['user-content', user_content]
                    ]
                    var itemdiv = add_block(3, 3, contents, attrs)
                    itemdiv.bind(MixIO.actionTags.DATA_TABLE_CHANGE, function(event, message) {
                        MixIO.publish(topic.text(), message)
                    })
                    itemdiv.bind(MixIO.actionTags.DATA_TABLE_CLEAR, function() {

                    })
                },
                'decorate_text': function() {},
                'decorate_pic': function() {}
            }
            for (var ct = 0; ct <= units_array.length - 1; ct = ct + 1) {
                var un = $(units_array[ct])
                toolkits[un.attr('user-type')](un.attr('user-title'), un.attr('user-topic'), un.attr('user-content'), un.attr('style'))
            }
        }()
}

function Uint8ArrayToString(fileData) {
    var dataString = "";
    for (var i = 0; i < fileData.length; i++) {
        dataString += String.fromCharCode(fileData[i]);
    }
    return dataString;
}

function timeStamp2String() {
    var datetime = new Date();
    var year = datetime.getFullYear();
    var month = datetime.getMonth() + 1 < 10 ? "0" + (datetime.getMonth() + 1) : datetime.getMonth() + 1;
    var date = datetime.getDate() < 10 ? "0" + datetime.getDate() : datetime.getDate();
    var hour = datetime.getHours() < 10 ? "0" + datetime.getHours() : datetime.getHours();
    var minute = datetime.getMinutes() < 10 ? "0" + datetime.getMinutes() : datetime.getMinutes();
    var second = datetime.getSeconds() < 10 ? "0" + datetime.getSeconds() : datetime.getSeconds();
    return year + "-" + month + "-" + date + " " + hour + ":" + minute + ":" + second;
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