<script setup>
  import { ref } from 'vue'
  import { showMessage } from '@/utils/toastify'
  import { useRouter } from 'vue-router'
  import { useAuth } from '@/stores/auth'

  const router = useRouter()
  const authStore = useAuth()

  const password = ref('')
  const confirmPassword = ref('')

  const loading = ref(false)

  const validateAndConfirmPassword = () => {
    if (password.value !== confirmPassword.value) {
      showMessage(
        'As senhas não coincidem',
        'error',
        1500,
        'top-right',
        'auto',
        false
      )
      return false
    }

    if (password.value.length < 8 || !/\d/.test(password.value)) {
      showMessage(
        'A senha deve ter no mínimo 8 caracteres e conter letras e números',
        'error',
        1500,
        'top-right',
        'auto',
        false
      )
      return false
    }

    return true
  }

  const resetPassword = async () => {
    try {
      if (!validateAndConfirmPassword()) return
      loading.value = true
      await authStore.resetPassword(password.value)
      loading.value = false
      showMessage(
        'Senha resetada com sucesso!',
        'success',
        1500,
        'top-right',
        'auto',
        false
      )
      router.push('/auth/login')
    } catch (error) {
      loading.value = false
      console.error(error)
      showMessage(
        'Falha ao resetar a senha',
        'error',
        1500,
        'top-right',
        'auto',
        false
      )
    }
  }
</script>

<template>
  <div v-if="loading" class="d-flex align-center justify-center h-100 w-100">
    <v-progress-circular indeterminate color="primary" size="64" />
  </div>
  <v-container class="w-100 h-100 d-flex justify-center align-center" v-else>
    <v-row>
      <v-col class="mx-auto" cols="12" md="6">
        <v-card>
          <v-card-title class="text-center">
            <h2 class="text-primary font-weight-bold text-h4">Nova Senha</h2>
          </v-card-title>
          <v-card-subtitle class="text-center">
            <p>Insira a nova senha e confirme.</p>
          </v-card-subtitle>
          <v-card-text>
            <v-form @submit.prevent="resetPassword" @keydown.enter="resetPassword">
              <v-text-field
                v-model="password"
                label="Nova Senha"
                variant="outlined"
                rounded="xl"
                required
                type="password"
              />
              <v-text-field
                v-model="confirmPassword"
                label="Confirmar Senha"
                variant="outlined"
                rounded="xl"
                required
                type="password"
              />
              <v-btn block color="primary" class="py-6" rounded="xl" @click="resetPassword">
                Enviar
              </v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
