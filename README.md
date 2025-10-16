# 🏃‍♂️ BMI & Bel Çevresi Hesaplayıcı

Modern ve kullanıcı dostu bir web uygulaması ile BMI (Vücut Kitle İndeksi) değerinizi ve tahmini bel çevrenizi hızlıca hesaplayın.

![Uygulama Önizleme](https://img.shields.io/badge/Status-Active-success?style=flat-square)
![Next.js](https://img.shields.io/badge/Next.js-15.5.4-black?style=flat-square&logo=next.js)
![React](https://img.shields.io/badge/React-19.1.0-61DAFB?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=flat-square&logo=typescript)

## ✨ Özellikler

- 🎯 **Hızlı Hesaplama**: Anında BMI ve tahmini bel çevresi hesaplama
- 📱 **Responsive Tasarım**: Mobil ve masaüstü uyumlu modern arayüz
- 🎨 **Modern UI/UX**: Material-UI bileşenleri ile şık tasarım
- ⚡ **Canlı Önizleme**: Değer değiştikçe otomatik hesaplama
- 🌙 **Karanlık Mod Desteği**: Otomatik tema değişimi
- 🔒 **Form Doğrulama**: Zod ile güçlü veri doğrulama
- 📤 **Paylaşım Özelliği**: Sonuçlarınızı kolayca paylaşın
- 🎭 **Animasyonlar**: Smooth geçişler ve interaktif animasyonlar

## 🚀 Teknolojiler

### Frontend

- **Next.js 15.5.4** - React framework
- **React 19.1.0** - UI kütüphanesi
- **TypeScript** - Tip güvenliği
- **Material-UI (MUI)** - UI bileşenleri
- **React Hook Form** - Form yönetimi
- **Zod** - Schema doğrulama
- **Emotion** - CSS-in-JS

### Geliştirme Araçları

- **ESLint** - Kod kalitesi
- **Turbopack** - Hızlı build sistemi

## 📋 Sistem Gereksinimleri

- Node.js 18.0.0 veya üzeri
- npm veya yarn paket yöneticisi
- Modern web tarayıcısı

## 📖 Kullanım

1. **Yaş**: 0-120 arası yaşınızı girin
2. **Boy**: 100-250 cm arası boyunuzu girin
3. **Kilo**: 20-400 kg arası kilonuzu girin
4. **Cinsiyet**: Erkek veya Kadın seçin

Değerleri girdikçe BMI ve tahmini bel çevresi otomatik olarak hesaplanacaktır.

### BMI Kategorileri

- **Zayıf**: BMI < 18.5
- **Sağlıklı**: 18.5 ≤ BMI < 25
- **Şişman**: 25 ≤ BMI < 30
- **Obez**: 30 ≤ BMI < 40
- **Morbid Obez**: BMI ≥ 40

## 📁 Proje Yapısı

```
frontend/
├── src/
│   ├── app/
│   │   ├── globals.css          # Global CSS stilleri
│   │   ├── layout.tsx           # Ana layout bileşeni
│   │   ├── page.tsx             # Ana sayfa bileşeni
│   │   └── page.module.css      # Sayfa modül stilleri
│   └── lib/
│       └── validation.ts        # Zod şema doğrulamaları
├── public/                      # Statik dosyalar
├── package.json                 # Proje bağımlılıkları
├── tsconfig.json               # TypeScript yapılandırması
├── next.config.ts              # Next.js yapılandırması
└── eslint.config.mjs           # ESLint yapılandırması
```

## 🎨 Tasarım Özellikleri

### Renk Paleti

- **Primary**: Mavi tonları (#3498db, #2980b9)
- **Success**: Yeşil (#27ae60)
- **Warning**: Turuncu (#f39c12)
- **Danger**: Kırmızı (#e74c3c)

### Animasyonlar

- Fade-in efektleri
- Slide geçişleri
- Pulse animasyonları
- Hover efektleri

## 🚨 Önemli Notlar

- Bu uygulama yalnızca bilgilendirme amaçlıdır
- Tahmini bel çevresi hesaplaması yaklaşık bir değerdir
- Klinik değerlendirme yerine geçmez
- Sağlık sorunları için mutlaka doktor konsültasyonu alın

## 🤝 Katkıda Bulunma

1. Bu repository'yi fork edin
2. Feature branch oluşturun (`git checkout -b feature/yeni-ozellik`)
3. Değişikliklerinizi commit edin (`git commit -am 'Yeni özellik eklendi'`)
4. Branch'inizi push edin (`git push origin feature/yeni-ozellik`)
5. Pull Request oluşturun

## 📄 Lisans

Bu proje MIT lisansı altında lisanslanmıştır. Detaylar için [LICENSE](LICENSE) dosyasına bakın.

## 👨‍💻 Geliştirici

- **GitHub**: [@erkintekin](https://github.com/erkintekin)
