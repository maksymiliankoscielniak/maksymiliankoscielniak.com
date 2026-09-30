import { motion } from 'framer-motion'
import { useLang } from '../i18n/LanguageContext'

/** After the trailer: the speaker at the lectern, lit by a single lamp. */
export function Lectern() {
  const { t } = useLang()

  return (
    <div className="relative overflow-hidden bg-black pb-28 pt-16 sm:pb-36">
      <div
        className="relative mx-auto grid max-w-5xl items-center gap-10 md:grid-cols-[minmax(0,280px)_1fr] md:gap-16"
        style={{ paddingInline: 'calc(var(--drape-w) + 1.5rem)' }}
      >
        <motion.div
          className="mx-auto w-full max-w-[240px] md:max-w-none"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-20% 0px' }}
          transition={{ duration: 1.4 }}
        >
          <LecternArt />
        </motion.div>

        <div>
          <h3 className="font-display text-4xl font-semibold text-bone sm:text-5xl">{t.about.bodyTitle}</h3>
          <div className="mt-6 space-y-5 text-[1.15rem] leading-[1.75] text-bone/90">
            {t.about.body.map((p) => (
              <p key={p} className="max-w-[58ch]">
                {p}
              </p>
            ))}
          </div>
          <dl className="mt-9 grid max-w-[58ch] gap-x-8 gap-y-4 sm:grid-cols-[auto_1fr]">
            {t.about.stack.map((g) => (
              <div key={g.label} className="contents">
                <dt className="font-display text-xl italic text-brass">{g.label}</dt>
                <dd className="text-bone sm:pt-0.5">{g.items}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  )
}

function LecternArt() {
  return (
    <svg viewBox="0 0 240 330" className="h-auto w-full" aria-hidden="true">
      <defs>
        <linearGradient id="lec-beam" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffe2aa" stopOpacity="0" />
          <stop offset="0.3" stopColor="#ffe2aa" stopOpacity="0.32" />
          <stop offset="1" stopColor="#ffe2aa" stopOpacity="0.03" />
        </linearGradient>
        <linearGradient id="lec-wood" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#2a170c" />
          <stop offset="0.5" stopColor="#4a2d18" />
          <stop offset="1" stopColor="#24130a" />
        </linearGradient>
        <linearGradient id="lec-metal" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#8d8778" />
          <stop offset="0.5" stopColor="#f2ecdc" />
          <stop offset="1" stopColor="#7b7566" />
        </linearGradient>
        <radialGradient id="lec-pool" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#ffe2aa" stopOpacity="0.35" />
          <stop offset="1" stopColor="#ffe2aa" stopOpacity="0" />
        </radialGradient>
      </defs>
      {/* beam and light pool */}
      <polygon points="108,0 132,0 232,318 8,318" fill="url(#lec-beam)" />
      <ellipse cx="120" cy="314" rx="112" ry="14" fill="url(#lec-pool)" />
      {/* lectern body */}
      <path d="M72 180 H168 L160 312 H80 Z" fill="url(#lec-wood)" />
      <path d="M80 312 H160" stroke="#d1ad66" strokeOpacity="0.5" strokeWidth="2" />
      <path d="M78 196 H162" stroke="#d1ad66" strokeOpacity="0.45" strokeWidth="1" />
      {/* slanted top */}
      <path d="M52 152 H188 L170 182 H70 Z" fill="#5a3a20" />
      <path d="M52 152 H188" stroke="#d1ad66" strokeWidth="2" />
      {/* microphone */}
      <rect x="116" y="104" width="8" height="48" fill="url(#lec-metal)" />
      <path d="M120 104 C120 82 142 86 144 70" fill="none" stroke="url(#lec-metal)" strokeWidth="5" strokeLinecap="round" />
      <rect x="135" y="42" width="18" height="34" rx="9" fill="url(#lec-metal)" transform="rotate(14 144 59)" />
      <g stroke="#3b372e" strokeOpacity="0.6" strokeWidth="1" transform="rotate(14 144 59)">
        <line x1="138" y1="50" x2="150" y2="50" />
        <line x1="138" y1="56" x2="150" y2="56" />
        <line x1="138" y1="62" x2="150" y2="62" />
        <line x1="138" y1="68" x2="150" y2="68" />
      </g>
    </svg>
  )
}
