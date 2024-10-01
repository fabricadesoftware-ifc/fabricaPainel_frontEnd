<template>
  <v-app id="inspire">
    <v-app-bar v-if="!isMobile" class="py-4" flat>
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
          v-if="!authStore.isLogged"
          class="d-flex"
          color="primary"
          rounded="xl"
          variant="flat"
          @click="login"
        >
          <p>ENTRAR</p>
          <v-icon>mdi-login</v-icon>
        </v-btn>

        <div v-else class="d-flex ga-2">
          <v-btn
            v-if="authStore.user.user_type == 'STUDENT'"
            color="primary"
            rounded="xl"
            to="/auth/my-group"
            variant="text"
          >
            <p>Meu Grupo</p>
          </v-btn>

          <v-btn color="primary" rounded="xl" variant="flat" @click="logout">
            <p>{{ authStore.user.name }}</p>
            <v-icon color="red">mdi-logout</v-icon>
          </v-btn>
        </div>
      </v-container>
    </v-app-bar>
    <v-app-bar v-else flat>
      <v-container>
        <v-row align="center" justify-space-around>
          <v-col>
            <img alt="" src="@/assets/logo.png">
          </v-col>
          <v-space />
          <v-col class="d-flex justify-end">
            <div><v-menu activator="parent">
              <template #activator="{ on }">
                <v-btn
                  v-icon
                  color="primary"
                  rounded="xl"
                  variant="flat"
                  v-on="on"
                >
                  <v-icon>mdi-menu</v-icon>
                </v-btn>
              </template>
              <v-list>
                <v-list-item
                  v-for="link in layoutStore.navbar"
                  :key="link.text"
                  :color="link.value == layoutStore.currentPage ? 'primary' : ''"
                  @click="router.push(link.value)"
                >
                  <v-list-item-title>{{ link.text }}</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu></div>
            <div>
              <v-btn
                v-if="!authStore.isLogged"
                class="d-flex ml-4"
                color="primary"
                rounded="xl"
                variant="flat"
                @click="login"
              >
                <p>ENTRAR</p>
                <v-icon>mdi-login</v-icon>
              </v-btn>

              <v-btn
                v-else
                class="d-flex ml-4"
                color="primary"
                rounded="xl"
                variant="flat"
                @click="logout"
              >
                <p>{{ authStore.user.name }}</p>
                <v-icon color="red">mdi-logout</v-icon>
              </v-btn></div>

          </v-col>
        </v-row>
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
  import { onMounted } from 'vue'
  import { useRouter } from 'vue-router'
  import { useAuth } from '@/stores/auth'
  import { showMessage } from '@/utils/toastify'
  import { useScreen } from '@/composables/composables'

  const { isMobile } = useScreen()
  const router = useRouter()
  const layoutStore = uselayout()
  const authStore = useAuth()

  const login = () => {
    router.push('/auth/login')
  }

  const logout = () => {
    authStore.logout()
    showMessage(
      'Deslogado com sucesso',
      'success',
      1500,
      'top-right',
      'auto',
      false
    )
    router.push('/')
  }

  onMounted(() => {
    layoutStore.getSettings()
  })
  </script>
