import { Link } from 'react-router-dom'
import { Mail, MapPin, MessageCircle } from 'lucide-react'
import { business, navLinks } from '../data/config'
import { waLink } from '../lib/utils'
import Logo from './Logo'

export default function Footer() {
  return (
    <footer className="bg-product text-stone-300">
      <div className="container-page grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div className="lg:col-span-2">
          <Logo dark />
          <p className="mt-3 max-w-sm text-sm leading-relaxed">{business.taglineId}</p>
          <p className="mt-2 text-xs italic text-stone-400">{business.tagline}</p>
        </div>
        <div>
          <h2 className="text-sm font-bold uppercase tracking-wider text-white">Jelajahi</h2>
          <ul className="mt-3 grid grid-cols-2 gap-x-4 sm:grid-cols-1">
            {navLinks.map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="inline-flex min-h-10 items-center text-sm hover:text-primary">
                  {l.label}
                </Link>
              </li>
            ))}
            <li>
              <Link to="/pesan" className="inline-flex min-h-10 items-center text-sm font-bold text-primary hover:underline">
                Pesan Sekarang
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h2 className="text-sm font-bold uppercase tracking-wider text-white">Kontak</h2>
          <ul className="mt-3 space-y-3 text-sm">
            <li>
              <a href={waLink()} target="_blank" rel="noreferrer" className="flex items-start gap-2 hover:text-primary">
                <MessageCircle className="mt-0.5 size-4 shrink-0" aria-hidden="true" /> {business.whatsappDisplay}
              </a>
            </li>
            <li>
              <a href={`mailto:${business.email}`} className="flex items-start gap-2 break-all hover:text-primary">
                <Mail className="mt-0.5 size-4 shrink-0" aria-hidden="true" /> {business.email}
              </a>
            </li>
            <li className="flex items-start gap-2">
              <MapPin className="mt-0.5 size-4 shrink-0" aria-hidden="true" /> {business.address}
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container-page flex flex-col gap-2 py-5 text-xs text-stone-400 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {business.name}. Harga, angka dampak, hub, dan mitra di situs ini adalah contoh.</p>
          <p>Proposed by <span className="font-bold text-stone-200">{business.team}</span></p>
        </div>
      </div>
    </footer>
  )
}
