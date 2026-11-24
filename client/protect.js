/*!
 * Anti-Copy Toolkit - protect.js
 *
 * PERINGATAN: ini hanya DETERRENT untuk orang awam. Siapa pun yang paham teknis
 * tetap bisa melewatinya (matikan JS, view-source, curl, screenshot).
 * Jangan dipakai sebagai satu-satunya pengamanan. Lihat README.
 *
 * Opt-out per elemen: tambahkan atribut  data-allow-copy  pada elemen yang boleh disalin.
 */
(function () {
  'use strict';

  var CONFIG = {
    blockContextMenu: true,     // klik kanan
    blockCopyCut: true,         // Ctrl+C / Ctrl+X pada teks halaman
    blockSelect: false,         // blokir seleksi teks (mengganggu aksesibilitas, default off)
    blockImageDrag: true,       // drag & save gambar
    blockShortcuts: true,       // F12, Ctrl+U, Ctrl+S, Ctrl+Shift+I/J/C, Ctrl+P
    detectDevtools: true,       // deteksi DevTools terbuka
    devtoolsAction: 'blur',     // 'blur' | 'redirect' | 'none'
    redirectUrl: 'about:blank',
    allowInInputs: true,        // tetap izinkan copy/paste di input & textarea
    message: 'Konten dan desain konsep ini dilindungi hak cipta © 2026 Muhammad Naza Firmansyah.'
  };

  function allowed(target) {
    if (!target || !target.closest) return false;
    if (target.closest('[data-allow-copy]')) return true;
    if (CONFIG.allowInInputs && target.closest('input, textarea, [contenteditable="true"]')) return true;
    return false;
  }

  function on(type, handler) {
    document.addEventListener(type, handler, true);
  }

  if (CONFIG.blockContextMenu) {
    on('contextmenu', function (e) {
      if (!allowed(e.target)) e.preventDefault();
    });
  }

  if (CONFIG.blockCopyCut) {
    ['copy', 'cut'].forEach(function (t) {
      on(t, function (e) {
        if (allowed(e.target)) return;
        e.preventDefault();
        if (e.clipboardData) e.clipboardData.setData('text/plain', CONFIG.message);
      });
    });
  }

  if (CONFIG.blockSelect) {
    var st = document.createElement('style');
    st.textContent = 'body{-webkit-user-select:none;user-select:none}' +
      '[data-allow-copy],input,textarea{-webkit-user-select:text;user-select:text}';
    document.head.appendChild(st);
  }

  if (CONFIG.blockImageDrag) {
    on('dragstart', function (e) {
      if (e.target && e.target.tagName === 'IMG' && !allowed(e.target)) e.preventDefault();
    });
    var imgStyle = document.createElement('style');
    imgStyle.textContent = 'img{-webkit-user-drag:none;user-drag:none}';
    document.head.appendChild(imgStyle);
  }

  if (CONFIG.blockShortcuts) {
    on('keydown', function (e) {
      var k = (e.key || '').toLowerCase();
      var ctrl = e.ctrlKey || e.metaKey;
      var block =
        k === 'f12' ||
        (ctrl && ['u', 's', 'p'].indexOf(k) !== -1) ||
        (ctrl && e.shiftKey && ['i', 'j', 'c'].indexOf(k) !== -1) ||
        (e.metaKey && e.altKey && ['i', 'j', 'u'].indexOf(k) !== -1);
      if (block && !allowed(e.target)) {
        e.preventDefault();
        e.stopPropagation();
      }
    });
  }

  if (CONFIG.detectDevtools && CONFIG.devtoolsAction !== 'none') {
    var open = false;
    var threshold = 160;
    function check() {
      var wDiff = window.outerWidth - window.innerWidth > threshold;
      var hDiff = window.outerHeight - window.innerHeight > threshold;
      var isOpen = wDiff || hDiff;
      if (isOpen && !open) {
        open = true;
        if (CONFIG.devtoolsAction === 'redirect') {
          location.replace(CONFIG.redirectUrl);
        } else {
          document.documentElement.style.filter = 'blur(12px)';
        }
      } else if (!isOpen && open) {
        open = false;
        document.documentElement.style.filter = '';
      }
    }
    setInterval(check, 800);
    window.addEventListener('resize', check);
  }
})();
