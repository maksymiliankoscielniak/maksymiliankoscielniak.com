import { AnimatePresence, motion } from 'framer-motion'
import { useLang } from '../i18n/LanguageContext'

/** A quick projector flicker across the page whenever the language changes. */
export function FrameFlash() {
  const { changes } = useLang()
  return (
    <AnimatePresence>
      {changes > 0 && (
        <motion.div
          key={changes}
          aria-hidden="true"
          className="pointer-events-none fixed inset-0 z-[90] bg-bone motion-reduce:hidden"
          initial={{ opacity: 0.32 }}
          animate={{ opacity: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45, ease: 'easeOut' }}
        />
      )}
    </AnimatePresence>
  )
}
