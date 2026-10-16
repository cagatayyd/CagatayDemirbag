/* ══════════════════════════════════════════════════
   WINDOWS.JS — Draggable, resizable, z-index popup sistemi
══════════════════════════════════════════════════ */

(function() {
  'use strict';

  let zCounter = 200;
  const windowStates = {};

  // ── Pencere kayıt et ──────────────────────────────
  function registerWindow(id) {
    windowStates[id] = {
      visible: false,
      minimized: false,
      maximized: false,
      prevRect: null,
    };
  }

  // ── Pencere aç ───────────────────────────────────
  window.openWindow = function(id) {
    const el = document.getElementById('win-' + id);
    if (!el) return;

    if (!windowStates[id]) registerWindow(id);

    const state = windowStates[id];
    state.visible = true;
    state.minimized = false;

    el.classList.remove('win-minimized');
    el.classList.add('win-visible');

    focusWindow(id);

    // Eğer dışarı taşmışsa merkeze çek
    ensureOnScreen(el);
  };

  // ── Pencere kapat ─────────────────────────────────
  window.closeWindow = function(id) {
    const el = document.getElementById('win-' + id);
    if (!el) return;

    el.style.animation = 'none';
    el.style.opacity = '0';
    el.style.transform = 'scale(0.92)';
    el.style.transition = 'opacity 0.15s, transform 0.15s';

    setTimeout(() => {
      el.classList.remove('win-visible', 'win-focused', 'win-maximized');
      el.classList.add('win-minimized');
      el.style.opacity = '';
      el.style.transform = '';
      el.style.transition = '';
      if (windowStates[id]) {
        windowStates[id].visible = false;
        windowStates[id].minimized = false;
        windowStates[id].maximized = false;
      }
    }, 150);
  };

  // ── Küçült ────────────────────────────────────────
  window.minimizeWindow = function(id) {
    const el = document.getElementById('win-' + id);
    if (!el) return;

    el.classList.remove('win-visible', 'win-focused');
    el.classList.add('win-minimized');
    if (windowStates[id]) windowStates[id].minimized = true;
  };

  // ── Büyüt / Restore ───────────────────────────────
  window.maximizeWindow = function(id) {
    const el = document.getElementById('win-' + id);
    if (!el) return;

    const state = windowStates[id] || {};

    if (el.classList.contains('win-maximized')) {
      // Restore
      el.classList.remove('win-maximized');
      if (state.prevRect) {
        el.style.top    = state.prevRect.top;
        el.style.left   = state.prevRect.left;
        el.style.width  = state.prevRect.width;
        el.style.height = state.prevRect.height;
      }
      state.maximized = false;
    } else {
      // Save current position
      state.prevRect = {
        top:    el.style.top,
        left:   el.style.left,
        width:  el.style.width,
        height: el.style.height,
      };
      el.classList.add('win-maximized');
      el.style.top    = '';
      el.style.left   = '';
      el.style.width  = '';
      el.style.height = '';
      state.maximized = true;
    }
    focusWindow(id);
  };

  // ── Focus ─────────────────────────────────────────
  function focusWindow(id) {
    // Unfocus all
    document.querySelectorAll('.win-window').forEach(w => w.classList.remove('win-focused'));
    // Focus this
    const el = document.getElementById('win-' + id);
    if (el) {
      zCounter++;
      el.style.zIndex = zCounter;
      el.classList.add('win-focused');
    }
  }

  // ── Ekran içinde tut ──────────────────────────────
  function ensureOnScreen(el) {
    const rect = el.getBoundingClientRect();
    const navH = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-height') || 44);
    const tbH  = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--taskbar-height') || 36);

    let left = parseInt(el.style.left) || rect.left;
    let top  = parseInt(el.style.top)  || rect.top;

    if (left + rect.width > window.innerWidth - 10)  left = window.innerWidth - rect.width - 10;
    if (top  + rect.height > window.innerHeight - tbH) top = window.innerHeight - rect.height - tbH - 10;
    if (left < 0)   left = 10;
    if (top < navH) top  = navH + 4;

    el.style.left = left + 'px';
    el.style.top  = top  + 'px';
  }

  // ── Drag (mouse & touch) ──────────────────────────
  function makeDraggable(el, handle) {
    let startX, startY, startLeft, startTop;
    let isDragging = false;

    function onDown(e) {
      // Pencereye tıklayınca focus ver
      const id = el.id.replace('win-', '');
      focusWindow(id);

      // Maximize durumunda drag devre dışı
      if (el.classList.contains('win-maximized')) return;

      // Butonlara tıklandıysa drag etme
      if (e.target.closest('.win-controls')) return;

      isDragging = true;
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      startX    = clientX;
      startY    = clientY;
      startLeft = el.offsetLeft;
      startTop  = el.offsetTop;

      e.preventDefault();
    }

    function onMove(e) {
      if (!isDragging) return;
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      const dx = clientX - startX;
      const dy = clientY - startY;

      const navH = 44;
      const tbH  = 36;
      let newLeft = startLeft + dx;
      let newTop  = startTop  + dy;

      // Sınır kontrolü
      newLeft = Math.max(0, Math.min(newLeft, window.innerWidth  - el.offsetWidth));
      newTop  = Math.max(navH, Math.min(newTop, window.innerHeight - tbH - 40));

      el.style.left = newLeft + 'px';
      el.style.top  = newTop  + 'px';
    }

    function onUp() {
      isDragging = false;
    }

    // Mouse events
    handle.addEventListener('mousedown',  onDown);
    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseup',   onUp);

    // Touch events
    handle.addEventListener('touchstart', onDown, { passive: false });
    document.addEventListener('touchmove', onMove, { passive: false });
    document.addEventListener('touchend',  onUp);
  }

  // ── Resize (Right edge, Bottom edge, SE corner) ───
  function makeResizable(el) {
    const minW = 300, minH = 160;
    const edgeSize = 10;
    let isResizing = false;
    let resizeDir = ''; // 'e', 's', 'se'
    let startX, startY, startW, startH;

    function getResizeDir(e) {
      if (el.classList.contains('win-maximized')) return '';
      const rect = el.getBoundingClientRect();
      // Ignore titlebar area for resize so dragging works smoothly
      if (e.clientY < rect.top + 28) return '';
      const onRight  = e.clientX >= rect.right - edgeSize && e.clientX <= rect.right + 4;
      const onBottom = e.clientY >= rect.bottom - edgeSize && e.clientY <= rect.bottom + 4;
      if (onRight && onBottom) return 'se';
      if (onRight)  return 'e';
      if (onBottom) return 's';
      return '';
    }

    el.addEventListener('mousemove', function(e) {
      if (isResizing) return;
      const dir = getResizeDir(e);
      if (dir === 'se') el.style.cursor = 'nwse-resize';
      else if (dir === 'e') el.style.cursor = 'ew-resize';
      else if (dir === 's') el.style.cursor = 'ns-resize';
      else el.style.cursor = '';
    });

    el.addEventListener('mousedown', function(e) {
      const dir = getResizeDir(e);
      if (!dir) return;

      isResizing = true;
      resizeDir = dir;
      startX = e.clientX;
      startY = e.clientY;
      startW = el.offsetWidth;
      startH = el.offsetHeight;
      e.preventDefault();
    });

    document.addEventListener('mousemove', function(e) {
      if (!isResizing) return;
      if (resizeDir === 'e' || resizeDir === 'se') {
        const newW = Math.max(minW, Math.min(window.innerWidth - el.offsetLeft - 8, startW + (e.clientX - startX)));
        el.style.width = newW + 'px';
      }
      if (resizeDir === 's' || resizeDir === 'se') {
        const newH = Math.max(minH, Math.min(window.innerHeight - el.offsetTop - 40, startH + (e.clientY - startY)));
        el.style.height = newH + 'px';
      }
    });

    document.addEventListener('mouseup', function() {
      if (isResizing) {
        isResizing = false;
        resizeDir = '';
        el.style.cursor = '';
      }
    });
  }

  // ── Init tüm pencereler ───────────────────────────
  function initWindows() {
    document.querySelectorAll('.win-window').forEach(el => {
      const id = el.id.replace('win-', '');
      registerWindow(id);

      // Drag için titlebar kullan
      const titlebar = el.querySelector('.win-titlebar');
      if (titlebar) makeDraggable(el, titlebar);

      // Resize
      makeResizable(el);

      // Tıklanınca focus
      el.addEventListener('mousedown', () => focusWindow(id));
    });
  }

  // ── Fullscreen toggle ─────────────────────────────
  window.toggleFullscreen = function() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  };

  // ── scrollToDesktop (navbar home) ─────────────────
  window.scrollToDesktop = function() {
    // Tüm pencereleri kapat
    document.querySelectorAll('.win-window.win-visible').forEach(el => {
      const id = el.id.replace('win-', '');
      closeWindow(id);
    });
  };

  // ── DOM ready ─────────────────────────────────────
  document.addEventListener('DOMContentLoaded', function() {
    initWindows();

    // Arka plana tıklanınca focus kaldır
    document.getElementById('desktop')?.addEventListener('mousedown', function(e) {
      if (e.target === this) {
        document.querySelectorAll('.win-window').forEach(w => w.classList.remove('win-focused'));
      }
    });
  });

})();
