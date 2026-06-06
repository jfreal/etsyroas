<script setup lang="ts">
import { formatCurrency } from '../composables/useFormatters'

defineProps<{
  revenuePerUnit: number
  etsyListingFee: number
  etsyTransactionFee: number
  etsyPaymentProcessingFee: number
  etsyOffsiteAdsFee: number
  totalEtsyFeesPerUnit: number
  materialCost: number
  shippingCost: number
  otherCost: number
  totalProductCostPerUnit: number
  adCostPerUnit: number
  profitPerUnit: number
}>()
</script>

<template>
  <div class="breakdown">
    <h3 class="breakdown-title">Per-Unit Breakdown</h3>
    <div class="breakdown-rows">
      <div class="row revenue">
        <span class="row-label">Revenue</span>
        <span class="row-value">{{ formatCurrency(revenuePerUnit) }}</span>
      </div>

      <div class="row-group">
        <div class="row-group-header">Etsy Fees</div>
        <div class="row sub">
          <span class="row-label">Listing Fee</span>
          <span class="row-value negative">-{{ formatCurrency(etsyListingFee) }}</span>
        </div>
        <div class="row sub">
          <span class="row-label">Transaction Fee</span>
          <span class="row-value negative">-{{ formatCurrency(etsyTransactionFee) }}</span>
        </div>
        <div class="row sub">
          <span class="row-label">Payment Processing</span>
          <span class="row-value negative">-{{ formatCurrency(etsyPaymentProcessingFee) }}</span>
        </div>
        <div class="row sub" v-if="etsyOffsiteAdsFee > 0">
          <span class="row-label">Offsite Ads Fee</span>
          <span class="row-value negative">-{{ formatCurrency(etsyOffsiteAdsFee) }}</span>
        </div>
        <div class="row subtotal">
          <span class="row-label">Total Etsy Fees</span>
          <span class="row-value negative">-{{ formatCurrency(totalEtsyFeesPerUnit) }}</span>
        </div>
      </div>

      <div class="row-group">
        <div class="row-group-header">Your Costs</div>
        <div class="row sub" v-if="materialCost > 0">
          <span class="row-label">Materials</span>
          <span class="row-value negative">-{{ formatCurrency(materialCost) }}</span>
        </div>
        <div class="row sub" v-if="shippingCost > 0">
          <span class="row-label">Shipping</span>
          <span class="row-value negative">-{{ formatCurrency(shippingCost) }}</span>
        </div>
        <div class="row sub" v-if="otherCost > 0">
          <span class="row-label">Other</span>
          <span class="row-value negative">-{{ formatCurrency(otherCost) }}</span>
        </div>
        <div class="row subtotal">
          <span class="row-label">Total Product Costs</span>
          <span class="row-value negative">-{{ formatCurrency(totalProductCostPerUnit) }}</span>
        </div>
      </div>

      <div class="row ad-cost">
        <span class="row-label">Ad Cost Per Unit</span>
        <span class="row-value negative">-{{ formatCurrency(adCostPerUnit) }}</span>
      </div>

      <div class="row profit-row" :class="{ positive: profitPerUnit > 0, loss: profitPerUnit < 0 }">
        <span class="row-label">Profit Per Unit</span>
        <span class="row-value">{{ formatCurrency(profitPerUnit) }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.breakdown {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  padding: 1.25rem;
  box-shadow: var(--shadow-card);
}

.breakdown-title {
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--text-primary);
  margin: 0 0 0.9rem 0;
  letter-spacing: -0.01em;
}

.breakdown-rows {
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
}

.row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.3rem 0;
  font-size: 0.9rem;
}

.row.revenue {
  font-weight: 600;
  font-size: 0.95rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid var(--border);
  margin-bottom: 0.25rem;
}

.row.sub {
  padding-left: 0.75rem;
  color: var(--text-secondary);
  font-size: 0.85rem;
}

.row.subtotal {
  font-weight: 500;
  font-size: 0.88rem;
  border-top: 1px dashed var(--border);
  padding-top: 0.3rem;
  margin-top: 0.15rem;
}

.row.ad-cost {
  font-weight: 500;
  padding-top: 0.3rem;
  border-top: 1px solid var(--border);
  margin-top: 0.25rem;
}

.row.profit-row {
  font-weight: 700;
  font-size: 1rem;
  padding-top: 0.5rem;
  border-top: 2px solid var(--border);
  margin-top: 0.35rem;
}

.row.profit-row.positive .row-value {
  color: var(--green-text);
}

.row.profit-row.loss .row-value {
  color: var(--red-text);
}

.row-group {
  margin: 0.25rem 0;
}

.row-group-header {
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.04em;
  margin-bottom: 0.1rem;
}

.negative {
  color: var(--text-secondary);
}
</style>
