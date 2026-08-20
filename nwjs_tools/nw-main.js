'use strict';
/**
 * NW.js 入口：cwd → 仅 HTTPS 配置 → 启动 mixio debug，并登记可被壳层杀掉的后端进程。
 * 每次退出时清空 Chromium user-data，下次启动相当于全新环境（跨平台，不依赖 bat）。
 */
var path = require('path');
var fs = require('fs');
var { spawn, spawnSync } = require('child_process');

try {
  process.chdir(path.resolve(__dirname));
} catch (_e) {}

var PID_FILE = path.join(__dirname, 'runtime', 'mixio-backend.pid');

/** package.json chromium-args: --user-data-dir=./user-data（相对 exe 目录） */
function resolveUserDataDir() {
  try {
    return path.join(path.dirname(process.execPath), 'user-data');
  } catch (_e) {
    return path.join(process.cwd(), 'user-data');
  }
}

function rmrfSync(target) {
  if (!target || !fs.existsSync(target)) return;
  try {
    fs.rmSync(target, { recursive: true, force: true, maxRetries: 3, retryDelay: 50 });
  } catch (_e) {
    try {
      var walk = function (p) {
        if (!fs.existsSync(p)) return;
        var st = fs.lstatSync(p);
        if (st.isDirectory()) {
          fs.readdirSync(p).forEach(function (name) {
            walk(path.join(p, name));
          });
          try {
            fs.rmdirSync(p);
          } catch (_e2) {}
        } else {
          try {
            fs.unlinkSync(p);
          } catch (_e3) {}
        }
      };
      walk(target);
    } catch (_e4) {}
  }
}

/** 退出时清空 user-data，保证下次冷启动无 SW / Cache Storage 残留 */
function wipeUserDataOnExit() {
  rmrfSync(resolveUserDataDir());
}

function ensureHttpsOnlyConfig() {
  var configDir = path.join(__dirname, 'config');
  var configPath = path.join(configDir, 'config.json');
  if (!fs.existsSync(configDir)) fs.mkdirSync(configDir, { recursive: true });

  var cfg;
  if (fs.existsSync(configPath)) {
    try {
      cfg = JSON.parse(fs.readFileSync(configPath, 'utf8'));
    } catch (_e) {
      cfg = {};
    }
  } else {
    cfg = {
      MIXIO_HTTP_PORT: 0,
      MIXIO_HTTPS_PORT: 8443,
      MIXIO_MQTT_PORT: 1883,
      MIXIO_WS_PORT: 8083,
      MIXIO_WSS_PORT: 8084,
      MIXIO_YJS_PORT: 8082,
      MIXIO_YJS_WSS_PORT: 8086,
      HTTPS_CRT_FILE: 'config/certs/file.crt',
      HTTPS_PRIVATE_PEM: 'config/certs/private.pem',
      MAX_PROJECT_NUM_PER_USER: 20,
      MAX_MESSAGE_PER_USER: 1000,
      MAX_MESSAGE_PER_SECOND: 5,
      ALLOW_REGISTER: true,
      ALLOW_HOOK: true,
      OFFLINE_MODE: true,
      BAIDU_MAP_AK: '',
      BAIDU_MAP_SERVER_AK: '',
      TENCENT_MAP_KEY: '',
      BAIDU_STAT_LINK: '',
      ADMIN_USERNAME: 'admin',
      ADMIN_PASSWORD: 'public',
      STORAGE_ENGINE: 'sqlite',
      MYSQL_HOST: 'localhost',
      MYSQL_PORT: 3306,
      MYSQL_USER: '',
      MYSQL_PASS: '',
      MYSQL_DB: 'mixio',
      FOOTER: '',
    };
  }
  cfg.MIXIO_HTTP_PORT = 0;
  if (!cfg.MIXIO_HTTPS_PORT) cfg.MIXIO_HTTPS_PORT = 8443;
  fs.writeFileSync(configPath, JSON.stringify(cfg, null, 4), 'utf8');
}

function resolveNodeBin() {
  var bundled = path.join(__dirname, 'runtime', 'node.exe');
  if (process.platform === 'win32' && fs.existsSync(bundled)) return bundled;
  var unix = path.join(__dirname, 'runtime', 'node');
  if (fs.existsSync(unix)) return unix;
  return process.platform === 'win32' ? 'node.exe' : 'node';
}

function killPid(pid) {
  if (!pid || pid <= 0) return;
  try {
    if (process.platform === 'win32') {
      spawnSync('taskkill', ['/PID', String(pid), '/T', '/F'], {
        windowsHide: true,
        stdio: 'ignore',
      });
    } else {
      try {
        process.kill(pid, 'SIGTERM');
      } catch (_e) {}
      try {
        process.kill(pid, 'SIGKILL');
      } catch (_e2) {}
    }
  } catch (_e3) {}
}

function readPidFile() {
  try {
    if (!fs.existsSync(PID_FILE)) return 0;
    var n = parseInt(fs.readFileSync(PID_FILE, 'utf8').trim(), 10);
    return Number.isFinite(n) ? n : 0;
  } catch (_e) {
    return 0;
  }
}

function writePidFile(pid) {
  try {
    var dir = path.dirname(PID_FILE);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(PID_FILE, String(pid), 'utf8');
  } catch (_e) {}
}

function clearPidFile() {
  try {
    if (fs.existsSync(PID_FILE)) fs.unlinkSync(PID_FILE);
  } catch (_e) {}
}

/** 清掉上次「假退出」残留的后端 */
function killStaleBackend() {
  var old = readPidFile();
  if (old) killPid(old);
  clearPidFile();
}

var backendChild = null;
var backendKilled = false;

function killBackend() {
  if (backendKilled) return;
  backendKilled = true;
  var pid = (backendChild && backendChild.pid) || readPidFile();
  if (backendChild) {
    try {
      backendChild.kill();
    } catch (_e) {}
  }
  killPid(pid);
  clearPidFile();
  backendChild = null;
}

function shutdown() {
  killBackend();
  wipeUserDataOnExit();
}

ensureHttpsOnlyConfig();
killStaleBackend();

var nodeBin = resolveNodeBin();
// 不 detached：关壳时可杀；仍 windowsHide，不弹控制台
backendChild = spawn(nodeBin, [path.join(__dirname, 'mixio.js'), 'debug'], {
  cwd: __dirname,
  detached: false,
  stdio: 'ignore',
  windowsHide: true,
  env: Object.assign({}, process.env, { MIXIO_NW_SPAWN: '1' }),
});
if (backendChild && backendChild.pid) writePidFile(backendChild.pid);
backendChild.on('exit', function () {
  clearPidFile();
  backendChild = null;
});

global.__mixioBackendPid = backendChild.pid;
global.__mixioKillBackend = killBackend;
global.__mixioWipeUserData = wipeUserDataOnExit;
global.__mixioSidecarWins = global.__mixioSidecarWins || {};

process.on('exit', shutdown);
process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);
