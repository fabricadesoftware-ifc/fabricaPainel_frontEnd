<template>
  <h1 class="text-h1 text-start text-wrap H1" style="word-break: break-word" :class="color">
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
    color: String,
  })
</script>

<style>
.H1 {
  font-size: 4.5em !important;
  font-weight: 600 !important;
}
</style>
