<script setup lang="ts">
/**
 * A reusable disclosure (show/hide) widget with an animated chevron.
 *
 * Replaces the hand-rolled toggles that previously rendered a literal
 * `&#9660;` HTML entity inside a `{{ }}` interpolation — Vue treats mustache
 * content as plain text, so the entity never decoded. The chevron here is an
 * inline SVG, so it renders reliably and animates on open/close.
 */
import { ref } from 'vue'

withDefaults(
  defineProps<{
    /** Text shown on the toggle button. */
    label: string
    /** Visual weight of the toggle: muted secondary text or the brand accent. */
    tone?: 'muted' | 'accent'
    /** Container style for the revealed content. */
    panel?: 'card' | 'subtle' | 'none'
  }>(),
  { tone: 'muted', panel: 'none' },
)

const isOpen = ref(false)
</script>

<template>
  <div class="collapsible">
    <button
      class="collapsible-toggle"
      :class="tone"
      type="button"
      :aria-expanded="isOpen"
      @click="isOpen = !isOpen"
    >
      <svg
        class="chevron"
        :class="{ open: isOpen }"
        width="12"
        height="12"
        viewBox="0 0 16 16"
        aria-hidden="true"
      >
        <path
          d="M6 3l5 5-5 5"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
      {{ label }}
    </button>

    <Transition name="disclosure">
      <div v-if="isOpen" class="collapsible-content" :class="`panel-${panel}`">
        <slot />
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.collapsible-toggle {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.4rem 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.88rem;
  font-weight: 500;
  color: var(--text-secondary);
  transition: color 0.15s;
}

.collapsible-toggle.muted:hover {
  color: var(--text-primary);
}

.collapsible-toggle.accent {
  color: var(--accent);
  font-size: 0.9rem;
}

.collapsible-toggle.accent:hover {
  text-decoration: underline;
}

.chevron {
  flex-shrink: 0;
  transition: transform 0.18s ease;
}

.chevron.open {
  transform: rotate(90deg);
}

.collapsible-content {
  margin-top: 0.6rem;
}

.collapsible-content.panel-subtle {
  padding: 0.85rem;
  background: var(--bg-subtle);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
}

.collapsible-content.panel-card {
  padding: 1.25rem 1.4rem;
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-card);
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

/* Enter/leave animation for the revealed panel. */
.disclosure-enter-active,
.disclosure-leave-active {
  transition:
    opacity 0.18s ease,
    transform 0.18s ease;
}

.disclosure-enter-from,
.disclosure-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}
</style>
