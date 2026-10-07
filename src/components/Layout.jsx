import { Outlet, useLocation } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'
import StickyCTA from './StickyCTA'
import ScrollToTop from './ScrollToTop'

export default function Layout() {
  const { pathname } = useLocation()
  // ruang ekstra di bawah agar konten tidak tertutup tombol sticky (mobile)
  const pad = pathname.startsWith('/pesan') ? '' : 'pb-20 md:pb-0'
  return (
    <div className={`flex min-h-dvh flex-col ${pad}`}>
      <ScrollToTop />
      <Navbar />
      <main id="main" className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <StickyCTA />
    </div>
  )
}
