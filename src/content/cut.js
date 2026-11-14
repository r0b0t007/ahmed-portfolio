/**
 * A passage and its homepage form, built from one list of sentences. The homepage shows a
 * selection of the same sentences the service pages show in full, so the two cannot state a
 * fact differently, and a passage with no selection fails the build instead of rendering blank.
 * Keep this file JSX-free; Node imports it directly.
 *
 * @param {string[]} sentences the full passage, one sentence per entry
 * @param {number[]} keep indices of the sentences the homepage shows, in order
 */
export function cut(sentences, keep) {
  const label = `"${String(sentences?.[0]).slice(0, 40)}"`
  if (!Array.isArray(sentences) || sentences.length === 0) throw new Error('cut: a passage needs at least one sentence')
  if (!Array.isArray(keep) || keep.length === 0) throw new Error(`cut: no homepage sentences chosen for ${label}`)
  for (const i of keep) {
    if (!Number.isInteger(i) || i < 0 || i >= sentences.length) throw new Error(`cut: ${label} has no sentence ${i}`)
  }
  return { full: sentences.join(' '), short: keep.map(i => sentences[i]).join(' ') }
}
