import { motion, useReducedMotion } from 'framer-motion'
import { useLang } from '../i18n/LanguageContext'
import { Dimension } from './Dimension'

export function About() {
  const { t } = useLang()
  const reduce = useReducedMotion()
  const [lead, ...rest] = t.about.body

  return (
    <section id="about" aria-label={t.about.heading} className="mx-auto max-w-[1240px] px-6 pb-24 md:px-12 md:pb-36">
      <Dimension as="h2" label={t.about.heading} />
      <div className="mt-14 grid gap-14 md:mt-20 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <p className="text-pretty font-body text-[clamp(1.5rem,2.5vw,2.15rem)] leading-[1.3] text-ink">{lead}</p>
          <div className="mt-8 max-w-[60ch] space-y-5 text-[1.15rem]">
            {rest.map((p) => (
              <p key={p} className="text-pretty">
                {p}
              </p>
            ))}
          </div>
          <motion.p
            aria-hidden="true"
            className="mt-10 inline-block -rotate-3 font-signature text-[3.4rem] leading-none text-accent"
            initial={reduce ? false : { clipPath: 'inset(-30% 100% -50% -5%)' }}
            whileInView={{ clipPath: 'inset(-30% -10% -50% -5%)' }}
            viewport={{ once: true, margin: '0px 0px -15% 0px' }}
            transition={{ duration: 1.6, ease: [0.45, 0, 0.25, 1] }}
          >
            {t.about.signature}
          </motion.p>
        </div>

        <dl className="divide-y divide-rule border-y border-rule lg:col-span-4 lg:col-start-9 lg:self-start">
          {t.about.groups.map((g) => (
            <div key={g.label} className="py-5">
              <dt className="font-display text-[0.95rem] font-semibold text-ink">{g.label}</dt>
              <dd className="mt-1.5 text-body">{g.items}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
