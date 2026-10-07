import { Link } from 'react-router-dom'
import { Check } from 'lucide-react'
import { formatPrice } from '../lib/utils'
import Icon from './Icon'

export default function PackageCard({ pkg, compact = false }) {
  return (
    <article
      className={`card relative flex flex-col p-5 sm:p-6 ${pkg.popular ? 'ring-2 ring-primary' : ''}`}
    >
      {pkg.popular && (
        <span className="absolute -top-3 left-5 rounded-full bg-primary-dark px-3 py-1 text-xs font-bold text-white">
          Paling dipilih
        </span>
      )}
      <div className="flex items-start gap-3">
        <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-primary-light text-primary-dark">
          <Icon name={pkg.icon} className="size-6" />
        </span>
        <div className="min-w-0">
          <h3 className="text-lg leading-snug">{pkg.name}</h3>
          <p className="text-sm text-ink-soft">{pkg.audience}</p>
        </div>
      </div>
      <p className="mt-4 text-ink-soft">{pkg.description}</p>
      {!compact && (
        <ul className="mt-4 space-y-2 text-sm">
          {pkg.highlights.map((h) => (
            <li key={h} className="flex gap-2">
              <Check className="mt-0.5 size-4 shrink-0 text-eco" aria-hidden="true" /> {h}
            </li>
          ))}
        </ul>
      )}
      <div className="mt-auto pt-5">
        <p className="text-2xl font-extrabold text-ink">
          {formatPrice(pkg)}
        </p>
        <p className="text-xs text-ink-soft">{pkg.price != null ? 'Harga contoh · dapat berubah' : 'Penawaran disesuaikan kebutuhan'}</p>
        <Link to={`/pesan?paket=${pkg.id}`} className={`${pkg.popular ? 'btn-primary' : 'btn-outline'} mt-4 w-full`}>
          {pkg.price != null ? 'Pesan paket ini' : 'Ajukan penawaran'}
        </Link>
      </div>
    </article>
  )
}
