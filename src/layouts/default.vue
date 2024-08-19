<template>
  <v-app id="inspire">
    <v-app-bar class="py-4" flat>
      <v-container class="mx-auto d-flex align-center justify-center">
        <img alt="" class="pr-8" src="@/assets/logo.png">
        <v-btn
          v-for="link in layoutStore.navbar"
          :key="link.text"
          class="mr-1"
          :color="link.value == '/' ? 'primary' : ''"
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
      <v-container>
        <router-view />
      </v-container>
    </v-main>
    <footer>
      <v-container class="py-4">
        <v-row no-gutters>
          <v-col class="d-flex justify-start align-center" cols="10">
            <img alt="" height="64px" src="@/assets/Logo_IFC_extendida_araquari.png">
            <img alt="" class="pt-3 pl-3" height="64px" src="@/assets/logo_FABRICA.png">
          </v-col>
          <v-col class="d-flex justify-end align-center">
            <v-btn
              class="border border-primary"
              color="info"
              icon="mdi-help"
              rounded="xl"
              size="small"
              to="/"
              variant="tonal"
            />
          </v-col>
        </v-row>
      </v-container>
    </footer>
  </v-app>
</template>

<script setup>
  import { uselayout } from '@/stores/app'

  const layoutStore = uselayout()

  onMounted(() => {
    layoutStore.getSettings()
  })
</script>
