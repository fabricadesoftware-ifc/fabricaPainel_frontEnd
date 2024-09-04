<template>
  <LayoutDashboard>
    <v-card
      class="border-md w-100"
      rounded="xl"
      variant="outlined"
    >
      <div class="h-100 d-flex flex-column justify-space-between pa-14">
        <v-row>
          <v-col class="d-flex flex-column ga-4 justify-center" cols="6">
            <p class="text-blue">
              {{ edition.theme }} <span class="text-grey"> - Carga Horária: {{ edition.workload }} horas</span>
            </p>
            <h2 class="text-primary font-weight-bold text-h4 pt-2">
              {{ edition.edition_name }} - {{ edition.year }}
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
                {{ formatDate(edition.initial_advisor_date) }}
              </span>
              até
              <span class="text-black font-weight-bold">
                {{ formatDate(edition.final_advisor_date) }}
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
            <img alt="" class="w-100 rounded-xl" src="https://th.bing.com/th/id/OIP.MQJrIQeghQLdcs1uFBZHzwHaEp?rs=1&pid=ImgDetMain">
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <p class="text-grey">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae quo maxime mollitia illo provident ex minima tenetur voluptate aliquam omnis, tempora nesciunt qui fugit, reprehenderit perferendis asperiores expedita natus eum. Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus hic corrupti, minus nisi quibusdam sint quia quasi perferendis assumenda culpa? Quo reiciendis illo dolore aperiam quisquam, facere velit animi architecto?
            </p>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <h1 class="text-h5 py-4">
              Registros de Submissões
            </h1>
            <RecivedTable />
          </v-col>
        </v-row>
        <v-row>
          <v-btn
            block
            class="rounded-xl mt-6"
            color="primary"
            text="Editar Informações"
            variant="flat"
          />
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
    return dateTime => {
      const options = { year: 'numeric', month: '2-digit', day: '2-digit' }
      return new Date(dateTime).toLocaleDateString('pt-BR', options)
    }
  })

</script>
