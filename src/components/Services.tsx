import type { PointerEvent as ReactPointerEvent } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { useLang } from '../i18n/LanguageContext'
import { NeonStickers } from './NeonStickers'
import { Dimension } from './Dimension'

const spotlight = (e: ReactPointerEvent<HTMLElement>) => {
  const r = e.currentTarget.getBoundingClientRect()
  e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`)
  e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`)
}

const num = (i: number) => String(i + 1).padStart(2, '0')

export function Services() {
  const { t } = useLang()
  const reduce = useReducedMotion()
  const reveal = (i: number) => ({
    initial: reduce ? false : { opacity: 0, y: 18 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '0px 0px -10% 0px' },
    transition: { duration: 0.7, delay: i * 0.08, ease: [0.2, 0.7, 0.2, 1] as const },
  })

  return (
    <section id="services" aria-label={t.services.heading} className="relative">
      {/* waves, then nothing (the projects), then neon stickers, then nothing again, then waves at the end */}
      <NeonStickers
        className="absolute inset-x-0 top-[-6rem] h-[calc(100%+9rem)] w-full"
        style={{
          WebkitMaskImage: 'linear-gradient(180deg,transparent 0,#000 18%,#000 82%,transparent 100%)',
          maskImage: 'linear-gradient(180deg,transparent 0,#000 18%,#000 82%,transparent 100%)',
        }}
      />
      <div className="relative mx-auto max-w-[1240px] px-6 pb-24 md:px-12 md:pb-36">
      <Dimension as="h2" label={t.services.heading} />
      <ul className="mt-14 grid gap-4 sm:grid-cols-2 md:mt-20 lg:grid-cols-4">
        {t.services.items.map((it, i) => (
          <motion.li
            key={it.title}
            {...reveal(i)}
            onPointerMove={spotlight}
            className="spot group flex flex-col rounded-2xl border border-rule bg-sheet p-6 transition-colors duration-300 hover:border-accent/60 md:p-7"
          >
            <span className="font-display text-[0.9rem] font-medium tabular-nums text-accent">{num(i)}</span>
            <h3 className="mt-10 text-[1.45rem] font-semibold leading-tight tracking-[-0.02em]">{it.title}</h3>
            <p className="mt-3 text-[1.02rem] leading-relaxed text-body">{it.text}</p>
          </motion.li>
        ))}
      </ul>

      <Dimension as="h2" label={t.process.heading} className="mt-24 md:mt-32" />
      <ol className="mt-12 grid gap-10 sm:grid-cols-2 md:mt-16 lg:grid-cols-4 lg:gap-8">
        {t.process.steps.map((s, i) => (
          <motion.li key={s.title} {...reveal(i)} className="relative border-t border-pencil pt-6">
            <span aria-hidden="true" className="absolute -top-[5px] left-0 h-[9px] w-px bg-pencil" />
            <span className="font-display text-[0.9rem] font-medium tabular-nums text-accent">{num(i)}</span>
            <h3 className="mt-3 text-[1.3rem] font-semibold tracking-[-0.02em]">{s.title}</h3>
            <p className="mt-2.5 max-w-[34ch] text-[1.02rem] leading-relaxed text-body">{s.text}</p>
          </motion.li>
        ))}
      </ol>
      </div>
    </section>
  )
}
