// vite.config.mts
import AutoImport from "file:///home/luan/fabricaPainel_frontEnd/node_modules/unplugin-auto-import/dist/vite.js";
import Components from "file:///home/luan/fabricaPainel_frontEnd/node_modules/unplugin-vue-components/dist/vite.js";
import Fonts from "file:///home/luan/fabricaPainel_frontEnd/node_modules/unplugin-fonts/dist/vite.mjs";
import Layouts from "file:///home/luan/fabricaPainel_frontEnd/node_modules/vite-plugin-vue-layouts/dist/index.mjs";
import VueDevTools from "file:///home/luan/fabricaPainel_frontEnd/node_modules/vite-plugin-vue-devtools/dist/vite.mjs";
import Vue from "file:///home/luan/fabricaPainel_frontEnd/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import VueRouter from "file:///home/luan/fabricaPainel_frontEnd/node_modules/unplugin-vue-router/dist/vite.js";
import Vuetify, { transformAssetUrls } from "file:///home/luan/fabricaPainel_frontEnd/node_modules/vite-plugin-vuetify/dist/index.mjs";
import { VitePWA } from "file:///home/luan/fabricaPainel_frontEnd/node_modules/vite-plugin-pwa/dist/index.js";
import { defineConfig } from "file:///home/luan/fabricaPainel_frontEnd/node_modules/vite/dist/node/index.js";
import { fileURLToPath, URL } from "node:url";
var __vite_injected_original_import_meta_url = "file:///home/luan/fabricaPainel_frontEnd/vite.config.mts";
var vite_config_default = defineConfig({
  server: {
    host: "0.0.0.0",
    port: 3e3,
    allowedHosts: ["a9ed-191-52-58-163.ngrok-free.app"]
  },
  plugins: [
    VueRouter({
      dts: "src/typed-router.d.ts"
    }),
    VueDevTools(),
    Layouts(),
    AutoImport({
      imports: [
        "vue",
        {
          "vue-router/auto": ["useRoute", "useRouter"]
        }
      ],
      dts: "src/auto-imports.d.ts",
      eslintrc: {
        enabled: true
      },
      vueTemplate: true
    }),
    Components({
      dts: "src/components.d.ts"
    }),
    Vue({
      template: { transformAssetUrls }
    }),
    Vuetify({
      autoImport: true,
      styles: {
        configFile: "src/styles/settings.scss"
      }
    }),
    Fonts({
      google: {
        families: [
          {
            name: "Poppins",
            styles: "wght@100;300;400;500;700;900"
          }
        ]
      }
    }),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["favicon.svg", "apple-touch-icon.png", "masked-icon.svg"],
      manifest: {
        name: "F\xE1brica Painel",
        short_name: "Painel",
        description: "Gerenciamento para o Painel de Integra\xE7\xE3o",
        theme_color: "#ffffff",
        icons: [
          {
            src: "pwa-192x192.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "any"
          },
          {
            src: "pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable"
          }
        ],
        id: "com.fake-store.app",
        orientation: "any",
        background_color: "#ffffff",
        start_url: ".",
        launch_handler: {
          client_mode: ["navigate-existing", "auto"]
        }
      },
      devOptions: {
        enabled: true
      }
    })
  ],
  define: { "process.env": {} },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", __vite_injected_original_import_meta_url))
    },
    extensions: [".js", ".json", ".jsx", ".mjs", ".ts", ".tsx", ".vue"]
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcubXRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiL2hvbWUvbHVhbi9mYWJyaWNhUGFpbmVsX2Zyb250RW5kXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvaG9tZS9sdWFuL2ZhYnJpY2FQYWluZWxfZnJvbnRFbmQvdml0ZS5jb25maWcubXRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9ob21lL2x1YW4vZmFicmljYVBhaW5lbF9mcm9udEVuZC92aXRlLmNvbmZpZy5tdHNcIjsvLyBQbHVnaW5zXG5pbXBvcnQgQXV0b0ltcG9ydCBmcm9tIFwidW5wbHVnaW4tYXV0by1pbXBvcnQvdml0ZVwiO1xuaW1wb3J0IENvbXBvbmVudHMgZnJvbSBcInVucGx1Z2luLXZ1ZS1jb21wb25lbnRzL3ZpdGVcIjtcbmltcG9ydCBGb250cyBmcm9tIFwidW5wbHVnaW4tZm9udHMvdml0ZVwiO1xuaW1wb3J0IExheW91dHMgZnJvbSBcInZpdGUtcGx1Z2luLXZ1ZS1sYXlvdXRzXCI7XG5pbXBvcnQgVnVlRGV2VG9vbHMgZnJvbSBcInZpdGUtcGx1Z2luLXZ1ZS1kZXZ0b29sc1wiO1xuaW1wb3J0IFZ1ZSBmcm9tIFwiQHZpdGVqcy9wbHVnaW4tdnVlXCI7XG5pbXBvcnQgVnVlUm91dGVyIGZyb20gXCJ1bnBsdWdpbi12dWUtcm91dGVyL3ZpdGVcIjtcbmltcG9ydCBWdWV0aWZ5LCB7IHRyYW5zZm9ybUFzc2V0VXJscyB9IGZyb20gXCJ2aXRlLXBsdWdpbi12dWV0aWZ5XCI7XG5pbXBvcnQgeyBWaXRlUFdBIH0gZnJvbSBcInZpdGUtcGx1Z2luLXB3YVwiO1xuXG5pbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tIFwidml0ZVwiO1xuaW1wb3J0IHsgZmlsZVVSTFRvUGF0aCwgVVJMIH0gZnJvbSBcIm5vZGU6dXJsXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG4gICBzZXJ2ZXI6IHtcbiAgICBob3N0OiAnMC4wLjAuMCcsXG4gICAgcG9ydDogMzAwMCxcbiAgICBhbGxvd2VkSG9zdHM6IFsnYTllZC0xOTEtNTItNTgtMTYzLm5ncm9rLWZyZWUuYXBwJ11cbiAgfSxcbiAgcGx1Z2luczogW1xuICAgIFZ1ZVJvdXRlcih7XG4gICAgICBkdHM6IFwic3JjL3R5cGVkLXJvdXRlci5kLnRzXCIsXG4gICAgfSksXG4gICAgVnVlRGV2VG9vbHMoKSxcbiAgICBMYXlvdXRzKCksXG4gICAgQXV0b0ltcG9ydCh7XG4gICAgICBpbXBvcnRzOiBbXG4gICAgICAgIFwidnVlXCIsXG4gICAgICAgIHtcbiAgICAgICAgICBcInZ1ZS1yb3V0ZXIvYXV0b1wiOiBbXCJ1c2VSb3V0ZVwiLCBcInVzZVJvdXRlclwiXSxcbiAgICAgICAgfSxcbiAgICAgIF0sXG4gICAgICBkdHM6IFwic3JjL2F1dG8taW1wb3J0cy5kLnRzXCIsXG4gICAgICBlc2xpbnRyYzoge1xuICAgICAgICBlbmFibGVkOiB0cnVlLFxuICAgICAgfSxcbiAgICAgIHZ1ZVRlbXBsYXRlOiB0cnVlLFxuICAgIH0pLFxuICAgIENvbXBvbmVudHMoe1xuICAgICAgZHRzOiBcInNyYy9jb21wb25lbnRzLmQudHNcIixcbiAgICB9KSxcbiAgICBWdWUoe1xuICAgICAgdGVtcGxhdGU6IHsgdHJhbnNmb3JtQXNzZXRVcmxzIH0sXG4gICAgfSksXG4gICAgVnVldGlmeSh7XG4gICAgICBhdXRvSW1wb3J0OiB0cnVlLFxuICAgICAgc3R5bGVzOiB7XG4gICAgICAgIGNvbmZpZ0ZpbGU6IFwic3JjL3N0eWxlcy9zZXR0aW5ncy5zY3NzXCIsXG4gICAgICB9LFxuICAgIH0pLFxuICAgIEZvbnRzKHtcbiAgICAgIGdvb2dsZToge1xuICAgICAgICBmYW1pbGllczogW1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIG5hbWU6IFwiUG9wcGluc1wiLFxuICAgICAgICAgICAgc3R5bGVzOiBcIndnaHRAMTAwOzMwMDs0MDA7NTAwOzcwMDs5MDBcIixcbiAgICAgICAgICB9LFxuICAgICAgICBdLFxuICAgICAgfSxcbiAgICB9KSxcbiAgICBWaXRlUFdBKHtcbiAgICAgIHJlZ2lzdGVyVHlwZTogXCJhdXRvVXBkYXRlXCIsXG4gICAgICBpbmNsdWRlQXNzZXRzOiBbXCJmYXZpY29uLnN2Z1wiLCBcImFwcGxlLXRvdWNoLWljb24ucG5nXCIsIFwibWFza2VkLWljb24uc3ZnXCJdLFxuICAgICAgbWFuaWZlc3Q6IHtcbiAgICAgICAgbmFtZTogXCJGXHUwMEUxYnJpY2EgUGFpbmVsXCIsXG4gICAgICAgIHNob3J0X25hbWU6IFwiUGFpbmVsXCIsXG4gICAgICAgIGRlc2NyaXB0aW9uOiBcIkdlcmVuY2lhbWVudG8gcGFyYSBvIFBhaW5lbCBkZSBJbnRlZ3JhXHUwMEU3XHUwMEUzb1wiLFxuICAgICAgICB0aGVtZV9jb2xvcjogXCIjZmZmZmZmXCIsXG4gICAgICAgIGljb25zOiBbXG4gICAgICAgICAge1xuICAgICAgICAgICAgc3JjOiBcInB3YS0xOTJ4MTkyLnBuZ1wiLFxuICAgICAgICAgICAgc2l6ZXM6IFwiMTkyeDE5MlwiLFxuICAgICAgICAgICAgdHlwZTogXCJpbWFnZS9wbmdcIixcbiAgICAgICAgICAgIHB1cnBvc2U6IFwiYW55XCIsXG4gICAgICAgICAgfSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICBzcmM6IFwicHdhLTUxMng1MTIucG5nXCIsXG4gICAgICAgICAgICBzaXplczogXCI1MTJ4NTEyXCIsXG4gICAgICAgICAgICB0eXBlOiBcImltYWdlL3BuZ1wiLFxuICAgICAgICAgICAgcHVycG9zZTogXCJtYXNrYWJsZVwiLFxuICAgICAgICAgIH0sXG4gICAgICAgIF0sXG4gICAgICAgIGlkOiBcImNvbS5mYWtlLXN0b3JlLmFwcFwiLFxuICAgICAgICBvcmllbnRhdGlvbjogXCJhbnlcIixcbiAgICAgICAgYmFja2dyb3VuZF9jb2xvcjogXCIjZmZmZmZmXCIsXG4gICAgICAgIHN0YXJ0X3VybDogXCIuXCIsXG4gICAgICAgIGxhdW5jaF9oYW5kbGVyOiB7XG4gICAgICAgICAgY2xpZW50X21vZGU6IFtcIm5hdmlnYXRlLWV4aXN0aW5nXCIsIFwiYXV0b1wiXSxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgICBkZXZPcHRpb25zOiB7XG4gICAgICAgIGVuYWJsZWQ6IHRydWUsXG4gICAgICB9LFxuICAgIH0pLFxuICBdLFxuICBkZWZpbmU6IHsgXCJwcm9jZXNzLmVudlwiOiB7fSB9LFxuICByZXNvbHZlOiB7XG4gICAgYWxpYXM6IHtcbiAgICAgIFwiQFwiOiBmaWxlVVJMVG9QYXRoKG5ldyBVUkwoXCIuL3NyY1wiLCBpbXBvcnQubWV0YS51cmwpKSxcbiAgICB9LFxuICAgIGV4dGVuc2lvbnM6IFtcIi5qc1wiLCBcIi5qc29uXCIsIFwiLmpzeFwiLCBcIi5tanNcIiwgXCIudHNcIiwgXCIudHN4XCIsIFwiLnZ1ZVwiXSxcbiAgfSxcbiAgXG59KTtcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFDQSxPQUFPLGdCQUFnQjtBQUN2QixPQUFPLGdCQUFnQjtBQUN2QixPQUFPLFdBQVc7QUFDbEIsT0FBTyxhQUFhO0FBQ3BCLE9BQU8saUJBQWlCO0FBQ3hCLE9BQU8sU0FBUztBQUNoQixPQUFPLGVBQWU7QUFDdEIsT0FBTyxXQUFXLDBCQUEwQjtBQUM1QyxTQUFTLGVBQWU7QUFFeEIsU0FBUyxvQkFBb0I7QUFDN0IsU0FBUyxlQUFlLFdBQVc7QUFad0ksSUFBTSwyQ0FBMkM7QUFjNU4sSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDekIsUUFBUTtBQUFBLElBQ1AsTUFBTTtBQUFBLElBQ04sTUFBTTtBQUFBLElBQ04sY0FBYyxDQUFDLG1DQUFtQztBQUFBLEVBQ3BEO0FBQUEsRUFDQSxTQUFTO0FBQUEsSUFDUCxVQUFVO0FBQUEsTUFDUixLQUFLO0FBQUEsSUFDUCxDQUFDO0FBQUEsSUFDRCxZQUFZO0FBQUEsSUFDWixRQUFRO0FBQUEsSUFDUixXQUFXO0FBQUEsTUFDVCxTQUFTO0FBQUEsUUFDUDtBQUFBLFFBQ0E7QUFBQSxVQUNFLG1CQUFtQixDQUFDLFlBQVksV0FBVztBQUFBLFFBQzdDO0FBQUEsTUFDRjtBQUFBLE1BQ0EsS0FBSztBQUFBLE1BQ0wsVUFBVTtBQUFBLFFBQ1IsU0FBUztBQUFBLE1BQ1g7QUFBQSxNQUNBLGFBQWE7QUFBQSxJQUNmLENBQUM7QUFBQSxJQUNELFdBQVc7QUFBQSxNQUNULEtBQUs7QUFBQSxJQUNQLENBQUM7QUFBQSxJQUNELElBQUk7QUFBQSxNQUNGLFVBQVUsRUFBRSxtQkFBbUI7QUFBQSxJQUNqQyxDQUFDO0FBQUEsSUFDRCxRQUFRO0FBQUEsTUFDTixZQUFZO0FBQUEsTUFDWixRQUFRO0FBQUEsUUFDTixZQUFZO0FBQUEsTUFDZDtBQUFBLElBQ0YsQ0FBQztBQUFBLElBQ0QsTUFBTTtBQUFBLE1BQ0osUUFBUTtBQUFBLFFBQ04sVUFBVTtBQUFBLFVBQ1I7QUFBQSxZQUNFLE1BQU07QUFBQSxZQUNOLFFBQVE7QUFBQSxVQUNWO0FBQUEsUUFDRjtBQUFBLE1BQ0Y7QUFBQSxJQUNGLENBQUM7QUFBQSxJQUNELFFBQVE7QUFBQSxNQUNOLGNBQWM7QUFBQSxNQUNkLGVBQWUsQ0FBQyxlQUFlLHdCQUF3QixpQkFBaUI7QUFBQSxNQUN4RSxVQUFVO0FBQUEsUUFDUixNQUFNO0FBQUEsUUFDTixZQUFZO0FBQUEsUUFDWixhQUFhO0FBQUEsUUFDYixhQUFhO0FBQUEsUUFDYixPQUFPO0FBQUEsVUFDTDtBQUFBLFlBQ0UsS0FBSztBQUFBLFlBQ0wsT0FBTztBQUFBLFlBQ1AsTUFBTTtBQUFBLFlBQ04sU0FBUztBQUFBLFVBQ1g7QUFBQSxVQUNBO0FBQUEsWUFDRSxLQUFLO0FBQUEsWUFDTCxPQUFPO0FBQUEsWUFDUCxNQUFNO0FBQUEsWUFDTixTQUFTO0FBQUEsVUFDWDtBQUFBLFFBQ0Y7QUFBQSxRQUNBLElBQUk7QUFBQSxRQUNKLGFBQWE7QUFBQSxRQUNiLGtCQUFrQjtBQUFBLFFBQ2xCLFdBQVc7QUFBQSxRQUNYLGdCQUFnQjtBQUFBLFVBQ2QsYUFBYSxDQUFDLHFCQUFxQixNQUFNO0FBQUEsUUFDM0M7QUFBQSxNQUNGO0FBQUEsTUFDQSxZQUFZO0FBQUEsUUFDVixTQUFTO0FBQUEsTUFDWDtBQUFBLElBQ0YsQ0FBQztBQUFBLEVBQ0g7QUFBQSxFQUNBLFFBQVEsRUFBRSxlQUFlLENBQUMsRUFBRTtBQUFBLEVBQzVCLFNBQVM7QUFBQSxJQUNQLE9BQU87QUFBQSxNQUNMLEtBQUssY0FBYyxJQUFJLElBQUksU0FBUyx3Q0FBZSxDQUFDO0FBQUEsSUFDdEQ7QUFBQSxJQUNBLFlBQVksQ0FBQyxPQUFPLFNBQVMsUUFBUSxRQUFRLE9BQU8sUUFBUSxNQUFNO0FBQUEsRUFDcEU7QUFFRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
