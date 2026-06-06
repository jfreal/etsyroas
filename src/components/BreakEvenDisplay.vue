<script setup lang="ts">
import { computed } from 'vue'
import { formatRoas } from '../composables/useFormatters'

const props = defineProps<{
  breakEvenRoas: number
  currentRoas: number
}>()

const diff = computed(() => props.currentRoas - props.breakEvenRoas)
const isAbove = computed(() => diff.value > 0.01)
const isBelow = computed(() => diff.value < -0.01)
const isViable = computed(() => isFinite(props.breakEvenRoas))
</script>

<template>
  <div class="break-even">
    <h3 class="break-even-title">Break-Even ROAS</h3>

    <div v-if="isViable" class="comparison">
      <div class="roas-row">
        <span class="roas-label">Your ROAS</span>
        <span class="roas-value current">{{ formatRoas(currentRoas) }}</span>
      </div>
      <div class="roas-row">
        <span class="roas-label">Break-Even</span>
        <span class="roas-value breakeven">{{ formatRoas(breakEvenRoas) }}</span>
      </div>
      <div class="roas-message" :class="{ above: isAbove, below: isBelow }">
        <template v-if="isAbove"> {{ formatRoas(Math.abs(diff)) }} above break-even </template>
        <template v-else-if="isBelow"> {{ formatRoas(Math.abs(diff)) }} below break-even </template>
        <template v-else> At break-even </template>
      </div>
    </div>

    <div v-else class="not-viable">
      Costs exceed revenue even without ads. This product is not viable at this price.
    </div>
  </div>
</template>

<style scoped>
.break-even {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 1rem;
  box-shadow: var(--shadow-card);
}

.break-even-title {
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--accent);
  margin: 0 0 0.75rem 0;
  text-transform: uppercase;
  letter-spacing: 0.03em;
}

.comparison {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.roas-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.roas-label {
  font-size: 0.88rem;
  color: var(--text-secondary);
}

.roas-value {
  font-size: 1.1rem;
  font-weight: 700;
}

.roas-value.current {
  color: var(--text-primary);
}

.roas-value.breakeven {
  color: var(--text-secondary);
}

.roas-message {
  text-align: center;
  font-size: 0.88rem;
  font-weight: 600;
  padding: 0.4rem;
  border-radius: 4px;
  margin-top: 0.25rem;
}

.roas-message.above {
  background: var(--green-bg);
  color: var(--green-text);
}

.roas-message.below {
  background: var(--red-bg);
  color: var(--red-text);
}

.not-viable {
  color: var(--red-text);
  font-size: 0.9rem;
  font-weight: 500;
  background: var(--red-bg);
  padding: 0.75rem;
  border-radius: 6px;
}
</style>
