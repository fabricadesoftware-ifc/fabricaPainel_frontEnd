<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

const links = [
  {
    text: "Propostas",
    icon: "mdi-view-dashboard-outline",
    value: "/panel/admin/proposals",
  },
  {
    text: "Relatorios",
    icon: "mdi-file-chart-outline",
    value: "/panel/admin/reports",
  },
];

const currentPath = computed(() => route.path.replace(/\/$/, ""));

function isActive(value: string) {
  return currentPath.value === value;
}
</script>

<template>
  <nav class="admin-navigation" aria-label="Navegacao administrativa">
    <v-btn
      v-for="link in links"
      :key="link.value"
      :color="isActive(link.value) ? 'primary' : 'default'"
      :prepend-icon="link.icon"
      rounded="lg"
      :to="link.value"
      :variant="isActive(link.value) ? 'flat' : 'tonal'"
    >
      {{ link.text }}
    </v-btn>
  </nav>
</template>

<style scoped>
.admin-navigation {
  margin: 0 0 18px;
  display: flex;
  align-items: center;
  gap: 10px;
  overflow-x: auto;
  padding-bottom: 2px;
}

@media (max-width: 560px) {
  .admin-navigation {
    align-items: stretch;
    flex-direction: column;
  }
}
</style>
