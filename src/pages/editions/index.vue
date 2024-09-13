<template>
  <LayoutDefault>
    <MainBanner :btnvisible="false" :class="'border-0'" :text="'Todas as edições'" />
    <EditionsView :ano="state.years" :categoria="state.category" :editions="state.editions" />
  </LayoutDefault>
</template>

<script lang="ts" setup>
  import { onMounted } from 'vue'
  import { usefilter } from '@/stores/editions'

  const store = usefilter()

  onMounted(() => {
    store.initializeData()
  })

  const state = store.state
</script>
