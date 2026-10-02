import { motion, useReducedMotion } from 'framer-motion'
import { ArrowDown } from 'lucide-react'
import { useLang } from '../i18n/LanguageContext'
import { Dimension } from './Dimension'
import { HeroField } from './HeroField'

const PIVOT = '50% -70vh' // the sign swings from far above, like a pendulum on its cables

/** The headline as a neon sign: it is lowered on two cables, swings, then powers on. One letter is on its way out. */
function NeonSign({ reduce }: { reduce: boolean }) {
  // two cables run up to the top of the steel frame; eye-bolts sit where they meet it
  const cable = 'absolute w-[2px] -translate-x-1/2 bg-gradient-to-b from-[#34423d] to-[#7a9288]'
  const eye =
    'absolute left-1/2 top-full h-[14px] w-[14px] -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-[#9bb2a8] bg-paper'

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
        <div className="sign-plate relative inline-block max-w-full px-[clamp(1.4rem,3.6vw,3rem)] py-[clamp(0.7rem,1.6vw,1.4rem)]">
          <span aria-hidden="true" className={cable} style={{ left: '11%', bottom: 'calc(100% - 1px)', height: '100vh' }}>
            <span className={eye} />
          </span>
          <span aria-hidden="true" className={cable} style={{ left: '89%', bottom: 'calc(100% - 1px)', height: '100vh' }}>
            <span className={eye} />
          </span>
          <span aria-hidden="true" className="sign-bolt left-2.5 top-2.5" />
          <span aria-hidden="true" className="sign-bolt right-2.5 top-2.5" />
          <span aria-hidden="true" className="sign-bolt bottom-2.5 left-2.5" />
          <span aria-hidden="true" className="sign-bolt bottom-2.5 right-2.5" />
          <h1
            className={`neon relative font-neon text-[clamp(3rem,8.4vw,7.6rem)] font-normal leading-[1.02] tracking-[0.005em] ${reduce ? '' : 'neon-powerup'}`}
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
    <section id="top" aria-label="Maksymilian Kościelniak" className="relative [overflow-x:clip]">
      {/* the ridgelines run behind the sign too and dissolve before the next section */}
      <HeroField
        className="absolute inset-0 h-full w-full"
        style={{
          WebkitMaskImage: 'linear-gradient(180deg,#000 0,#000 80%,transparent 100%)',
          maskImage: 'linear-gradient(180deg,#000 0,#000 80%,transparent 100%)',
        }}
        top={0.07}
        topSmall={0.22}
        bottom={0.86}
        alpha={0.72}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_50%_at_82%_8%,rgb(111_240_192/0.13),transparent_70%)]"
      />
      <div className="relative mx-auto max-w-[1240px] px-6 pb-24 pt-28 md:px-12 md:pb-28 md:pt-32">
        {/* the dimension line below measures the name: it is exactly as wide as the longest line */}
        <div className="block md:inline-block md:max-w-full">
          <NeonSign reduce={!!reduce} />
          <Dimension className="mt-7 !text-body md:mt-9" label={t.hero.where} draw delay={reduce ? 0 : 2.3} />
        </div>

        <motion.div className="mt-12 grid gap-8 md:mt-16 md:grid-cols-12" {...fade(reduce ? 0 : 2.0)}>
          <p className="font-body text-[clamp(1.45rem,2.4vw,2rem)] italic leading-snug text-ink md:col-span-6 [text-shadow:0_0_10px_var(--color-paper),0_0_4px_var(--color-paper)]">
            {t.hero.role}
          </p>
          <div className="md:col-span-5 md:col-start-8">
            <p className="max-w-[44ch] text-[1.2rem] text-body [text-shadow:0_0_10px_var(--color-paper),0_0_4px_var(--color-paper)]">{t.hero.tagline}</p>
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
