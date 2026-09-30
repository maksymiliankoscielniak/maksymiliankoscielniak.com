import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from 'framer-motion'
import { useLang } from '../i18n/LanguageContext'

/**
 * The "trailer": black stage, letterbox bars, film grain, and title cards that
 * cut in and out as the page scrolls.
 */
export function Trailer() {
  const { t } = useLang()
  const reduce = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  const hintOpacity = useTransform(scrollYProgress, [0, 0.05, 1], [1, 0, 0])

  const cards: { text: string; sub?: string }[] = [
    ...t.about.cards.map((text) => ({ text })),
    { text: t.about.bodyTitle, sub: t.about.finale },
  ]

  if (reduce) {
    return (
      <div className="relative overflow-hidden bg-black py-24">
        <div className="mx-auto flex max-w-3xl flex-col gap-20 px-6 text-center">
          {cards.map((c) => (
            <Card key={c.text} text={c.text} sub={c.sub} />
          ))}
        </div>
      </div>
    )
  }

  const n = cards.length
  return (
    <div ref={ref} style={{ height: `${100 + n * 65}vh` }} className="relative bg-black">
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        {/* projector beam */}
        <div
          aria-hidden="true"
          className="absolute left-1/2 top-0 h-full w-[120%] -translate-x-1/2"
          style={{
            clipPath: 'polygon(46% 0, 54% 0, 92% 100%, 8% 100%)',
            background: 'linear-gradient(180deg, rgb(255 226 170 / 0.14), rgb(255 226 170 / 0.02) 75%, transparent)',
            filter: 'blur(4px)',
          }}
        />
        {cards.map((c, i) => (
          <TrailerCard key={c.text} index={i} count={n} progress={scrollYProgress} text={c.text} sub={c.sub} />
        ))}

        <motion.p
          aria-hidden="true"
          className="absolute inset-x-0 bottom-[16vh] text-center font-script text-sm text-bone-dim/80"
          style={{ opacity: hintOpacity }}
        >
          {t.about.scroll}
        </motion.p>

        {/* letterbox */}
        <div aria-hidden="true" className="absolute inset-x-0 top-0 h-[11vh] bg-black" style={{ boxShadow: '0 0 40px 10px #000' }} />
        <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-[11vh] bg-black" style={{ boxShadow: '0 0 40px 10px #000' }} />
        <div aria-hidden="true" className="absolute inset-0 overflow-hidden">
          <div className="grain" />
        </div>
      </div>
    </div>
  )
}

function TrailerCard({
  index,
  count,
  progress,
  text,
  sub,
}: {
  index: number
  count: number
  progress: MotionValue<number>
  text: string
  sub?: string
}) {
  const first = index === 0
  const last = index === count - 1
  const start = index / count
  const end = (index + 1) / count
  const fade = 0.045
  const sharp = 'blur(0px)'
  const soft = 'blur(14px)'

  // Offsets must stay within 0..1, non-decreasing, and cover the whole 0..1 range
  // (scroll-linked animations misbehave outside the keyframes they were given).
  let inputs: number[]
  let o: number[]
  let sc: number[]
  let bl: string[]
  if (first) {
    inputs = [0, end - fade, end, 1]
    o = [1, 1, 0, 0]
    sc = [1, 1.02, 1.06, 1.06]
    bl = [sharp, sharp, soft, soft]
  } else if (last) {
    inputs = [0, start, start + fade, 1]
    o = [0, 0, 1, 1]
    sc = [0.94, 0.94, 1, 1.03]
    bl = [soft, soft, sharp, sharp]
  } else {
    inputs = [0, start, start + fade, end - fade, end, 1]
    o = [0, 0, 1, 1, 0, 0]
    sc = [0.94, 0.94, 1, 1.02, 1.06, 1.06]
    bl = [soft, soft, sharp, sharp, soft, soft]
  }
  const opacity = useTransform(progress, inputs, o)
  const scale = useTransform(progress, inputs, sc)
  const blur = useTransform(progress, inputs, bl)

  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center px-[calc(var(--drape-w)+1.5rem)]"
      style={{ opacity, scale, filter: blur }}
    >
      <Card text={text} sub={sub} />
    </motion.div>
  )
}

function Card({ text, sub }: { text: string; sub?: string }) {
  const long = text.length > 34
  const name = Boolean(sub)
  const size = long
    ? 'max-w-[30ch] text-[clamp(1.7rem,4.8vw,3.6rem)]'
    : name
      ? 'max-w-[13ch] text-[clamp(2.6rem,9vw,6.2rem)]'
      : 'max-w-[20ch] text-[clamp(2.4rem,8vw,6.2rem)]'
  return (
    <div className="text-center">
      <p className={`text-glow mx-auto text-balance font-display font-semibold leading-[1.05] text-bone ${size}`}>
        {text}
      </p>
      {sub && <p className="mt-6 font-script text-[clamp(0.95rem,2vw,1.25rem)] text-brass">{sub}</p>}
    </div>
  )
}
