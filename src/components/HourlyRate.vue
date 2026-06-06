<script setup lang="ts">
import { formatCurrency, formatPercent } from '../composables/useFormatters'

defineProps<{
  profitPerUnit: number
  taxRate: number
  profitAfterTaxPerUnit: number
  processingMinutes: number
  effectiveHourlyRate: number
}>()
</script>

<template>
  <div class="hourly-rate">
    <h3 class="hourly-title">Your Hourly Rate</h3>

    <div class="calc-steps">
      <div class="step">
        <span class="step-label">Profit Per Unit</span>
        <span class="step-value">{{ formatCurrency(profitPerUnit) }}</span>
      </div>
      <div class="step">
        <span class="step-label">Tax ({{ formatPercent(taxRate) }})</span>
        <span class="step-value negative"
          >-{{
            formatCurrency(profitPerUnit > 0 ? profitPerUnit - profitAfterTaxPerUnit : 0)
          }}</span
        >
      </div>
      <div class="step after-tax">
        <span class="step-label">After Tax</span>
        <span
          class="step-value"
          :class="{ positive: profitAfterTaxPerUnit > 0, loss: profitAfterTaxPerUnit < 0 }"
        >
          {{ formatCurrency(profitAfterTaxPerUnit) }}
        </span>
      </div>
      <div class="step">
        <span class="step-label">Processing Time</span>
        <span class="step-value">{{ processingMinutes }} min</span>
      </div>
    </div>

    <div
      class="rate-display"
      :class="{ positive: effectiveHourlyRate > 0, loss: effectiveHourlyRate < 0 }"
    >
      <span class="rate-amount">{{ formatCurrency(effectiveHourlyRate) }}</span>
      <span class="rate-label">per hour</span>
    </div>
  </div>
</template>

<style scoped>
.hourly-rate {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  padding: 1.25rem;
  box-shadow: var(--shadow-card);
}

.hourly-title {
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--text-primary);
  margin: 0 0 0.9rem 0;
  letter-spacing: -0.01em;
}

.calc-steps {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  margin-bottom: 0.75rem;
}

.step {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.85rem;
  padding: 0.2rem 0;
}

.step-label {
  color: var(--text-secondary);
}

.step-value {
  font-weight: 500;
  color: var(--text-primary);
}

.step-value.negative {
  color: var(--text-secondary);
}

.step-value.positive {
  color: var(--green-text);
}

.step-value.loss {
  color: var(--red-text);
}

.step.after-tax {
  border-top: 1px dashed var(--border);
  padding-top: 0.35rem;
  margin-top: 0.1rem;
}

.rate-display {
  text-align: center;
  padding: 1rem;
  border-radius: var(--radius-md);
  background: var(--bg-subtle);
}

.rate-display.positive {
  background: var(--green-bg);
}

.rate-display.loss {
  background: var(--red-bg);
}

.rate-amount {
  font-size: 1.5rem;
  font-weight: 700;
}

.rate-display.positive .rate-amount {
  color: var(--green-text);
}

.rate-display.loss .rate-amount {
  color: var(--red-text);
}

.rate-label {
  display: block;
  font-size: 0.8rem;
  color: var(--text-secondary);
  margin-top: 0.1rem;
}

.rate-display.positive .rate-label {
  color: var(--green-text);
}

.rate-display.loss .rate-label {
  color: var(--red-text);
}
</style>
