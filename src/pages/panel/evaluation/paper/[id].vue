<template>
  <LayoutSteps>
    <v-card
      class="border-md w-100 pa-8"
      rounded="xl"
      variant="outlined"
    >
      <header class="d-flex justify-space-between">
        <h1>
          {{ paper.id }} - {{ paper.name }}
        </h1>
        <div>
          <v-chip
            v-for="(value, key) in categories"
            :key="key"
            class="mr-2 my-4"
            :color="getColor(key)"
            outlined
          >
            {{ value }}
          </v-chip>
        </div>
      </header>
      <v-divider class="my-4" />
      <v-expansion-panels v-model="panel" class="rounded-0 overflow-hidden" multiple variant="accordion">
        <v-expansion-panel value="team">
          <v-expansion-panel-title collapse-icon="mdi-minus" expand-icon="mdi-plus">
            Integrantes da Equipe:
          </v-expansion-panel-title>
          <v-expansion-panel-text>
            <ul>
              <li>{{ team.teamRep }} <b>[ Líder ]</b></li>
              <li v-for="student in team.students" :key="student.id">
                {{ student.name }}
              </li>
            </ul>
          </v-expansion-panel-text>
        </v-expansion-panel>
        <v-expansion-panel value="abstract">
          <v-expansion-panel-title collapse-icon="mdi-minus" expand-icon="mdi-plus">
            Resumo do Projeto
          </v-expansion-panel-title>
          <v-expansion-panel-text>
            <p>
              {{ paper.abstract }}
            </p>
          </v-expansion-panel-text>
        </v-expansion-panel>
      </v-expansion-panels>
      <v-row class="mt-8 ga-2" justify="end">
        <v-btn
          color="red"
          rounded="xl"
          variant="flat"
        >Rejeitar</v-btn>
        <v-btn
          color="green"
          rounded="xl"
          variant="flat"
        >Aprovar</v-btn>
      </v-row>
    </v-card>
  </LayoutSteps>
</template>

<script lang="ts" setup>
  import { useRoute } from 'vue-router'
  import { papers } from '@/utils/local_db'
  import { IPaper } from '@/interfaces/paper'

  const router = useRoute()
  const id = ref('')
  const panel = ref([
    'team',
  ])
  const paper: Ref<IPaper> = ref({
    id: '',
    name: '',
    area: '',
    ods: '',
    crossCuttingThemes: '',
    teamRep: '',
    status: '',
    abstract: '',
  })

  const getColor = (key: string) => {
    if (key === 'area') return 'indigo'
    if (key === 'ods') return 'teal'
    return 'blue-grey'
  }

  const categories = computed(() => {
    return {
      area: paper.value.area,
      ods: paper.value.ods,
      crossCuttingThemes: paper.value.crossCuttingThemes,
    }
  })

  const team = {
    teamRep: paper.value.teamRep,
    students: [
      { id: 1, name: 'Mateus Lopes Albano' },
      { id: 2, name: 'Vinicius de Oliveira' },
      { id: 3, name: 'Joanatas Perazaflix Junior' },
    ],
  }

  onMounted(() => {
    id.value = router.params.id
    paper.value = papers.find((paper: any) => paper.id === id.value) as IPaper
  })
</script>

<style>
li {
  list-style-type: none;
  margin-bottom: 8px;
}
</style>
