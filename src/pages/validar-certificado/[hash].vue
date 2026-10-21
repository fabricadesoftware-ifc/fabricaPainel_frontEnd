<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import CertificateService from '@/services/certificate'

interface VerifiedCertificate {
  user: string
  work: string
  year: number | string
  hash_validate: string
}

type Status = 'loading' | 'valid' | 'invalid' | 'error'

const route = useRoute()
const hash = String((route.params as { hash?: string }).hash ?? '').trim()

const status = ref<Status>('loading')
const certificate = ref<VerifiedCertificate | null>(null)

onMounted(async () => {
  try {
    certificate.value = await CertificateService.verifyCertificate(hash)
    status.value = 'valid'
  } catch (error: any) {
    // 404 = hash não existe; qualquer outra falha (rede/servidor) não prova nada.
    status.value = error?.response?.status === 404 ? 'invalid' : 'error'
  }
})
</script>

<template>
  <v-parallax style="min-height: 100vh" src="@/assets/home_banner.webp" gradient="rgba(0,0,0,0.69)">
    <PanelLogo />
    <div class="d-flex justify-center mt-8 px-4 pb-8 w-100">
      <v-card class="pa-6 rounded-xl result-card">
        <div v-if="status === 'loading'" class="d-flex justify-center pa-8">
          <v-progress-circular indeterminate color="primary" size="56" />
        </div>

        <template v-else-if="status === 'valid' && certificate">
          <div class="d-flex align-center ga-3 mb-4">
            <v-icon size="48" color="success">mdi-check-circle</v-icon>
            <div>
              <h2>Certificado válido</h2>
              <p class="text-medium-emphasis">Emitido pelo Painel de Integração.</p>
            </div>
          </div>
          <v-divider class="mb-4" />
          <p class="text-caption text-medium-emphasis">Participante</p>
          <p class="text-h6 font-weight-bold mb-3">{{ certificate.user }}</p>
          <p class="text-caption text-medium-emphasis">Trabalho</p>
          <p class="text-h6 font-weight-bold mb-3">{{ certificate.work }}</p>
          <p class="text-caption text-medium-emphasis">Edição</p>
          <p class="text-h6 font-weight-bold mb-3">{{ certificate.year }}</p>
          <p class="text-caption text-medium-emphasis">Código de validação</p>
          <p class="text-body-2 hash-text">{{ certificate.hash_validate }}</p>
        </template>

        <template v-else-if="status === 'invalid'">
          <div class="d-flex align-center ga-3">
            <v-icon size="48" color="error">mdi-close-circle</v-icon>
            <div>
              <h2>Certificado não encontrado</h2>
              <p class="text-medium-emphasis">
                O código informado não corresponde a nenhum certificado emitido.
              </p>
            </div>
          </div>
        </template>

        <template v-else>
          <div class="d-flex align-center ga-3">
            <v-icon size="48" color="warning">mdi-alert-circle</v-icon>
            <div>
              <h2>Não foi possível validar agora</h2>
              <p class="text-medium-emphasis">
                Falha ao consultar o servidor. Tente novamente em instantes.
              </p>
            </div>
          </div>
        </template>

        <div class="d-flex justify-end mt-6">
          <v-btn variant="text" color="primary" to="/validar-certificado">Validar outro código</v-btn>
        </div>
      </v-card>
    </div>
  </v-parallax>
</template>

<style scoped>
.result-card {
  width: 100%;
  max-width: 560px;
}

.hash-text {
  word-break: break-all;
  font-family: monospace;
}
</style>
