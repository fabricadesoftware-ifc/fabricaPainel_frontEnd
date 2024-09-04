<template>
  <LayoutDashboard>
    <InformativeAlert />
    <v-card
      class="border-md w-100 mt-5"
      rounded="xl"
      variant="outlined"
    >
      <div class="h-100 d-flex flex-column justify-space-between pa-10">
        <v-row>
          <v-col class="d-flex flex-column ga-4 justify-center" cols="6">
            <p class="text-blue">
              {{ edition.theme }} <span class="text-grey"> - Carga Horária: {{ edition.workload }} horas</span>
            </p>
            <h2 class="text-primary font-weight-bold text-h4 pt-2">
              {{ edition.edition_name }} - {{ edition.year }}
            </h2>
            <p class="text-grey-darken-2">
              <span class="d-block">Data de Registro de tema:</span>
              <span class="text-black font-weight-bold">
                {{ formatDate(edition.initil_submission_date) }}
              </span>
              até
              <span class="text-black font-weight-bold">
                {{ formatDate(edition.final_submission_date) }}
              </span>
            </p>
            <p class="text-grey-darken-2">
              <span class="d-block">Data de Submissão:</span>
              <span class="text-black font-weight-bold">
                {{ formatDate(edition.initil_submission_date) }}
              </span>
              até
              <span class="text-black font-weight-bold">
                {{ formatDate(edition.final_submission_date) }}
              </span>
            </p>
            <p class="text-grey-darken-2">
              <span class="d-block">Data de Orientação:</span>
              <span class="text-black font-weight-bold">
                {{ formatDate(edition.initial_advisor_date) }}
              </span>
              até
              <span class="text-black font-weight-bold">
                {{ formatDate(edition.final_advisor_date) }}
              </span>
            </p>
            <p class="text-grey-darken-2">
              <span class="d-block">Data de Registro de Avaliadores:</span>
              <span class="text-black font-weight-bold">
                {{ formatDate(edition.initil_submission_date) }}
              </span>
              até
              <span class="text-black font-weight-bold">
                {{ formatDate(edition.final_submission_date) }}
              </span>
            </p>
            <p class="text-grey-darken-2">
              <span class="d-block">Data de Avaliação</span>
              <span class="text-black font-weight-bold">
                {{ formatDate(edition.initial_evaluators_date) }}
              </span>
              até
              <span class="text-black font-weight-bold">
                {{ formatDate(edition.final_evaluators_date) }}
              </span>
            </p>
          </v-col>
          <v-col>
            <img alt="" class="w-100 rounded-xl" src="https://th.bing.com/th/id/OIP.MQJrIQeghQLdcs1uFBZHzwHaEp?rs=1&pid=ImgDetMain">
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <h1 class="text-h5 py-4 font-weight-bold">
              Registros de Submissões
            </h1>
            <RecivedTable dashboard />
          </v-col>
        </v-row>
        <v-row>
          <v-dialog
            v-model="dialog"
            class="w-md-75"
          >
            <template #activator="{ props: activatorProps }">
              <v-btn
                block
                class="rounded-xl mt-6 py-6"
                color="primary"
                text="Editar Informações"
                variant="flat"
                v-bind="activatorProps"
              />
            </template>

            <v-card
              prepend-icon="mdi-application-edit"
              title="Editar Edição Atual"
            >
              <v-card-text>
                <v-form v-model="valid">
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
                    </v-row>
                  </v-container>
                </v-form>
              </v-card-text>

              <v-divider />

              <v-card-actions>
                <v-spacer />

                <v-btn
                  class="px-8"
                  rounded="xl"
                  text="Close"
                  variant="plain"
                  @click="dialog = false"
                />

                <v-btn
                  class="px-8"
                  color="primary"
                  rounded="xl"
                  text="Salvar"
                  variant="flat"
                  @click="dialog = false"
                />
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-row>
      </div>
    </v-card>
  </LayoutDashboard>
</template>

<script lang="ts" setup>
import { computed } from 'vue';

  const editions = [
    {
      year: 2024,
      theme: 'Technology and Innovation',
      edition_name: 'Tech Innovators',
      initil_submission_date: '2024-01-15T09:00:00',
      final_submission_date: '2024-03-01T23:59:59',
      initial_advisor_date: '2024-03-05T09:00:00',
      final_advisor_date: '2024-04-15T23:59:59',
      initial_evaluators_date: '2024-04-20T09:00:00',
      final_evaluators_date: '2024-05-10T23:59:59',
      workload: 120,
      banner: null,
      logo: null,
    },
    {
      year: 2023,
      theme: 'Sustainability in Business',
      edition_name: 'EcoBiz Summit',
      initil_submission_date: '2023-02-10T09:00:00',
      final_submission_date: '2023-03-25T23:59:59',
      initial_advisor_date: '2023-03-30T09:00:00',
      final_advisor_date: '2023-05-01T23:59:59',
      initial_evaluators_date: '2023-05-05T09:00:00',
      final_evaluators_date: '2023-06-10T23:59:59',
      workload: 100,
      banner: null,
      logo: null,
    },
    {
      year: 2022,
      theme: 'Digital Transformation',
      edition_name: 'DigiTrans 2022',
      initil_submission_date: '2022-01-20T09:00:00',
      final_submission_date: '2022-03-15T23:59:59',
      initial_advisor_date: '2022-03-20T09:00:00',
      final_advisor_date: '2022-04-30T23:59:59',
      initial_evaluators_date: '2022-05-05T09:00:00',
      final_evaluators_date: '2022-06-15T23:59:59',
      workload: 110,
      banner: null,
      logo: null,
    },
    {
      year: 2021,
      theme: 'Artificial Intelligence',
      edition_name: 'AI Revolution',
      initil_submission_date: '2021-02-01T09:00:00',
      final_submission_date: '2021-03-20T23:59:59',
      initial_advisor_date: '2021-03-25T09:00:00',
      final_advisor_date: '2021-05-05T23:59:59',
      initial_evaluators_date: '2021-05-10T09:00:00',
      final_evaluators_date: '2021-06-20T23:59:59',
      workload: 90,
      banner: null,
      logo: null,
    },
    {
      year: 2020,
      theme: 'Health and Medicine',
      edition_name: 'MedTech Forum',
      initil_submission_date: '2020-01-25T09:00:00',
      final_submission_date: '2020-03-05T23:59:59',
      initial_advisor_date: '2020-03-10T09:00:00',
      final_advisor_date: '2020-04-20T23:59:59',
      initial_evaluators_date: '2020-04-25T09:00:00',
      final_evaluators_date: '2020-06-01T23:59:59',
      workload: 100,
      banner: null,
      logo: null,
    },
  ]
  const edition = editions[0]

  const formatDate = computed(() => {
    return (dateTime: string | number | Date) => {
      const options = { year: 'numeric', month: '2-digit', day: '2-digit' } as Intl.DateTimeFormatOptions
      return new Date(dateTime).toLocaleDateString('pt-BR', options)
    }
  })

  const valid = ref(false)
  const dialog = ref(false)

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
</script>
