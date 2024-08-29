<template>
  <v-container class="d-flex justify-around flex-wrap mt-10 pa-2 ga-4" style="justify-content: space-between;">
    <v-card
      v-for="edition in editions"
      :key="edition.id"
      class="ma-0, border-md"
      color="primary"
      hover="true"
      width="340"
    >
      <p :class="['m-10', edition.status, {'text-red': !edition.status}, {'text-green': edition.status} ]">{{ edition.status ? 'Em Aberto' : 'Finalizado' }}</p>
      <v-card-text class="bg-surface-light pt-4">
        <v-card-title>{{ edition.description }}</v-card-title>
        <v-card-text>{{ edition.text }}</v-card-text>
        <v-card-actions>
          <v-btn color="primary" text="Saiba mais" :to="edition.to" />
        </v-card-actions>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script lang="ts" setup>
  defineProps({
    editions: Array,
  })
</script>
