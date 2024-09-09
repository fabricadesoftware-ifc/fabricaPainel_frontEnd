<script setup lang="ts">
  import { ref } from 'vue'
  const modalities = ref<{ value: string }[]>([
    {
      value: 'Agronomia',
    },
    {
      value: 'Educação',
    },
    {
      value: 'Informática',
    },
    {
      value: 'Medicina Veterinária',
    },
    {
      value: 'multidisciplinar',
    },
    {
      value: 'outros',
    },
  ])
</script>
<template>
  <div class="d-flex flex-column ga-3">
    <VCardTitle>Programação</VCardTitle>
    <VCardText>
      Lorem, ipsum dolor sit amet consectetur adipisicing elit. Amet placeat
      quam vero eveniet hic, libero fuga! Similique obcaecati provident unde ea
      quam necessitatibus consequuntur beatae minima quisquam, debitis aliquam
      nulla!
    </VCardText>
    <VCardTitle>Modalidades</VCardTitle>
    <VList class="bg-transparent">
      <VListItem v-for="(modality, index) in modalities" :key="index">
        <VListItemTitle class="text-bold">{{ modality.value }}</VListItemTitle>
      </VListItem>
    </VList>
  </div>
  <div class="w-100">
    <div class="w-100">
      <VImg src="../assets/imagem-test.jpg" />
    </div>
  </div>
</template>
