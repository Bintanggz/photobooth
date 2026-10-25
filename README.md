# 📸 Photobooth Mahasiswa — Web Life4Cuts & Strip Foto Gratis

> Web photobooth gratis, modern, dan estetik untuk mahasiswa Indonesia. Ambil 4 foto ala tren **Korean Life4Cuts / BeautyPlus**, pilih warna bingkai pastel, tambahkan filter warna, pasang stiker lucu, dan unduh strip foto resolusi tinggi langsung dari browsermu tanpa perlu login atau unduh aplikasi.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![React](https://img.shields.io/badge/React-18.3-blue.svg)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-6.0-purple.svg)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-3.4-38B2AC.svg)](https://tailwindcss.com/)
[![Privacy: 100% Client-Side](https://img.shields.io/badge/Privacy-100%25%20Client--Side-brightgreen.svg)](#privasi--keamanan)

---

## ✨ Fitur Unggulan

- **📸 Sesi Otomatis 4 Jepretan**: Sekuens otomatis dengan hitung mundur 3 detik tiap foto, efek kilatan blitz (*camera flash*), dan bunyi rana kamera mekanik.
- **🎨 8 Pilihan Warna Bingkai Real-Time**: Ketuk lingkaran warna (*Cream Ivory, Soft Rose Pink, Sky Cloud Blue, Lavender Lilac, Butter Yellow, Matcha Green, Studio White, Midnight Charcoal*) untuk mengubah warna strip secara instan.
- **🖼️ 4 Gaya Format Tema (Berbasis JSON)**:
  - *Korean Life4Cuts*: Bingkai pastel estetik ala bilik foto Seoul.
  - *Classic Studio White*: Tampilan putih minimalis ala Photism & Haru Film.
  - *Y2K Cyber Silver*: Nuansa futuristik perak tahun 2000 dengan stempel bintang.
  - *Edisi Mahasiswa & Wisuda*: Strip biru navy almamater untuk momen kampus dan sahabat.
- **🪄 Filter Warna Piksel Canvas**: Pilihan filter *Asli (Normal)*, *Korean Glow* (peach merona), *B&W Film* (monokrom kontras tinggi), *Vintage Warm* (hangat 90-an), dan *Y2K Cyber*.
- **🏷️ Stiker Mahasiswa Orisinal**: Koleksi stiker orisinal bebas royalti (*★ LULUS AMIN ★*, *✦ 인생네컷 ✦*, *♥ BESTIE 4EVER ♥*, *✓ BEBAS REVISI*, dll.) yang dapat ditempelkan langsung ke atas strip.
- **🔒 Privasi 100% Terjaga**: Semua proses pengambilan, manipulasi filter, dan penyimpanan foto dilakukan **sepenuhnya di sisi klien (browser pengguna)**. Tidak ada foto atau data apa pun yang dikirim ke server.
- **📱 Responsif Lintas Perangkat**: Mendukung layar HP (360–430px) dengan safe-area iPhone, tablet portrait/landscape, hingga laptop/desktop.
- **🔄 Fallback Unggah Galeri**: Jika izin kamera ditolak atau perangkat tidak memiliki webcam, pengguna tetap dapat mengunggah 4 foto dari galeri HP atau laptop.
- **📥 Ekspor Kualitas Cetak Fisik**: Merender strip foto pada resolusi penuh **1200 × 3600 px** (tajam untuk dicetak fisik) serta mendukung tombol **Web Share API** untuk langsung berbagi ke Instagram/WhatsApp.
- **⌨️ Kontrol Keyboard**: Tekan tombol `Space` atau `Enter` untuk langsung memicu jepretan foto.

---

## 🛠️ Tech Stack

- **Frontend Core**: [React 18](https://react.dev/) + [Vite 6](https://vitejs.dev/)
- **Styling**: [Tailwind CSS 3](https://tailwindcss.com/) + PostCSS + Autoprefixer
- **Graphic Engine**: HTML5 Canvas (Komposisi resolusi tinggi 2D, Smart Center-Crop algoritma, manipulasi piksel filter)
- **Audio Engine**: Web Audio API (Sintesis audio hitungan mundur dan suara shutter mekanik tanpa aset audio eksternal)
- **Tanpa Backend**: Berjalan murni client-side, dapat di-deploy secara statis di Cloudflare Pages, Vercel, Netlify, atau GitHub Pages.

---

## 🚀 Memulai (Jalankan Lokal)

### Prasyarat
- [Node.js](https://nodejs.org/) versi 18 ke atas
- npm, pnpm, atau yarn

### Langkah Instalasi

1. **Clone repositori**:
   ```bash
   git clone https://github.com/Bintanggz/photobooth.git
   cd photobooth
   ```

2. **Pasang dependensi**:
   ```bash
   npm install
   ```

3. **Jalankan server pengembangan**:
   ```bash
   npm run dev
   ```
   Buka peramban di `http://localhost:3000/`.

4. **Kompilasi produksi**:
   ```bash
   npm run build
   ```
   Hasil kompilasi siap dipublikasikan di folder `dist/`.

---

## 📂 Struktur Folder Proyek

```text
photobooth/
├── src/
│   ├── components/
│   │   ├── common/
│   │   │   └── Icons.jsx         # Ikon SVG monoline 2px (bebas emoji)
│   │   ├── ThemeScreen.jsx       # Layar 1: Pilih gaya tema, frame & warna
│   │   ├── CameraScreen.jsx      # Layar 2: Kamera live, countdown 3s, flash & snapshot
│   │   └── ResultScreen.jsx      # Layar 3: Kanvas cetak, ganti warna, filter, stiker & ekspor
│   ├── data/
│   │   ├── frameColors.js        # Palet 8 warna bingkai pastel instan
│   │   ├── stickers.js           # Katalog stiker orisinal mahasiswa
│   │   └── themes/               # Tema berbasis file JSON mandiri
│   │       ├── korean-strip.json
│   │       ├── retro-film.json
│   │       ├── y2k-cyber.json
│   │       ├── kampus-merdeka.json
│   │       └── index.js
│   ├── hooks/
│   │   └── useCamera.js          # Hook webcam, rotasi cermin, switch kamera depan/belakang
│   ├── utils/
│   │   ├── audioEffects.js       # Sintesis audio tick & shutter Web Audio API
│   │   └── canvasHelpers.js      # Perenderan canvas 1200x3600, center-crop, filter, ekspor PNG
│   ├── App.jsx                   # State machine alur 3 layar & navigasi
│   ├── main.jsx                  # Titik masuk React
│   └── index.css                 # Styling global, safe-area iOS, & animasi
├── DESIGN.md                     # Panduan desain visual sistematis
├── PROJECT_CONTEXT.md            # Batasan & konteks aturan pengembangan
├── tailwind.config.js
├── vite.config.js
└── package.json
```

---

## 🔒 Privasi & Keamanan

Aplikasi ini dirancang dengan prinsip **Privacy by Design**:
- Semua pemrosesan foto, kompresi, dan penambahan stiker dilakukan secara lokal di peramban pengguna melalui memori canvas.
- Tidak ada database, tidak ada cookie pelacak, dan tidak ada server backend penampung berkas.
- Menggunakan `URL.revokeObjectURL()` untuk segera membersihkan alokasi memori setelah pengunduhan berkas selesai.

---

## 🤝 Berkontribusi

Kontribusi dari komunitas sangat terbuka! Jika Anda ingin menambahkan tema baru, desain stiker baru, atau perbaikan performa:
1. Fork repositori ini
2. Buat branch fitur baru (`git checkout -b fitur/tema-baru`)
3. Commit perubahan Anda (`git commit -m "feat: tambah tema baru"`)
4. Push ke branch Anda (`git push origin fitur/tema-baru`)
5. Buka Pull Request

---

## 📄 Lisensi

Didistribusikan di bawah lisensi **MIT**. Silakan lihat berkas [LICENSE](LICENSE) untuk rincian selengkapnya.

---

Dibuat dengan ❤️ untuk seluruh mahasiswa dan kreator muda di Indonesia.
