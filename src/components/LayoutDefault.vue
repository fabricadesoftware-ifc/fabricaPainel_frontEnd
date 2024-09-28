<template>
  <v-app id="inspire">
    <v-app-bar class="py-4" flat>
      <v-container class="w-lg-75 d-flex align-center justify-center" fluid>
        <img alt="" class="pr-8" src="@/assets/logo.png" />
        <v-btn
          v-for="link in layoutStore.navbar"
          :key="link.text"
          class="mr-1"
          :color="link.value == layoutStore.currentPage ? 'primary' : ''"
          rounded="xl"
          :text="link.text"
          :to="link.value"
          variant="text"
        />

        <v-spacer />
        <v-btn
          v-if="!authStore.isLogged"
          @click="login"
          color="primary"
          rounded="xl"
          variant="flat"
          class="d-flex"
        >
          <p>ENTRAR</p>
          <v-icon>mdi-login</v-icon>
        </v-btn>

        <v-btn
          v-else
          @click="logout"
          color="primary"
          rounded="xl"
          variant="flat"
        >
          <p>{{authStore.user.name}}</p>
          <v-icon color="red">mdi-logout</v-icon>
        </v-btn>
      </v-container>
    </v-app-bar>
    <v-main>
      <slot />
    </v-main>
    <FooterComp />
  </v-app>
</template>

<script setup>
import { uselayout } from "@/stores/app";
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import { useAuth } from "@/stores/auth";
import { showMessage } from "@/utils/toastify";

const router = useRouter();
const layoutStore = uselayout();
const authStore = useAuth();

const login = () => {
  router.push("/auth/login");
};

const logout = () => {
  authStore.logout();
  showMessage("Deslogado com sucesso", "success", 1500, "top-right", "auto", false);
  router.push("/");
};

onMounted(() => {
  layoutStore.getSettings();
});
</script>
