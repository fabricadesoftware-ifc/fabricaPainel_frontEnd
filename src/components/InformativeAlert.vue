<template>
  <v-alert
    v-model="alert"
    class="rounded-xl py-6"
    closable
    close-label="Close Alert"
    type="info"
    variant="tonal"
  >
    <p>
      Registro de Avaliadores (17/10/2024 - 30/10/2024)
    </p>
    <p>
      Está no periodo de registro de avaliadores, por favor, registre os avaliadores nos trabalhos recebidos. (Clique no botão ao lado)
    </p>
  </v-alert>
</template>

<script setup>
  const alert = ref(true)
</script>
