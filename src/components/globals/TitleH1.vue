<template>
  <h1 :class="[ color, 'text-start font-weight-bold text-wrap', screenWidth > 950 ? 'H2 text-h2' : 'text-h4 font-normal' ]" style="word-break: break-word">
    {{ props.text }}
    <br>
    {{ props.subtext }}
  </h1>
  <p class="pt-8">
    {{ content }}
  </p>
</template>

<script setup>
  const props = defineProps({
    text: String,
    subtext: String,
    content: String,
    color: String,
  })
const screenWidth = ref(0);

onMounted(() => {
  window.addEventListener("resize", () => {
    screenWidth.value = window.innerWidth;
  });
  screenWidth.value = window.innerWidth;
});

</script>

<style>
.H1 {
  font-size: 4.5em !important;
  font-weight: 600 !important;
}
</style>
