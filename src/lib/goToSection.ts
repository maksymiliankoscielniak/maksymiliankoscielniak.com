const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

function topOf(el: HTMLElement) {
  const margin = parseFloat(getComputedStyle(el).scrollMarginTop) || 0
  return Math.max(0, el.getBoundingClientRect().top + window.scrollY - margin)
}

let cutting = false

/**
 * A film cut: dip to black, jump, come back up. Used when the target is far
 * away, because scrolling across the whole trailer just looks like the page
 * standing still while the title cards flicker past.
 */
function cutTo(top: number) {
  if (cutting) return
  cutting = true
  const veil = document.createElement('div')
  veil.setAttribute('aria-hidden', 'true')
  Object.assign(veil.style, {
    position: 'fixed',
    inset: '0',
    zIndex: '95',
    background: '#000',
    opacity: '0',
    pointerEvents: 'none',
    transition: 'opacity 200ms ease-in',
  })
  document.body.appendChild(veil)
  requestAnimationFrame(() => {
    veil.style.opacity = '1'
  })
  window.setTimeout(() => {
    window.scrollTo({ top, behavior: 'instant' })
    veil.style.transition = 'opacity 500ms ease-out'
    requestAnimationFrame(() => {
      veil.style.opacity = '0'
    })
    window.setTimeout(() => {
      veil.remove()
      cutting = false
    }, 540)
  }, 230)
}

/** Scroll to a section by id. Short hops glide; long jumps cut. Returns false if the id does not exist. */
export function goToSection(id: string): boolean {
  const el = document.getElementById(id)
  if (!el) return false
  const top = topOf(el)
  const distance = Math.abs(top - window.scrollY)

  if (prefersReducedMotion()) {
    window.scrollTo({ top, behavior: 'instant' })
  } else if (distance > window.innerHeight * 2) {
    cutTo(top)
  } else {
    window.scrollTo({ top, behavior: 'smooth' })
  }
  return true
}
