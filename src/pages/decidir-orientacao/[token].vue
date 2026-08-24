<script setup>
import { useRoute, useRouter } from 'vue-router'
import { useAuth } from '@/stores/auth'
import { useAdvisorAcceptance } from '@/stores/advisorAcceptance'

const route = useRoute()
const router = useRouter()
const authStore = useAuth()
const acceptanceStore = useAdvisorAcceptance()

const done = ref(false)
const actionTaken = ref('')

onMounted(async () => {
  if (!authStore.isLogged) {
    router.replace(`/auth/login?redirect=${encodeURIComponent(route.fullPath)}`)
    return
  }
  acceptanceStore.setToken(String(route.params.token))
  // Consulta quantas orientações o professor já aceitou nesta edição: se o limite
  // já estourou, o botão "Aceitar" nasce desabilitado com o motivo no tooltip,
  // em vez de deixar ele clicar e tomar o erro do backend.
  await acceptanceStore.fetchLimitStatus()
})

async function aceitar() {
  actionTaken.value = 'aceitar'
  const success = await acceptanceStore.acceptAsAdvisor()
  actionTaken.value = ''
  if (success) done.value = true
}

async function recusar() {
  actionTaken.value = 'recusar'
  const success = await acceptanceStore.rejectAsAdvisor()
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
          Este convite de orientação já foi aceito ou recusado anteriormente — não há mais nada para decidir aqui.
        </p>
        <router-link to="/panel/works">Acessar o painel</router-link>
      </template>
      <template v-else-if="!done">
        <p class="text-h5 font-weight-bold">Convite para orientação</p>
        <v-divider />
        <p>
          Você foi convidado para orientar um trabalho no Painel de Integração. Ao aceitar, o trabalho será
          automaticamente aprovado e você poderá atribuir uma nota mais adiante.
        </p>
        <v-alert v-if="acceptanceStore.limitReached" type="warning" variant="tonal" density="compact">
          {{ acceptanceStore.limitMessage }}
        </v-alert>
        <div class="w-100 d-flex ga-4">
          <v-btn color="error" variant="outlined" width="50%" @click="recusar"
            :loading="acceptanceStore.state.loading && actionTaken === 'recusar'"
            :disabled="acceptanceStore.state.loading">
            Recusar
          </v-btn>
          <!-- O botão desabilitado não recebe eventos de ponteiro, então o tooltip
               precisa ficar ancorado neste wrapper e não no próprio v-btn. -->
          <div style="width: 50%">
            <v-btn color="primary" block @click="aceitar"
              :loading="acceptanceStore.state.loading && actionTaken === 'aceitar'"
              :disabled="acceptanceStore.state.loading || acceptanceStore.limitReached">
              Aceitar
            </v-btn>
            <v-tooltip v-if="acceptanceStore.limitReached" activator="parent" location="top">
              {{ acceptanceStore.limitMessage }}
            </v-tooltip>
          </div>
        </div>
      </template>
      <template v-else>
        <p class="text-h5 font-weight-bold">
          {{ acceptanceStore.state.accepted ? 'Orientação aceita!' : 'Orientação recusada' }}
        </p>
        <p>
          Pode fechar essa aba, ou <router-link to="/panel/works">acessar o painel</router-link>.
        </p>
      </template>
    </v-sheet>
  </v-main>
</template>
