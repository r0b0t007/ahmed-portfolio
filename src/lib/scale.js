/**
 * The stepped bars' scale: each bar is its value as a share of the largest across the services
 * shown, so the bars are the real figures drawn, never invented data.
 */

// The last number in a weeks range ("2–3" → 3): the bar measures the longer end.
export const weeksTo = weeks => Number(weeks.match(/\d+/g).at(-1))

/** The largest price floor and week range across a set of services: each bar's 100%. */
export const scale = list => ({
  price: Math.max(...list.map(s => s.priceFrom)),
  weeks: Math.max(...list.map(s => weeksTo(s.weeks))),
})
