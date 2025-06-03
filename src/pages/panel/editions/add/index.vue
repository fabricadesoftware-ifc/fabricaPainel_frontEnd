<template>
  <LayoutDashboard>
    <v-form v-model="valid" @submit.prevent="submitForm">
      <v-container>
        <v-row>
          <!-- Banner -->
          <v-col cols="12" md="6">
            <v-file-input
              v-model="form.banner"
              accept="image/*"
              label="Banner"
              required
              rounded="xl"
              variant="outlined"
            />
          </v-col>

          <!-- Logo -->
          <v-col cols="12" md="6">
            <v-file-input
              v-model="form.logo"
              accept="image/*"
              label="Logo"
              required
              rounded="xl"
              variant="outlined"
            />
          </v-col>

          <!-- Edition Name -->
          <v-col cols="12" md="12">
            <v-text-field
              v-model="form.edition_name"
              label="Nome da Edição"
              required
              rounded="xl"
              :rules="[v => !!v || 'Nome da Edição é obrigatório']"
              variant="outlined"
            />
          </v-col>

          <!-- Year -->
          <v-col cols="12" md="4">
            <v-text-field
              v-model="form.year"
              label="Ano"
              required
              rounded="xl"
              :rules="[v => !!v || 'Ano é obrigatório']"
              type="number"
              variant="outlined"
            />
          </v-col>

          <!-- Theme -->
          <v-col cols="12" md="4">
            <v-text-field
              v-model="form.theme"
              label="Tema"
              required
              rounded="xl"
              :rules="[v => !!v || 'Tema é obrigatório']"
              variant="outlined"
            />
          </v-col>

          <!-- Workload -->
          <v-col cols="12" md="4">
            <v-text-field
              v-model="form.workload"
              label="Carga Horária"
              required
              rounded="xl"
              :rules="[v => !!v || 'Carga horária é obrigatória']"
              type="number"
              variant="outlined"
            />
          </v-col>

          <!-- Initial REGISTRO DE TEMA Date -->
          <v-col cols="12" md="6">
            <v-text-field
              v-model="form.initial_registration_theme_date"
              label="Data de Início de Registro de Tema"
              required
              rounded="xl"
              variant="outlined"
            />
          </v-col>

          <!-- Final REGISTRO DE TEMA Date -->
          <v-col cols="12" md="6">
            <v-text-field
              v-model="form.final_registration_theme_date"
              label="Data de Fim de Registro de Tema"
              required
              rounded="xl"
              variant="outlined"
            />
          </v-col>

          <!-- Initial Submission Date -->
          <v-col cols="12" md="6">
            <v-text-field
              v-model="form.initial_submission_date"
              label="Data de Início de Submissão"
              required
              rounded="xl"
              variant="outlined"
            />
          </v-col>

          <!-- Final Submission Date -->
          <v-col cols="12" md="6">
            <v-text-field
              v-model="form.final_submission_date"
              label="Data de Fim de Submissão"
              required
              rounded="xl"
              variant="outlined"
            />
          </v-col>

          <!-- Initial Advisor Date -->
          <v-col cols="12" md="6">
            <v-text-field
              v-model="form.initial_advisor_date"
              label="Data de Início de Orientação"
              required
              rounded="xl"
              variant="outlined"
            />
          </v-col>

          <!-- Final Advisor Date -->
          <v-col cols="12" md="6">
            <v-text-field
              v-model="form.final_advisor_date"
              label="Data de Fim de Orientação"
              required
              rounded="xl"
              variant="outlined"
            />
          </v-col>

          <!-- Initial Evaluators Date -->
          <v-col cols="12" md="6">
            <v-text-field
              v-model="form.initial_registration_evaluator_date"
              label="Data de Início para Avaliadores"
              required
              rounded="xl"
              variant="outlined"
            />
          </v-col>

          <!-- Final Evaluators Date -->
          <v-col cols="12" md="6">
            <v-text-field
              v-model="form.final_registration_evaluator_date"
              label="Data de Fim para Avaliadores"
              required
              rounded="xl"
              variant="outlined"
            />
          </v-col>

          <!-- Initial Evaluators Date -->
          <v-col cols="12" md="6">
            <v-text-field
              v-model="form.initial_evaluators_date"
              label="Data de Início para Avaliadores"
              required
              rounded="xl"
              variant="outlined"
            />
          </v-col>

          <!-- Final Evaluators Date -->
          <v-col cols="12" md="6">
            <v-text-field
              v-model="form.final_evaluators_date"
              label="Data de Fim para Avaliadores"
              required
              rounded="xl"
              variant="outlined"
            />
          </v-col>

          <!-- btn -->
          <v-col cols="12">
            <v-btn
              block
              class="rounded-xl py-6"
              color="primary"
              text="Cadastrar"
              type="submit"
              variant="flat"
            />
          </v-col>
        </v-row>
      </v-container>
    </v-form>
  </layoutdashboard>
</template>

<script setup lang="ts">
  import { useEdition } from '@/stores/edition'
  import { useRouter } from 'vue-router'

  const editionStore = useEdition()
  const router = useRouter()
  const valid = ref(false)

  const form = ref({
    year: '',
    theme: '',
    edition_name: '',
    initial_registration_theme_date: '',
    final_registration_theme_date: '',
    initial_submission_date: '',
    final_submission_date: '',
    initial_advisor_date: '',
    final_advisor_date: '',
    initial_registration_evaluator_date: '',
    final_registration_evaluator_date: '',
    initial_evaluators_date: '',
    final_evaluators_date: '',
    workload: '',
    banner: null,
    logo: null,
    is_open: true,
  })

  const submitForm = () => {
    editionStore.createEdition({
      ...form.value,
      banner: null,
      logo: null,
      year: Number(form.value.year),
      workload: Number(form.value.workload),
    }).then(() => {
      router.push('/dashboard/editions')
    })
  }
</script>

<style scoped>
/* Adicione estilos personalizados aqui, se necessário */
</style>
