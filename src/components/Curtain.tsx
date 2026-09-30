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

  // auto-open shortly after load, or as soon as the visitor asks for it
  useEffect(() => {
    if (phase !== 'closed') return
    const timer = window.setTimeout(open, 1500)
    const onKey = () => open()
    window.addEventListener('keydown', onKey)
    return () => {
      window.clearTimeout(timer)
      window.removeEventListener('keydown', onKey)
    }
  }, [phase, open])

  useEffect(() => {
    if (phase === 'opening') onOpen()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase])

  if (phase === 'done') return null

  const opening = phase === 'opening'
  const ease = [0.65, 0, 0.25, 1] as const
  const panel = { duration: 2.6, ease }

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
        transition={panel}
        style={{ boxShadow: '-14px 0 40px rgb(0 0 0 / 0.6)' }}
      />

      {/* pelmet with brass trim */}
      <motion.div
        className="absolute inset-x-0 top-0 h-14"
        initial={{ y: 0 }}
        animate={{ y: opening ? '-110%' : 0 }}
        transition={{ duration: 1, delay: opening ? 1.8 : 0, ease: 'easeIn' }}
      >
        <div className="velvet h-full w-full" style={{ boxShadow: '0 10px 30px rgb(0 0 0 / 0.7)' }} />
        <div className="absolute inset-x-0 bottom-0 h-[3px] bg-brass" />
        <div className="bulb-row absolute inset-x-0 -bottom-2 h-3 opacity-80" />
      </motion.div>

      {/* house lights: name on the curtain */}
      <AnimatePresence>
        {!opening && (
          <motion.div
            key="title"
            className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center px-6 text-center"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, filter: 'blur(6px)' }}
            transition={{ duration: 0.9, delay: 0.25 }}
          >
            <div className="mb-5 h-px w-24 bg-brass/70" />
            <p className="font-display text-glow text-[clamp(1.6rem,5vw,3.4rem)] font-semibold italic leading-tight text-brass">
              Maksymilian
              <br />
              Kościelniak
            </p>
            <div className="mt-5 h-px w-24 bg-brass/70" />
            <p className="mt-8 font-script text-sm text-bone-dim/80">{t.curtain.hint}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
