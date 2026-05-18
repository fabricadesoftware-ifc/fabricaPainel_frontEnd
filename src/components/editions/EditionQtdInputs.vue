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
    hint: {
      type: String,
      default: ''
    },
    error: {
      type: String,
      default: ''
    },
  })
</script>
<template>
<div class="edition-qtd-field">
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
  ></VTextField>
  <div class="qtd-separator bg-grey-lighten-2 rounded-xl" v-if="placeholder === 'MIN'"></div>
</div>
</template>
<style scoped>
.edition-qtd-field {
  display: flex;
  align-items: flex-start;
  flex: 1 1 0;
  min-width: 0;
}

.qtd-separator {
  flex: 0 0 24px;
  height: 4px;
  margin: 22px 8px 0;
}
</style>
