<script setup>
  import { ref } from 'vue'
  import { showMessage } from '@/utils/toastify'
  import { useRouter } from 'vue-router'
  import { useAuth } from '@/stores/auth'

  const router = useRouter()
  const authStore = useAuth()

  const email = ref('')

  const getPassword = async () => {
    try {
      await authStore.getPassword(email.value)
      router.push('/auth/token')
      showMessage('E-mail enviado com sucesso!', 'success', 1500, 'top-right', 'auto', false)
    } catch (error) {
      showMessage('Falha no envio do e-mail, verifique o endereço e tente novamente', 'error', 1500, 'top-right', 'auto', false)
    }
  }
</script>

<template>
  <v-container class="w-100 h-100 d-flex justify-center align-center">
    <v-row style="min-width: 300px;">
      <v-col class="mx-auto" cols="12" md="6">
        <v-card>
          <v-card-title class="text-center">
            <h2 class="text-primary font-weight-bold text-h4">
              Recuperar Senha
            </h2>
          </v-card-title>
          <v-card-subtitle class="text-center">
            <p>
              Enviaremos um e-mail com as instruções para recuperar sua senha.
            </p>
          </v-card-subtitle>
          <v-card-text>
            <v-form>
              <v-text-field
                v-model="email"
                label="Email"
                variant="outlined"
                required
                rounded="xl"
                type="email"
              />
              <v-btn block color="primary" class="py-6" rounded="xl" @click="getPassword">
                Enviar E-mail
              </v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
