'use strict';
/**
 * 注入每个 NW 窗口：
 * - 关 MixIO 主窗 → 杀后端并关掉所有旁路窗
 * - 主站打开 mixly/mixai/mixco/mixnt、管理后台、开源仓库 → 新窗口
 */
(function () {
  if (typeof nw === 'undefined') return;

  var SIDECAR_RE = /^\/(mixly|mixai|mixco|mixnt)(\/|$)/i;
  var LOCAL_HOSTS = { localhost: 1, '127.0.0.1': 1 };

  function parseUrl(href) {
    try {
      return new URL(href, location.href);
    } catch (_e) {
      return null;
    }
  }

  function pathSidecarKind(pathname) {
    var m = String(pathname || '').match(SIDECAR_RE);
    return m ? m[1].toLowerCase() : '';
  }

  /** 返回窗口类型：mixly|mixai|mixco|mixnt|admin|opensrc|'' */
  function classifyUrl(href) {
    var u = typeof href === 'string' ? parseUrl(href) : href;
    if (!u) return '';
    if (u.protocol !== 'http:' && u.protocol !== 'https:') return '';

    if (LOCAL_HOSTS[u.hostname] && String(u.port || '') === '18084') return 'admin';

    if (LOCAL_HOSTS[u.hostname]) {
      var sk = pathSidecarKind(u.pathname);
      if (sk) return sk;
    }

    var host = String(u.hostname || '').toLowerCase();
    var path = String(u.pathname || '');
    if (host === 'gitee.com' && /\/mixly2\/mixio/i.test(path)) return 'opensrc';
    if ((host === 'github.com' || host === 'www.github.com') && /mixio/i.test(path)) return 'opensrc';

    return '';
  }

  function currentKind() {
    try {
      return classifyUrl(location.href);
    } catch (_e) {
      return '';
    }
  }

  function titleFor(kind) {
    var map = {
      mixly: 'Mixly',
      mixai: 'MixAI',
      mixco: 'MixCO',
      mixnt: 'MixNT',
      admin: '管理后台',
      opensrc: '开源仓库',
    };
    return map[kind] || 'MixlyServer';
  }

  function openKindWindow(href, kind) {
    if (!kind) return;
    var u = parseUrl(href);
    if (!u) return;
    var abs = u.href;
    var bag = global.__mixioSidecarWins || (global.__mixioSidecarWins = {});
    var existing = bag[kind];
    if (existing) {
      try {
        existing.show();
        existing.focus();
        try {
          if (existing.window && existing.window.location.href !== abs) {
            existing.window.location.href = abs;
          }
        } catch (_eNav) {}
        return;
      } catch (_eDead) {
        bag[kind] = null;
      }
    }

    nw.Window.open(
      abs,
      {
        title: titleFor(kind),
        width: 1280,
        height: 800,
        min_width: 800,
        min_height: 560,
        position: 'center',
        inject_js_end: 'nw-inject-end.js',
      },
      function (newWin) {
        if (!newWin) return;
        newWin.__mixioIsMain = false;
        newWin.__mixioSidecarKind = kind;
        bag[kind] = newWin;
        newWin.on('closed', function () {
          if (bag[kind] === newWin) bag[kind] = null;
        });
      }
    );
  }

  /** 主窗：旁路/后台/开源都开新窗；同类型窗口内不重复开 */
  function shouldDetourToNewWindow(href) {
    var kind = classifyUrl(href);
    if (!kind) return false;
    var cur = currentKind();
    if (!cur) return true;
    return kind !== cur;
  }

  function closeAllOtherWindows(self) {
    try {
      nw.Window.getAll(function (list) {
        if (!list) return;
        for (var i = 0; i < list.length; i++) {
          var w = list[i];
          if (w === self) continue;
          try {
            w.close(true);
          } catch (_e) {}
        }
      });
    } catch (_e2) {}
  }

  var win = nw.Window.get();
  win.__mixioIsMain = !currentKind();

  if (!win.__mixioShellBound) {
    win.__mixioShellBound = true;

    win.on('close', function () {
      var self = this;
      var isMain = !!self.__mixioIsMain;
      if (isMain) {
        if (typeof global.__mixioKillBackend === 'function') {
          try {
            global.__mixioKillBackend();
          } catch (_e) {}
        }
        closeAllOtherWindows(self);
        // 关主窗后尽量清 user-data（跨平台；若仍占用则依赖 process exit 再清）
        if (typeof global.__mixioWipeUserData === 'function') {
          try {
            global.__mixioWipeUserData();
          } catch (_eWipe) {}
        }
      }
      self.close(true);
    });

    win.on('new-win-policy', function (frame, url, policy) {
      var kind = classifyUrl(url);
      if (!kind || !shouldDetourToNewWindow(url)) return;
      try {
        policy.ignore();
      } catch (_e) {}
      openKindWindow(url, kind);
    });

    try {
      win.on('navigation', function (frame, url, policy) {
        if (!win.__mixioIsMain) return;
        var kind = classifyUrl(url);
        if (!kind || !shouldDetourToNewWindow(url)) return;
        try {
          policy.ignore();
        } catch (_e) {}
        openKindWindow(url, kind);
      });
    } catch (_eNavEvt) {}
  }

  function onClickCapture(ev) {
    if (ev.defaultPrevented) return;
    if (ev.button != null && ev.button !== 0) return;
    if (ev.metaKey || ev.ctrlKey || ev.shiftKey || ev.altKey) return;
    var el = ev.target;
    while (el && el.tagName !== 'A') el = el.parentElement;
    if (!el || !el.href) return;
    var kind = classifyUrl(el.href);
    if (!kind || !shouldDetourToNewWindow(el.href)) return;
    ev.preventDefault();
    ev.stopPropagation();
    openKindWindow(el.href, kind);
  }
  try {
    document.addEventListener('click', onClickCapture, true);
  } catch (_eClick) {}

  function markDetourAnchors() {
    try {
      var anchors = document.querySelectorAll('a[href]');
      for (var i = 0; i < anchors.length; i++) {
        var a = anchors[i];
        var href = a.getAttribute('href') || a.href;
        if (!href || href === '#' || href.indexOf('javascript:') === 0) continue;
        if (!shouldDetourToNewWindow(a.href)) continue;
        a.setAttribute('target', '_blank');
        a.setAttribute('rel', 'noopener');
      }
      // login.js 异步写入 #admin href，稍后补标
      var admin = document.getElementById('admin');
      if (admin && admin.href && shouldDetourToNewWindow(admin.href)) {
        admin.setAttribute('target', '_blank');
        admin.setAttribute('rel', 'noopener');
      }
    } catch (_eA) {}
  }
  markDetourAnchors();
  setTimeout(markDetourAnchors, 300);
  setTimeout(markDetourAnchors, 1000);
})();
