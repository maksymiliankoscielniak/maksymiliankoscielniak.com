import { useEffect, useRef, type CSSProperties } from 'react'

const BG = '#060908'
const MINT = '111, 240, 192'

/**
 * A slowly moving field of mint ridgelines drawn on a canvas.
 * Lines further back are fainter and hidden behind the ones in front,
 * and the surface swells gently towards the pointer.
 * Runs only while visible; with reduced motion it renders one still frame.
 */
export function HeroField({
  className = '',
  style,
  top: topFrac = 0.1,
  topSmall = 0.28,
  bottom: bottomFrac = 1.02,
  amp: ampScale = 1,
  alpha: alphaScale = 1,
}: {
  className?: string
  style?: CSSProperties
  /** where the farthest ridge sits, as a fraction of the height (wide / narrow screens) */
  top?: number
  topSmall?: number
  /** where the nearest ridge sits, as a fraction of the height */
  bottom?: number
  /** multipliers for ridge height and line opacity */
  amp?: number
  alpha?: number
}) {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let w = 0
    let h = 0
    let dpr = 1
    let raf = 0
    let running = false
    let visible = true
    let t = 12
    let last = 0
    const pointer = { x: 0.5, y: 0.5, tx: 0.5, ty: 0.5, power: 0, tpower: 0 }

    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      w = Math.max(1, Math.round(rect.width))
      h = Math.max(1, Math.round(rect.height))
      canvas.width = Math.round(w * dpr)
      canvas.height = Math.round(h * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      draw()
    }

    const draw = () => {
      ctx.clearRect(0, 0, w, h)
      const small = w < 700
      const rows = small ? 26 : 42
      const step = small ? 9 : 7
      const top = h * (small ? topSmall : topFrac)
      const bottom = h * bottomFrac
      const gap = (bottom - top) / (rows - 1)
      const cols = Math.ceil(w / step) + 1
      const aspect = w / h

      ctx.lineJoin = 'round'
      for (let r = 0; r < rows; r++) {
        const depth = r / (rows - 1) // 0 far, 1 near
        const baseY = top + r * gap
        const amp = gap * (1.2 + depth * 4.4) * ampScale
        const ys = new Float32Array(cols)
        for (let i = 0; i < cols; i++) {
          const nx = i / (cols - 1)
          const ux = nx * aspect * 1.6
          const uy = depth * 3.1
          let n =
            Math.sin(ux * 2.1 + t * 0.32 + uy * 1.9) * 0.5 +
            Math.sin(ux * 4.6 - t * 0.41 + uy * 0.7) * 0.28 +
            Math.sin(ux * 8.9 + t * 0.57 - uy * 2.7) * 0.12
          // swell towards the right, calm on the left where the headline sits
          const env = 0.18 + 0.82 * smooth(0.12, 0.85, nx)
          n = (n + 0.55) * env
          // pointer swell
          const dx = (nx - pointer.x) * aspect
          const dy = (baseY / h - pointer.y) * 1.2
          const bump = Math.exp(-(dx * dx + dy * dy) * 14) * pointer.power
          ys[i] = baseY - amp * (n + bump * 0.9)
        }

        // hide whatever is behind this line, then draw the ridge itself
        ctx.beginPath()
        ctx.moveTo(0, ys[0])
        for (let i = 1; i < cols; i++) ctx.lineTo((i / (cols - 1)) * w, ys[i])
        ctx.lineTo(w, h + 4)
        ctx.lineTo(0, h + 4)
        ctx.closePath()
        ctx.fillStyle = BG
        ctx.fill()

        ctx.beginPath()
        ctx.moveTo(0, ys[0])
        for (let i = 1; i < cols; i++) ctx.lineTo((i / (cols - 1)) * w, ys[i])
        ctx.strokeStyle = `rgba(${MINT}, ${((0.1 + depth * depth * 0.72) * alphaScale).toFixed(3)})`
        ctx.lineWidth = 0.8 + depth * 0.7
        ctx.stroke()
      }
    }

    const frame = (now: number) => {
      if (!running) return
      const dt = Math.min(0.05, (now - last) / 1000 || 0.016)
      last = now
      t += dt
      pointer.x += (pointer.tx - pointer.x) * 0.06
      pointer.y += (pointer.ty - pointer.y) * 0.06
      pointer.power += (pointer.tpower - pointer.power) * 0.05
      draw()
      raf = requestAnimationFrame(frame)
    }

    const start = () => {
      if (reduce || running || !visible || document.hidden) return
      running = true
      last = performance.now()
      raf = requestAnimationFrame(frame)
    }
    const stop = () => {
      running = false
      cancelAnimationFrame(raf)
    }

    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect()
      pointer.tx = (e.clientX - rect.left) / rect.width
      pointer.ty = (e.clientY - rect.top) / rect.height
      pointer.tpower = pointer.ty >= 0 && pointer.ty <= 1 ? 0.55 : 0
    }
    const onLeave = () => {
      pointer.tpower = 0
    }
    const onVisibility = () => (document.hidden ? stop() : start())

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      if (visible) start()
      else stop()
    })
    const ro = new ResizeObserver(resize)

    ro.observe(canvas)
    io.observe(canvas)
    resize()
    start()
    if (!reduce) {
      window.addEventListener('pointermove', onMove, { passive: true })
      document.addEventListener('pointerleave', onLeave)
    }
    document.addEventListener('visibilitychange', onVisibility)

    return () => {
      stop()
      io.disconnect()
      ro.disconnect()
      window.removeEventListener('pointermove', onMove)
      document.removeEventListener('pointerleave', onLeave)
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [topFrac, topSmall, bottomFrac, ampScale, alphaScale])

  return <canvas ref={ref} aria-hidden="true" className={className} style={style} />
}

function smooth(a: number, b: number, x: number) {
  const k = Math.min(1, Math.max(0, (x - a) / (b - a)))
  return k * k * (3 - 2 * k)
}
