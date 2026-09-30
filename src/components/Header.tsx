import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { useLang } from '../i18n/LanguageContext'
import { FilmSwitch } from './FilmSwitch'

const SECTIONS = ['about', 'projects', 'contact'] as const
type SectionId = (typeof SECTIONS)[number]

export function Header({ visible, onOpenAi }: { visible: boolean; onOpenAi: () => void }) {
  const { t } = useLang()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState<SectionId | null>(null)

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24)
      if (window.scrollY < window.innerHeight * 0.4) setActive(null)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const els = SECTIONS.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[]
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id as SectionId)
      },
      { rootMargin: '-45% 0px -50% 0px' },
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const links: { id: SectionId | 'ai'; label: string }[] = [
    { id: 'about', label: t.nav.about },
    { id: 'projects', label: t.nav.projects },
    { id: 'ai', label: t.nav.ai },
    { id: 'contact', label: t.nav.contact },
  ]
  const openAi = (e: React.MouseEvent) => {
    e.preventDefault()
    setOpen(false)
    onOpenAi()
  }

  return (
    <motion.header
      className="fixed inset-x-0 top-0 z-50"
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : -12 }}
      transition={{ duration: 0.8, delay: visible ? 0.6 : 0 }}
      style={{ pointerEvents: visible ? 'auto' : 'none' }}
    >
      <div
        className="absolute inset-0 -z-10 transition-opacity duration-500"
        style={{
          opacity: scrolled || open ? 1 : 0,
          background: 'linear-gradient(180deg, rgb(11 7 8 / 0.94), rgb(11 7 8 / 0.78))',
          backdropFilter: 'blur(10px)',
          borderBottom: '1px solid rgb(209 173 102 / 0.18)',
        }}
      />
      <div
        className="mx-auto flex h-[68px] max-w-6xl items-center justify-between gap-4"
        style={{ paddingInline: 'calc(var(--drape-w) + 1rem)' }}
      >
        <a
          href="#top"
          aria-label={t.nav.home}
          className="flex items-center gap-3 rounded-md font-display text-lg font-semibold italic text-brass"
        >
          <span className="grid h-9 w-9 place-items-center rounded-full border border-brass/70 text-[0.95rem] not-italic tracking-wide">
            MK
          </span>
          <span className="hidden lg:inline">Maksymilian Kościelniak</span>
        </a>

        <nav aria-label={t.nav.label} className="hidden md:block">
          <ul className="flex items-center gap-8">
            {links.map((l) => (
              <li key={l.id}>
                <a
                  href={`#${l.id}`}
                  onClick={l.id === 'ai' ? openAi : undefined}
                  aria-haspopup={l.id === 'ai' ? 'dialog' : undefined}
                  aria-current={active === l.id ? 'true' : undefined}
                  className={`relative py-2 text-[1.05rem] transition-colors hover:text-brass ${
                    active === l.id ? 'text-brass' : 'text-bone-dim'
                  }`}
                >
                  {l.label}
                  <span
                    className={`absolute inset-x-0 -bottom-0.5 h-px origin-left bg-brass transition-transform duration-300 ${
                      active === l.id ? 'scale-x-100' : 'scale-x-0'
                    }`}
                  />
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <FilmSwitch />
          <button
            type="button"
            className="grid h-10 w-10 place-items-center rounded-md text-brass md:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? t.nav.closeMenu : t.nav.openMenu}
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            id="mobile-menu"
            aria-label={t.nav.label}
            className="overflow-hidden md:hidden"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <ul className="flex flex-col px-[calc(var(--drape-w)+1rem)] pb-5 pt-1">
              {links.map((l) => (
                <li key={l.id} className="border-t border-brass/15">
                  <a
                    href={`#${l.id}`}
                    onClick={l.id === 'ai' ? openAi : () => setOpen(false)}
                    className={`block py-3.5 font-display text-2xl italic ${
                      active === l.id ? 'text-brass' : 'text-bone'
                    }`}
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
