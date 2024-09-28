<script setup>
import { ref } from "vue";
import { showMessage } from "@/utils/toastify";
import { useRouter } from "vue-router";
import { useAuth } from "@/stores/auth";

const router = useRouter();

const password = ref("");
const confirmPassword = ref("");

const validateAndConfirmPassword = () => {
  if (password.value !== confirmPassword.value) {
    showMessage(
      "As senhas não coincidem",
      "error",
      1500,
      "top-right",
      "auto",
      false
    );
    return false;
  }

  if (password.value.length < 8 || !/^\d+$/.test(password.value)) {
    showMessage(
      "A senha deve ter no mínimo 8 caracteres e conter letras e números",
      "error",
      1500,
      "top-right",
      "auto",
      false
    );
    return false;
  }

  return true;
};

const resetPassword = async () => {
  try {
    if (!validateAndConfirmPassword()) return;
    await authStore.resetPassword(password.value);
  } catch (error) {
    showMessage(
      "Falha ao resetar a senha",
      "error",
      1500,
      "top-right",
      "auto",
      false
    );
  } finally {
    router.push("/auth/login");
    showMessage(
      "Senha resetada com sucesso!",
      "success",
      1500,
      "top-right",
      "auto",
      false
    );
  }
};
</script>

<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="6" class="mx-auto">
        <v-card>
          <v-card-title class="text-center">
            <h2 class="text-primary font-weight-bold text-h4">Nova Senha</h2>
          </v-card-title>
          <v-card-subtitle class="text-center">
            <p>Insira a nova senha e confirme.</p>
          </v-card-subtitle>
          <v-card-text>
            <v-form>
              <v-text-field
                v-model="password"
                label="Nova Senha"
                outlined
                required
                type="password"
              />
              <v-text-field
                v-model="confirmPassword"
                label="Confirmar Senha"
                outlined
                required
                type="password"
              />
              <v-btn block color="primary" @click="resetPassword">
                Enviar
              </v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
