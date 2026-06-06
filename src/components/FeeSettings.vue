<script setup lang="ts">
import InputGroup from './InputGroup.vue'
import CollapsibleSection from './CollapsibleSection.vue'

const listingFee = defineModel<number>('listingFee', { required: true })
const transactionFeeRate = defineModel<number>('transactionFeeRate', { required: true })
const paymentProcessingRate = defineModel<number>('paymentProcessingRate', { required: true })
const paymentProcessingFlat = defineModel<number>('paymentProcessingFlat', { required: true })
const offsiteAdsRate = defineModel<number>('offsiteAdsRate', { required: true })
</script>

<template>
  <div class="fee-settings">
    <CollapsibleSection label="Advanced: Fee Rates" tone="muted" panel="subtle">
      <InputGroup label="Listing Fee" prefix="$" v-model="listingFee" :step="0.01" />
      <InputGroup label="Transaction Fee" suffix="%" v-model="transactionFeeRate" :step="0.1" />
      <InputGroup
        label="Payment Processing"
        suffix="%"
        v-model="paymentProcessingRate"
        :step="0.1"
      />
      <InputGroup
        label="Processing Flat Fee"
        prefix="$"
        v-model="paymentProcessingFlat"
        :step="0.01"
      />
      <InputGroup label="Offsite Ads Fee" suffix="%" v-model="offsiteAdsRate" :step="1" />
    </CollapsibleSection>
  </div>
</template>

<style scoped>
.fee-settings {
  margin-top: 0.5rem;
}
</style>
