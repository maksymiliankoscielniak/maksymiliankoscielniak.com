import { site } from '../data/site'
import { useLang } from '../i18n/LanguageContext'

export function Footer() {
  const { t } = useLang()
  return (
    <footer className="relative overflow-hidden bg-black pb-12 pt-4 text-center">
      <div aria-hidden="true" className="bulb-row mx-auto mb-10 h-4 w-64" />
      <p className="text-glow font-display text-6xl font-semibold italic text-brass sm:text-7xl">{t.footer.end}</p>
      <div className="mx-auto mt-14 max-w-xl px-[calc(var(--drape-w)+1.25rem)] text-sm text-bone-dim">
        <p>{t.footer.built}</p>
        <p className="mt-2">
          © {new Date().getFullYear()} {site.name}. {t.footer.rights}
        </p>
      </div>
    </footer>
  )
}
