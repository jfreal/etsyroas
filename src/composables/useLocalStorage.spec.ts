import { describe, it, expect, beforeEach } from 'vitest'
import { nextTick } from 'vue'
import { useLocalStorage, clearAllStorage } from './useLocalStorage'

describe('useLocalStorage', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('returns the default when nothing is stored', () => {
    const value = useLocalStorage('count', 10)
    expect(value.value).toBe(10)
  })

  it('hydrates from a previously stored value', () => {
    localStorage.setItem('etsyroas_count', JSON.stringify(42))
    const value = useLocalStorage('count', 10)
    expect(value.value).toBe(42)
  })

  it('persists changes back to localStorage (namespaced)', async () => {
    const value = useLocalStorage('count', 0)
    value.value = 7
    await nextTick()
    expect(localStorage.getItem('etsyroas_count')).toBe('7')
  })

  it('falls back to the default when stored JSON is corrupt', () => {
    localStorage.setItem('etsyroas_count', '{not json')
    const value = useLocalStorage('count', 5)
    expect(value.value).toBe(5)
  })
})

describe('clearAllStorage', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('removes only this app’s prefixed keys', () => {
    localStorage.setItem('etsyroas_a', '1')
    localStorage.setItem('etsyroas_b', '2')
    localStorage.setItem('unrelated', '3')

    clearAllStorage()

    expect(localStorage.getItem('etsyroas_a')).toBeNull()
    expect(localStorage.getItem('etsyroas_b')).toBeNull()
    expect(localStorage.getItem('unrelated')).toBe('3')
  })
})
