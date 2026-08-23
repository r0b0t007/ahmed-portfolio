/**
 * Scroll reveal for the sections that are never hydrated.
 *
 * useFadeIn (the React hook) only runs inside hydrated components, and after the move to islands
 * that's just the header and the contact form. Everything else is static prerendered markup, so
 * its `.fade-in` elements need an observer that doesn't involve React.
 *
 * Idempotent by design: it skips anything already marked `.visible`, so it's harmless if a
 * hydrated component's own useFadeIn has already handled an element.
 */
export function initReveal() {
  const targets = document.querySelectorAll('.fade-in:not(.visible)')
  if (!targets.length) return

  // Matches the useFadeIn behaviour and the CSS media query — no animation, just show everything.
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    targets.forEach(el => el.classList.add('visible'))
    return
  }

  if (!('IntersectionObserver' in window)) {
    targets.forEach(el => el.classList.add('visible'))
    return
  }

  const observer = new IntersectionObserver(
    entries => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible')
          observer.unobserve(entry.target)
        }
      }
    },
    { threshold: 0.1 }
  )

  targets.forEach(el => observer.observe(el))
}
