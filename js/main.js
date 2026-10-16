/* ══════════════════════════════════════════════════
   MAIN.JS — Genel başlatma: saat, skills, projects,
             EmailJS, yıl, glitch efekti
══════════════════════════════════════════════════ */

(function() {
  'use strict';

  // ══════════════════════════════════════════════════
  //   EmailJS BAŞLAT
  // ══════════════════════════════════════════════════
  if (typeof emailjs !== 'undefined' && typeof SITE_DATA !== 'undefined') {
    emailjs.init(SITE_DATA.emailjs.publicKey);
  }

  // ══════════════════════════════════════════════════
  //   EMAIL GÖNDER
  // ══════════════════════════════════════════════════
  window.sendEmail = function(e) {
    e.preventDefault();
    const form     = document.getElementById('contactForm');
    const btn      = document.getElementById('sendBtn');
    const status   = document.getElementById('formStatus');
    if (!form || !btn || !status) return;

    const data = SITE_DATA?.emailjs || {};
    const params = {
      name:    form.querySelector('[name="name"]').value,
      email:   form.querySelector('[name="email"]').value,
      message: form.querySelector('[name="message"]').value,
    };

    btn.textContent = 'Gönderiliyor...';
    btn.disabled = true;
    status.textContent = '';
    status.className = 'form-status';

    emailjs.send(data.serviceID, data.templateID, params)
      .then(() => {
        btn.textContent = '✓ Gönderildi!';
        status.textContent = '> Mesajın başarıyla iletildi.';
        status.className = 'form-status success';
        form.reset();
        setTimeout(() => {
          btn.textContent = 'Gönder';
          btn.disabled = false;
          status.textContent = '';
        }, 4000);
      })
      .catch(err => {
        console.error('EmailJS error:', err);
        btn.textContent = 'Gönder';
        btn.disabled = false;
        status.textContent = '> Hata oluştu. Lütfen tekrar dene.';
        status.className = 'form-status error';
      });
  };

  // ══════════════════════════════════════════════════
  //   SAAT
  // ══════════════════════════════════════════════════
  function updateClock() {
    const el = document.getElementById('navClock');
    if (!el) return;
    const now  = new Date();
    const hh   = String(now.getHours()).padStart(2, '0');
    const mm   = String(now.getMinutes()).padStart(2, '0');
    el.textContent = hh + ':' + mm;
  }
  updateClock();
  setInterval(updateClock, 10000);

  // ══════════════════════════════════════════════════
  //   YIL
  // ══════════════════════════════════════════════════
  const yearEl = document.getElementById('currentYear');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // ══════════════════════════════════════════════════
  //   PROJELERİ RENDER ET (sekmeli)
  // ══════════════════════════════════════════════════
  function buildProjectCard(p) {
    const card = document.createElement('div');
    card.className = 'project-card';
    card.onclick = () => { if (p.url) window.open(p.url, '_blank'); };

    const thumb = p.thumb
      ? `<img class="project-thumb" src="${p.thumb}" alt="${p.name}" loading="lazy">`
      : `<div class="project-thumb-placeholder">${p.emoji || '📁'}</div>`;

    const tags = p.tags.map(t => `<span class="tag">${t}</span>`).join('');
    const desc = (window.LANG === 'en' && p.descEn) ? p.descEn : p.desc;

    card.innerHTML = `
      ${thumb}
      <div class="project-info">
        <div class="project-name">${p.name}</div>
        <div class="project-desc">${desc}</div>
        <div class="project-tags">${tags}</div>
      </div>
    `;
    return card;
  }

  function renderProjects() {
    if (typeof SITE_DATA === 'undefined') return;

    // Kişisel
    const personalGrid = document.getElementById('projectsGridPersonal');
    if (personalGrid) {
      personalGrid.innerHTML = '';
      const personal = SITE_DATA.projects.filter(p => p.type !== 'company');
      if (personal.length === 0) {
        personalGrid.innerHTML = '<div class="projects-empty">&gt; Henüz kişisel proje eklenmemiş.</div>';
      } else {
        personal.forEach(p => personalGrid.appendChild(buildProjectCard(p)));
      }
    }

    // Şirket
    const companyGrid = document.getElementById('projectsGridCompany');
    if (companyGrid) {
      companyGrid.innerHTML = '';
      const company = SITE_DATA.projects.filter(p => p.type === 'company');
      if (company.length === 0) {
        companyGrid.innerHTML = `
          <div class="projects-empty">
            &gt; Şirket projeleri yakında eklenecek...<br>
            <span style="opacity:0.5;font-size:10px;">// Yakında</span>
          </div>`;
      } else {
        company.forEach(p => companyGrid.appendChild(buildProjectCard(p)));
      }
    }
  }

  // ── Sekme değiştirme ─────────────────────────────
  window.switchProjectTab = function(tabId, btn) {
    // Tüm pane'leri gizle
    document.querySelectorAll('.project-tab-pane').forEach(p => p.classList.remove('active'));
    // Tüm butonların active'ini kaldır
    document.querySelectorAll('.project-tab-btn').forEach(b => b.classList.remove('active'));
    // Seçileni göster
    const pane = document.getElementById('tab-' + tabId);
    if (pane) pane.classList.add('active');
    if (btn)  btn.classList.add('active');
  };

  // ══════════════════════════════════════════════════
  //   SKİLL BARLARI RENDER ET (animasyonlu)
  // ══════════════════════════════════════════════════
  function renderSkills() {
    const container = document.getElementById('skillsContent');
    if (!container || typeof SITE_DATA === 'undefined') return;

    container.innerHTML = '';
    SITE_DATA.skills.forEach(group => {
      const catDiv = document.createElement('div');
      catDiv.className = 'skill-category';
      catDiv.innerHTML = `<div class="skill-category-title">[ ${group.category} ]</div>`;

      group.items.forEach(skill => {
        const row = document.createElement('div');
        row.className = 'skill-item';
        row.innerHTML = `
          <span class="skill-name">${skill.name}</span>
          <div class="skill-bar-container">
            <div class="skill-bar" style="width:0%" data-pct="${skill.pct}"></div>
          </div>
          <span class="skill-pct">${skill.pct}%</span>
        `;
        catDiv.appendChild(row);
      });

      container.appendChild(catDiv);
    });

    // Animasyon: pencere açılınca barları doldur
    observeSkillsWindow();
  }

  function observeSkillsWindow() {
    const skillsWin = document.getElementById('win-skills');
    if (!skillsWin) return;

    let animated = false;
    const observer = new MutationObserver(() => {
      if (skillsWin.classList.contains('win-visible') && !animated) {
        animated = true;
        setTimeout(animateSkillBars, 150);
      }
      if (!skillsWin.classList.contains('win-visible')) {
        animated = false; // reset for next open
      }
    });
    observer.observe(skillsWin, { attributes: true, attributeFilter: ['class'] });
  }

  function animateSkillBars() {
    document.querySelectorAll('.skill-bar').forEach(bar => {
      const pct = bar.dataset.pct || 0;
      bar.style.width = pct + '%';
    });
  }

  // ══════════════════════════════════════════════════
  //   ARA SIRA GLİTCH EFEKTİ
  // ══════════════════════════════════════════════════
  function randomGlitch() {
    const body = document.body;
    if (Math.random() < 0.3) {
      body.classList.add('glitch-effect');
      setTimeout(() => body.classList.remove('glitch-effect'), 120);
    }
    // Sonraki glitch: 15-40 saniye arası
    setTimeout(randomGlitch, 15000 + Math.random() * 25000);
  }

  // ══════════════════════════════════════════════════
  //   YATAY GEÇİŞ ÇİZGİSİ (retro TV efekti)
  // ══════════════════════════════════════════════════
  function addRollLine() {
    const line = document.createElement('div');
    line.className = 'roll-line';
    document.body.appendChild(line);
  }

  // ══════════════════════════════════════════════════
  //   DESKTOP İKON çift-tık & mobil tek-dokunuş desteği
  // ══════════════════════════════════════════════════
  function initDesktopIcons() {
    document.querySelectorAll('.desktop-icon').forEach(icon => {
      let lastTap = 0;

      icon.addEventListener('click', function(e) {
        document.querySelectorAll('.desktop-icon').forEach(i => i.classList.remove('selected'));
        this.classList.add('selected');

        // Mobil / dokunmatik ekranlarda tek dokunuşla aç
        const isMobileOrTouch = window.matchMedia('(max-width: 768px)').matches || ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);
        if (isMobileOrTouch && typeof this.ondblclick === 'function') {
          this.ondblclick(e);
          return;
        }

        // Masaüstünde hızlı çift tıklama yedeği
        const now = Date.now();
        if (now - lastTap < 350 && typeof this.ondblclick === 'function') {
          this.ondblclick(e);
        }
        lastTap = now;
      });
    });

    // Dışarı tıklayınca seçimi kaldır
    document.getElementById('desktop')?.addEventListener('click', function(e) {
      if (!e.target.closest('.desktop-icon')) {
        document.querySelectorAll('.desktop-icon').forEach(i => i.classList.remove('selected'));
      }
    });
  }

  // ══════════════════════════════════════════════════
  //   NAVBAR LİNK AKTİF STATESİ
  // ══════════════════════════════════════════════════
  function initNavLinks() {
    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', function() {
        document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
        this.classList.add('active');
      });
    });
  }

  // ══════════════════════════════════════════════════
  //   DOM HAZIR
  // ══════════════════════════════════════════════════
  document.addEventListener('DOMContentLoaded', function() {
    renderProjects();
    renderSkills();
    initDesktopIcons();
    initNavLinks();
    addRollLine();

    // İlk glitch'i geciktir
    setTimeout(randomGlitch, 20000 + Math.random() * 10000);

    // Terminal penceresini başta göster (opsiyonel)
    // openWindow('terminal');
    // openWindow('about');

    // Yılı güncelle
    const yearEl = document.getElementById('currentYear');
    if (yearEl) yearEl.textContent = new Date().getFullYear();
  });

})();
