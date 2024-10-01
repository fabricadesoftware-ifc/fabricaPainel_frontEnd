<script lang="ts" setup>
  import { ref, onMounted } from 'vue'
  import { useEdition } from '@/stores/edition'

  const dialog = ref(false)
  const valid = ref(false)
  const { state, updateEdition, fetchEditions, fetchCurrentEdition, currentEdition } = useEdition()
  const form = ref({ ...currentEdition })

  const defaultBanner = 'https://th.bing.com/th/id/OIP.MQJrIQeghQLdcs1uFBZHzwHaEp?rs=1&pid=ImgDetMain'

  const formatDate = (date: string) => new Date(date).toLocaleDateString()

  const saveEdition = () => {
    if (form.value) {
      updateEdition(state.editions[state.editions.length - 1].id, form.value)
      dialog.value = false
      fetchCurrentEdition()
    }
  }

  onMounted(() => {
    fetchEditions()
    fetchCurrentEdition()
  })

</script>

<template>
  <LayoutDashboard>
    <v-container>
      <template v-if="state.currentEdition">
        <v-card class="border-md w-100 mt-5" rounded="xl" variant="outlined">
          <div class="h-100 d-flex flex-column justify-space-between pa-10">
            <v-row>
              <v-col class="d-flex flex-column ga-4 justify-center" cols="6">
                <p class="text-blue">
                  {{ state.currentEdition?.theme }} <span class="text-grey"> - Carga Horária: {{ state.currentEdition?.workload }} horas</span>
                </p>
                <h2 class="text-primary font-weight-bold text-h4 pt-2">
                  {{ state.currentEdition?.edition_name }} - {{ state.currentEdition?.year }}
                </h2>
                <p class="text-grey-darken-2">
                  <span class="d-block">Data de Registro de tema:</span>
                  <span class="text-black font-weight-bold">
                    {{ formatDate(state.currentEdition?.initial_registration_theme_date) }}
                  </span>
                  até
                  <span class="text-black font-weight-bold">
                    {{ formatDate(state.currentEdition?.final_registration_theme_date) }}
                  </span>
                </p>
              </v-col>
              <v-col>
                <img alt="" class="w-100 rounded-xl" :src="state.currentEdition?.banner.file || defaultBanner">
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <h1 class="text-h5 py-4 font-weight-bold">
                  Registros de Submissões
                </h1>
              </v-col>
            </v-row>
            <v-row>
              <v-dialog v-model="dialog" class="w-md-75">
                <template #activator="{ props: activatorProps }">
                  <v-btn block class="rounded-xl mt-6 py-6" color="primary" text="Editar Informações" variant="flat" v-bind="activatorProps" />
                </template>

                <v-card prepend-icon="mdi-application-edit" title="Editar Edição Atual">
                  <v-card-text>
                    <v-form v-model="valid">
                      <v-text-field v-model="form.year" label="Ano" type="number" variant="outline"/>
                      <v-text-field v-model="form.theme" label="Tema" variant="outline" />
                      <v-text-field v-model="form.edition_name" label="Nome da Edição" variant="outline"/>
                      <v-text-field v-model="form.initial_submission_date" label="Data Inicial de Submissão" type="date" variant="outline"/>
                      <v-text-field v-model="form.final_submission_date" label="Data Final de Submissão" type="date" variant="outline" />
                      <v-text-field v-model="form.initial_advisor_date" label="Data Inicial de Orientadores" type="date" variant="outline" />
                      <v-text-field v-model="form.final_advisor_date" label="Data Final de Orientadores" type="date" variant="outline" />
                      <v-text-field v-model="form.initial_evaluators_date" label="Data Inicial de Avaliadores" type="date" variant="outline" />
                      <v-text-field v-model="form.final_evaluators_date" label="Data Final de Avaliadores" type="date" variant="outline" />
                      <v-text-field v-model="form.initial_registration_theme_date" label="Data Inicial de Registro de Tema" type="date" variant="outline" />
                      <v-text-field v-model="form.final_registration_theme_date" label="Data Final de Registro de Tema" type="date" variant="outline" />
                      <v-text-field v-model="form.initial_registration_evaluator_date" label="Data Inicial de Registro de Avaliadores" type="date" variant="outline" />
                      <v-text-field v-model="form.final_registration_evaluator_date" label="Data Final de Registro de Avaliadores" type="date" variant="outline" />
                      <v-text-field v-model="form.workload" label="Carga Horária" type="number" variant="outline" />
                      <v-switch v-model="form.is_open" label="Aberto para Submissões" variant="outline" />
                    </v-form>
                  </v-card-text>

                  <v-divider />

                  <v-card-actions>
                    <v-spacer />
                    <v-btn class="px-8" rounded="xl" text="Close" variant="plain" @click="dialog = false" />
                    <v-btn class="px-8" color="primary" rounded="xl" text="Salvar" variant="flat" @click="saveEdition" />
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-row>
          </div>
        </v-card>
      </template>

      <template v-else>
        <v-alert type="info">
          Não há uma edição atual disponível no momento.
        </v-alert>
      </template>
    </v-container>
  </LayoutDashboard>
</template>
