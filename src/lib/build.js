/**
 * The commit and date the page was built from. vite.config.js sets both (`define`), from
 * Cloudflare Pages' CF_PAGES_COMMIT_SHA or the local git checkout, so the document's revision
 * line and the colophon state where the page came from instead of a date someone typed.
 *
 * Read only by static components (the document cover, the colophon). The two hydrated islands
 * must not import this: a value that differs between the build and the browser would break
 * hydration, and neither island needs it.
 */
export const BUILD_COMMIT = import.meta.env.BUILD_COMMIT || ''
export const BUILD_DATE = import.meta.env.BUILD_DATE || ''

const LOCALES = { en: 'en-GB', fr: 'fr-FR' }

/** "12 Oct 2026" / "12 oct. 2026". UTC, so the build machine's time zone can't shift the day. */
export function formatBuildDate(locale) {
  if (!BUILD_DATE) return ''
  return new Intl.DateTimeFormat(LOCALES[locale] ?? LOCALES.en, { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' })
    .format(new Date(`${BUILD_DATE}T00:00:00Z`))
}
