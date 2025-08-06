<script setup>
import { useDisplay } from 'vuetify';
const { width } = useDisplay()
const props = defineProps({
    name: {
        type: String,
        default: ''
    },
    email: {
        type: String,
        default: ''
    },
    me: {
        type: Object,
        required: false
    },
    specialities: {
        type: Array,
        default: () => []
    }
})
</script>
<template>
    <div class="d-flex justify-space-between align-center h-25 w-100 mt-5">
        <div class="flex-grow-1">
            <div class="d-flex align-center ga-2">
                <p class="font-weight-bold" :style="{ fontSize: width < 750 ? '17px' : '20px' }">{{ name }}</p>
                <VChip v-if="me?.email === email" class="bg-blue d-flex justify-center align-center"
                    :style="{ fontSize: width < 750 ? '13px' : '15px' }">Você</VChip>
            </div>
            <p class="text-grey-lighten-1" :style="{ fontSize: width < 750 ? '13px' : '15px' }">{{ email }}</p>
            <div v-if="specialities && specialities.length > 0" class="mt-2">
                <v-chip v-for="speciality in specialities" :key="speciality.id" size="x-small" class="me-1 mb-1"
                    color="primary" variant="outlined">
                    {{ speciality.name }}
                </v-chip>
            </div>
        </div>
        <div>
            <VChip class="cursor-pointer" color="red" v-if="me.email !== email">
                <p style="font-size: 30px;" @click="$emit('RemoveUser', props.email)">-</p>
            </VChip>
        </div>
    </div>
</template>
