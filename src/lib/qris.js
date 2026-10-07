/**
 * Mengubah QRIS statis menjadi QRIS dengan nominal (tag 54) di sisi klien.
 * Format QRIS = EMVCo TLV: [ID 2 digit][panjang 2 digit][nilai], diakhiri CRC (tag 63).
 */

function crc16(str) {
  let crc = 0xffff
  for (let i = 0; i < str.length; i++) {
    crc ^= str.charCodeAt(i) << 8
    for (let j = 0; j < 8; j++) crc = crc & 0x8000 ? (crc << 1) ^ 0x1021 : crc << 1
  }
  return (crc & 0xffff).toString(16).toUpperCase().padStart(4, '0')
}

function parseTLV(payload) {
  const out = []
  let i = 0
  while (i < payload.length) {
    const id = payload.slice(i, i + 2)
    const len = Number(payload.slice(i + 2, i + 4))
    if (Number.isNaN(len)) throw new Error('QRIS tidak valid')
    out.push([id, payload.slice(i + 4, i + 4 + len)])
    i += 4 + len
  }
  return out
}

const tlv = (id, value) => `${id}${String(value.length).padStart(2, '0')}${value}`

export function isValidQris(payload) {
  if (!payload || payload.length < 30 || !payload.startsWith('000201')) return false
  const body = payload.slice(0, -4)
  return crc16(body) === payload.slice(-4).toUpperCase()
}

/** Kembalikan payload QRIS dinamis dengan nominal (rupiah, bilangan bulat). */
export function withAmount(payload, amount) {
  const fields = parseTLV(payload.trim()).filter(([id]) => id !== '63' && id !== '54')
  const rebuilt = []
  for (const [id, val] of fields) {
    if (id === '01') {
      rebuilt.push(tlv('01', '12')) // 12 = dinamis (sekali pakai dengan nominal)
      continue
    }
    if (id === '58') rebuilt.push(tlv('54', String(Math.round(amount))))
    rebuilt.push(tlv(id, val))
  }
  const body = rebuilt.join('') + '6304'
  return body + crc16(body)
}
