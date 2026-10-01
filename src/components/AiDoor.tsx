import { AnimatePresence, motion } from 'framer-motion'
import { useLang } from '../i18n/LanguageContext'

/**
 * A quiet tab on the right-hand edge of the page. It opens the AI policy,
 * which stays off the main page. On small screens it is a small pill instead.
 */
export function AiDoor({
  visible,
  hideMobile = false,
  onOpen,
}: {
  visible: boolean
  /** hide the small-screen pill (e.g. once the footer link is on screen) */
  hideMobile?: boolean
  onOpen: () => void
}) {
  const { t } = useLang()

  return (
    <AnimatePresence>
      {visible && (
        <>
          <motion.button
            key="tab-desktop"
            type="button"
            onClick={onOpen}
            aria-haspopup="dialog"
            className="fixed right-0 top-1/2 z-[45] hidden rounded-l-xl bg-ink px-2.5 py-5 font-display text-[0.88rem] font-semibold tracking-[0.02em] text-paper transition-colors hover:bg-accent md:block"
            style={{ y: '-50%', writingMode: 'vertical-rl' }}
            initial={{ x: 48, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 48, opacity: 0 }}
            whileHover={{ x: -4 }}
            transition={{ type: 'spring', stiffness: 220, damping: 24, delay: 1.8 }}
          >
            {t.nav.ai}
          </motion.button>

          {!hideMobile && (
          <motion.button
            key="tab-mobile"
            type="button"
            onClick={onOpen}
            aria-haspopup="dialog"
            className="fixed bottom-4 right-4 z-[45] rounded-full bg-ink px-4 py-2.5 font-display text-[0.9rem] font-semibold text-paper shadow-[0_6px_20px_-8px_rgb(30_33_40/0.6)] md:hidden"
            initial={{ y: 24, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 24, opacity: 0 }}
            transition={{ duration: 0.4, delay: 1.8 }}
          >
            {t.nav.ai}
          </motion.button>
          )}
        </>
      )}
    </AnimatePresence>
  )
}
