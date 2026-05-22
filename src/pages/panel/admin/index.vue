<script setup lang="ts">
import { computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useAuth } from "@/stores/auth";

const router = useRouter();
const authStore = useAuth();

const canUseAdminArea = computed(() => {
  return authStore.user?.user_type === "ADMIN" || Boolean(authStore.user?.is_management);
});

onMounted(() => {
  router.replace(canUseAdminArea.value ? "/panel/admin/proposals" : "/panel/works");
});
</script>

<template>
  <LayoutPanel>
    <v-container class="d-flex align-center justify-center py-16">
      <v-progress-circular color="primary" indeterminate size="48" />
    </v-container>
  </LayoutPanel>
</template>
