export function formatCurrency(value: number): string {
  if (!isFinite(value)) return '--'
  return '$' + value.toFixed(2)
}

export function formatPercent(value: number): string {
  if (!isFinite(value)) return '--'
  return value.toFixed(1) + '%'
}

export function formatRoas(value: number): string {
  if (!isFinite(value)) return '--'
  return value.toFixed(2) + 'x'
}
