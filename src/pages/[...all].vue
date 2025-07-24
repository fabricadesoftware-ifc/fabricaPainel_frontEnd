<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

setTimeout(() => {
  router.push('/')
}, 3000)
</script>

<template>
  <div class="text-center">
    <h1>Página não encontrada</h1>
    <p>Você será redirecionado para a home em 3 segundos...</p>
  </div>
</template>
