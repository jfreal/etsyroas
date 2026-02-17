import { computed } from 'vue'
import { useLocalStorage, clearAllStorage } from './useLocalStorage'

export function useCalculator() {
  // --- Inputs ---
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

  // Fee settings (advanced)
  const listingFee = useLocalStorage('listingFee', 0.20)
  const transactionFeeRate = useLocalStorage('transactionFeeRate', 6.5)
  const paymentProcessingRate = useLocalStorage('paymentProcessingRate', 3.0)
  const paymentProcessingFlat = useLocalStorage('paymentProcessingFlat', 0.25)
  const offsiteAdsEnabled = useLocalStorage('offsiteAdsEnabled', false)
  const offsiteAdsRate = useLocalStorage('offsiteAdsRate', 15)

  // --- Computed outputs ---
  const revenuePerUnit = computed(() => {
    return Math.max(0, (salePrice.value || 0) + (shippingCharged.value || 0))
  })

  // Etsy fees per unit
  const etsyListingFee = computed(() => listingFee.value || 0)

  const etsyTransactionFee = computed(() => {
    return revenuePerUnit.value * ((transactionFeeRate.value || 0) / 100)
  })

  const etsyPaymentProcessingFee = computed(() => {
    return revenuePerUnit.value * ((paymentProcessingRate.value || 0) / 100) + (paymentProcessingFlat.value || 0)
  })

  const etsyOffsiteAdsFee = computed(() => {
    if (!offsiteAdsEnabled.value) return 0
    return revenuePerUnit.value * ((offsiteAdsRate.value || 0) / 100)
  })

  const totalEtsyFeesPerUnit = computed(() => {
    return etsyListingFee.value + etsyTransactionFee.value + etsyPaymentProcessingFee.value + etsyOffsiteAdsFee.value
  })

  // Product costs per unit
  const totalProductCostPerUnit = computed(() => {
    return (materialCost.value || 0) + (shippingCost.value || 0) + (otherCost.value || 0)
  })

  // Ad cost per unit: revenuePerUnit / roas
  const adCostPerUnit = computed(() => {
    if (roas.value <= 0) return 0
    return revenuePerUnit.value / roas.value
  })

  // Profit
  const profitPerUnit = computed(() => {
    return revenuePerUnit.value - totalEtsyFeesPerUnit.value - totalProductCostPerUnit.value - adCostPerUnit.value
  })

  const profitMarginPercent = computed(() => {
    if (revenuePerUnit.value <= 0) return 0
    return (profitPerUnit.value / revenuePerUnit.value) * 100
  })

  // Break-even ROAS
  const profitBeforeAdsPerUnit = computed(() => {
    return revenuePerUnit.value - totalEtsyFeesPerUnit.value - totalProductCostPerUnit.value
  })

  const breakEvenRoas = computed(() => {
    if (profitBeforeAdsPerUnit.value <= 0) return Infinity
    return revenuePerUnit.value / profitBeforeAdsPerUnit.value
  })

  // Profit after tax
  const profitAfterTaxPerUnit = computed(() => {
    if (profitPerUnit.value <= 0) return profitPerUnit.value
    return profitPerUnit.value * (1 - (taxRate.value || 0) / 100)
  })

  // Effective hourly rate
  const effectiveHourlyRate = computed(() => {
    const minutes = processingMinutes.value || 0
    if (minutes <= 0) return 0
    return (profitAfterTaxPerUnit.value / minutes) * 60
  })

  // Verdict: 'profitable' | 'losing' | 'breakeven'
  const verdict = computed(() => {
    if (revenuePerUnit.value <= 0 || roas.value <= 0) return 'losing'
    if (profitPerUnit.value > 0.01) return 'profitable'
    if (profitPerUnit.value < -0.01) return 'losing'
    return 'breakeven'
  })

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
    listingFee.value = 0.20
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

    // Actions
    resetToDefaults,
  }
}
