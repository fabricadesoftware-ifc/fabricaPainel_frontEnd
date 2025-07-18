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
      type: String,
      default: ''
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
<div class="d-flex flex-column ga-3" style="width: 35%;">
  <VLabel>{{ label }}</VLabel>
  <VTextField variant="outlined" rounded="xl" :type="type" v-model="value" :placeholder="placeholder" :append-inner-icon="icon" v-if="qtds.length === 0"></VTextField>
  <div class="d-flex justify-center align-center " v-else>
    <EditionQtdInputs v-for="qtd, i in qtds" :key="i" v-model:value="qtd.value" :placeholder="qtd.placeholder" :icon="qtd.icon"/>
  </div> 
</div>
</template>
