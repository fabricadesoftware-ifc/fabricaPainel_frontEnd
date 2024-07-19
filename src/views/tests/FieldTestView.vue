<script setup>
import { onMounted } from 'vue'

import { useFieldStore } from '@/stores';

const fieldStore = new useFieldStore()

onMounted(() => {
    fieldStore.getFields()
})

</script>

<template>
    <div>
        <h1>Field testing</h1>
        <h3>Actual number of fields: {{ fieldStore.fieldCount }}</h3>
        <ul>
            <li v-for="field in fieldStore.state.fields">
                {{ field }}
            </li>
        </ul>
    </div>
</template>
