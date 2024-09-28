<script setup>
import { ref } from "vue";
import { showMessage } from "@/utils/toastify";
import { useRouter } from "vue-router";
import { useAuth } from "@/stores/auth";

const router = useRouter();
const authStore = useAuth();

const token = ref("");

const getToken = async () => {
  try {
    await authStore.verifyToken(token.value);
  } catch (error) {
    showMessage('Token inválido', 'error', 1500, 'top-right', 'auto', false );
  } finally {
    router.push('/auth/reset-password');
  }
};

const resendToken = async () => {
  try {
    await authStore.getPassword();
  } catch (error) {
    showMessage('Falha no reenvio do e-mail', 'error', 1500, 'top-right', 'auto', false );
  } finally {
    showMessage('E-mail reenviado com sucesso!', 'success', 1500,'top-right', 'auto', false );
  }
};

</script>

<template>
    <!-- reenviar email e campo para token -->
    <v-container>
        <v-row>
            <v-col cols="12" md="6" class="mx-auto">
              <!-- campo para inserir token enviado -->

                <v-card>
                    <!-- token -->
                    <v-card-title class="text-center">
                        <h2 class="text-primary font-weight-bold text-h4">
                            Token
                        </h2>
                    </v-card-title>
                    <v-card-subtitle class="text-center">
                        <p>
                            Insira o token enviado para o seu e-mail.
                        </p>
                    </v-card-subtitle>
                    <v-card-text>
                        <v-form>
                            <v-text-field
                                v-model="token"
                                label="Token"
                                outlined
                                required
                                type="text"
                            />
                            <v-btn block color="primary" @click="getToken">
                                Confirmar
                            </v-btn>
                        </v-form>
                    </v-card-text>

                    <!-- reenviar email -->

                    <v-card-title class="text-center">
                        <h2 class="text-primary font-weight-bold text-h6 cursor-pointer" @click="resendToken">
                            Reenviar Token
                        </h2>
                    </v-card-title>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>