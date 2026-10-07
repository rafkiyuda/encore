import { useMemo, useRef, useState } from 'react'
import { AlertTriangle, Minus, Plus, RotateCcw, Zap } from 'lucide-react'
import { appliances, mascot, moduleSpec } from '../data/config'
import { estimate, formatPrice, getPackage, num, storage } from '../lib/utils'
import BrandImage from './BrandImage'

const KEY = 'encore-estimator'
const initial = () => appliances.map((a) => ({ ...a }))

function Stepper({ value, onChange, label, min = 0, max = 99 }) {
  return (
    <div className="flex items-center rounded-xl border border-stone-300 bg-white">
      <button
        type="button"
        className="grid size-11 place-items-center rounded-l-xl text-ink-soft hover:bg-surface disabled:opacity-40"
        onClick={() => onChange(Math.max(min, value - 1))}
        disabled={value <= min}
        aria-label={`Kurangi ${label}`}
      >
        <Minus className="size-4" />
      </button>
      <span className="w-8 text-center font-bold tabular-nums" aria-live="polite">{value}</span>
      <button
        type="button"
        className="grid size-11 place-items-center rounded-r-xl text-ink-soft hover:bg-surface disabled:opacity-40"
        onClick={() => onChange(Math.min(max, value + 1))}
        disabled={value >= max}
        aria-label={`Tambah ${label}`}
      >
        <Plus className="size-4" />
      </button>
    </div>
  )
}

function NumField({ value, onChange, label, suffix, max }) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-semibold text-ink-soft">{label}</span>
      <span className="flex items-center rounded-xl border border-stone-300 bg-white focus-within:border-primary-dark focus-within:ring-2 focus-within:ring-primary/30">
        <input
          type="number"
          inputMode="decimal"
          min="0"
          max={max}
          step="any"
          value={value}
          onChange={(e) => {
            const v = e.target.value === '' ? '' : Math.min(max, Math.max(0, Number(e.target.value)))
            onChange(v)
          }}
          onBlur={(e) => e.target.value === '' && onChange(0)}
          className="min-h-11 w-full min-w-0 rounded-xl bg-transparent px-3 text-base font-semibold outline-none"
        />
        <span className="pr-3 text-sm text-ink-soft">{suffix}</span>
      </span>
    </label>
  )
}

/**
 * Estimator Daya.
 * onChoose({ packageId, modules }) dipanggil saat pengguna menekan "Pesan paket ini".
 */
export default function Estimator({ onChoose, showMascot = true }) {
  const [items, setItems] = useState(() => {
    const saved = storage.get(KEY)
    return Array.isArray(saved) && saved.length === appliances.length ? saved : initial()
  })

  const update = (id, patch) =>
    setItems((prev) => {
      const next = prev.map((i) => (i.id === id ? { ...i, ...patch } : i))
      storage.set(KEY, next)
      return next
    })

  const reset = () => {
    const next = initial()
    storage.set(KEY, next)
    setItems(next)
  }

  const r = useMemo(
    () => estimate(items.map((i) => ({ ...i, watt: Number(i.watt) || 0, hours: Number(i.hours) || 0 }))),
    [items],
  )
  const pkg = r.packageId ? getPackage(r.packageId) : null
  const pct = Math.min(100, (r.peakW / moduleSpec.inverterMaxW) * 100)

  const resultRef = useRef(null)

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_380px] lg:items-start">
      {/* Ringkasan hasil menempel di atas (mobile) */}
      <div className="sticky top-16 z-10 -mx-4 -mb-3 flex items-center justify-between gap-3 border-b border-stone-200 bg-white/95 px-4 py-2 backdrop-blur sm:mx-0 sm:rounded-xl sm:border lg:hidden">
        <p className="text-sm">
          <span className="text-xl font-extrabold text-primary-dark tabular-nums">{r.modules}</span> modul
          <span className="text-ink-soft"> · {num(r.neededWh)} Wh</span>
          {r.overInverter && <AlertTriangle className="ml-1 inline size-4 text-red-700" aria-label="Melebihi batas inverter" />}
        </p>
        <button type="button" className="btn-ghost !min-h-10 !px-3 text-sm font-bold text-primary-dark" onClick={() => resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })}>
          Lihat hasil
        </button>
      </div>
      {/* Daftar alat */}
      <div className="card p-4 sm:p-6">
        <div className="mb-4 flex items-center justify-between gap-3">
          <h3 className="text-lg">1. Pilih alat yang kamu pakai</h3>
          <button type="button" onClick={reset} className="btn-ghost !min-h-10 !px-3 text-sm">
            <RotateCcw className="size-4" aria-hidden="true" /> Reset
          </button>
        </div>
        <p className="mb-4 text-sm text-ink-soft">
          Atur jumlah alat, lalu sesuaikan watt dan jam pemakaian per hari bila perlu. Angka watt adalah contoh umum.
        </p>
        <ul className="divide-y divide-stone-200">
          {items.map((i) => (
            <li key={i.id} className={`py-3 ${i.qty > 0 ? '' : 'opacity-80'}`}>
              <div className="flex items-center justify-between gap-3">
                <span className={`font-semibold ${i.qty > 0 ? 'text-ink' : 'text-ink-soft'}`}>{i.name}</span>
                <Stepper value={i.qty} label={i.name} onChange={(qty) => update(i.id, { qty })} />
              </div>
              {i.qty > 0 && (
                <div className="mt-3 grid grid-cols-2 gap-3">
                  <NumField label="Daya per alat" suffix="W" max={5000} value={i.watt} onChange={(watt) => update(i.id, { watt })} />
                  <NumField label="Pemakaian" suffix="jam" max={24} value={i.hours} onChange={(hours) => update(i.id, { hours })} />
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>

      {/* Hasil */}
      <div ref={resultRef} className="scroll-mt-20 lg:sticky lg:top-24" aria-live="polite">
        <div className="card overflow-hidden">
          <div className="bg-product p-5 text-white sm:p-6">
            <h3 className="text-lg text-white">2. Rekomendasi Encore</h3>
            <div className="mt-4 flex items-end gap-3">
              <div className="min-w-0 flex-1">
                <p className="text-5xl font-extrabold tabular-nums text-primary">{r.modules}</p>
                <p className="text-sm text-stone-300">modul baterai (±{num(moduleSpec.capacityWh)} Wh/modul)</p>
              </div>
              {showMascot && (
                <BrandImage src={mascot.estimator} label="Maskot Encore" className="h-28 w-24 shrink-0" />
              )}
            </div>
          </div>
          <dl className="grid grid-cols-2 gap-px bg-stone-200 text-sm">
            <div className="bg-white p-4">
              <dt className="text-ink-soft">Total energi</dt>
              <dd className="text-lg font-bold tabular-nums">{num(r.totalWh)} Wh</dd>
            </div>
            <div className="bg-white p-4">
              <dt className="text-ink-soft">+ Cadangan {moduleSpec.reserve * 100}%</dt>
              <dd className="text-lg font-bold tabular-nums">{num(r.neededWh)} Wh</dd>
            </div>
          </dl>
          <div className="p-5 sm:p-6">
            <div className="flex items-center justify-between text-sm">
              <span className="font-semibold">Daya sesaat (semua menyala)</span>
              <span className="font-bold tabular-nums">{num(r.peakW)} / {num(moduleSpec.inverterMaxW)} W</span>
            </div>
            <div className="mt-2 h-2.5 overflow-hidden rounded-full bg-stone-200" aria-hidden="true">
              <div
                className={`h-full rounded-full transition-all ${r.overInverter ? 'bg-red-600' : 'bg-eco'}`}
                style={{ width: `${pct}%` }}
              />
            </div>
            {r.overInverter && (
              <p className="mt-3 flex gap-2 rounded-xl bg-red-50 p-3 text-sm text-red-800" role="alert">
                <AlertTriangle className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
                Total daya sesaat melebihi batas inverter ({num(moduleSpec.inverterMaxW)} W). Jangan nyalakan alat berdaya besar bersamaan, atau pilih layanan Antar & Pasang.
              </p>
            )}

            {pkg ? (
              <div className="mt-5 rounded-xl bg-cream p-4">
                <p className="text-xs font-bold uppercase tracking-wider text-primary-dark">Paket yang cocok</p>
                <p className="mt-1 text-lg font-extrabold">{pkg.name}</p>
                <p className="text-sm text-ink-soft">
                  {r.modules} modul · mulai {formatPrice(pkg)} <span className="text-xs">(contoh)</span>
                </p>
              </div>
            ) : (
              <p className="mt-5 rounded-xl bg-surface p-4 text-sm text-ink-soft">
                Tambahkan minimal satu alat untuk melihat rekomendasi.
              </p>
            )}

            <button
              type="button"
              className="btn-primary mt-4 w-full"
              disabled={!pkg}
              onClick={() => onChoose?.({ packageId: pkg.id, modules: r.modules })}
            >
              <Zap className="size-5" aria-hidden="true" /> Pesan paket ini
            </button>
            <p className="mt-3 text-xs text-ink-soft">
              Rumus: Σ(watt × jam × jumlah) + cadangan {moduleSpec.reserve * 100}%, dibagi kapasitas modul, dibulatkan ke atas. Hasil adalah perkiraan.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
