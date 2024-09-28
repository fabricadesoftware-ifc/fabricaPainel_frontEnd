<template>
  <v-container class="d-flex flex-wrap pa-0 w-lg-75" fluid>
    <v-row>
      <v-col cols="2">
        <v-sheet>
          <v-card variant="tonal">
            <v-card-text>
              <h2 class="text-h6 mb-2">Categorias</h2>
              <v-chip-group v-model="store.state.amenities" column multiple>
                <v-chip
                  v-for="category in store.state.category"
                  :key="category.id"
                  filter
                  :text="category.category"
                  variant="outlined"
                />
              </v-chip-group>
            </v-card-text>
            <v-card-text>
              <h2 class="text-h6 mb-2">Anos</h2>
              <range-component @update="updateYearRange" />
            </v-card-text>
          </v-card>
        </v-sheet>
      </v-col>
      <v-col>
        <v-sheet class="ml-auto mr-0 d-flex flex-wrap ga-2" style="justify-content: space-between">
          <v-card
            v-for="edition in filteredEditions"
            :key="edition.id"
            class="border-b border-white"
            height="15vw"
            :hover="true"
            rounded="xl"
            variant="outlined"
            width="20vw"
            @click="selectCard(edition.edition_name)"
          >
            <div class="h-100 d-flex flex-column justify-space-between pa-6">
              <p :class="[edition.status, { 'text-red': !edition.status }, { 'text-info': edition.status }]">
                {{ edition.status ? "Em Aberto" : "Finalizado" }}
              </p>
              <h2 class="text-primary font-weight-bold text-h5">
                {{ edition.edition_name }}
              </h2>
              <p class="text-grey">
                {{ edition.text }}
              </p>
              <p class="mr-2 font-weight-medium">
                Clique Para Mais Informações
              </p>
            </div>
          </v-card>
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>
  import { useRouter } from 'vue-router'
  import { usefilter } from '@/stores/editions'

  interface Edition {
    id: number
    year: string
    edition_name: string
    text: string
    to: string
    status: boolean
    category: Array<number>
  }
  const store = usefilter()
  const router = useRouter()

  const updateYearRange = (range: number[]) => {
    store.state.yearsRange = range
  }

  const filteredEditions = computed(() => {
    const [minYear, maxYear] = store.state.yearsRange

    // Filtra as edições pelo intervalo de anos
    const editionsInYearRange = store.state.editions.filter((edition: any) => {
      const editionYear = parseInt(edition.year, 10)
      return editionYear >= minYear && editionYear <= maxYear
    })

    // Se nenhuma categoria estiver selecionada, exibe todas as edições no intervalo de anos
    console.log(store.state)
    if (store.state.amenities.length === 0) {
      return editionsInYearRange
    }

    // Caso contrário, filtra pelas categorias selecionadas
    return editionsInYearRange.filter((edition: Edition) => {
      // Verifica se a edição tem alguma categoria que corresponde às selecionadas
      return edition.category.some((category: number) => store.state.amenities.includes(category))
    })
  })

  const selectCard = (name: any) => {
    router.push(`/editions/view/${name}`)
  }
</script>
