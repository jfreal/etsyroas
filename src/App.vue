<script setup lang="ts">
import { useCalculator } from './composables/useCalculator'
import InputPanel from './components/InputPanel.vue'
import VerdictBanner from './components/VerdictBanner.vue'
import BreakdownTable from './components/BreakdownTable.vue'
import BreakEvenDisplay from './components/BreakEvenDisplay.vue'
import HourlyRate from './components/HourlyRate.vue'

const calc = useCalculator()
</script>

<template>
  <div class="app">
    <header class="app-header">
      <h1 class="app-title">Etsy Ads Profitability Calculator</h1>
      <p class="app-subtitle">Find out if your Etsy Ads are actually profitable after all fees and costs.</p>
    </header>

    <div class="calculator-layout">
      <InputPanel
        v-model:roas="calc.roas.value"
        v-model:salePrice="calc.salePrice.value"
        v-model:shippingCharged="calc.shippingCharged.value"
        v-model:materialCost="calc.materialCost.value"
        v-model:shippingCost="calc.shippingCost.value"
        v-model:otherCost="calc.otherCost.value"
        v-model:processingMinutes="calc.processingMinutes.value"
        v-model:taxRate="calc.taxRate.value"
        v-model:listingFee="calc.listingFee.value"
        v-model:transactionFeeRate="calc.transactionFeeRate.value"
        v-model:paymentProcessingRate="calc.paymentProcessingRate.value"
        v-model:paymentProcessingFlat="calc.paymentProcessingFlat.value"
        v-model:offsiteAdsEnabled="calc.offsiteAdsEnabled.value"
        v-model:offsiteAdsRate="calc.offsiteAdsRate.value"
        @reset="calc.resetToDefaults"
      />

      <div class="results-column">
        <VerdictBanner
          :verdict="calc.verdict.value"
          :profitPerUnit="calc.profitPerUnit.value"
          :profitMarginPercent="calc.profitMarginPercent.value"
          :effectiveHourlyRate="calc.effectiveHourlyRate.value"
        />

        <BreakEvenDisplay
          :breakEvenRoas="calc.breakEvenRoas.value"
          :currentRoas="calc.roas.value"
        />

        <BreakdownTable
          :revenuePerUnit="calc.revenuePerUnit.value"
          :etsyListingFee="calc.etsyListingFee.value"
          :etsyTransactionFee="calc.etsyTransactionFee.value"
          :etsyPaymentProcessingFee="calc.etsyPaymentProcessingFee.value"
          :etsyOffsiteAdsFee="calc.etsyOffsiteAdsFee.value"
          :totalEtsyFeesPerUnit="calc.totalEtsyFeesPerUnit.value"
          :materialCost="calc.materialCost.value"
          :shippingCost="calc.shippingCost.value"
          :otherCost="calc.otherCost.value"
          :totalProductCostPerUnit="calc.totalProductCostPerUnit.value"
          :adCostPerUnit="calc.adCostPerUnit.value"
          :profitPerUnit="calc.profitPerUnit.value"
        />

        <HourlyRate
          :profitPerUnit="calc.profitPerUnit.value"
          :taxRate="calc.taxRate.value"
          :profitAfterTaxPerUnit="calc.profitAfterTaxPerUnit.value"
          :processingMinutes="calc.processingMinutes.value"
          :effectiveHourlyRate="calc.effectiveHourlyRate.value"
        />
      </div>
    </div>
  </div>
</template>
