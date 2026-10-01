import { site } from '../data/site'
import { useLang } from '../i18n/LanguageContext'

export function Footer({ onOpenAi }: { onOpenAi: () => void }) {
  const { t } = useLang()
  return (
    <footer className="border-t border-rule">
      <div className="mx-auto flex max-w-[1240px] flex-col gap-3 px-6 py-10 text-[0.95rem] text-muted md:flex-row md:items-center md:justify-between md:px-12">
        <p>
          © {new Date().getFullYear()} {site.name}. {t.footer.rights}
        </p>
        <p>{t.footer.built}</p>
        <button
          type="button"
          onClick={onOpenAi}
          aria-haspopup="dialog"
          className="link-underline self-start font-display font-medium text-ink"
        >
          {t.nav.ai}
        </button>
      </div>
    </footer>
  )
}
