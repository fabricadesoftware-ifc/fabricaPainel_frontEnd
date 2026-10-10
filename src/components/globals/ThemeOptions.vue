<script lang="ts" setup>
import { uselayout } from "@/stores/app";

const layoutStore = uselayout();

const options = [
  { mode: "system", label: "Automático (sistema)", icon: "mdi-theme-light-dark" },
  { mode: "light", label: "Claro", icon: "mdi-white-balance-sunny" },
  { mode: "dark", label: "Escuro", icon: "mdi-weather-night" },
] as const;
</script>

<template>
  <v-list-subheader class="justify-center">Aparência</v-list-subheader>
  <v-list-item
    v-for="option in options"
    :key="option.mode"
    :active="layoutStore.themeMode === option.mode"
    color="primary"
    @click="layoutStore.setThemeMode(option.mode)"
  >
    <div class="d-flex flex-row align-center ga-3">
      <v-icon :icon="option.icon" size="small" />
      <v-list-item-title>{{ option.label }}</v-list-item-title>
      <v-icon v-if="layoutStore.themeMode === option.mode" icon="mdi-check" size="small" class="ml-auto" />
    </div>
  </v-list-item>
</template>
