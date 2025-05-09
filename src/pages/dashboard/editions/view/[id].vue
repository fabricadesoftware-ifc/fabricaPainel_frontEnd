<script lang="ts" setup>
import { computed, onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { useEdition } from "@/stores/edition";

const { state, fetchEditions } = useEdition();

const router = useRoute();
const id = ref(null);
const edition = ref("Carregando...");

const formatDate = computed(() => {
  return (dateTime: any) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    };
    return new Date(dateTime).toLocaleDateString("pt-BR", options);
  };
});

onMounted(() => {
  fetchEditions().then(() => {
    // @ts-ignore
    id.value = router.params?.id;
    // @ts-ignore
    edition.value = state.editions.find((ed: any) => ed.id === Number(id.value));
  });
});
</script>

<template>
  <LayoutDashboard>
    <v-container>
      <template v-if="edition">
        <v-card class="border-md w-100 mt-5" rounded="xl" variant="outlined">
          <div class="h-100 d-flex flex-column justify-space-between pa-10">
            <v-row>
              <v-col class="d-flex flex-column ga-4 justify-center" cols="6">
                <p class="text-blue">
                  <!-- @vue-ignore -->
                  {{ edition.theme }}
                  <span class="text-grey">
                    - Carga Horária:
                    <!-- @vue-ignore -->
                    {{ edition.workload }} horas</span>
                </p>
                <h2 class="text-primary font-weight-bold text-h4 pt-2">
                  <!-- @vue-ignore -->
                  {{ edition.edition_name }} -
                  <!-- @vue-ignore -->
                  {{ edition.year }}
                </h2>
                <p class="text-grey-darken-2">
                  <span class="d-block">Data de Registro de tema:</span>
                  <span class="text-black font-weight-bold">
                    <!-- @vue-ignore -->
                    {{ formatDate(edition.initial_registration_theme_date) }}
                  </span>
                  até
                  <span class="text-black font-weight-bold">
                    <!-- @vue-ignore -->
                    {{ formatDate(edition.final_registration_theme_date) }}
                  </span>
                </p>
                <p class="text-grey-darken-2">
                  <span class="d-block">Data de Registro de Avaliadores:</span>
                  <span class="text-black font-weight-bold">
                    <!-- @vue-ignore -->
                    {{ formatDate(edition.initial_registration_evaluator_date) }}
                  </span>
                  até
                  <span class="text-black font-weight-bold">
                    <!-- @vue-ignore -->
                    {{ formatDate(edition.final_registration_evaluator_date) }}
                  </span>
                </p>
                <p class="text-grey-darken-2">
                  <span class="d-block">Data de Submissão:</span>
                  <span class="text-black font-weight-bold">
                    <!-- @vue-ignore -->
                    {{ formatDate(edition.initial_submission_date) }}
                  </span>
                  até
                  <span class="text-black font-weight-bold">
                    <!-- @vue-ignore -->
                    {{ formatDate(edition.final_submission_date) }}
                  </span>
                </p>
                <p class="text-grey-darken-2">
                  <span class="d-block">Data de Orientadores:</span>
                  <span class="text-black font-weight-bold">
                    <!-- @vue-ignore -->
                    {{ formatDate(edition.initial_advisor_date) }}
                  </span>
                  até
                  <span class="text-black font-weight-bold">
                    <!-- @vue-ignore -->
                    {{ formatDate(edition.final_advisor_date) }}
                  </span>
                </p>
                <p class="text-grey-darken-2">
                  <span class="d-block">Data de Avaliadores:</span>
                  <span class="text-black font-weight-bold">
                    <!-- @vue-ignore -->
                    {{ formatDate(edition.initial_evaluators_date) }}
                  </span>
                  até
                  <span class="text-black font-weight-bold">
                    <!-- @vue-ignore -->
                    {{ formatDate(edition.final_evaluators_date) }}
                  </span>
                </p>
              </v-col>
              <v-col>
                <!-- @vue-ignore -->
                <img alt="" class="w-100 rounded-xl" :src="edition.banner?.file || defaultBanner" />
              </v-col>
            </v-row>
          </div>
        </v-card>
      </template>
      <template v-else>
        <v-alert color="error" icon="mdi-alert" outlined rounded="lg" text="Não foi possível carregar a edição"
          variant="tonal" />
        <div class="d-flex justify-end">
          <v-btn class="mt-5 px-8" color="error" rounded="xl" to="/dashboard/editions" variant="flat">
            Voltar
          </v-btn>
        </div>
      </template>
    </v-container>
  </LayoutDashboard>
</template>
