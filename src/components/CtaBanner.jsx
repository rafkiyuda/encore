import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { mascot } from '../data/config'
import BrandImage from './BrandImage'

export default function CtaBanner({
  title = 'Siap jualan tanpa genset?',
  text = 'Pesan modul Encore sekarang atau jadikan lokasimu titik tukar baterai.',
}) {
  return (
    <section className="section">
      <div className="container-page">
        <div className="relative grid items-center gap-6 overflow-hidden rounded-3xl bg-primary px-5 py-8 sm:px-10 sm:py-12 md:grid-cols-[auto_1fr]">
          <div aria-hidden="true" className="absolute -right-16 -top-16 size-64 rounded-full bg-white/15" />
          <BrandImage
            src={mascot.cta}
            label="Maskot Encore"
            className="order-2 mx-auto h-40 w-36 sm:h-52 sm:w-48 md:order-1"
          />
          <div className="relative order-1 md:order-2">
            <h2 className="h2 text-ink">{title}</h2>
            <p className="mt-3 max-w-xl font-medium text-ink">{text}</p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Link to="/pesan" className="btn-dark">
                Pesan Sekarang <ArrowRight className="size-5" aria-hidden="true" />
              </Link>
              <Link to="/kemitraan" className="btn border-2 border-ink bg-white text-ink hover:bg-cream">
                Jadi Mitra Hub
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
