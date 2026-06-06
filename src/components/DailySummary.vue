<script setup lang="ts">
import { formatCurrency } from '../composables/useFormatters'

defineProps<{
  dailyRevenue: number
  dailyEtsyFees: number
  dailyProductCosts: number
  adSpend: number
  dailyProfit: number
  unitsSoldPerDay: number
  monthlyRevenue: number
  monthlyEtsyFees: number
  monthlyProductCosts: number
  monthlyAdSpend: number
  monthlyProfit: number
}>()
</script>

<template>
  <div class="summary">
    <h3 class="summary-title">Daily Summary</h3>
    <div class="summary-grid">
      <div class="stat">
        <span class="stat-label">Units Sold</span>
        <span class="stat-value">{{ unitsSoldPerDay.toFixed(1) }}</span>
      </div>
      <div class="stat">
        <span class="stat-label">Revenue</span>
        <span class="stat-value">{{ formatCurrency(dailyRevenue) }}</span>
      </div>
      <div class="stat">
        <span class="stat-label">Etsy Fees</span>
        <span class="stat-value negative">-{{ formatCurrency(dailyEtsyFees) }}</span>
      </div>
      <div class="stat">
        <span class="stat-label">Product Costs</span>
        <span class="stat-value negative">-{{ formatCurrency(dailyProductCosts) }}</span>
      </div>
      <div class="stat">
        <span class="stat-label">Ad Spend</span>
        <span class="stat-value negative">-{{ formatCurrency(adSpend) }}</span>
      </div>
      <div class="stat profit-stat" :class="{ positive: dailyProfit > 0, loss: dailyProfit < 0 }">
        <span class="stat-label">Profit</span>
        <span class="stat-value">{{ formatCurrency(dailyProfit) }}</span>
      </div>
    </div>

    <h3 class="summary-title monthly-title">Monthly Projection (30 days)</h3>
    <div class="summary-grid">
      <div class="stat">
        <span class="stat-label">Revenue</span>
        <span class="stat-value">{{ formatCurrency(monthlyRevenue) }}</span>
      </div>
      <div class="stat">
        <span class="stat-label">Etsy Fees</span>
        <span class="stat-value negative">-{{ formatCurrency(monthlyEtsyFees) }}</span>
      </div>
      <div class="stat">
        <span class="stat-label">Product Costs</span>
        <span class="stat-value negative">-{{ formatCurrency(monthlyProductCosts) }}</span>
      </div>
      <div class="stat">
        <span class="stat-label">Ad Spend</span>
        <span class="stat-value negative">-{{ formatCurrency(monthlyAdSpend) }}</span>
      </div>
      <div
        class="stat profit-stat"
        :class="{ positive: monthlyProfit > 0, loss: monthlyProfit < 0 }"
      >
        <span class="stat-label">Profit</span>
        <span class="stat-value">{{ formatCurrency(monthlyProfit) }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.summary {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  padding: 1.25rem;
  box-shadow: var(--shadow-card);
}

.summary-title {
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--text-primary);
  margin: 0 0 0.9rem 0;
  letter-spacing: -0.01em;
}

.monthly-title {
  margin-top: 1rem;
  padding-top: 0.75rem;
  border-top: 1px solid var(--border);
}

.summary-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.5rem;
}

.stat {
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
}

.stat-label {
  font-size: 0.78rem;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.03em;
}

.stat-value {
  font-size: 1rem;
  font-weight: 600;
  color: var(--text-primary);
}

.stat-value.negative {
  color: var(--text-secondary);
}

.profit-stat {
  grid-column: 1 / -1;
  padding-top: 0.5rem;
  border-top: 1px dashed var(--border);
  margin-top: 0.25rem;
}

.profit-stat .stat-value {
  font-size: 1.15rem;
}

.profit-stat.positive .stat-value {
  color: var(--green-text);
}

.profit-stat.loss .stat-value {
  color: var(--red-text);
}
</style>
