/**
 * plugins/vuetify.ts
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import "@mdi/font/css/materialdesignicons.css";
import "vuetify/styles";

// Composables
import { createVuetify } from "vuetify";

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  locale: {
    locale: "pt_BR",
  },
  date: {
    locale: {
      pt_BR: "pt-BR",
    },
  },
  theme: {
    defaultTheme: "light",
    themes: {
      light: {
        colors: {
          primary: "#1F8BDD",
        },
      },
      dark: {
        colors: {
          primary: "#267A7A",
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
