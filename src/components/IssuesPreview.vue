<template>
  <section class="py-16 my-16 bg-grey-darken-4">
    <div class="py-16">
      <v-container class="w-lg-75" fluid>
        <TitleH1 text="Edições anteriores" />
      </v-container>

      <v-slide-group v-model="model" center-active class="py-8" show-arrows>
        <!-- <v-slide-group-item v-slot="{ isSelected, toggle, selectedClass }">
          <v-card class="mx-3 border-md"
            :class="['ma-4', selectedClass, { 'border-primary border-opacity-100': isSelected }, { 'border-white': !isSelected }]"
            height="300" rounded="xl" variant="outlined" width="320" @click="toggle">
            <v-icon v-if="isSelected" class="top-0 right-0 position-absolute pa-8" color="primary" icon="mdi-close"
              size="16" />
            <div class="h-100 d-flex flex-column justify-space-between pa-6">
              <p class="text-info">Em aberto</p>
              <h2 class="text-primary font-weight-bold text-h5" :class="[{ 'text-red': isSelected }]">Edição 2024</h2>
              <p class="text-grey">breve desrição sobre oq rolou sla (asdfasdf saf a asdfas asd s fasd asd asd a as as
                sad adasd asd a asd sda)....</p>
              <p v-if="!isSelected" class="mr-2 font-weight-medium">
                Clique para Ver mais
              </p>
              <p v-else class="mr-2 font-weight-medium">
                Mais informações a baixo
              </p>
            </div>
          </v-card>
        </v-slide-group-item> -->

        <v-slide-group-item v-for="edition in eventos" :key="edition.id" v-slot="{ isSelected, toggle, selectedClass }">
          <v-card class="mx-3 border-md"
            :class="['ma-4', selectedClass, { 'border-primary border-opacity-100': isSelected }, { 'border-white': !isSelected }]"
            height="300" rounded="xl" variant="outlined" width="320" @click="toggle">
            <v-icon v-if="isSelected" class="top-0 right-0 position-absolute pa-8" color="primary" icon="mdi-close"
              size="16" />
            <div class="h-100 d-flex flex-column justify-space-between pa-6">
              <p v-if="edition.year === ano_atual" class="text-info">Aberta</p>
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
        <v-sheet v-if="model != null" height="200">

          <div class="h-100 d-flex text-center">
            <v-row class="py-3">

              <v-col cols="12">
                <p class="text-primary font-weight-black text-h4">
                  {{ eventos[model].edition_name }}
                </p>
                <p class="text-blue">
                  {{ eventos[model].theme }}
                </p>
                <div class="text-grey text-body-1">Carga Horária: {{ eventos[model].workload }} horas</div>
                <div class="text-body-1 position-absolute top-0 right-0 pa-10">
                  {{ eventos[model].year }}
                </div>
              </v-col>

              <v-col class="pa-0">
                <p class="text-grey-darken-2">
                  <span class="d-block">Data de Submissão:</span>
                  <span class="text-black font-weight-bold">
                    {{ date.format(eventos[model].initil_submission_date, "keyboardDate") }}
                  </span>
                  até
                  <span class="text-black font-weight-bold">
                    {{ date.format(eventos[model].final_submission_date, "keyboardDate") }}
                  </span>
                </p>
              </v-col>

              <v-col class="pa-0">
                <p class="text-grey-darken-2">
                  <span class="d-block">Data de Orientação:</span>
                  <span class="text-black font-weight-bold">
                    {{ date.format(eventos[model].initial_advisor_date, "keyboardDate") }}
                  </span>
                  até
                  <span class="text-black font-weight-bold">
                    {{ date.format(eventos[model].final_advisor_date, "keyboardDate") }}
                  </span>
                </p>
              </v-col>

              <v-col class="pa-0">
                <p class="text-grey-darken-2">
                  <span class="d-block">Data de Avaliadores:</span>
                  <span class="text-black font-weight-bold">
                    {{ date.format(eventos[model].initial_evaluators_date, "keyboardDate") }}
                  </span>
                  até
                  <span class="text-black font-weight-bold">
                    {{ date.format(eventos[model].final_evaluators_date, "keyboardDate") }}
                  </span>
                </p>
              </v-col>

            </v-row>
          </div>
        </v-sheet>
      </v-expand-transition>

    </div>
  </section>
</template>

<script setup>
import { useDate } from 'vuetify'

const date = useDate()

const eventos = [
  {
    id: 1,
    year: 2024,
    theme: "Innovative Technologies",
    edition_name: "TechForward 2024",
    initil_submission_date: "2024-08-30",
    final_submission_date: "2024-08-30",
    initial_advisor_date: "2024-08-30",
    final_advisor_date: "2024-08-30",
    initial_evaluators_date: "2024-08-30",
    final_evaluators_date: "2024-08-30",
    banner: null,
    logo: null,
    workload: 20
  },
  {
    id: 2,
    year: 2023,
    theme: "Sustainable Development",
    edition_name: "GreenFuture 2023",
    initil_submission_date: "2026-09-30",
    final_submission_date: "2026-09-30",
    initial_advisor_date: "2025-09-30",
    final_advisor_date: "2025-09-30",
    initial_evaluators_date: "2025-09-30",
    final_evaluators_date: "2025-09-30",
    banner: null,
    logo: null,
    workload: 50
  }
]

const model = ref(null)
const ano_atual = new Date().getFullYear()

</script>
