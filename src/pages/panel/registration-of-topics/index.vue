<template>
  <LayoutSteps size="w-md-33" title="Selecione os temas desejados">
    <v-autocomplete
      clearable
      :items="panelStore.crossCuttingThemes"
      label="Autocomplete"
      rounded="xl"
      variant="outlined"
    />
    <v-autocomplete
      clearable
      :items="panelStore.crossCuttingThemes"
      label="Autocomplete"
      rounded="xl"
      variant="outlined"
    />
    <v-spacer />
    <v-btn
      block
      class="py-6"
      color="primary"
      rounded="xl"
      @click="panelStore.saveCrossCuttingThemes()"
    >
      Confirmar
    </v-btn>
  </LayoutSteps>
</template>

<script setup>
  import { usePanel } from '@/stores/panel'

  const panelStore = usePanel()

  onMounted(() => {
    panelStore.getCrossCuttingThemes()
  })
</script>
