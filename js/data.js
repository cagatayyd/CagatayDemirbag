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
      thumb: 'assets/projects/RCSummerLogo.png',
      emoji: '🏫',
      type: 'personal',
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
      desc: 'Yıldız Holding kurumsal web sitesinin bakımı, hata giderimi ve yeni özelliklerin geliştirilmesi.',
      descEn: 'Maintenance, bug fixing and new feature development for the Yıldız Holding corporate website.',
      tags: ['.NET', 'C#'],
      url: 'https://www.yildizholding.com.tr/tr',
      thumb: 'assets/projects/yildiz.png',
      emoji: '🌟',
      type: 'company',
    },
    {
      name: 'Ülker',
      desc: 'Ülker kurumsal web sitesinin bakımı, hata giderimi ve yeni özelliklerin geliştirilmesi.',
      descEn: 'Maintenance, bug fixing and new feature development for the Ülker corporate website.',
      tags: ['.NET', 'C#'],
      url: 'https://www.ulker.com.tr/tr',
      thumb: 'assets/projects/ulker.png',
      emoji: '🍫',
      type: 'company',
    },
    {
      name: 'Ford Türkiye',
      desc: 'Ford Türkiye kurumsal web sitesinin bakımı, hata giderimi ve yeni özelliklerin geliştirilmesi.',
      descEn: 'Maintenance, bug fixing and new feature development for the Ford Turkey corporate website.',
      tags: ['.NET', 'C#'],
      url: 'https://www.ford.com.tr/',
      thumb: 'assets/projects/Ford-Logo.png',
      emoji: '🚗',
      type: 'company',
    },
    {
      name: 'İstanbul Ticaret Odası (İTO)',
      desc: 'İTO resmi web portalının bakımı, hata giderimi ve yeni özelliklerin geliştirilmesi.',
      descEn: 'Maintenance, bug fixing and new feature development for the Istanbul Chamber of Commerce (ITO) web portal.',
      tags: ['.NET', 'C#'],
      url: 'https://ito.org.tr/tr',
      thumb: 'assets/projects/ito.jpg',
      emoji: '🏛️',
      type: 'company',
    },
    {
      name: 'Sabri Ülker Vakfı | Bilim Ödülü',
      desc: 'Sabri Ülker Bilim Ödülü platformunun bakımı, hata giderimi ve yeni özelliklerin geliştirilmesi.',
      descEn: 'Maintenance, bug fixing and new feature development for the Sabri Ülker Science Award platform.',
      tags: ['.NET', 'C#'],
      url: 'https://scienceaward.sabriulkerfoundation.org/en',
      thumb: 'assets/projects/sabriulker.jpg',
      emoji: '🔬',
      type: 'company',
    },
    {
      name: 'Yeryüzü Doktorları',
      desc: 'Yeryüzü Doktorları (YYD) web sitesinin bakımı, hata giderimi ve yeni özelliklerin geliştirilmesi.',
      descEn: 'Maintenance, bug fixing and new feature development for the Doctors Worldwide Turkey (YYD) website.',
      tags: ['.NET', 'C#'],
      url: 'https://yyd.org.tr/',
      thumb: 'assets/projects/yyd.jpg',
      emoji: '🩺',
      type: 'company',
    },
    {
      name: 'THY | Yatırımcı İlişkileri',
      desc: 'Türk Hava Yolları Yatırımcı İlişkileri portalının baştan sona yeniden geliştirilmesi; bakım, yeni özellikler ve DevOps süreçlerinin yürütülmesi.',
      descEn: 'End-to-end redevelopment of the Turkish Airlines Investor Relations portal; maintenance, new features and DevOps operations.',
      tags: ['.NET', 'C#', 'SQL', 'DevOps'],
      url: 'https://investor.turkishairlines.com/tr',
      thumb: 'assets/projects/thy.png',
      emoji: '✈️',
      type: 'company',
    },
    {
      name: 'e-Platform',
      desc: 'DevOps: Linux ve Windows sunucu yönetimi, CI/CD süreçleri, health check servislerinin geliştirilmesi, Elasticsearch & Kibana ile log yönetimi ve izleme, sistemlerin bakımı ve sürekliliğinin sağlanması.',
      descEn: 'DevOps: Linux and Windows server management, CI/CD pipelines, development of health check services, log management and monitoring with Elasticsearch & Kibana, and system maintenance and reliability.',
      tags: ['DevOps', 'Linux', 'Windows Server', 'Health Check', 'Elasticsearch', 'Kibana', '.NET', 'C#'],
      url: 'https://eplatform.com.tr/tr',
      thumb: 'assets/projects/eplatform-logo.png',
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
