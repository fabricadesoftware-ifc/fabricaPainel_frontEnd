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
   
  <v-parallax style="z-index: 90; height: 100vh;" src="@/assets/home_banner.png" class="custom-parallax" gradient="rgba(0,0,0,0.69)">
    <Loading :loading="loading" />
  <PanelLogo />
  
    <div class="d-flex justify-center">
      <v-card style="height: 60%; width: 550px;" class="d-flex rounded-xl px-6 pa-5 mx-5 mt-16 mt-xs-10">
        <v-col cols="12">
          <v-card class="d-flex flex-column justify-space-between" variant="text">
            <v-card-title class="text-center">
              <h2 class="text-primary font-weight-bold text-h3">Entrar
              </h2>
            </v-card-title>
            <v-card-text class="d-flex flex-column justify-space-between" style="margin-top: 15%;">
              <v-form class="d-flex flex-column" @submit.prevent="login" @keydown.enter="login">
                <v-text-field v-model="email" label="Email" required prepend-inner-icon="mdi-email" rounded="lg"
                  type="email" variant="outlined" />
                <v-text-field v-model="password" label="Senha" required rounded="lg"
                  :type="visible ? 'text' : 'password'" variant="outlined"
                  :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'" prepend-inner-icon="mdi-lock-outline"
                  @click:append-inner="visible = !visible" />
                  
                <AuthButton alternative_text="Esqueceu sua senha? Clique aqui" router_link="/auth/get-password" @action="login()" />
              </v-form>
             
            </v-card-text>
          </v-card>
        </v-col>
      </v-card>
    </div>
  </v-parallax>
</template>
