import type { ReactNode } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowDown } from 'lucide-react'
import { useLang } from '../i18n/LanguageContext'
import { Dimension } from './Dimension'

const EASE = [0.2, 0.7, 0.2, 1] as const

/** One line of the headline, rising out of a mask. */
function Line({ children, delay }: { children: ReactNode; delay: number }) {
  const reduce = useReducedMotion()
  return (
    <span className="-my-[0.1em] block overflow-hidden py-[0.1em]">
      <motion.span
        className="block"
        initial={reduce ? false : { y: '108%' }}
        animate={{ y: 0 }}
        transition={{ duration: 1, delay, ease: EASE }}
      >
        {children}
      </motion.span>
    </span>
  )
}

export function Hero() {
  const { t } = useLang()
  const reduce = useReducedMotion()
  const fade = (delay: number) => ({
    initial: reduce ? false : { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 0.9, delay },
  })

  return (
    <section id="top" aria-label="Maksymilian Kościelniak" className="relative">
      <div aria-hidden="true" className="dot-grid absolute inset-x-0 top-0 h-[88%]" />
      <div className="relative mx-auto max-w-[1240px] px-6 pb-20 pt-32 md:px-12 md:pb-28 md:pt-44">
        {/* the dimension line below measures the name: it is exactly as wide as the longest line */}
        <div className="block md:inline-block md:max-w-full">
          <h1 className="text-[clamp(3.1rem,10.6vw,9.75rem)] font-semibold leading-[0.9] tracking-[-0.038em]">
            <Line delay={0.1}>Maksymilian</Line>
            <Line delay={0.22}>Kościelniak</Line>
          </h1>
          <Dimension className="mt-7 md:mt-9" label={t.hero.where} draw delay={0.9} />
        </div>

        <motion.div className="mt-12 grid gap-8 md:mt-16 md:grid-cols-12" {...fade(0.8)}>
          <p className="font-body text-[clamp(1.45rem,2.4vw,2rem)] italic leading-snug text-ink md:col-span-6">
            {t.hero.role}
          </p>
          <div className="md:col-span-5 md:col-start-8">
            <p className="max-w-[44ch] text-[1.2rem] text-body">{t.hero.tagline}</p>
            <div className="mt-7 flex flex-wrap items-center gap-x-7 gap-y-4">
              <a
                href="#projects"
                className="inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 font-display text-[0.98rem] font-semibold text-paper transition-colors hover:bg-accent"
              >
                {t.hero.ctaProjects}
                <ArrowDown size={17} aria-hidden="true" />
              </a>
              <a href="#contact" className="link-underline font-display text-[0.98rem] font-semibold text-ink">
                {t.hero.ctaContact}
              </a>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  )
}
