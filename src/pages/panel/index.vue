<template>
  <LayoutPanel>
    <v-container class="pt-0 mt-0">
      <InformativeAlert />
      <div class="d-flex justify-end mt-2">
        <v-btn
          class="rounded-xl mb-6"
          color="info"
          text="Registrar-se nos temas transversais"
          to="/panel/registration-of-topics"
          variant="flat"
        />
      </div>
      <v-alert
        class="rounded-xl py-6"
        color="red"
        type="error"
        variant="tonal"
      >
        <p>
          Você ainda não tem trabalhos submetidos!
        </p>
        <p>
          A data de submissão é de {{ panelStore.currentEdition.initial_submission_date }} até {{ panelStore.currentEdition.final_submission_date }}
        </p>
      </v-alert>
      <div class="d-flex justify-end mt-2">
        <v-btn
          class="rounded-xl mb-6"
          color="error"
          text="Enviar um trabalho"
          to="/panel/registration-of-topics"
          variant="flat"
        />
      </div>
      <v-row>
        <v-col>
          <v-sheet class="ml-auto mr-0 mt-0" min-height="65vh" rounded="xl">
            <div class="h-100 d-flex flex-column justify-space-between px-4">
              <v-row>
                <v-col class="d-flex flex-column ga-4 justify-center" cols="6">
                  <p class="text-blue">
                    {{ panelStore.currentEdition.theme }} <span class="text-grey"> - Carga Horária: {{ panelStore.currentEdition.workload }} horas</span>
                  </p>
                  <h2 class="text-primary font-weight-bold text-h4 pt-2">
                    {{ panelStore.currentEdition.edition_name }} - {{ panelStore.currentEdition.year }}
                  </h2>
                  <p class="text-grey-darken-2">
                    <span class="d-block">Data de Registro de tema:</span>
                    <span class="text-black font-weight-bold">
                      {{ panelStore.currentEdition.initial_registration_theme_date }}
                    </span>
                    até
                    <span class="text-black font-weight-bold">
                      {{ panelStore.currentEdition.final_registration_theme_date }}
                    </span>
                  </p>
                  <p class="text-grey-darken-2">
                    <span class="d-block">Data de Submissão:</span>
                    <span class="text-black font-weight-bold">
                      {{ panelStore.currentEdition.initial_submission_date }}
                    </span>
                    até
                    <span class="text-black font-weight-bold">
                      {{ panelStore.currentEdition.final_submission_date }}
                    </span>
                  </p>
                  <p class="text-grey-darken-2">
                    <span class="d-block">Data de Orientação:</span>
                    <span class="text-black font-weight-bold">
                      {{ panelStore.currentEdition.initial_advisor_date }}
                    </span>
                    até
                    <span class="text-black font-weight-bold">
                      {{ panelStore.currentEdition.final_advisor_date }}
                    </span>
                  </p>
                  <p class="text-grey-darken-2">
                    <span class="d-block">Data de Registro de Avaliadores:</span>
                    <span class="text-black font-weight-bold">
                      {{ panelStore.currentEdition.initial_registration_evaluators_date }}
                    </span>
                    até
                    <span class="text-black font-weight-bold">
                      {{ panelStore.currentEdition.final_registration_evaluators_date }}
                    </span>
                  </p>
                  <p class="text-grey-darken-2">
                    <span class="d-block">Data de Avaliação</span>
                    <span class="text-black font-weight-bold">
                      {{ panelStore.currentEdition.initial_evaluators_date }}
                    </span>
                    até
                    <span class="text-black font-weight-bold">
                      {{ panelStore.currentEdition.final_evaluators_date }}
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
                  <h1 class="text-h5 py-4 font-weight-bold">
                    Registros de Submissões / Status do meu Trabalho
                  </h1>
                  <PaperAcceptanceTable />
                </v-col>
              </v-row>
            </div>
          </v-sheet>
        </v-col>
      </v-row>
    </v-container>
  </LayoutPanel>
</template>

<script lang="ts" setup>
  import { usePanel } from '@/stores/panel'

  const panelStore = usePanel()

  onMounted(() => {
    panelStore.getEdition()
  })
</script>
