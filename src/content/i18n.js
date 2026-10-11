/**
 * Interface strings for a locale. Separate from locale.js on purpose: the two hydrated islands
 * (Header, Contact) import this file, and everything it imports ships in the client bundle,
 * whereas locale.js pulls in every content module of both languages.
 */
import { ui as en } from './ui.js'
import { ui as fr } from './fr/ui.js'

const UI = { en, fr }

export const LOCALES = Object.keys(UI)

export function uiFor(locale) {
  const ui = UI[locale]
  if (!ui) throw new Error(`i18n: no interface strings for locale "${locale}"`)
  return ui
}
