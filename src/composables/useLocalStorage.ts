import { ref, watch, type Ref } from 'vue'

/** Namespace for every key this app writes, so `clearAllStorage` can find them. */
const STORAGE_PREFIX = 'etsyroas_'

/**
 * A `ref` that transparently persists to `localStorage`.
 *
 * Reads the stored value on creation (falling back to `defaultValue`) and
 * writes back on every change. All storage access is wrapped in try/catch so
 * the app degrades gracefully when storage is unavailable or full — e.g.
 * private-browsing modes that throw on write, or corrupt/legacy JSON.
 *
 * @param key Unprefixed storage key, unique per value.
 * @param defaultValue Value used when nothing is stored yet.
 */
export function useLocalStorage<T>(key: string, defaultValue: T): Ref<T> {
  const storageKey = STORAGE_PREFIX + key

  let initial = defaultValue
  try {
    const stored = localStorage.getItem(storageKey)
    if (stored !== null) {
      initial = JSON.parse(stored)
    }
  } catch {
    // Corrupt JSON or storage disabled — fall back to the default.
  }

  const data = ref(initial) as Ref<T>

  watch(
    data,
    (val) => {
      try {
        localStorage.setItem(storageKey, JSON.stringify(val))
      } catch {
        // Quota exceeded or storage disabled — keep working in-memory.
      }
    },
    { deep: true },
  )

  return data
}

/** Remove every value this app has written, leaving other apps' keys intact. */
export function clearAllStorage(): void {
  const keys: string[] = []
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i)
    if (key?.startsWith(STORAGE_PREFIX)) {
      keys.push(key)
    }
  }
  keys.forEach((k) => localStorage.removeItem(k))
}
