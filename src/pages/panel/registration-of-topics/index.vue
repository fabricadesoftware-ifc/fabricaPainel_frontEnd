<template>
  <LayoutSteps size="w-md-33" title="Selecione os temas desejados">
    <v-autocomplete
      v-model="theme2"
      clearable
      :items="categoryStore.crossCuttingThemes"
      label="Tema 1"
      rounded="xl"
      variant="outlined"
      required
    />
    <v-autocomplete
      v-model="theme1"
      clearable
      :items="categoryStore.crossCuttingThemes"
      label="Tema 2"
      rounded="xl"
      variant="outlined"
      required
    />
    <v-spacer />
    <v-btn
      block
      class="py-6"
      color="primary"
      rounded="xl"
      @click="saveThemes"
    >
      Confirmar
    </v-btn>
  </LayoutSteps>
</template>

<script setup>
  import { useCategory } from '@/stores/category'
  import { showMessage } from '@/utils/toastify';

  const categoryStore = useCategory()
  const theme1 = ref('')
  const theme2 = ref('')

  const saveThemes = async () => {
    if (!theme1.value || !theme2.value) {
      showMessage('Selecione ambos os temas desejados.', 'error', 3000, 'bottom-center', 'auto', true);
      return
    }
    await categoryStore.saveCrossCuttingThemes([theme1.value, theme2.value])
  }

  onMounted(async () => {
    await categoryStore.getCrossCuttingThemes()
  })
</script>
