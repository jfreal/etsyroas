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
        <label class="checkbox-label">
          <input type="checkbox" v-model="offsiteAdsEnabled" />
          <span>Sale came from Offsite Ad</span>
        </label>
        <span class="offsite-hint">Etsy charges an extra fee on Offsite Ad sales</span>
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
  border-radius: 8px;
  padding: 1rem;
  box-shadow: var(--shadow-card);
}

.section-title {
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--accent);
  margin: 0 0 0.75rem 0;
  text-transform: uppercase;
  letter-spacing: 0.03em;
}

.offsite-toggle {
  margin-bottom: 0.5rem;
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 500;
  color: var(--text-primary);
}

.checkbox-label input[type='checkbox'] {
  width: 1rem;
  height: 1rem;
  accent-color: var(--accent);
}

.offsite-hint {
  display: block;
  font-size: 0.78rem;
  color: var(--text-muted);
  margin-top: 0.25rem;
  margin-left: 1.5rem;
}

.reset-btn {
  background: none;
  border: 1px solid var(--border);
  border-radius: 6px;
  padding: 0.5rem 1rem;
  font-size: 0.85rem;
  color: var(--text-secondary);
  cursor: pointer;
  align-self: flex-start;
  transition: all 0.15s;
}

.reset-btn:hover {
  border-color: var(--text-secondary);
  color: var(--text-primary);
}
</style>
