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
  import { onMounted, onUnmounted } from 'vue'
  import { useRouter, useRoute } from 'vue-router'
  import { toast } from 'vue3-toastify'
  import { globalRouter } from "./plugins/globalRouter";


  const router = useRouter()
  const route = useRoute()

  globalRouter.router = router

  const offlineToastId = 'connection-status-offline'
  const onlineToastId = 'connection-status-online'
  let lastOnlineStatus = navigator.onLine

  function showOfflineToast() {
    if (toast.isActive(offlineToastId)) return

    toast('Você está offline. A tela atual continuará aberta, mas ações que dependem da internet podem falhar.', {
      toastId: offlineToastId,
      type: 'warning',
      position: 'bottom-right',
      theme: 'colored',
      autoClose: false,
      hideProgressBar: true,
      pauseOnFocusLoss: false,
      clearOnUrlChange: false,
    })
  }

  function showOnlineToast() {
    toast.remove(offlineToastId)

    toast('Conexão restabelecida.', {
      toastId: onlineToastId,
      type: 'success',
      position: 'bottom-right',
      theme: 'colored',
      autoClose: 3500,
      hideProgressBar: false,
      pauseOnFocusLoss: false,
    })
  }

  function updateStatus() {
    const isOnline = navigator.onLine
    if (isOnline === lastOnlineStatus) return

    lastOnlineStatus = isOnline

    if (isOnline) showOnlineToast()
    else showOfflineToast()
  }

  onMounted(() => {
    if (!lastOnlineStatus) showOfflineToast()

    window.addEventListener('online', updateStatus)
    window.addEventListener('offline', updateStatus)
  })

  onUnmounted(() => {
    window.removeEventListener('online', updateStatus)
    window.removeEventListener('offline', updateStatus)
  })

</script>

<style scoped>
</style>
