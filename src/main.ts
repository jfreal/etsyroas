import { createApp } from 'vue'
import App from './App.vue'

// Self-hosted variable fonts (no external/CDN requests — keeps the app
// privacy-friendly and offline-capable). Inter for UI, Space Grotesk for display.
import '@fontsource-variable/inter'
import '@fontsource-variable/space-grotesk'

import './assets/main.css'

createApp(App).mount('#app')
