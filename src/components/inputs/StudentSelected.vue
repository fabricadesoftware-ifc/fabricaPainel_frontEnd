<script setup>
const props = defineProps([
    "label",
    "userType",
    "rounded",
    "one",
    'placeholder',
    'error_msg',
    'hint',
    'disabled'
]);
const emits = defineEmits(["addUser", "removeUser"]);
const search = ref('')
const inputRef = ref(null)

function focusInput(){
    nextTick(() => {
        if (props.disabled) return
        inputRef.value?.focus()
    })
}

function addEmit(){
    if (props.disabled || !search.value?.trim()) return
    emits('addUser', {user:search.value, user_type: props.userType})
    setTimeout(() => {
        search.value = ''
    }, 500)
    focusInput()
}
</script>
<template>
    <VTextField ref="inputRef" v-model="search" variant="outlined" :label="label" :placeholder="placeholder"
        :hint="hint" persistent-hint persistent-placeholder :disabled="disabled" :rounded="rounded"
        @keyup.enter="addEmit">
        <template #append-inner>
            <VIcon class="bg-blue text-white rounded-xl cursor-pointer add-icon" icon="mdi-plus"
                @click="addEmit"></VIcon>
        </template>
    </VTextField>
</template>

<style scoped>
/* o Vuetify aplica --v-medium-emphasis-opacity (0.6) nos ícones dos slots do field,
   o que deixava o botão com aparência de desabilitado */
.v-field__append-inner > .add-icon {
    opacity: 1;
}
</style>