import { useEffect, useRef, type CSSProperties } from 'react'

/** Glyphs drawn in a 64 x 64 box as plain strokes; each is lit neon on top of a dark, die-cut sticker outline. */
const GLYPHS: Record<string, string[]> = {
  smile: ['M8 32a24 24 0 1 0 48 0a24 24 0 1 0 -48 0', 'M23 24v6', 'M41 24v6', 'M20 38q12 12 24 0'],
  tongue: ['M8 32a24 24 0 1 0 48 0a24 24 0 1 0 -48 0', 'M18 29q4-6 9 0', 'M41 24v6', 'M20 38q12 9 24 0', 'M35 42v7a4 4 0 0 0 8 0v-8'],
  bolt: ['M37 5L13 36h15l-4 23 27-35H35z'],
  heart: ['M32 55C8 39 6 23 16 15c7-5 14-1 16 6 2-7 9-11 16-6 10 8 8 24-16 40z'],
  sparkle: ['M32 5C34 22 42 30 59 32 42 34 34 42 32 59 30 42 22 34 5 32 22 30 30 22 32 5z'],
  star: ['M32 6l7.5 17 18.5 1.5-14 12.5 4.5 18-16-10-16 10 4.5-18-14-12.5 18.5-1.5z'],
  cursor: ['M14 8l34 25-15 3 9 17-7 3-9-17-12 11z'],
  coffee: ['M10 27h31v13a12 12 0 0 1-12 12h-7a12 12 0 0 1-12-12z', 'M41 31h4a6 6 0 0 1 0 12h-5', 'M18 8q-4 5 0 9t0 7', 'M29 8q-4 5 0 9t0 7'],
  rocket: ['M32 5c12 8 14 25 10 40H22C18 30 20 13 32 5z', 'M27 24a5 5 0 1 0 10 0a5 5 0 1 0 -10 0', 'M22 35l-9 11 9-2', 'M42 35l9 11-9-2', 'M28 51q4 9 8 0'],
  flame: ['M32 5c3 12 15 18 15 34a15 15 0 0 1-30 0c0-8 5-12 8-19 3 4 4 5 7-15z', 'M32 55a6 6 0 0 1-6-7c0-4 4-6 6-10 2 4 6 6 6 10a6 6 0 0 1-6 7z'],
  code: ['M22 17L8 32l14 15', 'M42 17l14 15-14 15', 'M36 11L28 53'],
  cat: ['M10 14l9 9h26l9-9v28a11 11 0 0 1-11 11H21a11 11 0 0 1-11-11z', 'M24 33v4', 'M40 33v4', 'M27 42q5 4 10 0'],
}

type Sticker = {
  g: keyof typeof GLYPHS
  x: number // % across
  y: number // % down
  size: number // px at wide screens
  rot: number // resting angle
  depth: number // parallax strength
  dur: number // float cycle, seconds
  delay: number
  white?: boolean
  flicker?: boolean
  small?: boolean // hide on narrow screens
}

const STICKERS: Sticker[] = [
  { g: 'tongue', x: 3, y: 6, size: 84, rot: -14, depth: 1.2, dur: 7.2, delay: 0.1 },
  { g: 'bolt', x: 91, y: 4, size: 74, rot: 12, depth: 0.9, dur: 6.2, delay: 0.5, flicker: true },
  { g: 'heart', x: 84, y: 30, size: 58, rot: 9, depth: 1.5, dur: 8.1, delay: 0.9, white: true, small: true },
  { g: 'code', x: 1.5, y: 38, size: 70, rot: -8, depth: 0.8, dur: 6.8, delay: 1.3, small: true },
  { g: 'coffee', x: 93, y: 52, size: 78, rot: 10, depth: 1.1, dur: 7.6, delay: 0.3 },
  { g: 'sparkle', x: 9, y: 58, size: 52, rot: 0, depth: 1.7, dur: 5.4, delay: 0.7, white: true, flicker: true },
  { g: 'rocket', x: 92, y: 69, size: 88, rot: 22, depth: 1.0, dur: 8.4, delay: 1.1 },
  { g: 'cat', x: 3, y: 80, size: 76, rot: -9, depth: 1.3, dur: 7.0, delay: 1.6, small: true },
  { g: 'smile', x: 47, y: 86, size: 62, rot: 7, depth: 1.4, dur: 6.6, delay: 0.2, white: true },
  { g: 'cursor', x: 70, y: 3, size: 54, rot: -6, depth: 1.8, dur: 5.9, delay: 1.0, small: true },
  { g: 'flame', x: 22, y: 87, size: 66, rot: -12, depth: 0.9, dur: 7.8, delay: 0.8, small: true },
  { g: 'star', x: 63, y: 88, size: 50, rot: 14, depth: 1.6, dur: 6.0, delay: 1.4, flicker: true, small: true },
]

function StickerSvg({ s }: { s: Sticker }) {
  const lit = s.white ? '#d8fff0' : '#6ff0c0'
  const paths = GLYPHS[s.g]
  const layer = (stroke: string, width: number, opacity = 1) =>
    paths.map((d, i) => (
      <path key={`${stroke}${i}`} d={d} stroke={stroke} strokeWidth={width} strokeOpacity={opacity} />
    ))
  return (
    <svg viewBox="0 0 64 64" fill="none" strokeLinecap="round" strokeLinejoin="round" overflow="visible" className="sticker-svg" style={{ color: lit }}>
      {layer(lit, 12.5, 0.3)}
      {layer('#060908', 8.5)}
      {layer(lit, 3.2)}
      {layer('#ffffff', 1.1, 0.85)}
    </svg>
  )
}

/**
 * Neon stickers slapped on the background: they pop in once, bob gently, a few buzz now and then,
 * and drift a little against the pointer. Pauses off-screen; with reduced motion they just sit there.
 */
export function NeonStickers({ className = '', style }: { className?: string; style?: CSSProperties }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) {
      el.classList.add('is-in')
      return
    }
    let raf = 0
    let tx = 0
    let ty = 0
    let cx = 0
    let cy = 0
    let visible = false
    const loop = () => {
      cx += (tx - cx) * 0.06
      cy += (ty - cy) * 0.06
      el.style.setProperty('--px', cx.toFixed(3))
      el.style.setProperty('--py', cy.toFixed(3))
      raf = visible && (Math.abs(tx - cx) > 0.002 || Math.abs(ty - cy) > 0.002) ? requestAnimationFrame(loop) : 0
    }
    const kick = () => {
      if (!raf && visible) raf = requestAnimationFrame(loop)
    }
    const onMove = (e: PointerEvent) => {
      tx = (e.clientX / window.innerWidth - 0.5) * 2
      ty = (e.clientY / window.innerHeight - 0.5) * 2
      kick()
    }
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      el.classList.toggle('is-paused', !visible)
      if (visible) {
        el.classList.add('is-in')
        kick()
      }
    })
    io.observe(el)
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => {
      io.disconnect()
      cancelAnimationFrame(raf)
      window.removeEventListener('pointermove', onMove)
    }
  }, [])

  return (
    <div ref={ref} aria-hidden="true" className={`sticker-field pointer-events-none ${className}`} style={style}>
      {STICKERS.map((s, i) => (
        <span
          key={i}
          className={`sticker${s.small ? ' max-md:hidden' : ''}`}
          style={
            {
              left: `min(${s.x}%, calc(100% - var(--w) - 6px))`,
              top: `${s.y}%`,
              '--w': `clamp(${Math.round(s.size * 0.62)}px, ${(s.size / 14.4).toFixed(2)}vw, ${s.size}px)`,
              width: 'var(--w)',
              '--d': s.depth,
              '--rot': `${s.rot}deg`,
              '--dur': `${s.dur}s`,
              '--delay': `${s.delay}s`,
            } as CSSProperties
          }
        >
          <span className="sticker-pop">
            <span className={`sticker-bob${s.flicker ? ' sticker-buzz' : ''}`}>
              <StickerSvg s={s} />
            </span>
          </span>
        </span>
      ))}
    </div>
  )
}
