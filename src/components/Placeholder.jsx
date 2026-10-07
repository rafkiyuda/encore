import { Info } from 'lucide-react'

/** Label kecil penanda konten contoh/placeholder */
export default function Placeholder({ children = 'Contoh', className = '' }) {
  return (
    <span className={`badge-placeholder ${className}`}>
      <Info className="size-3" aria-hidden="true" />
      {children}
    </span>
  )
}
