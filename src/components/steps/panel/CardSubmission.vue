\<script setup>
import router from '@/router';
import { resolveStatus } from '@/utils/works';


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
    },
    work_id: {
        type: [String, Number]
    },
    work_data: {
        type: Object,
        default: null,
    },
    user: {
        type: [String, Number],
        default: null,
    }
 
})




// id do avaliador é == id do user ou id do colaborador == id do user

onMounted(()=> {
    console.log(props.collaborators_id)
})
</script>
<template>
    <div class="w-100">
        <div class="d-flex justify-center flex-column ga-5" >
            <h1 class="text-h5 font-weight-bold" style="font-size: 30px;">{{ edition_title }}</h1>
            <div class="d-flex justify-center align-center">
                <VCard class="d-flex align-center pa-5 justify-space-between w-100" rounded="lg" elevation="0"
                    :border="true" width="1000">
                    <div class="d-flex align-center ga-3">
                        <VCardTitle class="font-weight-bold">Submissão de proposta</VCardTitle>
                        <VCardSubtitle>{{ work }}</VCardSubtitle>
                        <V-Chip :color="resolveStatus(props.work_status).color">{{ resolveStatus(props.work_status).text }}</V-Chip>
                    </div>
                    <div @click="router.push(`/panel/works/view/${props.work_id}`)" class="d-flex justify-center align-center text-blue ga-2 cursor-pointer">
                        <VIcon icon="mdi-open-in-new"></VIcon>
                        <p>Ver Submissão</p>
                    </div>
                </VCard>
            </div>
        </div>
    </div>
</template>