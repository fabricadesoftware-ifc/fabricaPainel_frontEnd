<script lang="ts" setup>

import { useStudentAssessment } from '@/stores/studentAssessment'
import { useAssessmentStore } from '@/stores/assessment'
import { resolveUserFunction } from '@/utils/works'
import { useAuth } from '@/stores/auth'
import { useWork } from '@/stores/work'
import { useDisplay } from 'vuetify'

const studentAssesment = useStudentAssessment()
const assesmentStore = useAssessmentStore()
const authStore = useAuth()
const workStore = useWork()
// @ts-ignore
const props = defineProps({
    member: {
        type: Object,
        required: true
    },
    user_id: {
        type: [Number, String, null],
        default: null
    },
    member_id: {
        type: [Number,String, null],
        default: null
    },
    status: {
        type: [Number, String],
        default: 1
    },
    work_advisor: {
        type: Object,
        default: null
    },
    is_student: {
        type: Boolean,
        default: false
    }
    
})

const date = new Date()

const resolveAdvisorOrCollaboratorStatus = (status: Number | String) => {
    switch (status) {
        case 1: {
            return {
                text: 'Pendente',
                color: 'yellow-darken-2'
            }
        }
        case 2: {
            return {
                text: 'Aprovado',
                color: 'green-darken-2'
            }
        }
        case 3: {
            return {
                text: 'Rejeitado',
                color: 'red-darken-2'
            }
        }
        case 4: {
             return {
                text: 'Expirado',
                color: 'blue-grey lighten-1'
            }
        }
        default:
            return {
                text: 'Pendente',
                color: 'yellow-darken-2'
            }
    }
}

const emits = defineEmits([
    'openStudentAssesment'
])

const grade = ref<any>(null)
const watchWork = computed(() => workStore?.currentWork?.id)

onMounted(async ()=> {
    if (props.member.name && workStore?.currentWork) { 
    await studentAssesment.fetchAssessment(props.member.name, workStore?.currentWork.id)
    
    if (studentAssesment?.assesment[0]) { 
        console.log(studentAssesment.assesment[0])
        grade.value = studentAssesment.assesment[0]
     }
    }
    console.log(props.member.name)
})

watch(studentAssesment.assesments, async (newVal) => {
        await studentAssesment.fetchAssessment(props.member.name,  workStore?.currentWork.id)
        grade.value = studentAssesment?.assesment[0]
})

watch(watchWork, async (newVal) => {
    await studentAssesment.fetchAssessment(props.member.name,  workStore?.currentWork.id)

    grade.value = studentAssesment.assesment[0]
})

const {width} = useDisplay() 
</script>
<template>
      <div class="d-flex align-center justify-space-between flex-wrap">

                <div :style="{width: width > 780 ? '' : '100%'}">
                    <div  class="d-flex align-center ga-5">
                        <p :style="{fontSize: width > 780 ? '18px' : '15px'}">{{ props.member.name }}</p>
                        <v-chip v-if="props.user_id == props.member_id" color="blue-darken-2 d-flex justify-center align-center" style="width: 60px; height: 25px; font-size: 13px;">Você</v-chip>

                    </div>
                    <p class="opacity-60" :style="{fontSize: width > 780 ? '15px' : '13px'}">{{ props.member.email }}</p>
                </div>
                <div :style="{marginTop: width > 780 ? '0px' : '15px'}" class="d-flex ga-5 align-center">
                <p style="font-weight: 700; font-size: 14px;" class="blue-darken-2 opacity-70" v-if="width <= 780 ? ['ADVISOR'].includes(resolveUserFunction(workStore?.currentWork, authStore?.user)) ? 'Nota Individual' : ['STUDENT'].includes(resolveUserFunction(workStore?.currentWork, authStore?.user)) ? 'Nota Individual' : '' : ''"> {{ props.is_student ? 'Nota Individual:' : 'Status: ' }} </p>

                        <v-btn @click="emits('openStudentAssesment')" v-if="!grade && props.work_advisor.id == props.user_id && props.is_student && workStore?.currentWork?.edition.year == date.getFullYear() && workStore?.currentWork?.status === 2" color="blue" :style="{width: width > 780 ? '150px' : '130px', fontSize: width > 780 ? '14px' : '12px'}">Atribuir Nota</v-btn>

                        <v-chip v-if="!grade && props.work_advisor.id == props.user_id && props.is_student && workStore?.currentWork?.edition.year != date.getFullYear()"
                        :color="!grade ? 'yellow-darken-3' : 'green-darken-3'"
                        class="d-flex justify-center align-center bg-red" label :style="{width: width > 780 ? '150px' : '130px', fontSize: width > 780 ? '14px' : '12px'}">
                        {{ !grade ? "Nota não Atribuída" : props.user_id != props.member_id ? 'Nota Atribuída' : assesmentStore?.currentAssessment[0] && grade ? (Number(assesmentStore?.currentAssessment[0]?.grade) + Number(grade.grade))/2  : 'Aguardando Trabalho'  }}
                        </v-chip>

                        <v-chip v-if="grade && props.work_advisor.id == props.user_id && props.is_student"
                        color="green-darken-3"
                        class="d-flex justify-center align-center" label :style="{width: width > 780 ? '180px' : '150px', fontSize: width > 780 ? '14px' : '12px'}">
                        {{  assesmentStore?.currentAssessment[0] && grade ? (Number(assesmentStore?.currentAssessment[0]?.grade) + Number(grade.grade))/2 :  'Aguardando Trabalho' }}
                        </v-chip>

                        <v-chip v-if="props.is_student && props.work_advisor.id != props.user_id && !authStore.user.is_collaborator && !authStore.user.is_evaluator && props.is_student"
                        :color="!grade ? 'yellow-darken-3' : 'green-darken-3'"
                        class="d-flex justify-center align-center" label :style="{width: width > 780 ? '180px' : '150px', fontSize: width > 780 ? '14px' : '12px'}">
                        {{ !grade  ? "Nota não Atribuída" : props.user_id != props.member_id ? 'Nota Atribuída' :  assesmentStore?.currentAssessment[0] && grade ? (Number(assesmentStore?.currentAssessment[0]?.grade) + Number(grade.grade))/2  : 'Aguardando Trabalho' }}
                        </v-chip>
                        <v-chip v-if="!props.is_student" class="d-flex justify-center align-center" :color="resolveAdvisorOrCollaboratorStatus(props.status).color" label :style="{width: width > 780 ? '150px' : '130px', fontSize: width > 780 ? '14px' : '12px'}">{{ resolveAdvisorOrCollaboratorStatus(props.status).text }}</v-chip>
        </div>

        </div>
</template>