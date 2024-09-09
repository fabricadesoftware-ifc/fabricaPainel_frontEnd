<template>
  <h1>
    Avaliadores
  </h1>
</template>

<script setup>
  import { usePanel } from '@/stores/panel'

  const panelStore = usePanel()

  onMounted(() => {
    panelStore.getWorks()
  })
</script>
