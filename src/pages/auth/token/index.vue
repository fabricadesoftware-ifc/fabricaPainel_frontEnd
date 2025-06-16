<script setup>
  import { ref } from 'vue'
  import { showMessage } from '@/utils/toastify'
  import { useRouter } from 'vue-router'
  import { useAuth } from '@/stores/auth'

  const router = useRouter()
  const authStore = useAuth()
  const loading = ref(false)

  const token = ref('')

  const getToken = async () => {
    try {
      loading.value = true
      await authStore.verifyToken(token.value)
      loading.value = false
      router.push('/auth/reset-password')
    } catch (error) {
      loading.value = false
      showMessage('Token inválido', 'error', 1500, 'top-right', 'auto', false)
    }
  }

const resendToken = async () => {
  try {
    loading.value = true;
    await authStore.getPassword();
    loading.value = false;
    showMessage(
      "E-mail reenviado com sucesso!",
      "success",
      1500,
      "top-right",
      "auto",
      false
    );
  } catch (error) {
    loading.value = false;
    showMessage(
      "Falha no reenvio do e-mail",
      "error",
      1500,
      "top-right",
      "auto",
      false
    );
  }
};
</script>

<template>
  

     <v-parallax style="height: 100vh;" src="@/assets/home_banner.png" class="custom-parallax d-flex justify-center align-center" gradient="rgba(0,0,0,0.69)">
      <Loading :loading="loading" />
    <v-row>
      <v-col cols="12" md="6" class="mx-auto d-flex justify-center align-center">
        <v-card class="pa-5 rounded-xl token-container">
          <v-card-title class="text-center">
            <h2 class="text-primary font-weight-bold text-h4">Token</h2>
          </v-card-title>
          <v-card-subtitle class="text-center">
            <p>Insira o token enviado para o seu e-mail.</p>
          </v-card-subtitle>
          <v-card-text>
            <v-form @submit.prevent="getToken">
              <v-text-field
                v-model="token"
                label="Token"
                variant="outlined"
                rounded="xl"
                required
                type="text"
              />
              <v-btn
                block
                color="primary"
                rounded="xl"
                class="py-6"
                @click="getToken"
              >
                Confirmar
              </v-btn>
            </v-form>
          </v-card-text>

          <p class="text-center mt-4" style="font-size: 0.9rem">
            <p
              @click="resendToken"
              class="text-decoration-none text-primary cursor-pointer"
              >Não Recebeu o e-mail? Clique aqui para reenviar</p
            >
          </p>
        </v-card>
      </v-col>
    </v-row>
  </v-parallax>

</template>

<style scoped>
.token-container {
  width: 100%;
}

@media screen and (max-width: 700px) {
  .token-container {
  width: 90%;
  height: 400px;
}
}
</style>
