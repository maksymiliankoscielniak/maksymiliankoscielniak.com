import { ArrowUpRight } from 'lucide-react'
import { projects, type Project } from '../data/projects'
import { useLang } from '../i18n/LanguageContext'
import { Dimension } from './Dimension'

export function Projects() {
  const { t } = useLang()
  return (
    <section id="projects" aria-label={t.work.heading} className="mx-auto max-w-[1240px] px-6 pb-24 md:px-12 md:pb-36">
      <Dimension as="h2" label={t.work.heading} />
      <ul className="mt-14 space-y-24 md:mt-20 md:space-y-36">
        {projects.map((p, i) => (
          <li key={p.id}>
            <Plate project={p} flip={i % 2 === 1} />
          </li>
        ))}
      </ul>
    </section>
  )
}

function Plate({ project: p, flip }: { project: Project; flip: boolean }) {
  const { t, lang } = useLang()
  const live = p.links.find((l) => l.href && l.label.en === 'Live demo')
  const code = p.links.find((l) => l.href && l.label.en === 'Source code')

  return (
    <article className="grid items-start gap-9 lg:grid-cols-12 lg:gap-x-14">
      <div className={`lg:col-span-7 ${flip ? 'lg:order-2' : ''}`}>
        <Dimension label={p.kind[lang]} className="mb-5" />
        {live ? (
          <a
            href={live.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${t.work.openLive} ${p.title}`}
            className="group block rounded-2xl border border-rule bg-sheet p-2 transition-colors duration-300 hover:border-accent"
          >
            <Frame project={p} />
          </a>
        ) : (
          <div className="rounded-2xl border border-rule bg-sheet p-2">
            <Frame project={p} />
          </div>
        )}
      </div>

      <div className={`lg:col-span-5 lg:self-center ${flip ? 'lg:order-1' : ''}`}>
        <h3 className="text-[clamp(2.1rem,3.6vw,3.1rem)] font-semibold leading-none tracking-[-0.035em]">{p.title}</h3>
        <p className="mt-3 font-body text-[1.25rem] italic text-muted">{p.tagline[lang]}</p>
        <p className="mt-6 max-w-[52ch] text-body">{p.description[lang]}</p>
        <p className="mt-5 text-[1rem] text-muted">
          <span className="font-display font-medium text-ink">{t.work.builtWith}</span> {p.stack.join(', ')}
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-3">
          {live && (
            <a
              href={live.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full bg-accent px-5 py-2.5 font-display text-[0.95rem] font-semibold text-paper transition-colors hover:bg-ink"
            >
              {live.label[lang]}
              <ArrowUpRight size={17} aria-hidden="true" />
            </a>
          )}
          {code && (
            <a
              href={code.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full border border-ink/25 px-5 py-2.5 font-display text-[0.95rem] font-semibold text-ink transition-colors hover:border-ink hover:bg-ink hover:text-paper"
            >
              {code.label[lang]}
              <ArrowUpRight size={17} aria-hidden="true" />
            </a>
          )}
        </div>
      </div>
    </article>
  )
}

function Frame({ project: p }: { project: Project }) {
  return (
    <div className="overflow-hidden rounded-[10px]">
      <img
        src={p.screen.src}
        alt=""
        width={1600}
        height={900}
        loading="lazy"
        draggable={false}
        className="aspect-[16/9] w-full select-none object-cover transition-transform duration-700 ease-out group-hover:scale-[1.025]"
        style={{ objectPosition: p.screen.position }}
      />
    </div>
  )
}
