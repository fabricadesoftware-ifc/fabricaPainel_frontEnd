<script setup>
  const value = defineModel('value')

  defineProps({
    placeholder: {
      type: String,
      required: true
    },
    icon: {
      type: String,
      default: ""
    },
    type: {
      type: String,
      default: 'number'
    },
  })
</script>
<template>
<div class="d-flex justify-center align-center">
  <VTextField variant="outlined" rounded="xl" :type="type" v-model="value" :placeholder="placeholder" :append-inner-icon="icon"></VTextField>
  <div class="bg-grey-lighten-2 rounded-xl mb-5 mx-10" style="width: 30px; height: 10px;" v-if="placeholder === 'MIN'"></div>
</div>
</template>
