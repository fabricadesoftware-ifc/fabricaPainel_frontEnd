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
<template>
  <v-parallax style="height: 100vh;" src="@/assets/home_banner.png" class="custom-parallax" gradient="rgba(0,0,0,0.69)">
    <Loading :loading="loading" />
     <PanelLogo />
    <div class="d-flex justify-center mt-16">
      <v-card class="d-flex rounded-xl pa-6 login-card get-password-card">
        <v-col cols="12" class="pt-5">
          <v-card-subtitle class="text-center">
            <v-alert title="Senha" color="primary" icon="$info" rounded="lg" variant="outlined"
              text="Enviaremos um e-mail com as instruções para recuperar sua senha." class="break-text">

            </v-alert>
          </v-card-subtitle>
           <v-card-text>
           <v-form @submit.prevent="getPassword">
           <v-text-field class="pb-2" v-model="email" label="Email" variant="outlined" prepend-inner-icon="mdi-email" required
                rounded="lg" type="email" :rules="[v => /.+@.+\..+/.test(v) || 'E-mail inválido']"/>
         <AuthButton alternative_text="Acessar a Plataforma" router_link="/auth/login" @action="getPassword" />
         </v-form>
         </v-card-text>
        </v-col>
      </v-card>
    </div>
  </v-parallax>
</template>

<style scoped>
.get-password-card {
  width: auto;
}

@media screen and (max-width: 700px) {
  .get-password-card {
  width: 90%;
  height: 450px;
}
}

.break-text {
  white-space: normal !important;
  word-break: break-word !important;
}
</style>
