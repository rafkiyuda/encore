import { useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import About from './pages/About'
import Services from './pages/Services'
import EstimatorPage from './pages/EstimatorPage'
import Hubs from './pages/Hubs'
import Booking from './pages/Booking'
import BookingSuccess from './pages/BookingSuccess'
import Partnership from './pages/Partnership'
import Faq from './pages/Faq'
import Contact from './pages/Contact'
import NotFound from './pages/NotFound'
import { business, navLinks } from './data/config'

const titles = {
  ...Object.fromEntries(navLinks.map((l) => [l.to, l.label])),
  '/estimator': 'Estimator Daya',
  '/pesan': 'Pesan',
  '/pesan/sukses': 'Pesanan Terkirim',
}

function DocumentTitle() {
  const { pathname } = useLocation()
  useEffect(() => {
    const t = titles[pathname]
    document.title = pathname === '/' || !t ? `${business.name} — ${business.tagline}` : `${t} · ${business.name}`
  }, [pathname])
  return null
}

export default function App() {
  return (
    <>
      <DocumentTitle />
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="tentang" element={<About />} />
          <Route path="layanan" element={<Services />} />
          <Route path="estimator" element={<EstimatorPage />} />
          <Route path="lokasi" element={<Hubs />} />
          <Route path="pesan" element={<Booking />} />
          <Route path="pesan/sukses" element={<BookingSuccess />} />
          <Route path="kemitraan" element={<Partnership />} />
          <Route path="faq" element={<Faq />} />
          <Route path="kontak" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  )
}
