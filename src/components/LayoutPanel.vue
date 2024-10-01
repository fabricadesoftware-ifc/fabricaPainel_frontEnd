<template>
  <div class="min-h-screen">
    <v-app-bar class="py-4" flat>
      <v-container class="mx-auto d-flex align-center justify-center">
        <img alt="" class="pr-8" src="@/assets/logo.png">
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
          color="primary"
          rounded="xl"
          variant="flat"
          @click="logout"
        >
          <p>{{ authStore.user.name }}</p>
          <v-icon color="red" size="small"> mdi-logout</v-icon>
        </v-btn>
      </v-container>
    </v-app-bar>
    <v-main>
      <slot />
    </v-main>
    <footer class="pt-16 pb-2">
      <v-container>
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
              variant="tonal"
            />
          </v-col>
        </v-row>
      </v-container>
    </footer>
  </div>
</template>

<script lang="ts" setup>
  import { onMounted } from 'vue'
  import { useRouter } from 'vue-router'
  import { uselayout } from '@/stores/app'
  import { useAuth } from '@/stores/auth'
  import { showMessage } from '@/utils/toastify'

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
