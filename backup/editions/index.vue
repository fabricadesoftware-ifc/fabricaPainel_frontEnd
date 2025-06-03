<template>
  <LayoutDefault>
    <MainBanner :btnvisible="false" :class="'border-0'" :text="'Todas as edições'" />
    <EditionsView :ano="state.currentEdition?.year" :editions="state.editions" />
  </LayoutDefault>
</template>

<script lang="ts" setup>
  import { onMounted } from 'vue'
  import { useEdition } from '@/stores/edition'

  const { fetchCurrentEdition, state } = useEdition()

  onMounted(() => {
    fetchCurrentEdition()
  })

</script>
