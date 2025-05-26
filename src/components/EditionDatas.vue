<script setup>
  import { useEdition } from '@/stores/edition'
  import { useScreen } from '@/composables/composables'

  const editionStore = useEdition()
  const { isMobile } = useScreen()

  const formatDate = date => {
    return new Date(date).toLocaleDateString('pt-BR')
  }

  onMounted(() => {
    editionStore.fetchCurrentEdition()
  })
</script>

<template>
  <v-row>
    <v-col class="d-flex flex-column ustify-center" cols="12" md="12">
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
      <p class="text-grey-darken-2 mt-4">
        <span class="">Data do evento: </span>
        <span class="text-black font-weight-bold">
          {{ formatDate(editionStore.currentEdition?.event_date) }} até
          {{ formatDate(editionStore.currentEdition?.final_event_date) }}
        </span>
      </p>
      <p class="text-grey-darken-2 mt-4">
        <span class="">Data de submissão: </span>
        <span class="text-black font-weight-bold">
          {{ formatDate(editionStore.currentEdition?.initial_submission_date) }} até
          {{ formatDate(editionStore.currentEdition?.final_submission_date) }}
        </span>
      </p>
      <p class="text-grey-darken-2 mt-4">
        <span class="">Data dos orientadores: </span>
        <span class="text-black font-weight-bold">
          {{ formatDate(editionStore.currentEdition?.initial_advisor_acceptance) }} até
          {{ formatDate(editionStore.currentEdition?.final_advisor_acceptance) }}
        </span>
      </p>
      <p class="text-grey-darken-2 mt-4">
        <span class="">Data dos avaliadores: </span>
        <span class="text-black font-weight-bold">
          {{ formatDate(editionStore.currentEdition?.initial_evaluators_date) }} até
          {{ formatDate(editionStore.currentEdition?.final_evaluators_date) }}
        </span>
      </p>
      <p class="text-grey-darken-2 mt-4">
        <span class="">Período de apresentação dos trabalhos: </span>
        <span class="text-black font-weight-bold">
          07/11/2024 até
          08/11/2024
        </span>
      </p>
    </v-col>
    <!-- <v-col v-if="!isMobile" cols="6">
      <img :alt="editionStore.currentEdition?.logo" class="w-100 rounded-xl" :src="editionStore.currentEdition?.banner?.file">
    </v-col> smt lopes -->
  </v-row>
</template>
