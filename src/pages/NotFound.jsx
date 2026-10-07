import { Link } from 'react-router-dom'
import { mascot } from '../data/config'
import BrandImage from '../components/BrandImage'

export default function NotFound() {
  return (
    <section className="section">
      <div className="container-page flex max-w-lg flex-col items-center text-center">
        <BrandImage src={mascot.notFound} label="Maskot Encore" eager className="h-56 w-48" />
        <p className="mt-4 text-sm font-bold uppercase tracking-wider text-primary-dark">Error 404</p>
        <h1 className="mt-1 text-3xl">Halaman tidak ditemukan</h1>
        <p className="mt-2 text-ink-soft">Sepertinya halaman ini sedang tukar baterai. Coba kembali ke beranda.</p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Link to="/" className="btn-primary">Ke beranda</Link>
          <Link to="/lokasi" className="btn-outline">Cari Mitra Hub</Link>
        </div>
      </div>
    </section>
  )
}
