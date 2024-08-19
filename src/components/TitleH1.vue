<template>
  <h1>
    {{ props.text }}
  </h1>
  <p class="pt-8">
    {{ content }}
  </p>
</template>

<script setup lang="ts">
  const props = defineProps({
    text: String,
    content: String,
  })
</script>

<style>
h1 {
  font-size: 2em;
  font-weight: 600;
}
</style>
