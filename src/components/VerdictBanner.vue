<script setup lang="ts">
import { computed } from 'vue'
import { formatCurrency, formatPercent } from '../composables/useFormatters'

type Verdict = 'profitable' | 'losing' | 'breakeven'

const props = defineProps<{
  verdict: Verdict
  profitPerUnit: number
  profitMarginPercent: number
  effectiveHourlyRate: number
}>()

const LABELS: Record<Verdict, string> = {
  profitable: 'Profitable',
  losing: 'Losing Money',
  breakeven: 'Breaking Even',
}

const label = computed(() => LABELS[props.verdict])
</script>

<template>
  <div class="verdict-banner" :class="verdict">
    <div class="verdict-label">{{ label }}</div>
    <div class="verdict-details">
      <span class="verdict-profit">{{ formatCurrency(profitPerUnit) }} / unit</span>
      <span class="verdict-margin">{{ formatPercent(profitMarginPercent) }} margin</span>
      <span class="verdict-hourly">{{ formatCurrency(effectiveHourlyRate) }} / hr</span>
    </div>
  </div>
</template>

<style scoped>
.verdict-banner {
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  padding: 1.4rem 1.4rem;
  text-align: center;
  transition:
    background-color 0.3s,
    color 0.3s;
  box-shadow: var(--shadow-card);
}

.verdict-banner.profitable {
  background: var(--green-bg);
  color: var(--green-text);
}

.verdict-banner.losing {
  background: var(--red-bg);
  color: var(--red-text);
}

.verdict-banner.breakeven {
  background: var(--yellow-bg);
  color: var(--yellow-text);
}

.verdict-label {
  font-size: 1.3rem;
  font-weight: 700;
  letter-spacing: -0.015em;
}

.verdict-details {
  margin-top: 0.45rem;
  font-size: 0.95rem;
  font-weight: 500;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.5rem 1.4rem;
}
</style>
