import { motion, useReducedMotion } from 'framer-motion'
import { useLang } from '../i18n/LanguageContext'
import { Flag } from './Flags'

const PITCH = 48 // frame width + gap
const VIEW_W = 100
const FRAME_W = 44
const FRAMES = ['leader', 'en', 'pl', 'leader'] as const

/**
 * Language switch drawn as a strip of 35mm film. The strip advances one frame
 * under a brass gate each time the language changes.
 */
export function FilmSwitch() {
  const { lang, setLang, t } = useLang()
  const reduce = useReducedMotion()
  const index = lang === 'en' ? 1 : 2
  const x = (VIEW_W - FRAME_W) / 2 - PITCH * index
  const next = lang === 'en' ? 'pl' : 'en'

  return (
    <button
      type="button"
      onClick={() => setLang(next)}
      className="group flex items-center gap-2.5 rounded-md p-1 outline-offset-2"
      aria-label={`${t.lang.switchTo} ${t.lang[next]}`}
      title={`${t.lang.switchTo} ${t.lang[next]}`}
      lang={next}
    >
      <span
        className="relative block overflow-hidden rounded-[3px]"
        style={{ width: VIEW_W, height: 40, background: '#120c08' }}
      >
        <motion.span
          className="absolute left-0 top-0 flex h-full"
          style={{ width: PITCH * FRAMES.length, gap: PITCH - FRAME_W }}
          initial={false}
          animate={{ x }}
          transition={reduce ? { duration: 0 } : { type: 'spring', stiffness: 240, damping: 20, mass: 0.9 }}
        >
          {FRAMES.map((f, i) => {
            const isActive = i === index
            return (
              <span
                key={i}
                className="relative block h-full shrink-0"
                style={{
                  width: FRAME_W,
                  background: '#4a3522',
                  opacity: isActive ? 1 : 0.5,
                  transition: 'opacity 300ms',
                }}
              >
                {/* sprocket holes */}
                <span className="absolute inset-x-[-2px] top-[3px] h-[4px]" style={sprocket} />
                <span className="absolute inset-x-[-2px] bottom-[3px] h-[4px]" style={sprocket} />
                {f !== 'leader' && (
                  <span className="absolute inset-x-[3px] bottom-[9px] top-[9px] block overflow-hidden rounded-[1px]">
                    <Flag lang={f} className="h-full w-full" />
                    <span
                      className="absolute inset-0"
                      style={{ background: 'linear-gradient(135deg, rgb(255 226 170 / 0.22), transparent 55%, rgb(0 0 0 / 0.25))' }}
                    />
                  </span>
                )}
                {f === 'leader' && (
                  <span className="absolute inset-x-[3px] bottom-[9px] top-[9px] block bg-black/45" />
                )}
              </span>
            )
          })}
        </motion.span>

        {/* the gate: a fixed brass frame the active picture sits in */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute top-[1px] bottom-[1px] rounded-[2px] border border-brass transition-shadow group-hover:shadow-[0_0_14px_rgb(209_173_102/0.55)]"
          style={{ left: (VIEW_W - FRAME_W) / 2 - 1, width: FRAME_W + 2, boxShadow: '0 0 10px rgb(209 173 102 / 0.3)' }}
        />
        <span aria-hidden="true" className="pointer-events-none absolute inset-0" style={{ boxShadow: 'inset 0 0 12px 4px rgb(0 0 0 / 0.65)' }} />
      </span>
      <span className="hidden w-5 font-script text-xs font-bold text-brass sm:block" aria-hidden="true">
        {lang.toUpperCase()}
      </span>
    </button>
  )
}

const sprocket: React.CSSProperties = {
  background: 'repeating-linear-gradient(90deg, #0b0708 0 4px, transparent 4px 8px)',
  backgroundPosition: '2px 0',
}
