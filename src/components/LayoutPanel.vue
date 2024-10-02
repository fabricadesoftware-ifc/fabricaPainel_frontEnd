<script lang="ts" setup>
  import { useRouter } from 'vue-router'
  import { uselayout } from '@/stores/app'
  import { useAuth } from '@/stores/auth'
  import { showMessage } from '@/utils/toastify'
  import { useScreen } from '@/composables/composables'

  const { isMobile } = useScreen()
  const router = useRouter()
  const layoutStore = uselayout()
  const authStore = useAuth()

  const logout = () => {
    showMessage('Deslogado com sucesso', 'success', 1500, 'top-right', 'auto', false)
    authStore.logout()
    router.push('/')
  }

  const login = () => {
    router.push('/auth/login')
  }

  onMounted(() => {
    layoutStore.getSettings()
  })
</script>
<template>
  <div class="min-h-screen">
    <v-app-bar v-if="!isMobile" class="py-4" flat>
      <v-container class="mx-auto d-flex align-center justify-center">
        <img alt="" class="pr-8 cursor-pointer" src="@/assets/logo.png" @click="$router.push('/')">
        <v-spacer />
        <v-btn
          v-if="!authStore.isLogged"
          color="primary"
          rounded="xl"
          variant="flat"
          @click="login"
        >
          <p>Entrar</p>
          <v-icon>mdi-login</v-icon>
        </v-btn>
        <v-btn
          v-else
          color="red"
          rounded="xl"
          variant="outlined"
          @click="logout"
        >
          <p>{{ authStore.user.name }}</p>
          <v-icon class="ml-2" color="red">mdi-logout</v-icon>
        </v-btn>
      </v-container>
    </v-app-bar>
    <v-app-bar v-else flat>
      <v-container>
        <v-row align="center" class="pa-6 mt-4" justify-space-around>
          <v-col cols="4" md="6">
            <img alt="" src="@/assets/logo.png">
          </v-col>
          <v-col class="d-flex justify-end" cols="8" md="6">
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
                class="ml-2"
                color="red"
                rounded="xl"
                variant="outlined"
                @click="logout"
              >
                <p>{{ authStore.user.name }}</p>
                <v-icon class="ml-2" color="red">mdi-logout</v-icon>
              </v-btn>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-app-bar>
    <v-main>
      <slot />
    </v-main>
    <footer class="pt-16 pb-2 px-6">
      <v-container>
        <v-row>
          <v-col class="d-flex justify-start align-center" cols="6" md="10">
            <a href="https://fabricadesoftware.ifc.edu.br/">
              <img class="h-8" src="@/assets/footer_logos.png">
            </a>
          </v-col>
          <v-col class="d-flex justify-end align-center" cols="6" md="2">
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
  </div>
</template>
