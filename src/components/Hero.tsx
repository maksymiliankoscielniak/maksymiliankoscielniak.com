import { useEffect, useRef, type RefObject } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowDown } from 'lucide-react'
import { useLang } from '../i18n/LanguageContext'
import { HeroField } from './HeroField'
import { NeonTubes } from './NeonTubes'

const PIVOT = '50% -70vh' // the sign swings from far above, like a pendulum on its cables

/**
 * The sign is dropped from above and caught by its cables, simulated rather than animated:
 *  1. free fall, the left side slightly ahead of the right (it comes down tilted),
 *  2. the cables go taut and stretch like springs, the jolt kicks both the swing (pendulum) and the roll (tilt),
 *  3. the two motions run at different speeds, so it sways left and right a bit chaotically,
 *     and each loses energy on its own until only a faint sway is left.
 * Everything is continuous (no phase starts with a jump in speed). Reduced motion: it simply hangs.
 */
function useSignPhysics(outer: RefObject<HTMLDivElement | null>, plate: RefObject<HTMLDivElement | null>, reduce: boolean) {
  useEffect(() => {
    const o = outer.current
    const pl = plate.current
    if (!o || !pl || reduce) return

    const H = Math.max(420, window.innerHeight * 0.7)
    const FALL = 1.05 // seconds of free fall
    const g = (2 * H) / (FALL * FALL)
    const OMEGA_Y = 14 // cable stretch
    const ZETA_Y = 0.6
    const W1 = 2.3 // swing (pendulum) frequency, rad/s
    const Z1 = 0.13
    const W2 = 5.9 // roll frequency
    const Z2 = 0.075
    const KICK_SWING = 0.00009
    const KICK_ROLL = 0.0003
    const ROLL0 = (-4 * Math.PI) / 180 // left side already lower while falling
    const ROLL_DRIFT = (-6 * Math.PI) / 180 / FALL // and getting lower

    let y = -H
    let vy = 0
    let th = 0
    let wth = 0
    let ph = ROLL0
    let wph = ROLL_DRIFT
    let landed = false
    let t = 0
    let wait = 0.15
    let raf = 0
    let last = 0
    let running = false
    let visible = true

    const H_STEP = 1 / 240
    const step = () => {
      let ay: number
      if (!landed && y >= 0) landed = true
      if (!landed) {
        ay = g
        // in free fall, roll just keeps drifting
        ph += wph * H_STEP
      } else {
        ay = -OMEGA_Y * OMEGA_Y * y - 2 * ZETA_Y * OMEGA_Y * vy
        const aph = -2 * Z2 * W2 * wph - W2 * W2 * ph - KICK_ROLL * ay
        wph += aph * H_STEP
        ph += wph * H_STEP
        const ath = -2 * Z1 * W1 * wth - W1 * W1 * th + KICK_SWING * ay
        wth += ath * H_STEP
        th += wth * H_STEP
      }
      vy += ay * H_STEP
      y += vy * H_STEP
    }

    const apply = () => {
      const sway = ((0.35 * Math.PI) / 180) * Math.sin((t * 2 * Math.PI) / 9) * (1 - Math.exp(-Math.max(0, t - 2) / 4))
      o.style.transform = `translateY(${y.toFixed(2)}px) rotate(${(th + sway).toFixed(5)}rad)`
      pl.style.transform = `rotate(${ph.toFixed(5)}rad)`
    }

    const frame = (now: number) => {
      if (!running) return
      const dt = Math.min(1 / 30, (now - last) / 1000 || 1 / 60)
      last = now
      if (wait > 0) wait -= dt
      else {
        t += dt
        for (let n = Math.round(dt / H_STEP); n > 0; n--) step()
      }
      apply()
      raf = requestAnimationFrame(frame)
    }
    const start = () => {
      if (running || !visible || document.hidden) return
      running = true
      last = performance.now()
      raf = requestAnimationFrame(frame)
    }
    const stop = () => {
      running = false
      cancelAnimationFrame(raf)
    }
    const onVisibility = () => (document.hidden ? stop() : start())

    o.style.transform = `translateY(${-H}px)`
    pl.style.transform = `rotate(${ph}rad)`
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      if (visible) start()
      else stop()
    })
    io.observe(o.closest('section') ?? o)
    document.addEventListener('visibilitychange', onVisibility)
    start()
    return () => {
      stop()
      io.disconnect()
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [outer, plate, reduce])
}

/** The headline as a neon sign: it is dropped on two cables, swings, then powers on. Three tubes are on their way out. */
function NeonSign({ reduce }: { reduce: boolean }) {
  // two steel wire ropes run up to the top of the frame, each ending in a square clevis
  const cable = 'wire-rope absolute w-[4px] -translate-x-1/2'
  const clevis = 'absolute left-1/2 top-full h-[18px] w-[18px] -translate-x-1/2 -translate-y-1/2 border-[4px] border-[#8da097] bg-paper'
  const outer = useRef<HTMLDivElement>(null)
  const plate = useRef<HTMLDivElement>(null)
  useSignPhysics(outer, plate, reduce)

  return (
    <div ref={outer} className="relative" style={{ transformOrigin: PIVOT, transform: reduce ? undefined : 'translateY(-110vh)' }}>
      <div
        ref={plate}
        className="sign-plate relative w-[88%] max-w-[40.5rem] sm:w-[75%] px-[clamp(0.9rem,2.6vw,2.2rem)] py-[clamp(0.9rem,2.2vw,1.8rem)]"
        style={{ transformOrigin: '50% 0' }}
      >
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
    </div>
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
