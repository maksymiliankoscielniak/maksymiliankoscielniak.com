import { useLang } from '../i18n/LanguageContext'

/** A slim strip before the contact section: what is going on right now. */
export function Now() {
  const { t } = useLang()
  return (
    <section aria-label={t.now.label} className="mx-auto max-w-[1240px] px-6 pb-24 md:px-12 md:pb-36">
      <div className="grid gap-8 border-y border-rule py-8 md:grid-cols-[auto_1fr] md:items-center md:gap-14 md:py-9">
        <p className="flex items-center gap-2.5 font-display text-[0.95rem] font-semibold text-ink">
          <span aria-hidden="true" className="relative inline-flex h-2.5 w-2.5">
            <span className="absolute inset-0 animate-ping rounded-full bg-accent/60 motion-reduce:hidden" />
            <span className="relative h-2.5 w-2.5 rounded-full bg-accent" />
          </span>
          {t.now.label}
        </p>
        <dl className="grid gap-6 sm:grid-cols-3 sm:gap-8">
          {t.now.items.map((it) => (
            <div key={it.label}>
              <dt className="font-display text-[0.85rem] font-medium uppercase tracking-[0.08em] text-muted">{it.label}</dt>
              <dd className="mt-1 text-[1.05rem] leading-snug text-ink">{it.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
