<template>
  <v-app-bar class="py-4" flat>
    <v-container class="mx-auto d-flex align-center justify-center">
      <img alt="" class="pr-8" src="@/assets/logo.png">
      <v-btn
        v-for="link in layoutStore.navbarDashboard"
        :key="link.text"
        class="mr-2"
        :color="link.value.split('/')[2] === layoutStore.currentPage.split('/')[2] ? 'primary' : ''"
        rounded="xl"
        :to="link.value"
        variant="text"
      >
        {{ link.text }}
      </v-btn>

      <v-spacer />
      <p
        class="px-2"
      >
        Nome de usuário
      </p>
      <v-btn
        class="rounded-xl justify-center"
        color="red"
        icon
        @click="logout()"
      >
        <v-icon size="small">
          mdi-logout
        </v-icon>
      </v-btn>
    </v-container>
  </v-app-bar>
  <v-main>
    <v-container>
      <v-row>
        <v-col cols="2">
          <v-sheet>
            <v-btn
              v-for="link in layoutStore.links"
              :key="link.text"
              :active="link.value === layoutStore.currentPage"
              block
              class="my-2 justify-center"
              :color="link.value === layoutStore.currentPage ? 'primary' : ''"
              rounded="xl"
              :to="link.value"
              variant="text"
            >
              {{ link.text }}
            </v-btn>
            <v-divider class="mt-3 mb-4" />
            <v-btn
              v-for="actionLink in layoutStore.actionLinks"
              :key="actionLink.text"
              block
              class="my-2 justify-center"
              color="primary"
              rounded="xl"
              :to="actionLink.value"
              variant="flat"
            >
              {{ actionLink.text }}
            </v-btn>
          </v-sheet>
        </v-col>
        <v-col cols="10">
          <v-sheet class="ml-auto mr-0" min-height="65vh" rounded="xl">
            <slot />
          </v-sheet>
        </v-col>
      </v-row>
      <footer class="pt-16 pb-2">
        <v-row>
          <v-col class="d-flex justify-start align-center" cols="10">
            <img class="h-8" src="@/assets/footer_logos.png">
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
      </footer>
    </v-container>
  </v-main>
</template>

  <script lang="ts" setup>
  import { useRouter } from 'vue-router'
  import { uselayout } from '@/stores/app'

  const router = useRouter()
  const layoutStore = uselayout()

  const logout = () => {
    router.push('/')
  }

  onMounted(() => {
    layoutStore.getSettings()
  })
  </script>
