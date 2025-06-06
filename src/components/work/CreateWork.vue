<script lang="ts" setup>
import { useRouter } from 'vue-router';

const router = useRouter()

const props = defineProps({
    edition_title:{
        type: String,
    },
    date: {
        type: Boolean,
        default: true
    }
})
</script>
<template>
    <div class="w-100">
            <div class="d-flex align-center  ga-5 w-100">
                <h1 class="text-h5 font-weight-bold" style="font-size: 30px;">{{ props.edition_title }}</h1>
                        <VChip class="bg-blue d-flex justify-center align-center" pill style="width: 120px;">Em aberto
                </VChip>
            </div>
            <div v-if="props.date" class="pa-10 d-flex flex-column justify-center ga-2 align-center cursor-pointer"
                >
                <p class="font-weight-bold" style="font-size: 20px;">Você ainda não possui nenhum trabalho
                    submetido</p>
                <div class="d-flex justify-center align-center ga-2" @click="router.push('/panel/works/add/')">
                    <VBtn class="bg-blue" rounded="pill" flat size="25">
                        <VIcon icon="mdi-plus" size="25"></VIcon>
                    </VBtn>
                    <p class="text-blue font-weight-medium" style="font-size: 20px;">submeta uma proposta</p>
                </div>
                
            </div>
             <div v-else style="min-width: 100%" class="pa-10 d-flex justify-center ga-2 align-center text-center">
                    <p style="font-size: 20px; width: 500px;">Não é possível submeter mais propostas, pois o prazo de submissão acabou</p>
                </div>
        </div>
</template>