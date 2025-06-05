<template>
  <v-app-bar v-if="!isMobile" class="py-4" flat flex>
    <v-container class="mx-auto d-flex align-center justify-center">
      <img alt="" class="pr-8 cursor-pointer" src="@/assets/logo.png" @click="$router.push('/')" />
      <v-btn v-for="link in layoutStore.navbarDashboard" :key="link.text" class="mr-2" :color="link.value.split('/')[2] === layoutStore.currentPage.split('/')[2]
          ? 'primary'
          : ''
        " rounded="xl" :to="link.value" variant="text">
        {{ link.text }}
      </v-btn>

      <v-spacer />
      <p class="px-2">
      <!--  {{ authStore.user.name.split(' ').length >= 4 ? ( authStore.user.name.split(' ')[0] + ' ' + authStore.user.name.split(' ')[1]) : authStore.user.name }} -->
      </p>
      <v-btn class="rounded-xl justify-center" color="red" icon @click="logout()">
        <v-icon size="small"> mdi-logout </v-icon>
      </v-btn>
    </v-container>
  </v-app-bar>
  <v-app-bar v-else flat>
    <v-container>
    </v-container>
  </v-app-bar>
  <v-main>
    <slot />
  </v-main>
</template>

<script lang="ts" setup>
// @ts-ignore
import { useRouter } from "vue-router";
import { uselayout } from "@/stores/app";
import { useAuth } from "@/stores/auth";
import { useScreen } from "@/composables/composables";

const authStore = useAuth();
const { isMobile } = useScreen();

const router = useRouter();
const layoutStore = uselayout();
const logout = () => {
  router.push("/");
};

onMounted(() => {
  layoutStore.getSettings();
});
</script>
