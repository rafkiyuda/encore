import { useNavigate } from 'react-router-dom'
import PageHeader from '../components/PageHeader'
import Estimator from '../components/Estimator'

export default function EstimatorPage() {
  const navigate = useNavigate()
  return (
    <>
      <PageHeader
        eyebrow="Estimator daya"
        title="Berapa modul yang kamu butuhkan?"
        lead="Pilih alat yang biasa kamu pakai saat jualan. Kami hitung kebutuhan energi dan rekomendasikan paket yang pas."
      />
      <section className="pb-14 sm:pb-20">
        <div className="container-page">
          <Estimator onChoose={({ packageId, modules }) => navigate(`/pesan?paket=${packageId}&modul=${modules}`)} />
        </div>
      </section>
    </>
  )
}
