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
              variant="outlined"
              rounded="xl"
            />
          </v-col>

          <!-- Logo -->
          <v-col cols="12" md="6">
            <v-file-input
              v-model="form.logo"
              accept="image/*"
              label="Logo"
              required
              variant="outlined"
              rounded="xl"
            />
          </v-col>

          <!-- Edition Name -->
          <v-col cols="12" md="12">
            <v-text-field
              v-model="form.edition_name"
              label="Nome da Edição"
              required
              :rules="[v => !!v || 'Nome da Edição é obrigatório']"
              variant="outlined"
              rounded="xl"
            />
          </v-col>

          <!-- Year -->
          <v-col cols="12" md="4">
            <v-text-field
              v-model="form.year"
              label="Ano"
              required
              :rules="[v => !!v || 'Ano é obrigatório']"
              type="number"
              variant="outlined"
              rounded="xl"
            />
          </v-col>

          <!-- Theme -->
          <v-col cols="12" md="4">
            <v-text-field
              v-model="form.theme"
              label="Tema"
              required
              :rules="[v => !!v || 'Tema é obrigatório']"
              variant="outlined"
              rounded="xl"
            />
          </v-col>

          <!-- Workload -->
          <v-col cols="12" md="4">
            <v-text-field
              v-model="form.workload"
              label="Carga Horária"
              required
              :rules="[v => !!v || 'Carga horária é obrigatória']"
              type="number"
              variant="outlined"
              rounded="xl"
            />
          </v-col>

          <!-- Initial Submission Date -->
          <v-col cols="12" md="6">
            <v-dialog v-model="dialogInitialSubmission" v-model:return-value="form.initil_submission_date" persistent width="290px">
              <template #activator="{ props }">
                <v-text-field
                  v-model="form.initil_submission_date"
                  label="Data de Início de Submissão"
                  v-bind="props"
                  required
                  variant="outlined"
                  rounded="xl"
                />
              </template>
              <v-date-picker v-model="form.initil_submission_date" @input="dialogInitialSubmission = false" />
            </v-dialog>
          </v-col>

          <!-- Final Submission Date -->
          <v-col cols="12" md="6">
            <v-dialog v-model="dialogFinalSubmission" v-model:return-value="form.final_submission_date" persistent width="290px">
              <template #activator="{ props }">
                <v-text-field
                  v-model="form.final_submission_date"
                  label="Data de Fim de Submissão"
                  v-bind="props"
                  required
                  variant="outlined"
                  rounded="xl"
                />
              </template>
              <v-date-picker v-model="form.final_submission_date" @input="dialogFinalSubmission = false" />
            </v-dialog>
          </v-col>

          <!-- Initial Advisor Date -->
          <v-col cols="12" md="6">
            <v-dialog v-model="dialogInitialAdvisor" v-model:return-value="form.initial_advisor_date" persistent width="290px">
              <template #activator="{ props }">
                <v-text-field
                  v-model="form.initial_advisor_date"
                  label="Data de Início de Orientação"
                  v-bind="props"
                  required
                  variant="outlined"
                  rounded="xl"
                />
              </template>
              <v-date-picker v-model="form.initial_advisor_date" @input="dialogInitialAdvisor = false" />
            </v-dialog>
          </v-col>

          <!-- Final Advisor Date -->
          <v-col cols="12" md="6">
            <v-dialog v-model="dialogFinalAdvisor" v-model:return-value="form.final_advisor_date" persistent width="290px">
              <template #activator="{ props }">
                <v-text-field
                  v-model="form.final_advisor_date"
                  label="Data de Fim de Orientação"
                  v-bind="props"
                  required
                  variant="outlined"
                  rounded="xl"
                />
              </template>
              <v-date-picker v-model="form.final_advisor_date" @input="dialogFinalAdvisor = false" />
            </v-dialog>
          </v-col>

          <!-- Initial Evaluators Date -->
          <v-col cols="12" md="6">
            <v-dialog v-model="dialogInitialEvaluators" v-model:return-value="form.initial_evaluators_date" persistent width="290px">
              <template #activator="{ props }">
                <v-text-field
                  v-model="form.initial_evaluators_date"
                  label="Data de Início para Avaliadores"
                  v-bind="props"
                  required
                  variant="outlined"
                  rounded="xl"
                />
              </template>
              <v-date-picker v-model="form.initial_evaluators_date" @input="dialogInitialEvaluators = false" />
            </v-dialog>
          </v-col>

          <!-- Final Evaluators Date -->
          <v-col cols="12" md="6">
            <v-dialog v-model="dialogFinalEvaluators" v-model:return-value="form.final_evaluators_date" persistent width="290px">
              <template #activator="{ props }">
                <v-text-field
                  v-model="form.final_evaluators_date"
                  label="Data de Fim para Avaliadores"
                  v-bind="props"
                  required
                  variant="outlined"
                  rounded="xl"
                />
              </template>
              <v-date-picker v-model="form.final_evaluators_date" @input="dialogFinalEvaluators = false" />
            </v-dialog>
          </v-col>
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

<script setup>
  const valid = ref(false)

  const form = ref({
    year: '',
    theme: '',
    edition_name: '',
    initil_submission_date: '',
    final_submission_date: '',
    initial_advisor_date: '',
    final_advisor_date: '',
    initial_evaluators_date: '',
    final_evaluators_date: '',
    workload: '',
    banner: null,
    logo: null,
  })

  const dialogInitialSubmission = ref(false)
  const dialogFinalSubmission = ref(false)
  const dialogInitialAdvisor = ref(false)
  const dialogFinalAdvisor = ref(false)
  const dialogInitialEvaluators = ref(false)
  const dialogFinalEvaluators = ref(false)

  const submitForm = () => {
    if (valid.value) {
      // Implementar a lógica para enviar os dados do formulário para a API ou backend
      console.log('Formulário enviado:', form.value)
    } else {
      console.log('O formulário não é válido')
    }
  }
</script>

<style scoped>
/* Adicione estilos personalizados aqui, se necessário */
</style>
