import { Link } from 'react-router-dom'
import { BatteryFull, Check, Cpu, Minus, Weight, Zap } from 'lucide-react'
import { mascot, moduleSpec, packages } from '../data/config'
import { num, rupiah } from '../lib/utils'
import PageHeader from '../components/PageHeader'
import PackageCard from '../components/PackageCard'
import SectionHeading from '../components/SectionHeading'
import Placeholder from '../components/Placeholder'
import CtaBanner from '../components/CtaBanner'
import BrandImage from '../components/BrandImage'

const tenantIds = ['lampu-gadget', 'fnb-ringan', 'fnb-berat', 'langganan']
const compareRows = [
  { label: 'Jumlah modul', values: ['1', '2', '3+', '1 (tukar)'] },
  { label: 'Lampu & charger', values: [true, true, true, true] },
  { label: 'Kipas kecil', values: [true, true, true, true] },
  { label: 'Chiller kecil', values: [false, true, true, true] },
  { label: 'Dispenser / blender', values: [false, 'Terbatas', true, false] },
  { label: 'Tukar di Mitra Hub', values: [true, true, true, 'Sesuai kuota'] },
]

function Cell({ v }) {
  if (v === true) return <Check className="mx-auto size-5 text-eco" aria-label="Ya" />
  if (v === false) return <Minus className="mx-auto size-5 text-stone-400" aria-label="Tidak" />
  return <span className="text-[11px] font-semibold leading-tight sm:text-sm">{v}</span>
}

export default function Services() {
  const tenantPkgs = tenantIds.map((id) => packages.find((p) => p.id === id))
  const otherPkgs = packages.filter((p) => !tenantIds.includes(p.id))
  return (
    <>
      <PageHeader
        eyebrow="Layanan & paket"
        title="Pilih daya sesuai kebutuhan lapakmu"
        lead="Sewa harian, langganan bulanan, atau layanan khusus untuk event dan korporasi."
        mascotSrc={mascot.partnership}
      >
        <div className="mt-5 flex flex-wrap items-center gap-3">
          <Link to="/estimator" className="btn-primary">Bantu saya pilih</Link>
          <Placeholder>Semua harga contoh · dapat berubah</Placeholder>
        </div>
      </PageHeader>

      <section className="section !pt-8">
        <div className="container-page">
          <SectionHeading title="Untuk tenant & PKL" />
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {tenantPkgs.map((p) => <PackageCard key={p.id} pkg={p} />)}
          </div>

          <h3 className="mt-14 text-xl sm:text-2xl">Perbandingan paket tenant</h3>
          <div className="card mt-4 overflow-x-auto">
            <table className="w-full table-fixed text-left text-sm">
              <caption className="sr-only">Perbandingan paket untuk tenant dan PKL</caption>
              <thead className="bg-cream">
                <tr>
                  <th scope="col" className="w-[23%] p-2 sm:p-4">Fitur</th>
                  {tenantPkgs.map((p) => (
                    <th key={p.id} scope="col" className="px-1 py-2 text-center text-[11px] leading-tight sm:p-4 sm:text-sm">
                      <span className="block break-words hyphens-auto" lang="id">{p.id === 'langganan' ? 'Bulanan' : p.name.replace('Paket ', '')}</span>
                      <span className="mt-1 block text-[10px] font-normal text-ink-soft sm:text-sm">
                        {rupiah(p.price)}<span className="block sm:inline">/{p.unit}</span>
                      </span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-200">
                {compareRows.map((r) => (
                  <tr key={r.label}>
                    <th scope="row" className="p-2 text-xs font-semibold sm:p-4 sm:text-sm">{r.label}</th>
                    {r.values.map((v, i) => (
                      <td key={i} className="p-1.5 text-center sm:p-4"><Cell v={v} /></td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="section bg-surface">
        <div className="container-page">
          <SectionHeading title="Untuk event & korporasi" lead="Harga disesuaikan skala acara atau program. Ajukan penawaran, tim kami akan menghubungi." />
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {otherPkgs.map((p) => <PackageCard key={p.id} pkg={p} />)}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-page grid items-center gap-8 md:grid-cols-[1fr_1fr]">
          <div>
            <SectionHeading eyebrow="Spesifikasi" title="Modul baterai Encore" />
            <dl className="mt-6 grid gap-3 sm:grid-cols-2">
              {[
                { icon: BatteryFull, k: 'Kapasitas pakai', v: `±${num(moduleSpec.capacityWh)} Wh` },
                { icon: Weight, k: 'Berat per modul', v: moduleSpec.weight },
                { icon: Zap, k: 'Batas inverter', v: `${num(moduleSpec.inverterMaxW)} W` },
                { icon: Cpu, k: 'Jenis baterai', v: 'LFP second-life' },
              ].map(({ icon: I, k, v }) => (
                <div key={k} className="card flex gap-3 p-4">
                  <I className="mt-0.5 size-5 shrink-0 text-primary-dark" aria-hidden="true" />
                  <div>
                    <dt className="text-sm text-ink-soft">{k}</dt>
                    <dd className="font-bold">{v}</dd>
                  </div>
                </div>
              ))}
            </dl>
            <p className="mt-4 text-sm text-ink-soft">{moduleSpec.chemistry}. {moduleSpec.features.join('; ')}.</p>
            <Placeholder className="mt-3">Spesifikasi sementara</Placeholder>
          </div>
          <BrandImage src={mascot.stepSwap} label="Maskot Encore" className="mx-auto h-64 w-56 sm:h-80 sm:w-72" />
        </div>
      </section>

      <CtaBanner />
    </>
  )
}
