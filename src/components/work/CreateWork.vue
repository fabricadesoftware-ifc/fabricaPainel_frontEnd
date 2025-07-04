<script lang="ts" setup>
import { useRouter } from 'vue-router';

const router = useRouter()

const props = defineProps({
    date_end: {
        type: Boolean,
        default: true
    },
    date_start: {
        type: Boolean,
        default: true
    },
})
</script>
<template>
    <div class="w-100">
            <div v-if="props.date_end && props.date_start" class="pa-10 d-flex flex-column justify-center ga-2 align-center cursor-pointer"
                >
                <p class="font-weight-bold" style="font-size: 20px;">Você ainda não possui nenhum trabalho
                    submetido</p>
                <div class="d-flex justify-center align-center ga-2 pa-3 hover-create" @click="router.push('/panel/works/add/')">
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
<style scoped >
.hover-create {
       border-radius: 40px;
        
    }

    .hover-create:hover {
        transition: 0.5s ease-in-out;
        background-color: rgba(28, 150, 231, 0.3);
        
    }
</style>