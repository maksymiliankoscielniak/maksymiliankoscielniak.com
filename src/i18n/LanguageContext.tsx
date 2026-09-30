import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import { dictionaries, type Dict, type Lang } from './copy'

const STORAGE_KEY = 'mk-lang'

type Ctx = {
  lang: Lang
  t: Dict
  setLang: (l: Lang) => void
  /** increments on every change so visual effects can key off it */
  changes: number
}

const LanguageContext = createContext<Ctx | null>(null)

function readStored(): Lang {
  // Default language is English. Only an explicit earlier choice overrides it.
  try {
    const v = window.localStorage.getItem(STORAGE_KEY)
    if (v === 'pl' || v === 'en') return v
  } catch {
    /* storage unavailable */
  }
  return 'en'
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(readStored)
  const [changes, setChanges] = useState(0)

  const setLang = useCallback(
    (l: Lang) => {
      if (l === lang) return
      setLangState(l)
      setChanges((c) => c + 1)
    },
    [lang],
  )

  useEffect(() => {
    document.documentElement.lang = lang
    document.title = dictionaries[lang].meta.title
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute('content', dictionaries[lang].meta.description)
    try {
      window.localStorage.setItem(STORAGE_KEY, lang)
    } catch {
      /* storage unavailable */
    }
  }, [lang])

  const value = useMemo(() => ({ lang, t: dictionaries[lang], setLang, changes }), [lang, setLang, changes])
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLang() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLang must be used inside <LanguageProvider>')
  return ctx
}
