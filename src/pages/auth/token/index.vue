<script setup>
  import { ref } from 'vue'
  import { showMessage } from '@/utils/toastify'
  import { useRouter } from 'vue-router'
  import { useAuth } from '@/stores/auth'

  const router = useRouter()
  const authStore = useAuth()

  const token = ref('')

  const getToken = async () => {
    try {
      await authStore.verifyToken(token.value)
      router.push('/auth/reset-password')
    } catch (error) {
      showMessage('Token inválido', 'error', 1500, 'top-right', 'auto', false)
    }
  }

const resendToken = async () => {
  try {
    await authStore.getPassword();
    showMessage(
      "E-mail reenviado com sucesso!",
      "success",
      1500,
      "top-right",
      "auto",
      false
    );
  } catch (error) {
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
  <!-- reenviar email e campo para token -->
  <v-container class="w-100 h-100 d-flex justify-center align-center">
    <v-row>
      <v-col cols="12" md="6" class="mx-auto">
        <!-- campo para inserir token enviado -->

        <v-card>
          <!-- token -->
          <v-card-title class="text-center">
            <h2 class="text-primary font-weight-bold text-h4">Token</h2>
          </v-card-title>
          <v-card-subtitle class="text-center">
            <p>Insira o token enviado para o seu e-mail.</p>
          </v-card-subtitle>
          <v-card-text>
            <v-form>
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

          <!-- reenviar email -->

          <p class="text-center mt-4" style="font-size: 0.9rem">
            <router-link
              to="/auth/get-password"
              class="text-decoration-none text-primary"
              >Não Recebeu o e-mail? Clique aqui para reenviar</router-link
            >
          </p>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
