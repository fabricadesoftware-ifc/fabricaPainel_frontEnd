<script lang="ts" setup>
// @ts-ignore
import { defineProps, onMounted } from 'vue'
const props = defineProps({
    user_type: {
        type: String,
        default: ''
    },
    works: {
        type: Object,
        default: () => ({})
    }
})

const checkWorks = () => {
    if (!props.works) return false;
    const allWorks = []
        .concat(props.works.advisorWorks || [])
        .concat(props.works.collaboratorWorks || [])
        .concat(props.works.evaluatorWorks || []);
    return allWorks.length > 0;
}
onMounted(()=> {
    console.log(props.works)
})
</script>
<template>
    <div class="w-100 d-flex justify-center flex-column ga-10">
        <div v-if="checkWorks()">
        <div v-if="props.works.evaluatorWorks.length > 0 " class="w-100 d-flex align-center flex-column">
        <h2>Avaliar</h2>
        <slot name="evaluate">

        </slot>
        </div>

         <div v-if="props.user_type == 'TEACHER' && props.works.advisorWorks.length > 0" class="w-100 d-flex align-center flex-column mt-10">
        <h2>Orientar</h2>
        <slot name="advise">

        </slot>
        </div>

         <div v-if="props.works.collaboratorWorks.length > 0 " class="w-100 d-flex align-center flex-column  mt-10">
        <h2>Colaborar</h2>
        <slot name="collaborate">

        </slot>
        </div>
        </div>
        <div v-else>
            <p>Você não foi chamado para participar de nenhum projeto.</p>
        </div>
    </div>
</template>