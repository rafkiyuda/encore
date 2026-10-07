import { useState } from 'react'
import { ImageIcon } from 'lucide-react'

/**
 * Slot gambar brand (maskot/logo). Jika file belum ada / gagal dimuat,
 * tampil kotak putus-putus berlabel agar layout tetap rapi.
 */
export default function BrandImage({ src, label = 'Maskot Encore', alt, className = '', imgClassName = '', eager = false }) {
  const [failed, setFailed] = useState(!src)

  if (failed) {
    return (
      <div
        role="img"
        aria-label={`${label} (placeholder)`}
        className={`flex flex-col items-center justify-center gap-1 rounded-2xl border-2 border-dashed border-primary/60 bg-cream/70 p-3 text-center text-xs font-bold text-primary-dark ${className}`}
      >
        <ImageIcon className="size-6" aria-hidden="true" />
        {label}
      </div>
    )
  }
  return (
    <div className={`flex items-end justify-center ${className}`}>
      <img
        src={src}
        alt={alt ?? label}
        loading={eager ? 'eager' : 'lazy'}
        decoding="async"
        onError={() => setFailed(true)}
        className={`h-full w-full object-contain ${imgClassName}`}
      />
    </div>
  )
}
