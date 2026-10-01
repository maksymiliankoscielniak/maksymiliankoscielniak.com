import { useLang } from '../i18n/LanguageContext'
import type { Lang } from '../i18n/copy'

const OPTIONS: Lang[] = ['en', 'pl']

/** Two-option language switch: plain text, the active language underlined. */
export function LangSwitch() {
  const { lang, setLang, t } = useLang()
  return (
    <div role="group" aria-label={t.lang.label} className="flex items-center gap-1 font-display text-[0.9rem] font-semibold">
      {OPTIONS.map((code, i) => {
        const active = lang === code
        return (
          <span key={code} className="flex items-center gap-1">
            {i > 0 && (
              <span aria-hidden="true" className="text-rule">
                /
              </span>
            )}
            <button
              type="button"
              lang={code}
              aria-pressed={active}
              aria-label={`${t.lang.switchTo} ${t.lang[code]}`}
              onClick={() => setLang(code)}
              className={`relative rounded px-1.5 py-1 transition-colors ${
                active ? 'text-ink' : 'text-muted hover:text-ink'
              }`}
            >
              {code.toUpperCase()}
              <span
                aria-hidden="true"
                className={`absolute inset-x-1.5 -bottom-px h-[2px] origin-left bg-accent transition-transform duration-300 ${
                  active ? 'scale-x-100' : 'scale-x-0'
                }`}
              />
            </button>
          </span>
        )
      })}
    </div>
  )
}
