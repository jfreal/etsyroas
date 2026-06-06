<script setup lang="ts">
import { useCalculator } from './composables/useCalculator'
import InputPanel from './components/InputPanel.vue'
import VerdictBanner from './components/VerdictBanner.vue'
import BreakdownTable from './components/BreakdownTable.vue'
import BreakEvenDisplay from './components/BreakEvenDisplay.vue'
import HourlyRate from './components/HourlyRate.vue'
import DailySummary from './components/DailySummary.vue'
import HowItWorks from './components/HowItWorks.vue'
import ThemeToggle from './components/ThemeToggle.vue'

const calc = useCalculator()
</script>

<template>
  <div class="app">
    <header class="app-header">
      <div class="brand">
        <span class="brand-mark" aria-hidden="true">
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2.2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M3 17l6-6 4 4 8-8" />
            <path d="M17 7h4v4" />
          </svg>
        </span>
        <div class="brand-text">
          <h1 class="app-title">Etsy Ads Profitability Calculator</h1>
          <p class="app-subtitle">
            Find out if your Etsy Ads are actually profitable after all fees and costs.
          </p>
        </div>
      </div>
      <ThemeToggle />
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
        v-model:unitsSoldPerDay="calc.unitsSoldPerDay.value"
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

        <DailySummary
          :unitsSoldPerDay="calc.unitsSoldPerDay.value"
          :dailyRevenue="calc.dailyRevenue.value"
          :dailyEtsyFees="calc.dailyEtsyFees.value"
          :dailyProductCosts="calc.dailyProductCosts.value"
          :adSpend="calc.dailyAdSpend.value"
          :dailyProfit="calc.dailyProfit.value"
          :monthlyRevenue="calc.monthlyRevenue.value"
          :monthlyEtsyFees="calc.monthlyEtsyFees.value"
          :monthlyProductCosts="calc.monthlyProductCosts.value"
          :monthlyAdSpend="calc.monthlyAdSpend.value"
          :monthlyProfit="calc.monthlyProfit.value"
        />
      </div>
    </div>

    <HowItWorks />

    <footer class="app-footer">
      <p>
        I built this to calculate the profitability of my own Etsy shop,
        <a href="https://ordoupcyclum.etsy.com/" target="_blank" rel="noopener noreferrer"
          >ordoupcyclum</a
        >. The other calculators I found were much harder to use and didn't have all the inputs I
        wanted.
      </p>
    </footer>
  </div>
</template>
