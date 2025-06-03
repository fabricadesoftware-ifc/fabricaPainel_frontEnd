<script setup>
  import { ref } from 'vue'
  import { showMessage } from '@/utils/toastify'
  import { useRouter } from 'vue-router'
  import { useAuth } from '@/stores/auth'

  const router = useRouter()
  const authStore = useAuth()
  const loading = ref(false)

  const email = ref('')
  const password = ref('')

  const login = async () => {
    try {
      loading.value = true
      await authStore.login(email.value, password.value)
      loading.value = false
      router.push('/panel/')
    } catch (error) {
      loading.value = false
      showMessage('Credenciais inválidas', 'error', 1500, 'top-right', 'auto', false)
    }
  }

</script>

<template>
  <div v-if="loading" class="d-flex align-center justify-center h-100 w-100">
    <v-progress-circular indeterminate color="primary" size="64" />
  </div>
  <v-container class="w-100 h-100 d-flex justify-center align-center" v-else>
    <v-row>
      <v-col class="mx-auto" cols="10" md="6">
        <v-card variant="text">
          <v-card-title class="text-center">
            <h2 class="text-primary font-weight-bold text-h4">Login</h2>
          </v-card-title>
          <v-card-text>
            <v-form @submit.prevent="login" @keydown.enter="login">
              <v-text-field
                v-model="email"
                label="Email"
                required
                rounded="xl"
                type="email"
                variant="outlined"
              />
              <v-text-field
                v-model="password"
                label="Senha"
                required
                rounded="xl"
                type="password"
                variant="outlined"
              />
              <v-btn
                block
                class="py-6"
                color="primary"
                rounded="xl"
                @click="login"
              > Entrar </v-btn>
            </v-form>
            <p class="text-center mt-4" style="font-size: 0.9rem">
              <router-link
                class="text-decoration-none text-primary"
                to="/auth/get-password"
              >Primeira vez ou esqueceu a senha? Clique aqui</router-link>
            </p>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
