<script lang="ts" setup>
import { useRouter } from 'vue-router';
import { useDisplay } from 'vuetify';

const router = useRouter()

const props = defineProps({
    date: {
        type: Boolean,
        default: true
    }
})

const {width} = useDisplay()
</script>
<template>
    <div class="w-100">
            <div v-if="props.date" class="pa-10 d-flex flex-column justify-center ga-2 align-center cursor-pointer"
                >
                <p class="font-weight-bold" :style="{fontSize: width > 780 ? '20px' : '15px'}">Você ainda não possui nenhum trabalho
                    submetido</p>
                <div class="d-flex justify-center align-center ga-2 pa-3 hover-create" @click="router.push('/panel/works/add/')">
                    <VBtn class="bg-blue" rounded="pill" flat :size="width > 780 ? '30' : '20'">
                        <VIcon icon="mdi-plus" :size="width > 780 ? '25' : '18'"></VIcon>
                    </VBtn>
                    <p class="text-blue font-weight-medium" :style="{fontSize: width > 780 ? '20px' : '15px'}">submeta uma proposta</p>
                </div>
                
            </div>
             <div v-else style="min-width: 100%" class="pa-10 d-flex justify-center ga-2 align-center text-center">
                    <p :style="{width: '500px', fontSize: width > 780 ? '20px' : '15px'}">Não é possível submeter mais propostas, pois o prazo de submissão acabou</p>
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