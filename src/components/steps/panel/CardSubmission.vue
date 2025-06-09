\<script setup>
const props = defineProps({
    actual_title: {
        type: [String, null],
        required: true,
    },
    edition_title: {
        type: [String, null],
    },
    work: {
        type: [String, Object, null]
    },
    work_status: {
        type: [Number, null]
    },
    work_id: {
        type: [String, null]
    }
})

const date = new Date()

import router from '@/router';
</script>
<template>
    <div class="w-100">
        <div class="d-flex justify-center flex-column ga-5 pa-10" v-if="work">
            <h1 class="text-h5 font-weight-bold" style="font-size: 30px;">{{ edition_title }}</h1>
            <div class="d-flex justify-center align-center">
                <VCard class="d-flex align-center pa-5 justify-space-between w-100" rounded="lg" elevation="0"
                    :border="true" width="1000">
                    <div class="d-flex align-center ga-3">
                        <VCardTitle class="font-weight-bold">Submissão de proposta</VCardTitle>
                        <VCardSubtitle>{{ work.edition.final_submission_date }}</VCardSubtitle>
                        <V-Chip :color="work_status === 1 || work_status === 3 ? 'yellow' :  work_status === 2 ? 'green' : 'red'">{{ work_status === 1 ? 'Pendente' : work_status === 2 ? 'Aprovado' : work_status === 3 ? 'Pendente com alterações' : 'Cancelado' }}</V-Chip>
                    </div>
                    <div @click="router.push(`/panel/works/view/${work_id}`)" class="d-flex justify-center align-center text-blue ga-2 cursor-pointer">
                        <VIcon icon="mdi-open-in-new"></VIcon>
                        <p>Ver Submissão</p>
                    </div>
                </VCard>
            </div>
        </div>
    </div>
</template>