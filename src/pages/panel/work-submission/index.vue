<template>
  <LayoutSteps size="w-md-33" title="Enviar um trabalho">
    <v-form>
      <v-row>
        <v-col cols="12">
          <v-autocomplete
            v-model="form.cross_cutting_theme"
            clearable
            :items="categoryStore.crossCuttingThemes"
            label="Temas Transversais"
            rounded="xl"
            variant="outlined"
          />
        </v-col>
        <v-col cols="12" sm="6">
          <v-text-field
            v-model="form.title"
            label="Título"
            rounded="xl"
            variant="outlined"
          />
        </v-col>
        <v-col cols="12" sm="6">
          <v-autocomplete
            v-model="form.ods"
            chips
            clearable
            :items="categoryStore.ods"
            label="ODS"
            multiple
            rounded="xl"
            variant="outlined"
          />
        </v-col>
        <v-col cols="12" sm="12">
          <v-autocomplete
            v-model="form.field"
            chips
            clearable
            :items="categoryStore.field"
            label="Áreas de Conhecimento"
            multiple
            rounded="xl"
            variant="outlined"
          />
        </v-col>
        <v-col cols="12">
          <v-textarea
            v-model="form.abstract"
            auto-grow
            counter
            label="Resumo do Projeto"
            rounded="xl"
            rows="1"
            variant="outlined"
          />
        </v-col>
      </v-row>
      <v-btn
        block
        class="py-6"
        color="primary"
        rounded="xl"
        @click="sendWork"
      >
        Confirmar
      </v-btn>
    </v-form>
  </LayoutSteps>
</template>

  <script setup>
  import LayoutSteps from '@/components/LayoutSteps.vue'
  import { useEdition } from '../../../stores/edition'
  import { useAuth } from '@/stores/auth'
  import { useCategory } from '@/stores/category'
  import { useWork } from '@/stores/work'

  const editionStore = useEdition()
  const categoryStore = useCategory()
  const authStore = useAuth()
  const workStore = useWork()

  const sendWork = async() => {
    form.team = authStore?.userTeam?.id
    await workStore.sendWork(form)
  }

  const form = reactive({
    title: '',
    abstract: '',
    field: [],
    evaluator: [],
    cross_cutting_theme: 0,
    team: null,
    ods: [],
  })

  onMounted(() => {
    editionStore.fetchCurrentEdition()
    categoryStore.getCrossCuttingThemes()
    categoryStore.getOds()
    categoryStore.getField()
    authStore.getStudents()
    authStore.getUserTeam()
  })
  </script>
