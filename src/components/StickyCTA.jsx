import { Link, useLocation } from 'react-router-dom'
import { Zap } from 'lucide-react'

/** Tombol "Pesan Sekarang" melayang di bawah layar (mobile saja) */
export default function StickyCTA() {
  const { pathname } = useLocation()
  if (pathname.startsWith('/pesan')) return null
  return (
    <div className="fixed inset-x-0 bottom-0 z-30 border-t border-stone-200 bg-white/95 px-4 pt-2.5 pb-[calc(0.625rem+env(safe-area-inset-bottom))] shadow-[0_-8px_24px_-12px_rgb(0_0_0/0.2)] backdrop-blur md:hidden">
      <Link to="/pesan" className="btn-primary w-full">
        <Zap className="size-5" aria-hidden="true" /> Pesan Sekarang
      </Link>
    </div>
  )
}
