'use strict';
/**
 * NW 打包暂存副本补丁（不改仓库源码）：路径 / 性能 / HTTPS 优先。
 */
const fs = require('fs');

function detectEol(text) {
  return text.includes('\r\n') ? '\r\n' : '\n';
}
function toLf(text) {
  return text.replace(/\r\n/g, '\n');
}
function fromLf(text, eol) {
  return eol === '\r\n' ? text.replace(/\n/g, '\r\n') : text;
}
function applyOnce(text, marker, needle, replacement, label) {
  if (text.includes(marker)) return { text, changed: false };
  if (!text.includes(needle)) {
    throw new Error('patch-mixio-for-nw: needle not found (' + label + ')');
  }
  return { text: text.replace(needle, replacement), changed: true };
}

const LAZY_DOM_NEEDLE = `const jsdom = require("jsdom");
const { JSDOM } = jsdom;
var jq = require("jquery");
`;
const LAZY_DOM_REPLACEMENT = `var JSDOM = null;
var jq = null;
function __mixioEnsureDom() {
    if (!JSDOM) {
        JSDOM = require("jsdom").JSDOM;
        jq = require("jquery");
    }
    return JSDOM;
}
`;

const LAZY_DOM_USE_NEEDLE = `        this.activedom = (new JSDOM("<div id='grid'></div>")).window,
        this.$ = function(activedom) {
            return jq(activedom)
        }(this.activedom),
`;
const LAZY_DOM_USE_REPLACEMENT = `        this.activedom = (new (__mixioEnsureDom())("<div id='grid'></div>")).window,
        this.$ = function(activedom) {
            return jq(activedom)
        }(this.activedom),
`;

const BUSY_WAIT_NEEDLE = `                    for (var t = Date.now(); Date.now() - t <= 2000;);
`;
const BUSY_WAIT_REPLACEMENT = `                    // NW patch: removed 2s busy-wait
`;

const PKG_TEMP_NEEDLE = `if (process.platform == "win32") {
    try{
        fs.emptyDirSync(process.env.TEMP + "/pkg")
`;
const PKG_TEMP_REPLACEMENT = `if (process.platform == "win32" && process.env.MIXIO_NW_SPAWN !== '1') {
    try{
        fs.emptyDirSync(process.env.TEMP + "/pkg")
`;

const NTP_NEEDLE = `    const NTPServer = require('ntp-time').Server;
    const nserver = new NTPServer();
    nserver.handle((message, response) => {
        message.transmitTimestamp = Math.floor(Date.now() / 1000);
        response(message);
    });
    nserver.listen(123, err => {
        if(err){
            console.log("[INFO] NTP 服务器启动失败。 / NTP server failed to start");
        }
        else{
            console.log("[INFO] NTP 服务器已启动，端口: 123 / NTP server is listening on port", 123);
        }
    });
`;
const NTP_REPLACEMENT = `    // NW patch: defer NTP (port 123) so HTTPS can come up first
    setImmediate(function() {
        try {
            const NTPServer = require('ntp-time').Server;
            const nserver = new NTPServer();
            nserver.handle((message, response) => {
                message.transmitTimestamp = Math.floor(Date.now() / 1000);
                response(message);
            });
            nserver.listen(123, err => {
                if(err){
                    console.log("[INFO] NTP 服务器启动失败。 / NTP server failed to start");
                }
                else{
                    console.log("[INFO] NTP 服务器已启动，端口: 123 / NTP server is listening on port", 123);
                }
            });
        } catch (_e) {}
    });
`;

const LISTEN_OPEN_NEEDLE = `    return new Promise(resolve => {
        plainServer.listen(configs["MIXIO_MQTT_PORT"], function() {
            console.log('[INFO] MQTT 服务器已启动，端口: ' + configs["MIXIO_MQTT_PORT"] + ' / Plain MQTT server listening on port ' + configs["MIXIO_MQTT_PORT"])
            httpServer.listen(configs["MIXIO_WS_PORT"], function() {
                console.log('[INFO] WebSocket MQTT 服务器已启动，端口: ' + configs["MIXIO_WS_PORT"] + ' / WebSocket MQTT server listening on port ' + configs["MIXIO_WS_PORT"])
                httpsServer.listen(configs["MIXIO_WSS_PORT"], function() {
                    console.log('[INFO] WebSocketS MQTT 服务器已启动，端口: ' + configs["MIXIO_WSS_PORT"] + ' / WebSocketS MQTT server listening on port ' + configs["MIXIO_WSS_PORT"])
                    httpServer2 = http.createServer(app)
                    httpServer2.listen(configs['MIXIO_HTTP_PORT'], function() {
                        if (configs['MIXIO_HTTP_PORT'] != 0)
                            console.log("[INFO] MixIO 服务器 (HTTP) 已启动，端口: " + configs['MIXIO_HTTP_PORT'] + " / MixIO server (HTTP) listening on port " + configs['MIXIO_HTTP_PORT'])
                        httpsServer2 = https.createServer(credentials, app)
                        httpsServer2.listen(configs['MIXIO_HTTPS_PORT'], function() {
                            if (configs['MIXIO_HTTPS_PORT'] != 0)
                                console.log("[INFO] MixIO 服务器 (HTTPS) 已启动，端口: " + configs['MIXIO_HTTPS_PORT'] + " / MixIO server (HTTPS) listening on port " + configs['MIXIO_HTTPS_PORT'])
`;

const LISTEN_OPEN_REPLACEMENT = `    return new Promise(resolve => {
        var __mixioNwStartMqttStack = function() {
            try {
                plainServer.listen(configs["MIXIO_MQTT_PORT"], function() {
                    console.log('[INFO] MQTT 服务器已启动，端口: ' + configs["MIXIO_MQTT_PORT"] + ' / Plain MQTT server listening on port ' + configs["MIXIO_MQTT_PORT"])
                })
            } catch (_e) {}
            try {
                httpServer.listen(configs["MIXIO_WS_PORT"], function() {
                    console.log('[INFO] WebSocket MQTT 服务器已启动，端口: ' + configs["MIXIO_WS_PORT"] + ' / WebSocket MQTT server listening on port ' + configs["MIXIO_WS_PORT"])
                })
            } catch (_e) {}
            try {
                httpsServer.listen(configs["MIXIO_WSS_PORT"], function() {
                    console.log('[INFO] WebSocketS MQTT 服务器已启动，端口: ' + configs["MIXIO_WSS_PORT"] + ' / WebSocketS MQTT server listening on port ' + configs["MIXIO_WSS_PORT"])
                })
            } catch (_e) {}
        }
        httpServer2 = http.createServer(app)
        var __mixioNwStartHttpsApp = function() {
            httpsServer2 = https.createServer(credentials, app)
            httpsServer2.listen(configs['MIXIO_HTTPS_PORT'], function() {
                if (configs['MIXIO_HTTPS_PORT'] != 0)
                    console.log("[INFO] MixIO 服务器 (HTTPS) 已启动，端口: " + configs['MIXIO_HTTPS_PORT'] + " / MixIO server (HTTPS) listening on port " + configs['MIXIO_HTTPS_PORT'])
                setImmediate(__mixioNwStartMqttStack)
`;


// After HTTPS-first open, the old code still has nested closes for mqtt+http listen.
// Original close after sqlite mysql branches:
const LISTEN_CLOSE_NEEDLE = `                                reserveDBs = [db, db, db, db, db, db, db, db]
                            }
                        });
                    })
                })
            })
        })
    })
`;

const LISTEN_CLOSE_REPLACEMENT = `                                reserveDBs = [db, db, db, db, db, db, db, db]
                            }
                        });
        };
        if (configs['MIXIO_HTTP_PORT'] != 0) {
            httpServer2.listen(configs['MIXIO_HTTP_PORT'], function() {
                console.log("[INFO] MixIO 服务器 (HTTP) 已启动，端口: " + configs['MIXIO_HTTP_PORT'] + " / MixIO server (HTTP) listening on port " + configs['MIXIO_HTTP_PORT'])
                __mixioNwStartHttpsApp()
            })
        } else {
            __mixioNwStartHttpsApp()
        }
    })
`;

const READY_EARLY_NEEDLE = `                                        const njsserver = http.createServer(app)
                                        const njswss = new WebSocket.Server({
                                            server: njsserver
                                        })
                                        njswss.on('connection', (conn, req) => {
                                            setupWSConnection(conn, req)
                                        })
                                        njsserver.listen(configs["MIXIO_YJS_PORT"], () => {
                                            console.log('[INFO] Njs-WebSocket 服务器 (ws) 已启动，端口: ' + configs["MIXIO_YJS_PORT"] + ' / Njs-WebSocket server (ws) listening on port ' + configs["MIXIO_YJS_PORT"])
                                        })

                                        // 添加 HTTPS WebSocket 服务器支持
                                        const njsserverHttps = https.createServer(credentials)
                                        const njswssHttps = new WebSocket.Server({
                                            server: njsserverHttps
                                        })
                                        njswssHttps.on('connection', (conn, req) => {
                                            setupWSConnection(conn, req)
                                        })
                                        njsserverHttps.listen(configs["MIXIO_YJS_WSS_PORT"], () => {
                                            console.log('[INFO] Njs-WebSocket 服务器 (wss) 已启动，端口: ' + configs["MIXIO_YJS_WSS_PORT"] + ' / Njs-WebSocket server (wss) listening on port ' + configs["MIXIO_YJS_WSS_PORT"])
                                            console.log('[INFO] 数据库已连接！ / Database Connected!')
                                            printStartupBanner()
                                            resolve({
                                                stop: stopFunction
                                            })
                                        })
`;

const READY_EARLY_REPLACEMENT = `                                        // NW patch: mark ready as soon as HTTPS + main DB are up
                                        console.log('[INFO] 数据库已连接！ / Database Connected!')
                                        printStartupBanner()
                                        resolve({
                                            stop: stopFunction
                                        })
                                        setImmediate(function() {
                                            try {
                                                const njsserver = http.createServer(app)
                                                const njswss = new WebSocket.Server({
                                                    server: njsserver
                                                })
                                                njswss.on('connection', (conn, req) => {
                                                    setupWSConnection(conn, req)
                                                })
                                                njsserver.listen(configs["MIXIO_YJS_PORT"], () => {
                                                    console.log('[INFO] Njs-WebSocket 服务器 (ws) 已启动，端口: ' + configs["MIXIO_YJS_PORT"] + ' / Njs-WebSocket server (ws) listening on port ' + configs["MIXIO_YJS_PORT"])
                                                })
                                                const njsserverHttps = https.createServer(credentials)
                                                const njswssHttps = new WebSocket.Server({
                                                    server: njsserverHttps
                                                })
                                                njswssHttps.on('connection', (conn, req) => {
                                                    setupWSConnection(conn, req)
                                                })
                                                njsserverHttps.listen(configs["MIXIO_YJS_WSS_PORT"], () => {
                                                    console.log('[INFO] Njs-WebSocket 服务器 (wss) 已启动，端口: ' + configs["MIXIO_YJS_WSS_PORT"] + ' / Njs-WebSocket server (wss) listening on port ' + configs["MIXIO_YJS_WSS_PORT"])
                                                })
                                            } catch (_e) {}
                                        })
`;


function patchMixioJs(mixioJsPath) {
  const raw = fs.readFileSync(mixioJsPath, 'utf8');
  const eol = detectEol(raw);
  let text = toLf(raw);
  let n = 0;

  let r;
  // 旁路路径 / MixNT 回退已在 mixio.js 源码处理（MIXIO_NW_SPAWN），此处不再改路径

  r = applyOnce(text, '__mixioEnsureDom', LAZY_DOM_NEEDLE, LAZY_DOM_REPLACEMENT, 'lazy-dom-require');
  text = r.text; if (r.changed) n++;

  r = applyOnce(text, '__mixioEnsureDom()', LAZY_DOM_USE_NEEDLE, LAZY_DOM_USE_REPLACEMENT, 'lazy-dom-use');
  text = r.text; if (r.changed) n++;

  if (text.includes(BUSY_WAIT_NEEDLE)) {
    text = text.split(BUSY_WAIT_NEEDLE).join(BUSY_WAIT_REPLACEMENT);
    n++;
  }

  r = applyOnce(text, 'MIXIO_NW_SPAWN !== \'1\'', PKG_TEMP_NEEDLE, PKG_TEMP_REPLACEMENT, 'skip-pkg-temp');
  text = r.text; if (r.changed) n++;

  r = applyOnce(text, 'NW patch: defer NTP', NTP_NEEDLE, NTP_REPLACEMENT, 'defer-ntp');
  text = r.text; if (r.changed) n++;

  r = applyOnce(text, '__mixioNwStartMqttStack', LISTEN_OPEN_NEEDLE, LISTEN_OPEN_REPLACEMENT, 'https-first-open');
  text = r.text; if (r.changed) n++;

  // close braces only if https-first open applied (marker present) and old nested close still there
  if (text.includes('__mixioNwStartMqttStack') && text.includes(LISTEN_CLOSE_NEEDLE)) {
    text = text.replace(LISTEN_CLOSE_NEEDLE, LISTEN_CLOSE_REPLACEMENT);
    n++;
  } else if (text.includes('__mixioNwStartHttpsApp') && !text.includes('__mixioNwStartMqttStack')) {
    // legacy HTTP-only patch path from older builds — leave as-is if already transformed
  }

  if (!text.includes('NW patch: mark ready as soon as HTTPS')) {
    if (text.includes(READY_EARLY_NEEDLE)) {
      text = text.replace(READY_EARLY_NEEDLE, READY_EARLY_REPLACEMENT);
      n++;
    } else {
      console.warn('[patch-mixio-for-nw] skip ready-early (needle mismatch)');
    }
  }

  if (n === 0) {
    console.log('[patch-mixio-for-nw] already patched:', mixioJsPath);
    return;
  }
  fs.writeFileSync(mixioJsPath, fromLf(text, eol), 'utf8');
  console.log('[patch-mixio-for-nw] patched (' + n + '):', mixioJsPath);
}

module.exports = { patchMixioJs };

if (require.main === module) {
  const target = process.argv[2];
  if (!target) {
    console.error('Usage: node patch-mixio-for-nw.js <path-to-staged-mixio.js>');
    process.exit(1);
  }
  patchMixioJs(target);
}
