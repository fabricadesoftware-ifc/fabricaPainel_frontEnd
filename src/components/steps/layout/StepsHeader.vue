<script setup>
import { useDisplay } from 'vuetify';

defineProps({
    user: {
        type: Object,
        required: true
    },
    step_num: {
        type: Number,
        required: true
    },
    step_value: {
        type: String,
        required: true
    },
    step_completed: {
        type: Boolean,
        required: true
    }
})
const { width } = useDisplay()
</script>
<template>
    <div class="d-flex justify-space-between align-center pa-2">
        <div class="d-flex justify-center align-center">
            <div v-if="width < 950" class="d-flex jusitfy-center align-center ga-2">
                <VChip class="bg-blue " rounded="15" v-if="step_num">{{ !step_completed ? Number(step_num) : '✔' }}
                </VChip>
                <p class="text-blue">{{ step_value }}</p>
            </div>
            <router-link to="/user-support">
                <p class="text-blue ms-10" style="font-size: 15px;" v-if="width > 950">Precisa de Ajuda?</p>
            </router-link>
        </div>
        <div class="d-flex align-center jusitfy-center ga-3" v-if="width > 950">
            <VImg :src="user.img" width="40" rounded="xl"></VImg>
            <p class="font-weight-bold me-10" style="font-size: 15px;">{{ user.name }}</p>
        </div>
        <VAppBarNavIcon v-else @click="$emit('openNav')"></VAppBarNavIcon>
    </div>
</template>
