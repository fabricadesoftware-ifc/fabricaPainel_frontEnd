<template>
  <v-container class="d-flex flex-wrap pa-0 w-lg-75" fluid>
    <v-row>
      <v-col cols="2">
        <v-sheet>
          <v-card>
            <v-toolbar color="primary">
              <v-toolbar-title>Filters</v-toolbar-title>
            </v-toolbar>

            <v-card-text>
              <h2 class="text-h6 mb-2">Categorias</h2>
              <v-chip-group v-model="amenities" column multiple>
                <v-chip
                  v-for="category in props.categoria"
                  :key="category.id"
                  filter
                  :text="category.category"
                  variant="outlined"
                />
              </v-chip-group>
            </v-card-text>
            <v-card-text>
              <h2 class="text-h6 mb-2">Ano</h2>
              <range-component :ano="anos" />
            </v-card-text>
          </v-card>
        </v-sheet>
      </v-col>
      <v-col>
        <v-sheet class="ml-auto mr-0 d-flex flex-wrap ga-2" style="justify-content: space-between">
          <v-card
            v-for="edition in props.editions"
            :key="edition.id"
            class="border-b border-white"
            height="260"
            :hover="true"
            rounded="xl"
            variant="outlined"
            width="300"
            @click="selectCard(edition.edition_name)"
          >
            <div class="h-100 d-flex flex-column justify-space-between pa-6">
              <p :class="[edition.edition, { 'text-red': !edition.status }, { 'text-info': edition.status }]">
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
  {{ props.ano }}
</template>

<script lang="ts" setup>
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'

  const props: any = defineProps({
    editions: {
      type: Array,
      required: true,
    },
    categoria: {
      type: Array,
      required: true,
    },
    ano: {
      type: Array,
      required: true,
    },
  })

  interface Anos {
    years: Array<Number>;
    max: Number;
    min: Number;
    seasons: Object;
  }

  // Calculando os valores max, min e seasons para passar para o componente de range
  const anos: Anos = {
    years: props.ano,
    max: Math.max(...props.ano.map((a: { year: any; }) => a.year)),
    min: Math.min(...props.ano.map((a: { year: any; }) => a.year)),
    seasons: props.ano.reduce((acc: { [x: string]: any; }, a: { year: string | number; }) => {
      acc[a.year] = a.year.toString()
      return acc
    }, {}),
  }

  const router = useRouter()

  const selectCard = (name: any) => {
    router.push(`/editions/view/${name}`)
  }

  const amenities = ref<string[]>([])
</script>
