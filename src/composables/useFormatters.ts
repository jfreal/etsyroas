/**
 * Display formatters for the calculator's numeric outputs.
 *
 * Every formatter guards against non-finite input (`Infinity`, `NaN`) and
 * renders it as an em-dash placeholder, so an undefined break-even ROAS or a
 * divide-by-zero never leaks a raw `Infinity` into the UI.
 */

/** Format a number as USD, e.g. `12.5` → `"$12.50"`. */
export function formatCurrency(value: number): string {
  if (!isFinite(value)) return '--'
  return '$' + value.toFixed(2)
}

/** Format a number as a percentage, e.g. `6.5` → `"6.5%"`. */
export function formatPercent(value: number): string {
  if (!isFinite(value)) return '--'
  return value.toFixed(1) + '%'
}

/** Format a ROAS multiple, e.g. `2` → `"2.00x"`. */
export function formatRoas(value: number): string {
  if (!isFinite(value)) return '--'
  return value.toFixed(2) + 'x'
}
