<template>
  <div class="position-relative">
    <v-btn
      class="mr-2 mb-2"
      color="primary"
      :disabled="disabled != 'open'"
      rounded="xl"
      size="x-large"
      :text="props.text"
      to="/panel/works/"
      variant="flat"
    />
    <p v-if="disabled != 'open'" class="text-subtitle-2 text-disabled font-weight-regular pl-4 d-flex align-center">
      <v-icon aria-hidden="false" class="pr-2">
        mdi-account-cancel-outline
      </v-icon>
      {{ disabled }}
    </p>
  </div>
</template>

<script setup>
  const props = defineProps({
    text: String,
    disabled: String,
  })
</script>
