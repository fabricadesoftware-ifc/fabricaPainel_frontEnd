<template>
  <v-container
    class="d-flex justify-around flex-wrap mt-10 pa-2 ga-4"
    style="justify-content: space-between"
  >
    <v-card
      v-for="edition in editions"
      :key="edition.id"
      v-slot="{ isSelected, toggle, selectedClass }"
      class="mx-3 border-md"
      :class="[
        'ma-4',
        selectedClass,
        { 'border-primary border-opacity-100': isSelected },
        { 'border-white': !isSelected },
      ]"
      height="300"
      rounded="xl"
      variant="outlined"
      width="320"
      @click="toggle"
    >
      <div class="h-100 d-flex flex-column justify-space-between pa-6">
        <p :class="[edition.edition, {'text-red': !edition.status}, {'text-info': edition.status}]">{{ edition.status ? 'Em Aberto' : 'Finalizado' }}</p>
        <h2
          class="text-primary font-weight-bold text-h5"
          :class="[{ 'text-red': isSelected }]"
        >
          {{ edition.name }}
        </h2>
        <p class="text-grey">
          {{ edition.text }}
        </p>
        <p v-if="!isSelected" class="mr-2 font-weight-medium">
          Clique para Ver mais
        </p>
        <p v-else class="mr-2 font-weight-medium">Mais informações a baixo</p>
      </div>
    </v-card>
  </v-container>
</template>

<script lang="ts" setup>
  defineProps({
    editions: Array,
  })

</script>
