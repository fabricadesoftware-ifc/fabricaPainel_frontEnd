<script lang="ts" setup>
import { reactive, onMounted } from "vue";
import { useAuth } from "@/stores/auth";
import { usersData } from "@/utils/userMenu";
import { useRouter } from "vue-router"
const authStore = useAuth()
const router = useRouter()
const username = ref('')


onMounted(()=> {
  username.value = authStore.user.name
})


</script>

<template>
  <v-menu>
    <template v-slot:activator="{ props }">
      <v-btn variant="text" v-bind="props" style="height: 50px;">
        <span style="display: flex; align-items: center; justify-content: space-between; gap: 15px;">
          <div style="width: 40px; height: 40px;">
            <img class="h-100 w-100 rounded-pill" src="@/assets/images/user-image.png" />
          </div>

          <p style="font-size: 16px;">{{username}}</p>
         
           <img src="@/assets/icons/menu.svg" style="width: 14px; height: 14px;" alt="">
         
        </span>
      </v-btn>
    </template>

    <v-list class="cursor-pointer">
      <v-list-item @click="router.push(item.link)" class="d-flex flex-row align-center justify-center"
        v-for="(item, index) in usersData"
        :key="index"
        :value="index"
      >
        <v-list-item-title >
          {{ item.name }}
        </v-list-item-title>
      </v-list-item>
      <v-list-item @click="authStore.logout()" class="mt-10">
        <div class="d-flex flex-row justify-center align-center ga-2">
          <v-icon color="red" icon="mdi-logout" />
          <v-list-item-title style="font-weight: 600" class="text-red">Encerrar Sessão</v-list-item-title>
        </div>
      </v-list-item>
    </v-list>
  </v-menu>
</template>
