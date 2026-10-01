import { useEffect, useRef, useState, type ReactNode } from 'react'
import { Check, Copy, Mail } from 'lucide-react'
import { site } from '../data/site'
import { useLang } from '../i18n/LanguageContext'
import { Dimension } from './Dimension'

function GithubIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  )
}

function LinkedinIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  )
}

export function Contact() {
  const { t } = useLang()
  const [copied, setCopied] = useState(false)
  const timer = useRef<number>(0)
  useEffect(() => () => window.clearTimeout(timer.current), [])

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(site.links.email)
      setCopied(true)
      window.clearTimeout(timer.current)
      timer.current = window.setTimeout(() => setCopied(false), 2200)
    } catch {
      /* clipboard unavailable: the address is selectable text anyway */
    }
  }

  const items: { key: string; label: string; href: string; icon: ReactNode; external: boolean }[] = [
    { key: 'github', label: t.contact.github, href: site.links.github, icon: <GithubIcon />, external: true },
    { key: 'linkedin', label: t.contact.linkedin, href: site.links.linkedin, icon: <LinkedinIcon />, external: true },
    { key: 'email', label: t.contact.email, href: `mailto:${site.links.email}`, icon: <Mail size={20} />, external: false },
  ]

  return (
    <section id="contact" aria-label={t.contact.heading} className="mx-auto max-w-[1240px] px-6 pb-24 md:px-12 md:pb-32">
      <Dimension as="h2" label={t.contact.heading} />
      <div className="mt-14 md:mt-20">
        <p className="max-w-[18ch] text-balance font-display text-[clamp(2.5rem,6.4vw,5.6rem)] font-semibold leading-[0.98] tracking-[-0.04em] text-ink">
          {t.contact.title}
        </p>
        <p className="mt-6 max-w-[40ch] text-[1.2rem]">{t.contact.intro}</p>

        <div className="mt-9 flex flex-wrap items-center gap-x-4 gap-y-3">
          <a
            href={`mailto:${site.links.email}`}
            className="link-underline font-display text-[clamp(1rem,4.3vw,2rem)] font-semibold tracking-tight text-accent"
          >
            {site.links.email}
          </a>
          <button
            type="button"
            onClick={copy}
            aria-label={t.contact.copy}
            className="inline-flex items-center gap-1.5 rounded-full border border-rule px-3.5 py-1.5 font-display text-[0.88rem] font-medium text-ink transition-colors hover:border-ink"
          >
            {copied ? <Check size={15} aria-hidden="true" /> : <Copy size={15} aria-hidden="true" />}
            <span aria-live="polite">{copied ? t.contact.copied : t.contact.copy}</span>
          </button>
        </div>

        <ul className="mt-9 flex flex-wrap items-center gap-3">
          {items
            .filter((it) => it.key !== 'email')
            .map((it) => (
              <li key={it.key}>
                <a
                  href={it.href}
                  {...(it.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  className="inline-flex items-center gap-2.5 rounded-full border border-ink/25 px-5 py-2.5 font-display text-[0.98rem] font-semibold text-ink transition-colors hover:border-ink hover:bg-ink hover:text-paper"
                >
                  {it.icon}
                  {it.label}
                </a>
              </li>
            ))}
        </ul>
      </div>
    </section>
  )
}
