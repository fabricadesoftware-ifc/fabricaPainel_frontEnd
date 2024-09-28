<script setup>
  import { useEdition } from '@/stores/edition'
  const editionStore = useEdition()

  onMounted(() => {
    editionStore.fetchCurrentEdition()
  })
</script>

<template>
  <v-row>
    <v-col class="d-flex flex-column ustify-center" cols="6">
      <h2 class="text-primary font-weight-bold text-h4">
        {{ editionStore.currentEdition?.edition_name }} - {{ editionStore.currentEdition?.year }}
        <div class="text-grey text-body-1 mt-2"> Carga Horária: {{ editionStore.currentEdition?.workload }} horas </div>
        <v-chip
          class="text-white"
          color="blue"
        >
          {{ editionStore.currentEdition?.theme }}
        </v-chip>
      </h2>
      <p class="text-grey-darken-2 mt-6">
        <span class="">Data de Registro de tema: </span>
        <span class="text-black font-weight-bold">
          {{ editionStore.currentEdition?.initial_registration_theme_date }} até
          {{ editionStore.currentEdition?.final_registration_theme_date }}
        </span>
      </p>
      <p class="text-grey-darken-2 mt-4">
        <span class="">Data de Submissão: </span>
        <span class="text-black font-weight-bold">
          {{ editionStore.currentEdition?.initial_submission_date }} até
          {{ editionStore.currentEdition?.final_submission_date }}
        </span>
      </p>
      <p class="text-grey-darken-2 mt-4">
        <span class="">Data de Orientação: </span>
        <span class="text-black font-weight-bold">
          {{ editionStore.currentEdition?.initial_advisor_date }} até
          {{ editionStore.currentEdition?.final_advisor_date }}
        </span>
      </p>
      <p class="text-grey-darken-2 mt-4">
        <span class="">Data de Registro de Avaliadores: </span>
        <span class="text-black font-weight-bold">
          {{ editionStore.currentEdition?.initial_registration_evaluator_date }} até
          {{ editionStore.currentEdition?.final_registration_evaluator_date }}
        </span>
      </p>
      <p class="text-grey-darken-2 mt-4">
        <span class="">Data de Avaliação: </span>
        <span class="text-black font-weight-bold">
          {{ editionStore.currentEdition?.initial_evaluators_date }} até
          {{ editionStore.currentEdition?.final_evaluators_date }}
        </span>
      </p>
    </v-col>
    <v-col>
      <img alt="" class="w-100 rounded-xl" src="https://th.bing.com/th/id/OIP.MQJrIQeghQLdcs1uFBZHzwHaEp?rs=1&pid=ImgDetMain">
    </v-col>
  </v-row>
</template>
