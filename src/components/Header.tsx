import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { useLang } from '../i18n/LanguageContext'
import { FilmSwitch } from './FilmSwitch'

const SECTIONS = ['about', 'projects', 'contact'] as const
type SectionId = (typeof SECTIONS)[number]

export function Header({ visible }: { visible: boolean }) {
  const { t } = useLang()
  const reduce = useReducedMotion()
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

  const links: { id: SectionId; label: string }[] = [
    { id: 'about', label: t.nav.about },
    { id: 'projects', label: t.nav.projects },
    { id: 'contact', label: t.nav.contact },
  ]

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
          background: 'linear-gradient(180deg, rgb(11 7 8 / 0.98), rgb(11 7 8 / 0.94))',
          backdropFilter: 'blur(10px)',
          borderBottom: '1px solid rgb(209 173 102 / 0.18)',
        }}
      />
      <div
        className="mx-auto grid h-[68px] max-w-6xl grid-cols-[1fr_auto] items-center gap-4 md:grid-cols-[1fr_auto_1fr]"
        style={{ paddingInline: 'calc(var(--drape-w) + 1rem)' }}
      >
        <a
          href="#top"
          aria-label={t.nav.home}
          className="group relative justify-self-start rounded-md py-1 text-brass"
        >
          <motion.span
            className="relative inline-block -rotate-2 whitespace-nowrap px-1 font-signature text-[1.9rem] leading-none sm:text-[2.3rem]"
            initial={false}
            animate={{
              clipPath: reduce || visible ? 'inset(-40% -15% -60% -10%)' : 'inset(-40% 100% -60% -10%)',
            }}
            transition={{ duration: reduce ? 0 : 1.7, delay: visible ? 1.0 : 0, ease: [0.45, 0, 0.25, 1] }}
            style={{ textShadow: '0 0 18px rgb(209 173 102 / 0.28)' }}
          >
            <span className="hidden sm:inline">Maksymilian </span>
            <span className="sm:hidden">M. </span>
            Kościelniak
          </motion.span>
          <svg
            aria-hidden="true"
            viewBox="0 0 200 10"
            preserveAspectRatio="none"
            className="absolute inset-x-1 -bottom-0.5 h-[7px] w-[calc(100%-0.5rem)] opacity-70 transition-opacity group-hover:opacity-100"
          >
            <path d="M1 7 C40 1 110 9 199 2" fill="none" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
          </svg>
        </a>

        <nav aria-label={t.nav.label} className="hidden justify-self-center md:block">
          <ul className="flex items-center gap-8">
            {links.map((l) => (
              <li key={l.id}>
                <a
                  href={`#${l.id}`}
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

        <div className="flex items-center gap-2 justify-self-end">
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
                    onClick={() => setOpen(false)}
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
