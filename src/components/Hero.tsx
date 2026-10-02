import { motion, useReducedMotion } from 'framer-motion'
import { ArrowDown } from 'lucide-react'
import { useLang } from '../i18n/LanguageContext'
import { Dimension } from './Dimension'
import { HeroField } from './HeroField'

const PIVOT = '50% -70vh' // the sign swings from far above, like a pendulum on its cables

/** The headline as a neon sign: it is lowered on two cables, swings, then powers on. One letter is on its way out. */
function NeonSign({ reduce }: { reduce: boolean }) {
  const cable =
    'absolute bottom-full h-[100vh] w-[2px] bg-gradient-to-b from-[#34423d] to-[#7a9288]'
  const eyelet = 'absolute -top-[7px] h-[14px] w-[14px] -translate-x-1/2 rounded-full border-2 border-[#6d8279] bg-paper'

  return (
    <motion.div
      className="relative"
      style={{ transformOrigin: PIVOT }}
      initial={reduce ? false : { y: '-70vh' }}
      animate={reduce ? undefined : { y: 0, rotate: [0, 0, 2.6, -1.9, 1.2, -0.7, 0.3, 0] }}
      transition={
        reduce
          ? undefined
          : {
              y: { duration: 1.35, ease: [0.25, 0.85, 0.3, 1] },
              rotate: { duration: 4.6, delay: 0.55, ease: 'easeInOut', times: [0, 0.12, 0.3, 0.46, 0.62, 0.78, 0.9, 1] },
            }
      }
    >
      <motion.div
        style={{ transformOrigin: PIVOT }}
        animate={reduce ? undefined : { rotate: [0.35, -0.35] }}
        transition={reduce ? undefined : { duration: 5, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut', delay: 4.5 }}
      >
        <div className="relative inline-block max-w-full">
          <span aria-hidden="true" className={`${cable} left-[9%]`}>
            <span className={`${eyelet} left-px`} />
          </span>
          <span aria-hidden="true" className={`${cable} left-[91%]`}>
            <span className={`${eyelet} left-px`} />
          </span>
          <h1
            className={`neon relative text-[clamp(3.1rem,10.6vw,9.75rem)] font-semibold leading-[0.95] tracking-[-0.02em] ${reduce ? 'neon-static' : 'neon-powerup'}`}
          >
            <span className="block">
              Mak<span className={reduce ? '' : 'neon-dead'}>s</span>ymilian
            </span>
            <span className="block">Kościelniak</span>
          </h1>
        </div>
      </motion.div>
    </motion.div>
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
    <section id="top" aria-label="Maksymilian Kościelniak" className="relative min-h-[100svh] overflow-hidden">
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(60%_50%_at_82%_8%,rgb(111_240_192/0.13),transparent_70%)]"
      />
      <HeroField className="absolute inset-0 h-full w-full" />
      <div className="relative mx-auto max-w-[1240px] px-6 pb-20 pt-32 md:px-12 md:pb-28 md:pt-44">
        {/* the dimension line below measures the name: it is exactly as wide as the longest line */}
        <div className="block md:inline-block md:max-w-full">
          <NeonSign reduce={!!reduce} />
          <Dimension className="mt-7 md:mt-9" label={t.hero.where} draw delay={reduce ? 0 : 2.3} />
        </div>

        <motion.div className="mt-12 grid gap-8 md:mt-16 md:grid-cols-12" {...fade(reduce ? 0 : 2.0)}>
          <p className="font-body text-[clamp(1.45rem,2.4vw,2rem)] italic leading-snug text-ink md:col-span-6">
            {t.hero.role}
          </p>
          <div className="md:col-span-5 md:col-start-8">
            <p className="max-w-[44ch] text-[1.2rem] text-body">{t.hero.tagline}</p>
            <div className="mt-7 flex flex-wrap items-center gap-x-7 gap-y-4">
              <a
                href="#projects"
                className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 font-display text-[0.98rem] font-semibold text-paper transition-colors hover:bg-ink"
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
