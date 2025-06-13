<script setup>
import { ref } from 'vue'
import { showMessage } from '@/utils/toastify'
import { useRouter } from 'vue-router'
import { useAuth } from '@/stores/auth'

const router = useRouter()
const authStore = useAuth()
const loading = ref(false)

const email = ref('')

const getPassword = async () => {
  try {
    loading.value = true
    authStore.setTokenEmail(email.value)
    await authStore.getPassword()
    loading.value = false
    router.push('/auth/token')
    showMessage('E-mail enviado com sucesso!', 'success', 1500, 'top-right', 'auto', false)
  } catch (error) {
    loading.value = false
    console.error(error)
    showMessage('Falha no envio do e-mail, verifique o endereço e tente novamente', 'error', 1500, 'top-right', 'auto', false)
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
      <v-card class="d-flex rounded-xl w-auto pa-6 login-card">
        <v-col cols="12">
          <v-card-subtitle class="text-center">
            <v-alert title="Senha" color="primary" icon="$warning" rounded="lg" variant="outlined"
              text="Enviaremos um e-mail com as instruções para recuperar sua senha.">

            </v-alert>
          </v-card-subtitle>
          <v-card-text>
            <v-form @submit.prevent="getPassword">
              <v-text-field v-model="email" label="Email" variant="outlined" prepend-inner-icon="mdi-email" required
                rounded="lg" type="email" />
              <v-btn block color="primary" class="py-6" rounded="lg" @click="getPassword">
                Enviar <v-icon icon="mdi-arrow-right"></v-icon>
              </v-btn>
            </v-form>
          </v-card-text>
        </v-col>
      </v-card>
    </div>
  </v-parallax>
</template>
