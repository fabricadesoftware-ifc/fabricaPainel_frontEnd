<template>
  <LayoutDashboard>
    <div class="d-flex flex-row flex-wrap ga-4">
      <v-card
        v-for="edition in editions"
        :key="edition"
        class="border-md w-100"
        rounded="xl"
        variant="outlined"
        @click="selectCard(edition.edition_name)"
      >
        <div class="h-100 d-flex flex-column justify-space-between pa-10">
          <v-row>
            <v-col cols="12">
              <p class="text-blue">
                {{ edition.theme }}
              </p>
              <h2 class="text-primary font-weight-bold text-h5">
                {{ edition.edition_name }}
                <div class="text-grey text-body-1">Carga Horária: {{ edition.workload }} horas</div>
                <div class="text-body-1 position-absolute top-0 right-0 pa-10">
                  {{ edition.year }}
                </div>
              </h2>
            </v-col>
            <v-col>
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
            </v-col>
            <v-col>
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
            </v-col>
            <v-col>
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
          </v-row>
          <v-row>
            <v-col>
              <p class="text-grey">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae quo maxime mollitia illo provident ex minima tenetur voluptate aliquam omnis...
              </p>
            </v-col>
          </v-row>
        </div>
      </v-card>
    </div>
  </LayoutDashboard>
</template>

<script lang="ts" setup>
  import { useRouter } from 'vue-router'

  const router = useRouter()

  const selectCard = name => {
    router.push(`/dashboard/editions/view/${name}`)
  }

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
  const formatDate = computed(() => {
    return dateTime => {
      const options = { year: 'numeric', month: '2-digit', day: '2-digit' }
      return new Date(dateTime).toLocaleDateString('pt-BR', options)
    }
  })
</script>
