<script setup>
  import { Status } from '@/interfaces/work'
  import { useWork } from '@/stores/work'

  const workStore = useWork()
  const search = ref('')
  const props = defineProps({
    title: String,
    works: Array,
  })

  const getColor = name => {
    if (name === 0) return 'blue'
    if (name === 1) return 'green'
    if (name === 3) return 'red'
    return 'bg-gray'
  }

  const worksHeaders = [
    {
      title: 'Status',
      align: 'start',
      sortable: false,
      key: 'status',
    },
    {
      title: 'Titulo do Trabalho',
      align: 'start',
      sortable: false,
      key: 'title',
    },
    {
      title: 'ODS',
      align: 'start',
      sortable: false,
      key: 'ods',
    },
    {
      title: 'Área',
      align: 'start',
      sortable: false,
      key: 'field',
    },
    {
      title: 'Tema Transversal',
      align: 'start',
      sortable: false,
      key: 'cross_cutting_theme',
    },
    {
      title: 'Data de Submissão',
      align: 'start',
      sortable: false,
      key: 'initial_submission_work_date',
    },
  ]

</script>

<template>
  <v-row>
    <v-col>
      <h1 class="text-h5 py-4 font-weight-bold">
        {{ props.title }}
      </h1>
      <v-text-field
        v-if="props.works.length > 1"
        v-model="search"
        class="pa-2"
        clearable
        hide-details
        label="Pesquisar"
        placeholder="Digite para pesquisar..."
        prepend-inner-icon="mdi-magnify"
        rounded="xl"
        variant="plain"
      />
      <div class="rounded-xl">
        <v-data-table
          class="pa-2"
          :headers="worksHeaders"
          :items="props.works"
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
                {{ Status[item.status].replace(/_/g, ' ') }}
              </v-chip>
            </div>
          </template>
          <template #item.initial_submission_work_date="{ item }">
            {{ workStore.coverteData(item.initial_submission_work_date) }}
          </template>
          <template #item.field="{ item }">
            {{ item.field.map(field => field.name).join(', ') }}
          </template>
          <template #item.cross_cutting_theme="{ item }">
            {{ item.cross_cutting_theme.name }}
          </template>
          <template #item.ods="{ item }">
            {{ item.ods.map(ods => ods.name).join(', ') }}
          </template>
          <template #item.title="{ item }">
            <v-btn
              class="pa-0 hover"
              color="primary"
              :to="'/panel/paper/:id'.replace(':id', item.id)"
              variant="text"
            >
              {{ item.title }}
            </v-btn>
          </template>
        </v-data-table>
      </div>
    </v-col>
  </v-row>
</template>

<style scoped>
.hover:hover {
  cursor: pointer;
  text-decoration: underline;
}
</style>
