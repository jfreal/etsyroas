import { ref, watch, type Ref } from 'vue'

const STORAGE_PREFIX = 'etsyroas_'

export function useLocalStorage<T>(key: string, defaultValue: T): Ref<T> {
  const storageKey = STORAGE_PREFIX + key

  let initial = defaultValue
  try {
    const stored = localStorage.getItem(storageKey)
    if (stored !== null) {
      initial = JSON.parse(stored)
    }
  } catch {
    // ignore parse errors, use default
  }

  const data = ref(initial) as Ref<T>

  watch(data, (val) => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(val))
    } catch {
      // ignore quota errors
    }
  }, { deep: true })

  return data
}

export function clearAllStorage() {
  const keys: string[] = []
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i)
    if (key?.startsWith(STORAGE_PREFIX)) {
      keys.push(key)
    }
  }
  keys.forEach((k) => localStorage.removeItem(k))
}
