<script lang="ts" setup>

import { useStudentAssessment } from '@/stores/studentAssessment'
import { useAssessmentStore } from '@/stores/assessment'
import { useWork } from '@/stores/work'

const studentAssesment = useStudentAssessment()
const assesmentStore = useAssessmentStore()
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
        grade.value = studentAssesment.assesment[0].grade
})

watch(watchWork, async (newVal) => {
    await studentAssesment.fetchAssessment(props.member.name,  workStore?.currentWork.id)

    grade.value = studentAssesment.assesment[0]
})

</script>
<template>
      <div class="d-flex justify-space-between">

                <div>
                    <div class="d-flex align-center ga-10">
                        <p style=" font-size: 18px;">{{ props.member.name }}</p>
                        <v-chip v-if="props.user_id == props.member_id" color="blue-darken-2 d-flex justify-center align-center" style="width: 60px; height: 25px; font-size: 13px;">Você</v-chip>

                    </div>
                    <p class="opacity-60" style="font-size: 15px;">{{ props.member.email }}</p>
                </div>
                        <v-btn @click="emits('openStudentAssesment')" v-if="!grade && props.work_advisor.id == props.user_id && props.is_student && workStore?.currentWork?.edition.year == date.getFullYear()" color="blue" style="width: 150px">Atribuir Nota</v-btn>

                        <v-chip v-if="!grade && props.work_advisor.id == props.user_id && props.is_student && workStore?.currentWork?.edition.year != date.getFullYear()"
                        :color="!grade ? 'yellow-darken-3' : 'green-darken-3'"
                        class="d-flex justify-center align-center" label style="width: 150px">
                        {{ !grade ? "Nota não Atribuída" : props.user_id != props.member_id ? 'Nota Atribuída' : grade.grade }}
                        </v-chip>

                        <v-chip v-if="grade && props.work_advisor.id == props.user_id && props.is_student"
                        color="green-darken-3"
                        class="d-flex justify-center align-center" label style="width: 150px">
                        {{  assesmentStore?.currentAssessment ? (Number(assesmentStore?.currentAssessment[0]?.grade) + Number(grade.grade))/2 :  grade.grade }}
                        </v-chip>

                        <v-chip v-if="props.is_student && props.work_advisor.id != props.user_id && props.is_student"
                        :color="!grade ? 'yellow-darken-3' : 'green-darken-3'"
                        class="d-flex justify-center align-center" label style="width: 150px">
                        {{ !grade ? "Nota não Atribuída" : props.user_id != props.member_id ? 'Nota Atribuída' : grade.grade }}
                        </v-chip>
                        <v-chip v-if="!props.is_student" class="d-flex justify-center align-center" :color="resolveAdvisorOrCollaboratorStatus(props.status).color" label style="width: 150px;">{{ resolveAdvisorOrCollaboratorStatus(props.status).text }}</v-chip>


        </div>
</template>