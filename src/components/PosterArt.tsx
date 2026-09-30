import type { ReactNode } from 'react'
import type { Lang } from '../i18n/copy'
import type { Project, ProjectId } from '../data/projects'

/**
 * Key art for each project, drawn as SVG on a 300x400 canvas. Each poster
 * borrows the look of the real site: NexusRisk is navy and cyan, countIT
 * charcoal and violet, GymGallery parchment and ink, Peppin pale lab blue.
 */

type Theme = {
  bg: ReactNode
  ink: string
  accent: string
  /** dark posters get a soft shadow behind the title for legibility */
  shadow: boolean
  motif: ReactNode
}

const W = 300
const H = 400
const MONO = "'Courier Prime', monospace"
const SERIF = "'Newsreader', serif"
const DISPLAY = "'Bodoni Moda', serif"

function nexusrisk(): Theme {
  const pts: [number, number][] = [
    [34, 112], [62, 104], [88, 124], [116, 98], [142, 132], [170, 120], [196, 168], [220, 150], [246, 206], [268, 196],
  ]
  const line = pts.map(([x, y]) => `${x},${y}`).join(' ')
  const area = `M${pts[0][0]},${pts[0][1]} ` + pts.slice(1).map(([x, y]) => `L${x},${y}`).join(' ') + ' L268,228 L34,228 Z'
  const net: [number, number, number, number][] = [
    [62, 104, 116, 98], [116, 98, 170, 120], [88, 124, 142, 132], [142, 132, 196, 168], [170, 120, 220, 150], [196, 168, 246, 206], [116, 98, 142, 132], [220, 150, 268, 196],
  ]
  return {
    ink: '#e6f4ff',
    accent: '#22d3ee',
    shadow: true,
    bg: (
      <>
        <defs>
          <linearGradient id="nx-bg" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#0c1a3e" />
            <stop offset="1" stopColor="#040814" />
          </linearGradient>
          <radialGradient id="nx-glow" cx="0.5" cy="0.34" r="0.55">
            <stop offset="0" stopColor="#2458ff" stopOpacity="0.4" />
            <stop offset="1" stopColor="#2458ff" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="nx-area" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#22d3ee" stopOpacity="0.4" />
            <stop offset="1" stopColor="#22d3ee" stopOpacity="0" />
          </linearGradient>
          <pattern id="nx-dots" width="14" height="14" patternUnits="userSpaceOnUse">
            <circle cx="1.5" cy="1.5" r="0.8" fill="#6fb8ff" fillOpacity="0.28" />
          </pattern>
        </defs>
        <rect width={W} height={H} fill="url(#nx-bg)" />
        <rect width={W} height={H} fill="url(#nx-glow)" />
        <rect width={W} height={H} fill="url(#nx-dots)" />
      </>
    ),
    motif: (
      <g>
        {net.map(([a, b, c, d], i) => (
          <line key={i} x1={a} y1={b} x2={c} y2={d} stroke="#e6f4ff" strokeOpacity="0.18" strokeWidth="0.8" />
        ))}
        <path d={area} fill="url(#nx-area)" />
        <polyline points={line} fill="none" stroke="#22d3ee" strokeWidth="2.4" strokeLinejoin="round" strokeLinecap="round" />
        {pts.map(([x, y], i) => (
          <g key={i}>
            <circle cx={x} cy={y} r="5.5" fill="#22d3ee" fillOpacity="0.18" />
            <circle cx={x} cy={y} r="2.4" fill="#e6f4ff" />
          </g>
        ))}
        <line x1="30" x2="270" y1="182" y2="182" stroke="#fb7185" strokeOpacity="0.8" strokeDasharray="3 4" />
        <text x="32" y="177" fontFamily={MONO} fontSize="7.5" fill="#fb7185">VaR 95%</text>
        <line x1="196" x2="196" y1="92" y2="228" stroke="#e6f4ff" strokeOpacity="0.25" strokeDasharray="2 3" />
      </g>
    ),
  }
}

function countit(): Theme {
  const rows: [string, string, number][] = [
    ['Calories', '1840 / 2672', 0.69],
    ['Protein', '112 / 150', 0.75],
    ['Carbs', '190 / 349', 0.54],
    ['Fats', '48 / 75', 0.64],
    ['Fiber', '21 / 37', 0.57],
  ]
  return {
    ink: '#f4f0ff',
    accent: '#c4b5fd',
    shadow: true,
    bg: (
      <>
        <defs>
          <linearGradient id="ct-bg" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#15151c" />
            <stop offset="0.6" stopColor="#1d1830" />
            <stop offset="1" stopColor="#3a2a66" />
          </linearGradient>
          <radialGradient id="ct-glow" cx="0.5" cy="1" r="0.7">
            <stop offset="0" stopColor="#a78bfa" stopOpacity="0.4" />
            <stop offset="1" stopColor="#a78bfa" stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width={W} height={H} fill="url(#ct-bg)" />
        <rect width={W} height={H} fill="url(#ct-glow)" />
      </>
    ),
    motif: (
      <g>
        {rows.map(([label, value, p], i) => {
          const y = 98 + i * 27
          return (
            <g key={label}>
              <text x="44" y={y} fontFamily={SERIF} fontWeight="500" fontSize="9.5" fill="#f4f0ff">{label}</text>
              <text x="256" y={y} textAnchor="end" fontFamily={MONO} fontSize="8" fill="#f4f0ff" fillOpacity="0.65">{value}</text>
              <rect x="44" y={y + 5} width="212" height="6" rx="3" fill="#f4f0ff" fillOpacity="0.12" />
              <rect x="44" y={y + 5} width={212 * p} height="6" rx="3" fill={i % 2 ? '#a78bfa' : '#c4b5fd'} />
            </g>
          )
        })}
      </g>
    ),
  }
}

function gymgallery(): Theme {
  return {
    ink: '#2b1b10',
    accent: '#9a3324',
    shadow: false,
    bg: (
      <>
        <defs>
          <linearGradient id="gg-bg" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#e7dcc0" />
            <stop offset="1" stopColor="#c4b48f" />
          </linearGradient>
          <radialGradient id="gg-vig" cx="0.5" cy="0.45" r="0.75">
            <stop offset="0.55" stopColor="#000" stopOpacity="0" />
            <stop offset="1" stopColor="#3a2410" stopOpacity="0.4" />
          </radialGradient>
        </defs>
        <rect width={W} height={H} fill="url(#gg-bg)" />
        <rect width={W} height={H} fill="url(#gg-vig)" />
      </>
    ),
    motif: (
      <g fill="none" stroke="#2b1b10">
        {/* Vitruvian frame: circle, square, crosshair */}
        <circle cx="150" cy="150" r="74" strokeOpacity="0.75" strokeWidth="0.9" />
        <rect x="92" y="92" width="116" height="116" strokeOpacity="0.55" strokeWidth="0.9" />
        <line x1="150" y1="72" x2="150" y2="230" strokeOpacity="0.25" />
        <line x1="70" y1="150" x2="230" y2="150" strokeOpacity="0.25" />
        {/* figure */}
        <circle cx="150" cy="118" r="11" strokeWidth="1.1" />
        <path d="M144 128 C144 133 140 135 130 137 C118 140 112 146 110 160 M156 128 C156 133 160 135 170 137 C182 140 188 146 190 160" strokeWidth="1.1" />
        <path d="M112 152 C104 172 102 192 104 208 M188 152 C196 172 198 192 196 208" strokeWidth="1" strokeOpacity="0.8" />
        {/* the V-taper, in red pencil */}
        <path d="M116 142 L184 142 L170 206 L130 206 Z" stroke="#9a3324" strokeWidth="1.2" />
        <text x="172" y="222" fill="#9a3324" stroke="none" fontFamily={SERIF} fontStyle="italic" fontSize="10">φ 1.618</text>
        <text x="62" y="118" fill="#2b1b10" fillOpacity="0.6" stroke="none" fontFamily={SERIF} fontStyle="italic" fontSize="8">latitudo humeri</text>
      </g>
    ),
  }
}

function peppin(): Theme {
  return {
    ink: '#0b2a3b',
    accent: '#1298b5',
    shadow: false,
    bg: (
      <>
        <defs>
          <linearGradient id="pp-bg" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#f7fbfd" />
            <stop offset="1" stopColor="#dcecf3" />
          </linearGradient>
          <pattern id="pp-grid" width="16" height="16" patternUnits="userSpaceOnUse">
            <path d="M16 0H0V16" fill="none" stroke="#9cc3d3" strokeOpacity="0.35" strokeWidth="0.6" />
          </pattern>
          <linearGradient id="pp-liquid" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#8fe3f0" />
            <stop offset="1" stopColor="#35aecf" />
          </linearGradient>
          <clipPath id="pp-body">
            <rect x="116" y="104" width="68" height="112" rx="14" />
          </clipPath>
        </defs>
        <rect width={W} height={H} fill="url(#pp-bg)" />
        <rect width={W} height={H} fill="url(#pp-grid)" />
      </>
    ),
    motif: (
      <g>
        <circle cx="150" cy="160" r="86" fill="none" stroke="#7fb3c6" strokeOpacity="0.7" strokeDasharray="2 4" />
        {/* vial */}
        <rect x="128" y="84" width="44" height="12" rx="3" fill="#c2d3de" stroke="#6f8ea3" strokeWidth="1.4" />
        <rect x="133" y="96" width="34" height="10" fill="#d5e3eb" stroke="#6f8ea3" strokeWidth="1.2" />
        <rect x="116" y="104" width="68" height="112" rx="14" fill="#eaf7fb" stroke="#6f8ea3" strokeWidth="2" />
        <g clipPath="url(#pp-body)">
          <path d="M112 152 C124 146 136 158 150 152 S176 146 188 152 V220 H112 Z" fill="url(#pp-liquid)" />
          <rect x="124" y="108" width="7" height="104" fill="#fff" fillOpacity="0.55" />
        </g>
        <rect x="126" y="160" width="48" height="32" rx="2" fill="#fff" stroke="#b7cfda" />
        <text x="150" y="184" textAnchor="middle" fontFamily={DISPLAY} fontWeight="700" fontSize="20" fill="#0b2a3b">P</text>
        {/* floating unit chips */}
        {[
          { x: 38, y: 112, t: 'mg ÷ ml' },
          { x: 206, y: 134, t: 'units' },
          { x: 46, y: 196, t: 'mcg/ml' },
        ].map((c) => (
          <g key={c.t}>
            <rect x={c.x} y={c.y} width={c.t.length * 5.6 + 14} height="17" rx="4" fill="#fff" stroke="#b7cfda" />
            <text x={c.x + 7} y={c.y + 11.5} fontFamily={MONO} fontSize="8" fill="#1298b5">{c.t}</text>
          </g>
        ))}
      </g>
    ),
  }
}

const builders: Record<ProjectId, () => Theme> = { nexusrisk, countit, gymgallery, peppin }

export function PosterArt({ project, lang, className }: { project: Project; lang: Lang; className?: string }) {
  const theme = builders[project.id]()
  const lines = project.posterTitle
  const two = lines.length > 1
  const size = two ? 30 : lines[0].length > 8 ? 37 : 46
  const titleY = two ? 264 : 274
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

      <text x={W / 2} y="40" textAnchor="middle" fontFamily={SERIF} fontStyle="italic" fontSize="12" fill={theme.ink} fillOpacity="0.85">
        {project.genre[lang]}
      </text>

      {lines.map((line, i) => (
        <text
          key={line}
          x={W / 2}
          y={titleY + i * (size + 2)}
          textAnchor="middle"
          fontFamily={DISPLAY}
          fontWeight="700"
          fontSize={size}
          fill={theme.ink}
          style={{ paintOrder: 'stroke' }}
          stroke={theme.shadow ? 'rgb(0 0 0 / 0.3)' : 'none'}
          strokeWidth="3"
        >
          {line}
        </text>
      ))}
      <text x={W / 2} y={titleY + 26} textAnchor="middle" fontFamily={SERIF} fontStyle="italic" fontSize="11.5" fill={theme.accent}>
        {project.tagline[lang]}
      </text>

      <g fontFamily={MONO} textAnchor="middle" fill={theme.ink} fillOpacity="0.8">
        <line x1="70" x2="230" y1="330" y2="330" stroke={theme.ink} strokeOpacity="0.3" />
        <text x={W / 2} y="348" fontSize="7.4">{starring}</text>
        <text x={W / 2} y="362" fontSize="7.4">{directed}</text>
        <text x={W / 2} y="380" fontSize="6.4" fillOpacity="0.6">maksymiliankoscielniak.com</text>
      </g>
    </svg>
  )
}
