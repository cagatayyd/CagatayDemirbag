# Çağatay Demirbağ — Portfolio v2

> Retro Windows/DOS temalı, interaktif portfolyo sitesi

## 🚀 Hızlı Başlangıç

Sadece `index.html` dosyasını bir tarayıcıda aç. Backend gerekmez.

```
CagatayDemirbag/
├── index.html          ← Giriş noktası
├── css/
│   ├── style.css       ← Ana stiller + layout
│   ├── windows.css     ← Popup pencere stilleri
│   ├── terminal.css    ← CMD terminal stilleri
│   └── retro.css       ← CRT efektleri, scanlines, noise
├── js/
│   ├── data.js         ← 📝 Buradan verilerini düzenle!
│   ├── windows.js      ← Drag/resize/z-index sistemi
│   ├── terminal.js     ← CMD komut motoru
│   └── main.js         ← EmailJS, saat, render, glitch
└── assets/
    ├── bg.gif          ← ⚠️ Arkaplan GIF'ini buraya koy!
    ├── efso1.png       ← Hero fotoğrafı
    ├── profile.jpg     ← About popup fotoğrafı
    └── projects/       ← Proje görselleri (opsiyonel)
```

## ✏️ İçerik Düzenleme

### Proje ekle → `js/data.js`

```js
projects: [
  {
    name: 'Proje Adı',
    desc: 'Açıklama',
    tags: ['C#', '.NET'],
    url: 'https://github.com/...',
    thumb: 'assets/projects/proje.png', // veya null
    emoji: '🚀',
  },
]
```

### Skill ekle → `js/data.js`

```js
{ name: 'Docker', pct: 70 }
```

## 🎮 Terminal Komutları

| Komut | Açıklama |
|---|---|
| `help` | Yardım listesi |
| `about` | Hakkımda |
| `projects` | Projeleri listele |
| `skills` | Yetenekler |
| `contact` | İletişim bilgileri |
| `open <pencere>` | Pencere aç |
| `neofetch` | Sistem bilgisi |
| `matrix` | 🟩 |
| `clear` | Temizle |
| `↑ / ↓` | Komut geçmişi |
| `Tab` | Otomatik tamamlama |

## 🖼️ GIF Arka Plan

`assets/bg.gif` olarak kaydet, otomatik yüklenir.

Öneri kaynaklar:
- [giphy.com](https://giphy.com) → "city rain", "lofi night", "pixel city"
- [tenor.com](https://tenor.com)

## 📧 EmailJS

`js/data.js` içinde zaten gerçek anahtarların var:
```js
emailjs: {
  publicKey:  'zKVk7OlXiFu9FiAnK',
  serviceID:  'service_13qr418',
  templateID: 'template_eln9afr',
}
```

## 🌐 Yayın

1. Dosyaları hosting sağlayıcına FTP/Git ile yükle
2. Domain DNS'ini hosting IP'sine yönlendir
3. SSL sertifikası al (Let's Encrypt — ücretsiz)

**Önerilen:** Netlify ile drag-drop deploy (ücretsiz SSL dahil)
