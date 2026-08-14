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
    hint: {
      type: String,
      default: ''
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
<div class="edition-input d-flex flex-column ga-3">
  <VLabel>{{ label }}</VLabel>
  <div v-if="hint && qtds.length > 0" class="text-caption text-medium-emphasis">
    {{ hint }}
  </div>
  <VTextField
    variant="outlined"
    rounded="lg"
    density="comfortable"
    :type="type"
    v-model="value"
    :placeholder="placeholder"
    :append-inner-icon="icon"
    :hint="hint"
    :persistent-hint="Boolean(hint)"
    :error="Boolean(error)"
    :error-messages="error ? [error] : []"
    v-if="qtds.length === 0"
  ></VTextField>
  <div class="edition-qtd-inputs" v-else>
    <EditionQtdInputs
      v-for="qtd, i in qtds"
      :key="i"
      v-model:value="qtd.value"
      :placeholder="qtd.placeholder"
      :icon="qtd.icon"
      :hint="qtd.hint || ''"
      :error="qtdErrors[i] || ''"
    />
  </div> 
</div>
</template>
<style scoped>
.edition-input {
  width: 100%;
  min-width: 0;
}

.edition-qtd-inputs {
  display: flex;
  align-items: flex-start;
  width: 100%;
  gap: 10px;
}
</style>
