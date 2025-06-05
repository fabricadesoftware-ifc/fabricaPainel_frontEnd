<script setup>
import { useWork } from '@/stores/work';
import { showMessage } from '@/utils/toastify';
import { useAuth } from '@/stores/auth';
const AuthStore = useAuth()
const WorkStore = useWork()


const hintInput = computed(() => {
    if(WorkStore.WorkStorage.co_advisor.length === 5){
        return 'limite máximo atingido'
    }
    return ''
})


const AddUser = async (selectedColaborator) => {
    if (selectedColaborator) {
        const userExists = WorkStore.WorkStorage.co_advisor.some(stu => stu.email === selectedColaborator.email)
        const isYourAdvisor = WorkStore.WorkStorage.advisor[0].email === selectedColaborator.email
        if (!userExists && !isYourAdvisor){
            WorkStore.WorkStorage.co_advisor.push(selectedColaborator)
        }
        else {
            showMessage(
                `${userExists ? 'esse professor já é seu colaborador' : isYourAdvisor ? 'esse professor já é seu orientador' : ''}`,
                "error",
                1500,
                "top-right",
                "auto",
                false
            );
        }
    }
}

function removeUser(email){
    const teacherI = WorkStore.WorkStorage.co_advisor.findIndex(te => te.email === email)
    WorkStore.WorkStorage.co_advisor.splice(teacherI, 1)
}

</script>
<template>
    <div style="width: 70%; " class="pa-2 h-100">
        <TeacherSelected :disabled="WorkStore.WorkStorage.advisor.length === 5" :hint="hintInput" error_msg="colaborador não encontrado" placeholder="pesquise pelo colaborador" label="pesquise pelo colaborador" user-type="TEACHER" @addUser="AddUser" @removeUser="removeUser"/>
        <div class="d-flex ga-2 mt-5">
            <p style="font-size: 12px;">* Limite máximo de colaboradores: 5</p>
            <p style="font-size: 12px;">* Limite minimo de colaboradores: 1</p>
        </div>
        <StepContainer title="Colaboradores do seu projeto" :step_array="WorkStore.WorkStorage.co_advisor" :is_subject="false" @RemoveUser="removeUser" :min="1"/>
    </div>
</template>