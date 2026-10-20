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
    // ── Şirket Projeleri ──────────────────────────────
    {
      name: 'Yıldız Holding',
      desc: 'Yıldız Holding kurumsal web platformu geliştirme ve sistem entegrasyonları.',
      descEn: 'Corporate web platform development and system integrations for Yıldız Holding.',
      tags: ['.NET', 'C#', 'Corporate', 'Enterprise'],
      url: 'https://www.yildizholding.com.tr/tr',
      thumb: null,
      emoji: '🌟',
      type: 'company',
    },
    {
      name: 'Ülker',
      desc: 'Ülker kurumsal web platformu geliştirme, servis entegrasyonları ve bakım süreçleri.',
      descEn: 'Corporate web platform development, service integrations, and maintenance for Ülker.',
      tags: ['.NET', 'C#', 'Web', 'Integration'],
      url: 'https://www.ulker.com.tr/tr',
      thumb: null,
      emoji: '🍫',
      type: 'company',
    },
    {
      name: 'Ford Türkiye',
      desc: 'Ford Otosan / Ford Türkiye kurumsal web platformu geliştirme ve altyapı çalışmaları.',
      descEn: 'Corporate web platform development and infrastructure for Ford Otosan / Ford Turkey.',
      tags: ['.NET', 'C#', 'Enterprise', 'Automotive'],
      url: 'https://www.ford.com.tr/',
      thumb: null,
      emoji: '🚗',
      type: 'company',
    },
    {
      name: 'İstanbul Ticaret Odası (İTO)',
      desc: 'İstanbul Ticaret Odası resmi web portalı geliştirme ve dijital servis entegrasyonları.',
      descEn: 'Official web portal development and digital service integrations for Istanbul Chamber of Commerce (ITO).',
      tags: ['.NET', 'C#', 'Portal', 'Public Services'],
      url: 'https://ito.org.tr/tr',
      thumb: null,
      emoji: '🏛️',
      type: 'company',
    },
    {
      name: 'Sabri Ülker Vakfı | Bilim Ödülü',
      desc: 'Sabri Ülker Vakfı Uluslararası Bilim Ödülü başvuru ve tanıtım web platformu.',
      descEn: 'Sabri Ülker Foundation International Science Award application and promotion platform.',
      tags: ['.NET', 'Web', 'Application System'],
      url: 'https://scienceaward.sabriulkerfoundation.org/en',
      thumb: null,
      emoji: '🔬',
      type: 'company',
    },
    {
      name: 'THY | Yatırımcı İlişkileri',
      desc: 'Türk Hava Yolları Yatırımcı İlişkileri kurumsal web portalı ve finansal veri servisleri.',
      descEn: 'Corporate investor relations portal and financial data services for Turkish Airlines.',
      tags: ['.NET', 'Enterprise', 'Finance', 'Aviation'],
      url: 'https://investor.turkishairlines.com/tr',
      thumb: null,
      emoji: '✈️',
      type: 'company',
    },
    {
      name: 'Yeryüzü Doktorları',
      desc: 'Yeryüzü Doktorları Derneği (YYD) resmi web platformu ve bağış altyapı geliştirmeleri.',
      descEn: 'Official web platform and donation infrastructure for Doctors Worldwide Turkey (YYD).',
      tags: ['.NET', 'NGO', 'Donation System', 'Web'],
      url: 'https://yyd.org.tr/',
      thumb: null,
      emoji: '🩺',
      type: 'company',
    },
    {
      name: 'e-Platform',
      desc: 'e-Platform bulut bilişim ve e-Dönüşüm çözümleri kurumsal web sitesi ve altyapısı.',
      descEn: 'Corporate web platform and infrastructure for e-Platform cloud and e-Transformation solutions.',
      tags: ['.NET', 'Cloud', 'e-Transformation', 'B2B'],
      url: 'https://eplatform.com.tr/tr',
      thumb: null,
      emoji: '☁️',
      type: 'company',
    },
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
