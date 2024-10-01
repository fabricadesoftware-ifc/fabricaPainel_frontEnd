<script lang="ts" setup>
  import { onMounted, computed, ref } from 'vue'
  import { useRoute } from 'vue-router'
  import { useEdition } from '@/stores/edition'

  const { state, fetchEditions } = useEdition()

  const router = useRoute()
  const id = ref(null)

  const formatDate = computed(() => {
    return (dateTime: any) => {
      const options = { year: 'numeric', month: '2-digit', day: '2-digit' }
      return new Date(dateTime).toLocaleDateString('pt-BR', options)
    }
  })

  onMounted(() => {
    fetchEditions()
    id.value = router.params?.id
  })
</script>

<template>
  <LayoutDashboard>
    <v-container>
      <template v-if="state.editions && state.editions.length > 0">
        <v-card
          class="border-md w-100 mt-5"
          rounded="xl"
          variant="outlined"
          v-for="(edition, index) in state.editions"
          :key="index"
        >
          <div class="h-100 d-flex flex-column justify-space-between pa-10">
            <v-row>
              <v-col class="d-flex flex-column ga-4 justify-center" cols="6">
                <p class="text-blue">
                  {{ edition.theme }} <span class="text-grey"> - Carga Horária: {{ edition.workload }} horas</span>
                </p>
                <h2 class="text-primary font-weight-bold text-h4 pt-2">
                  Edição {{ edition.id }} - {{ edition.year }}
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
                <img alt="" class="w-100 rounded-xl" :src="edition.banner?.file || defaultBanner">
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
                <!-- <RecivedTable /> -->
              </v-col>
            </v-row>
          </div>
        </v-card>
      </template>

      <template v-else>
        <v-alert type="info">
          Não há edições disponíveis no momento.
        </v-alert>
      </template>
    </v-container>
  </LayoutDashboard>
</template>
