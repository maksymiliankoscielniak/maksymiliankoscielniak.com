import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'

/**
 * Curtain call: when the visitor reaches the very end, roses and lilies are thrown
 * from the audience and land on the stage floor, with a few petals drifting down.
 * Purely decorative: it never intercepts clicks and is skipped for reduced motion
 * (the flowers then simply lie there).
 */

type Kind = 'rose' | 'lily'

type Piece = {
  id: number
  kind: Kind
  x: number // resting position, % of viewport width
  bottom: number // resting distance from the bottom edge, px
  scale: number
  restRot: number
  startDx: number // horizontal offset it is thrown from, px
  startRot: number
  apex: number // peak height above the resting point, px
  delay: number
  dur: number
  flip: boolean
}

type Petal = {
  id: number
  x: number
  size: number
  delay: number
  dur: number
  sway: number
  spin: number
  color: string
}

function rng(seed: number) {
  let a = seed
  return () => {
    a |= 0
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

function build(seed: number, w: number, h: number) {
  const r = rng(seed)
  const small = w < 640
  const count = small ? 13 : 22
  const base = small ? 0.62 : 0.92

  const pieces: Piece[] = Array.from({ length: count }, (_, i) => {
    const x = 4 + ((i + 0.5) / count) * 92 + (r() - 0.5) * 8
    const from = x + (r() - 0.5) * 70
    return {
      id: i,
      kind: r() < 0.55 ? 'rose' : 'lily',
      x,
      bottom: 2 + r() * 38,
      scale: base * (0.78 + r() * 0.36),
      restRot: (r() < 0.5 ? -1 : 1) * (22 + r() * 92),
      startDx: ((from - x) / 100) * w,
      startRot: (r() < 0.5 ? -1 : 1) * (200 + r() * 360),
      apex: h * (0.3 + r() * 0.42),
      delay: r() * 2.6,
      dur: 1.5 + r() * 0.7,
      flip: r() < 0.5,
    }
  })

  const colors = ['#a1213a', '#7a1226', '#c03352', '#efe3d3', '#f6eee2']
  const petals: Petal[] = Array.from({ length: small ? 10 : 18 }, (_, i) => ({
    id: i,
    x: r() * 100,
    size: 10 + r() * 7,
    delay: 0.9 + r() * 4.2,
    dur: 5 + r() * 3,
    sway: 40 + r() * 80,
    spin: 240 + r() * 360,
    color: colors[Math.floor(r() * colors.length)],
  }))
  return { pieces, petals }
}

export function Bouquet() {
  const reduce = useReducedMotion()
  const [active, setActive] = useState(false)
  const [run, setRun] = useState(0)

  // play whenever the visitor arrives at the very end; re-arm once they leave
  useEffect(() => {
    const end = document.getElementById('the-end')
    if (!end) return
    const need = Math.min(0.6, (window.innerHeight * 0.8) / Math.max(end.offsetHeight, 1))
    let on = false
    const io = new IntersectionObserver(
      ([e]) => {
        if (!on && e.intersectionRatio >= need) {
          on = true
          setRun((n) => n + 1)
          setActive(true)
        } else if (on && e.intersectionRatio === 0) {
          on = false
          setActive(false)
        }
      },
      { threshold: [0, need] },
    )
    io.observe(end)
    return () => io.disconnect()
  }, [])

  return (
    <AnimatePresence>
      {active && <Shower key={run} seed={run * 7919 + 13} still={Boolean(reduce)} />}
    </AnimatePresence>
  )
}

function Shower({ seed, still }: { seed: number; still: boolean }) {
  const { pieces, petals } = useMemo(() => build(seed, window.innerWidth, window.innerHeight), [seed])
  const h = typeof window === 'undefined' ? 900 : window.innerHeight

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[45] overflow-hidden"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.7 }}
    >
      {!still &&
        petals.map((p) => (
          <motion.span
            key={`p${p.id}`}
            className="absolute block"
            style={{
              left: `${p.x}%`,
              top: -24,
              width: p.size,
              height: p.size * 1.35,
              background: `radial-gradient(circle at 35% 30%, ${p.color}, ${p.color}cc 60%, #00000040)`,
              borderRadius: '60% 0 60% 40%',
            }}
            initial={{ y: 0, opacity: 0 }}
            animate={{
              y: h + 60,
              x: [0, p.sway, -p.sway * 0.8, p.sway * 0.6, -p.sway * 0.3],
              rotate: p.spin,
              scaleX: [1, 0.35, 1, 0.4, 1],
              opacity: [0, 1, 1, 0],
            }}
            transition={{
              delay: p.delay,
              duration: p.dur,
              ease: 'linear',
              x: { duration: p.dur, ease: 'easeInOut' },
              scaleX: { duration: p.dur * 0.6, repeat: Infinity, ease: 'easeInOut' },
              opacity: { duration: p.dur, times: [0, 0.08, 0.85, 1] },
            }}
          />
        ))}

      {pieces.map((p) => {
        const w = 64 * p.scale
        const ht = 116 * p.scale
        const startY = p.bottom + ht + 220
        const Art = p.kind === 'rose' ? Rose : Lily
        return (
          <motion.div
            key={p.id}
            className="absolute"
            style={{ left: `${p.x}%`, bottom: p.bottom, width: w, height: ht, marginLeft: -w / 2 }}
            initial={still ? { opacity: 0 } : { x: p.startDx, opacity: 0 }}
            animate={still ? { opacity: 1 } : { x: 0, opacity: 1 }}
            transition={
              still
                ? { duration: 0.8, delay: p.delay * 0.3 }
                : { x: { duration: p.dur, delay: p.delay, ease: 'linear' }, opacity: { duration: 0.01, delay: p.delay } }
            }
          >
            <motion.div
              className="h-full w-full"
              initial={still ? { rotate: p.restRot } : { y: startY, rotate: p.startRot }}
              animate={
                still
                  ? { rotate: p.restRot }
                  : { y: [startY, -p.apex, 0, -14, 0], rotate: [p.startRot, p.restRot] }
              }
              transition={
                still
                  ? { duration: 0 }
                  : {
                      y: { duration: p.dur, delay: p.delay, times: [0, 0.52, 0.86, 0.94, 1], ease: ['easeOut', 'easeIn', 'easeOut', 'easeIn'] },
                      rotate: { duration: p.dur * 0.9, delay: p.delay, ease: 'easeOut' },
                    }
              }
              style={{ filter: 'drop-shadow(0 4px 5px rgb(0 0 0 / 0.55))' }}
            >
              <div className="h-full w-full" style={p.flip ? { transform: 'scaleX(-1)' } : undefined}>
                <Art />
              </div>
            </motion.div>
          </motion.div>
        )
      })}
    </motion.div>
  )
}

function Rose() {
  return (
    <svg viewBox="0 0 64 116" className="h-full w-full">
      <defs>
        <radialGradient id="rs-head" cx="0.4" cy="0.35" r="0.8">
          <stop offset="0" stopColor="#dc3a54" />
          <stop offset="0.55" stopColor="#a11c39" />
          <stop offset="1" stopColor="#5a0b1b" />
        </radialGradient>
      </defs>
      <path d="M32 46 C30 70 35 92 31 114" stroke="#2b6335" strokeWidth="3.2" fill="none" strokeLinecap="round" />
      <path d="M32 78 C44 70 54 72 59 62 C58 78 45 87 32 82Z" fill="#2f6b3a" />
      <path d="M31 96 C20 89 10 91 5 82 C7 95 20 102 31 99Z" fill="#3b7d46" />
      <path d="M21 44 C26 54 38 54 43 44 L38 39 L32 35 L26 39Z" fill="#2b6335" />
      <g transform="translate(32 29)">
        <ellipse rx="19" ry="17" fill="url(#rs-head)" />
        <path d="M-15 -3 C-9 -17 9 -17 15 -3 C11 9 -11 9 -15 -3Z" fill="#9b1b37" stroke="#560a19" strokeWidth="0.8" />
        <path d="M-10 -2 C-5 -12 7 -11 10 -2 C7 7 -7 7 -10 -2Z" fill="#c42a49" stroke="#560a19" strokeWidth="0.8" />
        <path d="M-5 -3 C-2 -9 6 -7 5 -1 C3 4 -4 4 -5 -3Z" fill="#8a1530" stroke="#560a19" strokeWidth="0.8" />
        <path d="M-2 -3 C0 -5 4 -4 3 0" fill="none" stroke="#45081a" strokeWidth="1.1" strokeLinecap="round" />
        <path d="M-12 -10 C-8 -15 -2 -16 3 -15" fill="none" stroke="#f08aa0" strokeOpacity="0.45" strokeWidth="1.4" strokeLinecap="round" />
      </g>
    </svg>
  )
}

function Lily() {
  const back = [30, 90, 150, 210, 270, 330]
  const front = [0, 60, 120, 180, 240, 300]
  const petal = 'M0 0 C-9 -8 -11 -26 0 -35 C11 -26 9 -8 0 0Z'
  const stamens = [18, 54, 96, 138, 200, 262, 318]
  return (
    <svg viewBox="0 0 64 116" className="h-full w-full">
      <defs>
        <linearGradient id="ly-front" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0" stopColor="#efc3cd" />
          <stop offset="0.45" stopColor="#f8e6df" />
          <stop offset="1" stopColor="#fffaf1" />
        </linearGradient>
        <linearGradient id="ly-back" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0" stopColor="#d9a9b4" />
          <stop offset="1" stopColor="#ecd9cd" />
        </linearGradient>
      </defs>
      <path d="M32 54 C34 76 30 98 32 114" stroke="#3a7a44" strokeWidth="3" fill="none" strokeLinecap="round" />
      <path d="M32 72 C46 66 56 52 61 46 C57 64 47 78 32 76Z" fill="#3d8348" />
      <path d="M32 92 C19 88 10 76 6 70 C10 86 20 98 32 96Z" fill="#2f6b3a" />
      <g transform="translate(32 30) scale(0.78) rotate(-8)">
        {back.map((a) => (
          <path key={`b${a}`} d={petal} transform={`rotate(${a})`} fill="url(#ly-back)" stroke="#c99aa6" strokeWidth="0.6" />
        ))}
        {front.map((a) => (
          <g key={`f${a}`} transform={`rotate(${a})`}>
            <path d={petal} fill="url(#ly-front)" stroke="#dcb3bb" strokeWidth="0.6" />
            <path d="M0 -3 L0 -27" stroke="#e5c3c9" strokeWidth="0.8" />
            <circle cx="-2.6" cy="-14" r="0.8" fill="#b84a66" />
            <circle cx="2.4" cy="-19" r="0.8" fill="#b84a66" />
            <circle cx="-1.6" cy="-23" r="0.7" fill="#b84a66" />
          </g>
        ))}
        <circle r="3" fill="#b8c474" />
        {stamens.map((a) => (
          <g key={a} transform={`rotate(${a})`}>
            <line x1="0" y1="-2" x2="0" y2="-15" stroke="#d6cfa0" strokeWidth="0.9" />
            <ellipse cx="0" cy="-16.5" rx="1.6" ry="3" fill="#c8702a" />
          </g>
        ))}
      </g>
    </svg>
  )
}
