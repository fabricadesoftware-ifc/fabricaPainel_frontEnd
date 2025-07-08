<script lang="ts" setup>
import { useDisplay } from 'vuetify';

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

const {width} = useDisplay()
</script>
<template>
        <div class="d-flex flex-column ga-10">
            <div class="w-100 d-flex justify-space-between opacity-70 mt-10">
            <p :style="{fontWeight: '700', fontSize: width > 780 ? '20px' : '15px'}">{{ props.title }}:</p>
            <p :style="{fontWeight: '700', fontSize: width > 780 ? '20px' : '15px'}">{{ props.attribute }}</p>
            </div>
            <slot></slot>
        </div>
</template>