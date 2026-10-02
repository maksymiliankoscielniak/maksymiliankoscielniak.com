import { useEffect, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'
import { useLang } from '../i18n/LanguageContext'

/** The AI policy as a drawer that slides in from the right edge. */
export function AiPanel({ open, onClose }: { open: boolean; onClose: () => void }) {
  return <AnimatePresence>{open && <Drawer onClose={onClose} />}</AnimatePresence>
}

function Drawer({ onClose }: { onClose: () => void }) {
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
        className="fixed inset-0 z-[70] bg-black/65"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        onClick={onClose}
      />
      <motion.aside
        ref={panel}
        role="dialog"
        aria-modal="true"
        aria-labelledby="ai-h"
        className="fixed inset-y-0 right-0 z-[75] w-full max-w-[540px] overflow-y-auto overscroll-contain bg-paper border-l border-rule shadow-[-30px_0_60px_-30px_rgb(0_0_0/0.9)]"
        initial={{ x: '102%' }}
        animate={{ x: 0 }}
        exit={{ x: '102%' }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="px-7 pb-16 pt-24 sm:px-12">
          <h2 id="ai-h" className="text-[clamp(2.5rem,6vw,3.4rem)] font-semibold leading-none tracking-[-0.035em]">
            {t.ai.heading}
          </h2>
          <p className="mt-6 max-w-[42ch] text-[1.15rem] text-body">{t.ai.intro}</p>

          <h3 className="mt-12 font-display text-[1.05rem] font-semibold">{t.ai.helpsTitle}</h3>
          <ul className="mt-4 divide-y divide-rule border-y border-rule">
            {t.ai.helps.map((line) => (
              <li key={line} className="py-3.5 text-[1.05rem] text-body">
                {line}
              </li>
            ))}
          </ul>

          <h3 className="mt-12 font-display text-[1.05rem] font-semibold">{t.ai.ownTitle}</h3>
          <ul className="mt-4 space-y-3.5 border-l-2 border-accent pl-5">
            {t.ai.own.map((line) => (
              <li key={line} className="text-[1.05rem] text-ink">
                {line}
              </li>
            ))}
          </ul>
        </div>

        <button
          ref={closeBtn}
          type="button"
          onClick={onClose}
          aria-label={t.ai.close}
          className="fixed right-4 top-4 z-10 grid h-11 w-11 place-items-center rounded-full border border-rule bg-sheet text-ink transition-colors hover:border-ink hover:bg-ink hover:text-paper"
        >
          <X size={20} />
        </button>
      </motion.aside>
    </>
  )
}
