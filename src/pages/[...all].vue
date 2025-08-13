<script setup>
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import { onUnmounted } from 'vue'

const router = useRouter()
const countdown = ref(3)

const timer = setInterval(() => {
  countdown.value--
  if (countdown.value === 0) {
    clearInterval(timer)
    router.push('/')
  }
}, 1000)

onUnmounted(() => {
  clearInterval(timer)
})
</script>

<template>
  <v-container class="min-h-screen flex items-center justify-center">
    <v-card class="pa-6 text-center" elevation="4">
      <v-card-item>
        <div class="text-9xl font-bold text-red-500 animate-bounce mb-4">
          404
        </div>
        <v-card-title class="text-4xl text-gray-800 mb-4">
          Página não encontrada
        </v-card-title>
        <v-card-text class="text-gray-600 mb-4">
          Você será redirecionado para a home em {{ countdown }}
          {{ countdown === 1 ? 'segundo' : 'segundos' }}...
        </v-card-text>
        <v-btn
          color="primary"
          class="px-6 hover:bg-blue-700 transition-colors"
          @click="router.push('/')"
        >
          Ir para home agora
        </v-btn>
      </v-card-item>
    </v-card>
  </v-container>
</template>

<style scoped>
.animate-bounce {
  animation: bounce 2s infinite;
}

@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-20px); }
}
</style>
