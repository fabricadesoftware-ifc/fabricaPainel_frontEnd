<template>
  <v-app>
    <v-main >
      <router-view :key="route.fullPath" />
    </v-main>
    <v-snackbar v-model="showUpdatePrompt" location="bottom left" :timeout="-1" color="primary" multi-line>
      Uma nova versão do Painel está disponível.
      <template #actions>
        <v-btn variant="text" @click="applyUpdate">Atualizar agora</v-btn>
        <v-btn variant="text" icon="mdi-close" @click="showUpdatePrompt = false"></v-btn>
      </template>
    </v-snackbar>
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

  // Aviso de nova versão disponível (Service Worker / PWA).
  // Sem isso, o usuário fica rodando os arquivos antigos em cache e só percebe
  // quando algo quebra — a única saída "visível" era um hard refresh (Ctrl+Shift+R).
  const showUpdatePrompt = ref(false)
  let doUpdateServiceWorker = () => window.location.reload()

  function applyUpdate() {
    showUpdatePrompt.value = false
    doUpdateServiceWorker()
  }

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

  async function registerServiceWorkerUpdatePrompt() {
    // A virtual:pwa-register/vue só existe quando o plugin do PWA está ativo
    // (builds de produção, ou dev com VITE_PWA_DEV=true) — em dev normal esse
    // import nunca chega a ser disparado.
    if (!import.meta.env.PROD || !('serviceWorker' in navigator)) return

    try {
      const { useRegisterSW } = await import('virtual:pwa-register/vue')
      const { updateServiceWorker } = useRegisterSW({
        onNeedRefresh() {
          showUpdatePrompt.value = true
        },
        onRegisteredSW(_swUrl, registration) {
          if (!registration) return
          // Verifica periodicamente se há uma versão nova publicada,
          // já que a aba pode ficar aberta por horas.
          setInterval(() => registration.update(), 60 * 60 * 1000)
        },
      })
      doUpdateServiceWorker = () => updateServiceWorker(true)
    } catch (error) {
      console.error('Falha ao registrar o service worker:', error)
    }
  }

  onMounted(() => {
    if (!lastOnlineStatus) showOfflineToast()

    window.addEventListener('online', updateStatus)
    window.addEventListener('offline', updateStatus)

    registerServiceWorkerUpdatePrompt()
  })

  onUnmounted(() => {
    window.removeEventListener('online', updateStatus)
    window.removeEventListener('offline', updateStatus)
  })

</script>

<style scoped>
</style>
