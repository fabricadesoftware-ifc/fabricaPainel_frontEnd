<template>
  <LayoutSteps title="Tabela dos trabalhos enviados">
    <PaperAccrptanceTable />
  </LayoutSteps>
</template>

<script setup>
  import { usePanel } from '@/stores/panel'

  const panelStore = usePanel()

  onMounted(() => {
    panelStore.getCrossCuttingThemes()
  })
</script>
