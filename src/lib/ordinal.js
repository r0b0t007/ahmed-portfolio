/** Zero-padded 1-based ordinal for card indices: ordinal(0) → '001', ordinal(0, 2) → '01'. */
export const ordinal = (i, width = 3) => String(i + 1).padStart(width, '0')
