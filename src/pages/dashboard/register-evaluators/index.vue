<template>
  <h1>
    Registros de Avaliadores
  </h1>
</template>

  <script setup>
  import { usePanel } from '@/stores/panel'

  const panelStore = usePanel()

  onMounted(() => {
    panelStore.getWorks()
  })
  </script>
