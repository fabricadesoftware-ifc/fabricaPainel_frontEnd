<script lang="ts" setup>
// @ts-nocheck
import { useRouter } from "vue-router";
import { uselayout } from "@/stores/app";
import { useAuth } from "@/stores/auth";
import { showMessage } from "@/utils/toastify";
import { useScreen } from "@/composables/composables";

const { isMobile } = useScreen();
const router = useRouter();
const layoutStore = uselayout();
const authStore = useAuth();

const logout = () => {
  showMessage(
    "Deslogado com sucesso",
    "success",
    1500,
    "top-right",
    "auto",
    false
  );
  authStore.logout();
  router.push("/");
};

const login = () => {
  router.push("/auth/login");
};

const screenWidth = ref(0);

onMounted(() => {
  layoutStore.getSettings();
  window.addEventListener("resize", () => {
    screenWidth.value = window.innerWidth;
  });
  screenWidth.value = window.innerWidth;
});
</script>
<template>
  <div class="min-h-screen">
    <v-container
      v-if="!isMobile"
      class="mx-auto w-100 d-flex align-center justify-space-between"
    >
      <div class="d-flex ga-5 align-center h-100">
        <img
          alt=""
          style="width: 90px; height: 60px"
          class="pr-8 cursor-pointer"
          src="@/assets/logotipo_painel_integracao.png"
          @click="$router.push('/')"
        />
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
      </div>

      <UserMenu />
    </v-container>
    <v-container
      v-if="isMobile"
      class="mx-auto d-flex align-center justify-between"
    >
      <div
        class="d-flex justify-space-between ml-5"
        :class="{ 'justify-items-start': screenWidth > 580 }"
        style="width: 100%"
      >
        <img
          alt=""
          style="width: 70px; height: 40px"
          class="pr-8 cursor-pointer"
          src="@/assets/logotipo_painel_integracao.png"
          @click="$router.push('/')"
        />
        <div>
          <v-menu activator="parent">
            <!-- @vue-ignore -->
            <template #activator="{ on }">
              <v-btn color="primary" rounded="xl" variant="flat" v-on="on">
                <v-icon>mdi-menu</v-icon>
              </v-btn>
            </template>
            <v-list >
              <v-list-item>
                <p style="font-size: 15px; font-weight: 500">
                  {{ authStore?.user?.name }}
                </p>
              </v-list-item>
              <v-list-item class="d-flex flex-row align-center justify-center"
                v-for="link in layoutStore.navbar"
                :key="link.text"
                :color="link.value == layoutStore.currentPage ? 'primary' : ''"
                @click="router.push(link.value)"
              >
                <v-list-item-title>{{ link.text }}</v-list-item-title>
              </v-list-item>
              <v-list-item @click="authStore.logout()" class="mt-10">
                <div class="d-flex flex-row justify-center align-center ga-2">
                  <v-icon color="red" icon="mdi-logout" />
                  <v-list-item-title style="font-weight: 600" class="text-red"
                    >Encerrar Sessão</v-list-item-title
                  >
                </div>
              </v-list-item>
            </v-list>
          </v-menu>
        </div>
      </div>
    </v-container>

    <v-main :class="{ 'pt-4': screenWidth < 580 }">
      <slot />
    </v-main>
    <footer class="pt-16 pb-2 px-6">
      <v-container>
        <v-row>
          <v-col class="d-flex justify-start align-center" cols="6" md="10">
            <a href="https://fabricadesoftware.ifc.edu.br/">
              <img class="h-8" src="@/assets/footer_logos.png" />
            </a>
          </v-col>
          <v-col class="d-flex justify-end align-center" cols="6" md="2">
            <v-btn
              class="border border-primary"
              color="info"
              icon="mdi-help"
              rounded="xl"
              size="small"
              to="/"
              variant="tonal"
            />
          </v-col>
        </v-row>
      </v-container>
    </footer>
  </div>
</template>
