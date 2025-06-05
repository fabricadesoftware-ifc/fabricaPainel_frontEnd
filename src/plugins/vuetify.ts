/**
 * plugins/vuetify.ts
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import { pt } from 'vuetify/locale'
// Composables
import { createVuetify } from 'vuetify'

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  locale: {
    locale: "pt",
    messages: { pt },
  },
  date: {
    locale: {
      pt_BR: 'pt-BR',
    },
  },
  theme: {
    defaultTheme: 'light',
    themes: {
      light: {
        colors: {
          primary: '#267A7A',
        },
      },

      dark: {
        colors: {
          primary: '#267A7A',
        },
      },

    },
  },
})
