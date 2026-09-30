import { useEffect, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'
import { useLang } from '../i18n/LanguageContext'

/**
 * AI policy as a prompter's box that rolls in from the side of the stage.
 * The script lists what the prompter (AI) does and what stays with me.
 */
export function AiPanel({ open, onClose }: { open: boolean; onClose: () => void }) {
  return <AnimatePresence>{open && <Booth onClose={onClose} />}</AnimatePresence>
}

function Booth({ onClose }: { onClose: () => void }) {
  const { t } = useLang()
  const panel = useRef<HTMLElement>(null)
  const closeBtn = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null
    document.body.classList.add('is-locked')
    closeBtn.current?.focus()

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
        return
      }
      if (e.key !== 'Tab' || !panel.current) return
      const focusables = panel.current.querySelectorAll<HTMLElement>('a[href], button:not([disabled])')
      if (!focusables.length) return
      const first = focusables[0]
      const last = focusables[focusables.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.classList.remove('is-locked')
      previous?.focus?.()
    }
  }, [onClose])

  return (
    <>
      <motion.div
        aria-hidden="true"
        className="fixed inset-0 z-[70] bg-black/75"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4 }}
        onClick={onClose}
      />
      <motion.aside
        ref={panel}
        role="dialog"
        aria-modal="true"
        aria-labelledby="ai-h"
        className="fixed inset-y-0 right-0 z-[75] w-full max-w-[640px] overflow-y-auto overscroll-contain"
        initial={{ x: '105%' }}
        animate={{ x: 0 }}
        exit={{ x: '105%' }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* the booth: a hooded shell with the script inside */}
        <div
          className="relative mx-3 mt-10 flex min-h-[calc(100%-2.5rem)] flex-col sm:mx-5 sm:mt-14 sm:min-h-[calc(100%-3.5rem)]"
          style={{
            borderRadius: '50% 50% 0 0 / 130px 130px 0 0',
            padding: '10px 10px 0',
            background: 'linear-gradient(180deg, #8a6a30, #4a3219 18%, #2e1d0f)',
            boxShadow: '0 0 80px rgb(255 207 122 / 0.14), -20px 0 60px rgb(0 0 0 / 0.7)',
          }}
        >
          <div
            className="relative flex-1 overflow-hidden px-7 pb-24 pt-28 sm:px-12 sm:pt-32"
            style={{
              borderRadius: '50% 50% 0 0 / 122px 122px 0 0',
              background:
                'radial-gradient(ellipse 70% 40% at 50% 0%, rgb(255 207 122 / 0.28), rgb(255 207 122 / 0.05) 60%, transparent 85%), linear-gradient(180deg, #120b07, #070405)',
              boxShadow: 'inset 0 10px 40px rgb(0 0 0 / 0.8)',
            }}
          >
            {/* lamp */}
            <div aria-hidden="true" className="absolute left-1/2 top-7 -translate-x-1/2 sm:top-9">
              <div className="mx-auto h-2 w-10 rounded-full bg-brass" />
              <div className="mx-auto h-3 w-3 -translate-y-px rounded-b-full bg-lamp shadow-[0_0_22px_10px_rgb(255_207_122/0.6)]" />
            </div>

            <header className="text-center">
              <h2 id="ai-h" className="text-glow font-display text-5xl font-semibold italic text-brass sm:text-6xl">
                {t.ai.heading}
              </h2>
              <p className="mt-4 font-display text-2xl text-bone">{t.ai.tagline}</p>
              <p className="mx-auto mt-4 max-w-[44ch] text-balance text-[1.05rem] text-bone-dim">{t.ai.intro}</p>
            </header>

            <div className="mt-12 font-script text-bone">
              <p className="mb-10 text-center text-sm font-bold text-brass">{t.ai.scene}</p>

              <div className="space-y-12">
                <Speaker
                  name={t.ai.prompterName}
                  direction={t.ai.prompterDirection}
                  lines={t.ai.prompterItems}
                  tone="text-bone/85 italic"
                  delay={0.7}
                />
                <Speaker
                  name={t.ai.actorName}
                  direction={t.ai.actorDirection}
                  lines={t.ai.actorItems}
                  tone="text-bone"
                  delay={1.5}
                />
              </div>

              <p className="mt-14 text-center text-sm italic text-brass">{t.ai.curtain}</p>
            </div>
          </div>

          {/* footlights along the bottom edge of the booth */}
          <div aria-hidden="true" className="relative -mx-[10px]">
            <div className="stage-floor h-12" />
            <div className="footlights absolute inset-x-0 top-3 h-4" />
          </div>
        </div>

        <button
          ref={closeBtn}
          type="button"
          onClick={onClose}
          aria-label={t.ai.close}
          className="fixed right-4 top-4 z-10 grid h-11 w-11 place-items-center rounded-full border border-brass/50 bg-stage/85 text-brass transition-colors hover:bg-brass hover:text-stage"
        >
          <X size={20} />
        </button>
      </motion.aside>
    </>
  )
}

function Speaker({
  name,
  direction,
  lines,
  tone,
  delay,
}: {
  name: string
  direction: string
  lines: string[]
  tone: string
  delay: number
}) {
  return (
    <div>
      <p className="text-center text-base font-bold text-brass">{name.toUpperCase()}</p>
      <p className="text-center text-sm italic text-bone-dim">{direction}</p>
      <ul className="mx-auto mt-5 max-w-[38ch] space-y-4">
        {lines.map((line, i) => (
          <motion.li
            key={line}
            className={`text-[0.98rem] leading-[1.7] sm:text-base ${tone}`}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: delay + i * 0.14 }}
          >
            {line}
          </motion.li>
        ))}
      </ul>
    </div>
  )
}
