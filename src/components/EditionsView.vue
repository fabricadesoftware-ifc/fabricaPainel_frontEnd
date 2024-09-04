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
                <v-chip filter text="Elevator" variant="outlined" />
                <v-chip filter text="Washer" variant="outlined" />
                <v-chip filter text="Fireplace" variant="outlined" />
                <v-chip filter text="Wheelchair " variant="outlined" />
                <v-chip filter text="Dogs ok" variant="outlined" />
                <v-chip filter text="Cats ok" variant="outlined" />
              </v-chip-group>
            </v-card-text>
            <v-card-text>
              <h2 class="text-h6 mb-2">Ano</h2>
              <v-chip-group v-model="neighborhoods" column multiple>
                <v-chip filter text="Snowy Rock Place" variant="outlined" />
                <v-chip filter text="Honeylane Circle" variant="outlined" />
                <v-chip filter text="Donna Drive" variant="outlined" />
                <v-chip filter text="Elaine Street" variant="outlined" />
                <v-chip filter text="Court Street" variant="outlined" />
                <v-chip filter text="Kennedy Park" variant="outlined" />
              </v-chip-group>
            </v-card-text>
          </v-card>
        </v-sheet>
      </v-col>
      <v-col>
        <v-sheet class="ml-auto mr-0 d-flex flex-wrap ga-4" style="justify-content: space-around">
          <v-card
            v-for="edition in editions"
            :key="edition.id"
            class="border-b border-white"
            height="260"
            :hover="true"
            rounded="xl"
            variant="outlined"
            width="320"
            @click="selectCard(edition.edition_name)"
          >
            <div class="h-100 d-flex flex-column justify-space-between pa-6">
              <p :class="[edition.edition,{ 'text-red': !edition.status },{ 'text-info': edition.status },]">
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
  defineProps({
    editions: {
      type: Array<any>,
      required: true,
    },
  })

  const router = useRouter()

  const selectCard = (name: any) => {
    router.push(`/editions/view/${name}`)
  }

  const amenities = ref<string[]>([])
  const neighborhoods = ref<string[]>([])
</script>
