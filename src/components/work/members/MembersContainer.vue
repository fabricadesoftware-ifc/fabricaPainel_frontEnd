<script lang="ts" setup>
const props = defineProps({
    title: {
        type: String,
        default: 'Equipe'
    },
    attribute: {
        type: String,
        default: 'Nota Individual'
    }
})
</script>
<template>
        <div class="d-flex flex-column ga-10">
            <div class="w-100 d-flex justify-space-between opacity-70 mt-10">
            <p style="font-weight: 700; font-size: 20px;">{{ props.title }}:</p>
            <p style="font-weight: 700; font-size: 20px;">{{ props.attribute }}</p>
            </div>
            <slot></slot>
        </div>
</template>