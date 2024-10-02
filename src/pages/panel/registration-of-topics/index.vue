<template>
  <LayoutSteps size="w-md-33" title="Selecione os temas desejados">
    <v-autocomplete
      v-model="theme2"
      clearable
      :items="categoryStore.crossCuttingThemes"
      label="Tema 1"
      rounded="xl"
      variant="outlined"
    />
    <v-autocomplete
      v-model="theme1"
      clearable
      :items="categoryStore.crossCuttingThemes"
      label="Tema 2"
      rounded="xl"
      variant="outlined"
    />
    <v-spacer />
    <v-btn
      block
      class="py-6"
      color="primary"
      rounded="xl"
      @click="categoryStore.saveCrossCuttingThemes([theme1, theme2])"
    >
      Confirmar
    </v-btn>
  </LayoutSteps>
</template>

<script setup>
  import { useCategory } from '@/stores/category'

  const categoryStore = useCategory()
  const theme1 = ref('')
  const theme2 = ref('')

  onMounted(() => {
    categoryStore.getCrossCuttingThemes()
  })
</script>
