<script setup>
  const value = defineModel('value')

  defineProps({
    placeholder: {
      type: String,
      required: true
    },
    label: {
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
    qtds: {
      type: Array,
      default: []
    }
  })
</script>
<template>
<div class="d-flex flex-column ga-3">
  <VLabel>{{ label }}</VLabel>
  <VTextField variant="outlined" rounded="xl" :type="type" v-model="value" :placeholder="placeholder" :append-icon="icon ? 'mdi-account-multiple' : ''" v-if="!qtds"></VTextField>
  <EditionQtdInputs v-for="qtd, i in qtds" :key="i" v-model:value="qtd.value" v-else/>
</div>
</template>
