import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import VerdictBanner from './VerdictBanner.vue'

function mountBanner(verdict: 'profitable' | 'losing' | 'breakeven') {
  return mount(VerdictBanner, {
    props: {
      verdict,
      profitPerUnit: 1.68,
      profitMarginPercent: 6.7,
      effectiveHourlyRate: 5.03,
    },
  })
}

describe('VerdictBanner', () => {
  it('shows a human-readable label per verdict', () => {
    expect(mountBanner('profitable').text()).toContain('Profitable')
    expect(mountBanner('losing').text()).toContain('Losing Money')
    expect(mountBanner('breakeven').text()).toContain('Breaking Even')
  })

  it('applies the verdict as a CSS class for theming', () => {
    expect(mountBanner('profitable').classes()).toContain('profitable')
    expect(mountBanner('losing').classes()).toContain('losing')
  })

  it('renders the formatted profit, margin, and hourly figures', () => {
    const text = mountBanner('profitable').text()
    expect(text).toContain('$1.68 / unit')
    expect(text).toContain('6.7% margin')
    expect(text).toContain('$5.03 / hr')
  })
})
