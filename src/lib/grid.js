/**
 * Two-column hair-grids leave an odd last card alone in its row, so that card spans both
 * columns. The homepage Proof section and the service pages' proof grid both ask this.
 */
export const spansLastRow = (list, i) => list.length % 2 === 1 && i === list.length - 1
