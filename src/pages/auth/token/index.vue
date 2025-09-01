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


  <v-parallax style="height: 100vh;" src="@/assets/home_banner.png" class="custom-parallax" gradient="rgba(0,0,0,0.69)">
    <Loading :loading="loading" />
    <PanelLogo />
    <v-row>
      <div cols="12" class="mx-auto d-flex justify-center align-center mt-16 pt-5">
        <v-card class="pa-6 rounded-xl token-container pt-10">
            <v-card-subtitle class="text-left">
            <v-alert title="Token" color="primary" icon="$info" rounded="lg" variant="outlined"
              text="Digite o token recebido no seu e-mail para continuar o processo." class="break-text">

            </v-alert>
          </v-card-subtitle>
          <v-card-text>
            <v-form @submit.prevent="getToken">
              <v-text-field
                v-model="token"
                label="Token"
                variant="outlined"
                rounded="lg"
                required
                type="text"
                prepend-inner-icon="mdi-key-variant"
              />
              <v-btn
                block
                color="primary"
                rounded="lg"
                class="py-6"
                @click="getToken"
              >
                Confirmar
              </v-btn>
            </v-form>
          </v-card-text>

          <p class="text-center mt-4 text-decoration-none text-primary cursor-pointer" style="font-size: 0.9rem" @click="resendToken"
              >Não Recebeu o e-mail? Clique aqui para reenviar
          </p>
        </v-card>
      </div>
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

::-webkit-scrollbar-corner {
  display: none;
}
</style>
