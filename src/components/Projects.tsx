import { useCallback, useState } from 'react'
import { projects, type Project } from '../data/projects'
import { useLang } from '../i18n/LanguageContext'
import { PosterModal } from './PosterModal'
import { TV } from './TV'

export function Projects() {
  const { t } = useLang()
  const [selected, setSelected] = useState<Project | null>(null)
  const close = useCallback(() => setSelected(null), [])

  return (
    <section
      id="projects"
      aria-labelledby="projects-h"
      className="relative scroll-mt-16 overflow-hidden py-28 sm:py-36"
      style={{
        background:
          'radial-gradient(ellipse at 50% 0%, rgb(58 7 18 / 0.5), transparent 60%), repeating-linear-gradient(90deg, #100a0c 0 46px, #150d10 46px 48px)',
      }}
    >
      <div className="mx-auto max-w-4xl" style={{ paddingInline: 'calc(var(--drape-w) + 1.25rem)' }}>
        <header className="mx-auto max-w-2xl text-center">
          <div className="bulb-row mx-auto mb-7 h-4 w-56" aria-hidden="true" />
          <h2 id="projects-h" className="text-glow font-display text-5xl font-semibold italic text-brass sm:text-6xl">
            {t.projects.heading}
          </h2>
          <p className="mx-auto mt-5 max-w-[46ch] text-balance text-bone-dim">{t.projects.intro}</p>
        </header>

        <div className="mt-20 grid grid-cols-1 gap-x-14 gap-y-20 sm:grid-cols-2">
          {projects.map((p, i) => (
            <div key={p.id}>
              <TV project={p} channel={i + 1} onOpen={(proj) => setSelected(proj)} />
            </div>
          ))}
        </div>
      </div>

      <PosterModal project={selected} onClose={close} />
    </section>
  )
}
