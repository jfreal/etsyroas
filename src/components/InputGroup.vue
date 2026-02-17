<script setup lang="ts">
defineProps<{
  label: string
  prefix?: string
  suffix?: string
  step?: number
  min?: number
}>()

const model = defineModel<number>({ required: true })
</script>

<template>
  <div class="input-group">
    <label class="input-label">{{ label }}</label>
    <div class="input-wrapper">
      <span v-if="prefix" class="input-adornment prefix">{{ prefix }}</span>
      <input
        type="number"
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
  font-size: 0.85rem;
  font-weight: 500;
  color: var(--text-secondary);
  margin-bottom: 0.25rem;
}

.input-wrapper {
  display: flex;
  align-items: center;
  border: 1px solid var(--border);
  border-radius: 6px;
  overflow: hidden;
  transition: border-color 0.15s;
}

.input-wrapper:focus-within {
  border-color: var(--accent);
  box-shadow: 0 0 0 2px var(--accent-light);
}

.input-adornment {
  padding: 0.5rem 0.6rem;
  background: var(--bg-subtle);
  color: var(--text-secondary);
  font-size: 0.85rem;
  user-select: none;
}

.input-field {
  flex: 1;
  border: none;
  outline: none;
  padding: 0.5rem 0.6rem;
  font-size: 0.95rem;
  min-width: 0;
  background: var(--bg-card);
  color: var(--text-primary);
}

.input-field.has-prefix {
  padding-left: 0.4rem;
}

.input-field.has-suffix {
  padding-right: 0.4rem;
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
