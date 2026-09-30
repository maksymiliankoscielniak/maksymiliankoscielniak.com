import type { Lang } from '../i18n/copy'

/** Small hand-drawn SVG flags (GB for English, PL for Polish). */
export function Flag({ lang, className }: { lang: Lang; className?: string }) {
  if (lang === 'pl') {
    return (
      <svg viewBox="0 0 32 20" className={className} aria-hidden="true" preserveAspectRatio="xMidYMid slice">
        <rect width="32" height="10" fill="#f4f1ea" />
        <rect y="10" width="32" height="10" fill="#d4213d" />
      </svg>
    )
  }
  return (
    <svg viewBox="0 0 60 30" className={className} aria-hidden="true" preserveAspectRatio="xMidYMid slice">
      <rect width="60" height="30" fill="#012169" />
      <path d="M0 0 60 30M60 0 0 30" stroke="#fff" strokeWidth="6" />
      <path d="M0 0 60 30M60 0 0 30" stroke="#c8102e" strokeWidth="2" />
      <path d="M30 0v30M0 15h60" stroke="#fff" strokeWidth="10" />
      <path d="M30 0v30M0 15h60" stroke="#c8102e" strokeWidth="6" />
    </svg>
  )
}
