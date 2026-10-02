import { useEffect, useId, useRef } from 'react'

type Pt = [number, number]
type Glyph = {
  w: number
  /** lit tube runs, in glyph units (cap height = 100, baseline y = 100) */
  strokes: Pt[][]
  /** unlit bridge pieces that are part of the tube network but not of the letter */
  bridges?: Pt[][]
  /** x positions on the baseline where the glyph's tube drops to the unlit rail */
  stubs: number[]
}

const C = 14 // chamfer: the lettering is made of straight runs and hard 45 degree corners

const GLYPHS: Record<string, Glyph> = {
  M: { w: 80, strokes: [[[0, 100], [0, 0], [40, 50], [80, 0], [80, 100]]], stubs: [0, 80] },
  A: {
    w: 72,
    strokes: [
      [[0, 100], [0, C], [C, 0], [72 - C, 0], [72, C], [72, 100]],
      [[0, 58], [72, 58]],
    ],
    stubs: [0, 72],
  },
  K: {
    w: 66,
    strokes: [
      [[0, 0], [0, 100]],
      [[66, 0], [4, 54], [66, 100]],
    ],
    stubs: [0, 66],
  },
  S: {
    w: 60,
    strokes: [[[60, C], [60 - C, 0], [C, 0], [0, C], [0, 34], [C, 50], [60 - C, 50], [60, 66], [60, 86], [60 - C, 100], [0, 100]]],
    stubs: [0, 30],
  },
  Ś: {
    w: 60,
    strokes: [
      [[60, C], [60 - C, 0], [C, 0], [0, C], [0, 34], [C, 50], [60 - C, 50], [60, 66], [60, 86], [60 - C, 100], [0, 100]],
      [[20, -13], [42, -35]],
    ],
    bridges: [[[20, -13], [20, 0]]],
    stubs: [0, 30],
  },
  Y: {
    w: 70,
    strokes: [
      [[0, 0], [35, 50]],
      [[70, 0], [35, 50], [35, 100]],
    ],
    stubs: [35],
  },
  I: { w: 0, strokes: [[[0, 0], [0, 100]]], stubs: [0] },
  L: { w: 56, strokes: [[[0, 0], [0, 100], [56, 100]]], stubs: [0, 56] },
  N: { w: 70, strokes: [[[0, 100], [0, 0], [70, 100], [70, 0]]], stubs: [0, 70] },
  O: {
    w: 70,
    strokes: [[[C, 0], [70 - C, 0], [70, C], [70, 100 - C], [70 - C, 100], [C, 100], [0, 100 - C], [0, C], [C, 0]]],
    stubs: [35],
  },
  C: {
    w: 62,
    strokes: [[[62, C], [62 - C, 0], [C, 0], [0, C], [0, 100 - C], [C, 100], [62, 100]]],
    stubs: [32, 62],
  },
  E: {
    w: 58,
    strokes: [
      [[58, 0], [0, 0], [0, 100], [58, 100]],
      [[0, 50], [46, 50]],
    ],
    stubs: [0, 58],
  },
}

const LINES = ['MAKSYMILIAN', 'KOŚCIELNIAK']
const LINE_Y = [0, 196]
const GAP = 34
const RAIL = 30 // distance of the unlit rail below the baseline
const HOLE = 60 // how far past the first / last letter the tubes dive into the plate
// the tube runs that are tired: each one stutters and drops out now and then (never more than two at once)
const TIRED: { line: number; index: number; stroke?: number }[] = [
  { line: 0, index: 5 }, // the middle M of MAKSYMILIAN
  { line: 1, index: 2, stroke: 1 }, // the accent over Ś
  { line: 1, index: 10 }, // the last K
]

const dOf = (pts: Pt[], dx: number, dy: number) =>
  pts.map(([x, y], i) => `${i ? 'L' : 'M'}${(x + dx).toFixed(1)} ${(y + dy).toFixed(1)}`).join(' ')

type Box = { x0: number; y0: number; x1: number; y1: number }

function build() {
  const natural = LINES.map((l) => [...l].reduce((sum, ch) => sum + GLYPHS[ch].w, 0))
  const target = natural[0] + GAP * (LINES[0].length - 1)

  let lit = ''
  let base = ''
  const tired = TIRED.map(() => ({ d: '', box: { x0: 1e9, y0: 1e9, x1: -1e9, y1: -1e9 } as Box }))
  const holes: Pt[] = []

  LINES.forEach((line, li) => {
    const y0 = LINE_Y[li]
    const chars = [...line]
    const gap = (target - natural[li]) / (chars.length - 1)
    let x = 0
    const railY = y0 + 100 + RAIL
    chars.forEach((ch, ci) => {
      const g = GLYPHS[ch]
      const t = TIRED.findIndex((f) => f.line === li && f.index === ci)
      g.strokes.forEach((st, si) => {
        const d = dOf(st, x, y0)
        base += d + ' '
        if (t >= 0 && (TIRED[t].stroke === undefined || TIRED[t].stroke === si)) {
          tired[t].d += d + ' '
          for (const [px, py] of st) {
            const b = tired[t].box
            b.x0 = Math.min(b.x0, px + x)
            b.x1 = Math.max(b.x1, px + x)
            b.y0 = Math.min(b.y0, py + y0)
            b.y1 = Math.max(b.y1, py + y0)
          }
        } else lit += d + ' '
      })
      for (const br of g.bridges ?? []) base += dOf(br, x, y0) + ' '
      for (const sx of g.stubs) base += `M${(x + sx).toFixed(1)} ${y0 + 100} L${(x + sx).toFixed(1)} ${railY} `
      x += g.w + gap
    })
    // the rail: out of a hole in the plate, round a bend, along the whole line, round a bend, back into the plate
    const hy = y0 + 100 - 2
    const r = RAIL
    base += `M${-HOLE} ${hy} L${-HOLE} ${railY - r} A${r} ${r} 0 0 0 ${-HOLE + r} ${railY} L${target + HOLE - r} ${railY} A${r} ${r} 0 0 0 ${target + HOLE} ${railY - r} L${target + HOLE} ${hy} `
    holes.push([-HOLE, hy], [target + HOLE, hy])
  })

  const pad = 34
  const vb = { x: -HOLE - pad, y: -22, w: target + 2 * (HOLE + pad), h: LINE_Y[1] + 100 + RAIL + 36 + 22 }
  return { lit, tired, base, holes, vb }
}

const SIGN = build()

/**
 * The name as neon glass tubing: every letter is one run of tube, and all the runs are joined by an
 * unlit rail below the baseline that disappears into the plate at both ends of each line.
 */
export function NeonTubes({ reduce }: { reduce: boolean }) {
  const uid = useId().replace(/[^a-zA-Z0-9]/g, '')
  const { lit, tired, base, holes, vb } = SIGN
  const svgRef = useRef<SVGSVGElement>(null)
  const tiredRefs = useRef<(SVGGElement | null)[]>([])

  // Random dropouts: every so often one of the tired tubes stutters and goes dark for a moment.
  useEffect(() => {
    if (reduce) return
    const els = tiredRefs.current
    let active = 0
    let timer = 0
    let onScreen = true
    const busy = new Set<number>()

    const burst = (i: number) => {
      const el = els[i]
      if (!el || !el.animate) return
      busy.add(i)
      active++
      // a slow, uneven stutter: a few dips with soft edges, every one at least ~130 ms long; the tempo changes per burst
      const tempo = 0.9 + Math.random() * 1.1
      const dips = 2 + Math.floor(Math.random() * 3)
      const ms: [number, number][] = [[0, 1]]
      let t = 0
      for (let k = 0; k < dips; k++) {
        t += (200 + Math.random() * 500) * tempo // lit
        ms.push([t, 1])
        t += 80 + Math.random() * 60 // fade down
        const lo = 0.03 + Math.random() * 0.2
        ms.push([t, lo])
        const lastDip = k === dips - 1
        t += (lastDip && Math.random() < 0.5 ? 700 + Math.random() * 900 : 140 + Math.random() * 320) * tempo // dark
        ms.push([t, lo])
        t += 90 + Math.random() * 70 // catch again
        ms.push([t, 1])
      }
      t += 150
      ms.push([t, 1])
      const dur = t
      const frames = ms.map(([at, opacity]) => ({ offset: at / dur, opacity }))
      const anim = el.animate(frames, { duration: dur, easing: 'linear' })
      anim.onfinish = anim.oncancel = () => {
        busy.delete(i)
        active--
      }
    }

    const tick = () => {
      if (onScreen && !document.hidden && active < 2 && Math.random() < 0.8) {
        const free = els.map((_, i) => i).filter((i) => !busy.has(i))
        if (free.length) burst(free[Math.floor(Math.random() * free.length)])
      }
      timer = window.setTimeout(tick, 1000 + Math.random() * 2400)
    }
    timer = window.setTimeout(tick, 3600)

    const io = new IntersectionObserver(([e]) => (onScreen = e.isIntersecting))
    if (svgRef.current) io.observe(svgRef.current)
    return () => {
      window.clearTimeout(timer)
      io.disconnect()
      els.forEach((el) => el?.getAnimations?.().forEach((a) => a.cancel()))
    }
  }, [reduce])

  const strokeSet = (d: string, filterB1?: string, filterB2?: string) => (
    <>
      <g filter={`url(#${filterB2})`} opacity={0.55}>
        <path d={d} stroke="#6ff0c0" strokeWidth={20} />
      </g>
      <g filter={`url(#${filterB1})`}>
        <path d={d} stroke="#6ff0c0" strokeWidth={13} />
      </g>
      <path d={d} stroke="#6ff0c0" strokeWidth={8.4} />
      <path d={d} stroke="#f3fffb" strokeWidth={3.2} />
    </>
  )

  const region = (b: Box, pad: number) => ({
    filterUnits: 'userSpaceOnUse' as const,
    x: b.x0 - pad,
    y: b.y0 - pad,
    width: b.x1 - b.x0 + pad * 2,
    height: b.y1 - b.y0 + pad * 2,
  })
  const all: Box = { x0: vb.x, y0: vb.y, x1: vb.x + vb.w, y1: vb.y + vb.h }

  return (
    <svg
      ref={svgRef}
      viewBox={`${vb.x} ${vb.y} ${vb.w} ${vb.h}`}
      aria-hidden="true"
      className="block w-full overflow-visible"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <defs>
        <filter id={`${uid}b1`} {...region(all, 0)}>
          <feGaussianBlur stdDeviation="6" />
        </filter>
        <filter id={`${uid}b2`} {...region(all, 0)}>
          <feGaussianBlur stdDeviation="20" />
        </filter>
        {tired.map((t, i) => (
          <g key={i}>
            <filter id={`${uid}t${i}b1`} {...region(t.box, 40)}>
              <feGaussianBlur stdDeviation="6" />
            </filter>
            <filter id={`${uid}t${i}b2`} {...region(t.box, 100)}>
              <feGaussianBlur stdDeviation="20" />
            </filter>
          </g>
        ))}
      </defs>

      {/* all glass, unlit: letters, stubs and the rail */}
      <path d={base} stroke="#5a6b64" strokeWidth={11.6} />
      <path d={base} stroke="#080d0b" strokeWidth={8.2} />
      <path d={base} stroke="#ffffff" strokeOpacity={0.17} strokeWidth={1.5} transform="translate(-1.7 -1.7)" />

      {/* the lit tubes */}
      <g className={reduce ? '' : 'neon-powerup'}>
        {strokeSet(lit, `${uid}b1`, `${uid}b2`)}
        {tired.map((t, i) => (
          <g
            key={i}
            ref={(el) => {
              tiredRefs.current[i] = el
            }}
          >
            {strokeSet(t.d, `${uid}t${i}b1`, `${uid}t${i}b2`)}
          </g>
        ))}
      </g>

      {/* where the tubes go through the plate */}
      {holes.map(([x, y]) => (
        <g key={`${x}-${y}`}>
          <circle cx={x} cy={y} r={15} fill="#55645e" />
          <circle cx={x} cy={y} r={11.5} fill="#030605" />
          <circle cx={x} cy={y} r={11.5} fill="none" stroke="#1d2825" strokeWidth={2} />
        </g>
      ))}
    </svg>
  )
}
