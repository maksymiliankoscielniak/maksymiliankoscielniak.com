import { useLang } from '../i18n/LanguageContext'
import { Lectern } from './Lectern'
import { Trailer } from './Trailer'

export function About() {
  const { t } = useLang()
  return (
    <section id="about" aria-labelledby="about-h" className="relative scroll-mt-0">
      <h2 id="about-h" className="sr-only">
        {t.about.heading}
      </h2>
      <Trailer />
      <Lectern />
    </section>
  )
}
