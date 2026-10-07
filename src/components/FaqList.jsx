import { ChevronDown } from 'lucide-react'

export default function FaqList({ items }) {
  return (
    <div className="space-y-3">
      {items.map((f) => (
        <details key={f.q} className="group card overflow-hidden">
          <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 p-4 font-bold sm:p-5 [&::-webkit-details-marker]:hidden">
            {f.q}
            <ChevronDown className="size-5 shrink-0 text-primary-dark transition group-open:rotate-180" aria-hidden="true" />
          </summary>
          <p className="px-4 pb-5 text-ink-soft sm:px-5">{f.a}</p>
        </details>
      ))}
    </div>
  )
}
