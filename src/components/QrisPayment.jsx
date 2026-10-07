import { useEffect, useState } from 'react'
import { Check, Copy, Download, QrCode, Smartphone } from 'lucide-react'
import { payment } from '../data/config'
import { rupiah } from '../lib/utils'
import { isValidQris, withAmount } from '../lib/qris'

/**
 * Kartu pembayaran QRIS.
 * - payment.qrisPayload valid → QR dibuat dengan nominal otomatis.
 * - selain itu → gambar QRIS statis (pelanggan ketik nominal sendiri).
 * - gambar belum ada → placeholder.
 */
export default function QrisPayment({ amount, orderId }) {
  const dynamic = isValidQris(payment.qrisPayload)
  const [qrSrc, setQrSrc] = useState(dynamic ? '' : payment.qrisImage)
  const [failed, setFailed] = useState(false)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (!dynamic) return
    let alive = true
    import('qrcode')
      .then(({ default: QR }) =>
        QR.toDataURL(withAmount(payment.qrisPayload, amount), { width: 640, margin: 2, errorCorrectionLevel: 'M' }),
      )
      .then((url) => alive && setQrSrc(url))
      .catch(() => alive && setFailed(true))
    return () => {
      alive = false
    }
  }, [dynamic, amount])

  const copyAmount = async () => {
    try {
      await navigator.clipboard.writeText(String(Math.round(amount)))
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch {
      /* clipboard tidak tersedia */
    }
  }

  const fileName = `QRIS-Encore-${orderId || 'pesanan'}.png`

  return (
    <section aria-labelledby="qris-title" className="card overflow-hidden">
      <div className="flex items-center gap-2 bg-product px-4 py-3 text-white sm:px-5">
        <QrCode className="size-5 text-primary" aria-hidden="true" />
        <h3 id="qris-title" className="text-base text-white">Bayar dengan QRIS</h3>
      </div>

      <div className="grid gap-5 p-4 sm:grid-cols-[220px_1fr] sm:p-5">
        {/* QR */}
        <div className="mx-auto w-full max-w-[240px]">
          <div className="rounded-2xl border border-stone-200 bg-white p-3">
            {qrSrc && !failed ? (
              <img
                src={qrSrc}
                alt={`QRIS ${payment.merchantName}${dynamic ? `, nominal ${rupiah(amount)}` : ''}`}
                onError={() => setFailed(true)}
                className="aspect-square w-full object-contain [image-rendering:pixelated]"
              />
            ) : (
              <div className="grid aspect-square w-full place-items-center rounded-xl border-2 border-dashed border-primary/60 bg-cream p-3 text-center text-xs font-bold text-primary-dark">
                {failed || !dynamic ? 'QRIS Encore (placeholder)' : 'Membuat QR…'}
              </div>
            )}
            <p className="mt-2 text-center text-xs font-bold tracking-wide">{payment.merchantName}</p>
            <p className="text-center text-[11px] text-ink-soft">NMID: {payment.nmid}</p>
          </div>
          {qrSrc && !failed && (
            <a href={qrSrc} download={fileName} className="btn-outline mt-3 w-full !min-h-11 text-sm">
              <Download className="size-4" aria-hidden="true" /> Simpan gambar QRIS
            </a>
          )}
        </div>

        {/* Nominal & langkah */}
        <div>
          <p className="text-sm text-ink-soft">Total bayar</p>
          <div className="flex flex-wrap items-center gap-2">
            <p className="text-3xl font-extrabold tabular-nums">{rupiah(amount)}</p>
            <button type="button" onClick={copyAmount} className="btn-ghost !min-h-10 !px-2.5 text-sm" aria-label="Salin nominal">
              {copied ? <Check className="size-4 text-eco" aria-hidden="true" /> : <Copy className="size-4" aria-hidden="true" />}
              {copied ? 'Tersalin' : 'Salin'}
            </button>
          </div>
          <p className="mt-1 text-xs text-ink-soft">
            {dynamic ? 'Nominal sudah otomatis terisi saat QR di-scan.' : 'Masukkan nominal ini saat membayar.'} Ref: {orderId}
          </p>

          <ol className="mt-4 space-y-2.5 text-sm">
            <li className="flex gap-2.5">
              <span className="grid size-6 shrink-0 place-items-center rounded-full bg-primary-light text-xs font-bold text-primary-dark">1</span>
              <span>Buka e-wallet atau m-banking apa pun yang mendukung QRIS, lalu pilih <strong>Scan / Bayar</strong>.</span>
            </li>
            <li className="flex gap-2.5">
              <span className="grid size-6 shrink-0 place-items-center rounded-full bg-primary-light text-xs font-bold text-primary-dark">2</span>
              <span>
                Scan kode QRIS ini.{' '}
                <span className="inline-flex items-center gap-1 font-semibold">
                  <Smartphone className="size-3.5" aria-hidden="true" /> Pesan dari HP ini?
                </span>{' '}
                Tekan <strong>Simpan gambar QRIS</strong>, lalu pilih “unggah dari galeri” di aplikasi pembayaranmu.
              </span>
            </li>
            <li className="flex gap-2.5">
              <span className="grid size-6 shrink-0 place-items-center rounded-full bg-primary-light text-xs font-bold text-primary-dark">3</span>
              <span>Pastikan nama merchant <strong>{payment.merchantName}</strong> dan nominal sesuai, lalu bayar.</span>
            </li>
            <li className="flex gap-2.5">
              <span className="grid size-6 shrink-0 place-items-center rounded-full bg-primary-light text-xs font-bold text-primary-dark">4</span>
              <span>Kirim pesanan via WhatsApp di bawah dan <strong>lampirkan screenshot bukti bayar</strong>.</span>
            </li>
          </ol>
        </div>
      </div>
    </section>
  )
}
