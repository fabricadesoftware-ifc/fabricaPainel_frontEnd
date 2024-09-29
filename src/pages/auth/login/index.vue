<script setup>
import { ref } from "vue";
import { showMessage } from "@/utils/toastify";
import { useRouter } from "vue-router";
import { useAuth } from "@/stores/auth";

const router = useRouter();
const authStore = useAuth();

const email = ref("");
const password = ref("");

const login = async () => {
  try {
    await authStore.login(email.value, password.value);
    router.push("/");
  } catch (error) {
    showMessage("Credenciais inválidas", "error", 1500, "top-right", "auto", false);
  }
};

</script>

<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="6" class="mx-auto">
        <v-card>
          <v-card-title class="text-center">
            <h2 class="text-primary font-weight-bold text-h4">Login</h2>
          </v-card-title>
          <v-card-text>
            <v-form>
              <v-text-field
                v-model="email"
                label="Email"
                outlined
                required
                type="email"
              />
              <v-text-field
                v-model="password"
                label="Senha"
                outlined
                required
                type="password"
              />
              <v-btn block color="primary" @click="login"> Entrar </v-btn>
            </v-form>

            <!-- //login pela primeira vez redireciona para auth/signin abaixo -->

            <p class="text-center mt-4" style="font-size: 0.9rem">
              <router-link to="/auth/get-password" class="text-decoration-none text-primary"
                >Primeira vez ou esqueceu a senha? Clique aqui</router-link
              >
            </p>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
