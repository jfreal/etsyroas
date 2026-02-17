<script setup lang="ts">
import { ref } from 'vue'

const isOpen = ref(false)
</script>

<template>
  <div class="explainer">
    <button class="explainer-toggle" @click="isOpen = !isOpen" type="button">
      <span class="toggle-icon">{{ isOpen ? '&#9660;' : '&#9654;' }}</span>
      How does this calculator work?
    </button>

    <div v-show="isOpen" class="explainer-content">
      <div class="topic">
        <h4>What is ROAS?</h4>
        <p>
          ROAS (Return on Ad Spend) is the ratio of revenue to ad spend.
          A ROAS of <strong>2.0x</strong> means for every $1 you spend on Etsy Ads,
          you get $2 in revenue. You can find your ROAS in the Etsy Ads dashboard.
        </p>
      </div>

      <div class="topic">
        <h4>Ad Cost Per Unit</h4>
        <p>
          Since ROAS = Revenue / Ad Spend, we can figure out how much ad money it cost
          to sell one item: <strong>Ad Cost = Sale Price / ROAS</strong>.
          For a $25 item at 2.0x ROAS, you spent $12.50 in ads to make that sale.
        </p>
      </div>

      <div class="topic">
        <h4>Etsy Fees</h4>
        <p>Etsy charges several fees on every sale:</p>
        <ul>
          <li><strong>Listing fee</strong> &mdash; $0.20 per listing</li>
          <li><strong>Transaction fee</strong> &mdash; 6.5% of the total (price + shipping charged to buyer)</li>
          <li><strong>Payment processing</strong> &mdash; 3% + $0.25 per transaction</li>
          <li><strong>Offsite Ads fee</strong> &mdash; 15% (or 12% for high-volume shops) only if the sale came from an Etsy Offsite Ad, which is separate from Etsy Ads you run yourself</li>
        </ul>
        <p>These rates are auto-filled but you can override them in the Advanced section if Etsy changes them.</p>
      </div>

      <div class="topic">
        <h4>Break-Even ROAS</h4>
        <p>
          This is the minimum ROAS you need to not lose money. If your actual ROAS drops
          below this number, you're paying more in ads than you're making back after
          fees and costs. It's the most important number for deciding whether to keep
          your ads running.
        </p>
      </div>

      <div class="topic">
        <h4>Hourly Rate</h4>
        <p>
          Your effective hourly rate is calculated from your after-tax profit per unit
          divided by how long it takes you to make/pack/ship each item. This tells you
          what you're actually earning for your time.
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.explainer {
  margin-top: 0.5rem;
}

.explainer-toggle {
  background: none;
  border: none;
  color: var(--accent);
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  padding: 0.4rem 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.explainer-toggle:hover {
  text-decoration: underline;
}

.toggle-icon {
  font-size: 0.7rem;
}

.explainer-content {
  margin-top: 0.75rem;
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 1rem 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.topic h4 {
  font-size: 0.88rem;
  font-weight: 600;
  color: var(--accent);
  margin-bottom: 0.3rem;
}

.topic p {
  font-size: 0.85rem;
  color: var(--text-secondary);
  line-height: 1.6;
  margin: 0;
}

.topic ul {
  font-size: 0.85rem;
  color: var(--text-secondary);
  line-height: 1.6;
  margin: 0.3rem 0;
  padding-left: 1.25rem;
}

.topic li {
  margin-bottom: 0.15rem;
}
</style>
