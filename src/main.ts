/**
 * main.ts
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

import 'vue3-toastify/dist/index.css'
import './styles/global.css'

// Plugins
import { registerPlugins } from '@/plugins'

// Components
import App from './App.vue'

// Composables
import { createApp } from 'vue'

const app = createApp(App)

registerPlugins(app)

app.mount('#app')
