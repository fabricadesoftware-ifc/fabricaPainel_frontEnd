<template>
  <v-alert
    v-model="alert"
    class="rounded-xl py-6"
    :closable="closable"
    close-label="Close Alert"
    :type="props.color"
    variant="tonal"
  >
    <p>
      {{ props.title }}
    </p>
    <p>
      {{ props.description }}
    </p>
  </v-alert>
  <div v-if="props.to" class="d-flex justify-end mt-2">
    <v-btn
      class="rounded-xl mb-6"
      :color="props.color"
      :text="props.button"
      :to="props.to"
      variant="flat"
    />
  </div>
</template>

<script setup>
  const props = defineProps({
    title: String,
    description: String,
    to: String,
    button: String,
    color: String,
    closable: Boolean,
  })
  const alert = ref(true)
</script>
