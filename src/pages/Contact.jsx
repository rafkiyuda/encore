import { Mail, MapPin, MessageCircle } from 'lucide-react'
import { business } from '../data/config'
import { waLink } from '../lib/utils'
import PageHeader from '../components/PageHeader'
import LeadForm from '../components/LeadForm'
import Placeholder from '../components/Placeholder'

const fields = [
  { id: 'name', label: 'Nama', required: true, autoComplete: 'name' },
  { id: 'phone', label: 'Nomor WhatsApp', type: 'tel', required: true, autoComplete: 'tel', placeholder: '08xx xxxx xxxx' },
  { id: 'topic', label: 'Topik', type: 'select', required: true, options: ['Pemesanan', 'Kemitraan', 'Media / lomba', 'Lainnya'], full: true },
  { id: 'message', label: 'Pesan', type: 'textarea', required: true },
]

export default function Contact() {
  const items = [
    { icon: MessageCircle, label: 'WhatsApp', value: business.whatsappDisplay, href: waLink('Halo Encore!'), external: true },
    { icon: Mail, label: 'Email', value: business.email, href: `mailto:${business.email}` },
    { icon: MapPin, label: 'Alamat', value: business.address },
  ]
  return (
    <>
      <PageHeader eyebrow="Kontak" title="Ngobrol dengan tim Encore" lead="Respon tercepat lewat WhatsApp pada jam kerja.">
        <Placeholder className="mt-4">Kontak sementara</Placeholder>
      </PageHeader>
      <section className="pb-14 sm:pb-20">
        <div className="container-page grid gap-8 lg:grid-cols-[1fr_1.4fr]">
          <ul className="grid content-start gap-3">
            {items.map(({ icon: I, label, value, href, external }) => {
              const inner = (
                <>
                  <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-primary-light text-primary-dark"><I className="size-5" aria-hidden="true" /></span>
                  <span className="min-w-0">
                    <span className="block text-sm text-ink-soft">{label}</span>
                    <span className="block font-bold break-words">{value}</span>
                  </span>
                </>
              )
              return (
                <li key={label}>
                  {href ? (
                    <a href={href} target={external ? '_blank' : undefined} rel={external ? 'noreferrer' : undefined} className="card flex items-center gap-4 p-4 hover:border-primary">
                      {inner}
                    </a>
                  ) : (
                    <div className="card flex items-center gap-4 p-4">{inner}</div>
                  )}
                </li>
              )
            })}
          </ul>
          <LeadForm title="Kirim pesan" fields={fields} intro="Halo Encore, saya ingin menghubungi tim." />
        </div>
      </section>
    </>
  )
}
