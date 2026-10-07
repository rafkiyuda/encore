import { useState } from 'react'
import { CheckCircle2, Send } from 'lucide-react'
import { isValidIndoPhone, normalizePhone, waLink } from '../lib/utils'

/**
 * Form pengajuan generik (kemitraan/kontak). Tanpa backend:
 * data dikirim sebagai pesan WhatsApp terformat.
 * fields: [{ id, label, type, required, options, hint, full }]
 */
export default function LeadForm({ title, fields, submitLabel = 'Kirim via WhatsApp', intro }) {
  const [values, setValues] = useState(() => Object.fromEntries(fields.map((f) => [f.id, ''])))
  const [errors, setErrors] = useState({})
  const [sentUrl, setSentUrl] = useState('')

  const validate = () => {
    const e = {}
    fields.forEach((f) => {
      const v = String(values[f.id] ?? '').trim()
      if (f.required && !v) e[f.id] = `${f.label} wajib diisi.`
      else if (v && f.type === 'tel' && !isValidIndoPhone(v)) e[f.id] = 'Format nomor belum benar. Contoh: 0812 3456 7890.'
      else if (v && f.type === 'email' && !/^\S+@\S+\.\S+$/.test(v)) e[f.id] = 'Format email belum benar.'
      else if (v && f.type === 'number' && Number(v) < 0) e[f.id] = 'Angka tidak valid.'
    })
    return e
  }

  const onSubmit = (ev) => {
    ev.preventDefault()
    const e = validate()
    setErrors(e)
    if (Object.keys(e).length) {
      const first = fields.find((f) => e[f.id])
      document.getElementById(`lf-${first.id}`)?.focus()
      return
    }
    const lines = fields
      .filter((f) => String(values[f.id]).trim())
      .map((f) => `*${f.label}:* ${f.type === 'tel' ? normalizePhone(values[f.id]) : String(values[f.id]).trim()}`)
    const url = waLink([intro, '', ...lines].join('\n'))
    window.open(url, '_blank', 'noopener')
    setSentUrl(url)
  }

  if (sentUrl) {
    return (
      <div className="card flex flex-col items-center p-8 text-center" role="status">
        <CheckCircle2 className="size-12 text-eco" aria-hidden="true" />
        <h3 className="mt-3 text-xl">Pengajuan siap dikirim!</h3>
        <p className="mt-1 max-w-sm text-ink-soft">WhatsApp sudah dibuka dengan pesan terformat. Tekan kirim di WhatsApp, tim kami akan membalas.</p>
        <div className="mt-5 flex flex-col gap-2 sm:flex-row">
          <a href={sentUrl} target="_blank" rel="noreferrer" className="btn-primary">Buka WhatsApp lagi</a>
          <button type="button" className="btn-outline" onClick={() => setSentUrl('')}>Ubah data</button>
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={onSubmit} noValidate className="card p-5 sm:p-6">
      {title && <h3 className="mb-5 text-xl">{title}</h3>}
      <div className="grid gap-5 sm:grid-cols-2">
        {fields.map((f) => {
          const id = `lf-${f.id}`
          const common = {
            id,
            name: f.id,
            value: values[f.id],
            onChange: (e) => {
              setValues((v) => ({ ...v, [f.id]: e.target.value }))
              setErrors((er) => ({ ...er, [f.id]: undefined }))
            },
            className: 'field',
            'aria-invalid': errors[f.id] ? true : undefined,
            'aria-describedby': errors[f.id] ? `${id}-error` : f.hint ? `${id}-hint` : undefined,
          }
          return (
            <div key={f.id} className={f.full || f.type === 'textarea' ? 'sm:col-span-2' : ''}>
              <label htmlFor={id} className="field-label">
                {f.label} {!f.required && <span className="font-normal text-ink-soft">(opsional)</span>}
              </label>
              {f.type === 'textarea' ? (
                <textarea rows={3} {...common} />
              ) : f.type === 'select' ? (
                <select {...common}>
                  <option value="">Pilih…</option>
                  {f.options.map((o) => <option key={o}>{o}</option>)}
                </select>
              ) : (
                <input
                  type={f.type || 'text'}
                  inputMode={f.type === 'tel' ? 'tel' : f.type === 'number' ? 'numeric' : undefined}
                  min={f.type === 'number' ? 0 : undefined}
                  autoComplete={f.autoComplete}
                  placeholder={f.placeholder}
                  {...common}
                />
              )}
              {f.hint && !errors[f.id] && <p id={`${id}-hint`} className="field-hint">{f.hint}</p>}
              {errors[f.id] && <p id={`${id}-error`} className="field-error">{errors[f.id]}</p>}
            </div>
          )
        })}
      </div>
      <button type="submit" className="btn-primary mt-6 w-full sm:w-auto">
        <Send className="size-5" aria-hidden="true" /> {submitLabel}
      </button>
      <p className="mt-3 text-xs text-ink-soft">Data dikirim lewat WhatsApp, tidak disimpan di situs ini.</p>
    </form>
  )
}
