<script setup lang="ts">
  import { useWork } from '@/stores/work'
  import { useRouter } from 'vue-router'

  const router = useRouter()
  const work_id = router.currentRoute.value.params.id
  const workStore = useWork()
  const panel = ref([
    'team',
    'abstract',
  ])

  const categories = computed(() => {
    const field = workStore.currentWork?.field
    const ods = workStore.currentWork?.ods
    const crossCuttingTheme = workStore.currentWork?.cross_cutting_theme

    const mergeToArray = (item: {}) => Array.isArray(item) ? item : [item]

    return [
      ...mergeToArray(field),
      ...mergeToArray(ods),
      ...mergeToArray(crossCuttingTheme),
    ].filter(Boolean)
  })

  const team = computed(() => {
    return {
      students: [
        { id: 1, name: 'Mateus Lopes Albano' },
        { id: 2, name: 'Vinicius de Oliveira' },
        { id: 3, name: 'Joanatas Perazaflix Junior' },
      ],
    }
  })

  onMounted(() => {
    workStore.getWork(work_id)
  })
</script>

<template>
  <LayoutSteps>
    <v-card
      class="border-md w-100 pa-8"
      rounded="xl"
      variant="outlined"
    >
      <header>
        <v-row class="d-flex justify-space-between" no-gutters>
          <v-col cols="12">
            <h1 class="pb-4">
              {{ workStore.currentWork?.title }}
            </h1>
          </v-col>
          <v-col cols="12">
            <v-chip
              v-for="(value, key) in categories"
              :key="key"
              class="mr-2 my-2"
              color="blue"
              outlined
            >
              {{ value.name }}
            </v-chip>
          </v-col>
        </v-row>
      </header>
      <v-divider class="my-4" />
      <v-expansion-panels v-model="panel" class="rounded-0 overflow-hidden" multiple variant="accordion">
        <v-expansion-panel value="team">
          <v-expansion-panel-title class="py-6" collapse-icon="mdi-minus" expand-icon="mdi-plus">
            Integrantes da Equipe:
          </v-expansion-panel-title>
          <v-expansion-panel-text>
            <ul class="font-weight-bold">
              <li v-for="student in team.students" :key="student.id">
                {{ student.name }}
              </li>
            </ul>
          </v-expansion-panel-text>
        </v-expansion-panel>
        <v-expansion-panel value="abstract">
          <v-expansion-panel-title class="py-6" collapse-icon="mdi-minus" expand-icon="mdi-plus">
            Resumo do Projeto
          </v-expansion-panel-title>
          <v-expansion-panel-text>
            <p>
              {{ workStore.currentWork?.abstract }}
            </p>
          </v-expansion-panel-text>
        </v-expansion-panel>
        <v-expansion-panel value="evaluation">
          <v-expansion-panel-title class="py-6" collapse-icon="mdi-minus" expand-icon="mdi-plus">
            Orientadores / Avaliadores <span class="text-red ml-2 text-caption">(só aparece dps de aprovado)</span>
          </v-expansion-panel-title>
          <v-expansion-panel-text><v-row>
            <v-col cols="6">
              <p>Orientador</p>
              <v-chip
                class="mr-2 my-4"
                color="primary"
                outlined
              >
                Professor 1
              </v-chip>
              <p>Co-Orientadores</p>
              <v-chip
                class="mr-2 my-4"
                color="primary"
                outlined
              >
                Professor 1
              </v-chip>
            </v-col>
            <v-col cols="6">
              <p>Avaliadores</p>
              <v-chip
                class="mr-2 my-4"
                color="primary"
                outlined
              >
                Professor 2
              </v-chip>
              <v-chip
                class="mr-2 my-4"
                color="primary"
                outlined
              >
                Professor 2
              </v-chip>
              <v-chip
                class="mr-2 my-4"
                color="primary"
                outlined
              >
                Professor 2
              </v-chip>
            </v-col>
          </v-row>
          </v-expansion-panel-text>
        </v-expansion-panel>
      </v-expansion-panels>
      <v-row class="mt-8 ga-2" justify="end" no-gutters>
        <v-col cols="2">
          <v-btn
            block
            class="py-6"
            color="red"
            rounded="xl"
            variant="flat"
          >Rejeitar</v-btn>
        </v-col>
        <v-col cols="2">
          <v-btn
            block
            class="py-6"
            color="green"
            rounded="xl"
            variant="flat"
          >Aprovar</v-btn>
        </v-col>
      </v-row>
      <v-row class="mt-8" justify="end" no-gutters>
        <v-col class="pr-4" cols="2">
          <v-text-field
            label="Nota"
            max="10"
            rounded="xl"
            type="number"
            variant="outlined"
          />
        </v-col>
        <v-col cols="2">
          <v-btn
            block
            class="py-6"
            color="info"
            rounded="xl"
            variant="flat"
          >Dar Nota</v-btn>
        </v-col>
      </v-row>
    </v-card>
  </LayoutSteps>
</template>

<style>
li {
  list-style-type: none;
  margin-bottom: 8px;
}
</style>
