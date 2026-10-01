import type { ElementType } from 'react'
import { motion } from 'framer-motion'

/**
 * A dimension line, the way it is drawn on a technical sketch: a ruled line with
 * end ticks and a caption sitting in a gap. It names whatever it sits above.
 */
export function Dimension({
  label,
  as: Tag = 'p',
  draw = false,
  delay = 0,
  className = '',
}: {
  label: string
  as?: ElementType
  /** animate the lines growing in from the ends (used once, in the hero) */
  draw?: boolean
  delay?: number
  className?: string
}) {
  return (
    <div className={`flex items-center gap-4 text-muted ${className}`}>
      <Rule side="start" draw={draw} delay={delay} />
      <Tag className="max-w-[80%] text-center font-display text-[0.95rem] font-medium leading-snug tracking-[0.01em]">
        {draw ? (
          <motion.span
            className="inline-block"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: delay + 0.5 }}
          >
            {label}
          </motion.span>
        ) : (
          label
        )}
      </Tag>
      <Rule side="end" draw={draw} delay={delay} />
    </div>
  )
}

function Rule({ side, draw, delay }: { side: 'start' | 'end'; draw: boolean; delay: number }) {
  const cls = `dim-line dim-line-${side}`
  if (!draw) return <span aria-hidden="true" className={cls} />
  return (
    <motion.span
      aria-hidden="true"
      className={cls}
      style={{ transformOrigin: side === 'start' ? 'left' : 'right' }}
      initial={{ scaleX: 0 }}
      animate={{ scaleX: 1 }}
      transition={{ duration: 1.2, delay, ease: [0.3, 0.7, 0.2, 1] }}
    />
  )
}
