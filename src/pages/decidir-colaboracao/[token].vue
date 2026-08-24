<script setup>
import { useRoute, useRouter } from 'vue-router'
import { useAuth } from '@/stores/auth'
import { useCollaboratorAcceptance } from '@/stores/collaboratorAcceptance'

const route = useRoute()
const router = useRouter()
const authStore = useAuth()
const acceptanceStore = useCollaboratorAcceptance()

const done = ref(false)
const actionTaken = ref('')

onMounted(() => {
  if (!authStore.isLogged) {
    router.replace(`/auth/login?redirect=${encodeURIComponent(route.fullPath)}`)
    return
  }
  acceptanceStore.setToken(String(route.params.token))
})

async function aceitar() {
  actionTaken.value = 'aceitar'
  const success = await acceptanceStore.acceptAsCollaborator()
  actionTaken.value = ''
  if (success) done.value = true
}

async function recusar() {
  actionTaken.value = 'recusar'
  const success = await acceptanceStore.rejectAsCollaborator()
  actionTaken.value = ''
  if (success) done.value = true
}
</script>

<template>
  <v-main class="w-100 h-100 d-flex align-center justify-center" style="position: relative">
    <v-btn
      icon="mdi-close"
      variant="text"
      size="small"
      style="position: absolute; top: 16px; right: 16px"
      to="/panel/works"
      aria-label="Fechar"
    />
    <v-sheet v-if="authStore.isLogged" class="rounded-xl border pa-6 d-flex flex-column ga-4" max-width="500px"
      min-width="300px">
      <template v-if="acceptanceStore.state.alreadyDecided">
        <p class="text-h5 font-weight-bold">Esta decisão já foi tomada</p>
        <p>
          Este convite de colaboração já foi aceito ou recusado anteriormente — não há mais nada para decidir aqui.
        </p>
        <router-link to="/panel/works">Acessar o painel</router-link>
      </template>
      <template v-else-if="!done">
        <p class="text-h5 font-weight-bold">Convite para colaboração</p>
        <v-divider />
        <p>
          Você foi convidado para colaborar em um trabalho no Painel de Integração.
        </p>
        <div class="w-100 d-flex ga-4">
          <v-btn color="error" variant="outlined" width="50%" @click="recusar"
            :loading="acceptanceStore.state.loading && actionTaken === 'recusar'"
            :disabled="acceptanceStore.state.loading">
            Recusar
          </v-btn>
          <v-btn color="primary" width="50%" @click="aceitar"
            :loading="acceptanceStore.state.loading && actionTaken === 'aceitar'"
            :disabled="acceptanceStore.state.loading">
            Aceitar
          </v-btn>
        </div>
      </template>
      <template v-else>
        <p class="text-h5 font-weight-bold">
          {{ acceptanceStore.state.accepted ? 'Colaboração aceita!' : 'Colaboração recusada' }}
        </p>
        <p>
          Pode fechar essa aba, ou <router-link to="/panel/works">acessar o painel</router-link>.
        </p>
      </template>
    </v-sheet>
  </v-main>
</template>
