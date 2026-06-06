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
  border-radius: 8px;
  padding: 1rem 1.25rem;
  text-align: center;
  transition:
    background-color 0.3s,
    color 0.3s;
  border-top: 3px solid transparent;
  box-shadow: var(--shadow-card);
}

.verdict-banner.profitable {
  background: var(--green-bg);
  color: var(--green-text);
  border-top-color: var(--green-text);
}

.verdict-banner.losing {
  background: var(--red-bg);
  color: var(--red-text);
  border-top-color: var(--red-text);
}

.verdict-banner.breakeven {
  background: var(--yellow-bg);
  color: var(--yellow-text);
  border-top-color: var(--yellow-text);
}

.verdict-label {
  font-size: 1.3rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.verdict-details {
  margin-top: 0.35rem;
  font-size: 1rem;
  font-weight: 500;
  display: flex;
  justify-content: center;
  gap: 1.5rem;
}
</style>
