'use strict';
/**
 * MixIO → Windows NW.js 本地 exe（产品名 MixlyServer）
 *
 * 全部 NW 相关文件仅在 nwjs_tools/；不修改仓库根目录业务源码。
 * 暂存时会：覆盖 package.json / nw-main / nw-boot，并仅对副本 mixio.js 打补丁。
 * 重新打包会保留 outDir 旁路目录：mixly / mixco / mixai / mixnt（及 mixn）。
 *
 * 用法: node nwjs_tools/build-mixio-nw.js [--arch=x64] [--out-dir=dist-nw/MixlyServer-win-x64]
 */
const path = require('node:path');
const fs = require('node:fs');
const fsp = require('node:fs/promises');
const { spawnSync } = require('node:child_process');
const { pathToFileURL } = require('node:url');
const { patchMixioJs } = require('./patch-mixio-for-nw.js');

const TOOLS = __dirname;
const ROOT = path.resolve(TOOLS, '..');
const APP_NAME = 'MixlyServer';
const APP_EXE = APP_NAME + '.exe';
const DEFAULT_OUT = path.join(ROOT, 'dist-nw', APP_NAME + '-win-x64');
/** 旧输出目录：旁路资源迁移用 */
const LEGACY_OUT = path.join(ROOT, 'dist-nw', 'MixIO-win-x64');
const STAGE = path.join(ROOT, '.nw-stage');
const NW_VERSION = process.env.NWJS_VERSION || '0.94.0';
const MIRROR = process.env.NWJS_MIRROR || 'https://dl.nwjs.io';

const MIXCO_ROOT = process.env.MIXCO_ROOT || 'D:\\GitHub\\mixco';
const MIXCO_CACHE_NW = path.join(MIXCO_ROOT, '.cache', 'nw');
const CACHE_DIR =
  process.env.MIXIO_NW_CACHE ||
  (fs.existsSync(MIXCO_CACHE_NW) ? MIXCO_CACHE_NW : path.join(ROOT, '.cache', 'nw'));

const ROOT_IGNORE = new Set([
  'dist-nw',
  '.nw-stage',
  '.cache',
  '.git',
  '.cursor',
  'node_modules',
  'nwjs_tools',
  'pkg_tools',
  'mixio_win_x64',
  'mixio_darwin_arm64',
  'mixio_darwin_x64',
  'mixio_linux_x64',
  'mixio_linux_arm64',
  'mixio_openwrt_arm64',
  'logs',
  'storage',
  'package-lock.json',
  'mixio.exe',
  'mixio.icon.exe',
  'mixio',
  // 根目录遗留的 NW 文件（若有）勿进包；正式入口来自 nwjs_tools/
  'nw-main.js',
  'nw-boot.html',
  'package.nw.json',
  // 旁路目录只应出现在 exe 旁，勿打进 package.nw
  'mixly',
  'mixco',
  'mixai',
  'mixnt',
  'mixn',
]);

/** 与 package.nw / MixlyServer.exe 同级，重新打包时必须保留 */
const PRESERVE_SIDECARS = ['mixly', 'mixco', 'mixai', 'mixnt', 'mixn'];

function parseArgs(argv) {
  const opts = {
    arch: 'x64',
    platform: 'win',
    flavor: 'normal',
    version: NW_VERSION,
    outDir: DEFAULT_OUT,
    cacheDir: CACHE_DIR,
  };
  for (const a of argv) {
    if (a.startsWith('--arch=')) opts.arch = a.slice(7);
    else if (a.startsWith('--out-dir=')) opts.outDir = path.resolve(a.slice(10));
    else if (a.startsWith('--version=')) opts.version = a.slice(10);
    else if (a.startsWith('--cache-dir=')) opts.cacheDir = path.resolve(a.slice(12));
  }
  return opts;
}

async function rmrf(p) {
  await fsp.rm(p, { recursive: true, force: true });
}

async function ensureDir(p) {
  await fsp.mkdir(p, { recursive: true });
}

function ensureDefaultCerts() {
  const crt = path.join(ROOT, 'config', 'certs', 'file.crt');
  const key = path.join(ROOT, 'config', 'certs', 'private.pem');
  if (fs.existsSync(crt) && fs.existsSync(key)) {
    for (const f of ['local-ca.crt', 'spki.json']) {
      const p = path.join(ROOT, 'config', 'certs', f);
      if (fs.existsSync(p)) fs.unlinkSync(p);
    }
    console.log('[build-mixio-nw] Using existing config/certs');
    return;
  }
  console.log('[build-mixio-nw] Restoring default certs from mixio.js...');
  const r = spawnSync(process.execPath, [path.join(TOOLS, 'restore-default-certs.js')], {
    cwd: ROOT,
    stdio: 'inherit',
  });
  if (r.status !== 0) throw new Error('restore-default-certs failed');
}

async function loadNwBuilder() {
  const candidates = [
    path.join(MIXCO_ROOT, 'node_modules', 'nw-builder'),
    path.join(ROOT, 'node_modules', 'nw-builder'),
  ];
  let modPath = candidates.find((p) => fs.existsSync(p));
  if (!modPath) {
    console.log('[build-mixio-nw] Installing nw-builder into MixIO (no-save)...');
    const r = spawnSync(
      process.platform === 'win32' ? 'npm.cmd' : 'npm',
      ['install', '--no-save', '--no-fund', '--no-audit', 'nw-builder@4.17.10'],
      { cwd: ROOT, stdio: 'inherit' }
    );
    if (r.status !== 0) throw new Error('npm install nw-builder failed');
    modPath = path.join(ROOT, 'node_modules', 'nw-builder');
  }
  try {
    const result = require(modPath);
    return result.default || result.nwbuild || result;
  } catch (error) {
    if (error.code !== 'ERR_REQUIRE_ESM') throw error;
    for (const rel of ['lib/index.js', 'index.js']) {
      try {
        const result = await import(pathToFileURL(path.join(modPath, rel)).href);
        return result.default || result.nwbuild || result;
      } catch (_e) {}
    }
    throw error;
  }
}

async function copyFiltered(src, dest, ignoreTop) {
  await ensureDir(dest);
  const entries = await fsp.readdir(src, { withFileTypes: true });
  for (const ent of entries) {
    if (ignoreTop && ignoreTop.has(ent.name)) continue;
    if (ent.name === '.' || ent.name === '..') continue;
    const from = path.join(src, ent.name);
    const to = path.join(dest, ent.name);
    if (ent.isDirectory()) {
      await fsp.cp(from, to, { recursive: true, dereference: true });
    } else if (ent.isFile() || ent.isSymbolicLink()) {
      await fsp.copyFile(from, to);
    }
  }
}

async function stageApp(stageDir) {
  await rmrf(stageDir);
  await ensureDir(stageDir);
  console.log('[build-mixio-nw] Staging →', stageDir);
  await copyFiltered(ROOT, stageDir, ROOT_IGNORE);

  // NW 专用文件（来自 nwjs_tools/，覆盖根目录 npm package.json）
  const manifest = JSON.parse(fs.readFileSync(path.join(TOOLS, 'package.nw.json'), 'utf8'));
  await fsp.writeFile(path.join(stageDir, 'package.json'), JSON.stringify(manifest, null, 2));
  await fsp.copyFile(path.join(TOOLS, 'nw-main.js'), path.join(stageDir, 'nw-main.js'));
  await fsp.copyFile(path.join(TOOLS, 'nw-boot.html'), path.join(stageDir, 'nw-boot.html'));
  await fsp.copyFile(path.join(TOOLS, 'nw-inject-end.js'), path.join(stageDir, 'nw-inject-end.js'));

  // 仅改暂存副本
  patchMixioJs(path.join(stageDir, 'mixio.js'));

  const nmSrc = path.join(ROOT, 'node_modules');
  if (!fs.existsSync(nmSrc)) throw new Error('node_modules missing; run npm install in MixIO first');
  console.log('[build-mixio-nw] Copying node_modules...');
  await fsp.cp(nmSrc, path.join(stageDir, 'node_modules'), { recursive: true, dereference: true });

  const runtimeDir = path.join(stageDir, 'runtime');
  await ensureDir(runtimeDir);
  const nodeDest = path.join(runtimeDir, process.platform === 'win32' ? 'node.exe' : 'node');
  await fsp.copyFile(process.execPath, nodeDest);
  console.log('[build-mixio-nw] Bundled runtime node →', nodeDest);

  const certDir = path.join(stageDir, 'config', 'certs');
  for (const f of ['file.crt', 'private.pem']) {
    if (!fs.existsSync(path.join(certDir, f))) throw new Error('Staged cert missing: ' + f);
  }
  for (const f of ['local-ca.crt', 'spki.json']) {
    const p = path.join(certDir, f);
    if (fs.existsSync(p)) await rmrf(p);
  }
  for (const f of ['nw-main.js', 'nw-boot.html', 'nw-inject-end.js', 'mixio.js', 'package.json']) {
    if (!fs.existsSync(path.join(stageDir, f))) throw new Error('Staged entry missing: ' + f);
  }
  if (!fs.existsSync(nodeDest)) throw new Error('Staged runtime node missing');
}

function findExe(outDir) {
  const preferred = [
    path.join(outDir, APP_EXE),
    path.join(outDir, 'MixIO.exe'),
    path.join(outDir, 'nw.exe'),
    path.join(outDir, 'mixio.exe'),
  ];
  for (const p of preferred) if (fs.existsSync(p)) return p;
  const walk = (d, depth = 0) => {
    if (depth > 4 || !fs.existsSync(d)) return null;
    for (const name of fs.readdirSync(d)) {
      const full = path.join(d, name);
      let st;
      try {
        st = fs.statSync(full);
      } catch (_e) {
        continue;
      }
      if (st.isFile() && /\.exe$/i.test(name) && !/chrom|crash|notification/i.test(name)) return full;
      if (st.isDirectory()) {
        const hit = walk(full, depth + 1);
        if (hit) return hit;
      }
    }
    return null;
  };
  return walk(outDir);
}

async function pruneLocales(outDir) {
  const locales = path.join(outDir, 'locales');
  if (!fs.existsSync(locales)) return;
  const keep = /^(zh-CN|zh-TW|en-US)/i;
  for (const name of fs.readdirSync(locales)) {
    if (!keep.test(name)) await rmrf(path.join(locales, name));
  }
}

/**
 * nw-builder 会清空/重写 outDir；旁路目录先 rename 暂存，构建打到 *.building 再替换，
 * 避免 Windows 上 package.nw / user-data 被占用导致 EBUSY。
 */
async function stashSidecars(outDir) {
  const stashRoot = path.join(path.dirname(outDir), '.mixio-nw-preserve');
  await rmrf(stashRoot);
  await ensureDir(stashRoot);
  const saved = [];
  const sources = [outDir];
  if (path.resolve(outDir) !== path.resolve(LEGACY_OUT)) sources.push(LEGACY_OUT);

  for (const srcRoot of sources) {
    if (!fs.existsSync(srcRoot)) continue;
    for (const name of PRESERVE_SIDECARS) {
      if (saved.includes(name)) continue;
      const from = path.join(srcRoot, name);
      if (!fs.existsSync(from)) continue;
      const to = path.join(stashRoot, name);
      console.log(
        '[build-mixio-nw] Stashing sidecar →',
        name,
        srcRoot === outDir ? '' : '(from legacy MixIO-win-x64)'
      );
      await fsp.rename(from, to);
      saved.push(name);
    }
  }
  return { stashRoot, saved };
}

async function restoreSidecars(outDir, stash) {
  if (!stash || !stash.saved || !stash.saved.length) {
    if (stash && stash.stashRoot) await rmrf(stash.stashRoot);
    return;
  }
  await ensureDir(outDir);
  for (const name of stash.saved) {
    const from = path.join(stash.stashRoot, name);
    const to = path.join(outDir, name);
    if (!fs.existsSync(from)) {
      console.warn('[build-mixio-nw] Stashed sidecar missing:', name);
      continue;
    }
    if (fs.existsSync(to)) await rmrf(to);
    console.log('[build-mixio-nw] Restoring sidecar ←', name);
    await fsp.rename(from, to);
  }
  await rmrf(stash.stashRoot);
}

async function mergeTree(src, dest) {
  await ensureDir(dest);
  const entries = await fsp.readdir(src, { withFileTypes: true });
  for (const ent of entries) {
    const from = path.join(src, ent.name);
    const to = path.join(dest, ent.name);
    if (ent.isDirectory()) {
      await mergeTree(from, to);
      continue;
    }
    try {
      await fsp.copyFile(from, to);
    } catch (_e1) {
      try {
        await fsp.unlink(to);
      } catch (_e2) {}
      await fsp.copyFile(from, to);
    }
  }
}

async function replaceOutDir(buildOut, finalOut) {
  if (path.resolve(buildOut) === path.resolve(finalOut)) return;
  if (!fs.existsSync(finalOut)) {
    await fsp.rename(buildOut, finalOut);
    return;
  }
  const bak = finalOut + '.old';
  await rmrf(bak);
  try {
    await fsp.rename(finalOut, bak);
    await fsp.rename(buildOut, finalOut);
    try {
      await rmrf(bak);
    } catch (e) {
      console.warn('[build-mixio-nw] Left old output at', bak, '(' + e.message + ')');
    }
    return;
  } catch (e) {
    console.warn('[build-mixio-nw] Cannot rename old outDir (' + e.message + '); file-merge into place');
  }
  // 目录被锁：逐文件覆盖（不 rmdir package.nw），旁路目录已事先 stash
  for (const name of await fsp.readdir(buildOut)) {
    const from = path.join(buildOut, name);
    const to = path.join(finalOut, name);
    const st = await fsp.stat(from);
    if (st.isDirectory()) {
      await mergeTree(from, to);
    } else {
      try {
        await fsp.copyFile(from, to);
      } catch (_e1) {
        try {
          await fsp.unlink(to);
        } catch (_e2) {}
        await fsp.copyFile(from, to);
      }
    }
  }
  await rmrf(buildOut);
}

async function main() {
  const opts = parseArgs(process.argv.slice(2));
  ensureDefaultCerts();

  await stageApp(STAGE);
  await ensureDir(path.dirname(opts.outDir));
  await ensureDir(opts.cacheDir);

  const localManifest = path.join(opts.cacheDir, 'versions.json');
  const manifestUrl = fs.existsSync(localManifest)
    ? pathToFileURL(localManifest).href
    : process.env.NWJS_MANIFEST_URL || 'https://nwjs.io/versions.json';

  const iconIco = path.join(ROOT, 'blockly', 'media', 'mark', 'mixio.ico');
  const iconPng = path.join(ROOT, 'blockly', 'media', 'mark', 'mixio.png');
  const appIcon = fs.existsSync(iconIco) ? iconIco : iconPng;

  const nwbuild = await loadNwBuilder();
  const finalOut = opts.outDir;
  const buildOut = finalOut + '.building';
  await rmrf(buildOut);

  const buildOptions = {
    mode: 'build',
    version: opts.version,
    flavor: opts.flavor,
    platform: opts.platform,
    arch: opts.arch,
    srcDir: STAGE,
    outDir: buildOut,
    cacheDir: opts.cacheDir,
    downloadUrl: MIRROR,
    manifestUrl,
    zip: false,
    glob: false,
    logLevel: 'info',
    app: {
      name: APP_NAME,
      icon: appIcon,
      version: '1.10.0',
      comments: APP_NAME,
      company: 'Mixly TEAM',
      fileDescription: APP_NAME,
      fileVersion: '1.10.0',
      internalName: APP_NAME,
      legalCopyright: 'Copyright (c) ' + new Date().getFullYear() + ' Mixly TEAM',
      originalFilename: APP_EXE,
      productName: APP_NAME,
      productVersion: '1.10.0',
    },
  };

  let stash = { stashRoot: null, saved: [] };
  try {
    stash = await stashSidecars(finalOut);

    console.log('[build-mixio-nw] Building NW.js app...');
    console.log(
      JSON.stringify(
        { version: opts.version, outDir: finalOut, buildOut, cacheDir: opts.cacheDir, app: APP_NAME },
        null,
        2
      )
    );
    await nwbuild(buildOptions);
    await pruneLocales(buildOut);

    const pkgCert = path.join(buildOut, 'package.nw', 'config', 'certs', 'file.crt');
    if (!fs.existsSync(pkgCert)) throw new Error('package.nw missing config/certs/file.crt');

    const exe = findExe(buildOut);
    const destExe = path.join(buildOut, APP_EXE);
    if (exe && path.resolve(exe) !== path.resolve(destExe)) {
      try {
        if (fs.existsSync(destExe)) await rmrf(destExe);
        await fsp.rename(exe, destExe);
        console.log('[build-mixio-nw] Renamed', path.basename(exe), '→', APP_EXE);
      } catch (_e) {
        console.warn('[build-mixio-nw] Could not rename exe:', _e.message);
      }
    }
    // 清理旧名残留
    for (const old of ['nw.exe', 'MixIO.exe', 'mixio.exe']) {
      const p = path.join(buildOut, old);
      if (fs.existsSync(p) && path.resolve(p) !== path.resolve(destExe)) {
        try {
          await rmrf(p);
        } catch (_e) {}
      }
    }

    await replaceOutDir(buildOut, finalOut);
  } catch (err) {
    await rmrf(buildOut).catch(() => {});
    throw err;
  } finally {
    try {
      await restoreSidecars(finalOut, stash);
    } catch (restoreErr) {
      console.error('[build-mixio-nw] FAILED to restore sidecars:', restoreErr);
      console.error('  Stash dir (manual recover):', stash && stash.stashRoot);
      throw restoreErr;
    }
  }

  const finalExe = findExe(finalOut);

  console.log('');
  console.log('[build-mixio-nw] Finished.');
  console.log('  Output:', finalOut);
  if (finalExe) console.log('  EXE:', finalExe);
  console.log('  Certs:', path.join(finalOut, 'package.nw', 'config', 'certs'));
  if (stash.saved.length) console.log('  Preserved:', stash.saved.join(', '));
}

if (require.main === module) {
  main().catch((err) => {
    console.error('[build-mixio-nw] FAILED:', err);
    process.exit(1);
  });
}
