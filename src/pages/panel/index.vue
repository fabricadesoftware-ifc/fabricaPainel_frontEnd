<template>
  <v-app-bar class="py-4" flat>
    <v-container class="mx-auto d-flex align-center justify-center">
      <img alt="" class="pr-8" src="@/assets/logo.png">
      <v-spacer />
      <p
        class="px-2"
      >
        Nome de usuário
      </p>
      <v-btn
        class="rounded-xl justify-center"
        color="red"
        icon
        @click="logout()"
      >
        <v-icon size="small">
          mdi-logout
        </v-icon>
      </v-btn>
    </v-container>
  </v-app-bar>
  <v-main>
    <v-container>
      <v-row>
        <v-col>
          <v-sheet class="ml-auto mr-0" min-height="65vh" rounded="xl">
            <v-card
              class="border-md w-100"
              rounded="xl"
              variant="outlined"
            >
              <div class="h-100 d-flex flex-column justify-space-between pa-14">
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
                  <v-btn
                    block
                    class="rounded-xl mt-6"
                    color="primary"
                    text="Registrar-se nos temas transversais"
                    to="/panel/registration-of-topics"
                    variant="flat"
                  />
                  <v-btn
                    block
                    class="rounded-xl mt-6"
                    color="primary"
                    text="Enviar um trabalho"
                    to="/panel/work-submission"
                    variant="flat"
                  />
                  <v-btn
                    block
                    class="rounded-xl mt-6"
                    color="primary"
                    text="painel de aprovação"
                    to="/panel/evaluation"
                    variant="flat"
                  />
                  <v-btn
                    block
                    class="rounded-xl mt-6"
                    color="primary"
                    text="evaluators"
                    to="/panel/evaluators"
                    variant="flat"
                  />
                </v-row>
              </div>
            </v-card>
          </v-sheet>
        </v-col>
      </v-row>
      <footer class="pt-16 pb-2">
        <v-row>
          <v-col class="d-flex justify-start align-center" cols="10">
            <img class="h-8" src="@/assets/footer_logos.png">
          </v-col>
          <v-col class="d-flex justify-end align-center">
            <v-btn
              class="border border-primary"
              color="info"
              icon="mdi-help"
              rounded="xl"
              size="small"
              variant="tonal"
            />
          </v-col>
        </v-row>
      </footer>
    </v-container>
  </v-main>
</template>

    <script lang="ts" setup>

  import { usePanel } from '@/stores/panel'
  import { useRouter } from 'vue-router'

  const panelStore = usePanel()
  const router = useRouter()

  const logout = () => {
    router.push('/')
  }

  onMounted(() => {
    panelStore.getEdition()
  })
</script>
