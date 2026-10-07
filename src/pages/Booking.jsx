import { ShieldCheck } from 'lucide-react'
import BookingForm from '../components/BookingForm'

export default function Booking() {
  return (
    <section className="bg-gradient-to-b from-cream to-white pt-8 pb-10 sm:pt-12 sm:pb-20">
      <div className="container-page">
        <div className="mx-auto mb-8 max-w-3xl">
          <p className="eyebrow">Pemesanan</p>
          <h1 className="text-3xl sm:text-4xl">Pesan listrik Encore</h1>
          <p className="mt-2 flex items-center gap-2 text-sm text-ink-soft">
            <ShieldCheck className="size-4 shrink-0 text-eco" aria-hidden="true" />
            Data tersimpan otomatis di perangkatmu. Bayar langsung dengan scan QRIS di langkah terakhir.
          </p>
        </div>
        <BookingForm />
      </div>
    </section>
  )
}
