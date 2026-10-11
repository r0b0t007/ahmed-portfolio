import { createContext, useContext } from 'react'

/**
 * The page's content in its language (src/content/locale.js), provided once by App.jsx.
 * Prerendered components read it here. The two islands hydrate outside this provider, so they get
 * their locale through data-props instead (see App.jsx).
 */
export const LocaleContext = createContext(null)

export function useContent() {
  const c = useContext(LocaleContext)
  if (!c) throw new Error('useContent: no LocaleContext.Provider above this component (App.jsx provides it)')
  return c
}
