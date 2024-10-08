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
      <p class="text-grey-darken-2 mt-6">
        <span class="">Divulgação do Regimento e das Orientações Gerais: </span>
        <span class="text-black font-weight-bold">
          ?? até
          ??
        </span>
      </p>
      <p class="text-grey-darken-2 mt-6">
        <span class="">Inscrição dos(as) docentes em dois temas transversais: </span>
        <span class="text-black font-weight-bold">
          {{ formatDate(editionStore.currentEdition?.initial_registration_theme_date) }} até
          {{ formatDate(editionStore.currentEdition?.final_registration_theme_date) }}
        </span>
      </p>
      <p class="text-grey-darken-2 mt-4">
        <span class="">Inscrição da equipe em uma área temática e cadastro do resumo preliminar: </span>
        <span class="text-black font-weight-bold">
          {{ formatDate(editionStore.currentEdition?.initial_submission_date) }} até
          {{ formatDate(editionStore.currentEdition?.final_submission_date) }}
        </span>
      </p>
      <p class="text-grey-darken-2 mt-4">
        <span class="">Sorteio do orientador(a) para a equipe inscrita na área temática: </span>
        <span class="text-black font-weight-bold">
          {{ formatDate(editionStore.currentEdition?.initial_advisor_date) }} até
          {{ formatDate(editionStore.currentEdition?.final_advisor_date) }}
        </span>
      </p>
      <p class="text-grey-darken-2 mt-4">
        <span class="">Submissão do resumo final para divulgação no PI 2024: </span>
        <span class="text-black font-weight-bold">
          {{ formatDate(editionStore.currentEdition?.initial_registration_evaluator_date) }} até
          {{ formatDate(editionStore.currentEdition?.final_registration_evaluator_date) }}
        </span>
      </p>
      <p class="text-grey-darken-2 mt-4">
        <span class="">Período de apresentação dos trabalhos: </span>
        <span class="text-black font-weight-bold">
          {{ formatDate(editionStore.currentEdition?.initial_evaluators_date) }} até
          {{ formatDate(editionStore.currentEdition?.final_evaluators_date) }}
        </span>
      </p>
      <p class="text-grey-darken-2 mt-4">
        <span class="">Divulgação das equipes inscritas, área temática, resumo, Orientador(a) e Colaborador(a): </span>
        <span class="text-black font-weight-bold">
          ?? até
          ??
        </span>
      </p>
    </v-col>
    <v-col v-if="!isMobile" cols="6">
      <img :alt="editionStore.currentEdition?.logo" class="w-100 rounded-xl" :src="editionStore.currentEdition?.banner?.file">
    </v-col>
  </v-row>
</template>
