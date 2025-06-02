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

function addEmit(){
    emits('addUser', {user:search.value, user_type: props.userType})
    setTimeout(() => {
        search.value = ''
    }, 500)
}
</script>
<template>
    <VTextField v-model="search" variant="outlined" :placeholder="placeholder" :disabled="disabled" :rounded="rounded" >
        <template #append-inner>
            <VIcon class="bg-blue rounded-xl cursor-pointer" icon="mdi-plus" @click="addEmit"></VIcon>
        </template>
    </VTextField>
</template>