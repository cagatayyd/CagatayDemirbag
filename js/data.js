/* ══════════════════════════════════════════════════
   DATA.JS — Tüm site verileri (proje, skill, vs.)
   Gerçek bilgilerini buradan düzenleyebilirsin.
══════════════════════════════════════════════════ */

const SITE_DATA = {

  // ── Kişisel Bilgiler ──────────────────────────────
  personal: {
    name: 'Çağatay Demirbağ',
    title: 'Software Developer & DevOps Engineer',
    email: 'cagatayydemirbag@hotmail.com',
    phone: '+905452535800',
    location: 'Turkey',
    github: 'https://github.com/cagatayyd',
    linkedin: 'https://linkedin.com/in/çağatay-demirbağ-805356212/',
    instagram: 'https://instagram.com/cagatayyd/',
  },

  // ── EmailJS Config ────────────────────────────────
  emailjs: {
    publicKey:  'zKVk7OlXiFu9FiAnK',
    serviceID:  'service_13qr418',
    templateID: 'template_eln9afr',
  },

  // ── Projeler ─────────────────────────────────────
  projects: [
    {
      name: 'RC Summer | Registration',
      desc: '.NET Junior Developer olarak geliştirdiğim Robert College Yaz Kampı kayıt sistemi. ASP.NET MVC + MSSQL.',
      descEn: 'Robert College Summer Camp registration system developed as a .NET Junior Developer. ASP.NET MVC + MSSQL.',
      tags: ['ASP.NET MVC', 'C#', 'MSSQL'],
      url: 'https://rcsummer.robcol.k12.tr/',
      thumb: null, // 'assets/projects/rc.png' gibi ekleyebilirsin
      emoji: '🏫',
      type: 'personal', // 'personal' veya 'company'
    },
    {
      name: 'Portfolio v1',
      desc: 'Şu an aktif olan eski portfolyo sitem. Bootstrap + Vanilla JS ile yapılmış.',
      descEn: 'Previous portfolio website built with Bootstrap and Vanilla JS.',
      tags: ['HTML', 'CSS', 'JavaScript', 'Bootstrap'],
      url: 'https://cagatayyd.github.io/website/',
      thumb: null,
      emoji: '🌐',
      type: 'personal',
    },
    // Şirket projesi örneği:
    // {
    //   name: 'Şirket Projesi',
    //   desc: 'Açıklama',
    //   tags: ['C#', '.NET'],
    //   url: 'https://...',
    //   thumb: null,
    //   emoji: '🏢',
    //   type: 'company',  // ← bunu 'company' yap
    // },
  ],

  // ── Yetenekler ────────────────────────────────────
  skills: [
    {
      category: 'Backend',
      items: [
        { name: 'C#',        pct: 85 },
        { name: '.NET',      pct: 82 },
        { name: 'ASP.NET',   pct: 78 },
        { name: 'SQL',       pct: 75 },
      ],
    },
    {
      category: 'DevOps & Infra',
      items: [
        { name: 'Linux',        pct: 70 },
        { name: 'RabbitMQ',     pct: 65 },
        { name: 'Elasticsearch',pct: 60 },
        { name: 'Git',          pct: 80 },
      ],
    },
    {
      category: 'Frontend',
      items: [
        { name: 'HTML5',      pct: 88 },
        { name: 'CSS',        pct: 80 },
        { name: 'JavaScript', pct: 75 },
        { name: 'Bootstrap',  pct: 78 },
      ],
    },
  ],

  // ── Terminal komutları ────────────────────────────
  // Terminal engine bu verileri kullanır.
  // Yeni komutlar terminal.js içinde eklenir.
};
