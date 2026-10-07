import { useSearchParams } from 'react-router-dom'
import { BadgePercent, BarChart3, Building2, Handshake, Megaphone, PartyPopper, MapPin, ShieldCheck, Sun, Users, VolumeX, Wrench } from 'lucide-react'
import { mascot } from '../data/config'
import PageHeader from '../components/PageHeader'
import LeadForm from '../components/LeadForm'
import BrandImage from '../components/BrandImage'

const base = [
  { id: 'name', label: 'Nama lengkap', required: true, autoComplete: 'name' },
  { id: 'phone', label: 'Nomor WhatsApp', type: 'tel', required: true, autoComplete: 'tel', placeholder: '08xx xxxx xxxx' },
]

const tabs = {
  hub: {
    label: 'Mitra Hub',
    icon: MapPin,
    title: 'Jadikan lokasimu titik tukar baterai',
    lead: 'Untuk pengelola pasar malam, sentra kuliner, kampus, dan area komersial.',
    benefits: [
      { icon: BadgePercent, t: 'Bagi hasil dari setiap penukaran', d: 'Pendapatan tambahan tanpa modal alat — rak dan modul disediakan Encore.' },
      { icon: Sun, t: 'Rak tenaga surya self-service', d: 'Pedagang scan QR sendiri, tidak perlu petugas khusus.' },
      { icon: ShieldCheck, t: 'Lokasi lebih aman & tertib', d: 'Tidak ada lagi kabel liar yang rawan korsleting.' },
      { icon: Megaphone, t: 'Lokasi tampil di aplikasi', d: 'Menarik pengunjung dan pedagang baru ke lokasimu.' },
    ],
    fields: [
      ...base,
      { id: 'place', label: 'Nama lokasi', required: true },
      { id: 'type', label: 'Jenis lokasi', type: 'select', required: true, options: ['Pasar malam', 'Sentra kuliner', 'Area komersial', 'Kampus', 'Lainnya'] },
      { id: 'address', label: 'Alamat lokasi', required: true, full: true },
      { id: 'vendors', label: 'Perkiraan jumlah pedagang', type: 'number' },
      { id: 'notes', label: 'Catatan', type: 'textarea' },
    ],
    intro: 'Halo Encore, saya ingin mengajukan lokasi sebagai *Mitra Hub*.',
  },
  eo: {
    label: 'Event Organizer',
    icon: PartyPopper,
    title: 'Event tanpa genset, tenant lebih nyaman',
    lead: 'Untuk EO, pengelola bazar kampus, festival kuliner, dan night market.',
    benefits: [
      { icon: VolumeX, t: 'Senyap & tanpa asap', d: 'Pengunjung nyaman, area makan bebas bau solar.' },
      { icon: Users, t: 'Pop-up Hub untuk semua tenant', d: 'Rak tukar dibawa ke lokasi, tenant tukar sendiri.' },
      { icon: Wrench, t: 'Antar & pasang', d: 'Untuk panggung dan kebutuhan besar, tim kami yang pasang.' },
      { icon: BarChart3, t: 'Laporan dampak event', d: 'Angka kWh bersih & CO₂ dihindari untuk publikasi event hijau.' },
    ],
    fields: [
      ...base,
      { id: 'event', label: 'Nama event / EO', required: true },
      { id: 'date', label: 'Tanggal event', type: 'date', required: true },
      { id: 'location', label: 'Lokasi event', required: true, full: true },
      { id: 'tenants', label: 'Jumlah tenant', type: 'number', required: true },
      { id: 'days', label: 'Durasi (hari)', type: 'number' },
      { id: 'notes', label: 'Kebutuhan khusus', type: 'textarea' },
    ],
    intro: 'Halo Encore, kami ingin bekerja sama untuk *event*.',
  },
  csr: {
    label: 'Program CSR',
    icon: Building2,
    title: 'CSR dengan dampak yang bisa diukur',
    lead: 'Danai elektrifikasi UMKM binaan dengan laporan dampak yang transparan.',
    benefits: [
      { icon: BarChart3, t: 'Laporan dampak terukur', d: 'kWh bersih, CO₂ dihindari, dan baterai diselamatkan per periode.' },
      { icon: Users, t: 'Menyasar UMKM nyata', d: 'Program menjangkau PKL dan pedagang kecil di wilayah pilihan.' },
      { icon: Handshake, t: 'Sejalan dengan target ESG', d: 'Ekonomi sirkular + energi bersih dalam satu program.' },
      { icon: Megaphone, t: 'Branding program', d: 'Nama program tampil di modul dan Mitra Hub yang didanai.' },
    ],
    fields: [
      ...base,
      { id: 'company', label: 'Nama perusahaan', required: true, autoComplete: 'organization' },
      { id: 'role', label: 'Jabatan' },
      { id: 'email', label: 'Email kantor', type: 'email', required: true, autoComplete: 'email' },
      { id: 'target', label: 'Target jumlah UMKM', type: 'number' },
      { id: 'notes', label: 'Gambaran program', type: 'textarea' },
    ],
    intro: 'Halo Encore, kami tertarik dengan *Program CSR* elektrifikasi UMKM.',
  },
}

export default function Partnership() {
  const [params, setParams] = useSearchParams()
  const active = tabs[params.get('tab')] ? params.get('tab') : 'hub'
  const t = tabs[active]

  return (
    <>
      <PageHeader eyebrow="Kemitraan" title="Tumbuh bersama Encore" lead="Pilih bentuk kerja sama yang paling cocok. Isi form singkat, tim kami akan menghubungi lewat WhatsApp." mascotSrc={mascot.partnership} />

      <section className="pb-14 sm:pb-20">
        <div className="container-page">
          <div role="tablist" aria-label="Jenis kemitraan" className="grid grid-cols-3 gap-1 rounded-2xl bg-surface p-1 ring-1 ring-stone-200">
            {Object.entries(tabs).map(([id, tab]) => {
              const I = tab.icon
              const on = id === active
              return (
                <button
                  key={id}
                  role="tab"
                  id={`tab-${id}`}
                  aria-selected={on}
                  aria-controls={`panel-${id}`}
                  onClick={() => setParams({ tab: id }, { replace: true })}
                  className={`flex min-h-12 flex-col items-center justify-center gap-0.5 rounded-xl px-1 py-2 text-xs font-bold transition sm:flex-row sm:gap-2 sm:text-base ${
                    on ? 'bg-white text-primary-dark shadow-soft' : 'text-ink-soft hover:text-ink'
                  }`}
                >
                  <I className="size-5" aria-hidden="true" /> {tab.label}
                </button>
              )
            })}
          </div>

          <div id={`panel-${active}`} role="tabpanel" aria-labelledby={`tab-${active}`} className="mt-8 grid gap-8 lg:grid-cols-[1fr_1.2fr]">
            <div>
              <h2 className="h2">{t.title}</h2>
              <p className="lead">{t.lead}</p>
              <ul className="mt-6 grid gap-3">
                {t.benefits.map(({ icon: I, t: title, d }) => (
                  <li key={title} className="flex gap-4 rounded-2xl bg-cream p-4">
                    <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-white text-primary-dark"><I className="size-5" aria-hidden="true" /></span>
                    <div>
                      <p className="font-bold">{title}</p>
                      <p className="text-sm text-ink-soft">{d}</p>
                    </div>
                  </li>
                ))}
              </ul>
              <BrandImage src={mascot.partnership} label="Maskot Encore" className="mx-auto mt-6 h-44 w-48 md:hidden" />
            </div>
            <LeadForm key={active} title={`Form pengajuan ${t.label}`} fields={t.fields} intro={t.intro} />
          </div>
        </div>
      </section>
    </>
  )
}
