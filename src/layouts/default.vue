<template>
  <v-app id="inspire">
    <v-app-bar class="py-4" flat>
      <v-container class="mx-auto d-flex align-center justify-center">
        <img alt="" class="pr-8" src="@/assets/logo.png">
        <v-btn
          v-for="link in layoutStore.navbar"
          :key="link.text"
          class="mr-2"
          :color="link.value == '/' ? 'primary' : ''"
          rounded="xl"
          :text="link.text"
          :to="link.value"
          variant="text"
        />

        <v-spacer />
        <v-btn
          class="mr-2"
          rounded="xl"
          text="Nome de usuário"
          variant="text"
        />
        <v-avatar
          image="@/assets/user.jpg"
          size="48"
        />

      </v-container>
    </v-app-bar>
    <v-main class="mt-7">
      <v-container>
        <v-row>
          <v-col cols="2">
            <v-sheet>
              <v-btn
                v-for="link in layoutStore.links"
                :key="link.text"
                block
                class="my-2 justify-start"
                rounded="xl"
                :text="link.text"
                :to="link.value"
                variant="plain"
              />
              <v-divider class="mt-3 mb-4" />
              <v-btn
                v-for="actionLink in layoutStore.actionLinks"
                :key="actionLink.text"
                block
                class="my-2 justify-start"
                color="primary"
                rounded="xl"
                :text="actionLink.text"
                :to="actionLink.value"
                variant="flat"
              />
            </v-sheet>
          </v-col>

          <v-col>
            <v-sheet
              min-height="70vh"
              rounded="xl"
            >
              <router-view />
            </v-sheet>
          </v-col>
        </v-row>
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
