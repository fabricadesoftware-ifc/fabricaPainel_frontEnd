<script lang="ts" setup>
// @ts-ignore
import { onMounted, ref } from "vue";
// @ts-ignore
import { useRouter } from "vue-router"
import { useAuth } from "@/stores/auth";
import { usersData } from "@/utils/userMenu";
import { downloadPdf } from "@/utils/user";
import { useDisplay } from "vuetify";
const authStore = useAuth()
const router = useRouter()
const username = ref('')

const { width } = useDisplay()

onMounted(() => {
  username.value = authStore.user.name
})


</script>

<template>
  <v-menu>
    <template v-slot:activator="{ props }">
      <v-btn variant="text" v-bind="props" style="height: 50px;">
        <span style="display: flex; align-items: center; justify-content: space-between; gap: 15px;">
          <!-- <div :style="{ width: width > 780 ? '40px' : '30px', height: width > 780 ? '40px' : '30px' }">
            <img class="h-100 w-100 rounded-pill" src="@/assets/images/user-image.png" />
          </div> -->

          <p :style="{ fontSize: width > 780 ? '16px' : '12px' }">{{ username }}</p>

          <!-- <img src="@/assets/icons/menu.svg" style="width: 14px; height: 14px;" alt=""> -->
          <v-icon size="x-large">mdi-chevron-down</v-icon>

        </span>
      </v-btn>
    </template>

    <v-list class="cursor-pointer mt-3 pa-2">
      <v-list-item @click="item.action == 'navigate' ? router.push(item.link) : downloadPdf()"
        class="d-flex flex-row align-center justify-center " v-for="(item, index) in usersData" :key="index"
        :value="index">
        <v-list-item-title>
          {{ item.name }}
        </v-list-item-title>
      </v-list-item>
      <v-list-item @click="authStore.logout()" class="mt-6">
        <div class="d-flex flex-row justify-center align-center ga-2">
          <v-icon color="red" icon="mdi-logout" />
          <v-list-item-title style="font-weight: 600" class="text-red">Encerrar Sessão</v-list-item-title>
        </div>
      </v-list-item>
    </v-list>
  </v-menu>
</template>
