import { Link, useLocation } from 'react-router-dom'
import { MessageCircle, QrCode } from 'lucide-react'
import { mascot } from '../data/config'
import { rupiah, storage } from '../lib/utils'
import { LAST_ORDER_KEY } from '../lib/booking'
import BrandImage from '../components/BrandImage'

export default function BookingSuccess() {
  const { state } = useLocation()
  const order = state?.orderId ? state : storage.get(LAST_ORDER_KEY)

  if (!order) {
    return (
      <section className="section">
        <div className="container-page max-w-lg text-center">
          <h1 className="text-3xl">Belum ada pesanan</h1>
          <p className="mt-2 text-ink-soft">Sepertinya kamu belum mengirim pesanan.</p>
          <Link to="/pesan" className="btn-primary mt-6">Buat pesanan</Link>
        </div>
      </section>
    )
  }

  return (
    <section className="bg-gradient-to-b from-cream to-white py-10 sm:py-16">
      <div className="container-page max-w-xl text-center">
        <BrandImage src={mascot.success} label="Maskot Encore" eager className="mx-auto h-48 w-48 sm:h-60 sm:w-60" />
        <h1 className="mt-4 text-3xl sm:text-4xl">Pesananmu sudah kami terima!</h1>
        <p className="mt-2 text-ink-soft">
          Terima kasih{order.name ? `, ${order.name}` : ''}. Pastikan pesan WhatsApp sudah terkirim agar tim kami bisa segera mengonfirmasi.
        </p>
        <div className="card mt-6 p-5 text-left">
          <p className="text-sm text-ink-soft">Nomor pesanan</p>
          <p className="text-2xl font-extrabold tracking-wide">{order.orderId}</p>
          {order.packageName && <p className="mt-1 text-sm text-ink-soft">{order.packageName}</p>}
          <p className="mt-4 flex gap-3 rounded-xl bg-cream p-3 text-sm">
            <QrCode className="size-5 shrink-0 text-primary-dark" aria-hidden="true" />
            {order.total != null
              ? `Pembayaran ${rupiah(order.total)} via QRIS sedang kami verifikasi. Pastikan screenshot bukti bayar sudah terkirim di WhatsApp.`
              : 'QRIS untuk pembayaran akan dikirim setelah penawaran disepakati.'}
          </p>
        </div>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <a href={order.waUrl} target="_blank" rel="noreferrer" className="btn-primary">
            <MessageCircle className="size-5" aria-hidden="true" /> Buka WhatsApp lagi
          </a>
          <Link to="/" className="btn-outline">Kembali ke beranda</Link>
        </div>
      </div>
    </section>
  )
}
