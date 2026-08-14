<script setup>
import { useDisplay } from 'vuetify';

const props = defineProps({
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
    },
    total_steps: {
        type: Number,
        default: 5
    }
})
const { width } = useDisplay()

const progressPercent = computed(() => {
    if (!props.step_num || !props.total_steps) return 0
    return Math.min(100, (props.step_num / props.total_steps) * 100)
})
</script>
<template>
    <div class="d-flex justify-space-between align-center pa-2 ga-2">
        <div class="d-flex align-center flex-grow-1" style="min-width: 0;">
            <div v-if="width < 950 && step_num" class="d-flex flex-column ga-1 flex-grow-1" style="min-width: 0;">
                <div class="d-flex align-center ga-2">
                    <VChip class="bg-blue" size="small" rounded="15">{{ !step_completed ? Number(step_num) : '✔' }}
                    </VChip>
                    <p class="text-blue font-weight-medium text-truncate" style="font-size: 15px;">{{ step_value }}</p>
                </div>
                <div class="d-flex align-center ga-2">
                    <VProgressLinear :model-value="progressPercent" color="blue" height="6" rounded
                        style="max-width: 160px;"></VProgressLinear>
                    <p class="text-grey" style="font-size: 12px; white-space: nowrap;">Passo {{ step_num }} de {{ total_steps }}</p>
                </div>
            </div>
            <router-link to="/user-support">
                <p class="text-blue ms-10" style="font-size: 15px;" v-if="width > 950">Precisa de Ajuda?</p>
            </router-link>
        </div>
        <div class="d-flex align-center jusitfy-center ga-3" v-if="width > 950">
            <VImg :src="user.img" width="40" rounded="xl"></VImg>
            <p class="font-weight-bold me-10" style="font-size: 15px;">{{ user.name }}</p>
        </div>
        <VAppBarNavIcon v-else size="large" @click="$emit('openNav')"></VAppBarNavIcon>
    </div>
</template>
