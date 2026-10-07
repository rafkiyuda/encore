import { useEffect, useRef, useState } from 'react'
import { impact, impactLabel } from '../data/config'
import { num } from '../lib/utils'

function Counter({ to, suffix }) {
  const ref = useRef(null)
  const [val, setVal] = useState(0)
  useEffect(() => {
    const el = ref.current
    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    if (reduce || !('IntersectionObserver' in window)) {
      setVal(to)
      return
    }
    let raf
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return
      io.disconnect()
      const start = performance.now()
      const tick = (t) => {
        const p = Math.min(1, (t - start) / 1400)
        setVal(to * (1 - Math.pow(1 - p, 3)))
        if (p < 1) raf = requestAnimationFrame(tick)
      }
      raf = requestAnimationFrame(tick)
    })
    io.observe(el)
    return () => {
      io.disconnect()
      cancelAnimationFrame(raf)
    }
  }, [to])
  return (
    <span ref={ref} className="tabular-nums">
      {num(val)}
      {suffix}
    </span>
  )
}

export default function ImpactStats({ dark = false }) {
  return (
    <div>
      <ul className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        {impact.map((s) => (
          <li
            key={s.id}
            className={`rounded-2xl p-4 sm:p-5 ${dark ? 'bg-white/5 ring-1 ring-white/10' : 'card'}`}
          >
            <span className={`inline-block rounded-full px-2 py-0.5 text-[11px] font-bold uppercase tracking-wide ${dark ? 'bg-white/10 text-stone-200' : 'bg-eco-light text-eco-dark'}`}>
              {s.tag}
            </span>
            <p className={`mt-2 text-2xl font-extrabold sm:text-3xl ${dark ? 'text-primary' : 'text-ink'}`}>
              <Counter to={s.value} suffix={s.suffix} />
            </p>
            <p className={`mt-1 text-sm ${dark ? 'text-stone-300' : 'text-ink-soft'}`}>{s.label}</p>
          </li>
        ))}
      </ul>
      <p className={`mt-4 text-xs ${dark ? 'text-stone-400' : 'text-ink-soft'}`}>
        * {impactLabel}. Bukan data realisasi.
      </p>
    </div>
  )
}
