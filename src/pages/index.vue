<script lang="ts" setup>
import { useScreen } from "@/composables/composables";
import { useAuth } from "@/stores/auth";
// import { useDisplay } from "vuetify";

const authStore = useAuth();

const { isMobile } = useScreen();

onMounted(() => {
  console.log(isMobile.value);
});

function downloadPdf() {
  const link = document.createElement('a');
  link.href = '/orientacoes.pdf';
  link.download = 'orientacoes.pdf';
  link.target = '_blank';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
</script>

<style>
/* @media (max-width: 1250px) {
  .custom-parallax {
    height: 1000px;
  }
} */
</style>

<template>

  <body>
    <v-parallax src="@/assets/home_banner.png" class="custom-parallax" gradient="rgba(0,0,0,0.69)">
      <div class="my-8 mx-12">
        <header class="d-flex justify-space-between">
          <div class="d-flex align-center" style="user-select: none">
            <v-img src="@/assets/logotipo_painel_integracao.png" width="50" />
            <h2 class="font-weight-regular text-white ml-4">Painel</h2>
          </div>
          <div v-if="authStore.isLogged">
            <v-btn class="font-weight-bold" rounded="pill" width="250px" height="60px" color="primary"
              to="/panel/works">Acessar Plataforma</v-btn>
          </div>
          <div v-else class="d-flex ga-4">
            <v-btn rounded="pill" width="8vw" size="x-large" color="white" variant="outlined"
              to="/auth/get-password">Registro</v-btn>
            <v-btn class="font-weight-bold" rounded="pill" width="8vw" size="x-large" color="primary"
              to="/auth/login">Login</v-btn>
          </div>
        </header>
        <main class="d-flex flex-column w-50 h-100">
          <div class="h-screen d-flex flex-column justify-center">
            <p class="d-flex text-white text-h1 font-weight-bold">
              Painel da Semana de Integração
            </p>
            <p class="mt-16 text-h5 text-white font-weight-regular">
              Painel designado a SEPE do IFC, que administra e avalia os
              trabalhos dos estudantes
            </p>
            <div class="d-flex ga-5" style="margin-top: 150px">
              <v-btn rounded="pill" color="primary" class="font-weight-regular" size="x-large" to="/panel/editions"
                append-icon="mdi-arrow-right-circle">Edição atual
              </v-btn>
              <v-btn rounded="pill" size="x-large" class="font-weight-medium" append-icon="mdi-download"
                @click="downloadPdf">
                Orientações
              </v-btn>
            </div>
          </div>
        </main>
        <div class="d-flex mt-5" style="justify-content: end">
          <v-btn rounded="lg" variant="text" class="d-flex text-h5 align-center text-white" color="white"
            append-icon="mdi-arrow-down-bold-circle" style="">
            <v-text>Explore o painel</v-text>
          </v-btn>
        </div>
      </div>
    </v-parallax>
  </body>

</template>