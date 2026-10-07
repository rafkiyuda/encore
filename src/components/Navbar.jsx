import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { navLinks } from '../data/config'
import Logo from './Logo'

const linkClass = ({ isActive }) =>
  `rounded-lg px-2.5 py-2 text-sm font-semibold transition ${
    isActive ? 'bg-cream text-primary-dark' : 'text-ink-soft hover:text-ink'
  }`

export default function Navbar() {
  const { pathname } = useLocation()
  // menu otomatis tertutup saat pindah halaman (terikat ke path saat dibuka)
  const [openAt, setOpenAt] = useState(null)
  const open = openAt === pathname
  const setOpen = (v) => setOpenAt((typeof v === 'function' ? v(open) : v) ? pathname : null)

  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && setOpenAt(null)
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <header className="sticky top-0 z-40 border-b border-stone-200/70 bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/80">
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-2 focus:top-2 focus:rounded-lg focus:bg-white focus:p-2">
        Lewati ke konten
      </a>
      <nav className="container-page flex h-16 items-center justify-between gap-4" aria-label="Navigasi utama">
        <Link to="/" className="shrink-0" aria-label="Encore — Beranda">
          <Logo />
        </Link>

        <ul className="hidden items-center gap-0.5 lg:flex">
          {navLinks.map((l) => (
            <li key={l.to}>
              <NavLink to={l.to} end={l.to === '/'} className={linkClass}>
                {l.label}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <Link to="/pesan" className="btn-primary hidden !px-4 !py-2 text-sm sm:inline-flex">
            Pesan Sekarang
          </Link>
          <button
            type="button"
            className="inline-flex size-11 items-center justify-center rounded-xl text-ink hover:bg-surface lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Tutup menu' : 'Buka menu'}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-6" /> : <Menu className="size-6" />}
          </button>
        </div>
      </nav>

      {open && (
        <div id="mobile-menu" className="fixed inset-x-0 top-16 bottom-0 z-40 overflow-y-auto bg-white lg:hidden">
          <ul className="container-page flex flex-col gap-1 py-4">
            {navLinks.map((l) => (
              <li key={l.to}>
                <NavLink
                  to={l.to}
                  end={l.to === '/'}
                  className={({ isActive }) =>
                    `flex min-h-12 items-center rounded-xl px-4 text-lg font-bold ${
                      isActive ? 'bg-cream text-primary-dark' : 'text-ink hover:bg-surface'
                    }`
                  }
                >
                  {l.label}
                </NavLink>
              </li>
            ))}
            <li className="mt-3 grid gap-2">
              <Link to="/pesan" className="btn-primary w-full">Pesan Sekarang</Link>
              <Link to="/kemitraan" className="btn-outline w-full">Jadi Mitra Hub</Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  )
}
