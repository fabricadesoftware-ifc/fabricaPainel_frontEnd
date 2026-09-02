// Plugins
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import Fonts from "unplugin-fonts/vite";
import Layouts from "vite-plugin-vue-layouts-next";
import VueDevTools from "vite-plugin-vue-devtools";
// @ts-ignore
import Vue from "@vitejs/plugin-vue";
import VueRouter from "unplugin-vue-router/vite";
import Vuetify, { transformAssetUrls } from "vite-plugin-vuetify";
import { VitePWA } from "vite-plugin-pwa";
import Sitemap from "vite-plugin-sitemap";

import { defineConfig } from "vite";
import { fileURLToPath, URL } from "node:url";

const enablePwaDev = process.env.VITE_PWA_DEV === 'true'


export default defineConfig(({ command }) => {
  const isBuild = command === "build";
  const isServe = command === "serve";
  const enablePwa = isBuild || enablePwaDev;

  return {
  server: {
    host: "0.0.0.0",
    port: 3000,
  },
  plugins: [
    VueRouter({
      dts: "src/typed-router.d.ts",
    }),
    isServe && VueDevTools(),
    Layouts(),
    AutoImport({
      imports: [
        "vue",
        {
          "vue-router/auto": ["useRoute", "useRouter"],
        },
      ],
      dts: "src/auto-imports.d.ts",
      eslintrc: {
        enabled: true,
      },
      vueTemplate: true,
    }),
    Components({
      dts: 'src/components.d.ts',
      dirs: ['src/components'],
      extensions: ['vue'],
      deep: true,
    }),
    Vue({
      template: { transformAssetUrls },
    }),
    Vuetify({
      autoImport: true,
      styles: {
        configFile: "src/styles/settings.scss",
      },
    }),
    Fonts({
      custom: {
        families: [
          {
            name: "Poppins",
            src: "src/assets/fonts/Poppins/*.woff2",
            local: "Poppins",
          },
        ],
        display: "swap",
        preload: true,
        prefetch: true,
      },
    }),
    enablePwa && VitePWA({
      registerType: "autoUpdate",
      // Registramos o SW manualmente em App.vue (via virtual:pwa-register/vue) para
      // poder avisar o usuário quando uma nova versão estiver pronta, em vez de deixar
      // o registro automático trocar os arquivos silenciosamente em segundo plano.
      injectRegister: false,
      includeAssets: ["favicon.svg", "apple-touch-icon.png", "masked-icon.svg"],
      manifest: {
        name: "Fábrica Painel",
        short_name: "Painel",
        display: "standalone",
        description: "Gerenciamento para o Painel de Integração",
        theme_color: "#ffffff",
        icons: [
          {
            src: "pwa-192x192.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "any",
          },
          {
            src: "pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable",
          },
        ],
        id: "com.fabricaPainel.app",
        orientation: "any",
        background_color: "#ffffff",
        start_url: "/",
        launch_handler: {
          client_mode: ["navigate-existing", "auto"],
        },
      },
      devOptions: {
        enabled: enablePwaDev,
      },
      workbox: {
  navigateFallback: '/index.html',

  globPatterns: ['**/*.{js,css,html,ico,svg,woff2}'],

  runtimeCaching: [
    {
      urlPattern: /^https:\/\/painel\.fabricadesoftware\.ifc\.edu\.br\/api/,
      handler: 'NetworkFirst',
      options: {
        cacheName: 'api-cache',
        expiration: {
          maxEntries: 50,
          maxAgeSeconds: 60 * 60 * 24,
        },
      },
    },
  ],
},
    }),
    isBuild && Sitemap({
      hostname: "https://painel.fabricadesoftware.ifc.edu.br", // Substitua pelo domínio real do seu site
      dynamicRoutes: ["/", "/about"], // Liste suas rotas ou use lógica para rotas dinâmicas
      exclude: ["/login"], // Rotas a excluir do sitemap
      robots: [
        { userAgent: "*", allow: "/" },
        { userAgent: "*", disallow: ["/login"] },
      ],
      changefreq: "weekly",
      priority: 0.8,
      outDir: "dist", // Diretório de saída (padrão para Dokku)
    }),
  ],
  define: { "process.env": {} },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vue: ["vue", "vue-router", "pinia"],
          vuetify: ["vuetify"],
        },
      },
    },
  },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
    extensions: [".js", ".json", ".jsx", ".mjs", ".ts", ".tsx", ".vue"],
  },
  };
});
