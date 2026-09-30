import type { ReactNode } from 'react'
import type { Lang } from '../i18n/copy'
import type { Project, ProjectId } from '../data/projects'

/**
 * Hand-built key art for each project, drawn as SVG on a 300x400 canvas.
 * Everything that must read on a small TV (motif, title, tagline) sits in the
 * middle band y=87..312; genre and billing block live outside it.
 */

type Theme = {
  bg: ReactNode
  ink: string
  accent: string
  motif: ReactNode
}

const W = 300
const H = 400

function nexusrisk(): Theme {
  const pts: [number, number][] = [
    [34, 112], [62, 104], [88, 124], [116, 98], [142, 132], [170, 120], [196, 168], [220, 150], [246, 206], [268, 196],
  ]
  const line = pts.map(([x, y]) => `${x},${y}`).join(' ')
  const area = `M${pts[0][0]},${pts[0][1]} ` + pts.slice(1).map(([x, y]) => `L${x},${y}`).join(' ') + ` L268,228 L34,228 Z`
  const net: [number, number, number, number][] = [
    [62, 104, 116, 98], [116, 98, 170, 120], [88, 124, 142, 132], [142, 132, 196, 168], [170, 120, 220, 150], [196, 168, 246, 206], [116, 98, 142, 132], [220, 150, 268, 196],
  ]
  return {
    ink: '#ffe9e0',
    accent: '#ff5a4d',
    bg: (
      <>
        <defs>
          <linearGradient id="nx-bg" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#2c060b" />
            <stop offset="1" stopColor="#090203" />
          </linearGradient>
          <radialGradient id="nx-glow" cx="0.5" cy="0.36" r="0.55">
            <stop offset="0" stopColor="#d1202f" stopOpacity="0.45" />
            <stop offset="1" stopColor="#d1202f" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="nx-area" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#ff5a4d" stopOpacity="0.45" />
            <stop offset="1" stopColor="#ff5a4d" stopOpacity="0" />
          </linearGradient>
        </defs>
        <rect width={W} height={H} fill="url(#nx-bg)" />
        <rect width={W} height={H} fill="url(#nx-glow)" />
      </>
    ),
    motif: (
      <g>
        {[100, 132, 164, 196].map((y) => (
          <line key={y} x1="30" x2="270" y1={y} y2={y} stroke="#ffe9e0" strokeOpacity="0.08" />
        ))}
        {net.map(([a, b, c, d], i) => (
          <line key={i} x1={a} y1={b} x2={c} y2={d} stroke="#ffe9e0" strokeOpacity="0.16" strokeWidth="0.8" />
        ))}
        <path d={area} fill="url(#nx-area)" />
        <polyline points={line} fill="none" stroke="#ff5a4d" strokeWidth="2.4" strokeLinejoin="round" strokeLinecap="round" />
        {pts.map(([x, y], i) => (
          <g key={i}>
            <circle cx={x} cy={y} r="5.5" fill="#ff5a4d" fillOpacity="0.18" />
            <circle cx={x} cy={y} r="2.4" fill="#ffe9e0" />
          </g>
        ))}
        <line x1="30" x2="270" y1="182" y2="182" stroke="#ffe9e0" strokeOpacity="0.55" strokeDasharray="3 4" />
        <text x="32" y="177" fontFamily="'Courier Prime', monospace" fontSize="7.5" fill="#ffe9e0" fillOpacity="0.8">VaR 95%</text>
        <line x1="196" x2="196" y1="92" y2="228" stroke="#ffe9e0" strokeOpacity="0.3" strokeDasharray="2 3" />
      </g>
    ),
  }
}

function countit(): Theme {
  const cx = 150
  const cy = 156
  const rings = [
    { r: 64, p: 0.72, c: '#ffb347' },
    { r: 48, p: 0.56, c: '#ff7a59' },
    { r: 32, p: 0.4, c: '#9be564' },
  ]
  return {
    ink: '#e7f7ee',
    accent: '#ffb347',
    bg: (
      <>
        <defs>
          <linearGradient id="ct-bg" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#0f3733" />
            <stop offset="1" stopColor="#051615" />
          </linearGradient>
          <radialGradient id="ct-glow" cx="0.5" cy="0.4" r="0.5">
            <stop offset="0" stopColor="#2bb5a0" stopOpacity="0.32" />
            <stop offset="1" stopColor="#2bb5a0" stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width={W} height={H} fill="url(#ct-bg)" />
        <rect width={W} height={H} fill="url(#ct-glow)" />
      </>
    ),
    motif: (
      <g>
        {rings.map(({ r, p, c }) => {
          const C = 2 * Math.PI * r
          return (
            <g key={r} transform={`rotate(-90 ${cx} ${cy})`}>
              <circle cx={cx} cy={cy} r={r} fill="none" stroke="#e7f7ee" strokeOpacity="0.1" strokeWidth="11" />
              <circle cx={cx} cy={cy} r={r} fill="none" stroke={c} strokeWidth="11" strokeLinecap="round" strokeDasharray={`${C * p} ${C}`} />
            </g>
          )
        })}
        <text x={cx} y={cy + 4} textAnchor="middle" fontFamily="'Bodoni Moda', serif" fontWeight="700" fontSize="17" fill="#e7f7ee">2150</text>
        <text x={cx} y={cy + 15} textAnchor="middle" fontFamily="'Courier Prime', monospace" fontSize="6.5" fill="#e7f7ee" fillOpacity="0.7">kcal</text>
      </g>
    ),
  }
}

function gymgallery(): Theme {
  return {
    ink: '#2b1b10',
    accent: '#7a1226',
    bg: (
      <>
        <defs>
          <linearGradient id="gg-bg" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#dccfb4" />
            <stop offset="1" stopColor="#b7a683" />
          </linearGradient>
          <radialGradient id="gg-vig" cx="0.5" cy="0.45" r="0.75">
            <stop offset="0.55" stopColor="#000" stopOpacity="0" />
            <stop offset="1" stopColor="#3a2410" stopOpacity="0.45" />
          </radialGradient>
          <linearGradient id="gg-marble" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#fbf8f1" />
            <stop offset="0.6" stopColor="#e4ddcd" />
            <stop offset="1" stopColor="#c9bfa9" />
          </linearGradient>
          <clipPath id="gg-bust">
            <ellipse cx="150" cy="114" rx="19" ry="24" />
            <path d="M142 130 H158 L160 166 H140 Z" />
            <path d="M84 228 C88 198 114 178 141 166 H159 C186 178 212 198 216 228 Z" />
          </clipPath>
        </defs>
        <rect width={W} height={H} fill="url(#gg-bg)" />
        <rect width={W} height={H} fill="url(#gg-vig)" />
      </>
    ),
    motif: (
      <g>
        {/* niche */}
        <path d="M80 228 V128 A70 70 0 0 1 220 128 V228 Z" fill="#2b1b10" />
        <path d="M88 228 V128 A62 62 0 0 1 212 128 V228 Z" fill="none" stroke="#d1ad66" strokeOpacity="0.55" strokeWidth="1" />
        {/* bust: sketch | marble | oil paint */}
        <g clipPath="url(#gg-bust)">
          <rect x="84" y="86" width="132" height="145" fill="url(#gg-marble)" />
          <g clipPath="url(#gg-sketch)">
            <rect x="90" y="86" width="44" height="145" fill="#efe6d3" />
            {Array.from({ length: 26 }).map((_, i) => (
              <line key={i} x1={84 + i * 4} y1="230" x2={114 + i * 4} y2="86" stroke="#2b1b10" strokeOpacity="0.55" strokeWidth="0.7" />
            ))}
          </g>
          <g clipPath="url(#gg-paint)">
            <rect x="166" y="86" width="44" height="145" fill="#e9d9b6" />
            <path d="M166 120 C178 112 196 126 210 116 V136 C196 146 180 132 166 140Z" fill="#7a1226" />
            <path d="M166 150 C182 144 196 158 210 150 V170 C196 178 180 166 166 172Z" fill="#c9922e" />
            <path d="M166 182 C178 176 196 190 210 182 V204 C196 210 180 200 166 206Z" fill="#2f5d8a" />
            <path d="M166 100 C180 96 196 104 210 98 V114 C196 122 180 112 166 116Z" fill="#b34a2a" />
          </g>
        </g>
        <defs>
          <clipPath id="gg-sketch"><rect x="90" y="86" width="42" height="145" /></clipPath>
          <clipPath id="gg-paint"><rect x="168" y="86" width="42" height="145" /></clipPath>
        </defs>
      </g>
    ),
  }
}

function peppin(): Theme {
  const cx = 150
  const cy = 128
  const R = 34
  const hex = Array.from({ length: 6 }).map((_, i) => {
    const a = (Math.PI / 3) * i - Math.PI / 2
    return [cx + R * Math.cos(a), cy + R * Math.sin(a)] as [number, number]
  })
  const out = hex.map(([x, y], i) => {
    const a = (Math.PI / 3) * i - Math.PI / 2
    return [x + 15 * Math.cos(a), y + 15 * Math.sin(a)] as [number, number]
  })
  const hexPath = hex.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(' ')
  return {
    ink: '#e9e6ff',
    accent: '#7ee0f5',
    bg: (
      <>
        <defs>
          <linearGradient id="pp-bg" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#1a1650" />
            <stop offset="1" stopColor="#080720" />
          </linearGradient>
          <radialGradient id="pp-glow" cx="0.5" cy="0.34" r="0.5">
            <stop offset="0" stopColor="#7a6cff" stopOpacity="0.4" />
            <stop offset="1" stopColor="#7a6cff" stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width={W} height={H} fill="url(#pp-bg)" />
        <rect width={W} height={H} fill="url(#pp-glow)" />
      </>
    ),
    motif: (
      <g>
        <polygon points={hexPath} fill="none" stroke="#7ee0f5" strokeWidth="2" strokeLinejoin="round" />
        <polygon
          points={hex.map(([x, y]) => `${(cx + (x - cx) * 0.68).toFixed(1)},${(cy + (y - cy) * 0.68).toFixed(1)}`).join(' ')}
          fill="none"
          stroke="#9b8cff"
          strokeOpacity="0.8"
          strokeWidth="1.2"
        />
        {hex.map(([x, y], i) => (
          <g key={i}>
            <line x1={x} y1={y} x2={out[i][0]} y2={out[i][1]} stroke="#e9e6ff" strokeOpacity="0.55" strokeWidth="1.3" />
            <circle cx={x} cy={y} r="3.2" fill="#7ee0f5" />
            <circle cx={out[i][0]} cy={out[i][1]} r={i % 2 ? 3 : 4.2} fill="none" stroke="#9b8cff" strokeWidth="1.3" />
          </g>
        ))}
        {/* half-life decay */}
        <path d="M40 184 C 84 184, 100 204, 140 211 S 222 221, 262 222" fill="none" stroke="#7ee0f5" strokeWidth="1.8" />
        {[[40, 184], [108, 203], [176, 216], [244, 221]].map(([x, y]) => (
          <g key={x}>
            <line x1={x} y1={y} x2={x} y2="226" stroke="#e9e6ff" strokeOpacity="0.3" strokeDasharray="2 3" />
            <circle cx={x} cy={y} r="2.6" fill="#e9e6ff" />
          </g>
        ))}
        <text x="42" y="178" fontFamily="'Courier Prime', monospace" fontSize="7" fill="#e9e6ff" fillOpacity="0.75">t½</text>
      </g>
    ),
  }
}

const builders: Record<ProjectId, () => Theme> = { nexusrisk, countit, gymgallery, peppin }

export function PosterArt({
  project,
  lang,
  credits = true,
  className,
}: {
  project: Project
  lang: Lang
  /** full poster: genre line, tagline and billing block (TV version shows title and art only) */
  credits?: boolean
  className?: string
}) {
  const theme = builders[project.id]()
  const lines = project.posterTitle
  const two = lines.length > 1
  const size = two ? 30 : project.posterTitle[0].length > 8 ? 37 : 46
  const titleY = two ? 240 : 262
  const taglineY = two ? 298 : 288
  const billingInk = theme.ink
  const directed = lang === 'pl' ? 'Produkcja Maksymilian Kościelniak' : 'A Maksymilian Kościelniak production'
  const starring = (lang === 'pl' ? 'W rolach głównych: ' : 'Starring ') + project.stack.join(', ')

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="xMidYMid slice"
      className={className}
      role="img"
      aria-label={`${project.title}: ${project.tagline[lang]}`}
    >
      {theme.bg}
      {theme.motif}
      <rect x="9" y="9" width={W - 18} height={H - 18} fill="none" stroke={theme.ink} strokeOpacity="0.28" />

      {credits && (
        <text x={W / 2} y="40" textAnchor="middle" fontFamily="'Newsreader', serif" fontStyle="italic" fontSize="12" fill={theme.ink} fillOpacity="0.85">
          {project.genre[lang]}
        </text>
      )}

      {lines.map((line, i) => (
        <text
          key={line}
          x={W / 2}
          y={titleY + i * (size + 2)}
          textAnchor="middle"
          fontFamily="'Bodoni Moda', serif"
          fontWeight="700"
          fontSize={size}
          fill={theme.ink}
          style={{ paintOrder: 'stroke' }}
          stroke={theme.ink === '#2b1b10' ? 'none' : 'rgb(0 0 0 / 0.25)'}
          strokeWidth="3"
        >
          {line}
        </text>
      ))}
      {credits && (
        <text x={W / 2} y={taglineY} textAnchor="middle" fontFamily="'Newsreader', serif" fontStyle="italic" fontSize="11.5" fill={theme.accent}>
          {project.tagline[lang]}
        </text>
      )}

      {credits && (
        <g fontFamily="'Courier Prime', monospace" textAnchor="middle" fill={billingInk} fillOpacity="0.8">
          <line x1="70" x2="230" y1="330" y2="330" stroke={billingInk} strokeOpacity="0.3" />
          <text x={W / 2} y="348" fontSize="7.4">{starring}</text>
          <text x={W / 2} y="362" fontSize="7.4">{directed}</text>
          <text x={W / 2} y="380" fontSize="6.4" fillOpacity="0.6">maksymiliankoscielniak.com</text>
        </g>
      )}
    </svg>
  )
}
