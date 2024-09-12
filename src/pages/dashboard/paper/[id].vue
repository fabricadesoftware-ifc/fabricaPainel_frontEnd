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
          <v-expansion-panel-title class="bg-grey-lighten-4" collapse-icon="mdi-minus" expand-icon="mdi-plus">
            Integrantes da Equipe:
          </v-expansion-panel-title>
          <v-expansion-panel-text>
            <ul class="font-weight-bold">
              <li class="d-block">{{ team.teamRep }} <span class="d-inline font-weight-light">( Líder )</span></li>
              <li v-for="student in team.students" :key="student.id">
                {{ student.name }}
              </li>
            </ul>
          </v-expansion-panel-text>
        </v-expansion-panel>
        <v-expansion-panel value="abstract">
          <v-expansion-panel-title class="bg-grey-lighten-4" collapse-icon="mdi-minus" expand-icon="mdi-plus">
            Resumo do Projeto
          </v-expansion-panel-title>
          <v-expansion-panel-text>
            <p>
              {{ paper.abstract }}
            </p>
          </v-expansion-panel-text>
        </v-expansion-panel>
        <v-expansion-panel value="evaluation">
          <v-expansion-panel-title class="bg-grey-lighten-4" collapse-icon="mdi-minus" expand-icon="mdi-plus">
            Orientadores / Avaliadores
          </v-expansion-panel-title>
          <v-expansion-panel-text><v-row>
            <v-col cols="6">
              <p>Orientadores</p>
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
      <v-row class="mt-8 ga-2" justify="end">

        <div class="pa-4 text-center">
          <v-dialog
            scrollable
            width="auto"
          >
            <template #activator="{ props: activatorProps }">
              <v-btn
                color="info"
                rounded="xl"
                variant="flat"
                v-bind="activatorProps"
              >Registar Avaliadores</v-btn>
            </template>

            <template #default="{ isActive }">
              <v-card
                prepend-icon="mdi-account-group"
                title="Selecione os Avaliadores"
              >
                <v-divider class="mt-3" />
                <v-card-text class="px-4">
                  <v-autocomplete
                    chips
                    clearable
                    :items="
                      [
                        'Professor 1',
                        'Professor 2',
                        'Professor 3',
                        'Professor 4',
                        'Professor 5',
                      ]"
                    label="Temas Transversais"
                    multiple
                    rounded="xl"
                    variant="outlined"
                  />
                </v-card-text>
                <v-card-actions>
                  <v-btn
                    color="red"
                    rounded="xl"
                    text="Fechar"
                    @click="isActive.value = false"
                  />
                  <v-btn
                    color="primary"
                    rounded="xl"
                    text="Confirmar"
                    @click="isActive.value = false"
                  />
                </v-card-actions>
              </v-card>
            </template>
          </v-dialog>
        </div>
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
    'abstract',
    'evaluation',
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
    return 'red'
  }

  const categories = computed(() => {
    return {
      area: paper.value.area,
      ods: paper.value.ods,
      crossCuttingThemes: paper.value.crossCuttingThemes,
    }
  })

  const team = computed(() => {
    return {
      teamRep: paper.value.teamRep,
      students: [
        { id: 1, name: 'Mateus Lopes Albano' },
        { id: 2, name: 'Vinicius de Oliveira' },
        { id: 3, name: 'Joanatas Perazaflix Junior' },
      ],
    }
  })

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
