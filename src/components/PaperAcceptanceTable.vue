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
      class="pa-2"
      :headers="papersHeaders"
      :items="papers"
      :search="search"
    >
      <template #item.name="{ item }">
        <v-btn
          class="pa-0 hover"
          color="primary"
          :to="'/panel/paper/:id'.replace(':id', item.id)"
          variant="text"
        >
          {{ item.name }}
        </v-btn>
      </template>
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
  import { papers, papersHeaders } from '@/utils/local_db'

  const getColor = name => {
    if (name === 'Pendente') return 'blue'
    if (name === 'Aprovado') return 'green'
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
