<script setup lang="ts">
import { useId } from 'vue'

defineProps<{
  label: string
  prefix?: string
  suffix?: string
  step?: number
  min?: number
}>()

const model = defineModel<number>({ required: true })

// Unique id so the <label> is programmatically tied to its <input>.
const inputId = useId()
</script>

<template>
  <div class="input-group">
    <label class="input-label" :for="inputId">{{ label }}</label>
    <div class="input-wrapper">
      <span v-if="prefix" class="input-adornment prefix">{{ prefix }}</span>
      <input
        :id="inputId"
        type="number"
        inputmode="decimal"
        v-model.number="model"
        :step="step ?? 0.01"
        :min="min ?? 0"
        class="input-field"
        :class="{ 'has-prefix': prefix, 'has-suffix': suffix }"
      />
      <span v-if="suffix" class="input-adornment suffix">{{ suffix }}</span>
    </div>
  </div>
</template>

<style scoped>
.input-group {
  margin-bottom: 0.75rem;
}

.input-label {
  display: block;
  font-size: 0.82rem;
  font-weight: 500;
  color: var(--text-secondary);
  margin-bottom: 0.32rem;
}

.input-wrapper {
  display: flex;
  align-items: center;
  background: var(--bg-card);
  border: 1px solid var(--border-strong);
  border-radius: var(--radius-md);
  overflow: hidden;
  transition:
    border-color 0.15s ease,
    box-shadow 0.15s ease;
}

.input-wrapper:focus-within {
  border-color: var(--accent);
  box-shadow: 0 0 0 3px var(--accent-light);
}

.input-adornment {
  padding: 0.5rem 0.65rem;
  color: var(--text-muted);
  font-size: 0.9rem;
  user-select: none;
}

.input-field {
  flex: 1;
  border: none;
  outline: none;
  padding: 0.55rem 0.7rem;
  font-size: 0.95rem;
  min-width: 0;
  background: transparent;
  color: var(--text-primary);
}

.input-field.has-prefix {
  padding-left: 0.2rem;
}

.input-field.has-suffix {
  padding-right: 0.2rem;
}

/* Hide number spinner */
.input-field::-webkit-outer-spin-button,
.input-field::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
.input-field[type='number'] {
  -moz-appearance: textfield;
}
</style>
