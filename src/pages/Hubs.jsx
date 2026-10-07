import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { BatteryCharging, Clock, MapPin, Navigation, Search } from 'lucide-react'
import { hubs, mascot } from '../data/config'
import { mapsLink } from '../lib/utils'
import PageHeader from '../components/PageHeader'
import BrandImage from '../components/BrandImage'
import Placeholder from '../components/Placeholder'

export default function Hubs() {
  const [q, setQ] = useState('')
  const [city, setCity] = useState('Semua')
  const [inStock, setInStock] = useState(false)
  const cities = ['Semua', ...new Set(hubs.map((h) => h.city))]

  const results = useMemo(() => {
    const term = q.trim().toLowerCase()
    return hubs.filter(
      (h) =>
        (city === 'Semua' || h.city === city) &&
        (!inStock || h.stock > 0) &&
        (!term || `${h.name} ${h.address} ${h.city}`.toLowerCase().includes(term)),
    )
  }, [q, city, inStock])

  return (
    <>
      <PageHeader eyebrow="Lokasi Mitra Hub" title="Temukan titik tukar terdekat" lead="Ambil modul penuh dan tukar yang kosong di Mitra Hub. Stok diperbarui oleh sistem hub.">
        <Placeholder className="mt-4">Daftar hub contoh (dummy)</Placeholder>
      </PageHeader>

      <section className="pb-14 sm:pb-20">
        <div className="container-page">
          <div className="card p-4 sm:p-5">
            <label htmlFor="hub-search" className="field-label">Cari lokasi</label>
            <div className="relative">
              <Search className="pointer-events-none absolute top-1/2 left-3.5 size-5 -translate-y-1/2 text-stone-400" aria-hidden="true" />
              <input id="hub-search" type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Nama pasar, jalan, atau kota" className="field !pl-11" />
            </div>
            <div className="mt-4 flex flex-wrap gap-2" role="group" aria-label="Filter kota">
              {cities.map((c) => (
                <button
                  key={c}
                  type="button"
                  aria-pressed={city === c}
                  onClick={() => setCity(c)}
                  className={`min-h-11 rounded-full border px-4 text-sm font-semibold transition ${
                    city === c ? 'border-primary-dark bg-primary-dark text-white' : 'border-stone-300 bg-white text-ink-soft hover:border-primary-dark'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
            <label className="mt-4 inline-flex min-h-11 cursor-pointer items-center gap-3 text-sm font-semibold">
              <input type="checkbox" checked={inStock} onChange={(e) => setInStock(e.target.checked)} className="size-5 accent-primary-dark" />
              Hanya yang stok modulnya tersedia
            </label>
          </div>

          <p className="mt-6 text-sm text-ink-soft" aria-live="polite">{results.length} hub ditemukan</p>

          {results.length ? (
            <ul className="mt-3 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {results.map((h) => (
                <li key={h.id} className="card flex flex-col p-5">
                  <div className="flex items-start justify-between gap-3">
                    <h2 className="text-lg leading-snug">{h.name}</h2>
                    <span className="shrink-0 rounded-full bg-surface px-2.5 py-1 text-xs font-bold text-ink-soft">{h.city}</span>
                  </div>
                  <p className="mt-3 flex gap-2 text-sm text-ink-soft"><MapPin className="mt-0.5 size-4 shrink-0" aria-hidden="true" /> {h.address}</p>
                  <p className="mt-1.5 flex gap-2 text-sm text-ink-soft"><Clock className="mt-0.5 size-4 shrink-0" aria-hidden="true" /> {h.hours} WIB</p>
                  <p className={`mt-3 inline-flex w-fit items-center gap-1.5 rounded-full px-3 py-1 text-sm font-bold ${h.stock > 0 ? 'bg-eco-light text-eco-dark' : 'bg-red-50 text-red-700'}`}>
                    <BatteryCharging className="size-4" aria-hidden="true" />
                    {h.stock > 0 ? `${h.stock} modul penuh tersedia` : 'Stok sedang diisi ulang'}
                  </p>
                  <div className="mt-auto grid grid-cols-2 gap-2 pt-5">
                    <a href={mapsLink(`${h.name} ${h.address}`)} target="_blank" rel="noreferrer" className="btn-outline !px-3 text-sm">
                      <Navigation className="size-4" aria-hidden="true" /> Google Maps
                    </a>
                    <Link to={`/pesan?hub=${h.id}`} className="btn-primary !px-3 text-sm">Pesan di sini</Link>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="card mt-3 flex flex-col items-center p-8 text-center">
              <BrandImage src={mascot.notFound} label="Maskot Encore" className="h-40 w-36" />
              <h2 className="mt-4 text-xl">Hub tidak ditemukan</h2>
              <p className="mt-1 max-w-sm text-ink-soft">Coba kata kunci lain, atau ajukan lokasimu menjadi Mitra Hub berikutnya.</p>
              <div className="mt-5 flex flex-col gap-2 sm:flex-row">
                <button type="button" className="btn-outline" onClick={() => { setQ(''); setCity('Semua'); setInStock(false) }}>Reset pencarian</button>
                <Link to="/kemitraan?tab=hub" className="btn-primary">Jadi Mitra Hub</Link>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  )
}
