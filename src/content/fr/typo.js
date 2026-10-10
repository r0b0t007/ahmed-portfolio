/**
 * French typography. French sets a space before : ; ? ! and inside « », and it must not break, or
 * a line can start with the punctuation. Copy in src/content/fr/ is typed with ordinary spaces
 * and every module exports it through typo(), so no file has to carry invisible characters.
 */
const fix = s => s.replace(/ ([:;?!»])/g, '\u00a0$1').replace(/« /g, '«\u00a0')

export const typo = v =>
  typeof v === 'string' ? fix(v)
    : typeof v === 'function' ? (...args) => typo(v(...args))
      : Array.isArray(v) ? v.map(typo)
        : v && typeof v === 'object' ? Object.fromEntries(Object.entries(v).map(([k, x]) => [k, typo(x)]))
          : v
