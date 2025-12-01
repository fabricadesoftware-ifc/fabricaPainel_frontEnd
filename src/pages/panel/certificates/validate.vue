<script setup lang="ts">
import { ref } from "vue";
import { useCertificate } from "@/stores/certificate";
import { useDisplay } from "vuetify";

const certificateStore = useCertificate();
const { width } = useDisplay();

const hashInput = ref("");
const isValidating = ref(false);
const validationDone = ref(false);

const validateCertificate = async () => {
  if (!hashInput.value.trim()) return;

  isValidating.value = true;
  validationDone.value = false;

  try {
    await certificateStore.validateCertificate(hashInput.value.trim());
    validationDone.value = true;
  } catch (error) {
    validationDone.value = true;
  } finally {
    isValidating.value = false;
  }
};

const clearForm = () => {
  hashInput.value = "";
  validationDone.value = false;
  certificateStore.clearValidation();
};

// Verifica se o certificado é válido (tem os campos esperados)
const isValidCertificate = () => {
  const result = certificateStore.validationResult;
  return result && result.user && result.work && result.year;
};
</script>

<template>
  <LayoutPanel>
    <v-container class="w-100">
      <v-btn
        href="/panel/works"
        style="box-shadow: none"
        class="mb-2 text-blue"
      >
        <v-icon icon="mdi-arrow-left mr-1"></v-icon> Voltar
      </v-btn>

      <div class="d-flex justify-space-between align-center mb-8">
        <h1
          class="font-weight-bold"
          :style="{ fontSize: width > 780 ? '40px' : '25px' }"
        >
          Validar Certificado
        </h1>
      </div>

      <v-card
        class="pa-8"
        rounded="xl"
        variant="outlined"
        :class="width > 780 ? 'mx-16' : 'mx-4'"
      >
        <div class="d-flex flex-column ga-5">
          <div class="d-flex align-center ga-3">
            <v-icon size="40" color="primary">mdi-shield-check</v-icon>
            <div>
              <h2>Verificação de Autenticidade</h2>
              <p class="text-grey">
                Insira o código hash do certificado para validar
              </p>
            </div>
          </div>

          <v-text-field
            v-model="hashInput"
            label="Código Hash do Certificado"
            placeholder="Ex: 36a0a4d89235d592d005423da2b5ecf7..."
            variant="outlined"
            rounded="xl"
            prepend-inner-icon="mdi-key"
            :disabled="isValidating"
            @keyup.enter="validateCertificate"
            clearable
          />

          <div class="d-flex ga-3 justify-end">
            <v-btn
              v-if="validationDone"
              variant="outlined"
              rounded="xl"
              @click="clearForm"
            >
              Nova Consulta
            </v-btn>
            <v-btn
              color="primary"
              rounded="xl"
              :loading="isValidating"
              :disabled="!hashInput.trim()"
              @click="validateCertificate"
              prepend-icon="mdi-magnify"
            >
              Validar
            </v-btn>
          </div>
        </div>
      </v-card>

      <!-- Resultado da Validação -->
      <v-fade-transition>
        <v-card
          v-if="validationDone"
          class="pa-8 mt-6"
          rounded="xl"
          :color="isValidCertificate() ? 'success' : 'error'"
          variant="tonal"
          :class="width > 780 ? 'mx-16' : 'mx-4'"
        >
          <div class="d-flex flex-column ga-4">
            <div class="d-flex align-center ga-3">
              <v-icon
                size="50"
                :color="isValidCertificate() ? 'success' : 'error'"
              >
                {{
                  isValidCertificate() ? "mdi-check-circle" : "mdi-close-circle"
                }}
              </v-icon>
              <div>
                <h2>
                  {{
                    isValidCertificate()
                      ? "Certificado Válido!"
                      : "Certificado Inválido"
                  }}
                </h2>
                <p>
                  {{
                    isValidCertificate()
                      ? "Este certificado é autêntico e foi emitido pelo Painel de Integração."
                      : "O código informado não corresponde a nenhum certificado válido."
                  }}
                </p>
              </div>
            </div>

            <!-- Detalhes do certificado válido -->
            <template v-if="isValidCertificate()">
              <v-divider class="my-2" />

              <v-card variant="outlined" class="pa-5" rounded="lg">
                <div class="d-flex flex-column ga-4">
                  <div class="d-flex align-center ga-2">
                    <v-icon color="primary">mdi-account</v-icon>
                    <div>
                      <p class="text-caption text-grey mb-1">
                        Nome do Participante
                      </p>
                      <p class="font-weight-bold text-h6">
                        {{ certificateStore.validationResult.user }}
                      </p>
                    </div>
                  </div>

                  <v-divider />

                  <div class="d-flex align-center ga-2">
                    <v-icon color="primary">mdi-file-document</v-icon>
                    <div>
                      <p class="text-caption text-grey mb-1">
                        Título do Trabalho
                      </p>
                      <p class="font-weight-bold text-h6">
                        {{ certificateStore.validationResult.work }}
                      </p>
                    </div>
                  </div>

                  <v-divider />

                  <div class="d-flex align-center ga-2">
                    <v-icon color="primary">mdi-calendar</v-icon>
                    <div>
                      <p class="text-caption text-grey mb-1">Ano da Edição</p>
                      <p class="font-weight-bold text-h6">
                        {{ certificateStore.validationResult.year }}
                      </p>
                    </div>
                  </div>

                  <v-divider />

                  <div class="d-flex align-center ga-2">
                    <v-icon color="primary">mdi-key-variant</v-icon>
                    <div>
                      <p class="text-caption text-grey mb-1">
                        Hash de Validação
                      </p>
                      <p
                        class="font-weight-medium text-body-2"
                        style="word-break: break-all"
                      >
                        {{ certificateStore.validationResult.hash_validate }}
                      </p>
                    </div>
                  </div>
                </div>
              </v-card>
            </template>
          </div>
        </v-card>
      </v-fade-transition>

      <!-- Informativo -->
      <v-alert
        class="mt-10"
        type="info"
        variant="tonal"
        rounded="xl"
        :class="width > 780 ? 'mx-16' : 'mx-4'"
      >
        <template #title>Como validar um certificado?</template>
        <p class="mt-2">
          Cada certificado emitido pelo Painel de Integração possui um código
          hash único. Este código pode ser encontrado no próprio certificado e
          deve ser inserido no campo acima para verificar sua autenticidade.
        </p>
      </v-alert>
    </v-container>
  </LayoutPanel>
</template>
