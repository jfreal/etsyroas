import { describe, it, expect } from 'vitest'
import { formatCurrency, formatPercent, formatRoas } from './useFormatters'

describe('formatCurrency', () => {
  it('formats positive numbers as USD with two decimals', () => {
    expect(formatCurrency(12.5)).toBe('$12.50')
    expect(formatCurrency(0)).toBe('$0.00')
    expect(formatCurrency(1.005)).toBe('$1.00')
  })

  it('renders a placeholder for non-finite values', () => {
    expect(formatCurrency(Infinity)).toBe('--')
    expect(formatCurrency(NaN)).toBe('--')
  })
})

describe('formatPercent', () => {
  it('formats with a single decimal and a percent sign', () => {
    expect(formatPercent(6.5)).toBe('6.5%')
    expect(formatPercent(0)).toBe('0.0%')
  })

  it('renders a placeholder for non-finite values', () => {
    expect(formatPercent(Infinity)).toBe('--')
  })
})

describe('formatRoas', () => {
  it('formats as a multiple with two decimals', () => {
    expect(formatRoas(2)).toBe('2.00x')
    expect(formatRoas(1.764)).toBe('1.76x')
  })

  it('renders a placeholder for an infinite (unviable) ROAS', () => {
    expect(formatRoas(Infinity)).toBe('--')
  })
})
