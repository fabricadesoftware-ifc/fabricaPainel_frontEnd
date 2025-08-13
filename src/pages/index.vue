<script lang="ts" setup>
import { useAuth } from "@/stores/auth";
import { useDisplay } from "vuetify";
import { downloadPdf } from "@/utils/user";
const authStore = useAuth();
const { lgAndUp } = useDisplay()
const openNav = ref(false)
</script>

<style>
@media (max-width: 1250px) {
  .custom-parallax {
    height: 1000px;
  }
}
</style>

<template>
  <v-parallax src="@/assets/home_banner.png" class="custom-parallax" gradient="rgba(0,0,0,0.69)">
    <div class="my-8 mx-6">
      <header class="d-flex justify-space-between">
        <div class="d-flex align-center" style="user-select: none">
          <v-img src="@/assets/logotipo_painel_integracao.png" width="50" />
          <h2 class="font-weight-regular text-white ml-4">Painel</h2>
        </div>
        <div>
          <div class="d-md-none d-flex">
            <VAppBarNavIcon color="white" @click="openNav = !openNav"></VAppBarNavIcon>
          </div>
          <div class="d-md-flex d-none">
            <div v-if="authStore.isLogged" class="d-lg-flex d-none">
              <v-btn class="font-weight-bold d-flex" rounded="pill" size="x-large" color="primary"
              to="/panel/works">Acessar Plataforma</v-btn>
            </div>
          <div v-else class="d-flex ga-4">
            <v-btn rounded="pill" size="x-large" color="white" variant="outlined" to="/auth/get-password">Primeiro
              Acesso</v-btn>
            <v-btn class="font-weight-bold" rounded="pill" width="8vw" size="x-large" color="primary"
              to="/auth/login">Entrar</v-btn>
          </div>
          </div>
        </div>
      </header>
      <div class="d-flex flex-column h-100" :class="lgAndUp ? 'w-50' : 'w-100'">
        <div class="h-screen d-flex flex-column justify-center align-md-center align-lg-start">
          <p class="d-flex text-white font-weight-bold" :class="lgAndUp ? 'text-start text-h2' : 'text-center text-h4'">
            Painel de Integração IFC Araquari
          </p>
          <p class="mt-16 text-h5 text-white font-weight-light" :class="lgAndUp ? 'text-start' : 'text-center'">
            Plataforma que organiza, acompanha e avalia os trabalhos acadêmicos da Semana de Integração
          </p>
          <div class="d-flex flex-wrap justify-lg-start justify-center mt-16 ga-5 ">
            <v-btn rounded="pill" color="primary" class="font-weight-regular" size="x-large" to="/panel/works"
              append-icon="mdi-arrow-right-circle">
              Acessar Plataforma
            </v-btn>
            <v-btn rounded="pill" size="x-large" class="font-weight-medium" append-icon="mdi-download"
              :variant="lgAndUp ? 'tonal' : 'text'" :color="lgAndUp ? 'white' : 'white'" @click="downloadPdf">
              Regimento
            </v-btn>
          </div>
        </div>
      </div>
      <div class="d-flex mt-2 justify-lg-end justify-center">
        <v-btn rounded="lg" variant="text" class="d-flex text-h5 align-center text-white" color="white"
          append-icon="mdi-arrow-down-bold-circle" style="">
          <v-text>Explore o painel</v-text>
        </v-btn>
      </div>
    </div>
  </v-parallax>
  <VNavigationDrawer v-model="openNav" location="right">
      <div class=" ga-3 pa-5">
        <h1 class="text-center">Menu</h1>
      </div>
    <VDivider></VDivider>
    <VList class="d-flex justify-center align-center flex-column">
        <div v-if="!authStore.isLogged" class="d-flex flex-column justify-center align-center">
          <VListItem to="/auth/get-password"> 
              <VListItemTitle class="bg-blue text-white pa-2 rounded-xl">
                  Primeiro Acesso
              </VListItemTitle>
          </VListItem>
          <VListItem to="/auth/login">
            <VListItemTitle class="text-blue">
                Entrar
            </VListItemTitle>
          </VListItem>
        </div>
        <div v-else class="d-flex flex-column justify-center align-center">
          <VListItem> 
              <VListItemTitle>
                  {{ authStore.user.name }}
              </VListItemTitle>
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