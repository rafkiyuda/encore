/**
 * ============================================================
 *  KONFIGURASI KONTEN ENCORE
 *  Semua teks/angka yang sering berubah ada di file ini.
 *  Ubah di sini — komponen tidak perlu disentuh.
 *  Catatan: semua harga, angka dampak, hub, dan mitra adalah CONTOH.
 * ============================================================
 */

// ---------- Identitas bisnis ----------
export const business = {
  name: 'Encore',
  tagline: 'Clean Power for MSMEs via Second-Life EV Batteries',
  taglineId: 'Listrik bersih untuk UMKM dari baterai kendaraan listrik bekas, tinggal tukar.',
  nameMeaning:
    '"Encore" berarti pertunjukan ulang atau babak kedua — seperti baterai kendaraan listrik yang mendapat kehidupan kedua untuk menerangi lapak UMKM.',
  description:
    'Encore memberi kehidupan kedua bagi baterai kendaraan listrik bekas dengan mengubahnya menjadi modul daya yang bisa ditukar dan diisi tenaga surya. Melalui jaringan Mitra Hub self-service, Encore membantu PKL, UMKM, dan penyelenggara event mendapatkan listrik yang aman, bersih, dan terjangkau tanpa genset dan tanpa modal awal.',
  team: 'OneShot',
  // Nomor WhatsApp format internasional TANPA "+" dan spasi. [PLACEHOLDER]
  whatsapp: '6281234567890',
  whatsappDisplay: '+62 812-3456-7890',
  email: 'halo@encore.example', // [PLACEHOLDER]
  address: 'Jl. Contoh Energi No. 1, Jakarta Selatan', // [PLACEHOLDER]
  instagram: '@encore.example', // [PLACEHOLDER]
}

// ---------- Tim OneShot ----------
// role: isi jabatan bila sudah ditentukan. photo: path foto (mis. '/brand/team/melvin.webp'); kosong = avatar inisial.
export const team = [
  { name: 'Rafki', role: '', photo: '' },
  { name: 'Melvin', role: '', photo: '' },
  { name: 'Marco', role: '', photo: '' },
]

// ---------- Aset brand (ganti file di public/brand/ tanpa ubah kode) ----------
// Pemetaan pose maskot (nomor = urutan grid sprite, kiri→kanan, atas→bawah)
export const mascotPoses = {
  hero: 1, // jempol sambil memegang modul
  thumbsUp: 1,
  stepChoose: 8, // memegang tablet
  stepPickup: 9, // menarik modul beroda
  stepUse: 7, // jongkok mengecek modul
  stepSwap: 2, // mengangkat modul
  estimator: 15, // berpikir
  about: 5, // tangan dilipat, percaya diri
  partnership: 14, // tangan terbuka mempersilakan
  success: 19, // kedua tangan diangkat merayakan
  cta: 3, // menunjuk ke samping
  notFound: 17, // membelakangi
  impact: 11, // pose kuat
}

const posePath = (n) => `/brand/mascot/mascot-${String(n).padStart(2, '0')}.webp`
export const mascot = Object.fromEntries(Object.entries(mascotPoses).map(([k, n]) => [k, posePath(n)]))

export const logo = {
  // Dibuat dari scripts/logo-source.webp via: python3 scripts/make_logo.py scripts/logo-source.webp
  main: '/brand/logo.png', // logo lengkap (ikon + ENCORE + tagline)
  horizontal: '/brand/logo-horizontal.png', // navbar
  horizontalWhite: '/brand/logo-horizontal-white.png', // footer gelap
  mark: '/brand/logo-mark.png', // ikon saja
}

// ---------- Pembayaran QRIS ----------
// Pilih SALAH SATU cara:
// 1) qrisPayload: isi teks QRIS statis milik merchant (hasil scan QR statis, diawali "000201...").
//    Situs akan membuat QR baru dengan NOMINAL OTOMATIS sesuai total pesanan.
// 2) qrisImage: taruh gambar QRIS statis di public/brand/qris.png. Pelanggan mengetik nominal sendiri.
// Jika keduanya kosong/tidak ada → tampil kotak placeholder.
export const payment = {
  qrisPayload: '', // [ISI] contoh: '00020101021126...6304ABCD'
  qrisImage: '/brand/qris.png', // [ISI] gambar QRIS statis
  merchantName: 'ENCORE', // [PLACEHOLDER] nama merchant sesuai QRIS
  nmid: 'ID10XXXXXXXXXXX', // [PLACEHOLDER] NMID tertera di QRIS
}

// ---------- Spesifikasi modul & estimator ----------
export const moduleSpec = {
  capacityWh: 1200, // kapasitas pakai per modul [PLACEHOLDER]
  weight: '±12–15 kg',
  chemistry: 'LFP (lithium iron phosphate) bekas kendaraan listrik yang sudah diuji',
  features: ['Sensor suhu, arus, dan GPS', 'Data kondisi baterai tampil di aplikasi'],
  inverterMaxW: 1500, // batas daya sesaat inverter [PLACEHOLDER]
  reserve: 0.2, // cadangan 20%
}

// Daftar alat default untuk estimator (watt contoh, bisa diedit pengguna)
export const appliances = [
  { id: 'led', name: 'Lampu LED', watt: 10, hours: 6, qty: 2 },
  { id: 'fan', name: 'Kipas angin kecil', watt: 40, hours: 6, qty: 0 },
  { id: 'phone', name: 'Charger HP', watt: 15, hours: 3, qty: 0 },
  { id: 'chiller', name: 'Chiller / kulkas kecil', watt: 100, hours: 6, qty: 0 },
  { id: 'dispenser', name: 'Dispenser', watt: 350, hours: 2, qty: 0 },
  { id: 'blender', name: 'Blender', watt: 350, hours: 1, qty: 0 },
  { id: 'ricecooker', name: 'Rice cooker (menghangatkan)', watt: 50, hours: 6, qty: 0 },
  { id: 'coffee', name: 'Mesin kopi', watt: 1000, hours: 1, qty: 0 },
  { id: 'hotplate', name: 'Hot plate', watt: 1000, hours: 1, qty: 0 },
  { id: 'speaker', name: 'Speaker', watt: 30, hours: 4, qty: 0 },
]

// ---------- Layanan & paket (HARGA CONTOH) ----------
// unit: 'hari' | 'bulan' | null (null = hubungi kami)
export const priceNote = 'Harga contoh, dapat berubah'

export const packages = [
  {
    id: 'lampu-gadget',
    name: 'Paket Lampu & Gadget',
    audience: 'PKL / tenant non-F&B',
    customerTypes: ['tenant'],
    modules: 1,
    description: '1 modul, cukup untuk lampu, kipas kecil, dan charger HP.',
    price: 25000,
    unit: 'hari',
    icon: 'Lightbulb',
    highlights: ['1 modul baterai', 'Inverter & kabel termasuk', 'Tukar di Mitra Hub'],
    featured: true,
  },
  {
    id: 'fnb-ringan',
    name: 'Paket F&B Ringan',
    audience: 'Tenant makanan/minuman ringan',
    customerTypes: ['tenant'],
    modules: 2,
    description: '2 modul, untuk lampu, chiller kecil, dan dispenser.',
    price: 45000,
    unit: 'hari',
    icon: 'CupSoda',
    highlights: ['2 modul baterai', 'Cukup untuk chiller kecil', 'Tukar di Mitra Hub'],
    featured: true,
    popular: true,
  },
  {
    id: 'fnb-berat',
    name: 'Paket F&B Berat',
    audience: 'Tenant dengan blender, rice cooker, dll.',
    customerTypes: ['tenant'],
    modules: 3,
    description: '3+ modul, jumlah direkomendasikan lewat Estimator Daya.',
    price: 60000, // untuk 3 modul pertama
    extraModulePrice: 18000, // per modul tambahan / hari
    unit: 'hari',
    icon: 'CookingPot',
    highlights: ['Mulai 3 modul', 'Rekomendasi via estimator', 'Prioritas tukar'],
    featured: true,
  },
  {
    id: 'langganan',
    name: 'Langganan Bulanan',
    audience: 'PKL/UMKM yang jualan rutin',
    customerTypes: ['tenant'],
    modules: 1,
    description: 'Tukar modul di hub tanpa batas sesuai kuota bulanan.',
    price: 450000,
    unit: 'bulan',
    icon: 'CalendarCheck',
    highlights: ['Kuota tukar bulanan', 'Lebih hemat untuk jualan rutin', 'Laporan pemakaian'],
  },
  {
    id: 'popup-hub',
    name: 'Pop-up Hub Event',
    audience: 'EO / pengelola event multi-hari',
    customerTypes: ['eo'],
    description: 'Rak swap dibawa ke lokasi event untuk melayani semua tenant.',
    price: null,
    unit: null,
    icon: 'Tent',
    highlights: ['Rak swap di lokasi', 'Untuk semua tenant event', 'Petugas Encore standby'],
  },
  {
    id: 'antar-pasang',
    name: 'Antar & Pasang',
    audience: 'Panggung / kebutuhan besar',
    customerTypes: ['eo', 'korporasi'],
    description: 'Modul diantar dan dipasang oleh tim Encore.',
    price: null,
    unit: null,
    icon: 'Truck',
    highlights: ['Diantar ke lokasi', 'Dipasang tim teknis', 'Untuk panggung & sound'],
  },
  {
    id: 'csr',
    name: 'Program CSR',
    audience: 'Korporasi',
    customerTypes: ['korporasi'],
    description: 'Elektrifikasi UMKM yang didanai perusahaan, lengkap dengan laporan dampak terukur.',
    price: null,
    unit: null,
    icon: 'Building2',
    highlights: ['Elektrifikasi UMKM binaan', 'Laporan kWh & CO₂ terukur', 'Branding program'],
  },
]

export const customerTypes = [
  { id: 'tenant', label: 'Tenant / PKL', desc: 'Jualan di bazar, pasar malam, atau sentra kuliner', icon: 'Store' },
  { id: 'eo', label: 'Event Organizer', desc: 'Butuh listrik untuk banyak tenant atau panggung', icon: 'PartyPopper' },
  { id: 'korporasi', label: 'Korporasi', desc: 'Program CSR elektrifikasi UMKM', icon: 'Building2' },
]

// ---------- Mitra Hub (DATA DUMMY) ----------
export const hubs = [
  { id: 'hub-blokm', name: 'Hub Pasar Malam Blok M', city: 'Jakarta', address: 'Area parkir timur, Jl. Contoh Blok M No. 10', hours: '16.00 – 23.00', stock: 14 },
  { id: 'hub-kemang', name: 'Hub Sentra Kuliner Kemang', city: 'Jakarta', address: 'Jl. Contoh Kemang Raya No. 25', hours: '10.00 – 22.00', stock: 6 },
  { id: 'hub-kampus', name: 'Hub Bazar Kampus Depok', city: 'Depok', address: 'Jl. Contoh Margonda No. 88', hours: '08.00 – 21.00', stock: 9 },
  { id: 'hub-dago', name: 'Hub Night Market Dago', city: 'Bandung', address: 'Jl. Contoh Dago No. 120', hours: '15.00 – 23.00', stock: 0 },
  { id: 'hub-tunjungan', name: 'Hub Kuliner Tunjungan', city: 'Surabaya', address: 'Jl. Contoh Tunjungan No. 7', hours: '15.00 – 23.30', stock: 11 },
  { id: 'hub-malioboro', name: 'Hub Sentra PKL Malioboro', city: 'Yogyakarta', address: 'Jl. Contoh Malioboro No. 45', hours: '14.00 – 23.00', stock: 4 },
]

// ---------- Dampak (TARGET / SIMULASI, bukan data nyata) ----------
export const impactLabel = 'Target tahun pertama (simulasi)'
export const impact = [
  { id: 'kwh', value: 120000, suffix: ' kWh', label: 'Listrik bersih tersalurkan', tag: 'Target' },
  { id: 'co2', value: 85000, suffix: ' kg', label: 'CO₂ dihindari', tag: 'Simulasi' },
  { id: 'battery', value: 300, suffix: '', label: 'Baterai EV diselamatkan', tag: 'Target' },
  { id: 'umkm', value: 1000, suffix: '+', label: 'UMKM terlayani', tag: 'Target' },
]

// ---------- FAQ ----------
export const faqs = [
  {
    q: 'Apakah baterai bekas aman?',
    a: 'Baterai yang kami pakai adalah LFP (lithium iron phosphate) — jenis baterai yang dikenal stabil. Setiap baterai diuji ulang sebelum dirakit menjadi modul, dilengkapi sensor suhu dan arus, dipantau sistem deteksi anomali berbasis AI, serta pemadam otomatis di Mitra Hub.',
    home: true,
  },
  {
    q: 'Berapa lama satu modul bertahan?',
    a: `Tergantung alat yang dipakai. Satu modul berkapasitas sekitar ${moduleSpec.capacityWh.toLocaleString('id-ID')} Wh — misalnya cukup untuk 2 lampu LED, kipas kecil, dan charger HP selama satu malam jualan. Gunakan Estimator Daya untuk menghitung kebutuhanmu.`,
    home: true,
  },
  {
    q: 'Bagaimana cara bayar?',
    a: 'Langsung scan QRIS di langkah terakhir pemesanan — bisa dengan e-wallet atau m-banking apa pun yang mendukung QRIS. Kalau memesan dari HP, simpan gambar QRIS lalu unggah di aplikasi pembayaranmu. Setelah bayar, kirim bukti lewat WhatsApp. Untuk layanan event/CSR, QRIS dikirim setelah penawaran disepakati.',
    home: true,
  },
  {
    q: 'Bagaimana kalau modul rusak atau hilang?',
    a: 'Modul yang rusak karena pemakaian wajar akan kami ganti tanpa biaya. Setiap modul memiliki GPS untuk membantu pelacakan. Untuk kerusakan karena kelalaian atau kehilangan, berlaku ketentuan penggantian yang dijelaskan saat pemesanan.',
    home: true,
  },
  {
    q: 'Apakah perlu deposit?',
    a: 'Untuk sewa harian di Mitra Hub, cukup verifikasi identitas dan nomor WhatsApp. Untuk pemakaian besar atau event, deposit bisa diperlukan dan akan diinformasikan saat konfirmasi. [Kebijakan contoh]',
  },
  {
    q: 'Apakah listrik Encore legal?',
    a: 'Ya. Kamu memakai daya dari baterai milikmu selama masa sewa, bukan menyambung kabel dari jaringan orang lain. Jadi lebih aman dan tidak perlu sambungan liar.',
  },
  {
    q: 'Bagaimana jika baterai habis saat jualan?',
    a: 'Bawa modul kosong ke Mitra Hub terdekat dan tukar dengan modul penuh dalam hitungan menit. Untuk event, Pop-up Hub bisa disiapkan langsung di lokasi.',
  },
]

// ---------- Navigasi ----------
export const navLinks = [
  { to: '/', label: 'Beranda' },
  { to: '/tentang', label: 'Tentang' },
  { to: '/layanan', label: 'Layanan' },
  { to: '/estimator', label: 'Estimator' },
  { to: '/lokasi', label: 'Lokasi Hub' },
  { to: '/kemitraan', label: 'Kemitraan' },
  { to: '/faq', label: 'FAQ' },
  { to: '/kontak', label: 'Kontak' },
]
