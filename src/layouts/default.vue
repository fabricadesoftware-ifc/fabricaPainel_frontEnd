<template>
  <v-app id="inspire">
    <v-app-bar flat class="bg-transparent">
      <v-container class="mx-auto d-flex align-center justify-center">
        <img src="@/assets/logo.png" class="pr-8" alt="">
        <v-btn
          rounded="xl"
          v-for="link in links"
          :key="link.text"
          :text="link.text"
          variant="text"
          :color="link.value == '/' ? 'primary' : ''"
          class="mr-2"
          :to="link.value"
        ></v-btn>
        
        <v-spacer></v-spacer>
        <v-btn
          variant="text"
          rounded="xl"
          class="mr-2"
          text="Nome de usuário"
        ></v-btn>
        <v-avatar
          color="grey-darken-1"
          size="32"
        ></v-avatar>
        
      </v-container>
    </v-app-bar>
    <v-main>
      <v-divider class="my-2"></v-divider>
      <v-container>
        <v-row>
          <v-col cols="2">
            <v-sheet class="bg-transparent">
              <v-btn
                rounded="xl"
                variant="plain"
                block
                class=""
                text="Atual"
                to="/"
              ></v-btn>
              <v-btn
                rounded="xl"
                variant="plain"
                block
                class="my-4"
                text="Anteriores"
                to="/"
              ></v-btn>
              <v-divider class="my-2"></v-divider>
              <v-btn
                rounded="xl"
                variant="plain"
                block
                class="my-4 border-thin"
                text="Nova edição"
                to="/"
              ></v-btn>
            </v-sheet>
          </v-col>

          <v-col>
            <v-sheet
              min-height="70vh"
              rounded="xl"
              class="bg-transparent"
            >
              
              <router-view />
            </v-sheet>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
    <footer>
      <v-container class="py-4">
        <v-row no-gutters>
          <v-col class="d-flex justify-start align-center" cols="10">
            <img src="@/assets/Logo_IFC_extendida_araquari.png" height="64px" alt="">
            <img src="@/assets/logo_FABRICA.png" height="64px" class="pt-3 pl-3" alt="">            
          </v-col>
          <v-col class="d-flex justify-end align-center">
            <v-btn
                rounded="xl"
                variant="tonal"
                class="border border-primary"
                to="/"
                size="small"
                color="info"
                icon="mdi-help"
              ></v-btn>
          </v-col>
        </v-row>
      </v-container>
    </footer>
  </v-app>
</template>

<script setup>
  const links = [
    {
      text: 'Edições',
      value: '/'
    }, {
      text: 'Colaboradores',
      value: '/colaborators'
    }, {
      text: 'Configurações',
      value: '/settings'
    }
  ]
</script>
