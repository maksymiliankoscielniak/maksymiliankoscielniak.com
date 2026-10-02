import { useEffect, useRef, type CSSProperties } from 'react'

const MINT = '111, 240, 192'

type Node = { x: number; y: number; vx: number; vy: number; r: number; hot: boolean; phase: number }

/**
 * A slow network of mint points and hairline links, for the middle of the page.
 * Points drift, link up when they pass close to each other, and lean towards the pointer.
 * Runs only while visible; with reduced motion it renders one still frame.
 */
export function Constellation({ className = '', style }: { className?: string; style?: CSSProperties }) {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let w = 0
    let h = 0
    let raf = 0
    let running = false
    let visible = true
    let last = 0
    let t = 0
    let nodes: Node[] = []
    const pointer = { x: -9999, y: -9999, on: false }

    const seed = () => {
      const n = Math.round(Math.min(95, Math.max(26, (w * h) / 15000)))
      nodes = Array.from({ length: n }, () => {
        const a = Math.random() * Math.PI * 2
        const s = 5 + Math.random() * 11
        return {
          x: Math.random() * w,
          y: Math.random() * h,
          vx: Math.cos(a) * s,
          vy: Math.sin(a) * s,
          r: 1.1 + Math.random() * 1.2,
          hot: Math.random() < 0.12,
          phase: Math.random() * 6.28,
        }
      })
    }

    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const first = nodes.length === 0
      w = Math.max(1, Math.round(rect.width))
      h = Math.max(1, Math.round(rect.height))
      canvas.width = Math.round(w * dpr)
      canvas.height = Math.round(h * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      if (first || nodes.some((n) => n.x > w || n.y > h)) seed()
      draw()
    }

    const draw = () => {
      ctx.clearRect(0, 0, w, h)
      const link = w < 700 ? 110 : 160
      // links
      ctx.lineWidth = 1
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i]
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j]
          const dx = a.x - b.x
          const dy = a.y - b.y
          const d2 = dx * dx + dy * dy
          if (d2 > link * link) continue
          const k = 1 - Math.sqrt(d2) / link
          ctx.strokeStyle = `rgba(${MINT}, ${(k * 0.4).toFixed(3)})`
          ctx.beginPath()
          ctx.moveTo(a.x, a.y)
          ctx.lineTo(b.x, b.y)
          ctx.stroke()
        }
        if (pointer.on) {
          const dx = a.x - pointer.x
          const dy = a.y - pointer.y
          const d = Math.hypot(dx, dy)
          if (d < link * 1.3) {
            ctx.strokeStyle = `rgba(${MINT}, ${((1 - d / (link * 1.3)) * 0.55).toFixed(3)})`
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(pointer.x, pointer.y)
            ctx.stroke()
          }
        }
      }
      // points
      for (const n of nodes) {
        const pulse = 0.65 + 0.35 * Math.sin(t * 1.4 + n.phase)
        if (n.hot) {
          ctx.shadowColor = `rgba(${MINT}, 0.9)`
          ctx.shadowBlur = 12
          ctx.fillStyle = `rgba(${MINT}, ${(0.55 + 0.4 * pulse).toFixed(3)})`
          ctx.beginPath()
          ctx.arc(n.x, n.y, n.r + 1.1, 0, 6.2832)
          ctx.fill()
          ctx.shadowBlur = 0
        } else {
          ctx.fillStyle = `rgba(${MINT}, ${(0.34 + 0.34 * pulse).toFixed(3)})`
          ctx.beginPath()
          ctx.arc(n.x, n.y, n.r, 0, 6.2832)
          ctx.fill()
        }
      }
    }

    const frame = (now: number) => {
      if (!running) return
      const dt = Math.min(0.05, (now - last) / 1000 || 0.016)
      last = now
      t += dt
      for (const n of nodes) {
        if (pointer.on) {
          const dx = pointer.x - n.x
          const dy = pointer.y - n.y
          const d = Math.hypot(dx, dy)
          if (d < 220 && d > 1) {
            n.vx += (dx / d) * 14 * dt
            n.vy += (dy / d) * 14 * dt
          }
        }
        // keep the speed gentle
        const sp = Math.hypot(n.vx, n.vy)
        if (sp > 16) {
          n.vx *= 0.985
          n.vy *= 0.985
        }
        n.x += n.vx * dt
        n.y += n.vy * dt
        if (n.x < -10) n.x = w + 10
        else if (n.x > w + 10) n.x = -10
        if (n.y < -10) n.y = h + 10
        else if (n.y > h + 10) n.y = -10
      }
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
      const r = canvas.getBoundingClientRect()
      pointer.x = e.clientX - r.left
      pointer.y = e.clientY - r.top
      pointer.on = pointer.x >= 0 && pointer.x <= r.width && pointer.y >= 0 && pointer.y <= r.height
    }
    const onLeave = () => {
      pointer.on = false
    }
    const onVisibility = () => (document.hidden ? stop() : start())

    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting
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
  }, [])

  return <canvas ref={ref} aria-hidden="true" className={className} style={style} />
}
