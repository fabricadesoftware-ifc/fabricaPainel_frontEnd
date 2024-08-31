<template>
  <v-app id="inspire">
    <v-app-bar class="py-4" flat>
      <v-container class="w-lg-75 d-flex align-center justify-center" fluid>
        <img alt="" class="pr-8" src="@/assets/logo.png">
        <v-btn
          v-for="link in layoutStore.navbar"
          :key="link.text"
          class="mr-1"
          :color="link.value == layoutStore.currentPage ? 'primary' : ''"
          rounded="xl"
          :text="link.text"
          :to="link.value"
          variant="text"
        />

        <v-spacer />
        <v-btn
          color="primary"
          rounded="xl"
          text="ENTRAR COMO ALUNO"
          variant="flat"
        />
      </v-container>
    </v-app-bar>
    <v-main>
      <slot />
    </v-main>
    <FooterComp />
  </v-app>
</template>

  <script setup>
  import { uselayout } from '@/stores/app'

  const layoutStore = uselayout()

  onMounted(() => {
    layoutStore.getSettings()
  })
  </script>
