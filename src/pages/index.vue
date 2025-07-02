<script lang="ts" setup>
import { useAuth } from "@/stores/auth";
import { useDisplay } from "vuetify";
import { downloadPdf } from "@/utils/user";
const authStore = useAuth();
const { lgAndUp } = useDisplay()

</script>

<style>
@media (max-width: 1250px) {
  .custom-parallax {
    height: 1000px;
  }
}
</style>

<template>

  <body>
    <v-parallax src="@/assets/home_banner.png" class="custom-parallax" gradient="rgba(0,0,0,0.69)">
      <div class="my-8 mx-6">
        <header class="d-flex justify-space-between">
          <div class="d-flex align-center" style="user-select: none">
            <v-img src="@/assets/logotipo_painel_integracao.png" width="50" />
            <h2 class="font-weight-regular text-white ml-4">Painel</h2>
          </div>
          <div v-if="authStore.isLogged">
            <v-btn class="font-weight-bold d-lg-flex d-md-flex d-none" rounded="pill" size="x-large" color="primary"
              to="/panel/works">Acessar Plataforma</v-btn>
          </div>
          <div v-else class="d-lg-flex d-none ga-4">
            <v-btn rounded="pill" size="x-large" color="white" variant="outlined" to="/auth/get-password">Primeiro
              Acesso</v-btn>
            <v-btn class="font-weight-bold" rounded="pill" width="8vw" size="x-large" color="primary"
              to="/auth/login">Entrar</v-btn>
          </div>
        </header>
        <div class="d-flex flex-column h-100" :class="lgAndUp ? 'w-50' : 'w-100'">
          <div class="h-screen d-flex flex-column justify-center align-md-center align-lg-start">
            <p class="d-flex text-white font-weight-bold"
              :class="lgAndUp ? 'text-start text-h2' : 'text-center text-h4'">
              Painel de Integração IFC Araquari
            </p>
            <p class="mt-16 text-h5 text-white font-weight-light" :class="lgAndUp ? 'text-start' : 'text-center'">
              Plataforma que organiza, acompanha e avalia os trabalhos acadêmicos da Semana de Integração
            </p>
            <div class="d-flex flex-wrap justify-lg-start justify-center mt-16 ga-5 ">
              <v-btn :rounded="lgAndUp ? 'pill' : 'rounded-0'" color="primary"
                :class="lgAndUp ? 'font-weight-regular' : 'font-weight-bold'" size="x-large"
                :to="lgAndUp ? '/panel/editions' : '/panel/works'"
                :append-icon="lgAndUp ? 'mdi-arrow-right-circle' : ''">
                {{ lgAndUp ? 'Edição atual' : 'Acessar a Plataforma' }}
              </v-btn>
              <v-btn rounded="pill" size="x-large" class="font-weight-medium" append-icon="mdi-download"
                :variant="lgAndUp ? 'tonal' : 'text'" :color="lgAndUp ? 'white' : 'white'" @click="downloadPdf">
                Orientações
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
  </body>

</template>