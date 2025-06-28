<script lang="ts" setup>
// @ts-ignore
import { computed, onMounted } from "vue";
// @ts-ignore
import { useRouter } from "vue-router";
import { useEdition } from "@/stores/edition";

const { state, fetchEditions } = useEdition();
const router = useRouter();

// Corrigido para usar o 'id' em vez de 'edition_name'
const selectCard = (id: number) => {
  router.push(`/panel/editions/view/${id}`);
};

const formatDate = computed(() => {
  return (dateTime: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    };
    return new Date(dateTime).toLocaleDateString("pt-BR", options);
  };
});

onMounted(() => {
  fetchEditions();
});
</script>

<template>
  <LayoutDashboard>
    <div class="d-flex flex-row flex-wrap ga-4">
      <v-card v-for="edition in state.editions" :key="edition.id" class="border-md w-100" rounded="xl"
        variant="outlined" @click="selectCard(Number(edition.id))">
        <div class="h-100 d-flex flex-column justify-space-between pa-10">
          <v-row>
            <v-col cols="12">
              <p class="text-blue">
                {{ edition.theme }}
              </p>
              <h2 class="text-primary font-weight-bold text-h5">
                {{ edition.edition_name }}
                <div class="text-grey text-body-1">
                  Carga Horária: {{ edition.workload }} horas
                </div>
                <div class="text-body-1 position-absolute top-0 right-0 pa-10">
                  {{ edition.year }}
                </div>
              </h2>
            </v-col>
            <v-col>
              <p class="text-grey-darken-2">
                <span class="d-block">Data de Submissão:</span>
                <span class="text-black font-weight-bold">
                  {{ formatDate(edition.initial_submission_date || 'Não informado') }}
                </span>
                até
                <span class="text-black font-weight-bold">
                  {{ formatDate(edition.final_submission_date || 'Não informado') }}
                </span>
              </p>
            </v-col>
            <v-col>
              <p class="text-grey-darken-2">
                <span class="d-block">Data de Orientação:</span>
                <span class="text-black font-weight-bold">
                  {{ formatDate(edition.initial_advisor_acceptance || 'Não informado') }}
                </span>
                até
                <span class="text-black font-weight-bold">
                  {{ formatDate(edition.final_advisor_acceptance || 'Não informado') }}
                </span>
              </p>
            </v-col>
            <v-col>
              <p class="text-grey-darken-2">
                <span class="d-block">Data de Avaliadores:</span>
                <span class="text-black font-weight-bold">
                  {{ formatDate(edition.initial_evaluators_date || 'Não informado') }}
                </span>
                até
                <span class="text-black font-weight-bold">
                  {{ formatDate(edition.final_evaluators_date || 'Não informado') }}
                </span>
              </p>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <p class="text-grey">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae quo
                maxime mollitia illo provident ex minima tenetur voluptate aliquam
                omnis...
              </p>
            </v-col>
          </v-row>
        </div>
      </v-card>
    </div>
  </LayoutDashboard>
</template>
