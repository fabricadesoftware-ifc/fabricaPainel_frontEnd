<script setup>
import { ref } from 'vue'
import { showMessage } from '@/utils/toastify'
import { useRouter } from 'vue-router'
import { useAuth } from '@/stores/auth'

const router = useRouter()
const authStore = useAuth()
const loading = ref(false)
const visible = ref(false)

const email = ref('')
const password = ref('')

const login = async () => {
  try {
    loading.value = true
    await authStore.login(email.value, password.value)
    loading.value = false
    router.push('/panel/works')
  } catch (error) {
    loading.value = false
    showMessage('Credenciais inválidas', 'error', 1500, 'top-right', 'auto', false)
  }
}

</script>

<style>
::-webkit-scrollbar {
  display: none;
}

@media (max-width: 1250px) {
  .custom-parallax {
    height: 1000px;
  }
}
</style>

<template>
  <v-parallax src="@/assets/home_banner.png" class="custom-parallax" gradient="rgba(0,0,0,0.69)">
    <header class="d-flex mt-3 mt-sm-5 mx-4 mx-sm-8 mx-md-12 justify-space-between">
      <router-link class="d-flex align-center" to="/" style="user-select: none">
        <v-img src="@/assets/logotipo_painel_integracao.png" :height="$vuetify.display.xs ? '60' : '100'"
          :width="$vuetify.display.xs ? '28' : '46'" />
        <h2 class="logo--title font-weight-regular text-white ml-2 ml-sm-4"
          :class="$vuetify.display.xs ? 'text-h6' : ''">Painel
        </h2>
      </router-link>
    </header>
    <div v-if="loading" class="d-flex align-center justify-center h-100 w-100">
      <v-progress-circular indeterminate color="primary" size="64" />
    </div>
    <div class="d-flex justify-center mt-16" v-else>
      <v-card class="d-flex rounded-xl w-auto pa-6 mx-5 login-card">
        <v-col cols="12">
          <v-card variant="text">
            <v-card-title class="text-center">
              <h2 class="text-primary font-weight-bold">Login
              </h2>
            </v-card-title>
            <v-card-text>
              <v-form @submit.prevent="login" @keydown.enter="login">
                <v-text-field v-model="email" label="Email" required prepend-inner-icon="mdi-email" rounded="lg"
                  type="email" variant="outlined" />
                <v-text-field v-model="password" label="Senha" required rounded="lg"
                  :type="visible ? 'text' : 'password'" variant="outlined"
                  :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'" prepend-inner-icon="mdi-lock-outline"
                  @click:append-inner="visible = !visible" />
                <v-btn block class="py-6" color="primary" rounded="lg" @click="login">
                  Entrar
                  <v-icon icon="mdi-arrow-right"></v-icon>
                </v-btn>
              </v-form>
              <p class="text-center mt-4" style="font-size: 0.9rem">
                <router-link class="text-decoration-none text-primary" to="/auth/get-password">Primeira vez ou
                  esqueceu
                  a
                  senha? Clique aqui</router-link>
              </p>
            </v-card-text>
          </v-card>
        </v-col>
      </v-card>
    </div>
  </v-parallax>
</template>
