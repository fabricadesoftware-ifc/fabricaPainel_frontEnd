<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const hash = ref('')

const validate = () => {
  const value = hash.value.trim()
  if (!value) return
  router.push(`/validar-certificado/${encodeURIComponent(value)}`)
}
</script>

<template>
  <v-parallax style="min-height: 100vh" src="@/assets/home_banner.webp" gradient="rgba(0,0,0,0.69)">
    <PanelLogo />
    <div class="d-flex justify-center mt-8 px-4 pb-8 w-100">
      <v-card class="pa-6 rounded-xl form-card">
        <div class="d-flex align-center ga-3 mb-4">
          <v-icon size="40" color="primary">mdi-shield-check</v-icon>
          <div>
            <h2>Validar certificado</h2>
            <p class="text-medium-emphasis">
              Cole o código de validação impresso no certificado, ou escaneie o QR code.
            </p>
          </div>
        </div>
        <v-form @submit.prevent="validate">
          <v-text-field
            v-model="hash"
            label="Código de validação"
            variant="outlined"
            rounded="lg"
            prepend-inner-icon="mdi-key"
            autocomplete="off"
            autocapitalize="off"
            spellcheck="false"
            clearable
          />
          <div class="d-flex justify-end">
            <v-btn type="submit" color="primary" rounded="lg" :disabled="!hash.trim()" prepend-icon="mdi-magnify">
              Validar
            </v-btn>
          </div>
        </v-form>
      </v-card>
    </div>
  </v-parallax>
</template>

<style scoped>
.form-card {
  width: 100%;
  max-width: 560px;
}
</style>
