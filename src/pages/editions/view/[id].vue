<template>
  <LayoutDefault>
    <v-card class="border-md w-100" rounded="xl" variant="outlined">
      <div class="h-100 d-flex flex-column justify-space-between pa-14">
        <v-row>
          <v-col class="d-flex flex-column ga-4 justify-center" cols="6">
            <p class="text-blue">
              {{ edition.theme }}
              <span class="text-grey">
                - Carga Horária: {{ edition.workload }} horas</span>
            </p>
            <h2 class="text-primary font-weight-bold text-h4 pt-2">
              Edição {{ id }} - {{ edition.year }}
            </h2>
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
                {{ formatDate(edition.initial_advisor_acceptance) }}
              </span>
              até
              <span class="text-black font-weight-bold">
                {{ formatDate(edition.final_advisor_acceptance) }}
              </span>
            </p>
            <p class="text-grey-darken-2">
              <span class="d-block">Data de Avaliadores:</span>
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
            <!-- @vue-ignore -->
            <img alt="" class="w-100 rounded-xl" :src="edition.banner?.file || defaultBanner" />
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <p class="text-grey">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae quo
              maxime mollitia illo provident ex minima tenetur voluptate aliquam omnis,
              tempora nesciunt qui fugit, reprehenderit perferendis asperiores expedita
              natus eum. Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Voluptatibus hic corrupti, minus nisi quibusdam sint quia quasi perferendis
              assumenda culpa? Quo reiciendis illo dolore aperiam quisquam, facere velit
              animi architecto?
            </p>
          </v-col>
        </v-row>
      </div>
    </v-card>
  </LayoutDefault>
</template>
<script lang="ts" setup>
import { useRoute } from "vue-router";
import { onMounted, ref } from "vue";

const defaultBanner = require("@/assets/painel.png");

const router = useRoute();
const id = ref<any>();

const edition = {
  year: 2024,
  theme: "Technology and Innovation",
  edition_name: "Tech Innovators",
  initil_submission_date: "2024-01-15T09:00:00",
  final_submission_date: "2024-03-01T23:59:59",
  initial_advisor_acceptance: "2024-03-05T09:00:00",
  final_advisor_acceptance: "2024-04-15T23:59:59",
  initial_evaluators_date: "2024-04-20T09:00:00",
  final_evaluators_date: "2024-05-10T23:59:59",
  workload: 120,
  banner: null,
  logo: null,
};

const formatDate = computed(() => {
  return (dateTime: number | string | Date) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    };
    return new Date(dateTime).toLocaleDateString("pt-BR", options);
  };
});

onMounted(() => {
  // @ts-ignore
  id.value = router.params.id;
});
</script>
