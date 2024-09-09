<template>
  <LayoutSteps size="w-md-33" title="Enviar um trabalho">
    <v-form>
      <v-row>
        <v-col cols="12">
          <v-autocomplete
            clearable
            :items="panelStore.crossCuttingThemes"
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
            :items="panelStore.crossCuttingThemes"
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
            :items="panelStore.crossCuttingThemes"
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
        @click="panelStore.saveCrossCuttingThemes()"
      >
        Confirmar
      </v-btn>
    </v-form>
  </LayoutSteps>
</template>

  <script setup>
  import LayoutSteps from '@/components/LayoutSteps.vue'
  import { usePanel } from '@/stores/panel'

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
  const panelStore = usePanel()

  onMounted(() => {
    panelStore.getCrossCuttingThemes()
  })
  </script>
