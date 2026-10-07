/** Ilustrasi sederhana Mitra Hub: kanopi panel surya + rak tukar modul baterai */
function Module({ x, y, level = 4, charging = false }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect width="64" height="44" rx="7" fill="#1F2421" />
      <rect x="0" y="0" width="64" height="44" rx="7" fill="none" stroke="#F97316" strokeWidth="2.5" />
      <rect x="22" y="-5" width="20" height="6" rx="2" fill="#2E3430" />
      {[0, 1, 2, 3].map((i) => (
        <rect
          key={i}
          x={9 + i * 12}
          y="28"
          width="9"
          height="7"
          rx="1.5"
          fill={i < level ? (charging ? '#FDBA74' : '#22C55E') : '#3A403C'}
        />
      ))}
      <path d="M34 9 27 20h6l-2 6 8-11h-6z" fill="#F97316" />
    </g>
  )
}

export default function HubIllustration({ className = '' }) {
  return (
    <svg viewBox="0 0 400 320" className={className} role="img" aria-labelledby="hub-ill-title">
      <title id="hub-ill-title">Ilustrasi Mitra Hub Encore: rak tukar baterai beratap panel surya</title>
      <defs>
        <linearGradient id="panel" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0" stopColor="#334155" />
          <stop offset="1" stopColor="#1E293B" />
        </linearGradient>
      </defs>
      {/* matahari */}
      <g>
        <circle cx="330" cy="52" r="26" fill="#FDBA74" />
        <circle cx="330" cy="52" r="18" fill="#FB923C" />
        {Array.from({ length: 8 }).map((_, i) => {
          const a = (i * Math.PI) / 4
          return (
            <line
              key={i}
              x1={330 + Math.cos(a) * 33}
              y1={52 + Math.sin(a) * 33}
              x2={330 + Math.cos(a) * 42}
              y2={52 + Math.sin(a) * 42}
              stroke="#FDBA74"
              strokeWidth="4"
              strokeLinecap="round"
            />
          )
        })}
      </g>
      {/* bayangan tanah */}
      <ellipse cx="200" cy="296" rx="170" ry="14" fill="#1C1917" opacity="0.08" />
      {/* tiang kanopi */}
      <rect x="66" y="96" width="8" height="198" rx="3" fill="#57534E" />
      <rect x="326" y="96" width="8" height="198" rx="3" fill="#57534E" />
      {/* panel surya */}
      <path d="M40 104 L360 104 L340 70 L60 70 Z" fill="url(#panel)" stroke="#F97316" strokeWidth="4" strokeLinejoin="round" />
      {[1, 2, 3, 4, 5].map((i) => (
        <line key={i} x1={60 + i * 46.6} y1="70" x2={40 + i * 53.3} y2="104" stroke="#64748B" strokeWidth="1.5" />
      ))}
      <line x1="50" y1="87" x2="350" y2="87" stroke="#64748B" strokeWidth="1.5" />
      {/* aliran energi */}
      <path d="M200 108 v18" stroke="#F97316" strokeWidth="3" strokeDasharray="4 5" strokeLinecap="round" />
      {/* rak */}
      <rect x="104" y="128" width="192" height="166" rx="14" fill="#2E3430" />
      <rect x="112" y="136" width="176" height="20" rx="6" fill="#1F2421" />
      <text x="200" y="151" textAnchor="middle" fontSize="12" fontWeight="800" fill="#F97316" fontFamily="Plus Jakarta Sans, sans-serif" letterSpacing="2">
        MITRA HUB
      </text>
      <Module x={122} y={172} level={4} />
      <Module x={214} y={172} level={4} />
      <Module x={122} y={234} level={2} charging />
      <Module x={214} y={234} level={4} />
      {/* QR */}
      <g transform="translate(300 214)">
        <rect width="36" height="44" rx="6" fill="#fff" stroke="#1F2421" strokeWidth="2" />
        <rect x="7" y="7" width="9" height="9" fill="#1F2421" />
        <rect x="20" y="7" width="9" height="9" fill="#1F2421" />
        <rect x="7" y="20" width="9" height="9" fill="#1F2421" />
        <rect x="20" y="22" width="4" height="4" fill="#1F2421" />
        <rect x="25" y="27" width="4" height="4" fill="#1F2421" />
        <text x="18" y="40" textAnchor="middle" fontSize="7" fontWeight="800" fill="#1F2421" fontFamily="sans-serif">SCAN</text>
      </g>
    </svg>
  )
}
