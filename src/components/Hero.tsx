import { motion, useReducedMotion } from 'framer-motion'
import { ArrowDown } from 'lucide-react'
import { useLang } from '../i18n/LanguageContext'
import { HeroField } from './HeroField'
import { NeonTubes } from './NeonTubes'

const PIVOT = '50% -70vh' // the sign swings from far above, like a pendulum on its cables

/** The headline as a neon sign: it is lowered on two cables, swings, then powers on. One letter is on its way out. */
function NeonSign({ reduce }: { reduce: boolean }) {
  // two steel wire ropes run up to the top of the frame, each ending in a square clevis
  const cable = 'wire-rope absolute w-[4px] -translate-x-1/2'
  const clevis = 'absolute left-1/2 top-full h-[18px] w-[18px] -translate-x-1/2 -translate-y-1/2 border-[4px] border-[#8da097] bg-paper'

  return (
    <motion.div
      className="relative"
      style={{ transformOrigin: PIVOT }}
      initial={reduce ? false : { y: '-70vh', rotate: -6 }}
      animate={reduce ? undefined : { y: 0, rotate: 0 }}
      transition={
        reduce
          ? undefined
          : {
              // the left cable lets go first, so the sign comes down tilted (left side low) ...
              y: { duration: 1.5, ease: [0.3, 0.55, 0.25, 1] },
              // ... and then the right side catches up: a soft spring that swings out and loses energy on its own
              rotate: { type: 'spring', stiffness: 20, damping: 1.2, mass: 1, delay: 0.8 },
            }
      }
    >
      <motion.div
        style={{ transformOrigin: PIVOT }}
        animate={reduce ? undefined : { rotate: [0, 0.35, 0, -0.35, 0] }}
        transition={reduce ? undefined : { duration: 9, repeat: Infinity, ease: 'easeInOut', delay: 3.5 }}
      >
        <div className="sign-plate relative w-[88%] max-w-[40.5rem] sm:w-[75%] px-[clamp(0.9rem,2.6vw,2.2rem)] py-[clamp(0.9rem,2.2vw,1.8rem)]">
          <span aria-hidden="true" className={cable} style={{ left: '11%', bottom: 'calc(100% - 1px)', height: '100vh' }}>
            <span className={clevis} />
          </span>
          <span aria-hidden="true" className={cable} style={{ left: '89%', bottom: 'calc(100% - 1px)', height: '100vh' }}>
            <span className={clevis} />
          </span>
          <span aria-hidden="true" className="sign-bolt left-2 top-2" />
          <span aria-hidden="true" className="sign-bolt right-2 top-2" />
          <span aria-hidden="true" className="sign-bolt bottom-2 left-2" />
          <span aria-hidden="true" className="sign-bolt bottom-2 right-2" />
          <h1 className="sr-only">Maksymilian Kościelniak</h1>
          <NeonTubes reduce={reduce} />
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
        <div className="block">
          <NeonSign reduce={!!reduce} />
        </div>

        <motion.div className="mt-12 grid gap-8 md:mt-16 md:grid-cols-12" {...fade(reduce ? 0 : 2.0)}>
          <p className="font-body text-[clamp(1.15rem,1.9vw,1.55rem)] italic leading-snug text-ink md:col-span-6 [text-shadow:0_0_10px_var(--color-paper),0_0_4px_var(--color-paper)]">
            {t.hero.role}
          </p>
          <div className="md:col-span-5 md:col-start-8">
            <p className="max-w-[44ch] text-[1rem] text-body [text-shadow:0_0_10px_var(--color-paper),0_0_4px_var(--color-paper)]">{t.hero.tagline}</p>
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
