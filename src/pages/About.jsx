import { BatteryCharging, BrainCircuit, Cpu, Eye, FireExtinguisher, Heart, Leaf, Recycle, ShieldCheck, Sun, Target, Thermometer, Users } from 'lucide-react'
import { business, logo, mascot } from '../data/config'
import BrandImage from '../components/BrandImage'
import PageHeader from '../components/PageHeader'
import SectionHeading from '../components/SectionHeading'
import CtaBanner from '../components/CtaBanner'
import Placeholder from '../components/Placeholder'

const mission = [
  'Menyediakan listrik yang aman, bersih, dan terjangkau untuk PKL, UMKM, dan event.',
  'Memberi kehidupan kedua bagi baterai kendaraan listrik bekas lewat ekonomi sirkular.',
  'Membangun jaringan Mitra Hub tenaga surya yang mudah dijangkau.',
  'Mencatat dan melaporkan dampak lingkungan secara terukur dan transparan.',
]

const valuesList = [
  { icon: ShieldCheck, title: 'Aman dulu', text: 'Keselamatan pengguna di atas segalanya.' },
  { icon: Heart, title: 'Ramah UMKM', text: 'Bahasa sederhana, harga terjangkau, proses cepat.' },
  { icon: Recycle, title: 'Sirkular', text: 'Pakai lagi, bukan buang.' },
  { icon: Eye, title: 'Transparan', text: 'Dampak dicatat dan dilaporkan apa adanya.' },
]

const tech = [
  { icon: BatteryCharging, title: 'Modul baterai', text: 'Baterai LFP bekas kendaraan listrik yang sudah diuji, dirakit menjadi modul portabel ±12–15 kg dengan inverter.' },
  { icon: Sun, title: 'Mitra Hub tenaga surya', text: 'Rak tukar self-service beratap panel surya. Scan QR, ambil modul penuh, kembalikan yang kosong.' },
  { icon: Cpu, title: 'Sensor IoT', text: 'Setiap modul memantau suhu, arus, dan lokasi GPS. Data kondisi baterai tampil di aplikasi.' },
  { icon: BrainCircuit, title: 'Kecerdasan buatan (AI)', text: 'Estimator paket, prediksi kondisi (kesehatan) baterai, dan deteksi anomali sebelum jadi masalah.' },
]

const safety = [
  { icon: Thermometer, text: 'Sensor suhu per modul dengan pemutusan otomatis saat panas berlebih.' },
  { icon: BrainCircuit, text: 'Deteksi anomali berbasis AI untuk menandai modul yang perlu diperiksa.' },
  { icon: FireExtinguisher, text: 'Pemadam otomatis terpasang di setiap rak Mitra Hub.' },
  { icon: ShieldCheck, text: 'Kimia LFP yang lebih stabil dibanding jenis baterai lithium lain.' },
]

const team = [
  { name: '[Nama Anggota]', role: 'CEO / Business Lead' },
  { name: '[Nama Anggota]', role: 'CTO / Hardware & IoT' },
  { name: '[Nama Anggota]', role: 'Head of Operations' },
  { name: '[Nama Anggota]', role: 'Data & AI Lead' },
]

export default function About() {
  return (
    <>
      <PageHeader eyebrow="Tentang kami" title="Babak kedua untuk baterai, babak baru untuk UMKM" lead={business.description} mascotSrc={mascot.about} />

      {/* Cerita */}
      <section className="section">
        <div className="container-page grid items-center gap-10 md:grid-cols-[1.3fr_1fr]">
          <div>
            <SectionHeading eyebrow="Cerita kami" title="Berawal dari lapak yang gelap dan genset yang bising" />
            <div className="mt-4 space-y-4 text-ink-soft">
              <p>
                Di banyak pasar malam dan bazar, pedagang kecil masih menyambung kabel seadanya atau menyewa genset yang bising dan berasap. Di sisi lain, baterai kendaraan listrik bekas mulai menumpuk — padahal kapasitasnya masih cukup untuk kebutuhan ringan.
              </p>
              <p>
                Encore menghubungkan dua hal itu: baterai bekas yang sudah diuji diubah menjadi modul daya yang bisa ditukar di Mitra Hub tenaga surya, sehingga UMKM bisa berjualan dengan listrik yang aman dan bersih tanpa modal awal.
              </p>
            </div>
            <blockquote className="mt-6 rounded-2xl border-l-4 border-primary bg-cream p-5">
              <p className="font-semibold text-ink">{business.nameMeaning}</p>
            </blockquote>
          </div>
          <div className="grid gap-4">
            <BrandImage src={logo.main} label="Logo Encore" alt="Logo Encore — EV Battery Powered Generator" className="h-56 w-full rounded-2xl bg-white p-6 shadow-soft sm:h-64" />
            <BrandImage src={mascot.about} label="Maskot Encore" className="mx-auto h-64 w-56 md:hidden" />
          </div>
        </div>
      </section>

      {/* Visi misi nilai */}
      <section className="section bg-surface">
        <div className="container-page grid gap-6 lg:grid-cols-2">
          <div className="card p-6">
            <span className="grid size-11 place-items-center rounded-xl bg-primary-light text-primary-dark"><Target className="size-5" aria-hidden="true" /></span>
            <h2 className="mt-4 text-2xl">Visi</h2>
            <p className="mt-2 text-ink-soft">
              Menjadi jaringan energi bersih berbasis baterai bekas yang paling mudah diakses UMKM di Indonesia.
            </p>
          </div>
          <div className="card p-6">
            <span className="grid size-11 place-items-center rounded-xl bg-primary-light text-primary-dark"><Leaf className="size-5" aria-hidden="true" /></span>
            <h2 className="mt-4 text-2xl">Misi</h2>
            <ul className="mt-2 list-disc space-y-1.5 pl-5 text-ink-soft marker:text-primary">
              {mission.map((m) => <li key={m}>{m}</li>)}
            </ul>
          </div>
        </div>
        <div className="container-page mt-10">
          <h2 className="text-2xl">Nilai perusahaan</h2>
          <ul className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {valuesList.map(({ icon: I, title, text }) => (
              <li key={title} className="card p-5">
                <I className="size-6 text-primary-dark" aria-hidden="true" />
                <h3 className="mt-3 text-lg">{title}</h3>
                <p className="mt-1 text-ink-soft">{text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Teknologi */}
      <section className="section">
        <div className="container-page">
          <SectionHeading eyebrow="Teknologi kami" title="Sederhana di depan, cerdas di belakang" lead="Pengguna cukup scan dan colok. Di balik layar, sensor dan AI menjaga setiap modul." />
          <ul className="mt-8 grid gap-4 sm:grid-cols-2">
            {tech.map(({ icon: I, title, text }) => (
              <li key={title} className="flex gap-4 rounded-2xl bg-product p-5 text-stone-300 sm:p-6">
                <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-primary text-ink"><I className="size-6" aria-hidden="true" /></span>
                <div>
                  <h3 className="text-lg text-white">{title}</h3>
                  <p className="mt-1">{text}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Keselamatan & keberlanjutan */}
      <section className="section bg-cream">
        <div className="container-page grid gap-10 lg:grid-cols-2">
          <div>
            <SectionHeading eyebrow="Keselamatan" title="Berlapis-lapis pengamanan" />
            <ul className="mt-6 space-y-3">
              {safety.map(({ icon: I, text }) => (
                <li key={text} className="flex gap-3 rounded-xl bg-white p-4">
                  <I className="mt-0.5 size-5 shrink-0 text-primary-dark" aria-hidden="true" /> {text}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <SectionHeading eyebrow="Keberlanjutan" title="Dampak yang bisa dihitung" />
            <div className="mt-6 space-y-4 text-ink-soft">
              <p>Setiap penukaran modul mengurangi limbah baterai dan pemakaian BBM. Sistem kami mencatat:</p>
              <ul className="space-y-2">
                {['kWh listrik bersih yang tersalurkan', 'Kilogram CO₂ yang dihindari dibanding genset', 'Jumlah baterai EV yang diselamatkan dari limbah'].map((t) => (
                  <li key={t} className="flex gap-2"><Leaf className="mt-1 size-4 shrink-0 text-eco" aria-hidden="true" /> {t}</li>
                ))}
              </ul>
              <p>Laporan dampak ini menjadi dasar program CSR korporasi yang transparan.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Tim */}
      <section className="section">
        <div className="container-page">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <SectionHeading eyebrow="Tim" title={`Tim ${business.team}`} />
            <Placeholder>Data tim menyusul</Placeholder>
          </div>
          <ul className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
            {team.map((m, i) => (
              <li key={i} className="card p-5 text-center">
                <span className="mx-auto grid size-20 place-items-center rounded-full bg-primary-light text-2xl font-extrabold text-primary-dark">
                  <Users className="size-8" aria-hidden="true" />
                </span>
                <p className="mt-3 font-bold">{m.name}</p>
                <p className="text-sm text-ink-soft">{m.role}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBanner title="Ingin ikut menyalakan UMKM?" text="Jadi pelanggan, Mitra Hub, atau mitra CSR Encore." />
    </>
  )
}
