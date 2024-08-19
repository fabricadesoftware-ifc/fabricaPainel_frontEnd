<template>
  <div>
    <v-btn
      class="mr-2 mb-2"
      color="primary"
      rounded="xl"
      size="x-large"
      :text="props.text"
      variant="flat"
      disabled
    />
    <p v-show="disabled" class="text-subtitle-2 text-disabled font-weight-regular">{{ disabled }}</p>
  </div>
</template>

<script setup>
  const props = defineProps({
    text: String,
    disabled: String,
  })
</script>
