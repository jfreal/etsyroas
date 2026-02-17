<script setup lang="ts">
import { ref } from 'vue'
import InputGroup from './InputGroup.vue'

const listingFee = defineModel<number>('listingFee', { required: true })
const transactionFeeRate = defineModel<number>('transactionFeeRate', { required: true })
const paymentProcessingRate = defineModel<number>('paymentProcessingRate', { required: true })
const paymentProcessingFlat = defineModel<number>('paymentProcessingFlat', { required: true })
const offsiteAdsRate = defineModel<number>('offsiteAdsRate', { required: true })

const isOpen = ref(false)
</script>

<template>
  <div class="fee-settings">
    <button class="toggle-btn" @click="isOpen = !isOpen" type="button">
      <span class="toggle-icon">{{ isOpen ? '&#9660;' : '&#9654;' }}</span>
      Advanced: Fee Rates
    </button>
    <div v-show="isOpen" class="fee-fields">
      <InputGroup label="Listing Fee" prefix="$" v-model="listingFee" :step="0.01" />
      <InputGroup label="Transaction Fee" suffix="%" v-model="transactionFeeRate" :step="0.1" />
      <InputGroup label="Payment Processing" suffix="%" v-model="paymentProcessingRate" :step="0.1" />
      <InputGroup label="Processing Flat Fee" prefix="$" v-model="paymentProcessingFlat" :step="0.01" />
      <InputGroup label="Offsite Ads Fee" suffix="%" v-model="offsiteAdsRate" :step="1" />
    </div>
  </div>
</template>

<style scoped>
.fee-settings {
  margin-top: 0.5rem;
}

.toggle-btn {
  background: none;
  border: none;
  color: var(--text-secondary);
  font-size: 0.85rem;
  cursor: pointer;
  padding: 0.4rem 0;
  display: flex;
  align-items: center;
  gap: 0.4rem;
}

.toggle-btn:hover {
  color: var(--text-primary);
}

.toggle-icon {
  font-size: 0.7rem;
}

.fee-fields {
  margin-top: 0.5rem;
  padding: 0.75rem;
  background: var(--bg-subtle);
  border-radius: 6px;
}
</style>
