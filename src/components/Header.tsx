import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { useLang } from '../i18n/LanguageContext'
import { LangSwitch } from './LangSwitch'

const SECTIONS = ['projects', 'about', 'contact'] as const
type SectionId = (typeof SECTIONS)[number]

export function Header() {
  const { t } = useLang()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState<SectionId | null>(null)

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 8)
      if (window.scrollY < window.innerHeight * 0.3) setActive(null)
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
      { rootMargin: '-40% 0px -55% 0px' },
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

  const links: { id: SectionId; label: string }[] = [
    { id: 'projects', label: t.nav.projects },
    { id: 'about', label: t.nav.about },
    { id: 'contact', label: t.nav.contact },
  ]

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 border-b transition-[background-color,border-color,backdrop-filter] duration-300"
        style={{
          backgroundColor: scrolled || open ? 'rgb(244 245 242 / 0.88)' : 'rgb(244 245 242 / 0)',
          borderColor: scrolled || open ? 'var(--color-rule)' : 'transparent',
          backdropFilter: scrolled || open ? 'blur(12px)' : 'none',
        }}
      />
      <div className="mx-auto grid h-[68px] max-w-[1240px] grid-cols-[1fr_auto] items-center gap-4 px-6 md:grid-cols-[1fr_auto_1fr] md:px-12">
        <a
          href="#top"
          aria-label={t.nav.home}
          className="justify-self-start rounded font-display text-[1.05rem] font-semibold tracking-tight text-ink"
        >
          <span className="whitespace-nowrap">
            <span className="hidden sm:inline">Maksymilian </span>
            <span className="sm:hidden">M. </span>
            Kościelniak
          </span>
        </a>

        <nav aria-label={t.nav.label} className="hidden justify-self-center md:block">
          <ul className="flex items-center gap-9">
            {links.map((l) => (
              <li key={l.id}>
                <a
                  href={`#${l.id}`}
                  aria-current={active === l.id ? 'true' : undefined}
                  className={`relative py-2 font-display text-[0.95rem] font-medium transition-colors hover:text-ink ${
                    active === l.id ? 'text-ink' : 'text-muted'
                  }`}
                >
                  {l.label}
                  <span
                    aria-hidden="true"
                    className={`absolute inset-x-0 -bottom-px h-[2px] origin-left bg-accent transition-transform duration-300 ${
                      active === l.id ? 'scale-x-100' : 'scale-x-0'
                    }`}
                  />
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-3 justify-self-end">
          <LangSwitch />
          <button
            type="button"
            className="grid h-10 w-10 place-items-center rounded-md text-ink md:hidden"
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
            transition={{ duration: 0.25 }}
          >
            <ul className="flex flex-col px-6 pb-5 pt-1">
              {links.map((l) => (
                <li key={l.id} className="border-t border-rule">
                  <a
                    href={`#${l.id}`}
                    onClick={() => setOpen(false)}
                    className={`block py-3.5 font-display text-2xl font-semibold tracking-tight ${
                      active === l.id ? 'text-accent' : 'text-ink'
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
    </header>
  )
}
