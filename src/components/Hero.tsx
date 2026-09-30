import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { useLang } from '../i18n/LanguageContext'

const lines = ['Maksymilian', 'Kościelniak']

export function Hero({ opened }: { opened: boolean }) {
  const { t } = useLang()

  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-6 pb-28 pt-28 text-center"
    >
      {/* spotlight */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 h-[115%] w-[130%] -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: opened ? 1 : 0 }}
        transition={{ duration: 2, delay: opened ? 1.2 : 0 }}
        style={{
          clipPath: 'polygon(44% 0, 56% 0, 88% 100%, 12% 100%)',
          background: 'linear-gradient(180deg, rgb(255 226 170 / 0.2), rgb(255 226 170 / 0.05) 70%, transparent)',
          filter: 'blur(3px)',
        }}
      />

      <div className="relative z-10">
        <h1 className="font-display text-[clamp(2.7rem,12.5vw,8.75rem)] font-semibold leading-[0.95] tracking-tight text-bone">
          {lines.map((line, i) => (
            <span key={line} className="block overflow-hidden pb-[0.08em]">
              <motion.span
                className="block"
                initial={{ y: '105%' }}
                animate={{ y: opened ? 0 : '105%' }}
                transition={{ duration: 1.1, delay: opened ? 1.4 + i * 0.18 : 0, ease: [0.2, 0.8, 0.2, 1] }}
              >
                {line}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: opened ? 1 : 0, y: opened ? 0 : 10 }}
          transition={{ duration: 0.9, delay: opened ? 2.3 : 0 }}
        >
          <p className="mt-8 text-balance font-display text-2xl italic text-brass sm:text-3xl">{t.hero.role}</p>
          <p className="mx-auto mt-4 max-w-[38ch] text-balance text-lg text-bone-dim sm:text-xl">{t.hero.tagline}</p>
          <a
            href="#projects"
            className="mt-10 inline-flex items-center gap-2 rounded-full border border-brass/70 px-7 py-3 text-lg text-bone transition-colors hover:bg-brass hover:text-stage"
          >
            {t.hero.cta}
            <ChevronDown size={18} aria-hidden="true" />
          </a>
        </motion.div>
      </div>

      {/* stage floor and footlights */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-24">
        <div
          className="stage-floor absolute inset-0"
          style={{ maskImage: 'linear-gradient(180deg, transparent, #000 45%)', WebkitMaskImage: 'linear-gradient(180deg, transparent, #000 45%)' }}
        />
        <div className="footlights absolute inset-x-0 bottom-5 h-4" />
      </div>
    </section>
  )
}
