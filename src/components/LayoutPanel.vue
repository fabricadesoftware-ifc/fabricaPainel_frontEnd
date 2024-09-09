<template>
  <div class="min-h-screen">
    <v-app-bar class="py-4" flat>
      <v-container class="mx-auto d-flex align-center justify-center">
        <img alt="" class="pr-8" src="@/assets/logo.png">
        <v-spacer />
        <p
          class="px-2"
        >
          Nome de usuário
        </p>
        <v-btn
          class="rounded-xl justify-center"
          color="red"
          icon
          @click="logout()"
        >
          <v-icon size="small">
            mdi-logout
          </v-icon>
        </v-btn>
      </v-container>
    </v-app-bar>
    <v-main>
      <slot />
    </v-main>
    <footer class="pt-16 pb-2">
      <v-row>
        <v-col class="d-flex justify-start align-center" cols="10">
          <img class="h-8" src="@/assets/footer_logos.png">
        </v-col>
        <v-col class="d-flex justify-end align-center">
          <v-btn
            class="border border-primary"
            color="info"
            icon="mdi-help"
            rounded="xl"
            size="small"
            variant="tonal"
          />
        </v-col>
      </v-row>
    </footer>
  </div>
</template>

<script lang="ts" setup>
  import { useRouter } from 'vue-router'
  import { uselayout } from '@/stores/app'

  const router = useRouter()
  const layoutStore = uselayout()

  const logout = () => {
    router.push('/')
  }

  onMounted(() => {
    layoutStore.getSettings()
  })
</script>
