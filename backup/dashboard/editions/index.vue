<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { useEdition } from "@/stores/edition";
import { useWork } from "@/stores/work";

const dialog = ref(false);
const valid = ref(false);
const editionStore = useEdition();
const workStore = useWork();
const form = ref({ ...editionStore.currentEdition });

const defaultBanner =
  "https://th.bing.com/th/id/OIP.MQJrIQeghQLdcs1uFBZHzwHaEp?rs=1&pid=ImgDetMain";

const formatDate = (date: string) => new Date(date).toLocaleDateString();

const saveEdition = () => {
  if (form.value) {
    // @ts-ignore
    editionStore.updateEdition(editionStore.currentEdition?.id, {
      ...form.value,
      year: Number(form.value.year),
      workload: Number(form.value.workload),
      // @ts-ignore
      banner: form.value.banner?.id,
      // @ts-ignore
      logo: form.value.logo?.id,
    });
    dialog.value = false;
    editionStore.fetchCurrentEdition();
  }
};

onMounted(() => {
  editionStore.fetchEditions();
  editionStore.fetchCurrentEdition();
});
</script>

<template>
  <LayoutDashboard>
    <v-container>
      <template v-if="editionStore.currentEdition">
        <v-card class="border-md w-100" rounded="xl" variant="outlined">
          <div class="h-100 d-flex flex-column justify-space-between pa-10">
            <v-row>
              <v-col class="d-flex flex-column ga-4 justify-center" cols="6">
                <p class="text-blue">
                  {{ editionStore.currentEdition?.theme }}
                  <span class="text-grey">
                    - Carga Horária:
                    {{ editionStore.currentEdition?.workload }} horas</span>
                </p>
                <h2 class="text-primary font-weight-bold text-h4 pt-2">
                  {{ editionStore.currentEdition?.edition_name }} -
                  {{ editionStore.currentEdition?.year }}
                </h2>
                <p class="text-grey-darken-2">
                  <span class="d-block">Data de Registro de tema:</span>
                  <span class="text-black font-weight-bold">
                    {{
                      formatDate(
                        editionStore.currentEdition?.initial_registration_theme_date
                      )
                    }}
                  </span>
                  até
                  <span class="text-black font-weight-bold">
                    {{
                      formatDate(
                        editionStore.currentEdition?.final_registration_theme_date
                      )
                    }}
                  </span>
                </p>
                <p class="text-grey-darken-2">
                  <span class="d-block">Data de Registro de Avaliadores:</span>
                  <span class="text-black font-weight-bold">
                    {{
                      formatDate(
                        editionStore.currentEdition?.initial_registration_evaluator_date
                      )
                    }}
                  </span>
                  até
                  <span class="text-black font-weight-bold">
                    {{
                      formatDate(
                        editionStore.currentEdition?.final_registration_evaluator_date
                      )
                    }}
                  </span>
                </p>
                <p class="text-grey-darken-2">
                  <span class="d-block">Data de Submissão:</span>
                  <span class="text-black font-weight-bold">
                    {{ formatDate(editionStore.currentEdition?.initial_submission_date) }}
                  </span>
                  até
                  <span class="text-black font-weight-bold">
                    {{ formatDate(editionStore.currentEdition?.final_submission_date) }}
                  </span>
                </p>
                <p class="text-grey-darken-2">
                  <span class="d-block">Data de Orientadores:</span>
                  <span class="text-black font-weight-bold">
                    {{ formatDate(editionStore.currentEdition?.initial_advisor_date) }}
                  </span>
                  até
                  <span class="text-black font-weight-bold">
                    {{ formatDate(editionStore.currentEdition?.final_advisor_date) }}
                  </span>
                </p>
                <p class="text-grey-darken-2">
                  <span class="d-block">Data de Avaliadores:</span>
                  <span class="text-black font-weight-bold">
                    {{ formatDate(editionStore.currentEdition?.initial_evaluators_date) }}
                  </span>
                  até
                  <span class="text-black font-weight-bold">
                    {{ formatDate(editionStore.currentEdition?.final_evaluators_date) }}
                  </span>
                </p>
              </v-col>
              <v-col>
                <img alt="" class="w-100 rounded-xl"
                  :src="editionStore.currentEdition?.banner?.file ?? defaultBanner" />
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <h1 class="text-h5 py-4 font-weight-bold">Registros de Submissões</h1>
                <PaperAcceptanceTable :works="workStore.userWorks" />
              </v-col>
            </v-row>
            <v-row>
              <v-dialog v-model="dialog" class="w-md-75">
                <template #activator="{ props: activatorProps }">
                  <v-btn block class="rounded-xl mt-6 py-6" color="primary" text="Editar Informações" variant="flat"
                    v-bind="activatorProps" />
                </template>

                <v-card prepend-icon="mdi-application-edit" title="Editar Edição Atual">
                  <v-card-text class="px-10 py-4">
                    <v-form v-model="valid" @submit.prevent="saveEdition">
                      <v-text-field v-model="form.year" label="Ano" rounded="xl" type="number" variant="outlined" />
                      <v-text-field v-model="form.theme" label="Tema" rounded="xl" variant="outlined" />
                      <v-text-field v-model="form.edition_name" label="Nome da Edição" rounded="xl"
                        variant="outlined" />
                      <v-text-field v-model="form.initial_submission_date" label="Data Inicial de Submissão"
                        rounded="xl" type="date" variant="outlined" />
                      <v-text-field v-model="form.final_submission_date" label="Data Final de Submissão" rounded="xl"
                        type="date" variant="outlined" />
                      <v-text-field v-model="form.initial_advisor_date" label="Data Inicial de Orientadores"
                        rounded="xl" type="date" variant="outlined" />
                      <v-text-field v-model="form.final_advisor_date" label="Data Final de Orientadores" rounded="xl"
                        type="date" variant="outlined" />
                      <v-text-field v-model="form.initial_evaluators_date" label="Data Inicial de Avaliadores"
                        rounded="xl" type="date" variant="outlined" />
                      <v-text-field v-model="form.final_evaluators_date" label="Data Final de Avaliadores" rounded="xl"
                        type="date" variant="outlined" />
                      <v-text-field v-model="form.initial_registration_theme_date"
                        label="Data Inicial de Registro de Tema" rounded="xl" type="date" variant="outlined" />
                      <v-text-field v-model="form.final_registration_theme_date" label="Data Final de Registro de Tema"
                        rounded="xl" type="date" variant="outlined" />
                      <v-text-field v-model="form.initial_registration_evaluator_date"
                        label="Data Inicial de Registro de Avaliadores" rounded="xl" type="date" variant="outlined" />
                      <v-text-field v-model="form.final_registration_evaluator_date"
                        label="Data Final de Registro de Avaliadores" rounded="xl" type="date" variant="outlined" />
                      <v-text-field v-model="form.workload" label="Carga Horária" rounded="xl" type="number"
                        variant="outlined" />
                      <v-switch v-model="form.is_open" label="Aberto para Submissões" rounded="xl" variant="outlined" />
                    </v-form>
                  </v-card-text>

                  <v-divider />

                  <v-card-actions class="pa-10">
                    <v-spacer />
                    <v-btn class="px-8" rounded="xl" text="Close" variant="plain" @click="dialog = false" />
                    <v-btn class="px-8" color="primary" rounded="xl" text="Salvar" variant="flat"
                      @click="saveEdition" />
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-row>
          </div>
        </v-card>
      </template>

      <template v-else>
        <v-alert color="info" icon="mdi-alert-circle-outlined" outlinedd rounded="lg"
          text="Não há uma edição atual disponível no momento." variant="tonal" />
      </template>
    </v-container>
  </LayoutDashboard>
</template>
