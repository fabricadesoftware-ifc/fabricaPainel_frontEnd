<script setup>
import { useWork } from '@/stores/work';
import { showMessage } from '@/utils/toastify';
import { useAuth } from '@/stores/auth';
import { useEdition } from '@/stores/edition';
import { hasReachedWorkLimit } from '@/utils/steps/works';

const AuthStore = useAuth()
const WorkStore = useWork()
const editionStore = useEdition()

const hintInput = computed(() => {
    const maxCollaborators = editionStore.currentEdition?.collaborators_max || 5
    if(WorkStore.WorkStorage.collaborators.length === maxCollaborators){
        return 'limite máximo atingido'
    }
    return ''
})


const AddUser = async (selectedColaborator) => {
    if (selectedColaborator) {
        const userExists = WorkStore.WorkStorage.collaborators.some(stu => stu.email === selectedColaborator.email)
        const isYourAdvisor = WorkStore.WorkStorage.advisor[0].email === selectedColaborator.email
        if (!userExists && !isYourAdvisor){
            
            if (selectedColaborator.is_collaborator == true) {
            await WorkStore.fetchUserWorks('TEACHER', selectedColaborator.id)
            const limiteReached = hasReachedWorkLimit(
            selectedColaborator,
            WorkStore.collaboratorWorks,
            editionStore.currentEdition.works_per_collaborator_max
            )
            if (limiteReached) {
                showMessage(
                'Este colaborador não está mais disponível',
                "error",
                1500,
                "top-right",
                "auto",
                false)
            } else {    
            WorkStore.WorkStorage.collaborators.push(selectedColaborator)
            }
            } else {
                 showMessage(
                "Este professor não é um colaborador",
                "error",
                1500,
                "top-right",
                "auto",
                false
            );
            }
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
    const teacherI = WorkStore.WorkStorage.collaborators.findIndex(te => te.email === email)
    WorkStore.WorkStorage.collaborators.splice(teacherI, 1)
}

</script>
<template>
    <div style="width: 70%; " class="pa-2 h-100">
        <TeacherSelected :disabled="WorkStore.WorkStorage.collaborators.length === (editionStore.currentEdition?.collaborators_max || 5)" :hint="hintInput" error_msg="colaborador não encontrado" placeholder="pesquise pelo colaborador" label="pesquise pelo colaborador" user-type="TEACHER" @addUser="AddUser" @removeUser="removeUser"/>
        <div class="d-flex ga-2 mt-5">
            <p style="font-size: 12px;">* Limite máximo de colaboradores: {{ editionStore.currentEdition?.collaborators_max || 5 }}</p>
            <p style="font-size: 12px;">* Limite minimo de colaboradores: {{ editionStore.currentEdition?.collaborators_min || 1 }}</p>
        </div>
        <StepContainer title="Colaboradores do seu projeto" :step_array="WorkStore.WorkStorage.collaborators" :is_subject="false" @RemoveUser="removeUser" :min="editionStore.currentEdition?.collaborators_min || 1" no_arr_msg="Nenhum colaborador selecionado"/>
    </div>
</template>
