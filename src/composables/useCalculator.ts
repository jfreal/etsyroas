import { computed } from 'vue'
import { useLocalStorage, clearAllStorage } from './useLocalStorage'

/**
 * The complete Etsy Ads profitability model.
 *
 * Everything is derived from a single sale ("per unit") and then scaled up to
 * daily and monthly projections. The chain of reasoning:
 *
 *   revenue      = salePrice + shippingCharged
 *   etsyFees     = listing + transaction% + processing(% + flat) + offsite%
 *   productCosts = materials + shipping + other
 *   adCost       = revenue / ROAS          (ROAS = revenue / adSpend, solved for adSpend)
 *   profit       = revenue - etsyFees - productCosts - adCost
 *
 * The break-even ROAS is the ROAS at which profit is exactly zero. Setting the
 * profit equation to 0 and solving for ROAS gives:
 *
 *   breakEvenRoas = revenue / (revenue - etsyFees - productCosts)
 *
 * All inputs are persisted to localStorage via {@link useLocalStorage}, so a
 * seller's numbers survive a page refresh. Defaults mirror Etsy's US fee
 * schedule as of 2025.
 */
export function useCalculator() {
  // --- Inputs (persisted) ---
  const roas = useLocalStorage('roas', 2.0)

  // Product pricing
  const salePrice = useLocalStorage('salePrice', 25)
  const shippingCharged = useLocalStorage('shippingCharged', 0)

  // Your costs
  const materialCost = useLocalStorage('materialCost', 5)
  const shippingCost = useLocalStorage('shippingCost', 3)
  const otherCost = useLocalStorage('otherCost', 0)

  // Time & taxes
  const processingMinutes = useLocalStorage('processingMinutes', 15)
  const taxRate = useLocalStorage('taxRate', 25)

  // Volume (drives the daily & monthly projections)
  const unitsSoldPerDay = useLocalStorage('unitsSoldPerDay', 5)

  // Fee settings (advanced — auto-filled with Etsy's US defaults)
  const listingFee = useLocalStorage('listingFee', 0.2)
  const transactionFeeRate = useLocalStorage('transactionFeeRate', 6.5)
  const paymentProcessingRate = useLocalStorage('paymentProcessingRate', 3.0)
  const paymentProcessingFlat = useLocalStorage('paymentProcessingFlat', 0.25)
  const offsiteAdsEnabled = useLocalStorage('offsiteAdsEnabled', false)
  const offsiteAdsRate = useLocalStorage('offsiteAdsRate', 15)

  // --- Revenue ---
  /** Total a buyer pays: item price plus any shipping charged to them. */
  const revenuePerUnit = computed(() => {
    return Math.max(0, (salePrice.value || 0) + (shippingCharged.value || 0))
  })

  // --- Etsy fees (per unit) ---
  const etsyListingFee = computed(() => listingFee.value || 0)

  /** Transaction fee applies to the full order total, including shipping. */
  const etsyTransactionFee = computed(() => {
    return revenuePerUnit.value * ((transactionFeeRate.value || 0) / 100)
  })

  /** Payment processing is a percentage of the order total plus a flat fee. */
  const etsyPaymentProcessingFee = computed(() => {
    return (
      revenuePerUnit.value * ((paymentProcessingRate.value || 0) / 100) +
      (paymentProcessingFlat.value || 0)
    )
  })

  /** Offsite Ads fee only applies when the sale originated from an Offsite Ad. */
  const etsyOffsiteAdsFee = computed(() => {
    if (!offsiteAdsEnabled.value) return 0
    return revenuePerUnit.value * ((offsiteAdsRate.value || 0) / 100)
  })

  const totalEtsyFeesPerUnit = computed(() => {
    return (
      etsyListingFee.value +
      etsyTransactionFee.value +
      etsyPaymentProcessingFee.value +
      etsyOffsiteAdsFee.value
    )
  })

  // --- Your costs (per unit) ---
  const totalProductCostPerUnit = computed(() => {
    return (materialCost.value || 0) + (shippingCost.value || 0) + (otherCost.value || 0)
  })

  // --- Ad cost (per unit) ---
  /** Derived from ROAS: adSpend = revenue / ROAS. Zero ROAS means no spend modelled. */
  const adCostPerUnit = computed(() => {
    if (roas.value <= 0) return 0
    return revenuePerUnit.value / roas.value
  })

  // --- Profit (per unit) ---
  const profitPerUnit = computed(() => {
    return (
      revenuePerUnit.value -
      totalEtsyFeesPerUnit.value -
      totalProductCostPerUnit.value -
      adCostPerUnit.value
    )
  })

  const profitMarginPercent = computed(() => {
    if (revenuePerUnit.value <= 0) return 0
    return (profitPerUnit.value / revenuePerUnit.value) * 100
  })

  // --- Break-even ROAS ---
  /** Profit before any ad spend — the headroom available to pay for ads. */
  const profitBeforeAdsPerUnit = computed(() => {
    return revenuePerUnit.value - totalEtsyFeesPerUnit.value - totalProductCostPerUnit.value
  })

  /**
   * Minimum ROAS to avoid losing money. `Infinity` when the product already
   * loses money before a single ad dollar is spent (no ROAS can save it).
   */
  const breakEvenRoas = computed(() => {
    if (profitBeforeAdsPerUnit.value <= 0) return Infinity
    return revenuePerUnit.value / profitBeforeAdsPerUnit.value
  })

  // --- After-tax profit & effective hourly rate ---
  /** Tax only applies to a profit; a loss passes through unchanged. */
  const profitAfterTaxPerUnit = computed(() => {
    if (profitPerUnit.value <= 0) return profitPerUnit.value
    return profitPerUnit.value * (1 - (taxRate.value || 0) / 100)
  })

  /** What the seller effectively earns per hour of hands-on time. */
  const effectiveHourlyRate = computed(() => {
    const minutes = processingMinutes.value || 0
    if (minutes <= 0) return 0
    return (profitAfterTaxPerUnit.value / minutes) * 60
  })

  // --- Verdict ---
  /** Headline classification of the current scenario. */
  const verdict = computed<'profitable' | 'losing' | 'breakeven'>(() => {
    if (revenuePerUnit.value <= 0 || roas.value <= 0) return 'losing'
    if (profitPerUnit.value > 0.01) return 'profitable'
    if (profitPerUnit.value < -0.01) return 'losing'
    return 'breakeven'
  })

  // --- Daily & monthly projections ---
  const units = computed(() => Math.max(0, unitsSoldPerDay.value || 0))
  const DAYS_PER_MONTH = 30

  const dailyRevenue = computed(() => revenuePerUnit.value * units.value)
  const dailyEtsyFees = computed(() => totalEtsyFeesPerUnit.value * units.value)
  const dailyProductCosts = computed(() => totalProductCostPerUnit.value * units.value)
  const dailyAdSpend = computed(() => adCostPerUnit.value * units.value)
  const dailyProfit = computed(() => profitPerUnit.value * units.value)

  const monthlyRevenue = computed(() => dailyRevenue.value * DAYS_PER_MONTH)
  const monthlyEtsyFees = computed(() => dailyEtsyFees.value * DAYS_PER_MONTH)
  const monthlyProductCosts = computed(() => dailyProductCosts.value * DAYS_PER_MONTH)
  const monthlyAdSpend = computed(() => dailyAdSpend.value * DAYS_PER_MONTH)
  const monthlyProfit = computed(() => dailyProfit.value * DAYS_PER_MONTH)

  /** Restore every input to its default and wipe persisted values. */
  function resetToDefaults() {
    clearAllStorage()
    roas.value = 2.0
    salePrice.value = 25
    shippingCharged.value = 0
    materialCost.value = 5
    shippingCost.value = 3
    otherCost.value = 0
    processingMinutes.value = 15
    taxRate.value = 25
    unitsSoldPerDay.value = 5
    listingFee.value = 0.2
    transactionFeeRate.value = 6.5
    paymentProcessingRate.value = 3.0
    paymentProcessingFlat.value = 0.25
    offsiteAdsEnabled.value = false
    offsiteAdsRate.value = 15
  }

  return {
    // Inputs
    roas,
    salePrice,
    shippingCharged,
    materialCost,
    shippingCost,
    otherCost,
    processingMinutes,
    taxRate,
    unitsSoldPerDay,
    listingFee,
    transactionFeeRate,
    paymentProcessingRate,
    paymentProcessingFlat,
    offsiteAdsEnabled,
    offsiteAdsRate,

    // Computed per-unit
    revenuePerUnit,
    etsyListingFee,
    etsyTransactionFee,
    etsyPaymentProcessingFee,
    etsyOffsiteAdsFee,
    totalEtsyFeesPerUnit,
    totalProductCostPerUnit,
    adCostPerUnit,
    profitPerUnit,
    profitMarginPercent,

    // After tax & hourly
    profitAfterTaxPerUnit,
    effectiveHourlyRate,

    // Break-even
    breakEvenRoas,
    verdict,

    // Daily projection
    dailyRevenue,
    dailyEtsyFees,
    dailyProductCosts,
    dailyAdSpend,
    dailyProfit,

    // Monthly projection
    monthlyRevenue,
    monthlyEtsyFees,
    monthlyProductCosts,
    monthlyAdSpend,
    monthlyProfit,

    // Actions
    resetToDefaults,
  }
}
