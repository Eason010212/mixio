'use strict';
/** Restore config/certs from mixio.js defaultCrt / defaultPem（仅供 nwjs_tools 打包使用） */
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const ROOT = path.resolve(__dirname, '..');
const src = fs.readFileSync(path.join(ROOT, 'mixio.js'), 'utf8');

function extract(name) {
  const re = new RegExp(name + '\\s*=\\s*`([\\s\\S]*?)`');
  const m = src.match(re);
  if (!m) throw new Error('missing ' + name);
  return m[1].replace(/^\n/, '') + (m[1].endsWith('\n') ? '' : '\n');
}

const crt = extract('defaultCrt');
const pem = extract('defaultPem');
const dir = path.join(ROOT, 'config', 'certs');
fs.mkdirSync(dir, { recursive: true });
fs.writeFileSync(path.join(dir, 'file.crt'), crt);
fs.writeFileSync(path.join(dir, 'private.pem'), pem);
for (const f of ['local-ca.crt', 'spki.json']) {
  const p = path.join(dir, f);
  if (fs.existsSync(p)) fs.unlinkSync(p);
}
const x = new crypto.X509Certificate(crt);
console.log('[restore-default-certs] OK');
console.log('  subject:', x.subject);
console.log('  SAN:', x.subjectAltName);
console.log('  validTo:', x.validTo);
