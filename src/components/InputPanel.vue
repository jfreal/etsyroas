<script setup lang="ts">
import InputGroup from './InputGroup.vue'
import FeeSettings from './FeeSettings.vue'

const roas = defineModel<number>('roas', { required: true })
const salePrice = defineModel<number>('salePrice', { required: true })
const shippingCharged = defineModel<number>('shippingCharged', { required: true })
const materialCost = defineModel<number>('materialCost', { required: true })
const shippingCost = defineModel<number>('shippingCost', { required: true })
const otherCost = defineModel<number>('otherCost', { required: true })
const processingMinutes = defineModel<number>('processingMinutes', { required: true })
const taxRate = defineModel<number>('taxRate', { required: true })
const unitsSoldPerDay = defineModel<number>('unitsSoldPerDay', { required: true })
const listingFee = defineModel<number>('listingFee', { required: true })
const transactionFeeRate = defineModel<number>('transactionFeeRate', { required: true })
const paymentProcessingRate = defineModel<number>('paymentProcessingRate', { required: true })
const paymentProcessingFlat = defineModel<number>('paymentProcessingFlat', { required: true })
const offsiteAdsEnabled = defineModel<boolean>('offsiteAdsEnabled', { required: true })
const offsiteAdsRate = defineModel<number>('offsiteAdsRate', { required: true })

const emit = defineEmits<{ reset: [] }>()
</script>

<template>
  <div class="input-panel">
    <div class="section">
      <h3 class="section-title">Product Pricing</h3>
      <InputGroup label="Sale Price" prefix="$" v-model="salePrice" />
      <InputGroup label="Shipping Charged to Buyer" prefix="$" v-model="shippingCharged" />
    </div>

    <div class="section">
      <h3 class="section-title">Your Costs</h3>
      <InputGroup label="Material Cost Per Unit" prefix="$" v-model="materialCost" />
      <InputGroup label="Shipping Cost Per Unit" prefix="$" v-model="shippingCost" />
      <InputGroup label="Other Cost Per Unit" prefix="$" v-model="otherCost" />
    </div>

    <div class="section">
      <h3 class="section-title">Ads, Volume &amp; Time</h3>
      <InputGroup label="ROAS" suffix="x" v-model="roas" :step="0.1" />
      <InputGroup label="Units Sold Per Day" v-model="unitsSoldPerDay" :step="1" />
      <InputGroup
        label="Processing Time Per Item"
        suffix="min"
        v-model="processingMinutes"
        :step="1"
      />
      <InputGroup label="Estimated Tax Rate" suffix="%" v-model="taxRate" :step="1" />
    </div>

    <div class="section">
      <div class="offsite-toggle">
        <label class="switch-label">
          <span class="switch-text">
            <span class="switch-title">Sale came from Offsite Ad</span>
            <span class="switch-hint">Etsy charges an extra fee on Offsite Ad sales</span>
          </span>
          <span class="switch">
            <input type="checkbox" v-model="offsiteAdsEnabled" />
            <span class="switch-track"></span>
            <span class="switch-thumb"></span>
          </span>
        </label>
      </div>

      <FeeSettings
        v-model:listingFee="listingFee"
        v-model:transactionFeeRate="transactionFeeRate"
        v-model:paymentProcessingRate="paymentProcessingRate"
        v-model:paymentProcessingFlat="paymentProcessingFlat"
        v-model:offsiteAdsRate="offsiteAdsRate"
      />
    </div>

    <button class="reset-btn" @click="emit('reset')" type="button">Reset to Defaults</button>
  </div>
</template>

<style scoped>
.input-panel {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.section {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  padding: 1.25rem;
  box-shadow: var(--shadow-card);
}

.section-title {
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--text-primary);
  margin: 0 0 0.9rem 0;
  letter-spacing: -0.01em;
}

.offsite-toggle {
  margin-bottom: 0.5rem;
}

/* macOS-style switch */
.switch-label {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  cursor: pointer;
}

.switch-text {
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
}

.switch-title {
  font-size: 0.9rem;
  font-weight: 500;
  color: var(--text-primary);
}

.switch-hint {
  font-size: 0.78rem;
  color: var(--text-muted);
}

.switch {
  position: relative;
  flex-shrink: 0;
  width: 44px;
  height: 26px;
}

.switch input {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  margin: 0;
  opacity: 0;
  cursor: pointer;
}

.switch-track {
  position: absolute;
  inset: 0;
  background: var(--border-strong);
  border-radius: 999px;
  transition: background-color 0.2s ease;
}

.switch-thumb {
  position: absolute;
  top: 3px;
  left: 3px;
  width: 20px;
  height: 20px;
  background: var(--switch-thumb);
  border-radius: 50%;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.25);
  transition: transform 0.2s ease;
}

.switch input:checked ~ .switch-track {
  background: var(--switch-on);
}

.switch input:checked ~ .switch-thumb {
  transform: translateX(18px);
}

.switch input:focus-visible ~ .switch-track {
  box-shadow: 0 0 0 3px var(--accent-light);
}

.reset-btn {
  background: var(--bg-card);
  border: 1px solid var(--border-strong);
  border-radius: var(--radius-md);
  padding: 0.5rem 1.1rem;
  font-size: 0.85rem;
  font-weight: 500;
  color: var(--text-secondary);
  cursor: pointer;
  align-self: flex-start;
  transition:
    background-color 0.15s ease,
    border-color 0.15s ease,
    color 0.15s ease;
}

.reset-btn:hover {
  background: var(--bg-subtle);
  border-color: var(--text-muted);
  color: var(--text-primary);
}
</style>
