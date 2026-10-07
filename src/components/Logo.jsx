import { useState } from 'react'
import { business, logo } from '../data/config'

/** Logo horizontal di navbar/footer. Jika file belum ada → wordmark teks. */
export default function Logo({ dark = false, className = '' }) {
  const [failed, setFailed] = useState(false)
  if (!failed) {
    return (
      <img
        src={dark ? logo.horizontalWhite : logo.horizontal}
        alt={business.name}
        width="751"
        height="160"
        onError={() => setFailed(true)}
        className={`h-9 w-auto object-contain sm:h-10 ${className}`}
      />
    )
  }
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <img src="/favicon.png" alt="" className="size-9" />
      <span className={`text-xl font-extrabold tracking-tight ${dark ? 'text-white' : 'text-ink'}`}>
        {business.name}
      </span>
    </span>
  )
}
