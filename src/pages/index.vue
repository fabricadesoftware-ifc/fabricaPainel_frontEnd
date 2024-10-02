<script lang="ts" setup>
  import { useEdition } from '@/stores/edition'

  const editionStore = useEdition()

  onMounted(() => {
    editionStore.fetchCurrentEdition()
  })
</script>
<template>
  <LayoutDefault>
    <MainBanner :btnvisible="editionStore" :class="'p-0 border-0'" />
    <IssuesPreview />
    <EvaluationSection />
  </LayoutDefault>
</template>
