\
<script setup>
import { computed } from 'vue';
import router from '@/router';
import { resolveParticipationStatus, resolveStatus } from '@/utils/works';
import { useDisplay } from 'vuetify';
import { formatDate } from '@/utils/global';


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
        type: Object,
        default: null,
    }

})


const { width } = useDisplay()

// O card é usado pelo aluno, pelo orientador, pelo colaborador e pelo avaliador.
// Para orientador e colaborador o que importa é o status da participação dele (se
// aceitou ou recusou o convite), e não o status do trabalho — que era o que
// aparecia antes para todo mundo. Para aluno e avaliador, que não têm status
// próprio de participação, o status do trabalho continua sendo o correto.
const displayStatus = computed(() => {
    const work = props.work_data
    const userId = props.user?.id

    if (work && userId != null) {
        // Na listagem (WorkListSerializer) advisor vem como id puro; no detalhe
        // (WorkDetailSerializer) vem como objeto. O card é usado nos dois casos.
        const advisorId = work.advisor?.id ?? work.advisor
        if (advisorId != null && advisorId == userId) {
            return resolveParticipationStatus(work.advisor_status)
        }

        const collaboration = work.work_collaborator?.find(
            (link) => link?.collaborator?.id == userId
        )
        if (collaboration) {
            return resolveParticipationStatus(collaboration.status)
        }
    }

    return resolveStatus(props.work_status)
})

// const widthComputed = computed(()=> {
//     if (width.value > 780) {
//         return 1000
//     } else {
//         return 
//     }
// })

// id do avaliador é == id do user ou id do colaborador == id do user

</script>
<template>
    <div class="w-100">
        <div class="d-flex justify-center flex-column ga-5">
            <h1 class="font-weight-bold" :style="{ fontSize: width > 780 ? '30px' : '18px' }">{{ edition_title }}</h1>
            <div class="d-flex justify-center align-center">
                        <VCard
                            :style="{ flexDirection: width > 780 ? 'row' : 'column', maxWidth: '1000px' }"
                            class="d-flex align-center pa-5 justify-space-between w-100"
                            :rounded="width > 780 ? 'lg' : 'xl'"
                            elevation="0"
                            :border="true"
                        >
                            <div class="d-flex w-100" :style="{ flexDirection: width > 780 ? 'row' : 'column' }">
                                <!-- Coluna do título -->
                                <div class="card-title-half d-flex align-center justify-start" :style="{ width: width > 780 ? '50%' : '100%' }">
                                    <VCardTitle :style="{ fontSize: width > 780 ? '20px' : width > 390 ? '15px' : '13px' }"
                                        class="font-weight-bold w-100">
                                        {{ actual_title }}
                                    </VCardTitle>
                                </div>
                                <!-- Coluna dos dados -->
                                <div class="card-data-half d-flex align-center ga-3 flex-wrap justify-center" :style="{ width: width > 780 ? '50%' : '100%' }">
                                    <V-Chip v-if="displayStatus" :size="width > 780 ? 'default' : width > 390 ? 'small' : 'x-small'"
                                        :color="displayStatus.color">
                                        {{ displayStatus.text }}
                                    </V-Chip>
                                    <VCardSubtitle>
                                        {{ work ? formatDate(work) : '' }}
                                    </VCardSubtitle>
                                    <div
                                        :style="{ marginTop: width > 780 ? '0px' : '10px' }"
                                        @click="router.push(`/panel/works/view/${props.work_id}`)"
                                        class="d-flex pa-2 hover-button justify-center align-center text-blue ga-2 cursor-pointer"
                                    >
                                        <VIcon icon="mdi-open-in-new"></VIcon>
                                        <p>Ver Submissão</p>
                                    </div>
                                </div>
                            </div>
                        </VCard>
            </div>
        </div>
    </div>
</template>

<style scoped>
.hover-button {
    border-radius: 30px;
}

.hover-button:hover {
    transition: 0.5s ease-in-out;
    background-color: rgba(28, 150, 231, 0.3);
}
.custom-break {
    max-width: 50%;
    min-width: 50%;
}
</style>