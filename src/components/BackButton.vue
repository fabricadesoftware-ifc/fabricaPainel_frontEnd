<template>
  <v-btn icon @click="goBack">
    <v-icon>mdi-arrow-left</v-icon>
  </v-btn>
</template>

<script>
  export default {
    methods: {
      goBack () {
        // Lógica para voltar para a página anterior
        // Por exemplo:
        this.$router.go(-1)
      },
    },
  }
</script>
