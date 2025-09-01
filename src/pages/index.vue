<script lang="ts" setup>
import { useDisplay } from "vuetify";
import { ref, onBeforeMount } from 'vue';
import { useAuth } from "@/stores/auth";
import { downloadPdf } from "@/utils/user";

const authStore = useAuth();
const openNav = ref(false)
const { lgAndUp } = useDisplay();

import banner1 from '@/assets/home_banner.png';
import banner2 from '@/assets/home_banner2.jpg';
import banner3 from '@/assets/home_banner3.jpg';

const bannerImages = [
  banner1,
  banner2,
  banner3
];

const randomBanner = ref(bannerImages[0]);

onBeforeMount(() => {
  const randomIndex = Math.floor(Math.random() * bannerImages.length);
  randomBanner.value = bannerImages[randomIndex];
});
</script>

<template>
  <v-parallax
    :src="randomBanner"
    class="custom-parallax"
    height="100vh"
    gradient="rgba(0,0,0,0.69)"
  >
    <div class="mt-8 mx-6">
      <header class="d-flex justify-space-between">
        <a href="/about">
          <div class="d-flex align-center" style="user-select: none">
            <v-img src="@/assets/logotipo_painel_integracao.png" width="50" />
            <h2 class="font-weight-regular text-white ml-4">Painel</h2>
          </div>
        </a>

        <div>
          <div class="d-md-none d-flex">
            <VAppBarNavIcon color="white" @click="openNav = !openNav" />
          </div>

          <div class="d-md-flex d-none">
            <div v-if="authStore.isLogged" class="d-lg-flex d-none">
              <v-btn
                class="font-weight-bold d-flex"
                rounded="pill"
                size="x-large"
                color="primary"
                to="/panel/works"
              >
                Acessar Plataforma
              </v-btn>
            </div>

            <div v-else class="d-flex ga-4">
              <v-btn
                rounded="pill"
                size="x-large"
                color="white"
                variant="outlined"
                to="/auth/get-password"
              >
                Primeiro Acesso
              </v-btn>
              <v-btn
                class="font-weight-bold"
                rounded="pill"
                width="8vw"
                size="x-large"
                color="primary"
                to="/auth/login"
              >
                Entrar
              </v-btn>
            </div>
          </div>
        </div>
      </header>

      <div class="d-flex flex-column h-100" :class="lgAndUp ? 'w-50' : 'w-100'">
        <div class="h-screen d-flex flex-column justify-center align-md-center align-lg-start flex-wrap">
          <p
            class="d-flex text-white font-weight-bold"
            :class="lgAndUp ? 'text-start text-h2' : 'text-center text-h4'"
          >
            Painel de Integração IFC Araquari
          </p>

          <p
            class="mt-16 text-h5 text-white font-weight-light"
            :class="lgAndUp ? 'text-start' : 'text-center'"
          >
            Plataforma que organiza, acompanha e avalia os trabalhos acadêmicos da Semana de
            Integração
          </p>

          <div class="d-flex flex-wrap justify-lg-start justify-center mt-16 ga-5 ">
            <v-btn
              :rounded="lgAndUp ? 'pill' : 'rounded-0'"
              color="primary"
              :class="lgAndUp ? 'font-weight-regular' : 'font-weight-bold'"
              size="x-large"
              :to="lgAndUp ? '/panel/editions' : '/panel/works'"
              :append-icon="lgAndUp ? 'mdi-arrow-right-circle' : ''"
            >
              {{ lgAndUp ? 'Edição atual' : 'Acessar a Plataforma' }}
            </v-btn>

            <v-btn
              rounded="pill"
              size="x-large"
              class="font-weight-medium"
              append-icon="mdi-download"
              :variant="lgAndUp ? 'tonal' : 'text'"
              :color="lgAndUp ? 'white' : 'white'"
              @click="downloadPdf"
            >
              Regimento
            </v-btn>
          </div>

          <v-btn
            :class="lgAndUp ? 'd-none' : 'd-flex'"
            class="border border-primary mt-5 justify-self-center"
            color="info"
            prepend-icon="mdi-face-agent"
            rounded="xl"
            to="/user-support"
            variant="tonal"
          >
            Menu de Suporte
            <v-tooltip activator="parent" location="top">Menu de suporte</v-tooltip>
          </v-btn>
        </div>
      </div>

      <div class="d-flex mr-5 justify-lg-end justify-center">
        <v-btn
          :class="lgAndUp ? 'd-flex' : 'd-none'"
          class="border border-primary"
          color="info"
          rounded="xl"
          size="small"
          to="/user-support"
          variant="tonal"
        >
          <v-icon>mdi-help</v-icon>
          <v-tooltip activator="parent" location="top">Menu de suporte</v-tooltip>
        </v-btn>
      </div>
    </div>
  </v-parallax>

  <VNavigationDrawer v-model="openNav" location="right">
    <div class="ga-3 pa-5">
      <h1 class="text-center">Menu</h1>
    </div>

    <VDivider />

    <VList class="d-flex justify-center align-center flex-column">
      <div v-if="!authStore.isLogged" class="d-flex flex-column justify-center align-center">
        <VListItem to="/auth/get-password">
          <VListItemTitle class="bg-blue text-white pa-2 rounded-xl">
            Primeiro Acesso
          </VListItemTitle>
        </VListItem>

        <VListItem to="/auth/login">
          <VListItemTitle class="text-blue">Entrar</VListItemTitle>
        </VListItem>
      </div>

      <div v-else class="d-flex flex-column justify-center align-center">
        <VListItem>
          <VListItemTitle>{{ authStore.user.name }}</VListItemTitle>
        </VListItem>

        <VListItem>
          <VListItemTitle class="text-red" @click="authStore.logout()">
            Encerrar sessão
            <VIcon icon="mdi-logout" />
          </VListItemTitle>
        </VListItem>
      </div>
    </VList>
  </VNavigationDrawer>
</template>
