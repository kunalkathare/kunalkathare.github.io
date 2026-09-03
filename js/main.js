/* Kunal A. Kathare — portfolio interactions
   Theme toggle · scroll reveal · active nav · sticky border */

(function () {
  'use strict';

  /* ── theme ─────────────────────────────── */

  var root   = document.documentElement;
  var toggle = document.getElementById('themeToggle');
  var KEY    = 'kk-theme';

  function stored() {
    try { return localStorage.getItem(KEY); } catch (e) { return null; }
  }
  function remember(v) {
    try { localStorage.setItem(KEY, v); } catch (e) { /* private mode */ }
  }

  var saved = stored();
  if (saved === 'dark' || saved === 'light') {
    root.setAttribute('data-theme', saved);
  } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    root.setAttribute('data-theme', 'dark');
  }

  if (toggle) {
    toggle.addEventListener('click', function () {
      var next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      remember(next);
    });
  }

  /* follow the OS while the visitor has made no explicit choice */
  if (window.matchMedia) {
    var mq = window.matchMedia('(prefers-color-scheme: dark)');
    var onScheme = function (e) {
      if (!stored()) root.setAttribute('data-theme', e.matches ? 'dark' : 'light');
    };
    if (mq.addEventListener) mq.addEventListener('change', onScheme);
    else if (mq.addListener) mq.addListener(onScheme);
  }

  /* ── scroll reveal ─────────────────────── */

  var items = Array.prototype.slice.call(document.querySelectorAll('.reveal'));

  if (!('IntersectionObserver' in window)) {
    items.forEach(function (el) { el.classList.add('is-in'); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var el = entry.target;
        /* stagger siblings so groups cascade instead of popping together */
        var peers = Array.prototype.slice.call(el.parentNode.children);
        var i = peers.indexOf(el);
        el.style.transitionDelay = Math.min(i, 6) * 65 + 'ms';
        el.classList.add('is-in');
        io.unobserve(el);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });

    items.forEach(function (el) { io.observe(el); });
  }

  /* ── active nav link ──────────────────── */

  var links    = Array.prototype.slice.call(document.querySelectorAll('.nav__links a'));
  var sections = links
    .map(function (a) { return document.querySelector(a.getAttribute('href')); })
    .filter(Boolean);

  function setActive(id) {
    links.forEach(function (a) {
      a.classList.toggle('is-active', a.getAttribute('href') === '#' + id);
    });
  }

  if ('IntersectionObserver' in window && sections.length) {
    var navIO = new IntersectionObserver(function (entries) {
      /* pick the entry nearest the top of the viewport */
      var best = null;
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        if (!best || e.boundingClientRect.top < best.boundingClientRect.top) best = e;
      });
      if (best) setActive(best.target.id);
    }, { rootMargin: '-22% 0px -68% 0px' });

    sections.forEach(function (s) { navIO.observe(s); });
  }

  /* ── sticky nav hairline ──────────────── */

  var nav = document.getElementById('nav');
  var raf = false;

  function onScroll() {
    if (raf) return;
    raf = true;
    requestAnimationFrame(function () {
      if (nav) nav.classList.toggle('is-stuck', window.scrollY > 8);
      raf = false;
    });
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ── avatar: show the profile photo ──────────────────────── */

  (function avatar() {
    var box   = document.getElementById('avatar');
    var photo = document.getElementById('avatarPhoto');
    if (!box || !photo) return;

    /* Drop a photo into assets/ under any of these names — first one that
       loads wins. Deliberately forgiving so whatever you save just works. */
    var PATHS = [];
    ['profile', 'photo', 'kunal', 'me', 'avatar', 'headshot'].forEach(function (n) {
      ['jpg', 'jpeg', 'png', 'webp'].forEach(function (e) {
        PATHS.push('assets/' + n + '.' + e);
      });
    });

    /* try each candidate in turn; the avatar stays hidden if none decode */
    var i = 0;
    (function attempt() {
      if (i >= PATHS.length) return;
      var probe = new Image();
      var path  = PATHS[i++];
      probe.onload = function () {
        if (!probe.naturalWidth) return attempt();
        photo.src = path;
        box.classList.add('has-photo');
      };
      probe.onerror = attempt;
      probe.src = path;
    }());
  }());

  /* ── footer year ──────────────────────── */

  var year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();
}());
