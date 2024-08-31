<template>
  <section class="py-16 my-16 bg-grey-darken-4">
    <div class="py-16">
      <v-container class="w-lg-75" fluid>
        <TitleH1 text="Edições anteriores" />
      </v-container>

      <v-slide-group v-model="model" center-active class="py-8" show-arrows>
        <v-slide-group-item v-for="edition in editions" :key="edition.id" v-slot="{ isSelected, toggle, selectedClass }">
          <v-card
            class="mx-3 border-md"
            :class="['ma-4', selectedClass, { 'border-primary border-opacity-100': isSelected }, { 'border-white': !isSelected }]"
            height="300"
            rounded="xl"
            variant="outlined"
            width="320"
            @click="toggle"
          >
            <v-icon
              v-if="isSelected"
              class="top-0 right-0 position-absolute pa-8"
              color="primary"
              icon="mdi-close"
              size="16"
            />
            <div class="h-100 d-flex flex-column justify-space-between pa-6">
              <p v-if="edition.open" class="text-info">Aberta</p>
              <p v-else class="text-red">Finalizada</p>

              <h2 class="text-primary font-weight-bold text-h5" :class="[{ 'text-red': isSelected }]">
                Edição {{ edition.year }}
              </h2>

              <p class="text-grey">
                O tema desta Edição é "{{ edition.theme }}".
                A data inicial de submissões é {{ date.format(edition.initil_submission_date, "keyboardDate") }} e a
                data final é {{ date.format(edition.final_submission_date, "keyboardDate") }}.
              </p>
              <p v-if="!isSelected" class="mr-2 font-weight-medium">
                Clique para ver mais
              </p>
              <p v-else class="mr-2 font-weight-medium">
                Mais informações a baixo
              </p>
            </div>
          </v-card>
        </v-slide-group-item>
      </v-slide-group>

      <v-expand-transition>
        <v-sheet v-if="model != null" class="bg-grey-darken-4">
          <v-container class="w-lg-75 pb-0" fluid>
            <p class="text-blue pb-2">
              {{ editions[model].theme }}
            </p>
            <TitleH1 color="text-primary" :text="editions[model].edition_name" />
            <v-row>
              <v-col cols="12" md="6">
                <img alt="Banner da Edição" class="w-100 rounded-xl" :src="editions[model].banner">
              </v-col>
              <v-col class="text-grey text-start" cols="12" md="6">
                <p class="pb-4 text-white">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magnam ipsum culpa fugiat itaque tempore maiores labore placeat cumque enim! Maxime expedita cupiditate nisi, minima laudantium commodi tenetur recusandae saepe eveniet.
                </p>
                <p class="pb-4 text-h6 ">
                  Carga Horária: <span class="text-white font-weight-bold"> {{ editions[model].workload }} horas</span>
                </p>
                <p>
                  Data de Submissão:
                  <span class="text-white font-weight-bold">
                    {{ date.format(editions[model].initil_submission_date, "keyboardDate") }}
                  </span>
                  até
                  <span class="text-white font-weight-bold">
                    {{ date.format(editions[model].final_submission_date, "keyboardDate") }}
                  </span>
                </p>
                <p class="py-2">
                  Data de Submissão:
                  <span class="text-white font-weight-bold">
                    {{ date.format(editions[model].initil_advisor_date, "keyboardDate") }}
                  </span>
                  até
                  <span class="text-white font-weight-bold">
                    {{ date.format(editions[model].final_advisor_date, "keyboardDate") }}
                  </span>
                </p>
                <p>
                  Data de Submissão:
                  <span class="text-white font-weight-bold">
                    {{ date.format(editions[model].initil_evaluators_date, "keyboardDate") }}
                  </span>
                  até
                  <span class="text-white font-weight-bold">
                    {{ date.format(editions[model].final_evaluators_date, "keyboardDate") }}
                  </span>
                </p>
              </v-col>
              <v-col class="pt-8">
                <v-btn
                  append-icon="mdi-arrow-right-thick"
                  block
                  class=""
                  color="primary"
                  text
                >
                  <span v-if="editions[model].open">
                    Inscrever-se
                  </span>
                  <span v-else>
                    Ir para página da Edição
                  </span>
                </v-btn>
              </v-col>
            </v-row>
          </v-container>
        </v-sheet>
      </v-expand-transition>

    </div>
  </section>
</template>

<script setup>
  import { useDate } from 'vuetify'

  const date = useDate()
  const model = ref(null)

  const editions = [
    {
      id: 1,
      year: 2024,
      theme: 'Internet of Things',
      edition_name: 'IoT Hipo 2024',
      initil_submission_date: '2024-06-30',
      final_submission_date: '2024-07-31',
      initial_advisor_date: '2024-08-01',
      final_advisor_date: '2024-08-15',
      initial_evaluators_date: '2024-08-16',
      final_evaluators_date: '2024-08-31',
      banner: 'https://www.ahnegao.com.br/wp-content/uploads/2017/03/img-43-1.jpg',
      logo: null,
      workload: 60,
      open: true,
    },
    {
      id: 2,
      year: 2023,
      theme: 'Blockchain Technology',
      edition_name: 'BlockSummit 2023',
      initil_submission_date: '2023-08-30',
      final_submission_date: '2023-09-30',
      initial_advisor_date: '2023-10-01',
      final_advisor_date: '2023-10-15',
      initial_evaluators_date: '2023-10-16',
      final_evaluators_date: '2023-10-31',
      banner: 'https://th.bing.com/th/id/OIP.kVeIBkpMGMy9XfjgomYhoAHaDp?rs=1&pid=ImgDetMain',
      logo: null,
      workload: 50,
      open: false,
    },
    {
      id: 3,
      year: 2022,
      theme: 'Artificial Intelligence',
      edition_name: 'AI Summit 2022',
      initil_submission_date: '2022-10-30',
      final_submission_date: '2022-11-30',
      initial_advisor_date: '2022-12-01',
      final_advisor_date: '2022-12-15',
      initial_evaluators_date: '2022-12-16',
      final_evaluators_date: '2022-12-31',
      banner: 'https://i.ytimg.com/vi/g2fEjY8LDmM/maxresdefault.jpg',
      logo: null,
      workload: 40,
      open: false,
    },

    {
      id: 4,
      year: 2021,
      theme: 'Quantum Computing',
      edition_name: 'Quantum Summit 2021',
      initil_submission_date: '2025-04-30',
      final_submission_date: '2025-05-31',
      initial_advisor_date: '2025-06-01',
      final_advisor_date: '2025-06-15',
      initial_evaluators_date: '2025-06-16',
      final_evaluators_date: '2025-06-30',
      banner: 'https://th.bing.com/th/id/OIP.adCUFGzeIuMvDBv8FfCxnwHaEH?rs=1&pid=ImgDetMain',
      logo: null,
      workload: 70,
      open: false,
    },
    {
      id: 5,
      year: 2020,
      theme: 'Cybersecurity',
      edition_name: 'CyberSec Summit 2020',
      initil_submission_date: '2026-02-28',
      final_submission_date: '2026-03-31',
      initial_advisor_date: '2026-04-01',
      final_advisor_date: '2026-04-15',
      initial_evaluators_date: '2026-04-16',
      final_evaluators_date: '2026-04-30',
      banner: 'https://th.bing.com/th/id/OIP.bai5nGIgbFN6O5UUPcnYiQHaD5?w=650&h=342&rs=1&pid=ImgDetMain',
      logo: null,
      workload: 80,
      open: false,
    },
    {
      id: 6,
      year: 2019,
      theme: 'Big Data',
      edition_name: 'BigData Summit 2019',
      initil_submission_date: '2027-12-30',
      final_submission_date: '2028-01-31',
      initial_advisor_date: '2028-02-01',
      final_advisor_date: '2028-02-15',
      initial_evaluators_date: '2028-02-16',
      final_evaluators_date: '2028-02-29',
      banner: 'https://i.gruposwhats.app/64c95f6e63da4.jpg',
      logo: null,
      workload: 90,
      open: false,
    },
  ]
</script>
