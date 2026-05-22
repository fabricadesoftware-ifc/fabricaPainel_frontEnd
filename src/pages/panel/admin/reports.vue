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
  if (!canUseAdminArea.value) {
    router.push("/panel/works");
  }
});
</script>

<template>
  <LayoutPanel>
    <v-container class="reports-page" fluid>
      <div class="reports-panel">
        <v-icon color="primary" icon="mdi-file-chart-outline" size="56" />
        <p class="reports-eyebrow">Administrativo</p>
        <h1>Relatorios</h1>
        <p class="reports-message">Em breve</p>
        <p class="reports-description">
          A area de relatorios administrativos sera disponibilizada aqui.
        </p>
      </div>
    </v-container>
  </LayoutPanel>
</template>

<style scoped>
.reports-page {
  min-height: 58vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 48px 20px;
}

.reports-panel {
  width: min(100%, 520px);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  padding: 40px 28px;
  border: 1px solid rgba(15, 23, 42, 0.12);
  border-radius: 8px;
  background: #ffffff;
  text-align: center;
}

.reports-eyebrow {
  margin: 8px 0 0;
  color: #64748b;
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0;
  text-transform: uppercase;
}

.reports-panel h1 {
  margin: 0;
  color: #0f172a;
  font-size: 2rem;
  font-weight: 800;
}

.reports-message {
  margin: 0;
  color: #2563eb;
  font-size: 1.15rem;
  font-weight: 700;
}

.reports-description {
  max-width: 360px;
  margin: 0;
  color: #475569;
  font-size: 0.98rem;
}
</style>
