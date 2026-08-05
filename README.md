# Koodak English (کودک انگلیسی)

İranlı çocuklar (2-6 yaş) için Farsça arayüzlü, İngilizce eğitim içerikli ücretsiz, reklamsız web sitesi.

Free, ad-free English-learning site for Iranian children (ages 2-6) with a Farsi UI.

## ✨ Özellikler / Features

- 🇮🇷 Farsça (varsayılan, RTL) + 🇬🇧 English
- 🔤 Alfabe bölümü (26 harf, sesli okuma, emoji görsel)
- 🔊 Sesli okuma — tarayıcının kendi motoru (Web Speech API), sunucu yok
- 📊 İlerleme takibi (localStorage, sunucu yok, KVKK uyumlu)
- 📱 Mobil öncelikli tasarım, yavaş internet dostu
- 🚀 Cloudflare Pages'te host (İran'dan VPN'siz erişim)
- 🔒 Reklamsız, izlemesiz, çocuk güvenli
- ♿ Klavye navigasyonu, screen reader uyumlu
- 🌐 Çevrimdışı kısmen çalışır (bir kez yüklenince cache'lenir)

## 🗂️ Dosya Yapısı / File Structure

```
koodak-english/
├── index.html              Ana sayfa
├── css/styles.css          Tüm stiller
├── js/
│   ├── i18n.js             Dil yönetimi
│   ├── tts.js              Sesli okuma (Web Speech API)
│   ├── progress.js         İlerleme takibi (localStorage)
│   ├── data.js             Ders içerikleri
│   └── app.js              Ana uygulama
├── fa/strings.json         Farsça UI metinleri
├── en/strings.json         İngilizce UI metinleri
├── README.md               Bu dosya
└── DEPLOY.md               Cloudflare Pages'a deploy adımları
```

## 💻 Lokal'de test etmek

```powershell
# PowerShell'de (Python gerekli)
cd C:\Users\ibrahim.soyarslan\.minimax-agent\projects\koodak-english
python -m http.server 8080

# veya Node.js ile
npx serve .
```

Sonra tarayıcıda `http://localhost:8080` aç.

## 🚀 Deploy

Detaylı adımlar için [`DEPLOY.md`](./DEPLOY.md) dosyasına bak. Özet: GitHub repo + Cloudflare Pages = 10 dakika.

## 📬 Web3Forms (iletişim formu)

Form çalışsın istersen:
1. [web3forms.com](https://web3forms.com) → e-postanla kayıt ol → Access Key al
2. `index.html`'de `YOUR_ACCESS_KEY_HERE` yerine yapıştır
3. `git push` → otomatik deploy

Bu adımı yapmadan da site tamamen çalışır; form demo modunda olur.

## 🤝 İçerik katkısı

Arkadaşın (İngilizce öğretmeni) ile birlikte:
- Kelime listeleri (alfabe, sayılar, renkler, vb.)
- Farsça çeviriler
- Şarkı sözleri
- Düzeltmeler

Ekleyince `js/data.js` ve `fa/strings.json` / `en/strings.json` dosyalarını güncelle.

## 📜 Lisans

Açık kaynak, eğitim amaçlı, ücretsiz.
