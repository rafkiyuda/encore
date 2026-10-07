import { customerTypes, hubs } from '../data/config'
import { estimateCost, getPackage, isValidIndoPhone, normalizePhone, rupiah } from './utils'

export const STORAGE_KEY = 'encore-booking'
export const LAST_ORDER_KEY = 'encore-last-order'

export const STEPS = ['Tipe pelanggan', 'Pilih paket', 'Jadwal & lokasi', 'Data pemesan', 'Ringkasan', 'Bayar & kirim']

export const emptyBooking = {
  step: 0,
  customerType: '',
  packageId: '',
  modules: 0,
  startDate: '',
  duration: 1,
  location: '',
  hubId: '',
  address: '',
  name: '',
  phone: '',
  businessName: '',
  notes: '',
  agree: false,
  orderId: '',
}

export const todayStr = () => {
  const d = new Date()
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

/** Cara pemenuhan pesanan berdasarkan paket */
export function fulfillmentOf(pkg) {
  if (!pkg) return null
  if (pkg.id === 'csr') return 'program'
  if (pkg.price != null) return 'hub' // paket tenant → ambil sendiri di Mitra Hub
  return 'antar' // pop-up hub / antar & pasang
}

export const durationUnitOf = (pkg) => (pkg && (pkg.unit === 'bulan' || pkg.id === 'csr') ? 'bulan' : 'hari')
export const maxDurationOf = (pkg) => (durationUnitOf(pkg) === 'bulan' ? 12 : 30)

export function validateStep(step, b) {
  const e = {}
  const pkg = getPackage(b.packageId)
  if (step === 0) {
    if (!b.customerType) e.customerType = 'Pilih salah satu tipe pelanggan.'
  }
  if (step === 1) {
    if (!pkg || !pkg.customerTypes.includes(b.customerType)) e.packageId = 'Pilih paket atau layanan.'
    else if (pkg.id === 'fnb-berat' && (b.modules < 3 || b.modules > 20)) e.modules = 'Jumlah modul 3–20.'
  }
  if (step === 2) {
    const f = fulfillmentOf(pkg)
    if (!b.startDate) e.startDate = 'Pilih tanggal mulai.'
    else if (b.startDate < todayStr()) e.startDate = 'Tanggal tidak boleh sebelum hari ini.'
    const max = maxDurationOf(pkg)
    const d = Number(b.duration)
    if (!Number.isInteger(d) || d < 1 || d > max) e.duration = `Isi angka 1–${max}.`
    if (!b.location.trim()) e.location = f === 'program' ? 'Isi wilayah program.' : 'Isi lokasi jualan / nama event.'
    if (f === 'hub' && !hubs.some((h) => h.id === b.hubId)) e.hubId = 'Pilih Mitra Hub untuk mengambil modul.'
    if (f === 'antar' && b.address.trim().length < 10) e.address = 'Tulis alamat lengkap (min. 10 karakter).'
  }
  if (step === 3) {
    if (b.name.trim().length < 2) e.name = 'Isi nama lengkap.'
    if (!b.phone.trim()) e.phone = 'Isi nomor WhatsApp.'
    else if (!isValidIndoPhone(b.phone)) e.phone = 'Format nomor belum benar. Contoh: 0812 3456 7890.'
    if (!b.businessName.trim()) e.businessName = 'Isi nama usaha / event / perusahaan.'
  }
  if (step === 5) {
    if (!b.agree) e.agree = pkg?.price != null ? 'Centang setelah kamu membayar via QRIS.' : 'Centang persetujuan untuk melanjutkan.'
  }
  return e
}

export function formatDate(s) {
  if (!s) return '-'
  const [y, m, d] = s.split('-').map(Number)
  return new Date(y, m - 1, d).toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })
}

/** Ringkasan terstruktur (dipakai di layar ringkasan & pesan WhatsApp) */
export function summarize(b) {
  const pkg = getPackage(b.packageId)
  const unit = durationUnitOf(pkg)
  const f = fulfillmentOf(pkg)
  const hub = hubs.find((h) => h.id === b.hubId)
  const modules = pkg?.id === 'fnb-berat' ? b.modules : pkg?.modules
  const cost = pkg ? estimateCost({ packageId: pkg.id, modules, duration: b.duration, durationUnit: unit }) : null
  const rows = [
    ['Tipe pelanggan', customerTypes.find((c) => c.id === b.customerType)?.label ?? '-'],
    ['Layanan', pkg ? `${pkg.name}${modules ? ` (${modules} modul)` : ''}` : '-'],
    ['Mulai', formatDate(b.startDate)],
    ['Durasi', `${b.duration} ${unit}`],
    [f === 'program' ? 'Wilayah program' : 'Lokasi jualan / event', b.location || '-'],
  ]
  if (f === 'hub') rows.push(['Ambil di', hub ? `${hub.name} (${hub.city})` : '-'])
  if (f === 'antar') rows.push(['Alamat antar', b.address || '-'])
  const contact = [
    ['Nama', b.name],
    ['WhatsApp', normalizePhone(b.phone)],
    ['Usaha / event', b.businessName],
  ]
  if (b.notes.trim()) contact.push(['Catatan', b.notes.trim()])
  return { pkg, rows, contact, cost, unit }
}

export function buildWhatsAppText(b) {
  const { rows, contact, cost } = summarize(b)
  const line = '--------------------'
  const fmt = (r) => r.map(([k, v]) => `*${k}:* ${v}`).join('\n')
  const costLine = cost
    ? `*Total bayar:* ${rupiah(cost.total)} (${rupiah(cost.perUnit)} x ${cost.qty} ${cost.unit})\n*Pembayaran:* Sudah dibayar via QRIS — bukti bayar saya lampirkan.`
    : '*Biaya:* Mohon dikirimkan penawaran.'
  return [
    `Halo Encore, saya ingin memesan.`,
    '',
    `*No. Pesanan:* ${b.orderId}`,
    line,
    fmt(rows),
    line,
    fmt(contact),
    line,
    costLine,
    '',
    cost
      ? 'Mohon pembayaran dicek dan pesanan dikonfirmasi. Terima kasih!'
      : 'Mohon dikirimkan penawaran beserta QRIS untuk pembayaran. Terima kasih!',
  ].join('\n')
}
