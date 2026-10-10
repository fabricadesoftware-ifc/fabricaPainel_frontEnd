/**
 * plugins/vuetify.ts
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import '@mdi/font/css/materialdesignicons.css'
// Subset da fonte de ícones (só os usados): sobrescreve o @font-face acima.
import '@/assets/mdi/mdi-subset.css'
import 'vuetify/styles'
import { pt } from 'vuetify/locale'
// Composables
import { createVuetify } from "vuetify";

// Tema inicial: escolha salva do usuario (chave `themeMode` do store de layout:
// 'light' | 'dark' | 'system') ou, em 'system'/sem escolha, a preferencia do
// sistema. Decidido aqui para nao piscar claro antes do Vue montar.
function initialTheme() {
  try {
    const saved = localStorage.getItem('themeMode')
    if (saved === '"dark"' || saved === 'dark') return 'dark'
    if (saved === '"light"' || saved === 'light') return 'light'
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  } catch {
    return 'light'
  }
}

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  locale: {
    locale: "pt",
    messages: { pt },
  },
  date: {
    locale: {
      pt_BR: "pt-BR",
    },
  },
  theme: {
    defaultTheme: initialTheme(),
    themes: {
      light: {
        colors: {
          primary: "#1F8BDD",
        },
      },

      dark: {
        dark: true,
        colors: {
          background: "#0F1419",
          surface: "#182029",
          "surface-bright": "#222C37",
          "surface-light": "#2A3541",
          "surface-variant": "#2A3541",
          "on-surface-variant": "#C5CDD6",
          primary: "#4DA3E8",
          secondary: "#8AA0B5",
          info: "#4DA3E8",
          success: "#4CC38A",
          warning: "#F2B84B",
          error: "#F2736B",
        },
      },

    },
  },
  defaults: {
    global: {
      style: "text-transform: none;",
    },
  },
});
