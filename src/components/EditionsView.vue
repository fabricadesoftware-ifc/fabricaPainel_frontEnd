<template>
  <v-container
    class="d-flex flex-wrap mt-10 pa-0 ga-4 w-lg-75"
    fluid
    style="justify-content: space-around"
  >
    <v-card
      v-for="edition in editions"
      :key="edition.id"
      class="border-md border-white"
      height="260"
      :hover="true"
      rounded="xl"
      variant="outlined"
      width="320"
      @click="selectCard(edition.edition_name)"
    >
      <div class="h-100 d-flex flex-column justify-space-between pa-6">
        <p :class="[edition.edition, {'text-red': !edition.status}, {'text-info': edition.status}]">{{ edition.status ? 'Em Aberto' : 'Finalizado' }}</p>
        <h2
          class="text-primary font-weight-bold text-h5"
        >
          {{ edition.edition_name }}
        </h2>
        <p class="text-grey">
          {{ edition.text }}
        </p>
        <p class="mr-2 font-weight-medium">Clique Para Mais Informações</p>
      </div>
    </v-card>
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
</script>
