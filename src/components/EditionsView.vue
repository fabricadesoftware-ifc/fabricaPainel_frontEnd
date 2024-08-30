<template>
  <v-container
    class="d-flex justify-around flex-wrap mt-10 pa-2 ga-4"
    style="justify-content: space-between"
  >
    <v-card
      v-for="edition in editions"
      :key="edition.id"
      class="mx-3 border-md, border-white"
      height="260"
      :hover="true"
      rounded="xl"
      variant="outlined"
      width="320"
    >
      <div class="h-100 d-flex flex-column justify-space-between pa-6">
        <p :class="[edition.edition, {'text-red': !edition.status}, {'text-info': edition.status}]">{{ edition.status ? 'Em Aberto' : 'Finalizado' }}</p>
        <h2
          class="text-primary font-weight-bold text-h5"
        >
          {{ edition.name }}
        </h2>
        <p class="text-grey">
          {{ edition.text }}
        </p>
        <p class="mr-2 font-weight-medium">Mais informações a baixo</p>
      </div>
    </v-card>
  </v-container>
</template>

<script lang="ts" setup>
  defineProps({
    editions: {
      type: Array<any>,
      required: true,
    },
  })
</script>
