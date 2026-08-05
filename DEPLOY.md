# Cloudflare Pages'a Deploy

Bu proje İran'da VPN'siz erişim için Cloudflare Pages'te host edilecek.

## 📋 Önkoşullar

- [x] GitHub hesabı (yoksa: https://github.com/signup)
- [x] Cloudflare hesabı (yoksa: https://dash.cloudflare.com/sign-up — ücretsiz, kredi kartı yok)
- [x] Git kurulu (https://git-scm.com/download/win)

---

## Adım 1: GitHub'da yeni repo oluştur

1. https://github.com/new adresine git
2. **Repository name:** `koodak-english`
3. **Public** seç (Cloudflare Pages public repo ister)
4. **"Add a README file"** işaretleme (zaten var)
5. **"Add .gitignore"** seçme (yazacağız)
6. **"Choose a license"** seçme
7. **"Create repository"** tıkla

---

## Adım 2: Lokal'den GitHub'a push et

PowerShell'de şu komutları sırayla çalıştır (kullanıcı adını kendi GitHub kullanıcı adınla değiştir):

```powershell
cd C:\Users\ibrahim.soyarslan\.minimax-agent\projects\koodak-english

# Git yapılandırması (ilk kez yapıyorsan)
git config --global user.name "Senin Adın"
git config --global user.email "senin@email.com"

# Repo başlat
git init
git add .
git commit -m "Initial commit: Koodak English v1"

# main branch adını ayarla
git branch -M main

# GitHub remote ekle (KULLANICI_ADIN yeri kendi adınla değiştir)
git remote add origin https://github.com/KULLANICI_ADIN/koodak-english.git

# Push et
git push -u origin main
```

### Kimlik doğrulama

GitHub şifreyle artık kabul etmiyor. İki seçenek var:

**Seçenek A (kolay): GitHub Desktop**
1. https://desktop.github.com → indir ve kur
2. GitHub hesabınla giriş yap
3. "Add local repository" → klasörü seç
4. "Publish repository" tıkla

**Seçenek B (terminal): Personal Access Token (PAT)**
1. https://github.com/settings/tokens/new adresine git
2. **Note:** "Koodak English"
3. **Expiration:** 90 days (veya istediğin)
4. **Scopes:** `repo` (en üstteki) → seç
5. **"Generate token"** → token'ı kopyala (bir daha gösterilmez!)
6. Push sırasında:
   - Username: GitHub kullanıcı adın
   - Password: **kopyaladığın token** (şifre değil!)

---

## Adım 3: Cloudflare Pages'a bağla

1. https://dash.cloudflare.com adresine git, giriş yap
2. Sol menüde **"Workers & Pages"** → **"Create application"** → **"Pages"** sekmesi → **"Connect to Git"**
3. **"GitHub"** seç → Cloudflare'a yetki ver (ilk seferde)
4. **"koodak-english"** reposunu seç → **"Begin setup"**
5. **Project name:** `koodak-english`
6. **Production branch:** `main`
7. **Build command:** boş bırak
8. **Build output directory:** `/` veya boş
9. **"Save and Deploy"** tıkla

2-3 dakika bekle. Tamamlandığında `https://koodak-english.pages.dev` canlı olur.

---

## Adım 4 (opsiyonel): Web3Forms aktifleştir

Form gerçekten sana e-posta göndersin istersen:

1. https://web3forms.com adresine git
2. E-postanı yaz → **Access Key** al
3. `index.html` dosyasında şu satırı bul:
   ```html
   <input type="hidden" name="access_key" value="YOUR_ACCESS_KEY_HERE">
   ```
4. `YOUR_ACCESS_KEY_HERE` yerine access key'i yapıştır
5. Kaydet, sonra:
   ```powershell
   git add .
   git commit -m "Configure Web3Forms"
   git push
   ```
6. 1-2 dakikada otomatik deploy olur, form çalışır

---

## Adım 5 (opsiyonel): Gerçek domain ekle

Bir gün `koodak-english.com` gibi bir domain istersen:

1. Cloudflare dashboard → sol menü → **"Register Domains"** → ara
2. ~$9/yıl'a satın al (Cloudflare markup eklemez)
3. Pages projesi → **"Custom domains"** → **"Set up a custom domain"**
4. Domain adını yaz → sihirbaz DNS'i otomatik halleder
5. 5 dakikada aktif

---

## 🆘 Sorun mu var?

**"Build failed" hatası:** Build command ve output directory'nin boş olduğundan emin ol.

**"Repository not found":** GitHub remote URL'inde kullanıcı adın doğru mu kontrol et.

**"Authentication failed":** PAT (Personal Access Token) kullanıyor olmalısın, şifre değil.

**Sayfa boş geliyor:** Tarayıcı konsolunu aç (F12) → hata varsa kopyala, bana gönder.

---

## 🔄 Sonraki güncellemeler

`js/data.js`, `fa/strings.json` veya başka bir dosyayı değiştirdiğinde:

```powershell
cd C:\Users\ibrahim.soyarslan\.minimax-agent\projects\koodak-english
git add .
git commit -m "Açıklayıcı mesaj (örn: Add Numbers section)"
git push
```

1-2 dakikada otomatik deploy olur. Canlı site güncellenir.
