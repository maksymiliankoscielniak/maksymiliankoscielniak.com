import { AnimatePresence, motion } from 'framer-motion'
import { DoorOpen } from 'lucide-react'
import { useLang } from '../i18n/LanguageContext'

/**
 * A small stage door on the right-hand edge of the page. It leads to the
 * prompter's box (the AI policy), which stays off the main page.
 */
export function AiDoor({ visible, onOpen }: { visible: boolean; onOpen: () => void }) {
  const { t } = useLang()

  return (
    <AnimatePresence>
      {visible && (
        <>
          {/* desktop: vertical plaque on the edge */}
          <motion.button
            key="door-desktop"
            type="button"
            onClick={onOpen}
            aria-haspopup="dialog"
            className="group fixed z-[45] hidden flex-col items-center gap-3 rounded-l-[26px] border border-r-0 border-brass/55 px-2.5 pb-5 pt-4 md:flex"
            style={{
              right: 'calc(var(--drape-w) - 6px)',
              top: '50%',
              y: '-50%',
              background: 'linear-gradient(90deg, #3a2416, #2a170c)',
              boxShadow: '0 0 28px rgb(255 207 122 / 0.14), 0 10px 30px rgb(0 0 0 / 0.6)',
            }}
            initial={{ x: 70, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 70, opacity: 0 }}
            whileHover={{ x: -6 }}
            transition={{ type: 'spring', stiffness: 220, damping: 22, delay: 0.4 }}
          >
            <DoorOpen size={18} className="text-brass" aria-hidden="true" />
            <span
              className="font-script text-sm font-bold tracking-wide text-brass"
              style={{ writingMode: 'vertical-rl' }}
            >
              {t.nav.ai}
            </span>
            <span
              aria-hidden="true"
              className="block h-2.5 w-2.5 rounded-full bg-lamp shadow-[0_0_10px_3px_rgb(255_207_122/0.55)] transition-shadow group-hover:shadow-[0_0_16px_6px_rgb(255_207_122/0.75)]"
            />
          </motion.button>

          {/* mobile: compact door in the corner */}
          <motion.button
            key="door-mobile"
            type="button"
            onClick={onOpen}
            aria-haspopup="dialog"
            className="fixed z-[45] flex items-center gap-2 rounded-full border border-brass/60 py-2 pl-3 pr-4 font-script text-sm font-bold text-brass md:hidden"
            style={{
              right: 'calc(var(--drape-w) + 0.75rem)',
              bottom: '1rem',
              background: 'linear-gradient(90deg, #3a2416, #2a170c)',
              boxShadow: '0 0 22px rgb(255 207 122 / 0.14), 0 8px 24px rgb(0 0 0 / 0.6)',
            }}
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 30, opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <DoorOpen size={16} aria-hidden="true" />
            {t.nav.ai}
          </motion.button>
        </>
      )}
    </AnimatePresence>
  )
}
