<template>
  <v-app>
    <v-main >
      <router-view :key="$route.fullPath" />
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
  import { useRouter } from 'vue-router'
  import { useAuth } from './stores/auth'
  import { globalRouter } from "./plugins/globalRouter";


  const router = useRouter()
  const authStore = useAuth()


  globalRouter.router = router

  onMounted(async () => {

    await authStore.checkAuth()
  })
</script>

<style scoped>
.index {
  background-color: #333;
  color: #f7fb13;
  padding: 10px;
  border-radius: 12px;
  z-index: 1000;
  margin: 10px;
  font-size: .7rem;
  display: flex;
  flex-direction: column;
  gap: 5px;
  position: fixed;
  top: 0;
  right: 0;
  text-transform: uppercase;
  cursor: pointer;
}
</style>
