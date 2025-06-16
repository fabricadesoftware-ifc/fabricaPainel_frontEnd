<script lang="ts" setup>
import { useScreen } from "@/composables/composables";
import { useAuth } from "@/stores/auth";
import { useDisplay } from "vuetify";

const authStore = useAuth();

const { isMobile } = useScreen();

onMounted(() => {
  console.log(isMobile.value);
});
</script>

<template>
  <body>
    <v-parallax>
      <v-img src="@/assets/home_banner.png" gradient="rgba(0,0,0,0.69)" cover>
        <div 
          class="my-8"
          :class="isMobile? 'mx-6' : 'mx-12'"
        >
          <header class="d-flex justify-space-between">
            <div class="d-flex align-center" style="user-select: none">
              <v-img
                src="@/assets/logotipo_painel_integracao.png" 
                :height="isMobile ? 27 : 52"
                :width="isMobile ? 25 : 46"
              />
              <h2
                class="font-weight-regular text-white"
                :class="isMobile ? 'ml-2' : 'ml-4'"
              >
                Painel
              </h2>
            </div>
            <div v-if="authStore.isLogged">
              <v-btn
                v-if="!isMobile"
                class="font-weight-bold"
                rounded="pill"
                width="250px"
                height="60px"
                color="primary"
                to="/panel/works"
                >Acessar Plataforma</v-btn
              >
            </div>
            <div v-else class="d-flex ga-8">
              <v-btn
                v-if="!isMobile"
                rounded="pill"
                width="160px"
                height="50px"
                theme="dark"
                style="
                  font-size: 19px;
                  border: 1px, solid, rgba(234, 234, 234, 0.17);
                  font-weight: 500;
                "
                to="/auth/login"
                >Registro</v-btn
              >
              <v-btn
                v-if="!isMobile"
                rounded="pill"
                width="160px"
                height="50px"
                color="primary"
                style="font-size: 20px; font-weight: 700"
                to="/auth/login"
                >Login</v-btn
              >
            </div>
          </header>
          <main>
            <div class="h-screen d-flex flex-column" 
            :style="{
              marginTop: '50px',
              alignItems: isMobile ? 'center' : ''
              }">
              <h1
                class="text-white"
                :style="{
                  fontSize: isMobile ? '32px' : '64px',
                  lineHeight: 1.3,
                  letterSpacing: '2px',
                  fontWeight: isMobile ? 500 : 550,
                  textAlign: isMobile ? 'center' : 'left',
                  width: isMobile ? '100%' : '910px',
                  marginTop: isMobile ? '35%' : '85px',
                }"
              >
                Painel da Semana de Integração
              </h1>
              <h2
                class="text-white font-weight-regular"
                :style="{
                  fontSize: isMobile ? '14px' : '24px',
                  textAlign: isMobile ? 'center' : 'left',
                  width: isMobile ? '340px' : '733px',
                  lineHeight: 1.4,
                  marginTop: isMobile ? '35px' : '80px',
                }"
              >
                Painel designado a SEPE do IFC, que administra e avalia os
                trabalhos dos estudantes
              </h2>
              <div
                :style="{
                  marginTop: isMobile ? '35px' : '150px',
                  display: 'flex',
                  flexDirection: isMobile ? 'column' : 'row',
                  gap: isMobile ? '6px' : '35px',
                  alignItems: 'center'
                }"
              >
                <v-btn
                  v-if="!isMobile"
                  rounded="pill"
                  width="221"
                  height="54"
                  color="primary"
                  class="font-weight-regular"
                  style="font-size: 22px; letter-spacing: 0"
                  to="/panel/editions"
                  >Edição atual
                  <v-img
                    src="@/assets/vector.svg"
                    width="12px"
                    height="8.92"
                    class="ml-3"
                  />
                </v-btn>
                <v-btn
                  v-if="isMobile"
                  class="font-weight-bold"
                  rounded="lg"
                  width="250px"
                  height="60px"
                  color="primary"
                  to="/panel/works"
                >
                  Acessar Plataforma
                </v-btn>
                <v-btn
                  rounded="pill"
                  :width="270"
                  :height="54"
                  class="font-weight-regular no-uppercase"
                  :style="{
                    fontSize: isMobile ? '16px' : '21px',
                    letterSpacing: 0,
                    backgroundColor: isMobile ? 'transparent' : '',
                    color: isMobile ? 'white' : '',
                    boxShadow: isMobile ? 'none' : '',
                  }"
                >
                  <a
                    href="/public/2024- PAINEL DE INTEGRAÇÃO DO IFC - 2024.docx.pdf"
                    download="Regimento_Painel_de_Integração_IFC-2024"
                    style="color: inherit; text-decoration: none;"
                  >
                    Ler Regulamentação
                  </a>
                </v-btn>
              </div>
            </div>
            <div 
              class="d-flex" 
              :style="{
                justifyContent: isMobile ? 'center' : 'end',
              }">
              <v-btn
                rounded="lg"
                class="d-flex align-center text-white"
                style="font-weight: 400; font-size: 23px; box-shadow: none;"
                color="transparent"
              >
                <v-text
                  :class="isMobile ? 'text-body-2' : 'text-h6'"
                >
                  Explore o painel
                </v-text>
                <span class="ml-3">
                  <v-img src="@/assets/vector.svg" width="12px" height="8.92" />
                </span>
              </v-btn>
            </div>
          </main>
        </div>
      </v-img>
    </v-parallax>
  </body>

</template>
