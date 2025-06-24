<script setup>
  const value = defineModel('value')

  defineProps({
    placeholder: {
      type: String,
      required: true
    },
    icon: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: 'date'
    },
  })
</script>
<template>
<div class="d-flex flex-column ga-3">
  <VTextField variant="outlined" rounded="xl" :type="type" v-model="value" :placeholder="placeholder" :append-icon="icon ? 'mdi-account-multiple' : ''" v-if="!qtds"></VTextField>
</div>
</template>
