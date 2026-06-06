import { ref, watch } from 'vue'

export type Theme = 'light' | 'dark'

const STORAGE_KEY = 'etsyroas_theme'

/**
 * Resolve the starting theme: an explicit saved choice wins, otherwise we
 * honour the OS-level `prefers-color-scheme`, falling back to light.
 */
function getInitialTheme(): Theme {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored === 'light' || stored === 'dark') return stored
  } catch {
    // storage unavailable — fall through to system preference
  }
  try {
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) return 'dark'
  } catch {
    // matchMedia unavailable (e.g. tests) — fall through to light
  }
  return 'light'
}

/** Reflect the active theme onto <html> so CSS variables can switch. */
function applyTheme(theme: Theme): void {
  try {
    document.documentElement.setAttribute('data-theme', theme)
  } catch {
    // no document (e.g. tests) — nothing to reflect
  }
}

// Module-level singleton: every component shares one source of truth.
const theme = ref<Theme>(getInitialTheme())
let initialized = false

/**
 * Light/dark theme state. The first caller wires up the side effects (applying
 * the attribute and persisting changes); subsequent callers reuse the same
 * reactive ref.
 */
export function useTheme() {
  if (!initialized) {
    initialized = true
    applyTheme(theme.value)
    watch(theme, (next) => {
      applyTheme(next)
      try {
        localStorage.setItem(STORAGE_KEY, next)
      } catch {
        // storage unavailable — the choice simply won't persist
      }
    })
  }

  function toggle(): void {
    theme.value = theme.value === 'dark' ? 'light' : 'dark'
  }

  return { theme, toggle }
}
