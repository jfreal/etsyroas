import { describe, it, expect, beforeEach } from 'vitest'
import { useCalculator } from './useCalculator'

// Each test starts from a clean slate so the persisted defaults apply.
beforeEach(() => {
  localStorage.clear()
})

describe('useCalculator — default scenario', () => {
  // Defaults: $25 item, free shipping, $8 costs, 2.0x ROAS, Etsy US fees.
  it('computes revenue from price plus shipping charged', () => {
    const c = useCalculator()
    expect(c.revenuePerUnit.value).toBe(25)
    c.shippingCharged.value = 5
    expect(c.revenuePerUnit.value).toBe(30)
  })

  it('breaks down Etsy fees correctly', () => {
    const c = useCalculator()
    expect(c.etsyListingFee.value).toBeCloseTo(0.2, 5)
    expect(c.etsyTransactionFee.value).toBeCloseTo(1.625, 5) // 6.5% of 25
    expect(c.etsyPaymentProcessingFee.value).toBeCloseTo(1.0, 5) // 3% of 25 + 0.25
    expect(c.etsyOffsiteAdsFee.value).toBe(0) // disabled by default
    expect(c.totalEtsyFeesPerUnit.value).toBeCloseTo(2.825, 5)
  })

  it('derives ad cost per unit from ROAS', () => {
    const c = useCalculator()
    expect(c.adCostPerUnit.value).toBeCloseTo(12.5, 5) // 25 / 2.0
  })

  it('computes profit, margin, and the verdict', () => {
    const c = useCalculator()
    expect(c.profitPerUnit.value).toBeCloseTo(1.675, 5)
    expect(c.profitMarginPercent.value).toBeCloseTo(6.7, 5)
    expect(c.verdict.value).toBe('profitable')
  })

  it('computes break-even ROAS', () => {
    const c = useCalculator()
    // revenue / (revenue - fees - costs) = 25 / 14.175
    expect(c.breakEvenRoas.value).toBeCloseTo(1.76367, 4)
  })

  it('computes after-tax profit and effective hourly rate', () => {
    const c = useCalculator()
    expect(c.profitAfterTaxPerUnit.value).toBeCloseTo(1.25625, 5) // 1.675 * 0.75
    expect(c.effectiveHourlyRate.value).toBeCloseTo(5.025, 5) // /15 min * 60
  })
})

describe('useCalculator — offsite ads', () => {
  it('adds the offsite fee and can flip the verdict to losing', () => {
    const c = useCalculator()
    c.offsiteAdsEnabled.value = true
    expect(c.etsyOffsiteAdsFee.value).toBeCloseTo(3.75, 5) // 15% of 25
    expect(c.profitPerUnit.value).toBeCloseTo(-2.075, 5)
    expect(c.verdict.value).toBe('losing')
  })
})

describe('useCalculator — edge cases', () => {
  it('treats zero ROAS as a loss with no modelled ad spend', () => {
    const c = useCalculator()
    c.roas.value = 0
    expect(c.adCostPerUnit.value).toBe(0)
    expect(c.verdict.value).toBe('losing')
  })

  it('reports an infinite break-even ROAS when costs exceed revenue before ads', () => {
    const c = useCalculator()
    c.salePrice.value = 5 // revenue 5, but costs are 8 + fees
    expect(Number.isFinite(c.breakEvenRoas.value)).toBe(false)
  })

  it('guards against divide-by-zero in margin and hourly rate', () => {
    const c = useCalculator()
    c.salePrice.value = 0
    c.shippingCharged.value = 0
    expect(c.profitMarginPercent.value).toBe(0)
    c.processingMinutes.value = 0
    expect(c.effectiveHourlyRate.value).toBe(0)
  })
})

describe('useCalculator — projections', () => {
  it('scales per-unit figures to daily and monthly totals', () => {
    const c = useCalculator()
    // unitsSoldPerDay defaults to 5, month = 30 days
    expect(c.dailyProfit.value).toBeCloseTo(8.375, 5) // 1.675 * 5
    expect(c.dailyAdSpend.value).toBeCloseTo(62.5, 5) // 12.5 * 5
    expect(c.monthlyRevenue.value).toBeCloseTo(3750, 5) // 25 * 5 * 30
    expect(c.monthlyProfit.value).toBeCloseTo(251.25, 5) // 8.375 * 30
  })
})

describe('useCalculator — reset', () => {
  it('restores every input to its default', () => {
    const c = useCalculator()
    c.salePrice.value = 99
    c.roas.value = 9
    c.offsiteAdsEnabled.value = true

    c.resetToDefaults()

    expect(c.salePrice.value).toBe(25)
    expect(c.roas.value).toBe(2.0)
    expect(c.offsiteAdsEnabled.value).toBe(false)
  })
})
