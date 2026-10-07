import { Link } from 'react-router-dom'
import { MessageCircle } from 'lucide-react'
import { faqs } from '../data/config'
import { waLink } from '../lib/utils'
import PageHeader from '../components/PageHeader'
import FaqList from '../components/FaqList'

export default function Faq() {
  return (
    <>
      <PageHeader eyebrow="FAQ" title="Pertanyaan yang sering ditanyakan" lead="Belum menemukan jawaban? Tanya langsung lewat WhatsApp." />
      <section className="pb-14 sm:pb-20">
        <div className="container-page max-w-3xl">
          <FaqList items={faqs} />
          <div className="card mt-8 flex flex-col items-start gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
            <p className="font-bold">Masih ada pertanyaan?</p>
            <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row">
              <a href={waLink('Halo Encore, saya ingin bertanya.')} target="_blank" rel="noreferrer" className="btn-primary">
                <MessageCircle className="size-5" aria-hidden="true" /> Chat WhatsApp
              </a>
              <Link to="/kontak" className="btn-outline">Halaman kontak</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
