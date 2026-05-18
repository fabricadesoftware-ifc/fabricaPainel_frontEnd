<script setup>
  const value = defineModel('value')

  defineProps({
    placeholder: {
      type: String,
      default: ''
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
      default: () => []
    },
    error: {
      type: String,
      default: ''
    },
    qtdErrors: {
      type: Array,
      default: () => []
    }
  })
</script>
<template>
<div class="d-flex flex-column ga-3" style="width: 35%;">
  <VLabel>{{ label }}</VLabel>
  <VTextField
    variant="outlined"
    rounded="xl"
    :type="type"
    v-model="value"
    :placeholder="placeholder"
    :append-inner-icon="icon"
    :error="Boolean(error)"
    :error-messages="error ? [error] : []"
    v-if="qtds.length === 0"
  ></VTextField>
  <div class="d-flex justify-center align-center " v-else>
    <EditionQtdInputs
      v-for="qtd, i in qtds"
      :key="i"
      v-model:value="qtd.value"
      :placeholder="qtd.placeholder"
      :icon="qtd.icon"
      :error="qtdErrors[i] || ''"
    />
  </div> 
</div>
</template>
