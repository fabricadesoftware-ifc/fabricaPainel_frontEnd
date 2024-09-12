<template>
  <v-app>
    <v-main>
      <router-view />
    </v-main>
    <div class="index">
      <router-link to="/">
        INSTITUCIONAL
      </router-link>
      <router-link to="/dashboard/editions">
        DASHBOARD
      </router-link>
      <router-link to="/panel">
        PANEL
      </router-link>
    </div>
  </v-app>
</template>

<script lang="ts" setup>
  //
</script>

<style scoped>
.index {
  z-index: 1000;
  margin: 10px;
  font-size: .7rem;
  display: flex;
  flex-direction: column;
  gap: 5px;
  position: fixed;
  top: 0;
  left: 0;
  text-transform: uppercase;
  cursor: pointer;
}
</style>
