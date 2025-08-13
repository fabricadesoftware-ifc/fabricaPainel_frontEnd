<script setup>
import auth from "@/services/auth";
import { useAuth } from "@/stores/auth";

const authStore = useAuth();

const themes = ref([]);

onMounted(async () => {
  await authStore.getUserThemes();
  themes.value = authStore.userThemes;
});
</script>
<template>
  <v-row>
    <v-col v-if="authStore.isLogged && authStore.user.user_type == 'TEACHER'">
      <h1 class="text-h5 py-4 font-weight-bold">Meus Temas</h1>
      <div v-if="themes.length > 0">
        <p>
          <v-chip
            v-for="(theme, index) in themes"
            :key="theme.id"
            class="ma-1"
            color="primary"
          >
            {{ theme.name }}
          </v-chip>
        </p>
        <v-btn
          color="primary"
          @click="$router.push('/panel/registration-of-topics')"
          class="py-6 rounded-xl d-flex text-center align-center mt-5"
          >Editar Temas</v-btn
        >
      </div>
      <div v-else>
        <p>Você não possui temas cadastrados</p>
      </div>
    </v-col>
  </v-row>
</template>
