import { useCallback, useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useLang } from '../i18n/LanguageContext'
import { drapeWidth } from './drapeWidth'

type Phase = 'closed' | 'opening' | 'done'

const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

/**
 * Opening curtain. Two velvet halves gather toward the screen edges and end up
 * exactly where the permanent side drapes sit, then unmount.
 */
export function Curtain({ onOpen, onDone }: { onOpen: () => void; onDone: () => void }) {
  const { t } = useLang()
  const [phase, setPhase] = useState<Phase>(() => (prefersReducedMotion() ? 'done' : 'closed'))
  const [target, setTarget] = useState(0.1)

  const open = useCallback(() => {
    setPhase((p) => {
      if (p !== 'closed') return p
      const w = window.innerWidth
      setTarget(drapeWidth(w) / (w / 2))
      return 'opening'
    })
  }, [])

  // always start a visit at the top of the stage (unless deep-linking)
  useEffect(() => {
    if ('scrollRestoration' in window.history) window.history.scrollRestoration = 'manual'
    if (!window.location.hash) window.scrollTo(0, 0)
  }, [])

  // lock scrolling while the curtain is down
  useEffect(() => {
    document.body.classList.toggle('is-locked', phase !== 'done')
    return () => document.body.classList.remove('is-locked')
  }, [phase])

  // reduced motion: skip the show
  useEffect(() => {
    if (phase === 'done' && prefersReducedMotion()) {
      onOpen()
      onDone()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // the curtain only opens when the visitor asks for it: click, tap, Enter or Space
  useEffect(() => {
    if (phase !== 'closed') return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        open()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [phase, open])

  useEffect(() => {
    if (phase === 'opening') onOpen()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase])

  if (phase === 'done') return null

  const opening = phase === 'opening'
  const ease = [0.6, 0, 0.25, 1] as const
  const panel = { duration: 3.2, ease }

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 z-[100] cursor-pointer select-none overflow-hidden"
      onClick={open}
    >
      <motion.div
        className="velvet absolute inset-y-0 left-0 w-[50.3%] origin-left"
        initial={{ scaleX: 1 }}
        animate={{ scaleX: opening ? target : 1 }}
        transition={panel}
        onAnimationComplete={() => {
          if (opening) {
            setPhase('done')
            onDone()
          }
        }}
        style={{ boxShadow: '14px 0 40px rgb(0 0 0 / 0.6)' }}
      />
      <motion.div
        className="velvet absolute inset-y-0 right-0 w-[50.3%] origin-right"
        initial={{ scaleX: 1 }}
        animate={{ scaleX: opening ? target : 1 }}
        transition={{ ...panel, delay: 0.07 }}
        style={{ boxShadow: '-14px 0 40px rgb(0 0 0 / 0.6)' }}
      />

      {/* swagged valance: lifts away together with the curtains, same pace */}
      <motion.div
        className="absolute inset-x-0 top-0"
        initial={{ y: 0 }}
        animate={{ y: opening ? '-112%' : 0 }}
        transition={{ duration: 2.9, delay: opening ? 0.2 : 0, ease }}
        style={{ filter: 'drop-shadow(0 12px 14px rgb(0 0 0 / 0.65))' }}
      >
        <Valance />
      </motion.div>

      {/* the name, signed on the curtain */}
      <AnimatePresence>
        {!opening && (
          <motion.div
            key="title"
            className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center px-6 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, filter: 'blur(6px)' }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.p
              className="font-signature text-glow text-[clamp(3.2rem,11vw,7.5rem)] leading-[1.05] text-brass"
              initial={{ clipPath: 'inset(-30% 100% -40% -5%)' }}
              animate={{ clipPath: 'inset(-30% -10% -40% -5%)' }}
              transition={{ duration: 2.2, delay: 0.5, ease: [0.45, 0, 0.25, 1] }}
            >
              Maksymilian
              <br />
              Kościelniak
            </motion.p>
            <motion.div
              className="mt-8 h-px w-28 origin-center bg-brass/60"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1, delay: 2.4 }}
            />
            <motion.p
              className="mt-6 font-script text-sm tracking-wide text-bone-dim"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.9, 0.5, 0.9] }}
              transition={{ duration: 2.6, delay: 2.6, times: [0, 0.25, 0.65, 1], repeat: Infinity, repeatType: 'mirror' }}
            >
              {t.curtain.hint}
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

/** Scalloped velvet swags with a brass rail and fringe, tiled across the full width. */
function Valance() {
  return (
    <svg className="block h-[90px] w-full" aria-hidden="true">
      <defs>
        <linearGradient id="vl-fold" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stopColor="#2e050e" />
          <stop offset="0.24" stopColor="#7a1226" />
          <stop offset="0.5" stopColor="#a8263f" />
          <stop offset="0.78" stopColor="#7a1226" />
          <stop offset="1" stopColor="#2e050e" />
        </linearGradient>
        <linearGradient id="vl-shade" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#000" stopOpacity="0.55" />
          <stop offset="0.4" stopColor="#000" stopOpacity="0" />
          <stop offset="1" stopColor="#000" stopOpacity="0.3" />
        </linearGradient>
        <linearGradient id="vl-brass" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#f0d99a" />
          <stop offset="0.5" stopColor="#d1ad66" />
          <stop offset="1" stopColor="#7d6535" />
        </linearGradient>
        <pattern id="vl-swag" width="96" height="90" patternUnits="userSpaceOnUse">
          <path d="M0 0H96V38Q48 118 0 38Z" fill="url(#vl-fold)" />
          <path d="M0 0H96V38Q48 118 0 38Z" fill="url(#vl-shade)" />
          <path d="M0 38Q48 118 96 38" fill="none" stroke="#d1ad66" strokeWidth="2.2" />
          <path d="M0 43Q48 123 96 43" fill="none" stroke="#d1ad66" strokeWidth="7" strokeDasharray="1.4 3.2" opacity="0.85" />
        </pattern>
      </defs>
      <rect width="100%" height="90" fill="url(#vl-swag)" />
      <rect width="100%" height="9" fill="url(#vl-brass)" />
      <rect y="9" width="100%" height="2" fill="#000" opacity="0.35" />
    </svg>
  )
}
