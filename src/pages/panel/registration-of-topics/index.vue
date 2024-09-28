<template>
  <LayoutSteps size="w-md-33" title="Selecione os temas desejados">
    <v-autocomplete
      v-model="theme2"
      clearable
      :items="editionStore.crossCuttingThemes"
      label="Autocomplete"
      rounded="xl"
      variant="outlined"
    />
    <v-autocomplete
      v-model="theme1"
      clearable
      :items="editionStore.crossCuttingThemes"
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
      @click="editionStore.saveCrossCuttingThemes([theme1, theme2])"
    >
      Confirmar
    </v-btn>
  </LayoutSteps>
</template>

<script setup>
  import { useEdition } from '@/stores/edition'

  const editionStore = useEdition()
  const theme1 = ref('')
  const theme2 = ref('')

  onMounted(() => {
    editionStore.getCrossCuttingThemes()
  })
</script>
