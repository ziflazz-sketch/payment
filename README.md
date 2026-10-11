# PT Ziflazz Premium Server — Halaman Pembayaran Web

Halaman web statis satu layar untuk informasi pembayaran resmi **PT Ziflazz Premium Server**. Dibuat sesuai spesifikasi [PRD.md](PRD.md) dan desain visual resmi dari dokumen PDF `Payment_PT_Ziflazz_Premium_Server.pdf`.

---

## ✨ Fitur Utama

- **QRIS Statis Standar Nasional**: Menampilkan gambar QRIS resmi (*ZIFLAZZ STORE, PULSA PAKET DATA*, NMID: `ID1026481872061`) tanpa kompresi lossy agar mudah dan cepat dipindai oleh semua aplikasi bank dan e-wallet.
- **Petunjuk Nominal**: Teks panduan *"Masukkan nominal sesuai tagihan Anda saat membayar"* sesuai kebutuhan F1a.
- **Tombol Unduh QRIS**: Pengguna dapat langsung menyimpan kode QRIS ke galeri ponsel untuk dipindai via aplikasi perbankan.
- **Salin Nomor GoPay & Email**: Satu ketukan untuk menyalin nomor GoPay (`0821 5102 5831`) dan alamat email (`rafanurulizzaalfaqih21@gmail.com`) dengan Clipboard API & cadangan fallback `execCommand`.
- **Feedback Salin**: Notifikasi pop-up Toast *"Tersalin"* dan perubahan visual tombol dengan getaran haptik pada perangkat yang mendukung.
- **Aksi Cepat Email**: Tautan instan `mailto:` untuk konfirmasi pembayaran langsung ke aplikasi email pengguna.
- **Desain UI/UX Mewah & Responsif**:
  - Palet warna resmi: Navy (`#0F1E3A`, `#16294D`), Emas aksen (`#C9A961`), dan latar belakang hangat (`#F5F3EE`).
  - Tipografi Google Poppins (self-hosted).
  - Tampilan mulus di segala ukuran layar: mulai dari HP 320 px, 375 px, hingga layar Desktop.
- **Dukungan Dark Mode**: Toggle mode gelap dan terang dengan penyimpanan preferensi otomatis di `localStorage`.
- **Open Graph & Twitter Preview**: Dilengkapi meta tag lengkap dan aset banner pratinjau `assets/og-image.png` (1200×630 px) untuk tampilan rapi saat tautan dibagikan via WhatsApp, Telegram, dll.

---

## 📁 Struktur Berkas

```
ziflazz-payment/
├── index.html              # Halaman web utama
├── assets/
│   ├── qris.png            # Gambar QRIS asli tanpa penurunan kualitas (892×1051)
│   ├── og-image.png        # Gambar pratinjau media sosial (1200×630)
│   └── fonts/              # Font Poppins self-hosted (woff2)
│       ├── poppins-300.woff2
│       ├── poppins-400.woff2
│       ├── poppins-500.woff2
│       ├── poppins-600.woff2
│       └── poppins-700.woff2
├── css/
│   └── style.css           # Sistem desain tokens, tata letak, dan animasi
├── js/
│   └── app.js              # Logika salin clipboard, toast, tema, dan download
├── vercel.json             # Konfigurasi deployment & security headers Vercel
├── netlify.toml            # Konfigurasi deployment & security headers Netlify
└── README.md               # Dokumentasi proyek
```

---

## 🚀 Panduan Menjalankan Secara Lokal

Anda dapat membuka file `index.html` langsung di browser mana pun (Chrome, Edge, Safari, Firefox), atau menggunakan local server:

### Menggunakan Python (jika terpasang):
```bash
python -m http.server 3000
```

### Menggunakan Node.js / npx:
```bash
npx serve .
```

---

## 🌐 Panduan Deployment

### 1. Vercel (Rekomendasi Utama)
1. Unggah folder proyek ke repositori GitHub.
2. Masuk ke dashboard [Vercel](https://vercel.com/) dan klik **Add New Project**.
3. Impor repositori GitHub Anda.
4. Pilih preset **Other** (situs statis murni).
5. Kosongkan *Build Command* dan atur *Output Directory* ke `.`.
6. Klik **Deploy**.
   *File `vercel.json` akan otomatis menerapkan security headers (`X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`).*

### 2. Netlify (Opsi Cadangan)
1. Masuk ke [Netlify](https://app.netlify.com/).
2. Tarik dan lepas (Drag & drop) seluruh folder `ziflazz-payment` ke area **Netlify Drop**, atau hubungkan dengan repositori GitHub.
3. Netlify akan otomatis mendeteksi konfigurasi dari file `netlify.toml`.

---

## ✅ Kriteria Penerimaan (Acceptance Criteria)

- [x] QRIS tampil jelas dan gambar identik dengan file referensi PDF.
- [x] Tombol salin nomor GoPay dan email berfungsi dengan Clipboard API dan fallback.
- [x] Notifikasi "Tersalin" muncul secara elegan.
- [x] Tautan `mailto:` berfungsi untuk mengirim email konfirmasi pembayaran.
- [x] Tombol unduh QRIS berfungsi menyimpan file ke perangkat.
- [x] Bebas scroll horizontal dari 320 px hingga layar desktop.
- [x] Font Poppins self-hosted untuk kecepatan rendering instan tanpa ketergantungan pihak ketiga.
- [x] File konfigurasi `vercel.json` dan `netlify.toml` tersedia dan siap pakai.
