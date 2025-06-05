<template>
  <v-autocomplete
    v-model="search"
    chips
    clearable
    :items="['Informática', 'Agropecuária', 'Quimíca']"
    label="Buscar por Área"
    multiple
    prepend-inner-icon="mdi-magnify"
    rounded="xl"
    variant="plain"
  />
  <div class="rounded-xl">
    <v-data-table
      class="pa-2 text-caption"
      :headers="recivedpapersHeaders"
      :items="recivedPapers"
      :search="search"
    >
      <!-- eslint-disable-next-line vue/valid-v-slot -->
      <template #item.name="{ item }">
        <v-btn
          class="pa-0 hover"
          color="primary"
          :to="props.dashboard ? '/dashboard/paper/:id'.replace(':id', item.id) : '/panel/evaluation/paper/:id'.replace(':id', item.id)"
          variant="text"
        >
          {{ item.name }}
        </v-btn>
      </template>

      <!-- eslint-disable-next-line vue/valid-v-slot -->
      <template #item.status="{ item }">
        <div class="text-start">
          <v-chip
            :color="getColor(item.status)"
          >
            {{ item.status }}
          </v-chip>
        </div>
      </template>
    </v-data-table>
  </div>
</template>
<script setup>
// @ts-nocheck
  import { recivedPapers, recivedpapersHeaders } from '@/utils/local_db'

  const props = defineProps({
    dashboard: Boolean,
  })

  const getColor = name => {
    if (name === 'Falta Avaliadores') return 'indigo'
    if (name === 'Esperando Pontuação') return 'green'
    if (name === 'Reprovado') return 'red'
    return 'bg-gray'
  }
</script>

<style scoped>
.hover:hover {
    cursor: pointer;
    text-decoration: underline;
}
</style>
