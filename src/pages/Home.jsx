import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowRight, BarChart3, Building2, ChevronDown, Flame, Leaf, PartyPopper, Plug, Recycle,
  RefreshCw, ShieldCheck, Store, Sun, VolumeX, Wallet, Zap, MapPin, Handshake, BatteryWarning, Factory,
} from 'lucide-react'
import { business, faqs, mascot, packages } from '../data/config'
import BrandImage from '../components/BrandImage'
import HubIllustration from '../components/HubIllustration'
import SectionHeading from '../components/SectionHeading'
import PackageCard from '../components/PackageCard'
import ImpactStats from '../components/ImpactStats'
import FaqList from '../components/FaqList'
import CtaBanner from '../components/CtaBanner'
import Placeholder from '../components/Placeholder'

const problems = [
  { icon: Flame, title: 'Sambungan liar rawan api', text: 'PKL dan tenant bazar sering memakai kabel liar atau aki yang rawan korsleting dan kebakaran.' },
  { icon: VolumeX, title: 'Genset bising & berasap', text: 'Event outdoor masih bergantung pada genset yang berisik, berasap, dan boros BBM.' },
  { icon: BatteryWarning, title: 'Baterai EV bekas menumpuk', text: 'Baterai kendaraan listrik bekas mulai menumpuk dan belum banyak dimanfaatkan.' },
  { icon: Factory, title: 'CSR sulit diukur', text: 'Perusahaan butuh program keberlanjutan yang dampaknya terukur, bukan sekadar branding.' },
]

const steps = [
  { title: 'Pilih paket', text: 'Pilih jenis jualan atau kebutuhanmu, sistem merekomendasikan jumlah modul.', img: mascot.stepChoose },
  { title: 'Ambil modul', text: 'Scan QR dan ambil modul penuh di Mitra Hub terdekat, atau diantar untuk event.', img: mascot.stepPickup },
  { title: 'Pakai untuk jualan', text: 'Colokkan alat ke inverter. Listrik siap dipakai — senyap dan tanpa asap.', img: mascot.stepUse },
  { title: 'Tukar saat habis', text: 'Kembalikan modul kosong ke hub, tukar dengan yang penuh dalam hitungan menit.', img: mascot.stepSwap },
]

const values = [
  { icon: VolumeX, title: 'Alternatif genset yang senyap & bersih', text: 'Tanpa suara mesin, tanpa asap, tanpa bau BBM di lapakmu.' },
  { icon: Wallet, title: 'Fleksibel tanpa investasi awal', text: 'Sewa harian atau langganan bulanan, bayar mudah via QRIS.' },
  { icon: RefreshCw, title: 'Tukar mandiri di Mitra Hub', text: 'Scan QR, ambil modul penuh, kembalikan yang kosong. Cepat.' },
  { icon: ShieldCheck, title: 'Listrik legal & aman untuk UMKM', text: 'Tidak perlu lagi menyambung kabel dari jaringan orang lain.' },
  { icon: Zap, title: 'Sistem keamanan terintegrasi', text: 'Sensor suhu per modul, deteksi anomali AI, dan pemadam otomatis.' },
  { icon: Sun, title: 'Energi bersih berbasis surya', text: 'Modul diisi ulang dengan panel surya di Mitra Hub.' },
  { icon: Recycle, title: 'Baterai bekas dipakai lagi', text: 'Ekonomi sirkular: baterai EV bekas mendapat kehidupan kedua.' },
  { icon: BarChart3, title: 'Dampak lingkungan terukur', text: 'kWh bersih, CO₂ dihindari, dan baterai diselamatkan tercatat.' },
]

const audiences = [
  { icon: Store, title: 'Tenant & PKL', text: 'Pedagang pasar malam, bazar, festival kuliner, dan sentra kuliner.', to: '/layanan', cta: 'Lihat paket' },
  { icon: PartyPopper, title: 'EO & Pengelola', text: 'Event organizer, bazar kampus, festival kuliner, dan night market.', to: '/kemitraan?tab=eo', cta: 'Kerja sama event' },
  { icon: Building2, title: 'Korporasi (CSR)', text: 'Danai elektrifikasi UMKM dengan laporan dampak yang terukur.', to: '/kemitraan?tab=csr', cta: 'Program CSR' },
  { icon: MapPin, title: 'Calon Mitra Hub', text: 'Pemilik lokasi yang ingin menjadi titik tukar baterai.', to: '/kemitraan?tab=hub', cta: 'Jadi Mitra Hub' },
]

function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-cream via-cream to-white">
      <div aria-hidden="true" className="absolute -right-24 -top-24 size-80 rounded-full bg-primary/15 blur-2xl" />
      <div className="container-page relative grid items-center gap-8 pt-8 pb-12 sm:pt-12 md:grid-cols-2 md:gap-10 md:py-20">
        <div>
          <p className="badge-eco mb-4">
            <Leaf className="size-3.5" aria-hidden="true" /> Second-life EV battery
          </p>
          <h1 className="text-[2rem] leading-[1.15] sm:text-5xl lg:text-[3.4rem]">
            Listrik bersih untuk UMKM, <span className="text-primary-dark">tinggal tukar.</span>
          </h1>
          <p className="mt-4 text-lg text-ink-soft">
            Modul baterai dari kendaraan listrik bekas, diisi tenaga surya. Tanpa genset, tanpa sambungan liar, tanpa modal awal.
          </p>
          <p className="mt-2 text-sm font-medium italic text-ink-soft">{business.tagline}</p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Link to="/pesan" className="btn-primary text-lg">
              Pesan Sekarang <ArrowRight className="size-5" aria-hidden="true" />
            </Link>
            <Link to="/kemitraan?tab=hub" className="btn-outline text-lg">
              <Handshake className="size-5" aria-hidden="true" /> Jadi Mitra Hub
            </Link>
          </div>
          <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-sm font-semibold text-ink-soft">
            <li className="flex items-center gap-1.5"><VolumeX className="size-4 text-primary-dark" aria-hidden="true" /> Senyap</li>
            <li className="flex items-center gap-1.5"><Sun className="size-4 text-primary-dark" aria-hidden="true" /> Tenaga surya</li>
            <li className="flex items-center gap-1.5"><Wallet className="size-4 text-primary-dark" aria-hidden="true" /> Bayar via QRIS</li>
          </ul>
        </div>

        {/* Visual: ilustrasi hub + maskot */}
        <div className="relative mx-auto w-full max-w-md md:max-w-none">
          <div className="relative aspect-[5/4] w-full">
            <HubIllustration className="absolute inset-0 h-full w-full" />
            <BrandImage
              src={mascot.hero}
              label="Maskot Encore"
              eager
              className="absolute -bottom-2 -left-1 h-[62%] w-[44%] drop-shadow-xl sm:-left-4"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

function Problems() {
  return (
    <section className="section" aria-labelledby="masalah">
      <div className="container-page">
        <SectionHeading id="masalah" eyebrow="Masalah" title="Listrik untuk jualan masih jadi PR besar" lead="Empat masalah yang kami temui di lapangan, dari lapak kaki lima sampai ruang rapat perusahaan." />
        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {problems.map(({ icon: I, title, text }) => (
            <li key={title} className="card p-5">
              <span className="grid size-11 place-items-center rounded-xl bg-red-50 text-red-700">
                <I className="size-5" aria-hidden="true" />
              </span>
              <h3 className="mt-4 text-lg">{title}</h3>
              <p className="mt-1.5 text-ink-soft">{text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

function HowItWorks() {
  return (
    <section className="section bg-surface" aria-labelledby="cara-kerja">
      <div className="container-page">
        <SectionHeading id="cara-kerja" eyebrow="Cara kerja" title="Empat langkah, listrik siap dipakai" center />
        <ol className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <li key={s.title} className="card relative flex gap-4 p-5 sm:flex-col sm:items-center sm:text-center">
              <div className="relative shrink-0">
                <BrandImage src={s.img} label="Maskot" className="h-24 w-20 sm:h-36 sm:w-32" />
                <span className="absolute -top-1 -left-1 grid size-8 place-items-center rounded-full bg-primary-dark text-sm font-extrabold text-white ring-4 ring-white">
                  {i + 1}
                </span>
              </div>
              <div>
                <h3 className="text-lg">{s.title}</h3>
                <p className="mt-1 text-ink-soft">{s.text}</p>
              </div>
            </li>
          ))}
        </ol>
        <div className="mt-8 text-center">
          <Link to="/estimator" className="btn-outline">
            <Plug className="size-5" aria-hidden="true" /> Hitung kebutuhan listrikmu
          </Link>
        </div>
      </div>
    </section>
  )
}

function WhyEncore() {
  const [showAll, setShowAll] = useState(false)
  return (
    <section className="section" aria-labelledby="kenapa">
      <div className="container-page">
        <div className="grid items-end gap-6 md:grid-cols-[1fr_auto]">
          <SectionHeading id="kenapa" eyebrow="Kenapa Encore" title="Lebih senyap, lebih aman, lebih hemat" lead="Dirancang untuk pedagang kecil yang butuh listrik andal tanpa repot." />
          <BrandImage src={mascot.about} label="Maskot Encore" className="hidden h-44 w-40 md:flex" />
        </div>
        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {values.map(({ icon: I, title, text }, idx) => (
            <li key={title} className={`card p-5 ${idx >= 4 && !showAll ? 'hidden sm:block' : ''}`}>
              <span className="grid size-11 place-items-center rounded-xl bg-primary-light text-primary-dark">
                <I className="size-5" aria-hidden="true" />
              </span>
              <h3 className="mt-4 text-base sm:text-lg">{title}</h3>
              <p className="mt-1.5 text-sm text-ink-soft sm:text-base">{text}</p>
            </li>
          ))}
        </ul>
        {!showAll && (
          <div className="mt-6 text-center sm:hidden">
            <button type="button" className="btn-outline w-full" onClick={() => setShowAll(true)}>
              Lihat semua keunggulan <ChevronDown className="size-5" aria-hidden="true" />
            </button>
          </div>
        )}
      </div>
    </section>
  )
}

function PackagesPreview() {
  const featured = packages.filter((p) => p.featured)
  return (
    <section className="section bg-cream" aria-labelledby="paket">
      <div className="container-page">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading id="paket" eyebrow="Paket" title="Paket sewa harian untuk tenant" lead="Bingung pilih? Estimator kami bantu hitung jumlah modul." />
          <Placeholder className="self-start sm:self-auto">Harga contoh · dapat berubah</Placeholder>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {featured.map((p) => (
            <PackageCard key={p.id} pkg={p} compact />
          ))}
        </div>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link to="/layanan" className="btn-outline">Lihat semua layanan</Link>
          <Link to="/estimator" className="btn-ghost">Bantu saya pilih <ArrowRight className="size-5" aria-hidden="true" /></Link>
        </div>
      </div>
    </section>
  )
}

function Impact() {
  return (
    <section className="section bg-product text-white" aria-labelledby="dampak">
      <div className="container-page">
        <div className="grid items-end gap-6 md:grid-cols-[1fr_auto]">
          <div className="max-w-2xl">
            <p className="mb-2 inline-flex items-center gap-1.5 rounded-full bg-eco-dark px-3 py-1 text-xs font-bold uppercase tracking-wider text-white">
              <Leaf className="size-3.5" aria-hidden="true" /> Dampak
            </p>
            <h2 id="dampak" className="h2 text-white">Setiap tukar baterai, bumi sedikit lebih lega</h2>
            <p className="mt-3 text-stone-300 sm:text-lg">
              Sistem pemantauan Encore mencatat dampak setiap modul secara terukur — siap dilaporkan untuk program CSR.
            </p>
          </div>
          <BrandImage src={mascot.impact} label="Maskot Encore" className="mx-auto h-40 w-40 sm:h-48 sm:w-48" />
        </div>
        <div className="mt-10">
          <ImpactStats dark />
        </div>
      </div>
    </section>
  )
}

function Audiences() {
  return (
    <section className="section" aria-labelledby="untuk-siapa">
      <div className="container-page">
        <SectionHeading id="untuk-siapa" eyebrow="Untuk siapa" title="Satu solusi, banyak pihak terbantu" center />
        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {audiences.map(({ icon: I, title, text, to, cta }) => (
            <li key={title} className="card flex flex-col p-5">
              <span className="grid size-12 place-items-center rounded-xl bg-primary text-ink">
                <I className="size-6" aria-hidden="true" />
              </span>
              <h3 className="mt-4 text-lg">{title}</h3>
              <p className="mt-1.5 flex-1 text-ink-soft">{text}</p>
              <Link to={to} className="mt-4 inline-flex min-h-11 items-center gap-1.5 font-bold text-primary-dark hover:underline">
                {cta} <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            </li>
          ))}
        </ul>
        <div className="mt-12">
          <p className="text-center text-sm font-semibold text-ink-soft">Calon mitra & pendukung <Placeholder>Contoh</Placeholder></p>
          <ul className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[1, 2, 3, 4].map((n) => (
              <li key={n} className="grid h-16 place-items-center rounded-xl border-2 border-dashed border-stone-300 text-sm font-semibold text-stone-500">
                Logo Mitra
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

function HomeFaq() {
  return (
    <section className="section bg-surface" aria-labelledby="faq-home">
      <div className="container-page grid gap-8 lg:grid-cols-[1fr_1.4fr]">
        <SectionHeading id="faq-home" eyebrow="FAQ" title="Pertanyaan yang sering muncul">
          <Link to="/faq" className="btn-outline mt-6">Lihat semua FAQ</Link>
        </SectionHeading>
        <FaqList items={faqs.filter((f) => f.home)} />
      </div>
    </section>
  )
}

export default function Home() {
  return (
    <>
      <Hero />
      <Problems />
      <HowItWorks />
      <WhyEncore />
      <PackagesPreview />
      <Impact />
      <Audiences />
      <HomeFaq />
      <CtaBanner />
    </>
  )
}
