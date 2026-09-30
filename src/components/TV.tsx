import { useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import type { Project } from '../data/projects'
import { useLang } from '../i18n/LanguageContext'

/** A CRT set "broadcasting" one project's poster. Hover or focus changes the channel. */
export function TV({
  project,
  channel,
  onOpen,
}: {
  project: Project
  channel: number
  onOpen: (p: Project, trigger: HTMLElement) => void
}) {
  const { lang, t } = useLang()
  const reduce = useReducedMotion()
  const [tuning, setTuning] = useState(false)
  const timer = useRef<number | undefined>(undefined)

  useEffect(() => () => window.clearTimeout(timer.current), [])

  const tune = () => {
    if (reduce) return
    setTuning(true)
    window.clearTimeout(timer.current)
    timer.current = window.setTimeout(() => setTuning(false), 320)
  }

  return (
    <figure className="m-0 flex flex-col items-center">
      <button
        type="button"
        onMouseEnter={tune}
        onFocus={tune}
        onClick={(e) => onOpen(project, e.currentTarget)}
        aria-label={`${t.projects.tuneIn}: ${project.title}`}
        aria-haspopup="dialog"
        className="group relative block w-full max-w-[370px] cursor-pointer rounded-[30px] transition-transform duration-300 hover:-translate-y-1 focus-visible:-translate-y-1"
      >
        <span className="tv-body relative flex items-stretch gap-3 rounded-[28px] p-3.5 pr-3">
          {/* screen */}
          <span className="tv-screen relative block aspect-[4/3] flex-1 overflow-hidden rounded-[22px/26px]">
            <motion.span
              className="absolute inset-0 block origin-center"
              initial={reduce ? false : { scaleY: 0.01, filter: 'brightness(4)' }}
              whileInView={{ scaleY: 1, filter: 'brightness(1)' }}
              viewport={{ once: true, margin: '-12% 0px' }}
              transition={{ duration: 0.7, ease: [0.2, 0.8, 0.2, 1], delay: 0.1 }}
            >
              <span className="tv-flicker absolute inset-0 block">
                <img
                  src={project.screen.src}
                  alt=""
                  width={1100}
                  height={560}
                  loading="lazy"
                  draggable={false}
                  className="absolute inset-0 h-full w-full select-none object-cover"
                  style={{ objectPosition: project.screen.position }}
                />
              </span>
              <span className="tv-roll pointer-events-none absolute inset-x-0 top-0 block" />
              <span className="tv-scanlines pointer-events-none absolute inset-0 block" />
              <span
                className="tv-static pointer-events-none absolute inset-0 block transition-opacity duration-150"
                style={{ opacity: tuning ? 0.85 : 0 }}
              />
              <span className="tv-glare pointer-events-none absolute inset-0 block" />
              <span
                className="pointer-events-none absolute right-3 top-2.5 block font-script text-[11px] font-bold text-[#8dff9b] opacity-0 transition-opacity duration-200 group-hover:opacity-90 group-focus-visible:opacity-90"
                style={{ textShadow: '0 0 6px #4dff6a' }}
                aria-hidden="true"
              >
                {t.projects.channel} {String(channel).padStart(2, '0')}
              </span>
            </motion.span>
          </span>

          {/* control panel */}
          <span className="flex w-[15%] min-w-[38px] flex-col items-center justify-between py-1.5" aria-hidden="true">
            <span className="flex flex-col items-center gap-2.5">
              <Knob turn={60} />
              <Knob turn={-40} />
            </span>
            <span className="flex w-full flex-col gap-[3px] px-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <span key={i} className="block h-[2px] rounded-full bg-black/55" />
              ))}
            </span>
            <span className="block h-1.5 w-1.5 rounded-full bg-[#ff4b3a] shadow-[0_0_8px_#ff4b3a]" />
          </span>
        </span>

        {/* feet */}
        <span aria-hidden="true" className="absolute -bottom-2 left-[14%] h-2 w-9 rounded-b bg-[#1b110a]" />
        <span aria-hidden="true" className="absolute -bottom-2 right-[14%] h-2 w-9 rounded-b bg-[#1b110a]" />
      </button>

      <figcaption className="mt-7 max-w-[340px] text-center">
        <span className="block font-display text-2xl font-semibold text-bone">{project.title}</span>
        <span className="mt-1 block text-[1.05rem] italic text-bone-dim">{project.tagline[lang]}</span>
      </figcaption>
    </figure>
  )
}

function Knob({ turn }: { turn: number }) {
  return (
    <span
      className="relative block h-[26px] w-[26px] rounded-full transition-transform duration-500 ease-out group-hover:[transform:rotate(var(--turn))] group-focus-visible:[transform:rotate(var(--turn))]"
      style={
        {
          '--turn': `${turn}deg`,
          background: 'radial-gradient(circle at 35% 30%, #f0d795, #b38a3c 55%, #5d4516)',
          boxShadow: '0 3px 5px rgb(0 0 0 / 0.6), inset 0 -2px 3px rgb(0 0 0 / 0.35)',
        } as React.CSSProperties
      }
    >
      <span className="absolute left-1/2 top-[3px] h-[8px] w-[2px] -translate-x-1/2 rounded bg-black/70" />
    </span>
  )
}
