<script setup>
import { ref } from "vue";
import { showMessage } from "@/utils/toastify";
import { useRouter } from "vue-router";
import { useAuth } from "@/stores/auth";

const router = useRouter();
const authStore = useAuth();

const email = ref("");

const getPassword = async () => {
  try {
    await authStore.getPassword(email.value);
  } catch (error) {
    showMessage('Falha no envio do e-mail', 'error', 1500, 'top-right', 'auto', false );
  } finally {
    router.push('/auth/token');
    showMessage('E-mail enviado com sucesso!', 'success', 1500,'top-right', 'auto', false );
  }
};
</script>

<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="6" class="mx-auto">
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
                outlined
                required
                type="email"
              />
              <v-btn block color="primary" @click="getPassword">
                Enviar E-mail
              </v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
