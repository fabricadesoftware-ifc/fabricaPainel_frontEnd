<script setup>
const props = defineProps({
    actual_title: {
        type: String,
        required: true,
    },
    edition_title: {
        type: String,
    },
    work: {
        type: String,
    },
    work_status: {
        type: Number
    }
})

onMounted(() => {
    console.log(props)
})

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
                        <VCardSubtitle>{{ work }}</VCardSubtitle>
                        <V-Chip :color="work_status === 1 || work_status === 3 ? 'yellow' :  work_status === 2 ? 'green' : 'red'">{{ work_status === 1 ? 'Pendente' : work_status === 2 ? 'Aprovado' : work_status === 3 ? 'Pendente com alterações' : 'Cancelado' }}</V-Chip>
                    </div>
                    <div class="d-flex justify-center align-center text-blue ga-2 cursor-pointer">
                        <VIcon icon="mdi-open-in-new"></VIcon>
                        <p>Ver Submissão</p>
                    </div>
                </VCard>
            </div>
        </div>
        <div v-else>
            <div class="d-flex align-center  ga-5 w-100">
                <h1 class="text-h5 font-weight-bold" style="font-size: 30px;">{{ actual_title }}</h1>
                <VChip class="bg-blue d-flex justify-center align-center" pill style="width: 120px;">Em aberto
                </VChip>
            </div>
            <div class="pa-10 d-flex flex-column justify-center ga-2 align-center cursor-pointer"
                >
                <p class="font-weight-bold" style="font-size: 20px;">Você ainda não possui nenhum trabalho
                    submetido</p>
                <div class="d-flex justify-center align-center ga-2" @click="router.push('/panel/work-submission/')">
                    <VBtn class="bg-blue" rounded="pill" flat size="25">
                        <VIcon icon="mdi-plus" size="25"></VIcon>
                    </VBtn>
                    <p class="text-blue font-weight-medium" style="font-size: 20px;">submeta uma proposta</p>
                </div>
            </div>
        </div>
    </div>
</template>