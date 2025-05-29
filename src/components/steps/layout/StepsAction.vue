<script setup> 
   const props = defineProps({
        actualstep: {
            type: Number,
            required: true
        },
        disabledBtn: {
            type: [Object, Boolean],
            required: true
        }
    })

    const isDisabledValue = computed(() => {
        return isRef(props.disabledBtn) ? props.disabledBtn.value : props.disabledBtn
    })
</script>
<template>
    <VStepperActions class="w-100 position-absolute bottom-0 mb-9">
          <template #prev="{ props }">
            <VBtn v-bind="props" text="blue" class="border-none" :disabled="actualstep === 0" @click="$emit('PrevStep')">
              <VIcon icon="mdi-arrow-left"></VIcon>
              Voltar
            </VBtn>
          </template>
          <template #next="{ props }">
            <VBtn v-bind="props" class="border-none text-blue bg-white" @click="$emit('NextStep')" :disabled="isDisabledValue" >
              {{ actualstep === 4 ? 'Finalizar' : 'Próximo' }}
              <VIcon icon="mdi-arrow-right" v-if="actualstep !== 4 " ></VIcon>
            </VBtn>
          </template>
        </VStepperActions>
</template>