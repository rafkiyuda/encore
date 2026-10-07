# Encore — Website Company Profile & Pemesanan

Clean Power for MSMEs via Second-Life EV Batteries.
Stack: **React 19 + Vite + Tailwind CSS v4 + React Router**. Tanpa backend — pesanan & pengajuan dikirim lewat link WhatsApp.

## Menjalankan

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # hasil di folder dist/
npm run preview    # cek hasil build
```

Deploy: unggah `dist/` ke Netlify/Vercel. File `public/_redirects` (Netlify) dan `vercel.json` sudah disiapkan agar semua rute SPA berjalan.

## Mengubah konten — cukup edit `src/data/config.js`

| Yang diubah | Kunci di config.js |
|---|---|
| Nama, tagline, deskripsi, tim | `business` |
| **Nomor WhatsApp** (format `62812…`, tanpa +) | `business.whatsapp` & `business.whatsappDisplay` |
| Email, alamat | `business.email`, `business.address` |
| Harga & daftar paket | `packages` (`price: null` = "Hubungi kami") |
| Kapasitas modul, batas inverter, cadangan | `moduleSpec` |
| Daftar alat estimator (watt default) | `appliances` |
| Daftar Mitra Hub | `hubs` |
| Angka dampak (target/simulasi) | `impact`, `impactLabel` |
| FAQ (`home: true` = tampil di beranda) | `faqs` |
| Menu navigasi | `navLinks` |
| Pose maskot per lokasi | `mascotPoses` (nomor 1–20) |
| **QRIS pembayaran** | `payment` (lihat di bawah) |

## Pembayaran QRIS

Di langkah terakhir pemesanan pelanggan langsung scan QRIS, lalu mengirim bukti bayar via WhatsApp. Atur di `payment` (config.js), pilih salah satu:

1. **`qrisPayload`** (disarankan) — isi teks QRIS statis merchant (hasil scan QR statis, diawali `000201…`, diakhiri `6304XXXX`). Situs membuat QR baru dengan **nominal otomatis** sesuai total pesanan (tag 54 + CRC dihitung ulang di browser). Uji dulu sekali dengan nominal kecil.
2. **`qrisImage`** — taruh gambar QRIS statis di `public/brand/qris.png`; pelanggan mengetik nominal sendiri.

Isi juga `merchantName` dan `nmid` sesuai yang tertera di QRIS. Pelanggan yang memesan dari HP bisa menekan **Simpan gambar QRIS** lalu mengunggahnya dari galeri di aplikasi pembayaran.
Catatan: tanpa backend, pembayaran tidak terverifikasi otomatis — tim mengecek mutasi merchant berdasarkan bukti bayar + nomor pesanan. Layanan "Hubungi kami" (event/CSR) tetap lewat penawaran dulu.

## Aset brand — `public/brand/`

- **Maskot**: `public/brand/mascot/mascot-01.webp … mascot-20.webp` (+ versi `.png`). Urutan = grid sprite kiri→kanan, atas→bawah. Ganti pose di `mascotPoses`.
- **Logo**: `logo.png` (lengkap, halaman Tentang), `logo-horizontal.png` (navbar), `logo-horizontal-white.png` (footer), `logo-mark.png` (ikon), plus `public/favicon.png` & `apple-touch-icon.png`. Semua dibuat dari `scripts/logo-source.webp` dengan `python3 scripts/make_logo.py scripts/logo-source.webp` — ganti file sumber lalu jalankan ulang. Path diatur di `logo` pada config.js.
- Jika file gambar tidak ada, otomatis tampil kotak putus-putus berlabel — layout tetap rapi.
- Memotong ulang sprite sheet: `python3 scripts/cut_mascot.py path/ke/sprite.jpg` (butuh Pillow + numpy).

## Rute

`/` · `/tentang` · `/layanan` · `/estimator` · `/lokasi` · `/pesan` · `/pesan/sukses` · `/kemitraan?tab=hub|eo|csr` · `/faq` · `/kontak` · 404

Deep-link pemesanan: `/pesan?paket=fnb-ringan`, `/pesan?paket=fnb-berat&modul=4`, `/pesan?hub=hub-blokm`.

## Catatan

- Semua harga, angka dampak, hub, tim, dan logo mitra adalah **contoh/placeholder** dan diberi label di UI.
- Pembayaran: QRIS di halaman pemesanan (lihat bagian Pembayaran QRIS); tidak ada payment gateway.
- Draft pesanan disimpan di `localStorage` (dibungkus try/catch) sehingga tidak hilang saat refresh.
- Estimator: `modul = ceil(Σ(watt × jam × jumlah) × 1,2 ÷ kapasitas modul)`; peringatan muncul jika total daya sesaat > batas inverter.
