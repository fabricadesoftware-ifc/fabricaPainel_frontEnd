<template>
  <v-row>
    <v-col class="d-flex flex-column ga-4 justify-center" cols="6">
      <p class="text-blue">
        {{ props.edition.theme }} <span class="text-grey"> - Carga Horária: {{ props.edition.workload }} horas</span>
      </p>
      <h2 class="text-primary font-weight-bold text-h4 pt-2">
        {{ props.edition.edition_name }} - {{ props.edition.year }}
      </h2>
      <p class="text-grey-darken-2">
        <span class="d-block">Data de Registro de tema:</span>
        <span class="text-black font-weight-bold">
          {{ props.edition.initial_registration_theme_date }}
        </span>
        até
        <span class="text-black font-weight-bold">
          {{ props.edition.final_registration_theme_date }}
        </span>
      </p>
      <p class="text-grey-darken-2">
        <span class="d-block">Data de Submissão:</span>
        <span class="text-black font-weight-bold">
          {{ props.edition.initial_submission_date }}
        </span>
        até
        <span class="text-black font-weight-bold">
          {{ props.edition.final_submission_date }}
        </span>
      </p>
      <p class="text-grey-darken-2">
        <span class="d-block">Data de Orientação:</span>
        <span class="text-black font-weight-bold">
          {{ props.edition.initial_advisor_date }}
        </span>
        até
        <span class="text-black font-weight-bold">
          {{ props.edition.final_advisor_date }}
        </span>
      </p>
      <p class="text-grey-darken-2">
        <span class="d-block">Data de Registro de Avaliadores:</span>
        <span class="text-black font-weight-bold">
          {{ props.edition.initial_registration_evaluators_date }}
        </span>
        até
        <span class="text-black font-weight-bold">
          {{ props.edition.final_registration_evaluators_date }}
        </span>
      </p>
      <p class="text-grey-darken-2">
        <span class="d-block">Data de Avaliação</span>
        <span class="text-black font-weight-bold">
          {{ props.edition.initial_evaluators_date }}
        </span>
        até
        <span class="text-black font-weight-bold">
          {{ props.edition.final_evaluators_date }}
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
</template>

<script setup>
  const props = defineProps({
    edition: Object,
  })
</script>
