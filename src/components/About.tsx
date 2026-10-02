import { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { useLang } from '../i18n/LanguageContext'
import { Dimension } from './Dimension'

export function About() {
  const { t } = useLang()
  const reduce = useReducedMotion()
  const [lead, ...rest] = t.about.body

  return (
    <section id="about" aria-label={t.about.heading} className="mx-auto max-w-[1240px] px-6 pb-24 md:px-12 md:pb-36">
      <Dimension as="h2" label={t.about.heading} />
      <div className="mt-14 grid gap-14 md:mt-20 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <p className="text-pretty font-body text-[clamp(1.5rem,2.5vw,2.15rem)] leading-[1.3] text-ink">{lead}</p>
          <div className="mt-8 max-w-[60ch] space-y-5 text-[1.15rem]">
            {rest.map((p) => (
              <p key={p} className="text-pretty">
                {p}
              </p>
            ))}
          </div>
          <Signature text={t.about.signature} reduce={!!reduce} />
        </div>

        <dl className="divide-y divide-rule border-y border-rule lg:col-span-4 lg:col-start-9 lg:self-start">
          {t.about.groups.map((g) => (
            <div key={g.label} className="py-5">
              <dt className="font-display text-[0.95rem] font-semibold text-ink">{g.label}</dt>
              <dd className="mt-1.5 text-body">{g.items}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}

/**
 * A quick, slightly careless signature: it is dashed across left to right,
 * then underlined with two fast strokes. Hover to sign it again.
 */
function Signature({ text, reduce }: { text: string; reduce: boolean }) {
  const [run, setRun] = useState(0)
  const [busy, setBusy] = useState(true)
  const replay = () => {
    if (busy || reduce) return
    setBusy(true)
    setRun((n) => n + 1)
  }
  const stroke = (delay: number, duration: number) => ({
    initial: reduce ? false : { pathLength: 0, opacity: 0 },
    whileInView: { pathLength: 1, opacity: 1 },
    viewport: { once: true, margin: '0px 0px -15% 0px' },
    transition: { duration, delay, ease: [0.2, 0.8, 0.2, 1] as const },
  })

  return (
    <div
      aria-hidden="true"
      className="relative mt-12 inline-block -rotate-[5deg] cursor-default select-none"
      onPointerEnter={replay}
    >
      <motion.p
        key={run}
        className="font-signature text-[clamp(3.2rem,7vw,4.6rem)] leading-[1.15] text-accent"
        initial={reduce ? false : { clipPath: 'inset(-50% 102% -70% -12%)', x: -10 }}
        whileInView={{ clipPath: 'inset(-50% -22% -70% -12%)', x: 0 }}
        viewport={{ once: true, margin: '0px 0px -15% 0px' }}
        transition={{ duration: 0.62, ease: [0.7, 0, 0.2, 1] }}
        onAnimationComplete={() => window.setTimeout(() => setBusy(false), 500)}
      >
        {text}
      </motion.p>
      <svg
        key={`s${run}`}
        viewBox="0 0 220 30"
        preserveAspectRatio="none"
        className="pointer-events-none absolute -bottom-1 left-[-4%] h-[0.55em] w-[112%] overflow-visible text-accent"
        style={{ fontSize: 'clamp(3.2rem,7vw,4.6rem)' }}
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
      >
        <motion.path d="M4 20 C 50 11, 130 6, 214 3" strokeWidth="3" vectorEffect="non-scaling-stroke" {...stroke(0.55, 0.32)} />
        <motion.path d="M46 27 C 90 21, 140 19, 176 17" strokeWidth="2" vectorEffect="non-scaling-stroke" {...stroke(0.74, 0.26)} />
      </svg>
    </div>
  )
}
