<script setup lang="ts">
import CollapsibleSection from './CollapsibleSection.vue'
</script>

<template>
  <CollapsibleSection label="How does this calculator work?" tone="accent" panel="card">
    <div class="topic">
      <h4>What each input means</h4>
      <p>The panel on the left is grouped into sections. Here's what every field does:</p>

      <p class="group-label">Product Pricing</p>
      <dl class="glossary">
        <dt>Sale Price</dt>
        <dd>The price a buyer pays for the item itself, before shipping.</dd>
        <dt>Shipping Charged to Buyer</dt>
        <dd>
          What you charge the buyer for shipping (set to 0 for free shipping). It's added to your
          revenue &mdash; and Etsy's transaction fee applies to it too.
        </dd>
      </dl>

      <p class="group-label">Your Costs</p>
      <dl class="glossary">
        <dt>Material Cost Per Unit</dt>
        <dd>What the supplies to make one item cost you.</dd>
        <dt>Shipping Cost Per Unit</dt>
        <dd>What it actually costs you to ship one item &mdash; postage plus packaging.</dd>
        <dt>Other Cost Per Unit</dt>
        <dd>Any other per-item cost: inserts, thank-you cards, a returns allowance, and so on.</dd>
      </dl>

      <p class="group-label">Ads, Volume &amp; Time</p>
      <dl class="glossary">
        <dt>ROAS</dt>
        <dd>
          Return on Ad Spend from your Etsy Ads dashboard &mdash; revenue divided by ad spend. The
          calculator works backward from this to find what ads cost you per sale.
        </dd>
        <dt>Units Sold Per Day</dt>
        <dd>
          Roughly how many of this item you sell per day. This only drives the daily and monthly
          projections; your per-unit results don't depend on it.
        </dd>
        <dt>Processing Time Per Item</dt>
        <dd>
          Minutes spent making, packing, and shipping one item. Used to turn profit into an hourly
          rate.
        </dd>
        <dt>Estimated Tax Rate</dt>
        <dd>
          The income-tax rate you expect to pay on profit. Used for the after-tax profit and hourly
          rate (a loss isn't taxed).
        </dd>
      </dl>

      <p class="group-label">Offsite Ads</p>
      <dl class="glossary">
        <dt>Sale came from Offsite Ad</dt>
        <dd>
          Turn this on when the sale was driven by an Etsy <em>Offsite</em> Ad &mdash; Etsy's own
          off-platform ads, which carry an extra fee. It's separate from the Etsy Ads you run
          yourself.
        </dd>
      </dl>

      <p class="group-label">Advanced: Fee Rates</p>
      <dl class="glossary">
        <dt>Listing Fee</dt>
        <dd>Etsy's flat fee to list an item ($0.20 in the US).</dd>
        <dt>Transaction Fee</dt>
        <dd>The percentage Etsy takes of each order total (price + shipping charged).</dd>
        <dt>Payment Processing</dt>
        <dd>The percentage Etsy's payment processor takes of the order total.</dd>
        <dt>Processing Flat Fee</dt>
        <dd>A fixed amount added to payment processing on every transaction.</dd>
        <dt>Offsite Ads Fee</dt>
        <dd>
          The percentage charged on a sale that came from an Offsite Ad (15%, or 12% for high-volume
          shops).
        </dd>
      </dl>
      <p>Only change the Advanced fields if Etsy updates its fees or you sell outside the US.</p>
    </div>

    <div class="topic">
      <h4>What is ROAS?</h4>
      <p>
        ROAS (Return on Ad Spend) is the ratio of revenue to ad spend. A ROAS of
        <strong>2.0x</strong> means for every $1 you spend on Etsy Ads, you get $2 in revenue. You
        can find your ROAS in the Etsy Ads dashboard.
      </p>
    </div>

    <div class="topic">
      <h4>Ad Cost Per Unit</h4>
      <p>
        Since ROAS = Revenue / Ad Spend, we can figure out how much ad money it cost to sell one
        item: <strong>Ad Cost = Revenue / ROAS</strong>, where revenue is your sale price plus any
        shipping you charge the buyer. For a $25 item at 2.0x ROAS, you spent $12.50 in ads to make
        that sale.
      </p>
    </div>

    <div class="topic">
      <h4>Etsy Fees</h4>
      <p>Etsy charges several fees on every sale:</p>
      <ul>
        <li><strong>Listing fee</strong> &mdash; $0.20 per listing</li>
        <li>
          <strong>Transaction fee</strong> &mdash; 6.5% of the total (price + shipping charged to
          buyer)
        </li>
        <li><strong>Payment processing</strong> &mdash; 3% + $0.25 per transaction</li>
        <li>
          <strong>Offsite Ads fee</strong> &mdash; 15% (or 12% for high-volume shops) only if the
          sale came from an Etsy Offsite Ad, which is separate from Etsy Ads you run yourself
        </li>
      </ul>
      <p>
        These rates are auto-filled but you can override them in the Advanced section if Etsy
        changes them.
      </p>
    </div>

    <div class="topic">
      <h4>Break-Even ROAS</h4>
      <p>
        This is the minimum ROAS you need to not lose money. If your actual ROAS drops below this
        number, you're paying more in ads than you're making back after fees and costs. It's the
        most important number for deciding whether to keep your ads running.
      </p>
    </div>

    <div class="topic">
      <h4>Hourly Rate</h4>
      <p>
        Your effective hourly rate is calculated from your after-tax profit per unit divided by how
        long it takes you to make/pack/ship each item. This tells you what you're actually earning
        for your time.
      </p>
    </div>
  </CollapsibleSection>
</template>

<style scoped>
.topic h4 {
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 0.3rem;
  letter-spacing: -0.01em;
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

.topic .group-label {
  font-size: 0.78rem;
  font-weight: 600;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.04em;
  margin: 0.7rem 0 0.2rem;
}

.glossary {
  margin: 0;
  font-size: 0.85rem;
  line-height: 1.55;
}

.glossary dt {
  font-weight: 600;
  color: var(--text-primary);
  margin-top: 0.3rem;
}

.glossary dd {
  margin: 0 0 0.15rem;
  color: var(--text-secondary);
}
</style>
