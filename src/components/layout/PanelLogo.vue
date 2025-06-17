<template>
      <header class="d-flex mt-3 mt-sm-5 mx-4 mx-sm-8 mx-md-12 justify-space-between">
      <router-link class="d-flex align-center" to="/" style="user-select: none">
        <v-img src="@/assets/logotipo_painel_integracao.png" :height="$vuetify.display.xs ? '60' : '100'"
          :width="$vuetify.display.xs ? '28' : '46'" />
        <h2 class="logo--title font-weight-regular text-white ml-2 ml-sm-4"
          :class="$vuetify.display.xs ? 'text-h6' : ''">Painel
        </h2>
      </router-link>
    </header>
</template>