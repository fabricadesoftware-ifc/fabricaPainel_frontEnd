<script setup>
    const props = defineProps({
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true
        },
        btn_confirm_text: {
            type: String,
            required: true
        },
        btn_cancel_text: {
            type: String,
            required: true
        }
    })
</script>
<template>
    <VDialog >
    <div class="d-flex w-100 justify-center align-center">
      <VCard class="w-50 pa-5 rounded-xl">
        <VCardTitle class="font-weight-bold text-center" style="font-size: 25px;">{{ title }}
        </VCardTitle>
        <VCardText class="pa-5" style="font-size: 18px;">{{ props.description }}</VCardText>
        <VCardActions class="w-100 d-flex  justify-end">
          <VBtn class="font-weight-bold" @click="$emit('confirmation')">{{ btn_cancel_text }}</VBtn>
          <VBtn class="bg-blue rounded-xl" style="width: 150px;" @click="$emit('confirmation', btn_confirm_text)">{{ btn_confirm_text }}</VBtn>
        </VCardActions>
      </VCard>
    </div>
  </VDialog>
</template>