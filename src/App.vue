<template>
  <v-app>
    <v-main >
      <router-view :key="route.fullPath" />
    </v-main>
    <!-- <div class="index">
      DEV NAV
      <router-link to="/">
        INSTITUCIONAL
      </router-link>
      <router-link to="/panel/editions">
        DASHBOARD
      </router-link>
      <router-link to="/panel">
        PANEL
      </router-link>
    </div> -->
  </v-app>
</template>

<script lang="ts" setup>
// @ts-ignore
  import { onMounted } from 'vue'
  // @ts-ignore
  import { useRouter, useRoute } from 'vue-router'
  import { globalRouter } from "./plugins/globalRouter";


  const router = useRouter()
  const route = useRoute()

  globalRouter.router = router
</script>

<style scoped>
</style>
