<script setup>
  import { useRoute } from 'vue-router'
  import { useAuth } from '@/stores/auth'
  import { showMessage } from '@/utils/toastify';

  const route = useRoute()
  const router = useRouter()
  const authStore = useAuth()
  const loading = ref(false)
  const send = ref(false)

  async function accept () {
    loading.value = true
    try {
      const token = authStore.team.tokens.find(
        t => t.token === route.params.token
      )
      const team = {
        action: 'accept',
        token_id: token.id,
        id: route.params.id,
      }
      await authStore.updateTeam(team)
      showMessage('Convite aceito.', 'success', 3000, 'top-right', 'light', false)
      send.value = true
    } catch (error) {
      console.log(error)
    }
    loading.value = false
  }

  async function reject () {
    loading.value = true
    try {
      const token = authStore.team.tokens.find(
        t => t.token === route.params.token
      )
      console.log(token)
      const team = {
        action: 'reject',
        token_id: token.id,
        id: route.params.id,
      }
      await authStore.updateTeam(team)
      showMessage('Convite recusado.', 'warning', 3000, 'top-right', 'light', false)
      send.value = true
    } catch (error) {
      console.log(error)
    }
    loading.value = false
  }

  onMounted(async () => {
    loading.value = true
    await authStore.getTeam(route.params.id)
    loading.value = false
  })
</script>

<template>
  <v-main class="w-100 h-100 d-flex align-center justify-center">
    <div class="w-100 h-100 d-flex align-center justify-center" v-if="loading" >
      <v-progress-circular indeterminate color="primary" size="64"></v-progress-circular>
    </div>
    <div v-if="send && !loading">
      <p>
        Operação realizada com sucesso. Feche essa aba.
      </p>
    </div>
    <v-sheet class="rounded-xl border w-50 pa-6 d-flex flex-column ga-4" max-width="700px" min-width="300px" v-if="authStore.team?.accept_tokens?.length > 0 && !send && !loading">
      <p class="text-h4">Convite para grupo</p>
      <v-divider />
      <div class="d-flex ga-2">
        <p>
          Você foi convidado para o grupo por
        </p>
        <p class="text-capitalize font-weight-bold">
          {{ String(authStore.team.accept_tokens[0].sender.name).toLowerCase() }}
        </p>
      </div>
      <div>
        <p>
          Participantes:
        </p>
        <p v-for="token in authStore.team.accept_tokens" :key="token.id" class="text-capitalize">
          {{ String(token.user.name).toLowerCase() }}
        </p>
      </div>
      <div class="w-100 d-flex ga-4">
        <v-btn color="error" @click="reject" width="50%"> Recusar </v-btn>
        <v-btn color="primary" @click="accept" width="50%"> Aceitar </v-btn>
      </div>
    </v-sheet>
  </v-main>
</template>
