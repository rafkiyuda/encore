import BrandImage from './BrandImage'

/** Header halaman dalam (bukan beranda) dengan slot maskot opsional */
export default function PageHeader({ eyebrow, title, lead, mascotSrc, mascotLabel, children }) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-cream to-white">
      <div className="container-page grid items-center gap-6 py-10 sm:py-14 md:grid-cols-[1fr_auto]">
        <div className="max-w-2xl">
          {eyebrow && <p className="eyebrow">{eyebrow}</p>}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl">{title}</h1>
          {lead && <p className="lead">{lead}</p>}
          {children}
        </div>
        {mascotSrc && (
          <BrandImage
            src={mascotSrc}
            label={mascotLabel}
            eager
            className="hidden h-56 w-52 md:flex lg:h-64 lg:w-60"
          />
        )}
      </div>
    </section>
  )
}
