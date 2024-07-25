<script setup>
import { onMounted } from 'vue'

import { useWorkStore } from '@/stores';

const workStore = new useWorkStore()

onMounted(() => {
    workStore.getFields()
})

</script>

<template>
    <div>
        <h1>Work testing</h1>
        <h3>Actual number of Works: {{ workStore.fieldCount }}</h3>
        <ul>
            <li v-for="work in workStore.state.works" :key="work.id">
                {{ work }}
            </li>
        </ul>
    </div>
</template>