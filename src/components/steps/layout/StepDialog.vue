<script setup>
import { useDisplay } from 'vuetify';

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
  
  const {width} = useDisplay()
</script>
<template>
    <VDialog >
    <div class="d-flex w-100 justify-center align-center">
      <VCard class="w-50 d-flex justify-center align-center flex-column pa-5 rounded-xl" :class="width < 750 ? 'w-100' : '' ">
        <h1 class="font-weight-bold text-center" style="font-size: 25px;">{{ title }}
        </h1>
        <VCardText class="pa-5" style="font-size: 18px;">{{ props.description }}</VCardText>
        <VCardActions class="w-100 d-flex  justify-end">
          <VBtn class="font-weight-bold" @click="$emit('confirmation', props.btn_cancel_text)">{{ btn_cancel_text }}
          <template #prepend></template></VBtn>
          <VBtn class="bg-blue rounded-xl" style="width: 150px;" @click="$emit('confirmation', btn_confirm_text)">{{ btn_confirm_text }}</VBtn>
        </VCardActions>
      </VCard>
    </div>
  </VDialog>
</template>