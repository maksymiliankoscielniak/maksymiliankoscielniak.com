import { useEffect, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ExternalLink, X } from 'lucide-react'
import type { Project } from '../data/projects'
import { useLang } from '../i18n/LanguageContext'
import { PosterArt } from './PosterArt'

export function PosterModal({
  project,
  onClose,
}: {
  project: Project | null
  onClose: () => void
}) {
  return (
    <AnimatePresence>{project && <Dialog key={project.id} project={project} onClose={onClose} />}</AnimatePresence>
  )
}

function Dialog({ project, onClose }: { project: Project; onClose: () => void }) {
  const { lang, t } = useLang()
  const panel = useRef<HTMLDivElement>(null)
  const closeBtn = useRef<HTMLButtonElement>(null)
  const links = project.links.filter((l) => l.href)

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
    <motion.div
      className="fixed inset-0 z-[80] flex items-center justify-center overflow-y-auto p-4 sm:p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
      style={{ background: 'radial-gradient(ellipse at 50% 30%, rgb(58 7 18 / 0.85), rgb(6 3 4 / 0.96))', backdropFilter: 'blur(6px)' }}
    >
      <motion.div
        ref={panel}
        role="dialog"
        aria-modal="true"
        aria-label={`${t.projects.modal.posterOf} ${project.title}`}
        className="relative my-auto grid w-full max-w-4xl gap-8 md:grid-cols-[minmax(0,320px)_1fr] md:gap-12"
        initial={{ opacity: 0, y: 24, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 12, scale: 0.98 }}
        transition={{ duration: 0.35, ease: [0.2, 0.8, 0.2, 1] }}
      >
        <div
          className="relative mx-auto aspect-[3/4] w-full max-w-[320px] rounded-[3px] p-[7px]"
          style={{
            background: 'linear-gradient(135deg, #e7c77f, #9c7a35 50%, #d1ad66)',
            boxShadow: '0 30px 70px rgb(0 0 0 / 0.75), 0 0 60px rgb(209 173 102 / 0.12)',
          }}
        >
          <div className="relative h-full w-full overflow-hidden rounded-[1px]">
            <PosterArt project={project} lang={lang} className="absolute inset-0 h-full w-full" />
          </div>
        </div>

        <div className="flex flex-col justify-center pb-2">
          <p className="font-script text-sm text-brass">
            {t.projects.modal.genre}: {project.genre[lang]}
          </p>
          <h3 className="mt-2 font-display text-4xl font-semibold leading-tight text-bone sm:text-5xl">{project.title}</h3>
          <p className="mt-3 text-xl italic text-brass">{project.tagline[lang]}</p>
          <p className="mt-6 max-w-[60ch] text-[1.1rem] leading-[1.75] text-bone/90">{project.description[lang]}</p>

          <dl className="mt-7">
            <dt className="font-display text-lg italic text-brass">{t.projects.modal.cast}</dt>
            <dd className="mt-1 text-bone">{project.stack.join(', ')}</dd>
          </dl>

          <div className="mt-8">
            <p className="font-display text-lg italic text-brass">{t.projects.modal.links}</p>
            {links.length ? (
              <ul className="mt-3 flex flex-wrap gap-3">
                {links.map((l) => (
                  <li key={l.href}>
                    <a
                      href={l.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full border border-brass/70 px-5 py-2.5 text-bone transition-colors hover:bg-brass hover:text-stage"
                    >
                      {l.label[lang]}
                      <ExternalLink size={16} aria-hidden="true" />
                    </a>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-2 text-bone-dim">{t.projects.modal.noLinks}</p>
            )}
          </div>
        </div>

        <button
          ref={closeBtn}
          type="button"
          onClick={onClose}
          aria-label={t.projects.modal.close}
          className="absolute -top-1 right-0 grid h-11 w-11 place-items-center rounded-full border border-brass/50 bg-stage/80 text-brass transition-colors hover:bg-brass hover:text-stage md:-right-4 md:-top-4"
        >
          <X size={20} />
        </button>
      </motion.div>
    </motion.div>
  )
}
