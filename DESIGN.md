# PANDUAN DESAIN VISUAL (DESIGN.md)
**Tema: Modern Korean Life4Cuts & Studio Photobooth (Inspirasi: BeautyPlus & Haru Film)**

Dokumen ini adalah acuan visual tunggal dan mutlak untuk proyek Photobooth Mahasiswa. Menghadirkan kembali nuansa asli bilik photobooth Korea (Life4Cuts / Haru Film / BeautyPlus) yang bersih, estetik, hangat, dan menyenangkan bagi mahasiswa.

---

## 1. Konsep & Identitas Produk

Aplikasi ini meniru antarmuka mesin bilik foto studio modern (Life4Cuts), BUKAN tampilan terminal hitam kaku atau wireframe teknis:

- **Karakter**: Estetik, ramah, hangat (*warm & cozy studio*), trendi, dan menyenangkan untuk berfoto sendiri maupun bersama teman/pacar.
- **Inspirasi Fisik**: Bilik foto studio Korea berpencahayaan lembut (*ring light studio*), kertas foto cetak tebal berbingkai warna-warni (cream, pastel pink, sky blue, lavender, studio white, midnight), stempel tanggal estetik, dan stiker dekorasi menggemaskan.

---

## 2. Design Tokens

### A. Palet Warna (Modern Studio & Pastel Frames)

| Peran | Nama Token | Kode HEX | Karakter & Penggunaan |
| :--- | :--- | :--- | :--- |
| **Studio Background** | `studio-bg` | `#121216` | Latar belakang studio gelap modern yang membuat strip foto pop-out. |
| **Studio Card** | `studio-card` | `#1E1E24` | Wadah panel kontrol dan kartu pilihan dengan kontras bersih. |
| **Border Halus** | `studio-border`| `#2E2E38` | Garis batas tipis modern dan elegan. |
| **Aksen Utama** | `brand-pink` | `#FF4B72` | Tombol shutter utama, status aktif, dan aksen ceria photobooth. |
| **Teks Utama** | `text-primary` | `#F9F9FB` | Teks judul dan label utama (kontras tinggi). |
| **Teks Sekunder** | `text-secondary`| `#A1A1B0`| Deskripsi, petunjuk kontrol, dan metadata. |

### B. Palet Warna Bingkai Strip Foto (Frame Swatches)
Pilihan warna fisik frame strip yang dapat dipilih pengguna secara instan:
- **Cream Ivory**: `#FAF6EE` (Klasik Life4Cuts hangat)
- **Soft Rose Pink**: `#FFE4E8` (Nuansa pastel manis)
- **Sky Cloud Blue**: `#E0F2FE` (Biru muda cerah)
- **Lavender Lilac**: `#F3E8FF` (Ungu pastel lembut)
- **Butter Yellow**: `#FEF9C3` (Kuning pastel cerah)
- **Matcha Green**: `#DCFCE7` (Hijau pastel segar)
- **Studio White**: `#FFFFFF` (Putih minimalis bersih)
- **Midnight Charcoal**: `#1E1E22` (Hitam pekat elegan)

---

## 3. Tipografi

Font yang dipakai:
1. **Primary & UI Font**: `Plus Jakarta Sans` (Google Fonts, Sans-Serif).
   - Geometris, modern, bersahabat, dan memiliki keterbacaan tinggi di segala ukuran layar.
2. **Display & Tanggal Estetik**: `Space Mono` / `Plus Jakarta Sans Bold` untuk penomoran slot dan stempel tanggal.

**Aturan Ukuran Font**:
- Seluruh teks antarmuka minimal 16px (`text-base`).
- Judul: 24px–32px (`text-2xl`–`text-3xl`), tebal (*bold*), dengan kerning yang rapi.

---

## 4. Bentuk, Radius & Bayangan

- **Radius Sudut**: `rounded-2xl` (16px) dan `rounded-3xl` (24px) untuk kartu, viewfinder, dan panel alat.
- **Bayangan**: Bayangan studio lembut berlapis (`shadow-xl`, `shadow-2xl`) yang memberikan kedalaman fisik seolah kertas foto tergeletak di atas meja studio.
- **Pratinjau Strip Foto**: Tepi foto yang rapi dengan margin putih/warna proporsional, siluet pose yang menarik, dan stempel tanggal modern di bawah.

---

## 5. Gaya Ikonografi

Semua ikon digambar dengan elemen **SVG inline konsisten**:
- Garis halus 2px dengan ujung membulat (*stroke-linecap="round"*, *stroke-linejoin="round"*).
- Ikon kamera bulat besar, putar kamera, unduh, stiker, filter, dan warna frame.

---

## 6. Gaya Gerak (Motion)

1. **Kilatan Shutter (Camera Flash)**: Kilatan putih cerah sesaat saat foto diambil.
2. **Countdown Pop**: Animasi gelembung hitung mundur 3, 2, 1 dengan scaling lembut (*spring scale*).
3. **Hover & Active Feedback**: Tombol dan swatch warna memiliki transisi skala halus saat disentuh atau diarahkan kursor.

---

## 7. Nada Tulisan (Copywriting)

Bahasa mahasiswa Indonesia yang santai, ceria, dan bersahabat:
- "Pilih Frame & Warna"
- "Ambil 4 Foto (3 Detik per Pose)"
- "Hias Strip Fotomu"
- "Unduh Foto Strip (PNG)"
- "100% Gratis & Diproses di Perangkatmu"
