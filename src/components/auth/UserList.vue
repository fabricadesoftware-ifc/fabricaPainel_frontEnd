<script setup>
import { useAuth } from '@/stores/auth';
const authStore = useAuth();
const props = defineProps(['user', 'myUser'])
</script>

<template>
  <v-list-item
    class="bg-grey-lighten-4 rounded-lg pa-2 px-4 overflow-hidden"
    :subtitle="props.user.email"
    :title="props.user.name"
  >
    <template #title="{ title }">
      <v-tooltip :text="title">
        <template #activator="{ props: propsActivator }">
          <p v-bind="propsActivator" class="cursor-pointer d-inline-block text-truncate text-capitalize" :style="props.myUser ? 'max-width: 100%' : 'max-width: 60%'">
            {{ title.toLowerCase() }} {{ props.user.id == authStore.user.id ? "(Você)" : "" }}
          </p>
        </template>
      </v-tooltip>
    </template>
    <template #subtitle="{ subtitle }">
      <v-tooltip :text="subtitle">
        <template #activator="{ props: propsActivator }">
          <p v-bind="propsActivator" class="cursor-pointer d-inline-block text-truncate">
            {{ subtitle }}
          </p>
        </template>
      </v-tooltip>
    </template>
    <template #append>
      <slot name="status" />
    </template>
  </v-list-item>
</template>
