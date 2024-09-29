<template>
  <LayoutSteps size="w-md-33" title="Enviar um trabalho">
    <v-form>
      <v-row>
        <v-col cols="12">
          <v-autocomplete
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
            chips
            clearable
            :items="categoryStore.ods"
            label="ODS"
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
        <v-col cols="12">
          <v-autocomplete
            chips
            clearable
            :items="authStore.formattedStudents"
            label="Selecione os integrantes da sua equipe"
            multiple
            rounded="xl"
            variant="outlined"
          />
        </v-col>
      </v-row>
      <v-btn
        block
        class="py-6"
        color="primary"
        rounded="xl"
        @click="workStore.sendWork(form)"
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

  const form = reactive({
    title: '',
    abstract: '',
    edition: '',
    field: '',
    evaluator: '',
    cross_cutting_theme: '',
    initial_submission_work_date: '',
    team: '',
    ods: '',
  })
  const editionStore = useEdition()
  const categoryStore = useCategory()
  const authStore = useAuth()
  const workStore = useWork()

  onMounted(() => {
    editionStore.fetchCurrentEdition()
    categoryStore.getCrossCuttingThemes()
    categoryStore.getOds()
    authStore.getStudents()
  })
  </script>
