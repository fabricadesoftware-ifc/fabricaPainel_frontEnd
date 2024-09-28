<script setup>
import { useRouter } from "vue-router";
import { useAuth } from "@/stores/auth";
import auth from "@/services/auth";

const router = useRouter();
const authStore = useAuth();

const login = () => {
  router.push("/auth/login");
};

const logout = () => {
  authStore.logout();
  router.push("/");
};
</script>

<template>
  <v-container class="w-lg-75" fluid>
    <section class="py-16 my-16">
      <TitleH1
        content="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged."
        text="Sistema de Avaliação"
      />
      <div class="w-50 pt-16 pl-2 ml-auto mr-0 d-flex ga-4">
        <v-btn
          v-if="!authStore.isLogged"
          @click="login"
          color="primary"
          rounded="xl"
          size="large"
          text="ENTRAR"
          variant="flat"
        >
        </v-btn>
      </div>
    </section>
  </v-container>
</template>
