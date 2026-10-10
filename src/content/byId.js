/** A lookup by `id` that fails the build on an unknown id, instead of rendering an empty section. */
export const byId = (list, what) => id => {
  const item = list.find(x => x.id === id)
  if (!item) throw new Error(`${what}: no entry with id "${id}"`)
  return item
}
