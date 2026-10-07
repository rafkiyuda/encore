import { business, moduleSpec, packages } from '../data/config'

export const rupiah = (n) => 'Rp' + Math.round(n).toLocaleString('id-ID')
export const num = (n) => Math.round(n).toLocaleString('id-ID')

export function formatPrice(pkg) {
  if (pkg.price == null) return 'Hubungi kami'
  return `${rupiah(pkg.price)}/${pkg.unit}`
}

export const getPackage = (id) => packages.find((p) => p.id === id)

/** localStorage aman: bisa gagal di mode privat / storage diblokir */
export const storage = {
  get(key, fallback = null) {
    try {
      const raw = window.localStorage.getItem(key)
      return raw ? JSON.parse(raw) : fallback
    } catch {
      return fallback
    }
  },
  set(key, value) {
    try {
      window.localStorage.setItem(key, JSON.stringify(value))
    } catch {
      /* abaikan */
    }
  },
  remove(key) {
    try {
      window.localStorage.removeItem(key)
    } catch {
      /* abaikan */
    }
  },
}

export const waLink = (text, number = business.whatsapp) =>
  `https://wa.me/${number}${text ? `?text=${encodeURIComponent(text)}` : ''}`

export const mapsLink = (query) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`

/** Nomor HP Indonesia: 08xx / 628xx / +628xx, total 10–14 digit */
export function normalizePhone(v = '') {
  return v.replace(/[\s\-().]/g, '')
}
export function isValidIndoPhone(v) {
  return /^(\+62|62|0)8[1-9]\d{6,11}$/.test(normalizePhone(v))
}

/**
 * Estimator daya.
 * totalWh = Σ(watt × jam × jumlah); kebutuhan = totalWh × (1 + cadangan);
 * modul = ceil(kebutuhan / kapasitas modul)
 */
export function estimate(items) {
  const active = items.filter((i) => i.qty > 0 && i.watt > 0 && i.hours > 0)
  const totalWh = active.reduce((s, i) => s + i.watt * i.hours * i.qty, 0)
  const neededWh = totalWh * (1 + moduleSpec.reserve)
  const modules = totalWh > 0 ? Math.max(1, Math.ceil(neededWh / moduleSpec.capacityWh)) : 0
  const peakW = active.reduce((s, i) => s + i.watt * i.qty, 0)
  const overInverter = peakW > moduleSpec.inverterMaxW
  let packageId = null
  if (modules === 1) packageId = 'lampu-gadget'
  else if (modules === 2) packageId = 'fnb-ringan'
  else if (modules >= 3) packageId = 'fnb-berat'
  return { totalWh, neededWh, modules, peakW, overInverter, packageId, activeCount: active.length }
}

/** Estimasi biaya dari konfigurasi harga */
export function estimateCost({ packageId, modules, duration, durationUnit }) {
  const pkg = getPackage(packageId)
  if (!pkg || pkg.price == null) return null
  const qty = Number(duration) || 1
  let perUnit = pkg.price
  if (pkg.extraModulePrice && modules > pkg.modules) {
    perUnit += (modules - pkg.modules) * pkg.extraModulePrice
  }
  const unit = pkg.unit === 'bulan' ? 'bulan' : durationUnit || 'hari'
  return { perUnit, qty, unit, total: perUnit * qty }
}

export function makeOrderId() {
  const d = new Date()
  const ymd = `${String(d.getFullYear()).slice(2)}${String(d.getMonth() + 1).padStart(2, '0')}${String(d.getDate()).padStart(2, '0')}`
  const rand = Math.random().toString(36).slice(2, 6).toUpperCase()
  return `ENC-${ymd}-${rand}`
}
