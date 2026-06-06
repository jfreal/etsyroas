import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'

// useTheme is a module-level singleton, so each test resets the module
// registry and re-imports it to get fresh state. The persistence side effect
// runs in a Vue watcher (a microtask), so we wait a macrotask to let it flush.
const flush = () => new Promise((resolve) => setTimeout(resolve, 0))

function stubMatchMedia(prefersDark: boolean) {
  vi.stubGlobal('matchMedia', (query: string) => ({
    matches: typeof query === 'string' && query.includes('dark') ? prefersDark : false,
    media: query,
    onchange: null,
    addEventListener: () => {},
    removeEventListener: () => {},
    addListener: () => {},
    removeListener: () => {},
    dispatchEvent: () => false,
  }))
}

beforeEach(() => {
  vi.resetModules()
  localStorage.clear()
  document.documentElement.removeAttribute('data-theme')
})

afterEach(() => {
  vi.unstubAllGlobals()
  vi.restoreAllMocks()
})

describe('useTheme', () => {
  it('defaults to light when nothing is stored and the system prefers light', async () => {
    stubMatchMedia(false)
    const { useTheme } = await import('./useTheme')
    const { theme } = useTheme()
    expect(theme.value).toBe('light')
    expect(document.documentElement.getAttribute('data-theme')).toBe('light')
  })

  it('falls back to the system preference when no choice is stored', async () => {
    stubMatchMedia(true)
    const { useTheme } = await import('./useTheme')
    const { theme } = useTheme()
    expect(theme.value).toBe('dark')
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark')
  })

  it('honours a stored choice over the system preference', async () => {
    stubMatchMedia(true) // system prefers dark...
    localStorage.setItem('etsyroas_theme', 'light') // ...but the user chose light
    const { useTheme } = await import('./useTheme')
    expect(useTheme().theme.value).toBe('light')
  })

  it('toggle flips the theme, reflects it on <html>, and persists it', async () => {
    stubMatchMedia(false)
    const { useTheme } = await import('./useTheme')
    const { theme, toggle } = useTheme()

    toggle()
    await flush()
    expect(theme.value).toBe('dark')
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark')
    expect(localStorage.getItem('etsyroas_theme')).toBe('dark')

    toggle()
    await flush()
    expect(theme.value).toBe('light')
    expect(localStorage.getItem('etsyroas_theme')).toBe('light')
  })

  it('does not throw when storage is unavailable', async () => {
    stubMatchMedia(false)
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new Error('storage disabled')
    })
    const { useTheme } = await import('./useTheme')
    const { toggle } = useTheme()

    expect(() => toggle()).not.toThrow()
    await flush()
    // The theme still applies to the DOM even though persistence failed.
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark')
  })
})
