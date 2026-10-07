import { useEffect, useRef, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { ArrowLeft, ArrowRight, Check, Minus, Plus, QrCode, Send, Sparkles, X } from 'lucide-react'
import { customerTypes, hubs, packages } from '../data/config'
import { formatPrice, getPackage, makeOrderId, rupiah, storage, waLink } from '../lib/utils'
import {
  LAST_ORDER_KEY, STEPS, STORAGE_KEY, buildWhatsAppText, durationUnitOf, emptyBooking,
  fulfillmentOf, maxDurationOf, summarize, todayStr, validateStep,
} from '../lib/booking'
import Icon from './Icon'
import Estimator from './Estimator'
import QrisPayment from './QrisPayment'

function Field({ id, label, error, hint, children }) {
  return (
    <div>
      <label htmlFor={id} className="field-label">{label}</label>
      {children}
      {hint && !error && <p id={`${id}-hint`} className="field-hint">{hint}</p>}
      {error && <p id={`${id}-error`} className="field-error">{error}</p>}
    </div>
  )
}

const inputProps = (id, errors) => ({
  id,
  name: id,
  'aria-invalid': errors[id] ? true : undefined,
  'aria-describedby': errors[id] ? `${id}-error` : undefined,
})

function Progress({ step }) {
  const pct = ((step + 1) / STEPS.length) * 100
  return (
    <div>
      {/* mobile: ringkas */}
      <div className="sm:hidden">
        <div className="flex items-baseline justify-between text-sm">
          <span className="font-bold text-primary-dark">Langkah {step + 1} dari {STEPS.length}</span>
          <span className="text-ink-soft">{STEPS[step]}</span>
        </div>
        <div className="mt-2 h-2 overflow-hidden rounded-full bg-stone-200" role="progressbar" aria-valuemin={1} aria-valuemax={STEPS.length} aria-valuenow={step + 1} aria-label="Progres pemesanan">
          <div className="h-full rounded-full bg-primary transition-all" style={{ width: `${pct}%` }} />
        </div>
      </div>
      {/* tablet/desktop: semua langkah */}
      <ol className="hidden items-center sm:flex" aria-label="Progres pemesanan">
        {STEPS.map((s, i) => (
          <li key={s} className="flex flex-1 items-center last:flex-none" aria-current={i === step ? 'step' : undefined}>
            <span className="flex items-center gap-2">
              <span className={`grid size-8 shrink-0 place-items-center rounded-full text-sm font-bold ${
                i < step ? 'bg-eco text-white' : i === step ? 'bg-primary-dark text-white' : 'bg-stone-200 text-ink-soft'
              }`}>
                {i < step ? <Check className="size-4" aria-hidden="true" /> : i + 1}
              </span>
              <span className={`hidden text-sm font-semibold lg:inline ${i === step ? 'text-ink' : 'text-ink-soft'}`}>{s}</span>
            </span>
            {i < STEPS.length - 1 && <span className={`mx-2 h-0.5 flex-1 rounded ${i < step ? 'bg-eco' : 'bg-stone-200'}`} />}
          </li>
        ))}
      </ol>
    </div>
  )
}

function ChoiceCard({ selected, onSelect, children, name, value }) {
  return (
    <label className={`card flex cursor-pointer gap-4 p-4 transition sm:p-5 ${selected ? 'ring-2 ring-primary-dark bg-cream' : 'hover:border-primary/60'}`}>
      <input type="radio" name={name} value={value} checked={selected} onChange={onSelect} className="sr-only" />
      {children}
      <span className={`ml-auto grid size-6 shrink-0 place-items-center rounded-full border-2 ${selected ? 'border-primary-dark bg-primary-dark text-white' : 'border-stone-300'}`} aria-hidden="true">
        {selected && <Check className="size-4" />}
      </span>
    </label>
  )
}

export default function BookingForm() {
  const navigate = useNavigate()
  const [params, setParams] = useSearchParams()
  const [b, setB] = useState(() => ({ ...emptyBooking, ...storage.get(STORAGE_KEY, {}) }))
  const [errors, setErrors] = useState({})
  const [showEstimator, setShowEstimator] = useState(false)
  const headingRef = useRef(null)
  const prevStep = useRef(b.step)

  // Prefill dari URL (?paket=..&modul=..&hub=..)
  useEffect(() => {
    const paket = getPackage(params.get('paket'))
    const hub = hubs.find((h) => h.id === params.get('hub'))
    if (!paket && !hub) return
    setB((prev) => {
      const next = { ...prev }
      if (paket) {
        next.customerType = paket.customerTypes.includes(prev.customerType) ? prev.customerType : paket.customerTypes[0]
        next.packageId = paket.id
        const m = Number(params.get('modul'))
        next.modules = paket.id === 'fnb-berat' ? Math.max(3, Math.min(20, m || 3)) : paket.modules || 0
        next.step = 2
      }
      if (hub) {
        next.hubId = hub.id
        if (!paket) {
          next.customerType = 'tenant'
          next.step = 1
        }
      }
      return next
    })
    setParams({}, { replace: true })
  }, [params, setParams])

  // Simpan draft setiap ada perubahan
  useEffect(() => storage.set(STORAGE_KEY, b), [b])

  // Pindah langkah → scroll & fokus judul langkah
  useEffect(() => {
    if (prevStep.current === b.step) return
    prevStep.current = b.step
    headingRef.current?.focus({ preventScroll: true })
    headingRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [b.step])

  const set = (patch) => {
    setB((prev) => ({ ...prev, ...patch }))
    setErrors((prev) => {
      const next = { ...prev }
      Object.keys(patch).forEach((k) => delete next[k])
      return next
    })
  }

  const pkg = getPackage(b.packageId)
  const fulfillment = fulfillmentOf(pkg)
  const unit = durationUnitOf(pkg)

  const next = () => {
    const e = validateStep(b.step, b)
    setErrors(e)
    if (Object.keys(e).length) {
      requestAnimationFrame(() => document.querySelector('[aria-invalid="true"], [data-error="true"]')?.focus())
      return
    }
    const patch = { step: Math.min(STEPS.length - 1, b.step + 1) }
    if (patch.step === 5 && !b.orderId) patch.orderId = makeOrderId()
    setB((prev) => ({ ...prev, ...patch }))
  }
  const back = () => {
    setErrors({})
    setB((prev) => ({ ...prev, step: Math.max(0, prev.step - 1) }))
  }

  const choosePackage = (p) => {
    set({ packageId: p.id, modules: p.id === 'fnb-berat' ? Math.max(3, b.modules || 3) : p.modules || 0 })
  }

  const waText = b.step === 5 ? buildWhatsAppText(b) : ''
  const waUrl = waLink(waText)

  const submit = (e) => {
    const err = validateStep(5, b)
    if (Object.keys(err).length) {
      e.preventDefault()
      setErrors(err)
      return
    }
    // link wa.me terbuka di tab baru (default anchor), lalu tampilkan halaman sukses
    const order = { orderId: b.orderId, waUrl, name: b.name, packageName: pkg?.name, total: summary?.cost?.total ?? null }
    storage.set(LAST_ORDER_KEY, order)
    storage.remove(STORAGE_KEY)
    setTimeout(() => navigate('/pesan/sukses', { state: order }), 50)
  }

  const reset = () => {
    storage.remove(STORAGE_KEY)
    setErrors({})
    setB({ ...emptyBooking })
  }

  const available = packages.filter((p) => p.customerTypes.includes(b.customerType))
  const summary = b.step >= 4 ? summarize(b) : null

  return (
    <div className="mx-auto max-w-3xl">
      <Progress step={b.step} />

      <form
        className="mt-6"
        noValidate
        onSubmit={(e) => {
          e.preventDefault()
          if (b.step < 5) next()
        }}
      >
        <h2 ref={headingRef} tabIndex={-1} className="scroll-mt-24 text-2xl outline-none sm:text-3xl">
          {['Kamu pelanggan tipe apa?', 'Pilih layanan / paket', 'Kapan dan di mana?', 'Data pemesan', 'Cek ringkasan pesanan', 'Bayar & kirim pesanan'][b.step]}
        </h2>

        <div className="mt-5">
          {/* STEP 1 — tipe pelanggan */}
          {b.step === 0 && (
            <fieldset>
              <legend className="sr-only">Tipe pelanggan</legend>
              <div className="grid gap-3" data-error={errors.customerType ? 'true' : undefined} tabIndex={errors.customerType ? -1 : undefined}>
                {customerTypes.map((c) => (
                  <ChoiceCard
                    key={c.id}
                    name="customerType"
                    value={c.id}
                    selected={b.customerType === c.id}
                    onSelect={() => set({ customerType: c.id, ...(pkg && !pkg.customerTypes.includes(c.id) ? { packageId: '' } : {}) })}
                  >
                    <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-primary-light text-primary-dark">
                      <Icon name={c.icon} className="size-6" />
                    </span>
                    <span>
                      <span className="block font-bold">{c.label}</span>
                      <span className="block text-sm text-ink-soft">{c.desc}</span>
                    </span>
                  </ChoiceCard>
                ))}
              </div>
              {errors.customerType && <p className="field-error">{errors.customerType}</p>}
            </fieldset>
          )}

          {/* STEP 2 — paket */}
          {b.step === 1 && (
            <fieldset>
              <legend className="sr-only">Paket</legend>
              {b.customerType === 'tenant' && (
                <div className="mb-4">
                  <button type="button" className="btn-outline w-full sm:w-auto" onClick={() => setShowEstimator((v) => !v)} aria-expanded={showEstimator}>
                    {showEstimator ? <X className="size-5" aria-hidden="true" /> : <Sparkles className="size-5" aria-hidden="true" />}
                    {showEstimator ? 'Tutup estimator' : 'Bantu saya pilih'}
                  </button>
                  {showEstimator && (
                    <div className="mt-4 rounded-2xl bg-surface p-3 sm:p-4">
                      <Estimator
                        onChoose={({ packageId, modules }) => {
                          set({ packageId, modules })
                          setShowEstimator(false)
                        }}
                      />
                    </div>
                  )}
                </div>
              )}
              <div className="grid gap-3" data-error={errors.packageId ? 'true' : undefined} tabIndex={errors.packageId ? -1 : undefined}>
                {available.map((p) => (
                  <ChoiceCard key={p.id} name="packageId" value={p.id} selected={b.packageId === p.id} onSelect={() => choosePackage(p)}>
                    <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-primary-light text-primary-dark">
                      <Icon name={p.icon} className="size-6" />
                    </span>
                    <span className="min-w-0">
                      <span className="block font-bold">{p.name}</span>
                      <span className="block text-sm text-ink-soft">{p.description}</span>
                      <span className="mt-1 block text-sm font-bold text-primary-dark">{formatPrice(p)}</span>
                    </span>
                  </ChoiceCard>
                ))}
              </div>
              {errors.packageId && <p className="field-error">{errors.packageId}</p>}
              <p className="mt-3 text-xs text-ink-soft">Harga contoh, dapat berubah.</p>

              {b.packageId === 'fnb-berat' && (
                <div className="card mt-4 flex flex-wrap items-center justify-between gap-3 p-4">
                  <div>
                    <p className="font-bold">Jumlah modul</p>
                    <p className="text-sm text-ink-soft">
                      3 modul pertama {rupiah(pkg.price)}/hari, tambahan {rupiah(pkg.extraModulePrice)}/modul
                    </p>
                  </div>
                  <div className="flex items-center rounded-xl border border-stone-300">
                    <button type="button" className="grid size-11 place-items-center disabled:opacity-40" disabled={b.modules <= 3} onClick={() => set({ modules: b.modules - 1 })} aria-label="Kurangi modul">
                      <Minus className="size-4" />
                    </button>
                    <span className="w-10 text-center text-lg font-bold tabular-nums" aria-live="polite">{b.modules}</span>
                    <button type="button" className="grid size-11 place-items-center disabled:opacity-40" disabled={b.modules >= 20} onClick={() => set({ modules: b.modules + 1 })} aria-label="Tambah modul">
                      <Plus className="size-4" />
                    </button>
                  </div>
                  {errors.modules && <p className="field-error w-full">{errors.modules}</p>}
                </div>
              )}
            </fieldset>
          )}

          {/* STEP 3 — jadwal & lokasi */}
          {b.step === 2 && (
            <div className="grid gap-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <Field id="startDate" label="Tanggal mulai" error={errors.startDate}>
                  <input type="date" min={todayStr()} value={b.startDate} onChange={(e) => set({ startDate: e.target.value })} className="field" {...inputProps('startDate', errors)} />
                </Field>
                <Field id="duration" label={`Durasi (${unit})`} error={errors.duration} hint={unit === 'bulan' ? 'Langganan per bulan, maks. 12 bulan' : 'Maks. 30 hari per pesanan'}>
                  <input
                    type="number"
                    inputMode="numeric"
                    min="1"
                    max={maxDurationOf(pkg)}
                    value={b.duration}
                    onChange={(e) => set({ duration: e.target.value === '' ? '' : Number(e.target.value) })}
                    className="field"
                    {...inputProps('duration', errors)}
                  />
                </Field>
              </div>
              <Field
                id="location"
                label={fulfillment === 'program' ? 'Wilayah program' : 'Lokasi jualan / nama event'}
                error={errors.location}
                hint={fulfillment === 'program' ? 'Contoh: Sentra kuliner di Jakarta Timur' : 'Contoh: Pasar Malam Blok M, lapak no. 12'}
              >
                <input type="text" value={b.location} onChange={(e) => set({ location: e.target.value })} className="field" autoComplete="off" {...inputProps('location', errors)} />
              </Field>

              {fulfillment === 'hub' && (
                <Field id="hubId" label="Ambil modul di Mitra Hub" error={errors.hubId} hint="Self-service: scan QR di hub untuk mengambil modul penuh.">
                  <select value={b.hubId} onChange={(e) => set({ hubId: e.target.value })} className="field" {...inputProps('hubId', errors)}>
                    <option value="">Pilih Mitra Hub terdekat</option>
                    {hubs.map((h) => (
                      <option key={h.id} value={h.id} disabled={h.stock === 0}>
                        {h.name} — {h.city}{h.stock === 0 ? ' (stok habis)' : ` (${h.stock} modul)`}
                      </option>
                    ))}
                  </select>
                </Field>
              )}
              {fulfillment === 'antar' && (
                <Field id="address" label="Alamat antar & pasang" error={errors.address} hint="Tim Encore akan mengantar dan memasang modul di alamat ini.">
                  <textarea rows={3} value={b.address} onChange={(e) => set({ address: e.target.value })} className="field" autoComplete="street-address" {...inputProps('address', errors)} />
                </Field>
              )}
            </div>
          )}

          {/* STEP 4 — data pemesan */}
          {b.step === 3 && (
            <div className="grid gap-5">
              <Field id="name" label="Nama lengkap" error={errors.name}>
                <input type="text" value={b.name} onChange={(e) => set({ name: e.target.value })} className="field" autoComplete="name" {...inputProps('name', errors)} />
              </Field>
              <Field id="phone" label="Nomor WhatsApp" error={errors.phone} hint="Contoh: 0812 3456 7890">
                <input type="tel" inputMode="tel" value={b.phone} onChange={(e) => set({ phone: e.target.value })} className="field" autoComplete="tel" placeholder="08xx xxxx xxxx" {...inputProps('phone', errors)} />
              </Field>
              <Field id="businessName" label={b.customerType === 'korporasi' ? 'Nama perusahaan' : b.customerType === 'eo' ? 'Nama event / EO' : 'Nama usaha'} error={errors.businessName}>
                <input type="text" value={b.businessName} onChange={(e) => set({ businessName: e.target.value })} className="field" autoComplete="organization" {...inputProps('businessName', errors)} />
              </Field>
              <Field id="notes" label="Catatan (opsional)" hint="Misalnya alat yang dipakai atau jam jualan.">
                <textarea rows={3} value={b.notes} onChange={(e) => set({ notes: e.target.value })} className="field" {...inputProps('notes', errors)} />
              </Field>
            </div>
          )}

          {/* STEP 5 — ringkasan */}
          {b.step === 4 && summary && (
            <div className="grid gap-4">
              <div className="card divide-y divide-stone-200">
                {[['Pesanan', summary.rows, 2], ['Pemesan', summary.contact, 3]].map(([title, rows, goto]) => (
                  <div key={title} className="p-4 sm:p-5">
                    <div className="flex items-center justify-between">
                      <h3 className="text-base">{title}</h3>
                      {b.step === 4 && (
                        <button type="button" onClick={() => set({ step: goto })} className="min-h-11 px-2 text-sm font-bold text-primary-dark hover:underline">
                          Ubah
                        </button>
                      )}
                    </div>
                    <dl className="mt-2 grid gap-2 text-sm">
                      {rows.map(([k, v]) => (
                        <div key={k} className="grid grid-cols-[minmax(0,2fr)_minmax(0,3fr)] gap-3">
                          <dt className="text-ink-soft">{k}</dt>
                          <dd className="font-semibold break-words">{v}</dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                ))}
                <div className="bg-cream p-4 sm:p-5">
                  <p className="text-sm text-ink-soft">Total bayar</p>
                  {summary.cost ? (
                    <>
                      <p className="text-3xl font-extrabold">{rupiah(summary.cost.total)}</p>
                      <p className="text-sm text-ink-soft">
                        {rupiah(summary.cost.perUnit)} × {summary.cost.qty} {summary.cost.unit} · harga contoh, dapat berubah
                      </p>
                    </>
                  ) : (
                    <p className="text-xl font-extrabold">Penawaran menyusul</p>
                  )}
                </div>
              </div>
              {b.step === 4 && (
                <p className="flex gap-3 rounded-xl bg-product p-4 text-sm text-stone-200">
                  <QrCode className="size-5 shrink-0 text-primary" aria-hidden="true" />
                  {summary.cost
                    ? 'Di langkah berikutnya kamu bisa langsung bayar dengan scan QRIS.'
                    : 'Layanan ini perlu penawaran dulu. QRIS dikirim tim Encore lewat WhatsApp setelah harga disepakati.'}
                </p>
              )}
            </div>
          )}

          {/* STEP 6 — bayar & kirim */}
          {b.step === 5 && (
            <div className="mt-4 grid gap-4">
              {summary?.cost && <QrisPayment amount={summary.cost.total} orderId={b.orderId} />}
              <div className="card p-4 sm:p-5">
                <p className="text-sm text-ink-soft">Nomor pesanan</p>
                <p className="text-xl font-extrabold tracking-wide">{b.orderId}</p>
                <details className="mt-3">
                  <summary className="min-h-11 cursor-pointer py-2 text-sm font-bold text-primary-dark">Lihat pesan WhatsApp yang akan dikirim</summary>
                  <pre className="mt-2 max-h-72 overflow-auto rounded-xl bg-surface p-3 font-sans text-sm whitespace-pre-wrap">{waText}</pre>
                </details>
              </div>
              <label className="flex cursor-pointer gap-3 rounded-xl p-1" data-error={errors.agree ? 'true' : undefined}>
                <input
                  type="checkbox"
                  checked={b.agree}
                  onChange={(e) => set({ agree: e.target.checked })}
                  className="mt-1 size-5 shrink-0 accent-primary-dark"
                  aria-invalid={errors.agree ? true : undefined}
                  aria-describedby={errors.agree ? 'agree-error' : undefined}
                />
                <span className="text-sm">
                  {summary?.cost
                    ? <>Saya <strong>sudah membayar {rupiah(summary.cost.total)}</strong> via QRIS dan akan melampirkan bukti bayar di WhatsApp.</>
                    : 'Data sudah benar dan saya setuju dihubungi tim Encore melalui WhatsApp untuk penawaran.'}
                </span>
              </label>
              {errors.agree && <p id="agree-error" className="field-error -mt-2">{errors.agree}</p>}
            </div>
          )}
        </div>

        {/* Navigasi langkah — menempel di bawah layar pada mobile */}
        <div className="sticky bottom-0 z-20 -mx-4 mt-8 border-t border-stone-200 bg-white/95 px-4 pt-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] backdrop-blur sm:static sm:mx-0 sm:border-0 sm:bg-transparent sm:p-0">
          <div className="flex gap-3">
            {b.step > 0 && (
              <button type="button" onClick={back} className="btn-outline flex-1 sm:flex-none">
                <ArrowLeft className="size-5" aria-hidden="true" /> Kembali
              </button>
            )}
            {b.step < 5 ? (
              <button type="submit" className="btn-primary flex-[2] sm:ml-auto sm:flex-none">
                {b.step === 4 ? 'Lanjut konfirmasi' : 'Lanjut'} <ArrowRight className="size-5" aria-hidden="true" />
              </button>
            ) : (
              <a href={waUrl} target="_blank" rel="noreferrer" onClick={submit} className="btn-primary flex-[2] sm:ml-auto sm:flex-none">
                <Send className="size-5" aria-hidden="true" /> {summary?.cost ? 'Kirim bukti bayar' : 'Kirim via WhatsApp'}
              </a>
            )}
          </div>
        </div>
      </form>

      {(b.step > 0 || b.customerType) && (
        <div className="mt-6 text-center">
          <button type="button" onClick={reset} className="min-h-11 text-sm font-semibold text-ink-soft underline-offset-2 hover:underline">
            Mulai ulang pesanan
          </button>
        </div>
      )}
    </div>
  )
}
